import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import {
  X,
  Trash2,
  Plus,
  Minus,
  ShoppingBag,
  Sparkles,
  Gift,
  Truck,
  ArrowLeft,
  CheckCircle,
  MessageCircle,
} from 'lucide-react';

export const CartDrawer: React.FC = () => {
  const {
    isCartOpen,
    setIsCartOpen,
    cartItems,
    removeFromCart,
    updateCartQuantity,
    formatPrice,
    cartSubtotal,
    cartDiscount,
    cartTotal,
    storiesCount,
    appliedCoupon,
    discountPercent,
    applyCoupon,
    removeCoupon,
    setIsCheckoutOpen,
    config,
  } = useStore();

  const [couponInput, setCouponInput] = useState('');
  const [couponMessage, setCouponMessage] = useState<{ text: string; success: boolean } | null>(null);

  if (!isCartOpen) return null;

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!couponInput.trim()) return;
    const res = applyCoupon(couponInput);
    setCouponMessage({ text: res.message, success: res.success });
    if (res.success) {
      setCouponInput('');
    }
  };

  const neededForFreeShipping = Math.max(0, 3 - storiesCount);

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-xs transition-opacity"
        onClick={() => setIsCartOpen(false)}
      />

      <div className="fixed inset-y-0 left-0 max-w-full flex pl-0 sm:pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col text-right">
          {/* Header */}
          <div className="p-4 sm:p-5 border-b border-slate-100 flex items-center justify-between bg-gradient-to-r from-purple-50 to-pink-50">
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-xl bg-purple-600 text-white flex items-center justify-center shadow-xs">
                <ShoppingBag className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-black text-slate-900 text-base">سلة التسوق</h3>
                <span className="text-xs text-slate-500 font-bold">
                  {storiesCount} {storiesCount === 1 ? 'قصة مخصصة' : 'قصص مخصصة'}
                </span>
              </div>
            </div>
            <button
              onClick={() => setIsCartOpen(false)}
              className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-slate-200 text-slate-500 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free Shipping Progress Bar */}
          <div className="bg-amber-50/80 px-4 py-3 border-b border-amber-100">
            {neededForFreeShipping > 0 ? (
              <div>
                <div className="flex items-center justify-between text-xs font-bold text-amber-900 mb-1.5">
                  <span className="flex items-center gap-1">
                    <Truck className="w-4 h-4 text-amber-600" />
                    أضف {neededForFreeShipping} {neededForFreeShipping === 1 ? 'قصة أخرى' : 'قصص'} للحصول على شحن مجاني 🚚
                  </span>
                  <span>{storiesCount}/3</span>
                </div>
                <div className="w-full h-2 bg-amber-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-amber-500 to-pink-500 transition-all duration-500 rounded-full"
                    style={{ width: `${Math.min(100, (storiesCount / 3) * 100)}%` }}
                  />
                </div>
              </div>
            ) : (
              <div className="flex items-center gap-2 text-xs font-black text-emerald-800 bg-emerald-100/80 p-2 rounded-xl">
                <CheckCircle className="w-4 h-4 text-emerald-600" />
                تهانينا! لقد حصلت على شحن مجاني لكامل طلبك 🚚🎉
              </div>
            )}
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {cartItems.length === 0 ? (
              <div className="py-16 text-center space-y-4">
                <div className="w-20 h-20 mx-auto rounded-full bg-purple-50 flex items-center justify-center text-purple-300">
                  <ShoppingBag className="w-10 h-10" />
                </div>
                <div className="space-y-1">
                  <h4 className="font-black text-slate-800 text-base">سلة التسوق فارغة</h4>
                  <p className="text-xs text-slate-500 font-medium">
                    لم تقم بإضافة أي قصة مخصصة حتى الآن
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setIsCartOpen(false)}
                  className="px-6 py-2.5 bg-purple-600 text-white rounded-xl text-xs font-bold shadow-md hover:bg-purple-700 transition-colors cursor-pointer"
                >
                  تصفح القصص واصنع قصة لطفلك
                </button>
              </div>
            ) : (
              cartItems.map((item) => (
                <div
                  key={item.cartItemId}
                  className="p-3.5 bg-[#FAF7F2] rounded-2xl border border-amber-100/80 flex gap-3 text-right group relative"
                >
                  {/* Photo / Cover */}
                  <div className="relative w-18 h-22 rounded-xl overflow-hidden shrink-0 border border-slate-200 bg-white">
                    <img
                      src={item.childPhotoUrl || item.product.coverImage}
                      alt={item.childName}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute bottom-0 inset-x-0 bg-black/60 text-white text-[9px] font-bold text-center py-0.5">
                      {item.childGender === 'boy' ? '👦 بطل' : '👧 بطلة'}
                    </div>
                  </div>

                  {/* Details */}
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between">
                        <h4 className="font-black text-slate-900 text-xs sm:text-sm line-clamp-1">
                          {item.product.title}
                        </h4>
                        <button
                          type="button"
                          onClick={() => removeFromCart(item.cartItemId)}
                          className="text-slate-400 hover:text-red-500 p-1 cursor-pointer transition-colors"
                          title="حذف من السلة"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <div className="flex flex-wrap items-center gap-1.5 mt-1 text-[11px] text-slate-600 font-semibold">
                        <span className="bg-white px-2 py-0.5 rounded-md border border-slate-200">
                          باسم: <strong className="text-purple-700">{item.childName}</strong>
                        </span>
                        <span className="bg-white px-1.5 py-0.5 rounded-md border border-slate-200">
                          {item.childAge} سنوات
                        </span>
                        <span className="bg-white px-1.5 py-0.5 rounded-md border border-slate-200">
                          {item.storyLanguage === 'ar' ? 'عربي 🇸🇦' : 'English 🇬🇧'}
                        </span>
                      </div>

                      {item.giftPackaging && (
                        <span className="inline-flex items-center gap-1 text-[10px] text-pink-600 font-bold mt-1">
                          <Gift className="w-3 h-3" /> تغليف هدايا مجاناً
                        </span>
                      )}
                    </div>

                    {/* Quantity & Price */}
                    <div className="flex items-center justify-between pt-2 border-t border-slate-200/60 mt-2">
                      <div className="flex items-center gap-2 bg-white rounded-lg border border-slate-200 p-0.5">
                        <button
                          type="button"
                          onClick={() => updateCartQuantity(item.cartItemId, -1)}
                          className="w-5 h-5 rounded flex items-center justify-center text-slate-600 hover:bg-slate-100 text-xs font-bold cursor-pointer"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="text-xs font-bold text-slate-800 w-4 text-center">
                          {item.quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() => updateCartQuantity(item.cartItemId, 1)}
                          className="w-5 h-5 rounded flex items-center justify-center text-slate-600 hover:bg-slate-100 text-xs font-bold cursor-pointer"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <span className="text-xs sm:text-sm font-black text-purple-700">
                        {formatPrice(item.pricePerUnit * item.quantity)}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Cart Footer */}
          {cartItems.length > 0 && (
            <div className="p-4 sm:p-5 border-t border-slate-100 bg-white space-y-4">
              {/* Promo code form */}
              <div>
                {appliedCoupon ? (
                  <div className="flex items-center justify-between bg-emerald-50 border border-emerald-200 p-2.5 rounded-xl text-xs font-bold text-emerald-800">
                    <span className="flex items-center gap-1.5">
                      <Sparkles className="w-4 h-4 text-emerald-600" />
                      كود مفعّل: <strong>{appliedCoupon}</strong> (خصم {discountPercent}%)
                    </span>
                    <button
                      type="button"
                      onClick={removeCoupon}
                      className="text-red-500 hover:text-red-700 text-[11px] underline cursor-pointer"
                    >
                      إزالة
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleApplyCoupon} className="flex gap-2">
                    <input
                      type="text"
                      placeholder="كود الخصم (مثال: STORY10)"
                      value={couponInput}
                      onChange={(e) => setCouponInput(e.target.value)}
                      className="flex-1 px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-right uppercase focus:outline-none focus:ring-1 focus:ring-purple-400"
                    />
                    <button
                      type="submit"
                      className="px-4 py-2 bg-slate-800 hover:bg-slate-900 text-white rounded-xl text-xs font-bold transition-colors cursor-pointer"
                    >
                      تطبيق
                    </button>
                  </form>
                )}
                {couponMessage && (
                  <p
                    className={`text-[11px] font-bold mt-1 ${
                      couponMessage.success ? 'text-emerald-600' : 'text-red-600'
                    }`}
                  >
                    {couponMessage.text}
                  </p>
                )}
              </div>

              {/* Price Calculations */}
              <div className="space-y-1.5 text-xs text-slate-600 font-semibold border-t border-slate-100 pt-3">
                <div className="flex justify-between">
                  <span>المجموع الفرعي:</span>
                  <span className="font-bold text-slate-800">{formatPrice(cartSubtotal)}</span>
                </div>
                {cartDiscount > 0 && (
                  <div className="flex justify-between text-emerald-600">
                    <span>خصم الكوبون ({discountPercent}%):</span>
                    <span>- {formatPrice(cartDiscount)}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>تكلفة الشحن:</span>
                  <span className="font-bold text-slate-800">
                    {storiesCount >= 3 ? (
                      <span className="text-emerald-600">مجاني 🚚</span>
                    ) : (
                      'تُحدد عند الدفع'
                    )}
                  </span>
                </div>
                <div className="flex justify-between text-base font-black text-slate-900 border-t border-slate-200 pt-2">
                  <span>الإجمالي:</span>
                  <span className="text-purple-700 text-lg">{formatPrice(cartTotal)}</span>
                </div>
              </div>

              {/* Checkout Buttons */}
              <div className="space-y-2">
                <button
                  type="button"
                  onClick={() => {
                    setIsCartOpen(false);
                    setIsCheckoutOpen(true);
                  }}
                  className="w-full py-3.5 px-4 rounded-2xl bg-gradient-to-r from-purple-600 via-pink-600 to-purple-700 hover:from-purple-700 hover:to-pink-700 text-white font-extrabold text-sm shadow-xl shadow-purple-200 transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>إتمام الطلب وتحديد عنوان التوصيل</span>
                  <ArrowLeft className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
