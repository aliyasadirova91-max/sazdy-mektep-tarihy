import React, { useState } from 'react';
import { useData } from '../../context/DataContext';
import { VideoItem } from '../../types';
import { OrnamentDivider, QoshqarMuiiz } from '../common/KazakhOrnament';
import { Play, Plus, Edit2, Trash2, X, Film, Upload, Camera, Check, ExternalLink } from 'lucide-react';

export const VideoSection: React.FC = () => {
  const { videos, isAdmin, addVideo, updateVideo, deleteVideo, showToast } = useData();

  const [activeVideo, setActiveVideo] = useState<VideoItem | null>(null);
  const [isFormOpen, setIsFormOpen] = useState<boolean>(false);
  const [formData, setFormData] = useState<Partial<VideoItem>>({
    title: '',
    category: 'Ғылыми жоба',
    year: '2025',
    description: '',
    videoUrl: '',
    thumbnailUrl: '',
    duration: '',
  });

  // Extract YouTube embed URL helper
  const getEmbedUrl = (url: string) => {
    if (!url) return '';
    if (url.includes('youtube.com/embed/')) return url;
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return match && match[2].length === 11 ? `https://www.youtube.com/embed/${match[2]}` : null;
  };

  const handleOpenAdd = () => {
    setFormData({
      title: '',
      category: 'Мұрағат бейнесі',
      year: '2025',
      description: '',
      videoUrl: '',
      thumbnailUrl: '',
      duration: '',
    });
    setIsFormOpen(true);
  };

  const handleOpenEdit = (v: VideoItem) => {
    setFormData(v);
    setIsFormOpen(true);
  };

  const handleVideoFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 80 * 1024 * 1024) {
        alert('Бейне файлының көлемі өте үлкен (80MB-тан аз болуы тиіс). Немесе YouTube сілтемесін қолданыңыз.');
        return;
      }
      const reader = new FileReader();
      reader.onload = () => {
        setFormData((prev) => ({
          ...prev,
          videoUrl: reader.result as string,
        }));
        showToast('Бейне файлы таңдалды!', 'info');
      };
      reader.readAsDataURL(file);
    }
  };

  const handleThumbnailFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setFormData((prev) => ({
          ...prev,
          thumbnailUrl: reader.result as string,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.videoUrl) return;

    if (formData.id) {
      updateVideo(formData.id, formData);
      showToast('Бейнематериал жаңартылды!', 'success');
    } else {
      addVideo({
        title: formData.title || '',
        category: formData.category || 'Мұрағат',
        year: formData.year || '2025',
        description: formData.description || '',
        videoUrl: formData.videoUrl || '',
        thumbnailUrl: formData.thumbnailUrl || '',
        duration: formData.duration || '',
      });
      showToast('Жаңа бейне сәтті қосылды!', 'success');
    }
    setIsFormOpen(false);
  };

  return (
    <section className="py-16 bg-transparent relative font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="flex items-center justify-center gap-2 text-xs uppercase tracking-widest text-amber-800 font-sans font-bold">
            <QoshqarMuiiz className="w-4 h-4 text-amber-600" />
            <span>Деректі кино және репортаждар</span>
          </div>
          <h2 className="font-editorial text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 tracking-tight">
            Сазды мектебінің бейне мұрағаты
          </h2>
          <p className="text-sm sm:text-base text-slate-600 font-sans leading-relaxed">
            Мектеп өмірінен бейнежазбалар, ардагер ұстаздар мен түлектер сұхбаттары, ғылыми зерттеу хроникасы.
          </p>
        </div>

        <OrnamentDivider className="my-8" />

        {/* Action Header */}
        <div className="flex items-center justify-between gap-4 mb-8 pb-4 border-b border-slate-200">
          <div className="text-xs text-slate-500 font-sans">
            Жинақталған бейнелер саны: <strong className="text-amber-800 font-mono font-bold">{videos.length}</strong>
          </div>

          {isAdmin && (
            <button
              onClick={handleOpenAdd}
              className="px-3.5 py-2 text-xs font-semibold text-slate-950 bg-amber-400 hover:bg-amber-300 rounded-lg transition-colors flex items-center gap-1.5 shadow-sm"
            >
              <Plus className="w-4 h-4" />
              <span>Жаңа бейне қосу</span>
            </button>
          )}
        </div>

        {/* Video Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {videos.map((video) => {
            const isYouTube = video.videoUrl.includes('youtube') || video.videoUrl.includes('youtu.be');
            const isDirectVideo = video.videoUrl.endsWith('.mp4') || video.videoUrl.startsWith('data:video');

            return (
              <div
                key={video.id}
                className="group rounded-2xl bg-white border border-slate-200 hover:border-amber-400 overflow-hidden shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
              >
                {/* Thumbnail / Video Preview Area */}
                <div
                  onClick={() => setActiveVideo(video)}
                  className="relative aspect-video bg-slate-900 cursor-pointer overflow-hidden"
                >
                  {video.thumbnailUrl ? (
                    <img
                      src={video.thumbnailUrl}
                      alt={video.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  ) : isYouTube ? (
                    <div className="w-full h-full relative">
                      <img
                        src={`https://img.youtube.com/vi/${video.videoUrl.split('v=')[1]?.split('&')[0] || video.videoUrl.split('youtu.be/')[1]?.split('?')[0] || ''}/hqdefault.jpg`}
                        alt={video.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        onError={(e) => {
                          e.currentTarget.style.display = 'none';
                        }}
                      />
                    </div>
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center bg-slate-100 text-slate-500 p-4 text-center">
                      <Film className="w-10 h-10 text-amber-600 mb-2" />
                      <span className="text-xs font-semibold text-slate-700">Бейнематериалды көру</span>
                    </div>
                  )}

                  <div className="absolute inset-0 bg-slate-950/30 flex items-center justify-center group-hover:bg-slate-950/20 transition-colors">
                    <div className="w-12 h-12 rounded-full bg-amber-500 text-slate-950 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                      <Play className="w-5 h-5 fill-current ml-0.5" />
                    </div>
                  </div>

                  {video.duration && (
                    <span className="absolute bottom-2 right-2 px-1.5 py-0.5 rounded bg-slate-900/80 text-[11px] font-mono text-white">
                      {video.duration}
                    </span>
                  )}

                  {/* Admin controls */}
                  {isAdmin && (
                    <div
                      className="absolute top-2 right-2 flex items-center gap-1 z-10"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <button
                        onClick={() => handleOpenEdit(video)}
                        className="p-1.5 rounded-lg bg-white/95 text-amber-800 hover:text-black border border-slate-200 shadow-sm"
                        title="Бейнені өңдеу / ауыстыру"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => {
                          if (confirm('Бейнематериалды өшіруді растайсыз ба?')) {
                            deleteVideo(video.id);
                          }
                        }}
                        className="p-1.5 rounded-lg bg-white/95 text-rose-600 hover:text-black border border-slate-200 shadow-sm"
                        title="Өшіру"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  )}
                </div>

                {/* Details */}
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-2 text-xs text-amber-800 font-sans font-semibold mb-1.5">
                      <span>{video.category}</span>
                      <span aria-hidden="true" className="text-slate-300">·</span>
                      <span className="font-mono text-slate-700">{video.year} ж.</span>
                    </div>

                    <h3
                      onClick={() => setActiveVideo(video)}
                      className="font-editorial text-lg font-bold text-slate-900 group-hover:text-blue-900 transition-colors cursor-pointer line-clamp-2"
                    >
                      {video.title}
                    </h3>

                    <p className="text-xs text-slate-600 mt-2 line-clamp-2 leading-relaxed">
                      {video.description}
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
                    <button
                      onClick={() => setActiveVideo(video)}
                      className="text-xs text-amber-800 font-bold hover:underline flex items-center gap-1"
                    >
                      <span>Қосу және көру</span>
                      <Play className="w-3 h-3 fill-current" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Video Player Modal */}
        {activeVideo && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm">
            <div className="bg-white border-2 border-amber-300 rounded-3xl max-w-4xl w-full p-4 sm:p-6 shadow-2xl relative">
              <button
                onClick={() => setActiveVideo(null)}
                className="absolute top-4 right-4 z-10 p-2 text-slate-600 hover:text-slate-900 bg-white/90 rounded-full hover:bg-slate-100 transition-colors shadow-sm"
                aria-label="Жабу"
              >
                <X className="w-6 h-6" />
              </button>

              <div className="aspect-video w-full rounded-2xl overflow-hidden bg-black mb-4 border border-slate-200">
                {getEmbedUrl(activeVideo.videoUrl) ? (
                  <iframe
                    src={`${getEmbedUrl(activeVideo.videoUrl)}?autoplay=1`}
                    title={activeVideo.title}
                    className="w-full h-full border-0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                ) : (
                  <video
                    src={activeVideo.videoUrl}
                    controls
                    autoPlay
                    className="w-full h-full object-contain"
                  >
                    Браузер бейнені ойнатуды қолдамайды.
                  </video>
                )}
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs text-amber-800 font-sans font-semibold">
                  <span>{activeVideo.category}</span>
                  <span aria-hidden="true" className="text-slate-300">·</span>
                  <span className="font-mono text-slate-700">{activeVideo.year} ж.</span>
                </div>
                <h3 className="font-editorial text-xl sm:text-2xl font-bold text-slate-900">
                  {activeVideo.title}
                </h3>
                <p className="text-sm text-slate-700 leading-relaxed font-sans">
                  {activeVideo.description}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Add/Edit Video Modal with file upload and live preview */}
        {isFormOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm">
            <div className="bg-white border-2 border-amber-300 rounded-3xl max-w-xl w-full p-6 sm:p-8 overflow-y-auto max-h-[90vh] shadow-2xl relative font-sans">
              <button
                onClick={() => setIsFormOpen(false)}
                className="absolute top-5 right-5 p-2 text-slate-500 hover:text-slate-900 rounded-full hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>

              <h3 className="font-editorial text-2xl font-bold text-slate-900 mb-6">
                {formData.id ? 'Бейне ақпаратын өңдеу / ауыстыру' : 'Жаңа бейне қосу'}
              </h3>

              <form onSubmit={handleSubmit} className="space-y-4 text-sm">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Бейне тақырыбы *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.title || ''}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    placeholder="Мысалы: «Келешек мектебі» жаңа корпусы туралы репортаж"
                    className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-slate-900 focus:bg-white focus:border-amber-500 focus:outline-none"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Санаты
                    </label>
                    <input
                      type="text"
                      value={formData.category || ''}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                      placeholder="Ғылыми жоба / Сұхбат / Іс-шара"
                      className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-slate-900 focus:bg-white focus:border-amber-500 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Жылы
                    </label>
                    <input
                      type="text"
                      value={formData.year || ''}
                      onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                      placeholder="2025"
                      className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-slate-900 focus:bg-white focus:border-amber-500 focus:outline-none"
                    />
                  </div>
                </div>

                {/* Video Source: YouTube or Local File */}
                <div className="space-y-2">
                  <label className="block text-xs font-semibold text-slate-700">
                    Бейне материалы (YouTube сілтемесі немесе құрылғыдан видео файлы) *
                  </label>

                  <input
                    type="text"
                    value={formData.videoUrl?.startsWith('data:') ? 'Таңдалған жергілікті бейне файлы' : formData.videoUrl || ''}
                    onChange={(e) => setFormData({ ...formData, videoUrl: e.target.value })}
                    placeholder="https://www.youtube.com/watch?v=... немесе .mp4 сілтемесі"
                    className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-slate-900 focus:bg-white focus:border-amber-500 focus:outline-none text-xs"
                  />

                  <div className="flex items-center gap-2">
                    <label className="flex-1 flex items-center justify-center gap-2 px-3 py-2.5 bg-amber-50 hover:bg-amber-100 border border-amber-300 rounded-xl cursor-pointer text-amber-900 font-semibold text-xs transition-colors">
                      <Upload className="w-4 h-4 text-amber-600" />
                      <span>Компьютер / телефоннан бейне жүктеу (MP4 / WebM)</span>
                      <input
                        type="file"
                        accept="video/mp4,video/webm,video/ogg"
                        className="hidden"
                        onChange={handleVideoFileChange}
                      />
                    </label>
                  </div>
                </div>

                {/* Optional Custom Cover Thumbnail */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Бейненің мұқаба суреті (Кадр немесе фото)
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={formData.thumbnailUrl || ''}
                      onChange={(e) => setFormData({ ...formData, thumbnailUrl: e.target.value })}
                      placeholder="https://... фото сілтемесі"
                      className="flex-1 bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-slate-900 focus:bg-white focus:border-amber-500 focus:outline-none text-xs"
                    />
                    <label className="px-3 py-2 bg-slate-100 hover:bg-slate-200 text-xs font-semibold text-slate-700 rounded-lg cursor-pointer border border-slate-300 flex items-center gap-1.5">
                      <Camera className="w-3.5 h-3.5 text-amber-600" />
                      <span>Фото жүктеу</span>
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={handleThumbnailFileChange}
                      />
                    </label>
                  </div>
                </div>

                {/* Live Preview Box */}
                {formData.videoUrl && (
                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
                    <span className="text-[11px] font-semibold text-slate-700 block">Алдын ала тексеру көрінісі:</span>
                    <div className="aspect-video rounded-lg overflow-hidden bg-black max-h-48">
                      {getEmbedUrl(formData.videoUrl) ? (
                        <iframe
                          src={getEmbedUrl(formData.videoUrl) || ''}
                          title="Тексеру"
                          className="w-full h-full border-0"
                        />
                      ) : (
                        <video
                          src={formData.videoUrl}
                          controls
                          className="w-full h-full object-contain"
                        />
                      )}
                    </div>
                  </div>
                )}

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Ұзақтығы (Мысалы: 03:45)
                  </label>
                  <input
                    type="text"
                    value={formData.duration || ''}
                    onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                    placeholder="05:20"
                    className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-slate-900 focus:bg-white focus:border-amber-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Сипаттамасы
                  </label>
                  <textarea
                    rows={3}
                    value={formData.description || ''}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    placeholder="Бейне мазмұны туралы қысқаша мәлімет..."
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
                    className="px-5 py-2.5 text-xs font-bold text-slate-950 bg-amber-400 hover:bg-amber-300 rounded-xl shadow-sm flex items-center gap-1.5 transition-colors"
                  >
                    <Check className="w-4 h-4" />
                    <span>Сақтау</span>
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
