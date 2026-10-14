import React from 'react';
import { useStore } from '../context/StoreContext';
import { EditableText } from './EditableText';
import { EditableImage } from './EditableImage';
import { BookMarked, Clock, ArrowLeft, X, PlusCircle } from 'lucide-react';

export const BlogSection: React.FC = () => {
  const { config, editMode, openArticle, readingArticle, closeArticle, setIsAdminModalOpen } = useStore();

  return (
    <section id="blog" className="py-16 sm:py-24 bg-[#FAF7F2] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
          <span className="text-xs font-black text-purple-700 bg-purple-100 px-3.5 py-1 rounded-full uppercase tracking-wider">
            ركن المعرفة والتربية
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900">
            مقالات تهمك 📚
          </h2>
          <p className="text-slate-600 text-sm sm:text-base font-medium">
            نصائح وإرشادات من خبراء التربية لمساعدتك في تنمية قدرات طفلك وغرس حب القراءة
          </p>
        </div>

        {/* Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {config.articles.map((article, index) => (
            <article
              key={article.id}
              className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-lg border border-slate-100 transition-all flex flex-col group hover:-translate-y-1 text-right"
            >
              {/* Image */}
              <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
                <EditableImage
                  fieldPath={`articles.${index}.image`}
                  src={article.image}
                  alt={article.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  label={`صورة مقال ${article.title}`}
                />
                <span className="absolute top-3 right-3 bg-purple-700 text-white text-[10px] font-bold px-2.5 py-0.5 rounded-full shadow-xs">
                  {article.category}
                </span>
              </div>

              {/* Content */}
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-purple-500" />
                      <EditableText
                        fieldPath={`articles.${index}.readTime`}
                        value={article.readTime}
                      />
                    </span>
                    <span>{article.date}</span>
                  </div>

                  <EditableText
                    fieldPath={`articles.${index}.title`}
                    value={article.title}
                    as="h3"
                    className="text-base sm:text-lg font-black text-slate-900 mb-2 group-hover:text-purple-700 transition-colors"
                  />

                  <EditableText
                    fieldPath={`articles.${index}.excerpt`}
                    value={article.excerpt}
                    as="p"
                    className="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium line-clamp-3 mb-4"
                    multiline
                  />
                </div>

                <button
                  type="button"
                  onClick={() => openArticle(article)}
                  className="inline-flex items-center gap-1.5 text-purple-700 hover:text-purple-900 font-black text-xs pt-3 border-t border-slate-100 cursor-pointer group-hover:translate-x-1 transition-transform"
                >
                  <span>إقرأ المزيد وتفاصيل المقال</span>
                  <ArrowLeft className="w-4 h-4" />
                </button>
              </div>
            </article>
          ))}
        </div>

        {/* Add article button in edit mode */}
        {editMode && (
          <div className="mt-8 text-center">
            <button
              onClick={() => setIsAdminModalOpen(true)}
              className="inline-flex items-center gap-2 px-6 py-2.5 bg-purple-100 text-purple-800 rounded-xl text-xs font-bold hover:bg-purple-200 transition-colors cursor-pointer"
            >
              <PlusCircle className="w-4 h-4" /> إضافة أو تعديل المقالات في لوحة التحكم
            </button>
          </div>
        )}
      </div>

      {/* Article Reader Modal */}
      {readingArticle && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-2xl overflow-hidden flex flex-col max-h-[90vh] text-right">
            <div className="relative aspect-[21/9] overflow-hidden bg-slate-100">
              <img
                src={readingArticle.image}
                alt={readingArticle.title}
                className="w-full h-full object-cover"
              />
              <button
                onClick={closeArticle}
                className="absolute top-4 left-4 w-9 h-9 rounded-full bg-black/60 text-white flex items-center justify-center hover:bg-black/80 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 sm:p-8 overflow-y-auto space-y-4">
              <div className="flex items-center gap-3 text-xs text-slate-500 font-semibold">
                <span className="bg-purple-100 text-purple-800 px-2.5 py-0.5 rounded-full font-bold">
                  {readingArticle.category}
                </span>
                <span>{readingArticle.readTime}</span>
                <span>• {readingArticle.date}</span>
              </div>

              <h2 className="text-xl sm:text-2xl font-black text-slate-900 leading-snug">
                {readingArticle.title}
              </h2>

              <div className="prose text-slate-700 text-sm sm:text-base leading-relaxed space-y-4 pt-2 border-t border-slate-100 font-medium">
                <p>{readingArticle.content}</p>
                <p>
                  في متجر <strong>قصتي</strong>، نحرص في كل قصة ننتجها على أن ندمج هذه المبادئ النفسية والتربوية؛ حيث نوفر تجربة بصرية ولفظية تأخذ بيد الطفل نحو عالم واسع من الثقة بالنفس، الخيال المبتكر، والمتعة المعرفية غير المحدودة.
                </p>
              </div>
            </div>

            <div className="p-4 border-t border-slate-100 bg-slate-50 flex justify-end">
              <button
                onClick={closeArticle}
                className="px-6 py-2 bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs rounded-xl shadow cursor-pointer"
              >
                إغلاق المقال
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
