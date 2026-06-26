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
            className="rounded-2xl border border-border bg-card text-card-foreground p-5 sm:p-6 hover:border-primary/50 transition-colors"
          >
            {/* Header: logo · title/type · points */}
            <div className="flex items-start gap-4">
              {project.logo_url ? (
                <img
                  src={project.logo_url}
                  alt={project.title}
                  className="w-14 h-14 sm:w-16 sm:h-16 rounded-xl object-cover border border-border shrink-0"
                />
              ) : (
                <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                  <FileCode className="w-7 h-7 text-primary" />
                </div>
              )}

              <div className="flex-1 min-w-0">
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
              </div>
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

            {/* Demo video */}
            {project.video_url && (
              <details className="mt-4 group">
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
