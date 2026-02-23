import { Link } from '@tanstack/react-router';
import { Trophy, UserPlus, Award, Users, Calendar, MapPin } from 'lucide-react';

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-accent/20 to-primary/20" />
        <img
          src="/assets/generated/hero-banner.dim_1200x400.png"
          alt="Marathon runners in action"
          className="w-full h-[400px] md:h-[500px] object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-white mb-4 tracking-tight drop-shadow-2xl animate-in fade-in slide-in-from-bottom-4 duration-700">
              JHAJHA MARATHON 2026
            </h1>
            <p className="text-xl md:text-2xl text-white font-bold mb-8 drop-shadow-lg animate-in fade-in slide-in-from-bottom-4 duration-700 delay-150">
              Run Your Best. Compete with Pride. Win Big!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-in fade-in slide-in-from-bottom-4 duration-700 delay-300">
              <Link
                to="/register"
                className="inline-flex items-center justify-center space-x-2 bg-white text-primary px-8 py-4 rounded-full font-black text-lg shadow-2xl hover:scale-110 hover:shadow-3xl transition-all"
              >
                <UserPlus className="h-6 w-6" />
                <span>REGISTER NOW</span>
              </Link>
              <Link
                to="/prizes"
                className="inline-flex items-center justify-center space-x-2 bg-accent text-white px-8 py-4 rounded-full font-black text-lg shadow-2xl hover:scale-110 hover:shadow-3xl transition-all"
              >
                <Trophy className="h-6 w-6" />
                <span>VIEW PRIZES</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Event Info Section */}
      <section className="py-16 bg-gradient-to-b from-background to-muted/30">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-card rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow border-2 border-primary/20">
              <div className="bg-primary/10 rounded-full w-16 h-16 flex items-center justify-center mb-4">
                <Calendar className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-2xl font-black mb-2">Event Date</h3>
              <p className="text-muted-foreground font-semibold">Coming Soon</p>
              <p className="text-sm text-muted-foreground mt-2">Stay tuned for the official announcement</p>
            </div>

            <div className="bg-card rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow border-2 border-accent/20">
              <div className="bg-accent/10 rounded-full w-16 h-16 flex items-center justify-center mb-4">
                <MapPin className="h-8 w-8 text-accent" />
              </div>
              <h3 className="text-2xl font-black mb-2">Location</h3>
              <p className="text-muted-foreground font-semibold">Jhajha, Bihar</p>
              <p className="text-sm text-muted-foreground mt-2">A scenic route through the heart of the city</p>
            </div>

            <div className="bg-card rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow border-2 border-primary/20">
              <div className="bg-primary/10 rounded-full w-16 h-16 flex items-center justify-center mb-4">
                <Users className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-2xl font-black mb-2">Categories</h3>
              <p className="text-muted-foreground font-semibold">All Age Groups</p>
              <p className="text-sm text-muted-foreground mt-2">Under 18, 18-35, 36-50, Over 50</p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Participate Section */}
      <section className="py-16 bg-gradient-to-b from-muted/30 to-background">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl md:text-5xl font-black text-center mb-12 tracking-tight">
            Why Participate?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: Trophy,
                title: 'Amazing Prizes',
                description: 'Win exciting prizes across multiple categories and age groups',
                color: 'primary',
              },
              {
                icon: Award,
                title: 'Recognition',
                description: 'Get recognized for your athletic achievements and dedication',
                color: 'accent',
              },
              {
                icon: Users,
                title: 'Community',
                description: 'Join a vibrant community of passionate runners and athletes',
                color: 'primary',
              },
            ].map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div
                  key={index}
                  className="bg-card rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all hover:-translate-y-2"
                >
                  <div
                    className={`bg-${feature.color}/10 rounded-full w-16 h-16 flex items-center justify-center mb-4`}
                  >
                    <Icon className={`h-8 w-8 text-${feature.color}`} />
                  </div>
                  <h3 className="text-xl font-black mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary via-accent to-primary">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-black text-white mb-6 tracking-tight">
            Ready to Run?
          </h2>
          <p className="text-xl text-white/90 mb-8 font-semibold">
            Register now and be part of the Jhajha Marathon experience!
          </p>
          <Link
            to="/register"
            className="inline-flex items-center justify-center space-x-2 bg-white text-primary px-10 py-5 rounded-full font-black text-xl shadow-2xl hover:scale-110 transition-all"
          >
            <UserPlus className="h-6 w-6" />
            <span>REGISTER NOW</span>
          </Link>
        </div>
      </section>
    </div>
  );
}
