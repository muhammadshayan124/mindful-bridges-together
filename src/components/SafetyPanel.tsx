import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

export default function SafetyPanel({ childId }: { childId: string }) {
  const navigate = useNavigate();

  const handleBreathingExercise = () => {
    // Navigate to breathing mini-game
    navigate('/child/games');
  };

  const handleContactAdult = () => {
    // Stub for now - backend will handle contacts later
    console.log('Contact trusted adult for child:', childId);
  };

  return (
    <div className="mt-3 rounded-lg border p-3 bg-rose-50 text-rose-900">
      <p className="font-medium">You're not alone. Let's do a quick calming breath, then talk to a trusted adult nearby.</p>
      <div className="mt-2 flex gap-2">
        <Button 
          onClick={handleBreathingExercise}
          variant="outline"
          size="sm"
          className="bg-white hover:bg-rose-100"
        >
          Breathing exercise
        </Button>
        <Button 
          onClick={handleContactAdult}
          variant="outline" 
          size="sm"
          className="bg-white hover:bg-rose-100"
        >
          Contact trusted adult
        </Button>
      </div>
      <p className="mt-2 text-xs opacity-80">If you're in danger, please contact local emergency services.</p>
    </div>
  );
}