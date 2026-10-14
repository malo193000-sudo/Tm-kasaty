import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import {
  X,
  CheckCircle,
  Truck,
  CreditCard,
  Banknote,
  Smartphone,
  ShieldCheck,
  MessageCircle,
  Gift,
} from 'lucide-react';
import confetti from 'canvas-confetti';

export const CheckoutModal: React.FC = () => {
  const {
    isCheckoutOpen,
    setIsCheckoutOpen,
    cartItems,
    clearCart,
    cartTotal,
    cartDiscount,
    formatPrice,
    config,
    storiesCount,
  } = useStore();

  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [city, setCity] = useState('القاهرة');
  const [address, setAddress] = useState('');
  const [notes, setNotes] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'cod' | 'card' | 'wallet'>('cod');
  const [orderPlaced, setOrderPlaced] = useState<{ id: string } | null>(null);

  if (!isCheckoutOpen) return null;

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim() || !phone.trim() || !address.trim()) {
      alert('يرجى استكمال جميع بيانات التوصيل المطلوبة');
      return;
    }

    const orderId = 'KST-' + Math.floor(100000 + Math.random() * 900000);
    setOrderPlaced({ id: orderId });

    try {
      confetti({
        particleCount: 120,
        spread: 80,
        origin: { y: 0.6 },
      });
    } catch {
      // ignore
    }

    clearCart();
  };

  const handleClose = () => {
    setIsCheckoutOpen(false);
    setOrderPlaced(null);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/80 backdrop-blur-sm overflow-y-auto">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-2xl overflow-hidden border border-purple-100 flex flex-col my-auto max-h-[94vh] text-right">
        {/* Header */}
        <div className="flex items-center justify-between p-4 sm:p-5 border-b border-slate-100 bg-gradient-to-r from-purple-50 to-pink-50">
          <div>
            <h3 className="font-black text-slate-900 text-lg">
              {orderPlaced ? 'تم تأكيد طلبك بنجاح 🎉' : 'إتمام الطلب وتحديد عنوان الشحن'}
            </h3>
            <p className="text-xs text-slate-500 font-medium">
              {orderPlaced ? 'شكراً لثقتكم بمتجر قصتي' : 'نضمن لك سرعة التوصيل وأعلى دقة في الطباعة'}
            </p>
          </div>
          <button
            onClick={handleClose}
            className="w-8 h-8 rounded-full bg-white hover:bg-slate-100 text-slate-500 flex items-center justify-center shadow-xs cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {orderPlaced ? (
          /* Order Confirmed Screen */
          <div className="p-6 sm:p-8 space-y-6 text-center overflow-y-auto">
            <div className="w-20 h-20 mx-auto rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center shadow-md animate-bounce">
              <CheckCircle className="w-12 h-12" />
            </div>

            <div className="space-y-2">
              <span className="text-xs font-black text-purple-700 bg-purple-100 px-3 py-1 rounded-full">
                رقم الطلب: {orderPlaced.id}
              </span>
              <h2 className="text-2xl font-black text-slate-900">
                تهانينا يا {fullName || 'عميلنا العزيز'}!
              </h2>
              <p className="text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
                تم استلام بيانات طلبك بنجاح. فريقنا الفني سيبدأ الآن بمراجعة الصور والأسماء وتجهيز القصة للطباعة والتجليد الفاخر وتغليفها كهدية راقية.
              </p>
            </div>

            {/* Next steps card */}
            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 text-right max-w-md mx-auto text-xs space-y-2 text-slate-700 font-semibold">
              <div className="font-bold text-slate-900 border-b border-slate-200 pb-1.5 flex items-center gap-1.5">
                <Truck className="w-4 h-4 text-purple-600" />
                خطوات ما بعد تأكيد الطلب:
              </div>
              <p>1. سيقوم فريق خدمة العملاء بالتواصل معك هاتفياً أو عبر واتساب لتأكيد وضوح الصورة وتنسيق الإهداء.</p>
              <p>2. تصلك الشحنة خلال 5 - 8 أيام عمل مغلفة بأناقة حتى باب منزلك في {city}.</p>
            </div>

            {/* WhatsApp confirmation button */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
              <a
                href={`https://wa.me/${config.whatsappNumber.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(
                  `مرحباً، قمت بتأكيد الطلب رقم ${orderPlaced.id} باسم ${fullName}. أحببت التواصل لتأكيد استلام التفاصيل.`
                )}`}
                target="_blank"
                rel="noreferrer"
                className="w-full sm:w-auto px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold text-xs flex items-center justify-center gap-2 shadow-md cursor-pointer"
              >
                <MessageCircle className="w-4 h-4" />
                تأكيد فوري عبر واتساب
              </a>

              <button
                type="button"
                onClick={handleClose}
                className="w-full sm:w-auto px-6 py-3 bg-slate-200 hover:bg-slate-300 text-slate-800 rounded-xl font-bold text-xs cursor-pointer"
              >
                العودة للصفحة الرئيسية
              </button>
            </div>
          </div>
        ) : (
          /* Checkout Form */
          <form onSubmit={handlePlaceOrder} className="p-4 sm:p-6 space-y-5 overflow-y-auto flex-1">
            {/* Order Items Preview */}
            <div className="bg-purple-50/50 p-3.5 rounded-2xl border border-purple-100 space-y-2">
              <span className="text-xs font-black text-purple-900 block">
                ملخص القصص المطلوبة ({cartItems.length}):
              </span>
              <div className="divide-y divide-purple-100 max-h-36 overflow-y-auto">
                {cartItems.map((item) => (
                  <div key={item.cartItemId} className="py-2 flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2">
                      <img
                        src={item.childPhotoUrl || item.product.coverImage}
                        alt=""
                        className="w-8 h-8 rounded-lg object-cover"
                      />
                      <span>
                        <strong className="text-slate-900">{item.product.title}</strong>{' '}
                        (للبطل: {item.childName})
                      </span>
                    </div>
                    <span className="font-bold text-purple-700">
                      {formatPrice(item.pricePerUnit * item.quantity)}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Contact & Shipping Details */}
            <div className="space-y-4">
              <h4 className="text-xs font-black text-slate-900 border-b border-slate-100 pb-1">
                بيانات المستلم والشحن
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    الاسم بالكامل *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="مثال: سارة محمد"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold focus:outline-none focus:ring-1 focus:ring-purple-400"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    رقم الهاتف / واتساب *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="مثال: 01012345678"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold focus:outline-none focus:ring-1 focus:ring-purple-400"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    المحافظة / المدينة *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="مثال: القاهرة / المعادي"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold focus:outline-none focus:ring-1 focus:ring-purple-400"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    العنوان بالتفصيل (الشارع، العمارة، الشقة) *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="اسم الشارع، رقم العقار، الدور، الشقة..."
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold focus:outline-none focus:ring-1 focus:ring-purple-400"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  ملاحظات إضافية للتوصيل (اختياري)
                </label>
                <input
                  type="text"
                  placeholder="أي تعليمات للمندوب أو موعد التسليم المفضل..."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold focus:outline-none focus:ring-1 focus:ring-purple-400"
                />
              </div>
            </div>

            {/* Payment Method */}
            <div className="space-y-3">
              <h4 className="text-xs font-black text-slate-900 border-b border-slate-100 pb-1">
                طريقة الدفع
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                <button
                  type="button"
                  onClick={() => setPaymentMethod('cod')}
                  className={`p-3 rounded-2xl border text-right transition-all cursor-pointer ${
                    paymentMethod === 'cod'
                      ? 'border-purple-600 bg-purple-50 ring-2 ring-purple-200'
                      : 'border-slate-200 bg-white hover:border-slate-300'
                  }`}
                >
                  <Banknote className="w-5 h-5 text-emerald-600 mb-1" />
                  <span className="text-xs font-bold block text-slate-900">الدفع عند الاستلام</span>
                  <span className="text-[10px] text-slate-500">ادفع نقدًا عند المعاينة</span>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod('wallet')}
                  className={`p-3 rounded-2xl border text-right transition-all cursor-pointer ${
                    paymentMethod === 'wallet'
                      ? 'border-purple-600 bg-purple-50 ring-2 ring-purple-200'
                      : 'border-slate-200 bg-white hover:border-slate-300'
                  }`}
                >
                  <Smartphone className="w-5 h-5 text-purple-600 mb-1" />
                  <span className="text-xs font-bold block text-slate-900">إنستاباي ومحافظ إلكترونية</span>
                  <span className="text-[10px] text-slate-500">فودافون كاش / InstaPay</span>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod('card')}
                  className={`p-3 rounded-2xl border text-right transition-all cursor-pointer ${
                    paymentMethod === 'card'
                      ? 'border-purple-600 bg-purple-50 ring-2 ring-purple-200'
                      : 'border-slate-200 bg-white hover:border-slate-300'
                  }`}
                >
                  <CreditCard className="w-5 h-5 text-blue-600 mb-1" />
                  <span className="text-xs font-bold block text-slate-900">بطاقة بنكية / فيزا</span>
                  <span className="text-[10px] text-slate-500">دفع إلكتروني فوري آمن</span>
                </button>
              </div>
            </div>

            {/* Total and Submit Button */}
            <div className="pt-4 border-t border-slate-200 space-y-3">
              <div className="flex items-center justify-between text-base font-black text-slate-900">
                <span>المبلغ النهائي المطلوب:</span>
                <span className="text-xl text-purple-700">{formatPrice(cartTotal)}</span>
              </div>

              <button
                type="submit"
                className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-purple-600 via-pink-600 to-purple-700 hover:from-purple-700 hover:to-pink-700 text-white font-black text-sm shadow-xl shadow-purple-200 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <CheckCircle className="w-5 h-5 text-amber-300" />
                تأكيد الطلب وبدء الطباعة الآن
              </button>

              <div className="flex items-center justify-center gap-3 text-[11px] text-slate-400 font-semibold">
                <span className="flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" /> دفع آمن ومشفر
                </span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <Gift className="w-3.5 h-3.5 text-pink-600" /> تغليف هدايا مجاناً
                </span>
              </div>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
