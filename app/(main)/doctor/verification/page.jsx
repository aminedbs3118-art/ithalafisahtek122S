import { ClipboardCheck, AlertCircle, XCircle } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { getCurrentUser } from "@/actions/onboarding";
import { redirect } from "next/navigation";

export default async function VerificationPage() {
  // جلب بيانات المستخدم
  const user = await getCurrentUser();

  // إذا كان الحساب موثقًا بالفعل
  if (user?.verificationStatus === "VERIFIED") {
    redirect("/doctor");
  }

  const isRejected = user?.verificationStatus === "REJECTED";

  return (
    <div className="container mx-auto px-4 py-12 bg-white min-h-screen">
      <div className="max-w-2xl mx-auto">
        <Card className="border-blue-200 bg-white shadow-lg">
          <CardHeader className="text-center">
            <div
              className={`mx-auto p-4 ${
                isRejected ? "bg-red-100" : "bg-blue-100"
              } rounded-full mb-4 w-fit`}
            >
              {isRejected ? (
                <XCircle className="h-8 w-8 text-red-500" />
              ) : (
                <ClipboardCheck className="h-8 w-8 text-blue-500" />
              )}
            </div>

            <CardTitle className="text-2xl font-bold text-blue-700">
              {isRejected
                ? "تم رفض التحقق"
                : "التحقق قيد المراجعة"}
            </CardTitle>

            <CardDescription className="text-lg text-gray-600">
              {isRejected
                ? "للأسف، يحتاج طلبك إلى بعض التعديلات"
                : "شكرًا لك على إرسال معلوماتك"}
            </CardDescription>
          </CardHeader>

          <CardContent className="text-center">
            {isRejected ? (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6 flex items-start">
                <AlertCircle className="h-5 w-5 text-red-500 mr-3 mt-0.5 flex-shrink-0" />

                <div className="text-gray-700 text-right">
                  <p className="mb-2">
                    قام فريق الإدارة بمراجعة طلبك ووجد أنه لا يطابق
                    المتطلبات الحالية. من الأسباب الشائعة للرفض:
                  </p>

                  <ul className="list-disc pr-5 space-y-1 mb-3 text-right">
                    <li>عدم وضوح أو نقص في وثائق الاعتماد</li>
                    <li>عدم استيفاء متطلبات الخبرة المهنية</li>
                    <li>وصف غير مكتمل أو غير واضح للخدمات</li>
                  </ul>

                  <p>
                    يمكنك تحديث طلبك بمعلومات إضافية ثم إعادة إرساله
                    للمراجعة.
                  </p>
                </div>
              </div>
            ) : (
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6 flex items-start">
                <AlertCircle className="h-5 w-5 text-blue-500 mr-3 mt-0.5 flex-shrink-0" />

                <p className="text-gray-700 text-right">
                  ملفك الشخصي قيد المراجعة حاليًا من قبل فريق الإدارة.
                  تستغرق هذه العملية عادةً من يوم إلى يومي عمل.
                  ستتلقى إشعارًا عبر البريد الإلكتروني بمجرد التحقق من
                  حسابك.
                </p>
              </div>
            )}

            <p className="text-gray-600 mb-6">
              {isRejected
                ? "يمكنك تحديث ملف الطبيب وإعادة إرسال طلب التحقق."
                : "أثناء انتظارك، يمكنك التعرف على المنصة أو التواصل مع فريق الدعم إذا كانت لديك أي أسئلة."}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              {isRejected ? (
                <>
                  <Button
                    asChild
                    variant="outline"
                    className="border-blue-300 text-blue-700 hover:bg-blue-50"
                  >
                    <Link href="/">العودة إلى الرئيسية</Link>
                  </Button>

                  <Button
                    asChild
                    className="bg-blue-600 hover:bg-blue-700 text-white"
                  >
                    <Link href="/doctor/update-profile">
                      تحديث الملف الشخصي
                    </Link>
                  </Button>
                </>
              ) : (
                <>
                  <Button
                    asChild
                    variant="outline"
                    className="border-blue-300 text-blue-700 hover:bg-blue-50"
                  >
                    <Link href="/">العودة إلى الرئيسية</Link>
                  </Button>

                  <Button
                    asChild
                    className="bg-blue-600 hover:bg-blue-700 text-white"
                  >
                    <Link href="/contact-support">
                      التواصل مع الدعم
                    </Link>
                  </Button>
                </>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}