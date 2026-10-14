import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { EditableText } from './EditableText';
import { ChevronDown, HelpCircle, PlusCircle } from 'lucide-react';

export const FaqSection: React.FC = () => {
  const { config, editMode, setIsAdminModalOpen } = useStore();
  const [openIds, setOpenIds] = useState<Record<string, boolean>>({
    faq1: true,
    faq2: true,
  });

  const toggle = (id: string) => {
    setOpenIds((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <section id="faq" className="py-16 sm:py-24 bg-white relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-purple-100 text-purple-700 text-xs font-bold">
            <HelpCircle className="w-3.5 h-3.5" /> إجابات واضحة لجميع استفساراتكم
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900">
            الأسئلة الشائعة
          </h2>
          <p className="text-slate-600 text-sm sm:text-base font-medium">
            كل ما يهمك معرفته عن مراحل تجهيز القصة وجودة الورق والشحن والضمانات
          </p>
        </div>

        {/* FAQ Accordion List */}
        <div className="space-y-3 text-right">
          {config.faqs.map((faq, index) => {
            const isOpen = !!openIds[faq.id];
            return (
              <div
                key={faq.id}
                className="border border-slate-200 rounded-2xl overflow-hidden transition-colors bg-white hover:border-purple-200"
              >
                <button
                  type="button"
                  onClick={() => toggle(faq.id)}
                  className="w-full p-4 sm:p-5 flex items-center justify-between gap-4 text-right bg-white hover:bg-slate-50 transition-colors cursor-pointer"
                >
                  <EditableText
                    fieldPath={`faqs.${index}.question`}
                    value={faq.question}
                    as="h3"
                    className="font-black text-slate-900 text-sm sm:text-base flex-1"
                  />
                  <div
                    className={`w-7 h-7 rounded-full bg-purple-50 text-purple-700 flex items-center justify-center shrink-0 transition-transform duration-300 ${
                      isOpen ? 'rotate-180 bg-purple-600 text-white' : ''
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 pt-1 text-slate-600 text-xs sm:text-sm leading-relaxed border-t border-slate-100 bg-[#FAF7F2]/40 font-medium">
                    <EditableText
                      fieldPath={`faqs.${index}.answer`}
                      value={faq.answer}
                      as="p"
                      multiline
                    />
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Add FAQ Button in Edit Mode */}
        {editMode && (
          <div className="mt-6 text-center">
            <button
              onClick={() => setIsAdminModalOpen(true)}
              className="inline-flex items-center gap-1.5 px-4 py-2 bg-purple-50 text-purple-700 rounded-xl text-xs font-bold hover:bg-purple-100 transition-colors cursor-pointer"
            >
              <PlusCircle className="w-4 h-4" /> إضافة سؤال جديد في لوحة التحكم
            </button>
          </div>
        )}
      </div>
    </section>
  );
};
