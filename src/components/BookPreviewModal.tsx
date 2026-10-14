import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { X, ChevronRight, ChevronLeft, Sparkles, Wand2 } from 'lucide-react';

export const BookPreviewModal: React.FC = () => {
  const { previewingProduct, closeBookPreview, previewChildName, previewChildPhoto, openCustomizer } = useStore();
  const [currentPage, setCurrentPage] = useState(0);

  if (!previewingProduct) return null;

  const pages = previewingProduct.samplePages || [];
  const activePage = pages[currentPage];

  const handleNext = () => {
    if (currentPage < pages.length - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrev = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  const renderText = (template: string) => {
    return template.replace(/{childName}/g, previewChildName || 'آدم');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/80 backdrop-blur-md">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-3xl overflow-hidden border border-purple-100 flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-slate-100 bg-gradient-to-r from-purple-50 to-pink-50">
          <div className="text-right">
            <span className="text-[11px] font-bold text-purple-700 bg-purple-100 px-2.5 py-0.5 rounded-full inline-block">
              📖 تصفح نموذج من صفحات القصة
            </span>
            <h3 className="text-base sm:text-lg font-black text-slate-900 mt-0.5">
              {previewingProduct.title}
            </h3>
          </div>
          <button
            onClick={closeBookPreview}
            className="w-8 h-8 rounded-full flex items-center justify-center bg-white hover:bg-slate-100 text-slate-500 shadow-xs cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Book Flipping Viewport */}
        <div className="p-4 sm:p-8 flex-1 overflow-y-auto flex flex-col items-center justify-center bg-[#FAF7F2]">
          {activePage ? (
            <div className="w-full max-w-xl bg-white rounded-3xl shadow-xl border-4 border-amber-100/60 overflow-hidden flex flex-col md:flex-row min-h-[340px]">
              {/* Illustration side */}
              <div className="md:w-1/2 relative aspect-square md:aspect-auto overflow-hidden bg-slate-100">
                <img
                  src={activePage.image}
                  alt={activePage.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-3 right-3 bg-black/60 backdrop-blur-xs text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                  صفحة {activePage.pageNumber} من 24
                </div>
              </div>

              {/* Story text side */}
              <div className="md:w-1/2 p-6 flex flex-col justify-between text-right bg-gradient-to-br from-white to-amber-50/20">
                <div className="space-y-3">
                  <span className="text-xs font-black text-purple-600 block">
                    {activePage.title}
                  </span>
                  <p className="text-sm sm:text-base text-slate-800 leading-relaxed font-semibold">
                    {renderText(activePage.textTemplate)}
                  </p>
                </div>

                <div className="pt-4 border-t border-amber-100 flex items-center justify-between text-[11px] text-slate-400">
                  <span>اسم البطل المدمج: {previewChildName}</span>
                  <Sparkles className="w-4 h-4 text-amber-500" />
                </div>
              </div>
            </div>
          ) : (
            <p className="text-slate-500 text-sm">صفحات العينة قيد الإعداد</p>
          )}

          {/* Navigation controls */}
          <div className="flex items-center gap-4 mt-6">
            <button
              onClick={handlePrev}
              disabled={currentPage === 0}
              className="p-2 rounded-xl bg-white border border-slate-200 text-slate-700 disabled:opacity-30 hover:bg-slate-50 shadow-xs cursor-pointer"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
            <span className="text-xs font-bold text-slate-600">
              {currentPage + 1} / {pages.length}
            </span>
            <button
              onClick={handleNext}
              disabled={currentPage === pages.length - 1}
              className="p-2 rounded-xl bg-white border border-slate-200 text-slate-700 disabled:opacity-30 hover:bg-slate-50 shadow-xs cursor-pointer"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-100 bg-white flex items-center justify-between">
          <button
            onClick={closeBookPreview}
            className="px-4 py-2 text-xs font-bold text-slate-600 hover:text-slate-800 cursor-pointer"
          >
            إغلاق المعاينة
          </button>
          <button
            onClick={() => {
              closeBookPreview();
              openCustomizer(previewingProduct);
            }}
            className="flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold text-xs sm:text-sm rounded-xl shadow-lg shadow-purple-200 hover:from-purple-700 hover:to-pink-700 transition-all cursor-pointer"
          >
            <Wand2 className="w-4 h-4 text-amber-300" />
            ابدأ تخصيص هذه القصة لطفلك الآن
          </button>
        </div>
      </div>
    </div>
  );
};
