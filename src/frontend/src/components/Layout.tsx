import { Link, Outlet, useRouterState } from '@tanstack/react-router';
import { Menu, X, Trophy, UserPlus, Home, Phone } from 'lucide-react';
import { useState } from 'react';

export default function Layout() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const routerState = useRouterState();
  const currentPath = routerState.location.pathname;

  const navigation = [
    { name: 'Home', href: '/', icon: Home },
    { name: 'Register', href: '/register', icon: UserPlus },
    { name: 'Prizes', href: '/prizes', icon: Trophy },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-gradient-to-r from-primary via-accent to-primary shadow-lg">
        <nav className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-3 group">
              <div className="bg-white rounded-full p-2 shadow-md group-hover:scale-110 transition-transform">
                <Trophy className="h-8 w-8 text-primary" />
              </div>
              <div>
                <h1 className="text-2xl md:text-3xl font-black text-white tracking-tight">
                  JHAJHA MARATHON
                </h1>
                <p className="text-xs text-white/90 font-semibold tracking-wide">RUN • COMPETE • WIN</p>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-2">
              {navigation.map((item) => {
                const Icon = item.icon;
                const isActive = currentPath === item.href;
                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={`flex items-center space-x-2 px-6 py-3 rounded-full font-bold transition-all ${
                      isActive
                        ? 'bg-white text-primary shadow-lg scale-105'
                        : 'text-white hover:bg-white/20 hover:scale-105'
                    }`}
                  >
                    <Icon className="h-5 w-5" />
                    <span>{item.name}</span>
                  </Link>
                );
              })}
            </div>

            {/* Mobile menu button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg bg-white/20 text-white hover:bg-white/30 transition-colors"
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>

          {/* Mobile Navigation */}
          {mobileMenuOpen && (
            <div className="md:hidden mt-4 pb-4 space-y-2">
              {navigation.map((item) => {
                const Icon = item.icon;
                const isActive = currentPath === item.href;
                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`flex items-center space-x-3 px-4 py-3 rounded-lg font-bold transition-all ${
                      isActive
                        ? 'bg-white text-primary shadow-lg'
                        : 'text-white hover:bg-white/20'
                    }`}
                  >
                    <Icon className="h-5 w-5" />
                    <span>{item.name}</span>
                  </Link>
                );
              })}
            </div>
          )}
        </nav>
      </header>

      {/* Main Content */}
      <main className="flex-1">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="bg-gradient-to-r from-primary via-accent to-primary text-white py-8 mt-auto">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-6 md:space-y-0">
            <div className="text-center md:text-left">
              <h3 className="text-xl font-black tracking-tight">JHAJHA MARATHON</h3>
              <p className="text-sm text-white/80 mt-1">Empowering runners, celebrating champions</p>
            </div>
            
            {/* Organizer Contact */}
            <div className="text-center">
              <p className="text-sm text-white/90 font-semibold mb-2">Contact Organizer</p>
              <a 
                href="tel:7069180465" 
                className="flex items-center justify-center space-x-2 bg-white/20 hover:bg-white/30 px-6 py-3 rounded-full font-bold transition-all hover:scale-105"
              >
                <Phone className="h-5 w-5" />
                <span>7069180465</span>
              </a>
            </div>

            <div className="text-center md:text-right text-sm">
              <p className="text-white/90">
                © {new Date().getFullYear()} Jhajha Marathon. All rights reserved.
              </p>
              <p className="text-white/80 mt-1">
                Built with ❤️ using{' '}
                <a
                  href={`https://caffeine.ai/?utm_source=Caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(
                    typeof window !== 'undefined' ? window.location.hostname : 'jhajha-marathon'
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline hover:text-white transition-colors"
                >
                  caffeine.ai
                </a>
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
