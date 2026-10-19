import React, { useState } from 'react';
import { useData } from '../../context/DataContext';
import { ShieldCheck, Menu, X, Lock } from 'lucide-react';
import { QoshqarMuiiz } from './KazakhOrnament';

interface HeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onOpenLogin: () => void;
  onOpenAdminModal?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  onOpenLogin,
}) => {
  const { isAdmin, logoutAdmin } = useData();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { id: 'home', label: 'Басты бет' },
    { id: 'timeline', label: 'Тарих (1984–2025)' },
    { id: 'building', label: '«Келешек мектебі»' },
    { id: 'research', label: 'Ғылыми жоба' },
    { id: 'gallery', label: 'Фотогалерея' },
    { id: 'videos', label: 'Бейне мұрағат' },
    { id: 'people', label: 'Ұстаздар мен түлектер' },
    { id: 'documents', label: 'Тарихи құжаттар' },
  ];

  const handleNavClick = (id: string) => {
    setActiveTab(id);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-white/95 backdrop-blur-md border-b border-amber-200/80 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-8 h-20">
          {/* Zone 1: Brand title wordmark */}
          <button
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-3 text-left group whitespace-nowrap shrink-0 focus:outline-none"
          >
            <div className="w-10 h-10 rounded-lg bg-amber-50 border border-amber-300 flex items-center justify-center p-1.5 shadow-sm group-hover:border-amber-400 group-hover:bg-amber-100 transition-colors">
              <QoshqarMuiiz className="w-full h-full text-amber-600" />
            </div>
            <div>
              <span className="font-editorial text-xl sm:text-2xl font-bold tracking-tight text-slate-900 group-hover:text-blue-900 transition-colors block">
                Сазды орта мектебі
              </span>
              <span className="text-[11px] uppercase tracking-widest text-amber-800 font-sans font-semibold block">
                Тарихи-ғылыми шежіре • 1984–2025
              </span>
            </div>
          </button>

          {/* Zone 2: Primary Navigation Links */}
          <nav className="hidden xl:flex items-center gap-5 text-sm font-medium text-slate-700">
            {navLinks.slice(0, 6).map((link) => (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.id)}
                className={`transition-colors whitespace-nowrap shrink-0 py-1 border-b-2 text-[13px] ${
                  activeTab === link.id
                    ? 'text-blue-950 border-amber-500 font-bold'
                    : 'text-slate-600 border-transparent hover:text-slate-900 hover:border-slate-300'
                }`}
              >
                {link.label}
              </button>
            ))}
            <div className="relative group">
              <button
                className={`transition-colors whitespace-nowrap shrink-0 py-1 border-b-2 text-[13px] flex items-center gap-1 ${
                  ['people', 'documents'].includes(activeTab)
                    ? 'text-blue-950 border-amber-500 font-bold'
                    : 'text-slate-600 border-transparent hover:text-slate-900'
                }`}
              >
                Қосымша бөлімдер
              </button>
              <div className="absolute top-full right-0 mt-2 w-52 bg-white border border-amber-200/90 rounded-xl shadow-xl py-2 hidden group-hover:block transition-all z-50">
                <button
                  onClick={() => handleNavClick('people')}
                  className={`w-full text-left px-4 py-2 text-xs hover:bg-amber-50 transition-colors ${
                    activeTab === 'people' ? 'text-amber-800 font-bold bg-amber-50/60' : 'text-slate-700'
                  }`}
                >
                  Ұстаздар мен түлектер
                </button>
                <button
                  onClick={() => handleNavClick('documents')}
                  className={`w-full text-left px-4 py-2 text-xs hover:bg-amber-50 transition-colors ${
                    activeTab === 'documents' ? 'text-amber-800 font-bold bg-amber-50/60' : 'text-slate-700'
                  }`}
                >
                  Тарихи құжаттар
                </button>
              </div>
            </div>
          </nav>

          {/* Zone 3: 1 Primary Action */}
          <div className="flex items-center gap-3 shrink-0">
            {isAdmin ? (
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleNavClick('admin')}
                  className={`px-3 py-2 text-xs font-semibold rounded-lg flex items-center gap-2 border transition-all ${
                    activeTab === 'admin'
                      ? 'bg-amber-500 text-slate-950 border-amber-500 shadow-sm'
                      : 'bg-amber-50 text-amber-900 border-amber-300 hover:bg-amber-100'
                  }`}
                >
                  <ShieldCheck className="w-4 h-4 text-amber-700" />
                  <span className="whitespace-nowrap">Басқару тақтасы</span>
                </button>
                <button
                  onClick={logoutAdmin}
                  title="Шығу"
                  className="px-2.5 py-2 text-xs text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg border border-slate-200 transition-colors"
                >
                  Шығу
                </button>
              </div>
            ) : (
              <button
                onClick={onOpenLogin}
                className="px-3.5 py-2 text-xs font-semibold text-slate-800 bg-white border border-amber-300 rounded-lg hover:bg-amber-50 hover:border-amber-400 transition-colors flex items-center gap-2 whitespace-nowrap shadow-xs"
              >
                <Lock className="w-3.5 h-3.5 text-amber-700" />
                <span>Басқару</span>
              </button>
            )}

            {/* Mobile menu trigger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="xl:hidden p-2 text-slate-700 hover:text-slate-950 rounded-lg hover:bg-slate-100 focus:outline-none"
              aria-label="Мәзірді ашу"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-white border-b border-amber-200 px-4 pt-2 pb-6 space-y-1 shadow-lg">
          <div className="text-[11px] uppercase tracking-wider text-amber-800 px-3 py-2 font-bold font-sans">
            Портал бөлімдері
          </div>
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => handleNavClick(link.id)}
              className={`w-full text-left px-3 py-2.5 rounded-lg text-sm transition-colors ${
                activeTab === link.id
                  ? 'bg-amber-100/70 text-amber-900 font-bold'
                  : 'text-slate-700 hover:bg-slate-50 hover:text-slate-950'
              }`}
            >
              {link.label}
            </button>
          ))}
          {isAdmin && (
            <button
              onClick={() => handleNavClick('admin')}
              className="w-full text-left px-3 py-2.5 rounded-lg text-sm bg-amber-500 text-slate-950 font-bold mt-2 flex items-center gap-2"
            >
              <ShieldCheck className="w-4 h-4 text-slate-950" />
              Әкімшілік басқару тақтасы
            </button>
          )}
        </div>
      )}
    </header>
  );
};
