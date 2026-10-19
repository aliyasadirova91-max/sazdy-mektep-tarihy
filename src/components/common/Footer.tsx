import React from 'react';
import { useData } from '../../context/DataContext';
import { QoshqarMuiiz } from './KazakhOrnament';
import { BookOpen, Shield, HelpCircle, School } from 'lucide-react';

interface FooterProps {
  setActiveTab: (tab: string) => void;
  onOpenLogin: () => void;
  onOpenSetupGuide: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  setActiveTab,
  onOpenLogin,
  onOpenSetupGuide,
}) => {
  const { siteConfig, research, isAdmin } = useData();

  return (
    <footer className="bg-white border-t-2 border-amber-300 text-slate-600 text-sm mt-20 relative overflow-hidden shadow-xs">
      {/* Subtle top ornament decorative band */}
      <div className="h-1.5 w-full bg-gradient-to-r from-blue-600 via-amber-400 to-emerald-500 opacity-90" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Col 1: School Emblem & Historical Summary */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-xl bg-amber-50 border border-amber-300 flex items-center justify-center p-2 shadow-xs">
                <QoshqarMuiiz className="w-full h-full text-amber-600" />
              </div>
              <div>
                <h3 className="font-editorial text-2xl font-bold text-slate-900 tracking-wide">
                  {siteConfig.schoolName}
                </h3>
                <p className="text-xs uppercase tracking-widest text-amber-800 font-sans font-semibold">
                  Тарихи-өлкетанулық ғылыми зерттеу порталы
                </p>
              </div>
            </div>

            <p className="text-slate-600 text-xs sm:text-sm leading-relaxed max-w-xl">
              1984 жылы іргесі қаланып, 2025 жылы «Келешек мектебі» инновациялық жаңа ғимаратына
              қоныстанған қасиетті білім шаңырағының өткені мен бүгінгі шежіресі. Жоба мектеп мұрағаты
              және ұрпақтар сабақтастығын насихаттауға арналған.
            </p>

            <div className="flex flex-wrap items-center gap-4 text-xs text-slate-700 pt-3 border-t border-slate-100">
              <div className="flex items-center gap-1.5 bg-amber-50 px-3 py-1 rounded-full border border-amber-200">
                <span className="w-2 h-2 rounded-full bg-amber-500" />
                <span>Негізі қаланған: <strong className="text-amber-900 font-mono font-bold">1984 жыл</strong></span>
              </div>
              <div className="flex items-center gap-1.5 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                <span className="w-2 h-2 rounded-full bg-emerald-600" />
                <span>Жаңа кезең: <strong className="text-emerald-900 font-mono font-bold">2025 жыл («Келешек мектебі»)</strong></span>
              </div>
            </div>
          </div>

          {/* Col 2: Navigation Links */}
          <div className="space-y-3">
            <h4 className="text-xs uppercase tracking-widest text-amber-900 font-bold font-sans">
              Бөлімдер
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => { setActiveTab('timeline'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className="hover:text-blue-900 transition-colors text-slate-700 font-medium"
                >
                  Мектеп тарихы (Хронология)
                </button>
              </li>
              <li>
                <button
                  onClick={() => { setActiveTab('building'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className="hover:text-blue-900 transition-colors text-slate-700 font-medium"
                >
                  «Келешек мектебі» жаңа кешені
                </button>
              </li>
              <li>
                <button
                  onClick={() => { setActiveTab('research'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className="hover:text-blue-900 transition-colors text-slate-700 font-medium"
                >
                  Ғылыми-зерттеу жобасы
                </button>
              </li>
              <li>
                <button
                  onClick={() => { setActiveTab('gallery'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className="hover:text-blue-900 transition-colors text-slate-700 font-medium"
                >
                  Фото және бейне мұрағат
                </button>
              </li>
              <li>
                <button
                  onClick={() => { setActiveTab('documents'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className="hover:text-blue-900 transition-colors text-slate-700 font-medium"
                >
                  Мұрағаттық құжаттар
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Research Credits & Admin tools */}
          <div className="space-y-3">
            <h4 className="text-xs uppercase tracking-widest text-amber-900 font-bold font-sans">
              Ғылыми жетекшілік
            </h4>
            <div className="text-xs space-y-1.5 text-slate-600 bg-slate-50 p-3 rounded-xl border border-slate-200/80">
              <p>Жоба жетекшісі: <span className="text-slate-900 font-semibold">{research.supervisorName}</span></p>
              <p>Зерттеуші: <span className="text-slate-900 font-semibold">{research.authorName}</span></p>
              <p className="text-slate-500">{siteConfig.address}</p>
            </div>

            <div className="pt-2 space-y-2">
              <button
                onClick={onOpenSetupGuide}
                className="w-full text-left flex items-center gap-2 text-xs text-amber-800 hover:text-amber-950 font-medium transition-colors py-1"
              >
                <HelpCircle className="w-3.5 h-3.5 text-amber-600" />
                <span>Баптау және дерекқор нұсқаулығы</span>
              </button>

              {!isAdmin ? (
                <button
                  onClick={onOpenLogin}
                  className="w-full text-left flex items-center gap-2 text-xs text-slate-600 hover:text-blue-900 transition-colors py-1 font-medium"
                >
                  <Shield className="w-3.5 h-3.5 text-slate-500" />
                  <span>Әкімші тақтасына кіру</span>
                </button>
              ) : (
                <button
                  onClick={() => { setActiveTab('admin'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className="w-full text-left flex items-center gap-2 text-xs text-amber-700 font-bold py-1"
                >
                  <Shield className="w-3.5 h-3.5 text-amber-600" />
                  <span>Басқару тақтасына өту</span>
                </button>
              )}
            </div>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>
            © 1984–2026 {siteConfig.schoolName}. Барлық құқықтар қорғалған.
          </p>
          <p className="flex items-center gap-2">
            <span>Қазақстанның орта білім беру тарихы мен мұрағаты</span>
          </p>
        </div>
      </div>
    </footer>
  );
};
