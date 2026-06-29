import React, { useState, useEffect } from "react";
import {  XCircle, Clock, CheckCircle, Lightbulb, PlayCircle,  Info,} from "lucide-react";
import { Tooltip } from "react-tooltip";
import { AiOutlineStop } from "react-icons/ai";
import { GrView } from "react-icons/gr";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from 'react-hot-toast';

const PostedTab = ({ideas , session}) => {
    const navigate = useNavigate();
    const [localIdeas, setLocalIdeas] = useState([]);
    const apiUrl = import.meta.env.VITE_BACKEND_URL;
    
    useEffect(() => {
      setLocalIdeas(ideas);
    }, [ideas]);

    const viewDetails = async(ideaId) => {
        try{
          if(ideaId != null){
            navigate(`/details/${ideaId}`)
          }
        }catch(error){
          console.error("Error viewing details: ",error);
          toast.error("Error viewing details");
        }
    }

    const handleIdeaStatus = async (ideaId) => {
        try {
          const ideaIndex = localIdeas.findIndex(idea => idea.id === ideaId);
          if (ideaIndex === -1) return;
          
          const ideaToUpdate = localIdeas[ideaIndex];
          const newStatus = ideaToUpdate.status === "open" ? "closed" : "open";
          
          const updatedIdeas = [...localIdeas];
          updatedIdeas[ideaIndex] = {
            ...updatedIdeas[ideaIndex],
            status: newStatus
          };
          
          setLocalIdeas(updatedIdeas);
          toast.success(`Idea ${newStatus === 'open' ? 'reopened' : 'closed'} successfully`);
          
          await axios.put(`${apiUrl}/api/idea/status/${ideaId}`, { status: newStatus }, {
            headers: {
              'Authorization': `Bearer ${session.access_token}`
            }
          });
        } catch (error) {
          console.error('Error updating idea status:', error);
          toast.error('Failed to update idea status');
          setLocalIdeas(ideas);
        }
    };

    return (
        <div className="space-y-3">
          {localIdeas.filter(idea => idea.completion_status !== 'approved').map((idea) => (
            <div key={idea.id} className="flex items-center justify-between gap-3 p-3 sm:p-4 bg-card border border-border rounded-xl hover:border-primary/50 transition-colors group">
              {/* Icon + title + status */}
              <div className="flex items-center gap-3 min-w-0">
                <div className={`hidden sm:flex w-11 h-11 rounded-xl items-center justify-center shrink-0 transition-colors ${
                  idea.status === 'open' ? 'bg-primary/10 text-primary' : 'bg-muted text-muted-foreground'
                }`}>
                  <Lightbulb className="w-5 h-5" />
                </div>

                <div className="min-w-0">
                  <h3 className="text-sm sm:text-base font-semibold text-foreground truncate">{idea.title}</h3>
                  <div className="flex items-center gap-2 mt-1">
                    <span
                      className={`inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-medium ${
                        idea.completion_status === 'review'
                          ? "bg-info/10 text-info"
                          : idea.status === "open"
                            ? "bg-primary/10 text-primary"
                            : "bg-muted text-muted-foreground"
                      }`}
                    >
                      {idea.completion_status === 'review' ? (
                        <><Info className="w-3 h-3 mr-1" /> Under Review</>
                      ) : idea.status === "open" ? (
                        <><span className="w-1.5 h-1.5 rounded-full bg-primary mr-1.5" /> Open</>
                      ) : (
                        <><XCircle className="w-3 h-3 mr-1" /> Closed</>
                      )}
                    </span>
                    <span className="hidden sm:flex font-mono text-xs text-muted-foreground items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {new Date(idea.created_at).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}
                    </span>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-2 shrink-0">
                {idea.completion_status === 'review' ? (
                  <span className="text-xs sm:text-sm text-muted-foreground">
                    <span className="hidden sm:inline">Contact support for queries</span>
                    <span className="sm:hidden">Support</span>
                  </span>
                ) : (
                  <>
                    <button
                      onClick={() => viewDetails(idea.id)}
                      className="inline-flex items-center gap-1.5 px-3 sm:px-4 py-1.5 text-xs sm:text-sm font-medium text-primary-foreground bg-primary hover:opacity-90 rounded-full transition-opacity whitespace-nowrap"
                    >
                      <GrView className="w-3.5 h-3.5" />
                      <span className="hidden sm:inline">View applications</span>
                      <span className="sm:hidden">View</span>
                    </button>

                    <button
                      onClick={() => handleIdeaStatus(idea.id)}
                      title={idea.status === "open" ? "Stop receiving applications" : "Start receiving applications"}
                      className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs sm:text-sm font-medium rounded-full border transition-colors whitespace-nowrap ${
                        idea.status === "open"
                          ? "border-border text-muted-foreground hover:border-destructive hover:text-destructive"
                          : "border-border text-muted-foreground hover:border-primary hover:text-primary"
                      }`}
                    >
                      {idea.status === "open" ? (
                        <><AiOutlineStop className="w-3.5 h-3.5" /> <span className="hidden sm:inline">Stop</span></>
                      ) : (
                        <><PlayCircle className="w-3.5 h-3.5" /> <span className="hidden sm:inline">Start</span></>
                      )}
                    </button>
                  </>
                )}
              </div>
            </div>
          ))}
          {localIdeas.filter(idea => idea.completion_status !== 'approved').length === 0 && (
            <div className="text-center py-10 bg-muted/50 rounded-lg">
              <div className="flex flex-col items-center justify-center">
                <Lightbulb className="h-12 w-12 text-muted-foreground mb-3" />
                <h3 className="text-lg font-medium text-foreground mb-1">No Ideas Posted</h3>
                <p className="text-sm text-muted-foreground max-w-md">
                  You haven't posted any ideas yet. Start by creating a new idea!
                </p>
              </div>
            </div>
          )}
        </div>
    )
}

export default PostedTab