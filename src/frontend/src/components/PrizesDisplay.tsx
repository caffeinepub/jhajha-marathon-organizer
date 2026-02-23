import { Trophy, Award, Medal, Loader2, AlertCircle } from 'lucide-react';
import type { Prize } from '../backend';
import { useGetPrizes } from '../hooks/useQueries';

export default function PrizesDisplay() {
  const { data: allPrizes, isLoading, isError, error } = useGetPrizes();

  // Filter to show only overall prizes (1st, 2nd, 3rd place)
  const prizes = allPrizes?.filter(prize => prize.category === 'overall') || [];

  if (isLoading) {
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
          <p className="text-muted-foreground">
            {error instanceof Error ? error.message : 'Please try again later.'}
          </p>
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
    if (placement === 'firstPlace') {
      return <Trophy className="h-8 w-8" />;
    } else if (placement === 'secondPlace') {
      return <Award className="h-8 w-8" />;
    } else if (placement === 'thirdPlace') {
      return <Medal className="h-8 w-8" />;
    }
    return <Trophy className="h-8 w-8" />;
  };

  const getPlacementColor = (placement: string) => {
    if (placement === 'firstPlace') {
      return 'from-yellow-400 via-yellow-500 to-yellow-600';
    } else if (placement === 'secondPlace') {
      return 'from-gray-300 via-gray-400 to-gray-500';
    } else if (placement === 'thirdPlace') {
      return 'from-orange-400 via-orange-500 to-orange-600';
    }
    return 'from-primary via-accent to-primary';
  };

  const getPlacementLabel = (placement: string) => {
    if (placement === 'firstPlace') return '1st Place';
    if (placement === 'secondPlace') return '2nd Place';
    if (placement === 'thirdPlace') return '3rd Place';
    return placement;
  };

  // Sort prizes by placement order
  const sortedPrizes = [...prizes].sort((a, b) => {
    const order = { firstPlace: 1, secondPlace: 2, thirdPlace: 3 };
    return (order[a.placement as keyof typeof order] || 999) - (order[b.placement as keyof typeof order] || 999);
  });

  return (
    <div className="max-w-5xl mx-auto">
      {/* All Participants Medal Banner */}
      <div className="mb-12 bg-gradient-to-r from-accent via-primary to-accent rounded-2xl shadow-2xl overflow-hidden border-2 border-primary">
        <div className="bg-white/10 backdrop-blur-sm p-8 text-center">
          <div className="flex items-center justify-center mb-4">
            <Medal className="h-12 w-12 text-white animate-pulse" />
          </div>
          <h3 className="text-3xl font-black text-white mb-3">
            🏅 Medals for All Participants! 🏅
          </h3>
          <p className="text-lg font-bold text-white/90 max-w-2xl mx-auto">
            Every participant who completes the marathon will receive a finisher's medal to celebrate their achievement!
          </p>
        </div>
      </div>

      {/* Prize Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {sortedPrizes.map((prize, index) => (
          <div
            key={`${prize.placement}-${index}`}
            className="bg-card rounded-2xl shadow-xl overflow-hidden border-2 border-primary/20 hover:shadow-2xl hover:-translate-y-2 transition-all"
          >
            {/* Prize Header */}
            <div className={`bg-gradient-to-r ${getPlacementColor(prize.placement)} p-6 text-white`}>
              <div className="flex items-center justify-center mb-3">
                <div className="bg-white/20 rounded-full p-3">
                  {getPlacementIcon(prize.placement)}
                </div>
              </div>
              <h3 className="text-2xl font-black text-center">{getPlacementLabel(prize.placement)}</h3>
            </div>

            {/* Prize Body */}
            <div className="p-6">
              <div className="text-center">
                <p className="text-sm font-bold text-muted-foreground mb-2">Prize Amount</p>
                <p className="text-3xl font-black text-primary mb-2">₹{Number(prize.amount).toLocaleString()}</p>
                <p className="text-sm text-muted-foreground font-semibold">(Overall Category)</p>
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
    </div>
  );
}
