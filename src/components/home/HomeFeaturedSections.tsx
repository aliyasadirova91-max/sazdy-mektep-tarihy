import React, { useState } from 'react';
import { useData } from '../../context/DataContext';
import { OrnamentDivider, QoshqarMuiiz } from '../common/KazakhOrnament';
import { Clock, Building2, BookOpen, Image as ImageIcon, ArrowRight, ShieldCheck, CheckCircle2, Camera, Upload, X, Check } from 'lucide-react';

interface HomeFeaturedSectionsProps {
  onNavigate: (tabId: string) => void;
}

export const HomeFeaturedSections: React.FC<HomeFeaturedSectionsProps> = ({ onNavigate }) => {
  const { siteConfig, timelineEvents, photos, research, documents, isAdmin, updateSiteConfig, showToast } = useData();

  // Modal state for changing 1984 or 2025 photo
  const [photoTarget, setPhotoTarget] = useState<'history' | 'keleshek' | null>(null);
  const [photoPreview, setPhotoPreview] = useState<string>('');
  const [customUrl, setCustomUrl] = useState<string>('');

  const handleOpenPhotoModal = (target: 'history' | 'keleshek', e: React.MouseEvent) => {
    e.stopPropagation();
    setPhotoTarget(target);
    setPhotoPreview(target === 'history' ? siteConfig.historyArchiveImageUrl : siteConfig.keleshekImageUrl);
    setCustomUrl('');
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setPhotoPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSavePhoto = () => {
    const newImage = customUrl.trim() || photoPreview;
    if (newImage && photoTarget) {
      if (photoTarget === 'history') {
        updateSiteConfig({ historyArchiveImageUrl: newImage });
        showToast('1984 жылғы тарихи фото сәтті жаңартылды!', 'success');
      } else {
        updateSiteConfig({ keleshekImageUrl: newImage });
        showToast('«Келешек мектебі» суреті сәтті жаңартылды!', 'success');
      }
      setPhotoTarget(null);
    }
  };

  return (
    <div className="space-y-20 py-12 bg-transparent">
      {/* 1. Milestone KPIs strip in full width */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 p-6 rounded-2xl bg-white border border-amber-200/90 shadow-sm">
          <div className="text-center p-3 border-r border-slate-200 last:border-0">
            <span className="font-mono text-3xl sm:text-4xl font-bold text-amber-800 tabular-nums">
              1984
            </span>
            <p className="text-xs uppercase tracking-wider text-slate-500 mt-1 font-sans font-semibold">
              Іргетасы қаланды
            </p>
          </div>

          <div className="text-center p-3 sm:border-r border-slate-200 last:border-0">
            <span className="font-mono text-3xl sm:text-4xl font-bold text-emerald-700 tabular-nums">
              2025
            </span>
            <p className="text-xs uppercase tracking-wider text-slate-500 mt-1 font-sans font-semibold">
              «Келешек мектебі»
            </p>
          </div>

          <div className="text-center p-3 border-r border-slate-200 last:border-0">
            <span className="font-mono text-3xl sm:text-4xl font-bold text-amber-800 tabular-nums">
              40+
            </span>
            <p className="text-xs uppercase tracking-wider text-slate-500 mt-1 font-sans font-semibold">
              Жылдық тарихи шежіре
            </p>
          </div>

          <div className="text-center p-3">
            <span className="font-mono text-3xl sm:text-4xl font-bold text-slate-900 tabular-nums">
              {documents.length + photos.length}
            </span>
            <p className="text-xs uppercase tracking-wider text-slate-500 mt-1 font-sans font-semibold">
              Мұрағаттық жәдігерлер
            </p>
          </div>
        </div>
      </section>

      {/* 2. Dual Showcase: 1984 Historical Origin vs 2025 Modern Future */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-10 space-y-2">
          <div className="flex items-center justify-center gap-2 text-xs uppercase tracking-widest text-amber-800 font-sans font-bold">
            <QoshqarMuiiz className="w-4 h-4 text-amber-600" />
            <span>Ұрпақтар сабақтастығы</span>
          </div>
          <h2 className="font-editorial text-3xl sm:text-4xl font-bold text-slate-900">
            Өткен күннің өнегесі және болашақтың мектебі
          </h2>
          <p className="text-sm text-slate-600 font-sans">
            1984 жылғы тарихи алғашқы оқу жылы мен 2025 жылғы жаңа дәуірдің үндестігі.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Card 1: 1984 History */}
          <div
            onClick={() => onNavigate('timeline')}
            className="group rounded-2xl bg-white border border-slate-200/90 hover:border-amber-400 p-6 sm:p-8 flex flex-col justify-between transition-all duration-300 hover:shadow-xl hover:-translate-y-1 cursor-pointer relative"
          >
            <div>
              <div className="relative rounded-xl overflow-hidden aspect-[16/10] bg-slate-100 mb-6 border border-slate-200">
                <img
                  src={siteConfig.historyArchiveImageUrl}
                  alt="1984 жылғы Сазды мектебінің алғашқы қоңырауы"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />

                {isAdmin && (
                  <button
                    onClick={(e) => handleOpenPhotoModal('history', e)}
                    className="absolute top-3 right-3 z-10 px-3 py-1.5 rounded-lg bg-amber-400 hover:bg-amber-300 text-slate-950 text-xs font-bold shadow-md flex items-center gap-1.5 transition-all"
                    title="1984 ж. суретін ауыстыру"
                  >
                    <Camera className="w-3.5 h-3.5" />
                    <span>Суретті ауыстыру</span>
                  </button>
                )}
              </div>

              <div className="flex items-center gap-2 text-xs font-mono text-amber-800 mb-2">
                <span className="font-bold">1984 ЖЫЛ</span>
                <span aria-hidden="true" className="text-slate-300">·</span>
                <span className="text-emerald-700 font-semibold">Расталған факт</span>
              </div>

              <h3 className="font-editorial text-2xl font-bold text-slate-900 group-hover:text-blue-900 transition-colors mb-3">
                Алғашқы қадам: Мектеп шежіресінің бастауы
              </h3>

              <p className="text-sm text-slate-600 leading-relaxed font-sans mb-6">
                1984 жылы алғашқы мектеп қоңырауы соғылып, ауыл балалары жаңа орта мектепте білім алуды бастады. Тәжірибелі ұстаздар мен алғашқы түлектердің жарқын естеліктері осы бөлімде.
              </p>
            </div>

            <div className="flex items-center text-xs text-amber-800 font-semibold group-hover:translate-x-1.5 transition-transform">
              <span>Шежіре бөліміне өту</span>
              <ArrowRight className="w-4 h-4 ml-1.5" />
            </div>
          </div>

          {/* Card 2: 2025 Modern Keleshek School */}
          <div
            onClick={() => onNavigate('building')}
            className="group rounded-2xl bg-white border border-slate-200/90 hover:border-emerald-500 p-6 sm:p-8 flex flex-col justify-between transition-all duration-300 hover:shadow-xl hover:-translate-y-1 cursor-pointer relative"
          >
            <div>
              <div className="relative rounded-xl overflow-hidden aspect-[16/10] bg-slate-100 mb-6 border border-slate-200">
                <img
                  src={siteConfig.keleshekImageUrl}
                  alt="2025 жылғы Келешек мектебі ғимараты"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />

                {isAdmin && (
                  <button
                    onClick={(e) => handleOpenPhotoModal('keleshek', e)}
                    className="absolute top-3 right-3 z-10 px-3 py-1.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-white text-xs font-bold shadow-md flex items-center gap-1.5 transition-all"
                    title="«Келешек мектебі» суретін ауыстыру"
                  >
                    <Camera className="w-3.5 h-3.5" />
                    <span>Суретті ауыстыру</span>
                  </button>
                )}
              </div>

              <div className="flex items-center gap-2 text-xs font-mono text-emerald-700 mb-2">
                <span className="font-bold">2025 ЖЫЛ</span>
                <span aria-hidden="true" className="text-slate-300">·</span>
                <span className="text-amber-800 font-semibold">«Келешек мектебі»</span>
              </div>

              <h3 className="font-editorial text-2xl font-bold text-slate-900 group-hover:text-emerald-800 transition-colors mb-3">
                Жаңа дәуір: Заманауи білімнің жаңа көкжиегі
              </h3>

              <p className="text-sm text-slate-600 leading-relaxed font-sans mb-6">
                2025 жылы ашылған «Келешек мектебі» жаңа заманауи корпусы STEM зертханалары, цифрлық кітапхана және озық спорт аренасымен жабдықталған сапалық серпіліс.
              </p>
            </div>

            <div className="flex items-center text-xs text-emerald-700 font-semibold group-hover:translate-x-1.5 transition-transform">
              <span>«Келешек мектебі» таныстырылымы</span>
              <ArrowRight className="w-4 h-4 ml-1.5" />
            </div>
          </div>
        </div>
      </section>

      {/* 3. Research Spotlight Card */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 sm:p-10 rounded-2xl bg-gradient-to-br from-amber-50/90 via-blue-50/40 to-white text-slate-900 border-2 border-amber-300 shadow-md flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="space-y-4 max-w-2xl">
            <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-amber-900 font-sans font-bold">
              <BookOpen className="w-4 h-4 text-amber-600" />
              <span>Ғылыми жоба төлқұжаты</span>
            </div>

            <h3 className="font-editorial text-2xl sm:text-3xl font-bold text-slate-900 leading-snug">
              {research.title}
            </h3>

            <p className="text-sm text-slate-600 leading-relaxed font-sans">
              Зерттеу мақсаты: {research.aim}
            </p>

            <div className="flex flex-wrap items-center gap-4 text-xs text-slate-700 pt-2 font-sans border-t border-amber-200/60">
              <span>Жетекші: <strong className="text-amber-900">{research.supervisorName}</strong></span>
              <span aria-hidden="true" className="text-slate-300">·</span>
              <span>Зерттеуші: <strong className="text-slate-900 font-semibold">{research.authorName}</strong></span>
            </div>
          </div>

          <div className="shrink-0 flex flex-col sm:flex-row gap-3">
            <button
              onClick={() => onNavigate('research')}
              className="px-6 py-3.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs shadow-md transition-all active:scale-95"
            >
              Толық ғылыми зерттеуді оқу
            </button>
            <button
              onClick={() => onNavigate('documents')}
              className="px-6 py-3.5 rounded-lg bg-white hover:bg-slate-50 text-slate-800 font-semibold text-xs border border-slate-300 shadow-xs transition-all"
            >
              Мұрағаттық құжаттар
            </button>
          </div>
        </div>
      </section>

      {/* Quick Photo Replacement Modal */}
      {photoTarget && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm">
          <div className="bg-white border-2 border-amber-300 rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl relative">
            <button
              onClick={() => setPhotoTarget(null)}
              className="absolute top-5 right-5 p-2 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-100"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2 mb-4">
              <Camera className="w-5 h-5 text-amber-600" />
              <h3 className="font-editorial text-2xl font-bold text-slate-900">
                {photoTarget === 'history' ? '1984 ж. тарихи фотосын ауыстыру' : '«Келешек мектебі» суретін ауыстыру'}
              </h3>
            </div>

            {/* Live Preview */}
            <div className="aspect-[16/10] bg-slate-100 rounded-xl overflow-hidden border border-slate-300 mb-4 relative">
              <img
                src={photoPreview}
                alt="Алдын ала көрініс"
                className="w-full h-full object-cover"
              />
              <span className="absolute bottom-2 left-2 px-2 py-0.5 rounded bg-black/60 text-white text-[10px] font-mono">
                Алдын ала көрініс
              </span>
            </div>

            <div className="space-y-4 font-sans">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  1. Құрылғыдан жаңа фото таңдау:
                </label>
                <label className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-amber-50 hover:bg-amber-100 border-2 border-dashed border-amber-300 rounded-xl cursor-pointer text-amber-900 font-semibold text-xs transition-colors">
                  <Upload className="w-4 h-4 text-amber-600" />
                  <span>Компьютер немесе телефоннан сурет жүктеу</span>
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleFileChange}
                  />
                </label>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  2. Немесе интернет сілтемесі (URL):
                </label>
                <input
                  type="text"
                  value={customUrl}
                  onChange={(e) => {
                    setCustomUrl(e.target.value);
                    if (e.target.value.trim()) {
                      setPhotoPreview(e.target.value.trim());
                    }
                  }}
                  placeholder="https://... фото сілтемесі"
                  className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2 text-slate-900 focus:border-amber-500 focus:outline-none text-xs"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-200">
                <button
                  type="button"
                  onClick={() => setPhotoTarget(null)}
                  className="px-4 py-2 text-xs text-slate-600 hover:text-slate-900"
                >
                  Бас тарту
                </button>
                <button
                  type="button"
                  onClick={handleSavePhoto}
                  className="px-5 py-2.5 text-xs font-bold text-slate-950 bg-amber-400 hover:bg-amber-300 rounded-xl shadow-sm flex items-center gap-1.5 transition-colors"
                >
                  <Check className="w-4 h-4" />
                  <span>Сақтау және жаңарту</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
