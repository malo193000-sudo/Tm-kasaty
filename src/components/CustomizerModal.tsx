import React, { useState, useEffect } from 'react';
import { useStore } from '../context/StoreContext';
import {
  X,
  Upload,
  Check,
  Gift,
  Heart,
  ShieldCheck,
  Sparkles,
  Flame,
  MessageCircle,
  ShoppingCart,
  Eye,
  Camera,
  RotateCcw,
} from 'lucide-react';
import confetti from 'canvas-confetti';

const SAMPLE_CHILD_PHOTOS = [
  { name: 'ولد (عمر 5 سنوات)', url: 'https://images.unsplash.com/photo-1543332164-6e82f355badc?auto=format&fit=crop&w=300&q=80', gender: 'boy' },
  { name: 'بنت (عمر 6 سنوات)', url: 'https://images.unsplash.com/photo-1517456793572-1d8efd6dc135?auto=format&fit=crop&w=300&q=80', gender: 'girl' },
  { name: 'ولد (عمر 7 سنوات)', url: 'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&w=300&q=80', gender: 'boy' },
  { name: 'بنت (عمر 4 سنوات)', url: 'https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?auto=format&fit=crop&w=300&q=80', gender: 'girl' },
];

export const CustomizerModal: React.FC = () => {
  const { customizingProduct, closeCustomizer, addToCart, formatPrice, config } = useStore();

  const [childName, setChildName] = useState('آدم');
  const [childAge, setChildAge] = useState<number>(5);
  const [childGender, setChildGender] = useState<'boy' | 'girl'>('boy');
  const [childPhotoUrl, setChildPhotoUrl] = useState<string>('');
  const [storyLanguage, setStoryLanguage] = useState<'ar' | 'en'>('ar');
  const [dedicationType, setDedicationType] = useState<'ready1' | 'ready2' | 'custom'>('ready1');
  const [customDedication, setCustomDedication] = useState('');
  const [giftPackaging, setGiftPackaging] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<'customize' | 'preview'>('customize');
  const [formError, setFormError] = useState('');

  useEffect(() => {
    if (customizingProduct) {
      if (customizingProduct.genderTarget === 'girls') {
        setChildGender('girl');
        setChildName('تالين');
      } else if (customizingProduct.genderTarget === 'boys') {
        setChildGender('boy');
        setChildName('آدم');
      }
    }
  }, [customizingProduct]);

  if (!customizingProduct) return null;

  const readyDedication1 = `إلى ${childName || 'طفلي الغالي'}، لكل طفل مميز قصة تشبهه، وهذه القصة اخترناها لتناسب جمال روحك ونقاء قلبك. نتمنى أن تكون أيامك كلها فرحة وسعادة ❤️`;
  const readyDedication2 = `To ${childName || 'my dearest child'}, This story was made especially for you. Read it with a smile, dream beautiful dreams, and always remember that you are special and deeply loved ❤️`;

  const finalDedication =
    dedicationType === 'ready1'
      ? readyDedication1
      : dedicationType === 'ready2'
      ? readyDedication2
      : customDedication;

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setChildPhotoUrl(event.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddToCart = () => {
    if (!childName.trim()) {
      setFormError('يرجى إدخال اسم الطفل للاستمرار');
      return;
    }

    addToCart({
      product: customizingProduct,
      childName: childName.trim(),
      childAge,
      childGender,
      childPhotoUrl,
      storyLanguage,
      dedicationText: finalDedication,
      giftPackaging,
      quantity,
      pricePerUnit: customizingProduct.discountPrice,
    });

    try {
      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.7 },
      });
    } catch {
      // ignore
    }

    closeCustomizer();
  };

  const handleWhatsAppOrder = () => {
    if (!childName.trim()) {
      setFormError('يرجى كتابة اسم الطفل أولاً');
      return;
    }

    const message = `مرحباً متجر قصتي! أرغب في طلب قصة مخصصة:
📖 القصة: ${customizingProduct.title}
👦 اسم الطفل: ${childName}
🎂 العمر: ${childAge} سنوات
🚻 الجنس: ${childGender === 'boy' ? 'ولد' : 'بنت'}
🌐 لغة القصة: ${storyLanguage === 'ar' ? 'العربية' : 'الإنجليزية'}
✉️ الإهداء: ${finalDedication}
🎁 تغليف هدية: ${giftPackaging ? 'نعم مجاناً' : 'لا'}
🔢 العدد: ${quantity}
💰 الإجمالي: ${formatPrice(customizingProduct.discountPrice * quantity)}
${childPhotoUrl ? '📸 قمت باختيار صورة الطفل وسأرسلها هنا' : ''}
شكراً لكم!`;

    const cleanPhone = config.whatsappNumber.replace(/[^0-9]/g, '');
    const url = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

  const discountPercent = Math.round(
    ((customizingProduct.originalPrice - customizingProduct.discountPrice) /
      customizingProduct.originalPrice) *
      100
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-slate-950/75 backdrop-blur-sm overflow-y-auto">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-4xl overflow-hidden border border-purple-100 flex flex-col my-auto max-h-[96vh]">
        {/* Modal Top Header */}
        <div className="flex items-center justify-between p-4 sm:p-5 border-b border-slate-100 bg-gradient-to-r from-purple-50 via-pink-50 to-amber-50">
          <div className="text-right">
            <span className="text-[11px] font-bold text-purple-700 bg-purple-100 px-2 py-0.5 rounded-full inline-block mb-1">
              ✨ تخصيص قصة فريدة لطفلك
            </span>
            <h2 className="text-lg sm:text-2xl font-black text-slate-900 leading-tight">
              {customizingProduct.title}
            </h2>
          </div>
          <button
            type="button"
            onClick={closeCustomizer}
            className="w-9 h-9 rounded-full bg-white hover:bg-slate-100 text-slate-500 flex items-center justify-center shadow-xs transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body: Split 2 Columns (Preview on Desktop Left / Arabic Right: Customizer Form) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 flex-1 overflow-y-auto">
          {/* Customization Form (Right Column) */}
          <div className="lg:col-span-7 p-4 sm:p-6 space-y-6 text-right order-2 lg:order-1 overflow-y-auto">
            {formError && (
              <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-xs font-bold rounded-xl animate-shake">
                ⚠️ {formError}
              </div>
            )}

            {/* Quick Selling Features */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center text-[11px] font-bold text-slate-600 bg-slate-50 p-2.5 rounded-2xl border border-slate-100">
              <span className="flex items-center justify-center gap-1">📸 ارفع صورة طفلك</span>
              <span className="flex items-center justify-center gap-1">🎨 الاسم بالقصة</span>
              <span className="flex items-center justify-center gap-1">📖 24 صفحة ملونة</span>
              <span className="flex items-center justify-center gap-1">🎁 تغليف فاخر مجاناً</span>
            </div>

            {/* Child Name & Age */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-black text-slate-800 mb-1.5">
                  اسم الطفل *
                </label>
                <input
                  type="text"
                  placeholder="مثال: آدم، سارة، حمزة..."
                  value={childName}
                  onChange={(e) => {
                    setChildName(e.target.value);
                    if (formError) setFormError('');
                  }}
                  className="w-full p-3 rounded-xl border border-slate-300 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 text-sm font-bold text-slate-900 text-right bg-white"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-black text-slate-800 mb-1.5">
                  عمر الطفل (سنوات) *
                </label>
                <select
                  value={childAge}
                  onChange={(e) => setChildAge(Number(e.target.value))}
                  className="w-full p-3 rounded-xl border border-slate-300 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 text-sm font-bold text-slate-900 text-right bg-white"
                >
                  {[2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((age) => (
                    <option key={age} value={age}>
                      {age} سنوات
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Gender Selection */}
            <div>
              <label className="block text-xs font-black text-slate-800 mb-1.5">
                اختر جنس طفلك *
              </label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setChildGender('boy')}
                  className={`p-3 rounded-2xl border-2 flex items-center justify-center gap-2 text-sm font-bold transition-all cursor-pointer ${
                    childGender === 'boy'
                      ? 'border-blue-500 bg-blue-50 text-blue-800 shadow-sm ring-2 ring-blue-200'
                      : 'border-slate-200 hover:border-slate-300 bg-white text-slate-700'
                  }`}
                >
                  <span className="text-xl">👦</span> ولد (بطل القصة)
                </button>
                <button
                  type="button"
                  onClick={() => setChildGender('girl')}
                  className={`p-3 rounded-2xl border-2 flex items-center justify-center gap-2 text-sm font-bold transition-all cursor-pointer ${
                    childGender === 'girl'
                      ? 'border-pink-500 bg-pink-50 text-pink-800 shadow-sm ring-2 ring-pink-200'
                      : 'border-slate-200 hover:border-slate-300 bg-white text-slate-700'
                  }`}
                >
                  <span className="text-xl">👧</span> بنت (بطلة القصة)
                </button>
              </div>
            </div>

            {/* Child Photo Upload */}
            <div className="space-y-2">
              <label className="block text-xs font-black text-slate-800">
                أضف صورة الطفل *
              </label>

              {/* Photo tips box */}
              <div className="bg-amber-50/70 border border-amber-200/80 rounded-2xl p-3 text-[11px] text-amber-900 space-y-1">
                <div className="font-bold flex items-center gap-1 text-amber-800">
                  <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                  نصائح لاختيار أفضل صورة للطفل:
                </div>
                <div className="grid grid-cols-2 gap-x-2 gap-y-0.5 text-slate-600 text-[10px]">
                  <span>• واضحة للوجه ومبتسمة</span>
                  <span>• بدون نظارات شمسية أو أقنعة</span>
                  <span>• ليست بعيدة أو جانبية</span>
                  <span>• إضاءة نهارية جيدة</span>
                </div>
              </div>

              {/* Upload Dropzone / Button */}
              {childPhotoUrl ? (
                <div className="flex items-center gap-3 p-3 bg-emerald-50 rounded-2xl border border-emerald-200">
                  <img
                    src={childPhotoUrl}
                    alt="صورة الطفل"
                    className="w-14 h-14 rounded-xl object-cover border-2 border-emerald-500 shadow-xs"
                  />
                  <div className="flex-1">
                    <span className="text-xs font-bold text-emerald-800 flex items-center gap-1">
                      <Check className="w-4 h-4 text-emerald-600" /> تم اختيار صورة {childName} بنجاح!
                    </span>
                    <span className="text-[11px] text-slate-500 block">
                      فريق التصميم سيعالج الصورة لتندمج بسلاسة داخل أحداث القصة
                    </span>
                  </div>
                  <label className="px-3 py-1.5 bg-white hover:bg-slate-50 border border-slate-300 rounded-xl text-xs font-bold text-slate-700 cursor-pointer shadow-xs">
                    تغيير
                    <input type="file" accept="image/*" onChange={handleFileUpload} className="hidden" />
                  </label>
                </div>
              ) : (
                <label className="flex flex-col items-center justify-center p-5 border-2 border-dashed border-purple-300 hover:border-purple-500 rounded-2xl bg-purple-50/30 hover:bg-purple-50/60 cursor-pointer transition-colors group">
                  <Camera className="w-8 h-8 text-purple-600 mb-1 group-hover:scale-110 transition-transform" />
                  <span className="text-xs font-bold text-purple-900">اضغط هنا لرفع صورة طفلك من هاتفك أو جهازك</span>
                  <span className="text-[10px] text-slate-500 mt-0.5">✨ لا تقلق، فريقنا المحترف سيعالج الصورة لتظهر بأفضل شكل</span>
                  <input type="file" accept="image/*" onChange={handleFileUpload} className="hidden" />
                </label>
              )}

              {/* Sample Photo selector for quick testing */}
              <div className="flex items-center gap-1.5 pt-1 overflow-x-auto">
                <span className="text-[10px] text-slate-400 font-bold shrink-0">أو جرب صورة نموذجية:</span>
                {SAMPLE_CHILD_PHOTOS.filter((p) => p.gender === childGender).map((photo, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => setChildPhotoUrl(photo.url)}
                    className="flex items-center gap-1 px-2 py-1 rounded-lg border border-slate-200 hover:border-purple-400 bg-white text-[10px] text-slate-600 cursor-pointer shrink-0"
                  >
                    <img src={photo.url} alt="" className="w-4 h-4 rounded-full object-cover" />
                    <span>{photo.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Language Selection */}
            <div>
              <label className="block text-xs font-black text-slate-800 mb-1.5">
                لغة القصة *
              </label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setStoryLanguage('ar')}
                  className={`p-2.5 rounded-xl border text-xs font-bold transition-all cursor-pointer ${
                    storyLanguage === 'ar'
                      ? 'border-purple-600 bg-purple-50 text-purple-800 ring-2 ring-purple-200'
                      : 'border-slate-200 bg-white text-slate-700'
                  }`}
                >
                  العربية (موصى بها) 🇸🇦
                </button>
                <button
                  type="button"
                  onClick={() => setStoryLanguage('en')}
                  className={`p-2.5 rounded-xl border text-xs font-bold transition-all cursor-pointer ${
                    storyLanguage === 'en'
                      ? 'border-purple-600 bg-purple-50 text-purple-800 ring-2 ring-purple-200'
                      : 'border-slate-200 bg-white text-slate-700'
                  }`}
                >
                  الإنجليزية (English) 🇬🇧
                </button>
              </div>
            </div>

            {/* Dedication Options */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="block text-xs font-black text-slate-800">
                  إهداء مجاني مطبوع داخل القصة ✉️
                </label>
                <span className="text-[10px] text-emerald-600 font-bold">هدية مجانية 100%</span>
              </div>

              <div className="space-y-2">
                <button
                  type="button"
                  onClick={() => setDedicationType('ready1')}
                  className={`w-full text-right p-3 rounded-xl border text-xs leading-relaxed transition-all cursor-pointer ${
                    dedicationType === 'ready1'
                      ? 'border-purple-600 bg-purple-50/60 ring-2 ring-purple-200 font-semibold text-slate-900'
                      : 'border-slate-200 bg-white text-slate-600'
                  }`}
                >
                  <div className="font-bold text-purple-700 mb-1">الإهداء الكلاسيكي اللطيف (العربية):</div>
                  "{readyDedication1}"
                </button>

                <button
                  type="button"
                  onClick={() => setDedicationType('ready2')}
                  className={`w-full text-right p-3 rounded-xl border text-xs leading-relaxed transition-all cursor-pointer ${
                    dedicationType === 'ready2'
                      ? 'border-purple-600 bg-purple-50/60 ring-2 ring-purple-200 font-semibold text-slate-900'
                      : 'border-slate-200 bg-white text-slate-600'
                  }`}
                >
                  <div className="font-bold text-purple-700 mb-1">الإهداء بالإنجليزية (English Dedication):</div>
                  "{readyDedication2}"
                </button>

                <button
                  type="button"
                  onClick={() => setDedicationType('custom')}
                  className={`w-full text-right p-2.5 rounded-xl border text-xs font-bold transition-all cursor-pointer ${
                    dedicationType === 'custom'
                      ? 'border-purple-600 bg-purple-50 text-purple-800 ring-2 ring-purple-200'
                      : 'border-slate-200 bg-white text-slate-600'
                  }`}
                >
                  ✍️ كتابة إهداء خاص بك من القلب...
                </button>

                {dedicationType === 'custom' && (
                  <textarea
                    rows={3}
                    placeholder="اكتب كلماتك الخاصة لتُطبع في الصفحة الأولى للقصة..."
                    value={customDedication}
                    onChange={(e) => setCustomDedication(e.target.value)}
                    className="w-full p-3 rounded-xl border border-purple-300 focus:ring-2 focus:ring-purple-200 text-xs text-slate-900 bg-white"
                  />
                )}
              </div>
            </div>

            {/* Gift Packaging Checkbox */}
            <div className="bg-pink-50/50 p-3 rounded-2xl border border-pink-100 flex items-center justify-between">
              <label className="flex items-center gap-2 cursor-pointer text-xs font-bold text-slate-800">
                <input
                  type="checkbox"
                  checked={giftPackaging}
                  onChange={(e) => setGiftPackaging(e.target.checked)}
                  className="w-4 h-4 text-purple-600 rounded focus:ring-purple-400"
                />
                <Gift className="w-4 h-4 text-pink-600" />
                تغليف القصة كهدية فاخرة مجاناً
              </label>
              <span className="text-[11px] font-bold text-pink-600">مجاناً 🎁</span>
            </div>
          </div>

          {/* Live Cover Preview & Order Summary (Left Column) */}
          <div className="lg:col-span-5 bg-gradient-to-b from-purple-50/60 to-slate-100 p-4 sm:p-6 flex flex-col justify-between order-1 lg:order-2 border-b lg:border-b-0 lg:border-r border-slate-200">
            {/* Live 3D Cover */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-black text-purple-900 flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                  معاينة غلاف القصة الحي:
                </span>
                <span className="text-[10px] text-slate-500 font-bold">
                  يتحدث فورياً مع إدخالك
                </span>
              </div>

              {/* The Live 3D Book Graphic */}
              <div className="relative rounded-2xl overflow-hidden aspect-[3/4] bg-slate-900 shadow-2xl border-4 border-white">
                <img
                  src={customizingProduct.coverImage}
                  alt={customizingProduct.title}
                  className="w-full h-full object-cover"
                />

                {/* Shading & spine effect */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-black/30 pointer-events-none" />
                <div className="absolute top-0 bottom-0 right-0 w-3 bg-gradient-to-l from-black/50 to-transparent pointer-events-none" />

                {/* Live Title on the Book */}
                <div className="absolute top-4 right-3 left-3 text-right">
                  <span className="text-[10px] text-amber-300 font-extrabold uppercase tracking-wider block drop-shadow-md">
                    مغامرة خاصة وحصرية
                  </span>
                  <h3 className="text-lg sm:text-xl font-black text-white leading-tight drop-shadow-lg">
                    {customizingProduct.title.includes('في') || customizingProduct.title.includes('مع')
                      ? customizingProduct.title.replace(/^(آدم|رحيم|تالين|سليم|عمر)/, childName || 'بطلنا')
                      : `${childName || 'بطلنا'} في ${customizingProduct.title}`}
                  </h3>
                </div>

                {/* Child Photo Framed in Book */}
                <div className="absolute bottom-5 right-4 left-4 bg-white/95 backdrop-blur-md p-2.5 rounded-2xl shadow-2xl border border-white flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-purple-500 shadow-sm shrink-0 bg-purple-100 flex items-center justify-center">
                    {childPhotoUrl ? (
                      <img src={childPhotoUrl} alt="Hero" className="w-full h-full object-cover" />
                    ) : (
                      <span className="text-2xl">{childGender === 'boy' ? '👦' : '👧'}</span>
                    )}
                  </div>
                  <div className="text-right flex-1">
                    <span className="text-[9px] font-black text-pink-600 block uppercase">
                      بطل هذه القصة
                    </span>
                    <h5 className="font-black text-slate-900 text-sm leading-tight">
                      {childName || 'اسم طفلك'}
                    </h5>
                    <span className="text-[10px] text-slate-500 font-semibold">
                      العمر: {childAge} سنوات
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Price & Actions Box */}
            <div className="mt-6 pt-4 border-t border-slate-200/80 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-baseline gap-2">
                  <span className="text-2xl font-black text-purple-700">
                    {formatPrice(customizingProduct.discountPrice * quantity)}
                  </span>
                  <span className="text-xs text-slate-400 line-through">
                    {formatPrice(customizingProduct.originalPrice * quantity)}
                  </span>
                  {discountPercent > 0 && (
                    <span className="text-[10px] font-bold text-red-600 bg-red-50 px-2 py-0.5 rounded-full">
                      وفرت {discountPercent}%
                    </span>
                  )}
                </div>

                {/* Quantity */}
                <div className="flex items-center gap-2 bg-white rounded-xl border border-slate-200 p-1">
                  <button
                    type="button"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-6 h-6 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 flex items-center justify-center font-bold text-sm cursor-pointer"
                  >
                    -
                  </button>
                  <span className="text-xs font-bold text-slate-800 w-5 text-center">{quantity}</span>
                  <button
                    type="button"
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-6 h-6 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 flex items-center justify-center font-bold text-sm cursor-pointer"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Urgency tag */}
              <div className="flex items-center gap-1.5 text-[11px] text-amber-800 font-bold bg-amber-100/70 p-2 rounded-xl">
                <Flame className="w-3.5 h-3.5 text-amber-600" />
                تم طلب 18 قصة خلال الـ 24 ساعة الماضية
              </div>

              {/* Action Buttons */}
              <div className="space-y-2">
                <button
                  type="button"
                  onClick={handleAddToCart}
                  className="w-full py-3.5 px-4 rounded-2xl bg-gradient-to-r from-purple-600 via-pink-600 to-purple-700 hover:from-purple-700 hover:to-pink-700 text-white font-extrabold text-sm shadow-xl shadow-purple-200 transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <ShoppingCart className="w-4 h-4" />
                  أضف إلى السلة للمتابعة
                </button>

                <button
                  type="button"
                  onClick={handleWhatsAppOrder}
                  className="w-full py-2.5 px-4 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-md shadow-emerald-100"
                >
                  <MessageCircle className="w-4 h-4" />
                  طلب سريع ومباشر عبر واتساب
                </button>
              </div>

              {/* Guarantees */}
              <div className="flex items-center justify-center gap-4 text-[10px] text-slate-500 font-semibold pt-1">
                <span className="flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" /> ضمان جودة الطباعة
                </span>
                <span className="flex items-center gap-1">
                  <Gift className="w-3.5 h-3.5 text-pink-600" /> تغليف هدايا مجاناً
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
