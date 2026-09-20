const { createClient } = require('@supabase/supabase-js');
const nodemailer = require('nodemailer');

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY
);

const asNumber = (value) => Number(value) || 0;

const getMemberId = (member) => member?.id || member?.profile_id || member?.user_id || member?.team_member_id;

const getMemberTotals = (member = {}) => ({
  commits: asNumber(member.commits),
  pullRequests:
    asNumber(member.open_pull_requests) +
    asNumber(member.closed_pull_requests) +
    asNumber(member.open_prs) +
    asNumber(member.closed_prs),
  issues:
    asNumber(member.open_issues) +
    asNumber(member.closed_issues),
  mergedPRs: asNumber(member.merged_pull_requests) + asNumber(member.merged_prs)
});

const addTotals = (current, next) => ({
  commits: current.commits + next.commits,
  pullRequests: current.pullRequests + next.pullRequests,
  issues: current.issues + next.issues,
  mergedPRs: current.mergedPRs + next.mergedPRs
});

// Create or update profile
const createProfile = async (req, res) => {
  try {
    const { fullName, email, githubUrl,github_username, portfolioUrl, description, skills, resumeUrl , avatar_url } = req.body;
    
    const userId = req.user.id;

    const { data, error } = await supabase
      .from('profiles')
      .upsert({
        id: userId,
        full_name: fullName,
        email,
        github_url: githubUrl,
        github_username: github_username,
        portfolio_url: portfolioUrl || '',
        description,
        skills,
        resume_url: resumeUrl,
        avatar_url: avatar_url,
        onboarding: true,
        updated_at: new Date()
      });

    if (error) throw error;

    res.json({ message: 'Profile created successfully', data });
  } catch (error) {
    console.error('Profile creation error:', error);
    res.status(500).json({ error: error.message });
  }
};

// Update profile
const updateProfile = async (req, res) => {
  try {
    const { fullName, portfolioUrl, description , skills , resumeUrl } = req.body;
    const userId = req.user.id;

    const { data, error } = await supabase
      .from('profiles')
      .update({
        full_name: fullName,
        portfolio_url: portfolioUrl,
        description,
        skills,
        resume_url: resumeUrl,
        updated_at: new Date()
      })
      .eq('id', userId);

    if (error) throw error;

    res.json({ success: true , message: 'Profile updated successfully'});
  } catch (error) {
    console.error('Profile update error:', error);
    res.status(500).json({ error: error.message });
  }
};

// Get profile
const getProfile = async (req, res) => {
  try {
    const userId = req.user.id;

    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single();

    if (error) throw error;

    res.json({
      success: true,
      data: data
    });
  } catch (error) {
    console.error('Profile fetch error:', error);
    res.status(500).json({ 
      success: false,
      error: error.message 
    });
  }
};

// Upload resume
const uploadResume = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }
    console.log("Uploading resume");
    const userId = req.user.id;
    const file = req.file;
    const fileExt = file.originalname.split('.').pop();
    const fileName = `${userId}-${Date.now()}.${fileExt}`;

    console.log(userId);

    const serviceClient = createClient(
      process.env.SUPABASE_URL,
      process.env.SUPABASE_SERVICE_ROLE_KEY, // Use service role key instead of anon key
    );

    const { error } = await serviceClient.storage
      .from('Resume')
      .upload(fileName, file.buffer, {
        contentType: file.mimetype,
        cacheControl: '3600',
        upsert: true
      });
    
    if (error) throw error;

    // Get public URL
    const { data: { publicUrl } } = serviceClient.storage
      .from('Resume')
      .getPublicUrl(fileName);

    res.json({ publicUrl });
  } catch (error) {
    console.error('Resume upload error:', error);
    res.status(500).json({ error: error.message });
  }
};
// Get project statistics for user profile
const getProjectStats = async (req, res) => {
  try {
    const userId = req.user.id;

    const { data, error } = await supabase
      .from('profiles')
      .select('project_completion, project_rating, total_commits, total_pull_requests, total_issues, total_merged_pr')
      .eq('id', userId)
      .single();

    if (error) throw error;

    const projectIds = new Set(
      Array.isArray(data.project_completion)
        ? data.project_completion.map(project => project.project_id).filter(Boolean)
        : []
    );

    const { data: submissionsData, error: submissionsError } = await supabase
      .from('projectSubmission')
      .select('idea_id, mem_stats, submitted_on, status')
      .eq('status', 'approved');

    if (submissionsError) throw submissionsError;

    let matchingSubmissionCount = 0;

    const submissionTotals = (submissionsData || []).reduce((totals, submission) => {
      if (!Array.isArray(submission.mem_stats)) return totals;

      const currentMember = submission.mem_stats.find(member => getMemberId(member) === userId);
      if (!currentMember) return totals;

      matchingSubmissionCount += 1;

      if (submission.idea_id) {
        projectIds.add(submission.idea_id);
      }

      return addTotals(totals, getMemberTotals(currentMember));
    }, {
      commits: 0,
      pullRequests: 0,
      issues: 0,
      mergedPRs: 0
    });

    const hasSubmissionStats = matchingSubmissionCount > 0;

    let ideaTitleById = {};
    if (projectIds.size > 0) {
      const { data: ideasData, error: ideasError } = await supabase
        .from('ideas')
        .select('id, title')
        .in('id', Array.from(projectIds));

      if (ideasError) throw ideasError;

      ideaTitleById = (ideasData || []).reduce((map, idea) => {
        map[idea.id] = idea.title;
        return map;
      }, {});
    }

    // Format project completion data for frontend
    let ratings = [];
    if (data.project_completion && Array.isArray(data.project_completion)) {
      // Sort project_completion by date (newest first)

      //no we dont need to sort get the data as it is already sorted
      const sortedProjects = [...data.project_completion];

      // Map to the format expected by frontend
      ratings = sortedProjects.map(project => ({
        project: project.project_title || ideaTitleById[project.project_id] || 'Untitled Project',
        project_id: project.project_id,
        rating: asNumber(project.rating),
        totalRating: asNumber(project.totalRating),
        date: project.date ? project.date.split('T')[0] : null, // Format date as YYYY-MM-DD
        role: project.role,
      }));
    }

    // Return formatted project stats
    console.log("Ratings:", ratings);
    res.json({
      success: true,
      data: {
        ratings,
        totalCommits: hasSubmissionStats ? submissionTotals.commits : data.total_commits || 0,
        totalIssues: hasSubmissionStats ? submissionTotals.issues : data.total_issues || 0,
        totalPRs: hasSubmissionStats ? submissionTotals.pullRequests : data.total_pull_requests || 0,
        mergedPRs: hasSubmissionStats ? submissionTotals.mergedPRs : data.total_merged_pr || 0
      }
    });
  } catch (error) {
    console.error('Project stats fetch error:', error);
    res.status(500).json({ 
      success: false,
      error: error.message 
    });
  }
};

// Get project details by project ID
const getProjectDetails = async (req, res) => {
  try {
    const userId = req.user.id;
    const projectIds = req.query.projectIds ? req.query.projectIds.split(',') : [];
    
    if (projectIds.length === 0) {
      return res.json({
        success: true,
        data: []
      });
    }

    // Get profile data to verify user's relationship to projects
    const { data: profileData, error: profileError } = await supabase
      .from('profiles')
      .select('project_completion')
      .eq('id', userId)
      .single();

    if (profileError) throw profileError;

    // Verify the user has these project IDs in their project_completion
    const userProjectIds = profileData.project_completion 
      ? profileData.project_completion.map(p => p.project_id)
      : [];
    
    // Filter to only include projects the user has in their profile
    const validProjectIds = projectIds.filter(id => userProjectIds.includes(id));
    
    if (validProjectIds.length === 0) {
      return res.json({
        success: true,
        data: []
      });
    }

    // Fetch the idea details for these projects
    const { data: ideasData, error: ideasError } = await supabase
      .from('ideas')
      .select(`
        id, 
        title, 
        idea_desc, 
        dev_req,
        project_type,
        project_link, 
        video_url, 
        logo_url, 
        repo_url, 
        founder_id,
        created_at,
        duration,
        profiles(full_name, avatar_url),
        completion_status
      `)
      .in('id', validProjectIds);

    if (ideasError) throw ideasError;
    
    // Get the user's role for each project from their profile
    const projectsWithRole = ideasData.map(idea => {
      const projectCompletion = profileData.project_completion.find(p => p.project_id === idea.id);
      return {
        ...idea,
        role: projectCompletion ? projectCompletion.role : null,
        rating: projectCompletion ? projectCompletion.rating : 0,
        date: projectCompletion ? projectCompletion.date : null
      };
    });

    res.json({
      success: true,
      data: projectsWithRole
    });
    
  } catch (error) {
    console.error('Project details fetch error:', error);
    res.status(500).json({ 
      success: false,
      error: error.message 
    });
  }
};

module.exports = {
  createProfile,
  updateProfile,
  getProfile,
  uploadResume,
  getProjectStats,
  getProjectDetails
};
