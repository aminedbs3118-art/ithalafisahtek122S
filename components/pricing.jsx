"use client";

import React from "react";
import { Card, CardContent } from "./ui/card";
import { Check } from "lucide-react";

const Pricing = () => {
  return (
    <Card className="border-blue-200 shadow-lg">
      <CardContent className="p-6 md:p-8" dir="rtl">

        <div className="grid md:grid-cols-2 gap-6">

          {/* اشتراك الطبيب */}
          <div className="border rounded-3xl p-8 bg-white shadow-sm">
            <h2 className="text-3xl font-bold text-center mb-2">
              اشتراك الطبيب
            </h2>

            <p className="text-center text-gray-500 mb-6">
              للأطباء المستقلين
            </p>

            <div className="text-center mb-8">
              <span className="text-5xl font-bold text-blue-600">2500</span>
              <span className="text-xl mr-2"> دج</span>
              <p className="text-gray-500 mt-2">شهرياً</p>
            </div>

            <ul className="space-y-4 mb-8">
              <li className="flex items-center gap-2">
                <Check className="text-green-500 w-5 h-5" />
                20 حجزاً شهرياً مشمولاً
              </li>

              <li className="flex items-center gap-2">
                <Check className="text-green-500 w-5 h-5" />
                صفحة شخصية للطبيب
              </li>

              <li className="flex items-center gap-2">
                <Check className="text-green-500 w-5 h-5" />
                إدارة المواعيد بسهولة
              </li>

              <li className="flex items-center gap-2">
                <Check className="text-green-500 w-5 h-5" />
                استقبال الحجوزات من المرضى
              </li>

              <li className="flex items-center gap-2">
                <Check className="text-green-500 w-5 h-5" />
                عمولة 1% فقط بعد تجاوز 20 حجزاً
              </li>
            </ul>

            <button className="w-full bg-slate-900 text-white py-3 rounded-xl font-semibold">
              الاشتراك كطبيب
            </button>
          </div>

          {/* اشتراك العيادة */}
          <div className="rounded-3xl p-8 text-white shadow-lg bg-gradient-to-br from-blue-600 to-cyan-500">
            <div className="inline-block bg-white text-blue-600 px-4 py-1 rounded-full text-sm font-semibold mb-4">
              ⭐ الأكثر احترافية
            </div>

            <h2 className="text-3xl font-bold text-center mb-2">
              اشتراك العيادة
            </h2>

            <p className="text-center text-blue-100 mb-6">
              للعيادات والمراكز الطبية
            </p>

            <div className="text-center mb-8">
              <span className="text-5xl font-bold">12000</span>
              <span className="text-xl mr-2"> دج</span>
              <p className="text-blue-100 mt-2">شهرياً</p>
            </div>

            <ul className="space-y-4 mb-8">
              <li className="flex items-center gap-2">
                <Check className="w-5 h-5" />
                عدد غير محدود من الأطباء
              </li>

              <li className="flex items-center gap-2">
                <Check className="w-5 h-5" />
                عدد غير محدود من الحجوزات
              </li>

              <li className="flex items-center gap-2">
                <Check className="w-5 h-5" />
                لوحة تحكم متقدمة للعيادة
              </li>

              <li className="flex items-center gap-2">
                <Check className="w-5 h-5" />
                إدارة جميع الأطباء والمواعيد
              </li>

              <li className="flex items-center gap-2">
                <Check className="w-5 h-5" />
                أولوية الظهور في نتائج البحث
              </li>

              <li className="flex items-center gap-2">
                <Check className="w-5 h-5" />
                إحصائيات وتقارير متقدمة
              </li>

              <li className="flex items-center gap-2">
                <Check className="w-5 h-5" />
                دعم فني مخصص
              </li>
            </ul>

            <button className="w-full bg-white text-blue-600 py-3 rounded-xl font-semibold">
              الاشتراك كعيادة
            </button>
          </div>
        </div>

        {/* قسم الدعم */}
        <div className="mt-12">
          <div className="rounded-3xl border p-8 text-center bg-slate-50">
            <h3 className="text-2xl font-bold mb-3">
              تحتاج إلى مساعدة؟
            </h3>

            <p className="text-gray-600 mb-6">
              فريق الدعم متاح للإجابة على جميع استفساراتك ومساعدتك في الاشتراك.
            </p>

            <div className="flex flex-col md:flex-row justify-center gap-4">
              <a
                href="tel:+213799762819"
                className="px-6 py-3 rounded-xl bg-blue-600 text-white font-medium"
              >
                📞 اتصل بنا
              </a>

              <a
                href="https://wa.me/213799762819"
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 rounded-xl bg-green-600 text-white font-medium"
              >
                💬 واتساب
              </a>

              <a
                href="mailto:athalafisahtek@gmail.com"
                className="px-6 py-3 rounded-xl border font-medium"
              >
                ✉️ البريد الإلكتروني
              </a>
            </div>

            <div className="mt-6 text-gray-500">
              <p>الهاتف 0799762819</p>
              <p>البريد الإلكتروني: athalafisahtek@gmail.com</p>
            </div>
          </div>
        </div>

      </CardContent>
    </Card>
  );
};

export default Pricing;
