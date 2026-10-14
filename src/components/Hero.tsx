import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { EditableText } from './EditableText';
import { EditableImage } from './EditableImage';
import { Sparkles, Star, Heart, ShieldCheck, ArrowLeft, BookOpen, Wand2 } from 'lucide-react';

export const Hero: React.FC = () => {
  const { config, openCustomizer } = useStore();
  const [heroChildName, setHeroChildName] = useState('آدم');

  const featuredProduct = config.products[0] || null;

  const scrollToProducts = () => {
    const el = document.getElementById('products');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const handleStartCustomizing = () => {
    if (featuredProduct) {
      openCustomizer(featuredProduct);
    } else {
      scrollToProducts();
    }
  };

  return (
    <section id="hero" className="relative overflow-hidden pt-8 pb-16 lg:pt-14 lg:pb-24 bg-gradient-to-b from-purple-50/50 via-white to-amber-50/30">
      {/* Decorative blurred background shapes */}
      <div className="absolute top-10 right-1/4 w-72 h-72 bg-purple-200/40 rounded-full blur-3xl -z-10 pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-80 h-80 bg-pink-200/40 rounded-full blur-3xl -z-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          {/* Right Column (Arabic RTL: starts right) - Copy & CTAs */}
          <div className="lg:col-span-7 text-center lg:text-right space-y-6">
            {/* Top Pill Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-100/80 border border-purple-200 text-purple-800 text-xs sm:text-sm font-bold shadow-xs">
              <Sparkles className="w-4 h-4 text-purple-600 animate-spin" />
              <EditableText fieldPath="heroBadge" value={config.heroBadge} />
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-slate-900 leading-tight sm:leading-tight">
              <EditableText fieldPath="heroTitle" value={config.heroTitle} as="span" />{' '}
              <br className="hidden sm:inline" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-pink-600 to-amber-500">
                <EditableText fieldPath="heroHighlight" value={config.heroHighlight} as="span" />
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-medium">
              <EditableText
                fieldPath="heroSubtitle"
                value={config.heroSubtitle}
                as="span"
                multiline
              />
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 pt-2">
              <button
                type="button"
                onClick={handleStartCustomizing}
                className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-purple-600 via-pink-600 to-purple-700 hover:from-purple-700 hover:to-pink-700 text-white font-extrabold text-base shadow-xl shadow-purple-200 transition-all transform hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center gap-2 cursor-pointer group"
              >
                <Wand2 className="w-5 h-5 text-amber-300 animate-bounce" />
                <EditableText fieldPath="heroCtaPrimary" value={config.heroCtaPrimary} />
                <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
              </button>

              <button
                type="button"
                onClick={scrollToProducts}
                className="w-full sm:w-auto px-6 py-4 rounded-2xl bg-white hover:bg-slate-50 text-slate-800 font-bold text-base border-2 border-slate-200 hover:border-purple-300 transition-all flex items-center justify-center gap-2 shadow-xs cursor-pointer"
              >
                <BookOpen className="w-5 h-5 text-purple-600" />
                <EditableText fieldPath="heroCtaSecondary" value={config.heroCtaSecondary} />
              </button>
            </div>

            {/* Trust and Social Proof Badges */}
            <div className="pt-6 border-t border-slate-200/80 grid grid-cols-3 gap-2 sm:gap-4 text-center lg:text-right">
              <div className="p-2 sm:p-3 rounded-xl bg-white/70 border border-slate-100 shadow-xs">
                <div className="flex items-center justify-center lg:justify-start gap-1 text-amber-500 font-black text-sm sm:text-lg">
                  <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                  <EditableText fieldPath="heroStat1Number" value={config.heroStat1Number} />
                </div>
                <div className="text-[11px] sm:text-xs text-slate-500 font-semibold mt-0.5">
                  <EditableText fieldPath="heroStat1Label" value={config.heroStat1Label} />
                </div>
              </div>

              <div className="p-2 sm:p-3 rounded-xl bg-white/70 border border-slate-100 shadow-xs">
                <div className="flex items-center justify-center lg:justify-start gap-1 text-pink-600 font-black text-sm sm:text-lg">
                  <Heart className="w-4 h-4 fill-pink-500 text-pink-500" />
                  <EditableText fieldPath="heroStat2Number" value={config.heroStat2Number} />
                </div>
                <div className="text-[11px] sm:text-xs text-slate-500 font-semibold mt-0.5">
                  <EditableText fieldPath="heroStat2Label" value={config.heroStat2Label} />
                </div>
              </div>

              <div className="p-2 sm:p-3 rounded-xl bg-white/70 border border-slate-100 shadow-xs">
                <div className="flex items-center justify-center lg:justify-start gap-1 text-emerald-600 font-black text-sm sm:text-lg">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  <EditableText fieldPath="heroStat3Number" value={config.heroStat3Number} />
                </div>
                <div className="text-[11px] sm:text-xs text-slate-500 font-semibold mt-0.5">
                  <EditableText fieldPath="heroStat3Label" value={config.heroStat3Label} />
                </div>
              </div>
            </div>
          </div>

          {/* Left Column (Visual 3D Book Experience) */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center">
            <div className="relative w-full max-w-md mx-auto">
              {/* Glowing aura */}
              <div className="absolute inset-0 bg-gradient-to-tr from-purple-500/20 via-pink-400/20 to-amber-300/20 rounded-3xl blur-2xl transform scale-105" />

              {/* Book Presentation Container */}
              <div className="relative bg-white rounded-3xl p-5 shadow-2xl border border-purple-100/80">
                {/* Live Name Customizer Teaser */}
                <div className="mb-4 bg-purple-50/80 p-3 rounded-2xl border border-purple-100 flex items-center justify-between gap-2">
                  <div className="text-right">
                    <span className="text-[11px] font-bold text-purple-700 block">جرّب اسم طفلك على الغلاف:</span>
                    <input
                      type="text"
                      value={heroChildName}
                      onChange={(e) => setHeroChildName(e.target.value)}
                      placeholder="اكتب اسم الطفل..."
                      className="text-xs font-bold text-slate-800 bg-white px-2.5 py-1 rounded-lg border border-purple-200 focus:outline-none focus:ring-1 focus:ring-purple-400 w-32 sm:w-40"
                    />
                  </div>
                  <button
                    onClick={handleStartCustomizing}
                    className="px-3 py-1.5 bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold rounded-xl shadow transition-colors cursor-pointer"
                  >
                    خصص الآن
                  </button>
                </div>

                {/* 3D Story Book Mockup with live embedded child name badge */}
                <div className="relative rounded-2xl overflow-hidden aspect-[4/5] shadow-lg border-2 border-white bg-slate-900 group">
                  <EditableImage
                    fieldPath="heroImage"
                    src={config.heroImage}
                    alt="قصة أطفال مخصصة"
                    className="w-full h-full object-cover"
                    label="صورة البنر الرئيسية"
                  />

                  {/* Gradient Overlay & Book Elements */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-black/20 pointer-events-none" />

                  {/* Spine effect */}
                  <div className="absolute top-0 bottom-0 right-0 w-4 bg-gradient-to-l from-black/40 to-transparent pointer-events-none" />

                  {/* Floating Child Hero Badge */}
                  <div className="absolute bottom-4 right-4 left-4 bg-white/95 backdrop-blur-md p-3 rounded-xl shadow-xl border border-purple-100 pointer-events-auto">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-purple-500 shadow-sm shrink-0 bg-purple-100 flex items-center justify-center font-bold text-purple-700 text-base">
                        👦
                      </div>
                      <div className="flex-1 text-right">
                        <span className="text-[10px] font-bold text-pink-600 block uppercase tracking-wider">
                          بطل القصة الرسمي
                        </span>
                        <h4 className="font-black text-slate-900 text-base leading-tight">
                          مغامرة البطل {heroChildName || 'طفلك'}
                        </h4>
                        <span className="text-[11px] text-slate-500">طباعة خاصة باسم وصورة طفلك</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Packaging badge */}
                <div className="mt-4 flex items-center justify-between text-xs text-slate-600 font-semibold px-2">
                  <span className="flex items-center gap-1 text-emerald-600">
                    <span className="w-2 h-2 rounded-full bg-emerald-500" />
                    تغليف هدية مجاني 🎁
                  </span>
                  <span className="flex items-center gap-1 text-purple-600">
                    <span className="w-2 h-2 rounded-full bg-purple-500" />
                    إهداء شخصي مطبوع ✉️
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
