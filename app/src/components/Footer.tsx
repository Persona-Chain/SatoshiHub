import { Link } from 'react-router-dom';
import { Twitter, Github, MessageCircle, Mail } from 'lucide-react';
import { NODES, getNodeStatus } from '../lib/nodes';
import { useNodeClock } from '../hooks/use-node-clock';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const now = useNodeClock();

  const footerLinks = {
    products: NODES.filter((node) => node.path && node.path !== '/' && getNodeStatus(node, now) === 'revealed')
      .map((node) => ({ name: node.name, path: node.path as string })),
    company: [
      { name: 'About Us', path: '#' },
      { name: 'Careers', path: '#' },
      { name: 'Blog', path: '#' },
      { name: 'Press Kit', path: '#' },
    ],
    support: [
      { name: 'Help Center', path: '#' },
      { name: 'Documentation', path: '#' },
      { name: 'API Reference', path: '#' },
      { name: 'Status', path: '#' },
    ],
    legal: [
      { name: 'Privacy Policy', path: '#' },
      { name: 'Terms of Service', path: '#' },
      { name: 'Cookie Policy', path: '#' },
    ],
  };

  const socialLinks = [
    { icon: Twitter, href: '#', label: 'Twitter' },
    { icon: Github, href: '#', label: 'GitHub' },
    { icon: MessageCircle, href: '#', label: 'Discord' },
    { icon: Mail, href: '#', label: 'Email' },
  ];

  return (
    <footer className="bg-dark-light border-t border-neon/10">
      <div className="w-full px-6 lg:px-12 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8 lg:gap-12">
          {/* Brand */}
          <div className="col-span-2">
            <Link to="/" className="flex items-center gap-3 mb-6">
              <div className="relative w-10 h-10 flex items-center justify-center">
                <div className="absolute inset-0 bg-neon/20 rounded-sm rotate-45" />
                <span className="relative text-neon font-display font-bold text-xl">S</span>
              </div>
              <span className="font-display font-bold text-lg tracking-tight">
                SATOSHI<span className="text-neon">HUB</span>
              </span>
            </Link>
            <p className="text-muted-foreground text-sm leading-relaxed mb-6 max-w-xs">
              Your gateway to the Satoshi Sword ecosystem. Secure wallets, social connections, and decentralized trading—all in one hub.
            </p>
            <div className="flex items-center gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  className="w-10 h-10 flex items-center justify-center rounded-sm bg-white/5 text-muted-foreground hover:bg-neon/10 hover:text-neon transition-colors"
                  aria-label={social.label}
                >
                  <social.icon size={18} />
                </a>
              ))}
            </div>
          </div>

          {/* Products */}
          <div>
            <h4 className="font-display font-semibold text-sm uppercase tracking-wider mb-4">Revealed Nodes</h4>
            <ul className="space-y-3">
              {footerLinks.products.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className="text-sm text-muted-foreground hover:text-neon transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
            {footerLinks.products.length === 0 && <span className="text-sm text-muted-foreground font-mono">NONE YET</span>}
          </div>

          {/* Company */}
          <div>
            <h4 className="font-display font-semibold text-sm uppercase tracking-wider mb-4">
              Company
            </h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className="text-sm text-muted-foreground hover:text-neon transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-display font-semibold text-sm uppercase tracking-wider mb-4">
              Support
            </h4>
            <ul className="space-y-3">
              {footerLinks.support.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className="text-sm text-muted-foreground hover:text-neon transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-display font-semibold text-sm uppercase tracking-wider mb-4">
              Legal
            </h4>
            <ul className="space-y-3">
              {footerLinks.legal.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className="text-sm text-muted-foreground hover:text-neon transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            {currentYear} Satoshi Hub. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <span className="text-xs text-muted-foreground font-mono">
              SECURE / FAST / SOCIAL
            </span>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-neon animate-pulse" />
              <span className="text-xs text-neon font-mono">SYSTEM ONLINE</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
