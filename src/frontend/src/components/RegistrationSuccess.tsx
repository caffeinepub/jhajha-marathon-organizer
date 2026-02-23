import { Link } from '@tanstack/react-router';
import { CheckCircle2, Trophy, Home } from 'lucide-react';

interface RegistrationSuccessProps {
  participantId: bigint;
  onClose: () => void;
}

export default function RegistrationSuccess({ participantId, onClose }: RegistrationSuccessProps) {
  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-card rounded-2xl shadow-2xl p-8 md:p-12 text-center border-2 border-primary/20">
        {/* Success Icon */}
        <div className="mb-6">
          <div className="inline-flex items-center justify-center w-24 h-24 bg-primary/10 rounded-full animate-bounce">
            <CheckCircle2 className="h-12 w-12 text-primary" />
          </div>
        </div>

        {/* Success Message */}
        <h2 className="text-3xl md:text-4xl font-black mb-4 text-primary">
          Registration Successful!
        </h2>
        <p className="text-xl text-muted-foreground mb-8">
          Thank you for registering for the Jhajha Marathon 2026
        </p>

        {/* Participant ID */}
        <div className="bg-gradient-to-r from-primary/10 via-accent/10 to-primary/10 rounded-xl p-6 mb-8 border-2 border-primary/20">
          <p className="text-sm font-bold text-muted-foreground mb-2">Your Participant ID</p>
          <p className="text-4xl font-black text-primary">#{participantId.toString()}</p>
          <p className="text-sm text-muted-foreground mt-2">
            Please save this ID for future reference
          </p>
        </div>

        {/* Next Steps */}
        <div className="bg-muted/50 rounded-xl p-6 mb-8 text-left">
          <h3 className="text-lg font-black mb-4 flex items-center space-x-2">
            <span>📋</span>
            <span>Next Steps</span>
          </h3>
          <ul className="space-y-3 text-muted-foreground">
            <li className="flex items-start space-x-2">
              <span className="text-primary font-bold mt-1">1.</span>
              <span>Keep your participant ID safe - you'll need it on race day</span>
            </li>
            <li className="flex items-start space-x-2">
              <span className="text-primary font-bold mt-1">2.</span>
              <span>Check out the prizes you can win</span>
            </li>
            <li className="flex items-start space-x-2">
              <span className="text-primary font-bold mt-1">3.</span>
              <span>Start training and prepare for the big day!</span>
            </li>
            <li className="flex items-start space-x-2">
              <span className="text-primary font-bold mt-1">4.</span>
              <span>Stay tuned for event date announcements</span>
            </li>
          </ul>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/prizes"
            className="inline-flex items-center justify-center space-x-2 bg-gradient-to-r from-primary via-accent to-primary text-white px-8 py-4 rounded-full font-black shadow-lg hover:shadow-xl hover:scale-105 transition-all"
          >
            <Trophy className="h-5 w-5" />
            <span>VIEW PRIZES</span>
          </Link>
          <Link
            to="/"
            className="inline-flex items-center justify-center space-x-2 bg-muted text-foreground px-8 py-4 rounded-full font-black shadow-lg hover:shadow-xl hover:scale-105 transition-all"
          >
            <Home className="h-5 w-5" />
            <span>GO HOME</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
