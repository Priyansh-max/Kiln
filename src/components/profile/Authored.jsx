import React from "react";
import { Clock, Github, PlayCircle, Calendar, ExternalLink, FileCode, Check } from "lucide-react";

const fmtDate = (d) =>
  new Date(d).toLocaleDateString('en-US', { month: 'short', year: 'numeric' });

const Authored = ({ authoredProjects }) => {
  return (
    <div className="space-y-5">
      {authoredProjects.map((project) => {
        const skills = project.dev_req ? project.dev_req.split(',').map((s) => s.trim()).filter(Boolean) : [];
        return (
          <div
            key={project.id}
            className="rounded-2xl border border-border bg-card text-card-foreground overflow-hidden hover:border-primary/50 transition-colors"
          >
            <div className="flex flex-col sm:flex-row">
              {/* Media column — fills the full height of the content (no gap) */}
              <div className="sm:w-44 lg:w-48 shrink-0 self-stretch border-b sm:border-b-0 sm:border-r border-border">
                {project.logo_url ? (
                  <img
                    src={project.logo_url}
                    alt={project.title}
                    className="w-full h-40 sm:h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-40 sm:h-full min-h-[140px] bg-primary/10 flex items-center justify-center">
                    <FileCode className="w-9 h-9 text-primary" />
                  </div>
                )}
              </div>

              {/* Content column */}
              <div className="flex-1 min-w-0 p-5 sm:p-6">
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <h3 className="text-base sm:text-lg font-bold text-foreground truncate">{project.title}</h3>
                    {project.project_type && (
                      <span className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
                        {project.project_type}
                      </span>
                    )}
                  </div>
                  <div className="shrink-0 text-right">
                    <div className="font-mono text-xl sm:text-2xl font-bold text-primary tnum leading-none">
                      {project.rating}
                    </div>
                    <div className="text-[10px] uppercase tracking-wider text-muted-foreground mt-1">points</div>
                  </div>
                </div>

                {/* Meta row */}
                <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 mt-3 text-xs sm:text-sm text-muted-foreground">
                  {project.repo_url && (
                    <a href={project.repo_url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 hover:text-primary transition-colors">
                      <Github className="w-4 h-4" /> Repository
                    </a>
                  )}
                  {project.project_link && (
                    <a href={project.project_link} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 hover:text-primary transition-colors">
                      <ExternalLink className="w-4 h-4" /> Live
                    </a>
                  )}
                  {project.duration && (
                    <span className="inline-flex items-center gap-1.5 font-mono">
                      <Clock className="w-4 h-4 text-primary" /> {project.duration}d
                    </span>
                  )}
                  {project.created_at && (
                    <span className="inline-flex items-center gap-1.5 font-mono">
                      <Calendar className="w-4 h-4 text-primary" /> {fmtDate(project.created_at)}
                    </span>
                  )}
                  {project.date && (
                    <span className="inline-flex items-center gap-1.5 font-mono">
                      <Check className="w-4 h-4 text-primary" /> {fmtDate(project.date)}
                    </span>
                  )}
                </div>

                {/* Description */}
                {project.idea_desc && (
                  <p className="mt-4 text-sm text-muted-foreground line-clamp-2">{project.idea_desc}</p>
                )}

                {/* Skills */}
                {skills.length > 0 && (
                  <div className="flex flex-wrap items-center gap-2 mt-4">
                    {skills.slice(0, 6).map((skill, i) => (
                      <span key={i} className="font-mono text-xs px-2.5 py-1 rounded-full bg-primary/10 text-primary">
                        {skill}
                      </span>
                    ))}
                    {skills.length > 6 && (
                      <span className="font-mono text-xs text-muted-foreground">+{skills.length - 6} more</span>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* Demo video — full width under the card */}
            {project.video_url && (
              <details className="border-t border-border p-5 sm:p-6 pt-4">
                <summary className="flex items-center gap-2 cursor-pointer text-sm font-medium text-foreground hover:text-primary transition-colors list-none">
                  <PlayCircle className="w-4 h-4 text-primary" />
                  Watch demo
                </summary>
                <div className="relative aspect-video rounded-xl overflow-hidden border border-border mt-3">
                  <iframe
                    src={project.video_url}
                    title={`${project.title} demo video`}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    className="w-full h-full border-0"
                  />
                </div>
              </details>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default Authored;
