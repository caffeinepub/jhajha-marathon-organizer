import PrizesDisplay from '../components/PrizesDisplay';

export default function PrizesPage() {
  return (
    <div className="min-h-screen py-12 bg-gradient-to-b from-background via-muted/20 to-background">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-block mb-6">
            <img
              src="/assets/generated/trophy-icon.dim_128x128.png"
              alt="Trophy"
              className="h-24 w-24 mx-auto animate-bounce"
            />
          </div>
          <h1 className="text-4xl md:text-6xl font-black mb-4 tracking-tight bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
            PRIZES & AWARDS
          </h1>
          <p className="text-xl text-muted-foreground font-semibold max-w-2xl mx-auto">
            Compete for amazing prizes across multiple categories. Every runner has a chance to win!
          </p>
        </div>

        {/* Prizes Display */}
        <PrizesDisplay />
      </div>
    </div>
  );
}
