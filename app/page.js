import Image from "next/image";
import Link from "next/link";

import {
  ArrowRight,
  Stethoscope,
} from "lucide-react";

import { Button } from "@/components/ui/button";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Badge } from "@/components/ui/badge";

import Pricing from "@/components/pricing";

import {
  creditBenefits,
  features,
  testimonials,
} from "@/lib/data";

export default function Home() {
  return (
    <div className="bg-white text-gray-800">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-32 bg-gradient-to-b from-blue-50 to-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* النص */}
            <div className="space-y-8">
              <Badge
                variant="outline"
                className="bg-blue-100 border-blue-200 px-4 py-2 text-blue-700 text-sm font-medium"
              >
                الرعاية الصحية أصبحت أسهل
              </Badge>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-blue-700 leading-tight">
                تواصل مع الأطباء <br />

                <span className="text-blue-500">
                  في أي وقت ومن أي مكان
                </span>
              </h1>

              <p className="text-gray-600 text-lg md:text-xl max-w-md leading-relaxed">
                احجز المواعيد، استشر الأطباء عبر
                الفيديو، وأدر رحلتك الصحية في
                منصة واحدة آمنة وسهلة الاستخدام.
              </p>

              {/* الأزرار */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  asChild
                  size="lg"
                  className="bg-blue-600 text-white hover:bg-blue-700"
                >
                  <Link href="/onboarding">
                    ابدأ الآن
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>

                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="border-blue-300 text-blue-700 hover:bg-blue-50"
                >
                  <Link href="/doctors">
                    ابحث عن الأطباء
                  </Link>
                </Button>
              </div>
            </div>

            {/* الصورة */}
            <div className="relative h-[400px] lg:h-[500px] rounded-3xl overflow-hidden shadow-2xl">
              <Image
                src="/banner2.png"
                alt="استشارة طبية"
                fill
                priority
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* المميزات */}
      <section className="py-20 bg-blue-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-blue-700 mb-4">
              كيف يعمل التطبيق
            </h2>

            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              منصتنا تجعل الرعاية الصحية سهلة
              ومتاحة ببضع نقرات فقط
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card
                key={index}
                className="bg-white border-blue-100 hover:border-blue-300 transition-all duration-300 shadow-md rounded-2xl"
              >
                <CardHeader className="pb-2">
                  <div className="bg-blue-100 p-3 rounded-xl w-fit mb-4 text-blue-600">
                    {feature.icon}
                  </div>

                  <CardTitle className="text-xl font-semibold text-blue-700">
                    {feature.title}
                  </CardTitle>
                </CardHeader>

                <CardContent>
                  <p className="text-gray-600">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* الأسعار */}
      <section id="pricing" className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge
              variant="outline"
              className="bg-blue-100 border-blue-200 px-4 py-1 text-blue-700 text-sm font-medium mb-4"
            >
              رعاية صحية بأسعار مناسبة
            </Badge>

            <h2 className="text-3xl md:text-4xl font-bold text-blue-700 mb-4">
              باقات الاستشارة
            </h2>

            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              اختر الباقة المناسبة التي تلبي
              احتياجاتك الصحية
            </p>
          </div>

          <div className="mx-auto">
            <Pricing />

            {/* شرح الرصيد */}
            <Card className="mt-12 bg-blue-50 border-blue-200 rounded-2xl shadow-md">
              <CardHeader>
                <CardTitle className="text-xl font-semibold text-blue-700 flex items-center">
                  <Stethoscope className="h-5 w-5 mr-2 text-blue-500" />
                  كيف يعمل نظام الرصيد لدينا
                </CardTitle>
              </CardHeader>

              <CardContent>
                <ul className="space-y-3">
                  {creditBenefits.map(
                    (benefit, index) => (
                      <li
                        key={index}
                        className="flex items-start"
                      >
                        <div className="mr-3 mt-1 bg-blue-100 p-1 rounded-full">
                          <svg
                            className="h-4 w-4 text-blue-600"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M5 13l4 4L19 7"
                            />
                          </svg>
                        </div>

                        <p
                          className="text-gray-600"
                          dangerouslySetInnerHTML={{
                            __html: benefit,
                          }}
                        />
                      </li>
                    )
                  )}
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* آراء المستخدمين */}
      <section className="py-20 bg-blue-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge
              variant="outline"
              className="bg-blue-100 border-blue-200 px-4 py-1 text-blue-700 text-sm font-medium mb-4"
            >
              قصص النجاح
            </Badge>

            <h2 className="text-3xl md:text-4xl font-bold text-blue-700 mb-4">
              ماذا يقول مستخدمونا
            </h2>

            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              آراء المرضى والأطباء الذين
              يستخدمون منصتنا
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map(
              (testimonial, index) => (
                <Card
                  key={index}
                  className="border-blue-100 hover:border-blue-300 transition-all bg-white shadow-md rounded-2xl"
                >
                  <CardContent className="pt-6">
                    <div className="flex items-center mb-4">
                      <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mr-4">
                        <span className="text-blue-600 font-bold">
                          {
                            testimonial.initials
                          }
                        </span>
                      </div>

                      <div>
                        <h4 className="font-semibold text-blue-700">
                          {testimonial.name}
                        </h4>

                        <p className="text-sm text-gray-500">
                          {testimonial.role}
                        </p>
                      </div>
                    </div>

                    <p className="text-gray-600 leading-relaxed">
                      &quot;
                      {testimonial.quote}
                      &quot;
                    </p>
                  </CardContent>
                </Card>
              )
            )}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <Card className="bg-gradient-to-r from-blue-600 to-blue-500 border-0 rounded-3xl shadow-2xl">
            <CardContent className="p-8 md:p-12 lg:p-16 relative overflow-hidden">
              <div className="max-w-2xl relative z-10">
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                  هل أنت مستعد للعناية بصحتك؟
                </h2>

                <p className="text-lg text-blue-100 mb-8 leading-relaxed">
                  انضم إلى آلاف المستخدمين
                  الذين سهّلوا رحلتهم الصحية
                  معنا. ابدأ اليوم واستمتع
                  بتجربة رعاية صحية حديثة
                  وآمنة.
                </p>

                <div className="flex flex-col sm:flex-row gap-4">
                  <Button
                    asChild
                    size="lg"
                    className="bg-white text-blue-700 hover:bg-blue-100"
                  >
                    <Link href="/sign-up">
                      سجل الآن
                    </Link>
                  </Button>

                  <Button
                    asChild
                    variant="outline"
                    size="lg"
                    className="border-white text-white hover:bg-white/10"
                  >
                    <Link href="#pricing">
                      عرض الأسعار
                    </Link>
                  </Button>
                </div>
              </div>

              {/* تأثيرات الخلفية */}
              <div className="absolute right-0 top-0 w-[300px] h-[300px] bg-white/10 rounded-full blur-3xl -mr-20 -mt-20"></div>

              <div className="absolute left-0 bottom-0 w-[200px] h-[200px] bg-white/10 rounded-full blur-3xl -ml-10 -mb-10"></div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}