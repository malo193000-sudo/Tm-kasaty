import React, { useState, useEffect } from 'react';
import { useStore } from '../context/StoreContext';
import { MessageCircle, Copy, Check, Clock, X, Sparkles } from 'lucide-react';

export const FloatingOffer: React.FC = () => {
  const { config, applyCoupon } = useStore();
  const [copied, setCopied] = useState(false);
  const [closed, setClosed] = useState(false);
  const [secondsLeft, setSecondsLeft] = useState(7199); // 1 hr 59 min 59 sec

  useEffect(() => {
    const timer = setInterval(() => {
      setSecondsLeft((prev) => (prev > 0 ? prev - 1 : 7199));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatCountdown = (secs: number) => {
    const h = Math.floor(secs / 3600);
    const m = Math.floor((secs % 3600) / 60);
    const s = secs % 60;
    return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
  };

  const handleCopyCode = () => {
    const code = config.promoBanner.code;
    navigator.clipboard.writeText(code);
    applyCoupon(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const whatsappClean = config.whatsappNumber.replace(/[^0-9]/g, '');

  return (
    <>
      {/* Floating WhatsApp Button (Bottom Left for RTL) */}
      <a
        href={`https://wa.me/${whatsappClean}?text=${encodeURIComponent(
          'مرحباً متجر قصتي! أود الاستفسار عن تفاصيل تخصيص قصة لطفلي.'
        )}`}
        target="_blank"
        rel="noreferrer"
        className="fixed bottom-6 left-6 z-40 bg-emerald-500 hover:bg-emerald-600 text-white p-3.5 rounded-full shadow-2xl hover:scale-110 active:scale-95 transition-all flex items-center justify-center group"
        title="تواصل معنا عبر واتساب"
      >
        <MessageCircle className="w-7 h-7 fill-white/20" />
        <span className="max-w-0 overflow-hidden whitespace-nowrap group-hover:max-w-xs transition-all duration-300 ease-in-out text-xs font-bold px-0 group-hover:px-2">
          تواصل معنا عبر واتساب
        </span>
      </a>

      {/* Floating Sticky Coupon Bar (Bottom Right for RTL) */}
      {!closed && config.promoBanner.active && (
        <div className="fixed bottom-6 right-6 z-40 max-w-sm bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl border border-purple-200 p-3.5 text-right animate-slideUp">
          <div className="flex items-center justify-between gap-3 mb-1.5">
            <span className="text-[11px] font-black text-purple-700 bg-purple-100 px-2 py-0.5 rounded-full flex items-center gap-1">
              <Sparkles className="w-3 h-3" />
              {config.promoBanner.title}
            </span>
            <button
              onClick={() => setClosed(true)}
              className="text-slate-400 hover:text-slate-600 p-0.5 cursor-pointer"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="flex items-center justify-between gap-3 pt-1">
            {/* Coupon Code Pill */}
            <button
              type="button"
              onClick={handleCopyCode}
              className="flex items-center gap-1.5 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-3 py-1.5 rounded-xl font-mono text-xs font-black shadow-xs transition-transform active:scale-95 cursor-pointer"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5" />
                  <span>تم التطبيق!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3 h-3" />
                  <span>{config.promoBanner.code}</span>
                </>
              )}
            </button>

            {/* Timer */}
            <div className="text-[11px] font-bold text-slate-500 flex items-center gap-1">
              <Clock className="w-3 h-3 text-red-500 animate-spin" />
              <span>ينتهي خلال: </span>
              <span className="font-mono text-red-600 font-extrabold" dir="ltr">
                {formatCountdown(secondsLeft)}
              </span>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
