import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaUser, FaLightbulb, FaSignOutAlt, FaGithub } from 'react-icons/fa';
import { Moon, Sun, Menu, X } from 'lucide-react';
import supabase from "../lib/supabase";
import { toast } from 'react-hot-toast';
import { useTheme } from '../context/ThemeContext';
import { cn } from "@/lib/utils";
import { Logo } from "@/components/ui/Logo";

const Navbar = ({user}) => {
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsOpen(false);
  }, [navigate]);

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isOpen && !event.target.closest('nav')) {
        setIsOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [isOpen]);

  const handleSignIn = async () => {
    try {
      const loadingToast = toast.loading('Signing you in...');
      
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'github',
        options: {
          redirectTo: `${window.location.origin}/idealist`,
          skipBrowserRedirect: false,
        }
      });

      if (error) throw error;

      setTimeout(() => {
        toast.dismiss(loadingToast);
      }, 2000);
      
    } catch (error) {
      console.error('Error signing in:', error.message);
      toast.error('Failed to sign in with GitHub');
    }
  };

  const handleSignOut = async () => {
    try {
      const loadingToast = toast.loading('Signing out...');
      
      const { error } = await supabase.auth.signOut();
      
      if (error) throw error;

      toast.dismiss(loadingToast);
      navigate('/');
      toast.success('Signed out successfully');
      
    } catch (error) {
      console.error('Error signing out:', error.message);
      toast.error('Failed to sign out. Please try again.');
    }
  };

  const handlePostIdea = async () => {
    if (!user) {
      toast.error('Please sign in first');
      return;
    }

    try {
      const { data: profile, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();

      if (error) throw error;
      navigate('/post-idea');
      
    } catch (error) {
      console.error('Error checking founder status:', error);
      toast.error('Something went wrong. Please try again.');
    }
  };

  return (
    <nav className="sticky top-0 w-full z-50 bg-background/80 backdrop-blur-md border-b border-border transition-colors duration-200">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="group flex items-center" aria-label="Kiln home">
            <Logo markClass="w-8 h-8" wordClass="text-lg sm:text-xl group-hover:text-primary transition-colors" />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            {user ? (
              <>
                <button
                  onClick={handlePostIdea}
                  className="flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
                >
                  <FaLightbulb className="w-4 h-4" />
                  Post Idea
                </button>
                <Link
                  to="/profile"
                  className="flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
                >
                  <FaUser className="w-4 h-4" />
                  Profile
                </Link>
                <button
                  onClick={handleSignOut}
                  className="flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors"
                >
                  <FaSignOutAlt className="w-4 h-4" />
                  Sign Out
                </button>
                <span className="w-px h-6 bg-border mx-2" />
              </>
            ) : (
              <button
                onClick={handleSignIn}
                className="inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold rounded-full bg-primary text-primary-foreground hover:opacity-90 shadow-sm shadow-primary/20 transition-opacity mr-2"
              >
                <FaGithub className="w-4 h-4" />
                Sign in with GitHub
              </button>
            )}

            <button
              onClick={toggleTheme}
              aria-label="Toggle theme"
              className="p-2 rounded-full text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
            >
              {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center md:hidden gap-2">
            <button
              onClick={toggleTheme}
              aria-label="Toggle theme"
              className="p-2 rounded-full text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
            >
              {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                setIsOpen(!isOpen);
              }}
              aria-label="Open menu"
              className="p-2 rounded-md text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
            >
              {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className={cn(
            "md:hidden absolute left-0 right-0 bg-background/95 backdrop-blur-md border-t border-border shadow-lg transition-all duration-300 ease-in-out overflow-hidden",
            isOpen ? "opacity-100 visible max-h-72" : "opacity-0 invisible max-h-0"
          )}
        >
          <div className="px-4 py-3 space-y-1">
            {user ? (
              <>
                <button
                  onClick={handlePostIdea}
                  className="flex items-center gap-3 w-full text-muted-foreground hover:text-foreground hover:bg-accent text-sm font-medium py-2.5 px-3 rounded-md transition-colors"
                >
                  <FaLightbulb className="w-4 h-4" />
                  Post Idea
                </button>
                <Link
                  to="/profile"
                  className="flex items-center gap-3 w-full text-muted-foreground hover:text-foreground hover:bg-accent text-sm font-medium py-2.5 px-3 rounded-md transition-colors"
                >
                  <FaUser className="w-4 h-4" />
                  Profile
                </Link>
                <button
                  onClick={handleSignOut}
                  className="flex items-center gap-3 w-full text-muted-foreground hover:text-destructive hover:bg-destructive/10 text-sm font-medium py-2.5 px-3 rounded-md transition-colors mt-1 border-t border-border pt-3"
                >
                  <FaSignOutAlt className="w-4 h-4" />
                  Sign Out
                </button>
              </>
            ) : (
              <button
                onClick={handleSignIn}
                className="flex items-center justify-center gap-2 w-full px-4 py-2.5 text-sm font-semibold rounded-full bg-primary text-primary-foreground hover:opacity-90 transition-opacity"
              >
                <FaGithub className="w-4 h-4" />
                Sign in with GitHub
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
