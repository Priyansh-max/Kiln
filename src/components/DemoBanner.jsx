import { FlaskConical, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useDemoMode } from '../context/DemoModeContext';

export default function DemoBanner({ message = 'You are viewing sample data. Nothing you do here will change your real projects.' }) {
  const { setIsDemoMode } = useDemoMode();
  const navigate = useNavigate();

  const exitDemo = () => {
    setIsDemoMode(false);
    navigate('/profile');
  };

  return (
    <div className="mb-6 flex flex-col gap-3 rounded-xl border border-primary/25 bg-primary/10 px-4 py-3 text-sm sm:flex-row sm:items-center sm:justify-between">
      <div className="flex items-start gap-3">
        <FlaskConical className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
        <div>
          <p className="font-semibold text-foreground">Demo mode</p>
          <p className="text-muted-foreground">{message}</p>
        </div>
      </div>
      <button
        type="button"
        onClick={exitDemo}
        className="inline-flex items-center justify-center gap-1.5 self-start rounded-md px-2.5 py-1.5 text-xs font-medium text-muted-foreground transition-colors hover:bg-background hover:text-foreground sm:self-auto"
      >
        <X className="h-3.5 w-3.5" />
        Exit demo
      </button>
    </div>
  );
}
