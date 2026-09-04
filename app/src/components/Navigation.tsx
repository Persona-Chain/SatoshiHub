import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { NODES, getNodeStatus } from '../lib/nodes';
import { useNodeClock } from '../hooks/use-node-clock';

const Navigation = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const now = useNodeClock();

  useEffect(() => {
    if (!isMobileMenuOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isMobileMenuOpen]);

  const navLinks = [
    ...NODES.filter((node) => node.path && node.path !== '/' && getNodeStatus(node, now) === 'revealed')
      .map((node) => ({ name: node.name, path: node.path as string })),
  ];

  const isActive = (path: string) => {
    if (path === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(path);
  };

  return (
    <nav
      className="site-navigation fixed left-0 right-0 z-50 bg-transparent"
    >
      <div className="px-5 lg:px-12">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="relative w-12 h-10 flex items-center justify-center">
              <img src="/fav1.png" alt="Satoshi Hub Logo" className="w-full h-full rounded-sm object-contain" />
            </div>
            <span className="font-display font-bold text-lg tracking-tight text-foreground hidden sm:block">
              SATOSHI<span className="text-neon">HUB</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-4 xl:gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`relative font-medium text-sm tracking-wide transition-colors duration-300 ${
                  isActive(link.path)
                    ? 'text-neon'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                {link.name}
                {isActive(link.path) && (
                  <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-neon shadow-neon" />
                )}
              </Link>
            ))}
          </div>

          {/* CTA Button */}
          <div className="hidden xl:block">
            <button className="btn-outline text-sm py-2.5 px-5">
              Launch App
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden min-h-11 min-w-11 p-2 text-foreground flex items-center justify-center"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label={isMobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={isMobileMenuOpen}
            aria-controls="mobile-navigation"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        id="mobile-navigation"
        className={`lg:hidden absolute top-full left-0 right-0 bg-dark/95 backdrop-blur-xl border-b border-neon/10 transition-all duration-300 ${
          isMobileMenuOpen
            ? 'opacity-100 translate-y-0'
            : 'opacity-0 -translate-y-4 pointer-events-none'
        }`}
      >
        <div className="max-h-[calc(100dvh-var(--app-chrome-height))] overflow-y-auto overscroll-contain px-4 py-4 space-y-2">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`flex items-center gap-3 py-3 px-4 rounded-sm transition-colors ${
                isActive(link.path)
                  ? 'bg-neon/10 text-neon'
                  : 'text-muted-foreground hover:bg-white/5 hover:text-foreground'
              }`}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <span className="font-medium">{link.name}</span>
            </Link>
          ))}
          <button className="w-full btn-primary mt-4">Launch App</button>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
