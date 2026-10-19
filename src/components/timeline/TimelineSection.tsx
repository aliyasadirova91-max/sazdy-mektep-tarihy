import React, { useState } from 'react';
import { useData } from '../../context/DataContext';
import { TimelineEvent } from '../../types';
import { OrnamentDivider, QoshqarMuiiz } from '../common/KazakhOrnament';
import { Calendar, CheckCircle2, ChevronRight, Plus, Edit2, Trash2, X, Sparkles, AlertCircle, Upload } from 'lucide-react';

export const TimelineSection: React.FC<{ onNavigateToAdmin?: () => void }> = ({ onNavigateToAdmin }) => {
  const { timelineEvents, isAdmin, deleteTimelineEvent, addTimelineEvent, updateTimelineEvent } = useData();

  const [selectedEvent, setSelectedEvent] = useState<TimelineEvent | null>(null);
  const [filterEra, setFilterEra] = useState<string>('all');
  const [filterConfirmedOnly, setFilterConfirmedOnly] = useState<boolean>(false);

  // Edit / Add modal state
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [editFormData, setEditFormData] = useState<Partial<TimelineEvent>>({
    year: '',
    period: '',
    title: '',
    description: '',
    fullDetails: '',
    imageUrl: '',
    isConfirmedFact: false,
  });

  const filteredEvents = timelineEvents.filter((item) => {
    const yearNum = Number(item.year) || 0;
    if (filterConfirmedOnly && !item.isConfirmedFact) return false;

    if (filterEra === '1980s') return yearNum >= 1980 && yearNum < 2000;
    if (filterEra === '2000s') return yearNum >= 2000 && yearNum < 2025;
    if (filterEra === '2025s') return yearNum >= 2025;
    return true;
  });

  const handleOpenAdd = () => {
    setEditFormData({
      year: new Date().getFullYear(),
      period: `${new Date().getFullYear()} жыл`,
      title: '',
      description: '',
      fullDetails: '',
      imageUrl: '',
      isConfirmedFact: false,
    });
    setIsEditing(true);
  };

  const handleOpenEdit = (evt: TimelineEvent) => {
    setEditFormData(evt);
    setIsEditing(true);
  };

  const handleSaveEvent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editFormData.title || !editFormData.year) return;

    if (editFormData.id) {
      updateTimelineEvent(editFormData.id, editFormData);
    } else {
      addTimelineEvent({
        year: Number(editFormData.year) || editFormData.year || 1984,
        period: editFormData.period || `${editFormData.year} жыл`,
        title: editFormData.title || '',
        description: editFormData.description || '',
        fullDetails: editFormData.fullDetails || '',
        imageUrl: editFormData.imageUrl || '',
        isConfirmedFact: !!editFormData.isConfirmedFact,
      });
    }
    setIsEditing(false);
  };

  return (
    <section className="py-16 bg-transparent relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="flex items-center justify-center gap-2 text-xs uppercase tracking-widest text-amber-800 font-sans font-bold">
            <QoshqarMuiiz className="w-4 h-4 text-amber-600" />
            <span>Хронологиялық шежіре</span>
          </div>
          <h2 className="font-editorial text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 tracking-tight">
            Сазды мектебінің тарихи кезеңдері
          </h2>
          <p className="text-sm sm:text-base text-slate-600 font-sans leading-relaxed">
            1984 жылғы алғашқы қоңырау салтанатынан бастап 2025 жылғы заманауи «Келешек мектебі» ғимаратына дейінгі айтулы белестер.
          </p>
        </div>

        <OrnamentDivider className="my-8" />

        {/* Filter Bar (Segmented Controls) */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-10 pb-4 border-b border-slate-200">
          <div className="flex flex-wrap items-center gap-1.5 p-1 bg-white rounded-xl border border-slate-200 shadow-xs">
            <button
              onClick={() => setFilterEra('all')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap ${
                filterEra === 'all'
                  ? 'bg-amber-100 text-amber-900'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Барлық кезеңдер ({timelineEvents.length})
            </button>
            <button
              onClick={() => setFilterEra('1980s')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap ${
                filterEra === '1980s'
                  ? 'bg-amber-100 text-amber-900'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              1984–1999 жж.
            </button>
            <button
              onClick={() => setFilterEra('2000s')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap ${
                filterEra === '2000s'
                  ? 'bg-amber-100 text-amber-900'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              2000–2024 жж.
            </button>
            <button
              onClick={() => setFilterEra('2025s')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap ${
                filterEra === '2025s'
                  ? 'bg-emerald-100 text-emerald-900'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              2025 «Келешек мектебі»
            </button>
          </div>

          <div className="flex items-center gap-3">
            <label className="flex items-center gap-2 text-xs text-slate-700 cursor-pointer select-none font-medium">
              <input
                type="checkbox"
                checked={filterConfirmedOnly}
                onChange={(e) => setFilterConfirmedOnly(e.target.checked)}
                className="rounded border-slate-300 text-amber-600 focus:ring-0 bg-white"
              />
              <span>Тек расталған тарихи фактілер</span>
            </label>

            {isAdmin && (
              <button
                onClick={handleOpenAdd}
                className="px-3 py-1.5 text-xs font-semibold text-slate-950 bg-amber-400 hover:bg-amber-300 rounded-lg transition-colors flex items-center gap-1.5 shadow-sm"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Оқиға қосу</span>
              </button>
            )}
          </div>
        </div>

        {/* Timeline Stream */}
        <div className="relative">
          {/* Vertical central spine on desktop, left spine on mobile */}
          <div className="absolute left-4 md:left-1/2 top-4 bottom-4 w-0.5 bg-gradient-to-b from-amber-500/80 via-amber-400/40 to-blue-400/40 -translate-x-1/2" />

          <div className="space-y-12">
            {filteredEvents.map((evt, index) => {
              const isEven = index % 2 === 0;
              return (
                <div
                  key={evt.id}
                  className={`relative flex flex-col md:flex-row items-start ${
                    isEven ? 'md:flex-row-reverse' : ''
                  } gap-8 group`}
                >
                  {/* Timeline Node Icon (Center) */}
                  <div className="absolute left-4 md:left-1/2 top-4 -translate-x-1/2 w-8 h-8 rounded-full bg-white border-2 border-amber-500 flex items-center justify-center z-10 shadow-md group-hover:scale-110 transition-transform">
                    {evt.isConfirmedFact ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    ) : (
                      <div className="w-2.5 h-2.5 rounded-full bg-amber-500" />
                    )}
                  </div>

                  {/* Content Card (Half width) */}
                  <div className="ml-12 md:ml-0 md:w-1/2 md:px-8 w-full">
                    <div
                      onClick={() => setSelectedEvent(evt)}
                      className={`p-6 rounded-2xl bg-white border transition-all duration-200 cursor-pointer hover:shadow-xl hover:-translate-y-0.5 ${
                        evt.isConfirmedFact
                          ? 'border-amber-300 hover:border-amber-400 shadow-sm'
                          : 'border-slate-200 hover:border-slate-300 shadow-xs'
                      }`}
                    >
                      {/* Quiet Unboxed Metadata */}
                      <div className="flex items-center justify-between gap-2 text-xs text-amber-800 font-sans mb-2 font-medium">
                        <div className="flex items-center gap-1.5">
                          <Calendar className="w-3.5 h-3.5 text-amber-600" />
                          <span className="font-mono font-bold text-sm text-amber-900">{evt.period}</span>
                          <span aria-hidden="true" className="text-slate-300">·</span>
                          {evt.isConfirmedFact ? (
                            <span className="text-emerald-700 font-semibold">Расталған факт</span>
                          ) : (
                            <span className="text-slate-500">Мұрағаттық кезең</span>
                          )}
                        </div>

                        {isAdmin && (
                          <div className="flex items-center gap-1" onClick={(e) => e.stopPropagation()}>
                            <button
                              onClick={() => handleOpenEdit(evt)}
                              className="p-1 hover:text-amber-800 text-slate-400"
                              title="Өңдеу"
                            >
                              <Edit2 className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={() => {
                                if (confirm('Бұл оқиғаны өшіруді растайсыз ба?')) {
                                  deleteTimelineEvent(evt.id);
                                }
                              }}
                              className="p-1 hover:text-rose-600 text-slate-400"
                              title="Өшіру"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        )}
                      </div>

                      {/* Title */}
                      <h3 className="font-editorial text-xl sm:text-2xl font-bold text-slate-900 group-hover:text-blue-900 transition-colors mb-2">
                        {evt.title}
                      </h3>

                      {/* Description */}
                      <p className="text-sm text-slate-600 font-sans leading-relaxed mb-4">
                        {evt.description}
                      </p>

                      {/* Optional Photo Thumbnail */}
                      {evt.imageUrl && (
                        <div className="rounded-xl overflow-hidden aspect-[16/9] mb-4 bg-slate-100 border border-slate-200">
                          <img
                            src={evt.imageUrl}
                            alt={evt.title}
                            referrerPolicy="no-referrer"
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                        </div>
                      )}

                      <div className="flex items-center text-xs text-amber-800 font-semibold group-hover:translate-x-1 transition-transform">
                        <span>Толық тарихи мәліметтер</span>
                        <ChevronRight className="w-4 h-4 ml-1" />
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Event Detail Modal */}
        {selectedEvent && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm">
            <div className="bg-white border border-amber-300 rounded-3xl max-w-2xl w-full p-6 sm:p-8 overflow-y-auto max-h-[90vh] shadow-2xl relative">
              <button
                onClick={() => setSelectedEvent(null)}
                className="absolute top-5 right-5 p-2 text-slate-500 hover:text-slate-900 rounded-full hover:bg-slate-100 transition-colors"
                aria-label="Жабу"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-amber-800 font-sans font-bold mb-3">
                <span className="font-mono text-sm text-amber-900">{selectedEvent.period}</span>
                <span aria-hidden="true" className="text-slate-300">·</span>
                {selectedEvent.isConfirmedFact ? (
                  <span className="text-emerald-700 font-semibold">Ресми расталған факт</span>
                ) : (
                  <span className="text-slate-500">Мұрағаттық жазба</span>
                )}
              </div>

              <h2 className="font-editorial text-2xl sm:text-3xl font-bold text-slate-900 mb-4">
                {selectedEvent.title}
              </h2>

              {selectedEvent.imageUrl && (
                <div className="rounded-2xl overflow-hidden aspect-[16/9] mb-5 border border-slate-200 bg-slate-100">
                  <img
                    src={selectedEvent.imageUrl}
                    alt={selectedEvent.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                </div>
              )}

              <div className="space-y-4 text-sm sm:text-base text-slate-700 leading-relaxed font-sans">
                <p>{selectedEvent.description}</p>
                {selectedEvent.fullDetails && (
                  <div className="pt-4 border-t border-slate-200 text-slate-600">
                    <p className="font-bold text-amber-900 text-xs uppercase tracking-wider mb-2 font-sans">
                      Қосымша мұрағаттық анықтама:
                    </p>
                    <p>{selectedEvent.fullDetails}</p>
                  </div>
                )}
              </div>

              <div className="mt-6 pt-4 border-t border-slate-200 flex items-center justify-between text-xs text-slate-500">
                <span>Мектептің ғылыми-тарихи қоры</span>
                {isAdmin && (
                  <button
                    onClick={() => {
                      const evt = selectedEvent;
                      setSelectedEvent(null);
                      handleOpenEdit(evt);
                    }}
                    className="text-amber-800 hover:underline font-bold flex items-center gap-1"
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                    Оқиғаны өңдеу
                  </button>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Add/Edit Modal */}
        {isEditing && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm">
            <div className="bg-white border border-amber-300 rounded-3xl max-w-xl w-full p-6 sm:p-8 overflow-y-auto max-h-[90vh] shadow-2xl relative">
              <button
                onClick={() => setIsEditing(false)}
                className="absolute top-5 right-5 p-2 text-slate-500 hover:text-slate-900 rounded-full hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>

              <h3 className="font-editorial text-2xl font-bold text-slate-900 mb-6">
                {editFormData.id ? 'Тарихи оқиғаны өңдеу' : 'Жаңа тарихи оқиға қосу'}
              </h3>

              <form onSubmit={handleSaveEvent} className="space-y-4 text-sm">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Жылы (сан түрінде) *
                    </label>
                    <input
                      type="number"
                      required
                      value={editFormData.year || ''}
                      onChange={(e) =>
                        setEditFormData({ ...editFormData, year: Number(e.target.value) })
                      }
                      placeholder="1984"
                      className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-slate-900 focus:bg-white focus:border-amber-500 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Кезең белгісі (Мәтін)
                    </label>
                    <input
                      type="text"
                      value={editFormData.period || ''}
                      onChange={(e) => setEditFormData({ ...editFormData, period: e.target.value })}
                      placeholder="1984 жыл немесе 1984-1990 жж."
                      className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-slate-900 focus:bg-white focus:border-amber-500 focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Оқиға тақырыбы *
                  </label>
                  <input
                    type="text"
                    required
                    value={editFormData.title || ''}
                    onChange={(e) => setEditFormData({ ...editFormData, title: e.target.value })}
                    placeholder="Мысалы: Мектептің алғашқы қоңырауы соғылды"
                    className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-slate-900 focus:bg-white focus:border-amber-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Қысқаша сипаттамасы *
                  </label>
                  <textarea
                    rows={3}
                    required
                    value={editFormData.description || ''}
                    onChange={(e) =>
                      setEditFormData({ ...editFormData, description: e.target.value })
                    }
                    placeholder="Тарихи оқиғаның мәні..."
                    className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-slate-900 focus:bg-white focus:border-amber-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Толық деректер / Мұрағаттық жазбалар
                  </label>
                  <textarea
                    rows={4}
                    value={editFormData.fullDetails || ''}
                    onChange={(e) =>
                      setEditFormData({ ...editFormData, fullDetails: e.target.value })
                    }
                    placeholder="Құжаттар нөмірі, куәгерлер естеліктері..."
                    className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-slate-900 focus:bg-white focus:border-amber-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Сурет сілтемесі (URL) немесе құрылғыдан файл таңдаңыз
                  </label>

                  {editFormData.imageUrl && (
                    <div className="aspect-[16/9] bg-slate-100 rounded-xl overflow-hidden border border-slate-300 relative mb-2 max-h-44">
                      <img
                        src={editFormData.imageUrl}
                        alt="Таңдалған оқиға суреті"
                        className="w-full h-full object-cover"
                      />
                      <button
                        type="button"
                        onClick={() => setEditFormData({ ...editFormData, imageUrl: '' })}
                        className="absolute top-2 right-2 p-1 rounded-full bg-rose-600 hover:bg-rose-700 text-white shadow text-xs flex items-center gap-1 px-2"
                      >
                        <X className="w-3.5 h-3.5" />
                        <span>Суретті алып тастау</span>
                      </button>
                    </div>
                  )}

                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={editFormData.imageUrl || ''}
                      onChange={(e) => setEditFormData({ ...editFormData, imageUrl: e.target.value })}
                      placeholder="https://... немесе файл жүктеңіз"
                      className="flex-1 bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-slate-900 focus:bg-white focus:border-amber-500 focus:outline-none text-xs"
                    />
                    <label className="px-3.5 py-2 bg-amber-50 hover:bg-amber-100 text-xs font-semibold text-amber-900 rounded-lg cursor-pointer border border-amber-300 flex items-center gap-1.5 transition-colors">
                      <Upload className="w-3.5 h-3.5 text-amber-600" />
                      <span>Файл таңдау</span>
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) {
                            const reader = new FileReader();
                            reader.onload = () => {
                              setEditFormData({ ...editFormData, imageUrl: reader.result as string });
                            };
                            reader.readAsDataURL(file);
                          }
                        }}
                      />
                    </label>
                  </div>
                </div>

                <div className="flex items-center gap-2 pt-2">
                  <input
                    type="checkbox"
                    id="isConfirmed"
                    checked={editFormData.isConfirmedFact || false}
                    onChange={(e) =>
                      setEditFormData({ ...editFormData, isConfirmedFact: e.target.checked })
                    }
                    className="rounded border-slate-300 text-amber-600 focus:ring-0 bg-white"
                  />
                  <label htmlFor="isConfirmed" className="text-xs text-slate-700 cursor-pointer font-medium">
                    Ресми расталған тарихи факт (1984 ж. ашылуы, 2025 ж. көшуі)
                  </label>
                </div>

                <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-200">
                  <button
                    type="button"
                    onClick={() => setIsEditing(false)}
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
