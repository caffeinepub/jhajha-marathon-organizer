import { useQuery } from '@tanstack/react-query';
import { useActor } from '../hooks/useActor';
import { Trophy, Award, Medal, Loader2, AlertCircle } from 'lucide-react';
import type { Prize } from '../backend';

export default function PrizesDisplay() {
  const { actor, isFetching: actorFetching } = useActor();

  const { data: prizes, isLoading, isError } = useQuery<Prize[]>({
    queryKey: ['prizes'],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getPrizesByCategory();
    },
    enabled: !!actor && !actorFetching,
  });

  if (isLoading || actorFetching) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="text-center">
          <Loader2 className="h-12 w-12 animate-spin text-primary mx-auto mb-4" />
          <p className="text-muted-foreground font-semibold">Loading prizes...</p>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="max-w-2xl mx-auto">
        <div className="bg-destructive/10 border-2 border-destructive rounded-2xl p-8 text-center">
          <AlertCircle className="h-12 w-12 text-destructive mx-auto mb-4" />
          <h3 className="text-xl font-black text-destructive mb-2">Failed to Load Prizes</h3>
          <p className="text-muted-foreground">Please try again later.</p>
        </div>
      </div>
    );
  }

  if (!prizes || prizes.length === 0) {
    return (
      <div className="max-w-2xl mx-auto">
        <div className="bg-card rounded-2xl shadow-lg p-12 text-center border-2 border-primary/20">
          <Trophy className="h-16 w-16 text-muted-foreground mx-auto mb-4 opacity-50" />
          <h3 className="text-2xl font-black mb-2">Prizes Coming Soon!</h3>
          <p className="text-muted-foreground">
            Prize details will be announced shortly. Stay tuned!
          </p>
        </div>
      </div>
    );
  }

  const getPlacementIcon = (placement: string) => {
    const lower = placement.toLowerCase();
    if (lower.includes('1st') || lower.includes('first')) {
      return <Trophy className="h-8 w-8" />;
    } else if (lower.includes('2nd') || lower.includes('second')) {
      return <Award className="h-8 w-8" />;
    } else if (lower.includes('3rd') || lower.includes('third')) {
      return <Medal className="h-8 w-8" />;
    }
    return <Trophy className="h-8 w-8" />;
  };

  const getPlacementColor = (placement: string) => {
    const lower = placement.toLowerCase();
    if (lower.includes('1st') || lower.includes('first')) {
      return 'from-yellow-400 via-yellow-500 to-yellow-600';
    } else if (lower.includes('2nd') || lower.includes('second')) {
      return 'from-gray-300 via-gray-400 to-gray-500';
    } else if (lower.includes('3rd') || lower.includes('third')) {
      return 'from-orange-400 via-orange-500 to-orange-600';
    }
    return 'from-primary via-accent to-primary';
  };

  return (
    <div className="max-w-5xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {prizes.map((prize, index) => (
          <div
            key={index}
            className="bg-card rounded-2xl shadow-xl overflow-hidden border-2 border-primary/20 hover:shadow-2xl hover:-translate-y-2 transition-all"
          >
            {/* Prize Header */}
            <div className={`bg-gradient-to-r ${getPlacementColor(prize.placement)} p-6 text-white`}>
              <div className="flex items-center justify-center mb-3">
                <div className="bg-white/20 rounded-full p-3">
                  {getPlacementIcon(prize.placement)}
                </div>
              </div>
              <h3 className="text-2xl font-black text-center">{prize.placement}</h3>
            </div>

            {/* Prize Body */}
            <div className="p-6">
              <div className="mb-4">
                <p className="text-sm font-bold text-muted-foreground mb-1">Category</p>
                <p className="text-lg font-black text-foreground">{prize.category}</p>
              </div>

              <div>
                <p className="text-sm font-bold text-muted-foreground mb-1">Prize</p>
                <p className="text-lg font-semibold text-primary">{prize.description}</p>
              </div>
            </div>

            {/* Trophy Icon */}
            <div className="px-6 pb-6">
              <img
                src="/assets/generated/trophy-icon.dim_128x128.png"
                alt="Trophy"
                className="h-16 w-16 mx-auto opacity-20"
              />
            </div>
          </div>
        ))}
      </div>

      {/* Additional Info */}
      <div className="mt-12 bg-gradient-to-r from-primary/10 via-accent/10 to-primary/10 rounded-2xl p-8 text-center border-2 border-primary/20">
        <h3 className="text-2xl font-black mb-4">More Prizes to be Announced!</h3>
        <p className="text-muted-foreground font-semibold">
          Additional prizes and special awards will be revealed closer to the event date.
          <br />
          Register now to be eligible for all prizes!
        </p>
      </div>
    </div>
  );
}
