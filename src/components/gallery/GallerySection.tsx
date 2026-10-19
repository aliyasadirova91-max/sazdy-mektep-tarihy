import React, { useState } from 'react';
import { useData } from '../../context/DataContext';
import { PhotoItem } from '../../types';
import { OrnamentDivider, QoshqarMuiiz } from '../common/KazakhOrnament';
import { Image as ImageIcon, Plus, Edit2, Trash2, X, ZoomIn, Calendar, Folder } from 'lucide-react';

export const GallerySection: React.FC = () => {
  const { photos, isAdmin, addPhoto, updatePhoto, deletePhoto } = useData();

  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [selectedPhoto, setSelectedPhoto] = useState<PhotoItem | null>(null);

  // Edit / Add modal
  const [isFormOpen, setIsFormOpen] = useState<boolean>(false);
  const [formData, setFormData] = useState<Partial<PhotoItem>>({
    title: '',
    category: 'historical',
    categoryLabel: 'Тарихи шежіре',
    year: '1984',
    dateStr: '',
    description: '',
    imageUrl: '',
    sourceNote: '',
  });

  const categories = [
    { id: 'all', label: 'Барлығы' },
    { id: 'historical', label: 'Тарихи суреттер (1984-2000)' },
    { id: 'keleshek_2025', label: '«Келешек мектебі» (2025 ж.)' },
    { id: 'teachers_pupils', label: 'Ұстаздар мен шәкірттер' },
    { id: 'events', label: 'Мектеп іс-шаралары' },
    { id: 'archive', label: 'Мұрағат құжаттары' },
  ];

  const filteredPhotos = photos.filter((p) => {
    if (activeCategory === 'all') return true;
    return p.category === activeCategory;
  });

  const handleOpenAdd = () => {
    setFormData({
      title: '',
      category: 'historical',
      categoryLabel: 'Тарихи шежіре',
      year: '1984',
      dateStr: '',
      description: '',
      imageUrl: '',
      sourceNote: 'Мектеп мұрағатынан',
    });
    setIsFormOpen(true);
  };

  const handleOpenEdit = (item: PhotoItem) => {
    setFormData(item);
    setIsFormOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.imageUrl) return;

    const matchedCat = categories.find((c) => c.id === formData.category);
    const catLabel = matchedCat?.label || 'Мұрағат';

    if (formData.id) {
      updatePhoto(formData.id, {
        ...formData,
        categoryLabel: catLabel,
      });
    } else {
      addPhoto({
        title: formData.title || '',
        category: (formData.category as any) || 'historical',
        categoryLabel: catLabel,
        year: formData.year || '',
        dateStr: formData.dateStr || `${formData.year || ''} жыл`,
        description: formData.description || '',
        imageUrl: formData.imageUrl || '',
        sourceNote: formData.sourceNote || 'Мектеп мұрағаты',
      });
    }
    setIsFormOpen(false);
  };

  return (
    <section className="py-16 bg-transparent relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="flex items-center justify-center gap-2 text-xs uppercase tracking-widest text-amber-800 font-sans font-bold">
            <QoshqarMuiiz className="w-4 h-4 text-amber-600" />
            <span>Фотошежіре</span>
          </div>
          <h2 className="font-editorial text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 tracking-tight">
            Сазды мектебінің фотогалереясы
          </h2>
          <p className="text-sm sm:text-base text-slate-600 font-sans leading-relaxed">
            1984 жылғы тарихи алғашқы күндерден 2025 жылғы жаңа ғимаратқа дейінгі көрнекі сәттер.
          </p>
        </div>

        <OrnamentDivider className="my-8" />

        {/* Filter Tabs & Admin Action */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8 pb-4 border-b border-slate-200">
          <div className="flex flex-wrap items-center gap-1.5 p-1 bg-white rounded-xl border border-slate-200 shadow-xs">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap ${
                  activeCategory === cat.id
                    ? 'bg-amber-100 text-amber-900'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {isAdmin && (
            <button
              onClick={handleOpenAdd}
              className="px-3.5 py-2 text-xs font-semibold text-slate-950 bg-amber-400 hover:bg-amber-300 rounded-lg transition-colors flex items-center gap-1.5 shadow-sm"
            >
              <Plus className="w-4 h-4" />
              <span>Фото жүктеу</span>
            </button>
          )}
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPhotos.map((photo) => (
            <div
              key={photo.id}
              onClick={() => setSelectedPhoto(photo)}
              className="group relative rounded-2xl bg-white border border-slate-200 hover:border-amber-400 overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer flex flex-col"
            >
              <div className="relative aspect-[4/3] bg-slate-100 overflow-hidden">
                <img
                  src={photo.imageUrl}
                  alt={photo.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  onError={(e) => {
                    e.currentTarget.src =
                      'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="400" height="300" viewBox="0 0 400 300" fill="%23f1f5f9"><rect width="400" height="300" fill="%23f1f5f9"/><text x="50%" y="50%" fill="%23b45309" font-family="sans-serif" font-size="16" text-anchor="middle">Сазды мектебінің мұрағаты</text></svg>';
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                <div className="absolute top-3 right-3 p-1.5 rounded-full bg-white/90 text-slate-800 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity shadow">
                  <ZoomIn className="w-4 h-4 text-amber-600" />
                </div>

                {/* Admin Quick Action */}
                {isAdmin && (
                  <div
                    className="absolute top-3 left-3 flex items-center gap-1 z-10"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <button
                      onClick={() => handleOpenEdit(photo)}
                      className="p-1.5 rounded-md bg-white/90 text-amber-800 hover:text-black border border-slate-200 shadow-sm"
                      title="Өңдеу"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => {
                        if (confirm('Фотосуретті өшіруді растайсыз ба?')) {
                          deletePhoto(photo.id);
                        }
                      }}
                      className="p-1.5 rounded-md bg-white/90 text-rose-600 hover:text-black border border-slate-200 shadow-sm"
                      title="Өшіру"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                )}
              </div>

              {/* Caption & Metadata */}
              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 text-xs text-amber-800 font-sans font-semibold mb-1.5">
                    <span>{photo.categoryLabel}</span>
                    {photo.year && (
                      <>
                        <span aria-hidden="true" className="text-slate-300">·</span>
                        <span className="font-mono text-slate-700">{photo.year} ж.</span>
                      </>
                    )}
                  </div>
                  <h3 className="font-editorial text-base sm:text-lg font-bold text-slate-900 group-hover:text-blue-900 transition-colors line-clamp-2">
                    {photo.title}
                  </h3>
                  <p className="text-xs text-slate-600 line-clamp-2 mt-1 leading-relaxed">
                    {photo.description}
                  </p>
                </div>

                {photo.sourceNote && (
                  <div className="mt-3 pt-2 border-t border-slate-100 text-[11px] text-slate-500 italic">
                    Дереккөз: {photo.sourceNote}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Lightbox Modal */}
        {selectedPhoto && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm">
            <div className="bg-white border border-amber-300 rounded-3xl max-w-4xl w-full p-4 sm:p-6 overflow-y-auto max-h-[95vh] shadow-2xl relative">
              <button
                onClick={() => setSelectedPhoto(null)}
                className="absolute top-4 right-4 z-10 p-2 text-slate-600 hover:text-slate-900 bg-white/90 rounded-full hover:bg-slate-100 transition-colors shadow-sm"
                aria-label="Жабу"
              >
                <X className="w-6 h-6" />
              </button>

              <div className="rounded-2xl overflow-hidden bg-slate-100 flex items-center justify-center max-h-[65vh] mb-4 border border-slate-200">
                <img
                  src={selectedPhoto.imageUrl}
                  alt={selectedPhoto.title}
                  referrerPolicy="no-referrer"
                  className="max-h-[65vh] w-auto object-contain"
                />
              </div>

              <div className="space-y-2">
                <div className="flex flex-wrap items-center gap-2 text-xs text-amber-800 font-sans font-semibold">
                  <span>{selectedPhoto.categoryLabel}</span>
                  {selectedPhoto.dateStr && (
                    <>
                      <span aria-hidden="true" className="text-slate-300">·</span>
                      <span className="font-mono text-slate-700">{selectedPhoto.dateStr}</span>
                    </>
                  )}
                  {selectedPhoto.sourceNote && (
                    <>
                      <span aria-hidden="true" className="text-slate-300">·</span>
                      <span className="text-slate-500">Дереккөз: {selectedPhoto.sourceNote}</span>
                    </>
                  )}
                </div>

                <h3 className="font-editorial text-2xl font-bold text-slate-900">
                  {selectedPhoto.title}
                </h3>

                <p className="text-sm text-slate-700 leading-relaxed font-sans">
                  {selectedPhoto.description}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Add/Edit Modal */}
        {isFormOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm">
            <div className="bg-white border border-amber-300 rounded-3xl max-w-xl w-full p-6 sm:p-8 overflow-y-auto max-h-[90vh] shadow-2xl relative">
              <button
                onClick={() => setIsFormOpen(false)}
                className="absolute top-5 right-5 p-2 text-slate-500 hover:text-slate-900 rounded-full hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>

              <h3 className="font-editorial text-2xl font-bold text-slate-900 mb-6">
                {formData.id ? 'Фотосуретті өңдеу' : 'Жаңа фотосурет қосу'}
              </h3>

              <form onSubmit={handleSubmit} className="space-y-4 text-sm">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Фото тақырыбы немесе атауы *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.title || ''}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    placeholder="Мысалы: 1984 жылғы 1-қыркүйек алғашқы қоңырау"
                    className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-slate-900 focus:bg-white focus:border-amber-500 focus:outline-none"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Санатты таңдаңыз *
                    </label>
                    <select
                      value={formData.category || 'historical'}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value as any })}
                      className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-slate-900 focus:bg-white focus:border-amber-500 focus:outline-none text-xs"
                    >
                      <option value="historical">Тарихи суреттер (1984-2000)</option>
                      <option value="keleshek_2025">«Келешек мектебі» (2025 ж.)</option>
                      <option value="teachers_pupils">Ұстаздар мен шәкірттер</option>
                      <option value="events">Мектеп іс-шаралары</option>
                      <option value="archive">Мұрағат құжаттары</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Жылы немесе уақыты
                    </label>
                    <input
                      type="text"
                      value={formData.year || ''}
                      onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                      placeholder="Мысалы: 1984 немесе 2025"
                      className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-slate-900 focus:bg-white focus:border-amber-500 focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Сурет файлы немесе URL сілтемесі *
                  </label>
                  <div className="space-y-3">
                    {/* Live Preview Box */}
                    {formData.imageUrl && (
                      <div className="aspect-[16/10] bg-slate-100 rounded-xl overflow-hidden border border-slate-300 relative max-h-48">
                        <img
                          src={formData.imageUrl}
                          alt="Таңдалған сурет"
                          className="w-full h-full object-cover"
                        />
                        <span className="absolute bottom-2 left-2 px-2 py-0.5 rounded bg-black/60 text-white text-[10px] font-mono">
                          Алдын ала көрініс
                        </span>
                      </div>
                    )}

                    <div className="flex flex-col sm:flex-row gap-2">
                      <label className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-amber-50 hover:bg-amber-100 border-2 border-dashed border-amber-300 rounded-xl cursor-pointer text-amber-900 font-semibold text-xs transition-colors">
                        <ImageIcon className="w-4 h-4 text-amber-600" />
                        <span>Құрылғыдан фото жүктеу</span>
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) {
                              const reader = new FileReader();
                              reader.onload = () => {
                                setFormData({ ...formData, imageUrl: reader.result as string });
                              };
                              reader.readAsDataURL(file);
                            }
                          }}
                        />
                      </label>
                    </div>

                    <input
                      type="text"
                      required
                      value={formData.imageUrl || ''}
                      onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                      placeholder="Немесе сурет URL сілтемесін енгізіңіз (https://...)"
                      className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-slate-900 focus:bg-white focus:border-amber-500 focus:outline-none text-xs"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Сипаттамасы мен маңызы
                  </label>
                  <textarea
                    rows={3}
                    value={formData.description || ''}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    placeholder="Суретте кімдер бейнеленген, қай оқиғаға қатысты..."
                    className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-slate-900 focus:bg-white focus:border-amber-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Мұрағаттық дереккөз немесе автор
                  </label>
                  <input
                    type="text"
                    value={formData.sourceNote || ''}
                    onChange={(e) => setFormData({ ...formData, sourceNote: e.target.value })}
                    placeholder="Мысалы: Мектеп мұрағаты, ардагер ұстаз жеке қоры"
                    className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-slate-900 focus:bg-white focus:border-amber-500 focus:outline-none"
                  />
                </div>

                <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-200">
                  <button
                    type="button"
                    onClick={() => setIsFormOpen(false)}
                    className="px-4 py-2 text-xs font-medium text-slate-600 hover:text-slate-900"
                  >
                    Бас тарту
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 text-xs font-bold text-slate-950 bg-amber-400 hover:bg-amber-300 rounded-lg shadow-sm"
                  >
                    Сақтау
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
