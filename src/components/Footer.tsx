import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { EditableText } from './EditableText';
import {
  BookOpen,
  Mail,
  Phone,
  Clock,
  ShieldCheck,
  CreditCard,
  Heart,
  HelpCircle,
  X,
} from 'lucide-react';

export const Footer: React.FC = () => {
  const { config } = useStore();
  const [activePolicy, setActivePolicy] = useState<'shipping' | 'refund' | 'about' | null>(null);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="bg-slate-900 text-slate-300 pt-16 pb-12 border-t border-slate-800 text-right">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-slate-800">
          {/* Brand & Mission (5 cols) */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-purple-500 to-pink-500 p-0.5 flex items-center justify-center">
                <BookOpen className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-2xl font-black text-white tracking-tight">
                {config.storeName}
              </h3>
            </div>

            <EditableText
              fieldPath="footerAbout"
              value={config.footerAbout}
              as="p"
              className="text-xs sm:text-sm text-slate-400 leading-relaxed font-medium max-w-sm"
              multiline
            />

            <div className="flex items-center gap-2 pt-2 text-xs text-slate-400">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
              <span>دعم العملاء متواجد على مدار 24 ساعة للرد على استفساراتكم</span>
            </div>
          </div>

          {/* Useful Links (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-sm font-black text-white uppercase tracking-wider">
              روابط تهمك
            </h4>
            <ul className="space-y-2 text-xs font-semibold">
              <li>
                <button
                  onClick={() => scrollTo('products')}
                  className="hover:text-purple-400 transition-colors cursor-pointer"
                >
                  قصصنا وكتب الأطفال المخصصة
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollTo('why-us')}
                  className="hover:text-purple-400 transition-colors cursor-pointer"
                >
                  لماذا تختار قصتي؟
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollTo('reviews')}
                  className="hover:text-purple-400 transition-colors cursor-pointer"
                >
                  آراء أولياء الأمور وتجاربهم
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollTo('blog')}
                  className="hover:text-purple-400 transition-colors cursor-pointer"
                >
                  مقالات ونصائح تربوية
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActivePolicy('about')}
                  className="hover:text-purple-400 transition-colors cursor-pointer"
                >
                  من نحن وقصة المتجر
                </button>
              </li>
            </ul>
          </div>

          {/* Customer Care & Policies (4 cols) */}
          <div className="lg:col-span-4 space-y-3">
            <h4 className="text-sm font-black text-white uppercase tracking-wider">
              الدعم الفني والسياسات
            </h4>
            <ul className="space-y-2 text-xs font-semibold">
              <li>
                <button
                  onClick={() => scrollTo('faq')}
                  className="hover:text-purple-400 transition-colors cursor-pointer"
                >
                  الأسئلة الشائعة وإجاباتها
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActivePolicy('shipping')}
                  className="hover:text-purple-400 transition-colors cursor-pointer"
                >
                  سياسة الشحن والتوصيل (7-10 أيام)
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActivePolicy('refund')}
                  className="hover:text-purple-400 transition-colors cursor-pointer"
                >
                  سياسة الاستبدال والاسترجاع وضمان الجودة
                </button>
              </li>
            </ul>

            <div className="pt-3 space-y-1.5 text-xs text-slate-400">
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-purple-400" />
                <span>{config.supportEmail}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-purple-400" />
                <span dir="ltr">{config.supportPhone}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright and Payment Methods */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div>
            <EditableText
              fieldPath="footerCopyright"
              value={config.footerCopyright}
              as="p"
              className="text-xs text-slate-500"
            />
          </div>

          {/* Payment Badges */}
          <div className="flex items-center gap-2 text-[11px] font-bold text-slate-400">
            <span>طرق الدفع المدعومة:</span>
            <span className="bg-slate-800 px-2 py-0.5 rounded text-white font-mono text-[10px]">
              VISA
            </span>
            <span className="bg-slate-800 px-2 py-0.5 rounded text-white font-mono text-[10px]">
              MasterCard
            </span>
            <span className="bg-slate-800 px-2 py-0.5 rounded text-white text-[10px]">
              ميزة
            </span>
            <span className="bg-slate-800 px-2 py-0.5 rounded text-white text-[10px]">
              فودافون كاش
            </span>
            <span className="bg-slate-800 px-2 py-0.5 rounded text-white text-[10px]">
              عند الاستلام
            </span>
          </div>
        </div>
      </div>

      {/* Policy Modal */}
      {activePolicy && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm text-right">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-lg w-full text-slate-800 space-y-4 max-h-[85vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-base font-black text-slate-900">
                {activePolicy === 'shipping' && '🚚 سياسة الشحن والتسليم'}
                {activePolicy === 'refund' && '🛡️ سياسة الاستبدال والاسترجاع'}
                {activePolicy === 'about' && '📖 من نحن - متجر قصتي'}
              </h3>
              <button
                onClick={() => setActivePolicy(null)}
                className="w-7 h-7 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="text-xs sm:text-sm text-slate-600 leading-relaxed space-y-3 font-medium">
              {activePolicy === 'shipping' && (
                <>
                  <p>
                    نظراً لأن كل قصة تُطبع بشكل مخصص باسم وصورة طفلك، فإنها تمر بمراحل مراجعة الصور، التصميم الفني، والطباعة الفاخرة ثم التجليد والتغليف كهدية.
                  </p>
                  <p>
                    يستغرق تجهيز القصة وشحنها من 5 إلى 8 أيام عمل حتى تصل إلى عنوانك في جميع المحافظات والمدن.
                  </p>
                  <p className="font-bold text-emerald-700 bg-emerald-50 p-2.5 rounded-xl">
                    🎁 الشحن مجاني لجميع الطلبات التي تحتوي على 3 قصص أو أكثر!
                  </p>
                </>
              )}

              {activePolicy === 'refund' && (
                <>
                  <p>
                    نحن في متجر <strong>قصتي</strong> نفخر بأعلى معايير الجودة العالمية في طباعة قصص الأطفال.
                  </p>
                  <p>
                    نقدم ضماناً كاملاً 100%: في حال وجود أي خطأ مطبعي في اسم الطفل، أو عيب مصنعي في التجليد، يحق للعميل استرداد كامل المبلغ أو إعادة طباعة القصة وشحنها مجاناً فوراً دون أي تكلفة إضافية.
                  </p>
                </>
              )}

              {activePolicy === 'about' && (
                <>
                  <p>
                    <strong>متجر قصتي (Kasaty Store)</strong> هو منصة رائدة متخصصة في ابتكار وتصميم قصص الأطفال المخصصة بالاسم والصورة.
                  </p>
                  <p>
                    نهدف إلى تحويل القراءة إلى شغف ومغامرة ساحرة تجعل الطفل يرى نفسه بطلاً حقيقياً، وتغرس فيه قيم الشجاعة، الصداقة، والذكاء بطريقة ترفيهية وتربوية لا تُنسى.
                  </p>
                </>
              )}
            </div>

            <div className="pt-2 text-left">
              <button
                onClick={() => setActivePolicy(null)}
                className="px-5 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-xl text-xs font-bold cursor-pointer"
              >
                حسناً، فهمت
              </button>
            </div>
          </div>
        </div>
      )}
    </footer>
  );
};
