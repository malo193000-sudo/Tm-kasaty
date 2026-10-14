import React from 'react';
import { useStore } from '../context/StoreContext';
import { EditableText } from './EditableText';
import { Star, CheckCircle, Quote, PlusCircle } from 'lucide-react';

export const TestimonialsSection: React.FC = () => {
  const { config, editMode, setIsAdminModalOpen } = useStore();

  return (
    <section id="reviews" className="py-16 sm:py-24 bg-[#FAF7F2] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
          <span className="text-xs font-black text-pink-600 bg-pink-100 px-3.5 py-1 rounded-full uppercase tracking-wider">
            ثقة أكثر من 5,000 عائلة
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900">
            ماذا يقول عملاؤنا 💬
          </h2>
          <p className="text-slate-600 text-sm sm:text-base font-medium">
            آراء حقيقية من أمهات وآباء شاركوا فرحة أطفالهم عند استلام قصصهم المخصصة
          </p>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {config.reviews.map((review, index) => (
            <div
              key={review.id}
              className="bg-white rounded-3xl p-6 shadow-sm hover:shadow-md border border-slate-100 transition-all text-right flex flex-col justify-between"
            >
              <div>
                {/* Top: Stars & Quote Icon */}
                <div className="flex items-center justify-between mb-3">
                  <div className="flex text-amber-400">
                    {[...Array(review.rating || 5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400" />
                    ))}
                  </div>
                  <Quote className="w-7 h-7 text-purple-200" />
                </div>

                {/* Review Title */}
                <EditableText
                  fieldPath={`reviews.${index}.title`}
                  value={review.title}
                  as="h4"
                  className="font-bold text-slate-900 text-base mb-2"
                />

                {/* Review Comment */}
                <EditableText
                  fieldPath={`reviews.${index}.comment`}
                  value={review.comment}
                  as="p"
                  className="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium mb-4"
                  multiline
                />
              </div>

              {/* Author & Verification */}
              <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-purple-500 to-pink-500 text-white flex items-center justify-center font-bold text-sm shadow-xs">
                    {review.author.charAt(0)}
                  </div>
                  <div className="text-right">
                    <EditableText
                      fieldPath={`reviews.${index}.author`}
                      value={review.author}
                      as="span"
                      className="text-xs font-bold text-slate-800 block"
                    />
                    <span className="text-[10px] text-emerald-600 font-bold flex items-center gap-0.5">
                      <CheckCircle className="w-3 h-3 text-emerald-600" /> مشترٍ مؤكد
                    </span>
                  </div>
                </div>

                <span className="text-[10px] text-slate-400 font-medium">{review.date}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Add review button in edit mode */}
        {editMode && (
          <div className="mt-8 text-center">
            <button
              onClick={() => setIsAdminModalOpen(true)}
              className="inline-flex items-center gap-2 px-6 py-2.5 bg-purple-100 text-purple-800 rounded-xl text-xs font-bold hover:bg-purple-200 transition-colors cursor-pointer"
            >
              <PlusCircle className="w-4 h-4" /> إضافة أو تعديل التقييمات في لوحة التحكم
            </button>
          </div>
        )}
      </div>
    </section>
  );
};
