import React, { useState } from 'react';
import { useData } from '../../context/DataContext';
import { DocumentItem } from '../../types';
import { OrnamentDivider, QoshqarMuiiz } from '../common/KazakhOrnament';
import { FileText, Download, Plus, Edit2, Trash2, X, Eye, Calendar, Tag } from 'lucide-react';

export const DocumentsSection: React.FC = () => {
  const { documents, isAdmin, addDocument, updateDocument, deleteDocument } = useData();

  const [selectedDoc, setSelectedDoc] = useState<DocumentItem | null>(null);
  const [isFormOpen, setIsFormOpen] = useState<boolean>(false);
  const [formData, setFormData] = useState<Partial<DocumentItem>>({
    title: '',
    accessionCode: '',
    dateStr: '',
    category: 'Тарихи шешімдер',
    description: '',
    fileUrl: '',
    fileType: 'image',
  });

  const handleOpenAdd = () => {
    setFormData({
      title: '',
      accessionCode: `МҰР-${new Date().getFullYear()}/${String(documents.length + 1).padStart(3, '0')}`,
      dateStr: '1984 жыл',
      category: 'Мұрағаттық құжат',
      description: '',
      fileUrl: '',
      fileType: 'image',
    });
    setIsFormOpen(true);
  };

  const handleOpenEdit = (doc: DocumentItem) => {
    setFormData(doc);
    setIsFormOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.fileUrl) return;

    if (formData.id) {
      updateDocument(formData.id, formData);
    } else {
      addDocument({
        title: formData.title || '',
        accessionCode: formData.accessionCode || 'МҰР-000',
        dateStr: formData.dateStr || '1984 ж.',
        category: formData.category || 'Мұрағат',
        description: formData.description || '',
        fileUrl: formData.fileUrl || '',
        thumbnailUrl: formData.thumbnailUrl || formData.fileUrl,
        fileType: (formData.fileType as any) || 'image',
      });
    }
    setIsFormOpen(false);
  };

  return (
    <section className="py-16 bg-gradient-to-b from-amber-50/30 via-white to-slate-50 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="flex items-center justify-center gap-2 text-xs uppercase tracking-widest text-amber-800 font-sans font-bold">
            <QoshqarMuiiz className="w-4 h-4 text-amber-600" />
            <span>Мұрағат қоры</span>
          </div>
          <h2 className="font-editorial text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 tracking-tight">
            Тарихи құжаттар қоры
          </h2>
          <p className="text-sm sm:text-base text-slate-600 font-sans leading-relaxed">
            1984 жылдан бастап мектептің ресми қызметін айғақтайтын бұйрықтар, педагогикалық хаттамалар және куәліктер.
          </p>
        </div>

        <OrnamentDivider className="my-8" />

        <div className="flex items-center justify-between gap-4 mb-8 pb-4 border-b border-slate-200">
          <div className="text-xs text-slate-600 font-sans">
            Тіркелген құжаттар: <strong className="text-amber-800 font-mono font-bold">{documents.length}</strong>
          </div>

          {isAdmin && (
            <button
              onClick={handleOpenAdd}
              className="px-3.5 py-2 text-xs font-semibold text-slate-950 bg-amber-400 hover:bg-amber-300 rounded-lg transition-colors flex items-center gap-1.5 shadow-sm"
            >
              <Plus className="w-4 h-4" />
              <span>Құжат тіркеу</span>
            </button>
          )}
        </div>

        {/* Documents Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {documents.map((doc) => (
            <div
              key={doc.id}
              onClick={() => setSelectedDoc(doc)}
              className="rounded-2xl bg-white border border-slate-200 hover:border-amber-400 p-5 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between group cursor-pointer relative"
            >
              {/* Admin controls */}
              {isAdmin && (
                <div
                  className="absolute top-4 right-4 flex items-center gap-1 z-10"
                  onClick={(e) => e.stopPropagation()}
                >
                  <button
                    onClick={() => handleOpenEdit(doc)}
                    className="p-1.5 rounded-lg bg-slate-100 text-slate-700 hover:text-amber-800 hover:bg-amber-50 border border-slate-200"
                    title="Өңдеу"
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => {
                      if (confirm('Бұл құжатты өшіруді растайсыз ба?')) {
                        deleteDocument(doc.id);
                      }
                    }}
                    className="p-1.5 rounded-lg bg-slate-100 text-rose-600 hover:text-rose-800 hover:bg-rose-50 border border-slate-200"
                    title="Өшіру"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              )}

              <div>
                {/* Thumbnail / Header */}
                <div className="aspect-[16/10] bg-slate-100 rounded-xl overflow-hidden border border-slate-200 mb-4 relative">
                  {doc.fileUrl ? (
                    <img
                      src={doc.fileUrl}
                      alt={doc.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      onError={(e) => {
                        e.currentTarget.style.display = 'none';
                      }}
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <FileText className="w-12 h-12 text-amber-500/40" />
                    </div>
                  )}

                  <span className="absolute top-2 left-2 px-2.5 py-1 rounded-md bg-white/95 text-[11px] font-mono font-bold text-amber-900 border border-amber-300 shadow-xs">
                    {doc.accessionCode}
                  </span>
                </div>

                <div className="flex items-center gap-2 text-xs text-amber-800 font-sans mb-1.5 font-semibold">
                  <span>{doc.category}</span>
                  <span aria-hidden="true" className="text-slate-300">·</span>
                  <span className="font-mono text-slate-500">{doc.dateStr}</span>
                </div>

                <h3 className="font-editorial text-lg font-bold text-slate-900 group-hover:text-blue-900 transition-colors line-clamp-2">
                  {doc.title}
                </h3>

                <p className="text-xs text-slate-600 mt-2 line-clamp-3 leading-relaxed font-sans">
                  {doc.description}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-amber-800 font-semibold font-sans">
                <span className="flex items-center gap-1 group-hover:underline">
                  <Eye className="w-3.5 h-3.5 text-amber-600" />
                  Құжатты толық ашу
                </span>
                <span className="text-[11px] uppercase tracking-wider text-slate-500 font-mono">
                  {doc.fileType.toUpperCase()}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Document Viewer Modal */}
        {selectedDoc && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm">
            <div className="bg-white border-2 border-amber-300 rounded-2xl max-w-4xl w-full p-6 sm:p-8 overflow-y-auto max-h-[95vh] shadow-2xl relative">
              <button
                onClick={() => setSelectedDoc(null)}
                className="absolute top-5 right-5 z-10 p-2 text-slate-500 hover:text-slate-800 bg-slate-100 rounded-full hover:bg-slate-200 transition-colors"
                aria-label="Жабу"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-amber-800 font-sans font-bold mb-2">
                <span className="font-mono text-amber-900">{selectedDoc.accessionCode}</span>
                <span aria-hidden="true">·</span>
                <span>{selectedDoc.category}</span>
                <span aria-hidden="true">·</span>
                <span className="font-mono text-slate-600">{selectedDoc.dateStr}</span>
              </div>

              <h2 className="font-editorial text-2xl sm:text-3xl font-bold text-slate-900 mb-4">
                {selectedDoc.title}
              </h2>

              <div className="rounded-xl overflow-hidden bg-slate-100 flex items-center justify-center max-h-[60vh] mb-4 border border-slate-200 p-2">
                <img
                  src={selectedDoc.fileUrl}
                  alt={selectedDoc.title}
                  referrerPolicy="no-referrer"
                  className="max-h-[58vh] w-auto object-contain rounded-lg"
                />
              </div>

              <div className="space-y-4 text-sm text-slate-700 font-sans">
                <p className="leading-relaxed">{selectedDoc.description}</p>

                <div className="pt-4 border-t border-slate-200 flex items-center justify-between">
                  <span className="text-xs text-slate-500">Мектептің ғылыми мұрағат қорынан</span>
                  <a
                    href={selectedDoc.fileUrl}
                    download={`sazdy_${selectedDoc.accessionCode}.jpg`}
                    className="px-4 py-2 text-xs font-semibold text-slate-950 bg-amber-400 hover:bg-amber-300 rounded-lg flex items-center gap-1.5 shadow-sm transition-colors"
                  >
                    <Download className="w-4 h-4" />
                    <span>Құжатты жүктеп алу</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Add/Edit Modal */}
        {isFormOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm">
            <div className="bg-white border-2 border-amber-300 rounded-2xl max-w-xl w-full p-6 sm:p-8 overflow-y-auto max-h-[90vh] shadow-2xl relative">
              <button
                onClick={() => setIsFormOpen(false)}
                className="absolute top-5 right-5 p-2 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>

              <h3 className="font-editorial text-2xl font-bold text-slate-900 mb-6">
                {formData.id ? 'Тарихи құжатты өңдеу' : 'Жаңа тарихи құжат тіркеу'}
              </h3>

              <form onSubmit={handleSubmit} className="space-y-4 text-sm font-sans">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Құжат атауы немесе тақырыбы *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.title || ''}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    placeholder="Мысалы: 1984 жылғы мектептің ашылу бұйрығы"
                    className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2 text-slate-900 focus:border-amber-500 focus:outline-none"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Мұрағаттық шифр (Код)
                    </label>
                    <input
                      type="text"
                      value={formData.accessionCode || ''}
                      onChange={(e) => setFormData({ ...formData, accessionCode: e.target.value })}
                      placeholder="МҰР-1984/001"
                      className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2 text-slate-900 focus:border-amber-500 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Уақыты немесе мерзімі
                    </label>
                    <input
                      type="text"
                      value={formData.dateStr || ''}
                      onChange={(e) => setFormData({ ...formData, dateStr: e.target.value })}
                      placeholder="1984 жыл, қыркүйек"
                      className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2 text-slate-900 focus:border-amber-500 focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Санаты
                  </label>
                  <input
                    type="text"
                    value={formData.category || ''}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    placeholder="Тарихи бұйрықтар / Хаттамалар / Мақтау қағаздары"
                    className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2 text-slate-900 focus:border-amber-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Құжат сканы немесе фотосы *
                  </label>
                  <div className="space-y-3">
                    {/* Live Preview */}
                    {formData.fileUrl && (
                      <div className="aspect-[16/10] bg-slate-100 rounded-xl overflow-hidden border border-slate-300 relative max-h-48 p-1">
                        <img
                          src={formData.fileUrl}
                          alt="Таңдалған құжат"
                          className="w-full h-full object-contain"
                        />
                        <span className="absolute bottom-2 left-2 px-2 py-0.5 rounded bg-black/60 text-white text-[10px] font-mono">
                          Құжат көрінісі
                        </span>
                      </div>
                    )}

                    <div className="flex flex-col sm:flex-row gap-2">
                      <label className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-amber-50 hover:bg-amber-100 border-2 border-dashed border-amber-300 rounded-xl cursor-pointer text-amber-900 font-semibold text-xs transition-colors">
                        <FileText className="w-4 h-4 text-amber-600" />
                        <span>Құрылғыдан құжат суретін / сканын жүктеу</span>
                        <input
                          type="file"
                          accept="image/*,application/pdf"
                          className="hidden"
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) {
                              const reader = new FileReader();
                              reader.onload = () => {
                                setFormData({ ...formData, fileUrl: reader.result as string });
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
                      value={formData.fileUrl || ''}
                      onChange={(e) => setFormData({ ...formData, fileUrl: e.target.value })}
                      placeholder="Немесе құжат URL сілтемесін енгізіңіз (https://...)"
                      className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2 text-slate-900 focus:border-amber-500 focus:outline-none text-xs"
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
                    placeholder="Құжат мазмұны, шешімдері және қол қойған тұлғалар..."
                    className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2 text-slate-900 focus:border-amber-500 focus:outline-none"
                  />
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
                    className="px-5 py-2 text-xs font-semibold text-slate-950 bg-amber-400 hover:bg-amber-300 rounded-lg shadow-sm"
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
