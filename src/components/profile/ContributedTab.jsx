import React from "react";
import { Users, Clock, Github, Calendar, ExternalLink, FileCode, CheckCircle } from "lucide-react";

const fmtDate = (d) =>
  new Date(d).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });

const ContributedTab = ({ contributedProjects }) => {
  return (
    <div className="space-y-5">
      {contributedProjects.map((project, index) => (
        <div
          key={index}
          className="rounded-2xl border border-border bg-card text-card-foreground overflow-hidden hover:border-primary/50 transition-colors"
        >
          <div className="flex flex-col sm:flex-row">
            {/* Media column — fills the full height of the content */}
            <div className="sm:w-44 lg:w-48 shrink-0 self-stretch border-b sm:border-b-0 sm:border-r border-border">
              {project.logo_url ? (
                <img src={project.logo_url} alt={project.title} className="w-full h-40 sm:h-full object-cover" />
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
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3 className="text-base sm:text-lg font-bold text-foreground truncate">{project.title}</h3>
                    <span className="shrink-0 inline-flex items-center gap-1 text-[11px] px-2 py-0.5 bg-primary/10 text-primary border border-primary/20 rounded-full">
                      <CheckCircle className="w-3 h-3" /> Approved
                    </span>
                  </div>
                  <span className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
                    {project.project_type === 'team' ? 'team project' : 'solo project'}
                  </span>
                </div>
                <div className="shrink-0 text-right">
                  <div className="font-mono text-xl sm:text-2xl font-bold text-primary tnum leading-none">{project.rating}</div>
                  <div className="text-[10px] uppercase tracking-wider text-muted-foreground mt-1">points</div>
                </div>
              </div>

              {/* Meta row */}
              <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 mt-3 text-xs sm:text-sm text-muted-foreground">
                {project.date && (
                  <span className="inline-flex items-center gap-1.5 font-mono">
                    <Calendar className="w-4 h-4 text-primary" /> {fmtDate(project.date)}
                  </span>
                )}
                {project.duration && (
                  <span className="inline-flex items-center gap-1.5 font-mono">
                    <Clock className="w-4 h-4 text-primary" /> {project.duration} days
                  </span>
                )}
                {project.repo_url && (
                  <a href={project.repo_url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 hover:text-primary transition-colors">
                    <Github className="w-4 h-4" /> Repository
                  </a>
                )}
                {project.project_link && (
                  <a href={project.project_link} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 hover:text-primary transition-colors">
                    <ExternalLink className="w-4 h-4" /> Visit
                  </a>
                )}
              </div>

              {/* Description */}
              {project.idea_desc && (
                <p className="mt-4 text-sm text-muted-foreground line-clamp-2">{project.idea_desc}</p>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ContributedTab;
