import React, { useState } from 'react';
import { useData } from '../../context/DataContext';
import { OrnamentDivider, QoshqarMuiiz } from '../common/KazakhOrnament';
import { ArrowRight, BookOpen, Clock, Sparkles, Building2, Camera, Upload, X, Check } from 'lucide-react';

interface HeroSectionProps {
  onNavigate: (tabId: string) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onNavigate }) => {
  const { siteConfig, timelineEvents, photos, documents, isAdmin, updateSiteConfig, showToast } = useData();

  const [isPhotoModalOpen, setIsPhotoModalOpen] = useState(false);
  const [photoPreview, setPhotoPreview] = useState(siteConfig.heroImageUrl);
  const [customUrl, setCustomUrl] = useState('');

  const handleOpenPhotoModal = () => {
    setPhotoPreview(siteConfig.heroImageUrl);
    setCustomUrl('');
    setIsPhotoModalOpen(true);
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
    if (newImage) {
      updateSiteConfig({ heroImageUrl: newImage });
      showToast('Басты мектеп фотосы сәтті жаңартылды!', 'success');
      setIsPhotoModalOpen(false);
    }
  };

  return (
    <section className="relative overflow-hidden pt-8 pb-16 lg:py-20 bg-gradient-to-b from-blue-50/60 via-white to-[#faf9f6]">
      {/* Background Kazakh pattern glow */}
      <div className="absolute inset-0 bg-kazakh-pattern opacity-60 pointer-events-none" />
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-amber-200/30 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/3 left-10 w-96 h-96 bg-blue-100/40 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Institutional Kicker with unboxed metadata */}
        <div className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-amber-900 mb-6 tracking-wide">
          <QoshqarMuiiz className="w-5 h-5 text-amber-600 shrink-0" />
          <span>Тарихи-өлкетанулық ғылыми жоба</span>
          <span aria-hidden="true" className="text-amber-400">·</span>
          <span>1984 жылдан бүгінге дейін</span>
          <span aria-hidden="true" className="text-amber-400">·</span>
          <span className="text-emerald-700 font-bold">«Келешек мектебі» дәуірі (2025)</span>
        </div>

        {/* 2-Column Split: Hero Headline & Large Architectural Photography */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left: Headline, Description & CTAs (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            <h1 className="font-editorial text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-900 tracking-tight leading-[1.15] text-balance">
              {siteConfig.heroHeadline}
            </h1>

            <p className="text-base sm:text-lg text-slate-700 font-sans leading-relaxed max-w-2xl">
              {siteConfig.heroSubheadline}
            </p>

            {/* Confirmed Facts Callout with subtle borders */}
            <div className="p-4 sm:p-5 rounded-2xl bg-white border border-amber-300 shadow-md space-y-3">
              <div className="text-xs font-bold uppercase tracking-wider text-amber-800 flex items-center gap-2 font-sans">
                <Sparkles className="w-4 h-4 text-amber-600" />
                <span>Расталған тарихи кезеңдер</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm font-sans">
                <div className="flex items-start gap-2.5">
                  <span className="font-mono font-bold text-amber-800 text-base leading-none mt-0.5">1984:</span>
                  <span className="text-slate-700">Сазды орта мектебінің ресми іргесі қаланып, алғашқы қоңырауы соғылды.</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <span className="font-mono font-bold text-emerald-700 text-base leading-none mt-0.5">2025:</span>
                  <span className="text-slate-700">Озық инфрақұрылымды жаңа «Келешек мектебі» ғимаратына көшті.</span>
                </div>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={() => onNavigate('timeline')}
                className="px-6 py-3.5 rounded-lg bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold text-sm shadow-md hover:shadow-lg flex items-center gap-2.5 transition-all transform active:scale-95"
              >
                <span>Тарихи шежірені көру</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => onNavigate('building')}
                className="px-5 py-3.5 rounded-lg bg-white hover:bg-slate-50 text-slate-800 font-semibold text-sm border border-slate-300 hover:border-amber-400 shadow-xs transition-all flex items-center gap-2"
              >
                <Building2 className="w-4 h-4 text-emerald-600" />
                <span>«Келешек мектебі» ғимараты</span>
              </button>

              <button
                onClick={() => onNavigate('research')}
                className="px-5 py-3.5 rounded-lg bg-amber-50/80 hover:bg-amber-100 text-amber-900 font-semibold text-sm border border-amber-300 hover:border-amber-400 shadow-xs transition-all flex items-center gap-2"
              >
                <BookOpen className="w-4 h-4 text-amber-700" />
                <span>Ғылыми жоба</span>
              </button>
            </div>
          </div>

          {/* Right: Large School Photo on Homepage with Kazakh ornament frame (5 cols) */}
          <div className="lg:col-span-5">
            <div className="relative rounded-2xl p-2 bg-white border-2 border-amber-300 shadow-xl group">
              <div className="relative overflow-hidden rounded-xl aspect-[16/10] bg-slate-100">
                <img
                  src={siteConfig.heroImageUrl}
                  alt="Сазды орта мектебінің бас қасбеті"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/20 to-transparent pointer-events-none" />

                {/* Admin Quick Photo Replace Button directly on Image */}
                {isAdmin && (
                  <button
                    onClick={handleOpenPhotoModal}
                    className="absolute top-3 right-3 z-20 px-3 py-1.5 rounded-lg bg-amber-400 hover:bg-amber-300 text-slate-950 text-xs font-bold shadow-lg flex items-center gap-1.5 transition-all transform hover:scale-105"
                    title="Мектептің басты суретін ауыстыру"
                  >
                    <Camera className="w-4 h-4" />
                    <span>Суретті ауыстыру</span>
                  </button>
                )}

                {/* Bottom caption on image */}
                <div className="absolute bottom-3 left-4 right-4 text-left">
                  <p className="text-xs uppercase tracking-widest text-amber-300 font-sans font-semibold">
                    Сәулеттік шежіре
                  </p>
                  <p className="text-sm font-editorial text-white font-bold">
                    Сазды орта мектебі — ауылдың рухани-білім ордасы
                  </p>
                </div>
              </div>

              {/* Decorative Corner Filigree */}
              <div className="absolute -top-1 -left-1 w-6 h-6 border-t-2 border-l-2 border-amber-500 rounded-tl-lg pointer-events-none" />
              <div className="absolute -top-1 -right-1 w-6 h-6 border-t-2 border-r-2 border-amber-500 rounded-tr-lg pointer-events-none" />
              <div className="absolute -bottom-1 -left-1 w-6 h-6 border-b-2 border-l-2 border-amber-500 rounded-bl-lg pointer-events-none" />
              <div className="absolute -bottom-1 -right-1 w-6 h-6 border-b-2 border-r-2 border-amber-500 rounded-br-lg pointer-events-none" />
            </div>

            {/* Quick unboxed metric strip below photo */}
            <div className="mt-4 flex items-center justify-between text-xs text-slate-600 px-2 font-sans font-medium">
              <div className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-amber-600" />
                <span>40 жылдан астам тарих</span>
              </div>
              <span aria-hidden="true" className="text-slate-300">·</span>
              <div>
                <span className="text-amber-800 font-mono font-bold">{timelineEvents.length}</span> тарихи кезең
              </div>
              <span aria-hidden="true" className="text-slate-300">·</span>
              <div>
                <span className="text-amber-800 font-mono font-bold">{photos.length}</span> мұрағаттық фото
              </div>
            </div>
          </div>
        </div>

        {/* Curatorial Introduction / Welcome Address */}
        <div className="mt-16 pt-12 border-t border-slate-200">
          <div className="max-w-4xl mx-auto p-6 sm:p-8 rounded-2xl bg-white border border-amber-200/90 shadow-sm relative">
            <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-amber-800 font-sans font-bold mb-3">
              <QoshqarMuiiz className="w-4 h-4 text-amber-600" />
              <span>Ғылыми жоба жетекшісінің сөзі</span>
            </div>

            <p className="text-base sm:text-lg text-slate-800 font-editorial italic leading-relaxed">
              «{siteConfig.welcomeMessage}»
            </p>

            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500 font-sans">
              <span>Сазды орта мектебінің тарихы және өлкетану зерттеулері</span>
              <span className="font-semibold text-amber-900">Сазды ауылы • 1984–2026</span>
            </div>
          </div>
        </div>
      </div>

      {/* Hero Photo Replacement Modal */}
      {isPhotoModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm">
          <div className="bg-white border-2 border-amber-300 rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl relative">
            <button
              onClick={() => setIsPhotoModalOpen(false)}
              className="absolute top-5 right-5 p-2 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-100"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2 mb-4">
              <Camera className="w-5 h-5 text-amber-600" />
              <h3 className="font-editorial text-2xl font-bold text-slate-900">
                Басты мектеп фотосын ауыстыру
              </h3>
            </div>

            <p className="text-xs text-slate-600 mb-4 font-sans">
              Компьютерден немесе телефоннан жаңа суретті жүктеңіз немесе тікелей интернет сілтемесін енгізіңіз.
            </p>

            {/* Live Preview Box */}
            <div className="aspect-[16/10] bg-slate-100 rounded-xl overflow-hidden border border-slate-300 mb-4 relative">
              <img
                src={photoPreview}
                alt="Жаңа суретті алдын ала қарау"
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.currentTarget.src = siteConfig.heroImageUrl;
                }}
              />
              <span className="absolute bottom-2 left-2 px-2 py-0.5 rounded bg-black/60 text-white text-[10px] font-mono">
                Алдын ала көрініс
              </span>
            </div>

            <div className="space-y-4 font-sans">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  1. Компьютерден / телефоннан файлды таңдау:
                </label>
                <label className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-amber-50 hover:bg-amber-100 border-2 border-dashed border-amber-300 rounded-xl cursor-pointer text-amber-900 font-semibold text-xs transition-colors">
                  <Upload className="w-4 h-4 text-amber-600" />
                  <span>Құрылғыдан жаңа фотосурет жүктеу</span>
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
                  2. Немесе интернеттегі сурет сілтемесі (URL):
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
                  onClick={() => setIsPhotoModalOpen(false)}
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
    </section>
  );
};
