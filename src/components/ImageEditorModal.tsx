import React, { useState, useEffect } from 'react';
import { useStore } from '../context/StoreContext';
import { X, Upload, Link2, Check, Image as ImageIcon, Sparkles } from 'lucide-react';

const PRESET_IMAGES = [
  { name: 'بطل خارق / سبايدر مان', url: 'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&w=800&q=80' },
  { name: 'سباق سيارات ممتع', url: 'https://images.unsplash.com/photo-1511919884226-fd3cad34687c?auto=format&fit=crop&w=800&q=80' },
  { name: 'أميرة سحرية وقلعة', url: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=800&q=80' },
  { name: 'مملكة الديناصورات', url: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&w=800&q=80' },
  { name: 'فضاء ومجرات وكواكب', url: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=800&q=80' },
  { name: 'طفل يقرأ قصة بسعادة', url: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=800&q=80' },
  { name: 'علبة هدية فاخرة', url: 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&w=800&q=80' },
  { name: 'طفلة مبتسمة تقرأ', url: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=800&q=80' },
];

export const ImageEditorModal: React.FC = () => {
  const { editingImageTarget, closeImageEditor, updateImageAtPath } = useStore();
  const [selectedUrl, setSelectedUrl] = useState('');
  const [urlInput, setUrlInput] = useState('');
  const [activeTab, setActiveTab] = useState<'upload' | 'url' | 'presets'>('upload');
  const [dragActive, setDragActive] = useState(false);

  useEffect(() => {
    if (editingImageTarget) {
      setSelectedUrl(editingImageTarget.currentUrl);
      setUrlInput(editingImageTarget.currentUrl);
    }
  }, [editingImageTarget]);

  if (!editingImageTarget) return null;

  const handleFileUpload = (file: File) => {
    if (!file.type.startsWith('image/')) {
      alert('يرجى اختيار ملف صورة صالح (PNG, JPG, WebP)');
      return;
    }
    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result as string;
      if (result) {
        setSelectedUrl(result);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileUpload(e.dataTransfer.files[0]);
    }
  };

  const handleSave = () => {
    if (!selectedUrl) return;
    updateImageAtPath(editingImageTarget.path, selectedUrl);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden border border-purple-100 flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-slate-100 bg-gradient-to-r from-purple-50 to-pink-50">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-purple-600 text-white flex items-center justify-center shadow">
              <ImageIcon className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-slate-800 text-base">تغيير الصورة</h3>
              <p className="text-xs text-slate-500">{editingImageTarget.label || 'تعديل الصورة الحالية'}</p>
            </div>
          </div>
          <button
            onClick={closeImageEditor}
            className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-slate-200 text-slate-500 transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-slate-100 bg-slate-50 p-1 gap-1">
          <button
            type="button"
            onClick={() => setActiveTab('upload')}
            className={`flex-1 py-2 text-xs font-bold rounded-lg flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
              activeTab === 'upload' ? 'bg-white text-purple-700 shadow-sm' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Upload className="w-3.5 h-3.5" /> رفع من الجهاز
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('url')}
            className={`flex-1 py-2 text-xs font-bold rounded-lg flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
              activeTab === 'url' ? 'bg-white text-purple-700 shadow-sm' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Link2 className="w-3.5 h-3.5" /> رابط إنترنت (URL)
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('presets')}
            className={`flex-1 py-2 text-xs font-bold rounded-lg flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
              activeTab === 'presets' ? 'bg-white text-purple-700 shadow-sm' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" /> صور جاهزة
          </button>
        </div>

        {/* Tab Contents */}
        <div className="p-4 overflow-y-auto flex-1 space-y-4">
          {activeTab === 'upload' && (
            <div>
              <label
                onDragOver={(e) => {
                  e.preventDefault();
                  setDragActive(true);
                }}
                onDragLeave={() => setDragActive(false)}
                onDrop={handleDrop}
                className={`flex flex-col items-center justify-center p-6 border-2 border-dashed rounded-xl cursor-pointer transition-all ${
                  dragActive ? 'border-purple-600 bg-purple-50' : 'border-purple-200 hover:border-purple-400 bg-purple-50/30'
                }`}
              >
                <Upload className="w-10 h-10 text-purple-600 mb-2 animate-bounce" />
                <span className="font-bold text-sm text-slate-700">اضغط هنا لاختيار صورة من جهازك</span>
                <span className="text-xs text-slate-500 mt-1">أو اسحب الصورة وأفلتها هنا مباشرة</span>
                <span className="text-[11px] text-purple-600 font-semibold mt-2 bg-purple-100 px-2 py-0.5 rounded-full">
                  يدعم PNG, JPG, WebP
                </span>
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => {
                    if (e.target.files && e.target.files[0]) {
                      handleFileUpload(e.target.files[0]);
                    }
                  }}
                />
              </label>
            </div>
          )}

          {activeTab === 'url' && (
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-700 block">رابط الصورة المباشر:</label>
              <div className="flex gap-2">
                <input
                  type="url"
                  placeholder="https://example.com/photo.jpg"
                  value={urlInput}
                  onChange={(e) => {
                    setUrlInput(e.target.value);
                    setSelectedUrl(e.target.value);
                  }}
                  className="flex-1 text-sm p-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-purple-400 focus:outline-none"
                  dir="ltr"
                />
              </div>
              <p className="text-[11px] text-slate-500">يمكنك لصق أي رابط صورة من الإنترنت من موقعك أو من Google أو Unsplash.</p>
            </div>
          )}

          {activeTab === 'presets' && (
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-700 block">اختر من الصور المقترحة لمتجر قصتي:</label>
              <div className="grid grid-cols-2 gap-2 max-h-48 overflow-y-auto p-1">
                {PRESET_IMAGES.map((preset, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => {
                      setSelectedUrl(preset.url);
                      setUrlInput(preset.url);
                    }}
                    className={`flex items-center gap-2 p-1.5 rounded-lg border text-right transition-all cursor-pointer ${
                      selectedUrl === preset.url
                        ? 'border-purple-600 bg-purple-50 ring-2 ring-purple-400'
                        : 'border-slate-200 hover:border-slate-300 bg-white'
                    }`}
                  >
                    <img src={preset.url} alt={preset.name} className="w-12 h-12 object-cover rounded-md" />
                    <span className="text-xs font-semibold text-slate-700 line-clamp-2">{preset.name}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Live Preview */}
          <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
            <span className="text-xs font-bold text-slate-600 mb-2 block">معاينة الصورة الجديدة:</span>
            <div className="h-44 w-full rounded-lg overflow-hidden bg-slate-200 flex items-center justify-center border border-slate-300">
              {selectedUrl ? (
                <img
                  src={selectedUrl}
                  alt="Preview"
                  className="w-full h-full object-contain"
                  onError={() => alert('تعذر تحميل الصورة من الرابط، يرجى التأكد من صحة الرابط')}
                />
              ) : (
                <span className="text-xs text-slate-400">لا توجد صورة محددة</span>
              )}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between p-4 border-t border-slate-100 bg-slate-50">
          <button
            type="button"
            onClick={closeImageEditor}
            className="px-4 py-2 text-sm font-semibold text-slate-600 hover:text-slate-800 transition-colors cursor-pointer"
          >
            إلغاء
          </button>
          <button
            type="button"
            onClick={handleSave}
            disabled={!selectedUrl}
            className="flex items-center gap-1.5 px-6 py-2 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold text-sm rounded-xl shadow-lg shadow-purple-200 transition-all cursor-pointer disabled:opacity-50"
          >
            <Check className="w-4 h-4" /> حفظ الصورة وتطبيقها
          </button>
        </div>
      </div>
    </div>
  );
};
