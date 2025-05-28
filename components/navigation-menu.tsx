'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

const MENU_ITEMS = [
  { label: 'Manage Profiles', href: '/profiles' },
  { label: 'Transfer Profile', href: '/profileTransfer' },
  { label: 'Account', href: '/account' },
  { label: 'Help Center', href: '/help' },
  { label: 'Sign out', href: '/login' },
];

export default function Navigation() {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [bgOpacity, setBgOpacity] = useState(0.05);
  const profileMenuRef = useRef<HTMLDivElement>(null);
  const profileButtonRef = useRef<HTMLButtonElement>(null);
  const menuItemRefs = useRef<(HTMLAnchorElement | HTMLButtonElement | null)[]>([]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      // Interpolate opacity from 0.05 to 0.8 between 0 and 100px scroll
      const opacity = Math.min(0.8, 0.05 + (scrollY / 100) * 0.75);
      setBgOpacity(opacity);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Open/close menu handlers
  const openMenu = () => setIsProfileOpen(true);
  const closeMenu = () => {
    setIsProfileOpen(false);
  };
  const toggleMenu = () => setIsProfileOpen((v) => !v);

  // Click outside to close
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        profileMenuRef.current &&
        !profileMenuRef.current.contains(event.target as Node) &&
        profileButtonRef.current &&
        !profileButtonRef.current.contains(event.target as Node)
      ) {
        closeMenu();
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <motion.nav
      className="fixed top-0 w-full z-50 bg-gradient-to-b from-black/15 to-transparent"
      animate={{ backgroundColor: `rgba(0,0,0,${bgOpacity})` }}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-0">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex-shrink-0">
              <span className="ml-[-90px] text-2xl font-bold text-slate-800">SKRYM</span>
            </Link>
            <div className="hidden md:block">
              <div className="ml-6 flex items-baseline space-x-4">
                <Link href="/home" className="text-gray-200 hover:text-gray-400 px-3 py-2 rounded-md text-sm font-medium">
                  Home
                </Link>
                <Link href="/tv-shows" className="text-gray-200 hover:text-gray-400 px-3 py-2 rounded-md text-sm font-medium">
                  TV Shows
                </Link>
                <Link href="/movies" className="text-gray-200 hover:text-gray-400 px-3 py-2 rounded-md text-sm font-medium">
                  Movies
                </Link>
                <Link href="/new-popular" className="text-gray-200 hover:text-gray-400 px-3 py-2 rounded-md text-sm font-medium">
                  New & Popular
                </Link>
                <Link href="/languages" className="text-gray-200 hover:text-gray-400 px-3 py-2 rounded-md text-sm font-medium">
                  Browse by Languages
                </Link>
                <Link href="/my-list" className="text-gray-200 hover:text-gray-400 px-3 py-2 rounded-md text-sm font-medium">
                  My List
                </Link>
              </div>
            </div>
          </div>
          
          <div className="hidden md:block">
            <div className="ml-4 flex items-center md:ml-6">
              <button className="p-1 rounded-full text-gray-200 hover:text-white focus:outline-none">
                <span className="sr-only">Search</span>
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>
              
              <div className="ml-3 relative">
                <div>
                  <button
                    ref={profileButtonRef}
                    onClick={toggleMenu}
                    onKeyDown={e => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        openMenu();
                      }
                    }}
                    aria-haspopup="true"
                    aria-expanded={isProfileOpen}
                    className="max-w-xs bg-gray-800 rounded-full flex items-center text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
                  >
                    <span className="sr-only">Open user menu</span>
                    <div className="h-8 w-8 rounded-full bg-gray-600 flex items-center justify-center">
                      <span className="text-white text-sm">SP</span>
                    </div>
                  </button>
                </div>
                
                {isProfileOpen && (
                  <div
                    ref={profileMenuRef}
                    tabIndex={-1}
                    className="origin-top-right absolute right-0 mt-2 w-64 rounded-xl shadow-2xl bg-black border border-neutral-800 ring-1 ring-black ring-opacity-10 overflow-hidden pointer-events-auto transition-all duration-200 focus:outline-none"
                    style={{ boxShadow: '0 8px 32px 0 rgba(0,0,0,0.45)' }}
                  >
                    {/* Profile section */}
                    <div className="flex items-center gap-3 px-4 py-3 border-b border-neutral-800">
                      <div className="h-10 w-10 rounded-md bg-gray-600 flex items-center justify-center">
                        <span className="text-white text-lg font-semibold">SP</span>
                      </div>
                      <div>
                        <div className="text-white font-medium leading-tight">Sample Profile</div>
                        <div className="text-xs text-neutral-400">Manage Profile</div>
                      </div>
                    </div>
                    {/* Menu links */}
                    <div className="py-2">
                      {MENU_ITEMS.map((item, idx) => {
                        const isSignOut = item.label.toLowerCase().includes('sign out');
                        return item.href ? (
                          <Link
                            key={item.label}
                            href={item.href}
                            ref={el => { menuItemRefs.current[idx] = el; }}
                            tabIndex={0}
                            className={`block w-full px-4 py-2 text-sm ${isSignOut ? 'text-neutral-400 border-t border-neutral-800' : 'text-white'} hover:bg-neutral-800/80 focus:bg-neutral-800/80 transition outline-none`}
                            onClick={closeMenu}
                          >
                            {item.label}
                          </Link>
                        ) : (
                          <button
                            key={item.label}
                            ref={el => { menuItemRefs.current[idx] = el; }}
                            tabIndex={0}
                            className={`block w-full text-left px-4 py-3 text-sm ${isSignOut ? 'text-neutral-400 border-t border-neutral-800' : 'text-white'} hover:bg-neutral-800/80 focus:bg-neutral-800/80 transition outline-none`}
                            onClick={closeMenu}
                          >
                            {item.label}
                          </button>
                        );
                      })}
                    </div>
                    {/* Divider */}
                    <div className="border-t border-neutral-800" />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.nav>
  );
} 