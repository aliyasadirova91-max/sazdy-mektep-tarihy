import React, { useState } from 'react';
import { useData } from '../../context/DataContext';
import { FacilityItem } from '../../types';
import { OrnamentDivider, QoshqarMuiiz } from '../common/KazakhOrnament';
import { Building2, Sparkles, CheckCircle, Plus, Edit2, Trash2, X, Cpu, Book, Trophy, Music, Camera, Upload, Check } from 'lucide-react';

export const ModernBuildingSection: React.FC = () => {
  const { siteConfig, facilities, isAdmin, updateFacility, addFacility, deleteFacility, updateSiteConfig, showToast } = useData();

  const [isBuildingPhotoModalOpen, setIsBuildingPhotoModalOpen] = useState<boolean>(false);
  const [photoPreview, setPhotoPreview] = useState<string>(siteConfig.keleshekImageUrl);
  const [customUrl, setCustomUrl] = useState<string>('');

  const [isFormOpen, setIsFormOpen] = useState<boolean>(false);
  const [formData, setFormData] = useState<Partial<FacilityItem>>({
    title: '',
    description: '',
    capacity: '',
    features: [],
  });
  const [featureInput, setFeatureInput] = useState<string>('');

  const handleOpenAdd = () => {
    setFormData({
      title: '',
      description: '',
      capacity: '',
      features: [],
    });
    setFeatureInput('');
    setIsFormOpen(true);
  };

  const handleOpenEdit = (fac: FacilityItem) => {
    setFormData(fac);
    setFeatureInput('');
    setIsFormOpen(true);
  };

  const handleAddFeature = () => {
    if (!featureInput.trim()) return;
    const cur = formData.features || [];
    setFormData({ ...formData, features: [...cur, featureInput.trim()] });
    setFeatureInput('');
  };

  const handleRemoveFeature = (idx: number) => {
    const cur = formData.features || [];
    setFormData({ ...formData, features: cur.filter((_, i) => i !== idx) });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title) return;

    if (formData.id) {
      updateFacility(formData.id, formData);
    } else {
      addFacility({
        title: formData.title || '',
        description: formData.description || '',
        capacity: formData.capacity || '',
        features: formData.features || [],
      });
    }
    setIsFormOpen(false);
  };

  const getFacilityIcon = (title: string) => {
    if (title.toLowerCase().includes('stem') || title.toLowerCase().includes('робот')) {
      return <Cpu className="w-5 h-5 text-amber-600" />;
    }
    if (title.toLowerCase().includes('кітап') || title.toLowerCase().includes('оқу')) {
      return <Book className="w-5 h-5 text-emerald-600" />;
    }
    if (title.toLowerCase().includes('спорт') || title.toLowerCase().includes('арена')) {
      return <Trophy className="w-5 h-5 text-amber-600" />;
    }
    return <Music className="w-5 h-5 text-blue-600" />;
  };

  return (
    <section className="py-16 bg-gradient-to-b from-emerald-50/50 via-white to-slate-50 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="flex items-center justify-center gap-2 text-xs uppercase tracking-widest text-emerald-800 font-sans font-bold">
            <QoshqarMuiiz className="w-4 h-4 text-emerald-600" />
            <span>2025 ЖЫЛДЫҢ АЙТУЛЫ БЕЛЕСІ</span>
          </div>
          <h2 className="font-editorial text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 tracking-tight">
            «Келешек мектебі» жаңа ғимараты
          </h2>
          <p className="text-sm sm:text-base text-slate-600 font-sans leading-relaxed">
            2025 жылы Сазды орта мектебі халықаралық озық стандарттарға негізделген жаңа «Келешек мектебі» кешеніне көшті.
          </p>
        </div>

        <OrnamentDivider className="my-8" />

        {/* Hero Showcase with Architectural Image */}
        <div className="rounded-2xl overflow-hidden bg-white border-2 border-emerald-300 shadow-xl mb-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 items-center">
            {/* Image (7 cols) */}
            <div className="lg:col-span-7 relative aspect-[16/10] overflow-hidden bg-slate-100">
              <img
                src={siteConfig.keleshekImageUrl}
                alt="Келешек мектебі 2025 жылғы жаңа ғимараты"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
              <div className="absolute top-4 left-4 px-3 py-1.5 rounded-lg bg-emerald-600/90 text-xs font-semibold text-white backdrop-blur-md flex items-center gap-1.5 shadow">
                <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                <span>2025 ж. Қолданысқа берілді</span>
              </div>

              {isAdmin && (
                <button
                  onClick={() => {
                    setPhotoPreview(siteConfig.keleshekImageUrl);
                    setCustomUrl('');
                    setIsBuildingPhotoModalOpen(true);
                  }}
                  className="absolute top-4 right-4 z-20 px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold shadow-md flex items-center gap-1.5 transition-all"
                  title="Ғимарат суретін ауыстыру"
                >
                  <Camera className="w-3.5 h-3.5" />
                  <span>Суретті ауыстыру</span>
                </button>
              )}
            </div>

            {/* Description (5 cols) */}
            <div className="lg:col-span-5 p-6 sm:p-8 space-y-5">
              <div>
                <span className="text-xs uppercase tracking-widest text-emerald-800 font-sans font-bold">
                  Жаңа білім стандарты
                </span>
                <h3 className="font-editorial text-2xl sm:text-3xl font-bold text-slate-900 mt-1">
                  Заманауи білімнің инновациялық алаңы
                </h3>
              </div>

              <p className="text-sm text-slate-600 leading-relaxed font-sans">
                Жаңа оқу корпусы оқушылардың сапалы білім алуына, цифрлық дағдыларды еркін игеруіне және ғылыми-шығармашылық әлеуетін толық ашуына барлық қолайлы жағдаймен қамтамасыз етілген.
              </p>

              {/* Comparative metric strip */}
              <div className="pt-4 border-t border-slate-200 space-y-3">
                <div className="flex items-center justify-between text-xs py-2 px-3.5 bg-slate-50 rounded-xl border border-slate-200 text-slate-700">
                  <span>1984 жылғы тарихи алғашқы корпус:</span>
                  <span className="text-amber-800 font-bold font-mono">Дәстүрлі типтік ғимарат</span>
                </div>
                <div className="flex items-center justify-between text-xs py-2 px-3.5 bg-emerald-50 rounded-xl border border-emerald-200 text-emerald-950">
                  <span>2025 жылғы жаңа корпус:</span>
                  <span className="text-emerald-700 font-bold font-mono">«Келешек мектебі»</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Facilities Grid */}
        <div className="space-y-6">
          <div className="flex items-center justify-between gap-4 border-b border-slate-200 pb-4">
            <div>
              <h3 className="font-editorial text-2xl font-bold text-slate-900">
                Ғимарат инфрақұрылымы мен жабдықталуы
              </h3>
              <p className="text-xs text-slate-500 mt-1 font-sans">
                Сыныптар, ғылыми зертханалар, спорт және шығармашылық кешендері
              </p>
            </div>

            {isAdmin && (
              <button
                onClick={handleOpenAdd}
                className="px-3.5 py-2 text-xs font-semibold text-slate-950 bg-amber-400 hover:bg-amber-300 rounded-lg transition-colors flex items-center gap-1.5 shadow-sm"
              >
                <Plus className="w-4 h-4" />
                <span>Жаңа нысан қосу</span>
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {facilities.map((fac) => (
              <div
                key={fac.id}
                className="rounded-xl bg-white border border-slate-200 hover:border-emerald-500 p-5 shadow-xs hover:shadow-lg transition-all flex flex-col justify-between group relative"
              >
                {isAdmin && (
                  <div className="absolute top-3 right-3 flex items-center gap-1">
                    <button
                      onClick={() => handleOpenEdit(fac)}
                      className="p-1 rounded bg-slate-100 hover:bg-amber-100 text-slate-600 hover:text-amber-800 transition-colors"
                      title="Өңдеу"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => {
                        if (confirm(`«${fac.title}» нысанын жоюды растайсыз ба?`)) {
                          deleteFacility(fac.id);
                        }
                      }}
                      className="p-1 rounded bg-slate-100 hover:bg-rose-100 text-slate-600 hover:text-rose-700 transition-colors"
                      title="Жою"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                )}

                <div className="space-y-3">
                  <div className="w-10 h-10 rounded-lg bg-emerald-50 border border-emerald-200 flex items-center justify-center">
                    {getFacilityIcon(fac.title)}
                  </div>

                  <div>
                    <h4 className="font-editorial text-lg font-bold text-slate-900 group-hover:text-emerald-800 transition-colors">
                      {fac.title}
                    </h4>
                    {fac.capacity && (
                      <span className="text-[11px] font-mono text-emerald-700 block mt-0.5 font-semibold">
                        {fac.capacity}
                      </span>
                    )}
                  </div>

                  <p className="text-xs text-slate-600 leading-relaxed font-sans line-clamp-3">
                    {fac.description}
                  </p>
                </div>

                {fac.features && fac.features.length > 0 && (
                  <div className="mt-4 pt-3 border-t border-slate-100 space-y-1">
                    {fac.features.slice(0, 3).map((feat, idx) => (
                      <div key={idx} className="flex items-center gap-1.5 text-[11px] text-slate-600">
                        <CheckCircle className="w-3 h-3 text-emerald-600 shrink-0" />
                        <span className="truncate">{feat}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Modal for adding/editing facility */}
        {isFormOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm">
            <div className="bg-white border-2 border-emerald-300 rounded-2xl max-w-lg w-full p-6 sm:p-8 shadow-2xl relative max-h-[90vh] overflow-y-auto">
              <button
                onClick={() => setIsFormOpen(false)}
                className="absolute top-5 right-5 p-2 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>

              <h3 className="font-editorial text-2xl font-bold text-slate-900 mb-6">
                {formData.id ? 'Ғимарат бөлімін өңдеу' : 'Жаңа нысан / зертхана қосу'}
              </h3>

              <form onSubmit={handleSubmit} className="space-y-4 text-sm font-sans">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Нысан немесе зертхана атауы *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.title || ''}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    placeholder="Мысалы: STEM және жасанды интеллект сыныбы"
                    className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2 text-slate-900 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Сыйымдылығы (Орын саны)
                  </label>
                  <input
                    type="text"
                    value={formData.capacity || ''}
                    onChange={(e) => setFormData({ ...formData, capacity: e.target.value })}
                    placeholder="Мысалы: 30 оқушы орны"
                    className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2 text-slate-900 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Толық сипаттамасы *
                  </label>
                  <textarea
                    rows={3}
                    required
                    value={formData.description || ''}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    placeholder="Бұл кеңістіктің білім берудегі маңызы, техникалық сипаты..."
                    className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2 text-slate-900 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 focus:outline-none"
                  />
                </div>

                {/* Features */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Жабдықтар тізімі (Мүмкіндіктері)
                  </label>
                  <div className="flex gap-2 mb-2">
                    <input
                      type="text"
                      value={featureInput}
                      onChange={(e) => setFeatureInput(e.target.value)}
                      placeholder="Мысалы: 3D принтер, сандық микроскоптар"
                      className="flex-1 bg-white border border-slate-300 rounded-lg px-3 py-2 text-slate-900 focus:border-emerald-500 focus:outline-none text-xs"
                    />
                    <button
                      type="button"
                      onClick={handleAddFeature}
                      className="px-3.5 py-2 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 rounded-lg text-xs font-semibold border border-emerald-200 transition-colors"
                    >
                      Қосу
                    </button>
                  </div>

                  {formData.features && formData.features.length > 0 && (
                    <div className="space-y-1">
                      {formData.features.map((feat, idx) => (
                        <div
                          key={idx}
                          className="flex items-center justify-between text-xs p-2 bg-slate-50 rounded-lg border border-slate-200 text-slate-700"
                        >
                          <span>{feat}</span>
                          <button
                            type="button"
                            onClick={() => handleRemoveFeature(idx)}
                            className="text-rose-500 hover:text-rose-700 p-0.5"
                          >
                            <X className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-200">
                  <button
                    type="button"
                    onClick={() => setIsFormOpen(false)}
                    className="px-4 py-2 text-xs text-slate-600 hover:text-slate-900"
                  >
                    Бас тарту
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 text-xs font-semibold text-slate-950 bg-emerald-400 hover:bg-emerald-300 rounded-lg shadow-sm transition-colors"
                  >
                    Сақтау
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Building Photo Replacement Modal */}
        {isBuildingPhotoModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm">
            <div className="bg-white border-2 border-emerald-300 rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl relative font-sans">
              <button
                onClick={() => setIsBuildingPhotoModalOpen(false)}
                className="absolute top-5 right-5 p-2 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-2 mb-4">
                <Camera className="w-5 h-5 text-emerald-600" />
                <h3 className="font-editorial text-2xl font-bold text-slate-900">
                  «Келешек мектебі» суретін ауыстыру
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
                    1. Құрылғыдан (компьютер/телефон) жаңа суретті жүктеу:
                  </label>
                  <label className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-emerald-50 hover:bg-emerald-100 border-2 border-dashed border-emerald-300 rounded-xl cursor-pointer text-emerald-900 font-semibold text-xs transition-colors">
                    <Upload className="w-4 h-4 text-emerald-600" />
                    <span>Файлды таңдау</span>
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          const reader = new FileReader();
                          reader.onload = () => {
                            setPhotoPreview(reader.result as string);
                          };
                          reader.readAsDataURL(file);
                        }
                      }}
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
                    className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2 text-slate-900 focus:border-emerald-500 focus:outline-none text-xs"
                  />
                </div>

                <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-200">
                  <button
                    type="button"
                    onClick={() => setIsBuildingPhotoModalOpen(false)}
                    className="px-4 py-2 text-xs text-slate-600 hover:text-slate-900"
                  >
                    Бас тарту
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      const newImg = customUrl.trim() || photoPreview;
                      if (newImg) {
                        updateSiteConfig({ keleshekImageUrl: newImg });
                        showToast('«Келешек мектебі» суреті сәтті жаңартылды!', 'success');
                        setIsBuildingPhotoModalOpen(false);
                      }
                    }}
                    className="px-5 py-2.5 text-xs font-bold text-slate-950 bg-emerald-400 hover:bg-emerald-300 rounded-xl shadow-sm flex items-center gap-1.5 transition-colors"
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
    </section>
  );
};
