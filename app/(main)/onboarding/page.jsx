"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";

import { Button } from "@/components/ui/button";

import {
  User,
  Stethoscope,
  Loader2,
  MapPin,
} from "lucide-react";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { setUserRole } from "@/actions/onboarding";
import { doctorFormSchema } from "@/lib/schema";
import { SPECIALTIES } from "@/lib/specialities";

import useFetch from "@/hooks/use-fetch";

export default function OnboardingPage() {
  const [step, setStep] = useState("choose-role");
  const router = useRouter();

  // Hook مخصص لرفع بيانات المستخدم
  const { loading, data, fn: submitUserRole } =
    useFetch(setUserRole);

  // إعداد React Hook Form مع Zod
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm({
    resolver: zodResolver(doctorFormSchema),
    defaultValues: {
      specialty: "",
      experience: undefined,
      credentialUrl: "",
      description: "",
      location: "",
    },
  });

  // مراقبة قيمة التخصص
  const specialtyValue = watch("specialty");

  // اختيار مريض
  const handlePatientSelection = async () => {
    if (loading) return;

    const formData = new FormData();
    formData.append("role", "PATIENT");

    await submitUserRole(formData);
  };

  useEffect(() => {
    if (data && data?.success) {
      router.push(data.redirect);
    }
  }, [data]);

  // إرسال نموذج الطبيب
  const onDoctorSubmit = async (data) => {
    if (loading) return;

    const formData = new FormData();

    formData.append("role", "DOCTOR");
    formData.append("specialty", data.specialty);
    formData.append(
      "experience",
      data.experience.toString()
    );
    formData.append("credentialUrl", data.credentialUrl);
    formData.append("description", data.description);

    // الموقع فرونت اند فقط
    formData.append("location", data.location || "");

    await submitUserRole(formData);
  };

  // صفحة اختيار الدور
  if (step === "choose-role") {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-white min-h-screen p-4">
        {/* بطاقة المريض */}
        <Card
          className="border-blue-200 hover:border-blue-400 cursor-pointer transition-all bg-white shadow-md rounded-2xl"
          onClick={() =>
            !loading && handlePatientSelection()
          }
        >
          <CardContent className="pt-6 pb-6 flex flex-col items-center text-center">
            <div className="p-4 bg-blue-100 rounded-full mb-4">
              <User className="h-8 w-8 text-blue-600" />
            </div>

            <CardTitle className="text-xl font-semibold text-blue-700 mb-2">
              التسجيل كمريض
            </CardTitle>

            <CardDescription className="mb-4 text-gray-600">
              احجز المواعيد، تواصل مع الأطباء، وقم بإدارة
              رحلتك الصحية بسهولة
            </CardDescription>

            <Button
              className="w-full mt-2 bg-blue-600 hover:bg-blue-700 text-white"
              disabled={loading}
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  جاري المعالجة...
                </>
              ) : (
                "المتابعة كمريض"
              )}
            </Button>
          </CardContent>
        </Card>

        {/* بطاقة الطبيب */}
        <Card
          className="border-blue-200 hover:border-blue-400 cursor-pointer transition-all bg-white shadow-md rounded-2xl"
          onClick={() =>
            !loading && setStep("doctor-form")
          }
        >
          <CardContent className="pt-6 pb-6 flex flex-col items-center text-center">
            <div className="p-4 bg-blue-100 rounded-full mb-4">
              <Stethoscope className="h-8 w-8 text-blue-600" />
            </div>

            <CardTitle className="text-xl font-semibold text-blue-700 mb-2">
              التسجيل كطبيب
            </CardTitle>

            <CardDescription className="mb-4 text-gray-600">
              أنشئ ملفك المهني، حدّد أوقات العمل، وابدأ
              بتقديم الاستشارات الطبية
            </CardDescription>

            <Button
              className="w-full mt-2 bg-blue-600 hover:bg-blue-700 text-white"
              disabled={loading}
            >
              المتابعة كطبيب
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  // نموذج الطبيب
  if (step === "doctor-form") {
    return (
      <Card className="border-blue-200 bg-white shadow-lg rounded-2xl">
        <CardContent className="pt-6">
          <div className="mb-6">
            <CardTitle className="text-2xl font-bold text-blue-700 mb-2">
              إكمال ملف الطبيب
            </CardTitle>

            <CardDescription className="text-gray-600">
              يرجى إدخال معلوماتك المهنية من أجل التحقق
            </CardDescription>
          </div>

        <form
  onSubmit={handleSubmit(onDoctorSubmit)}
  className="space-y-6"
>
  {/* المعلومات الشخصية */}
  <Card className="border-blue-100 bg-blue-50/30">
    <CardContent className="pt-4">
      <div className="flex items-center gap-2 mb-4">
        <User className="h-5 w-5 text-blue-600" />
        <h3 className="text-lg font-semibold text-blue-700">
          المعلومات الشخصية
        </h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* الاسم */}
        <div className="space-y-2">
          <Label htmlFor="firstName">
            الاسم
          </Label>

          <Input
            id="firstName"
            type="text"
            placeholder="أدخل الاسم"
          />
        </div>

        {/* اللقب */}
        <div className="space-y-2">
          <Label htmlFor="lastName">
            اللقب
          </Label>

          <Input
            id="lastName"
            type="text"
            placeholder="أدخل اللقب"
          />
        </div>
      </div>

      {/* رقم التعريف */}
      <div className="space-y-2 mt-4">
        <Label htmlFor="nationalId">
          رقم التعريف الوطني
        </Label>

        <Input
          id="nationalId"
          type="text"
          placeholder="أدخل رقم التعريف الوطني"
        />
      </div>

      <p className="text-sm text-gray-500 mt-3">
        هذه المعلومات للواجهة فقط ولن يتم حفظها في قاعدة البيانات
      </p>
    </CardContent>
  </Card>

  {/* التخصص */}
  <div className="space-y-2">
    <Label htmlFor="specialty">
      التخصص الطبي
    </Label>

    <Select
      value={specialtyValue}
      onValueChange={(value) =>
        setValue("specialty", value)
      }
    >
      <SelectTrigger id="specialty">
        <SelectValue placeholder="اختر تخصصك" />
      </SelectTrigger>

      <SelectContent>
        {SPECIALTIES.map((spec) => (
          <SelectItem
            key={spec.name}
            value={spec.name}
            className="flex items-center gap-2"
          >
            <span className="text-blue-600">
              {spec.icon}
            </span>

            {spec.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>

    {errors.specialty && (
      <p className="text-sm font-medium text-red-500 mt-1">
        {errors.specialty.message}
      </p>
    )}
  </div>

  {/* الموقع */}
  <div className="space-y-2">
    <Label htmlFor="location">
      الموقع أو الولاية
    </Label>

    <div className="relative">
      <MapPin className="absolute right-3 top-3 h-5 w-5 text-blue-500" />

      <Input
        id="location"
        type="text"
        placeholder="مثال: الجزائر العاصمة"
        className="pr-10"
        {...register("location")}
      />
    </div>

    <p className="text-sm text-gray-500">
      هذه الخانة للواجهة فقط ولن يتم حفظها في قاعدة البيانات
    </p>
  </div>

  {/* سنوات الخبرة */}
  <div className="space-y-2">
    <Label htmlFor="experience">
      سنوات الخبرة
    </Label>

    <Input
      id="experience"
      type="number"
      placeholder="مثال: 5"
      {...register("experience", {
        valueAsNumber: true,
      })}
    />

    {errors.experience && (
      <p className="text-sm font-medium text-red-500 mt-1">
        {errors.experience.message}
      </p>
    )}
  </div>

  {/* رابط الشهادة */}
  <div className="space-y-2">
    <Label htmlFor="credentialUrl">
      رابط الشهادة أو الوثيقة الطبية
    </Label>

    <Input
      id="credentialUrl"
      type="url"
      placeholder="https://example.com/document.pdf"
      {...register("credentialUrl")}
    />

    {errors.credentialUrl && (
      <p className="text-sm font-medium text-red-500 mt-1">
        {errors.credentialUrl.message}
      </p>
    )}

    <p className="text-sm text-gray-500">
      يرجى إضافة رابط لشهادتك الطبية أو اعتمادك المهني
    </p>
  </div>

  {/* وصف الخدمات */}
  <div className="space-y-2">
    <Label htmlFor="description">
      وصف الخدمات الطبية
    </Label>

    <Textarea
      id="description"
      placeholder="قم بوصف خبراتك الطبية والخدمات التي تقدمها وطريقتك في رعاية المرضى..."
      rows="4"
      {...register("description")}
    />

    {errors.description && (
      <p className="text-sm font-medium text-red-500 mt-1">
        {errors.description.message}
      </p>
    )}
  </div>

  {/* الأزرار */}
  <div className="pt-2 flex items-center justify-between">
    <Button
      type="button"
      variant="outline"
      onClick={() =>
        setStep("choose-role")
      }
      className="border-blue-300 text-blue-700 hover:bg-blue-50"
      disabled={loading}
    >
      رجوع
    </Button>

    <Button
      type="submit"
      className="bg-blue-600 hover:bg-blue-700 text-white"
      disabled={loading}
    >
      {loading ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          جاري الإرسال...
        </>
      ) : (
        "إرسال للمراجعة"
      )}
    </Button>
  </div>
</form>
            {/* التخصص */}
            <div className="space-y-2">
              <Label htmlFor="specialty">
                التخصص الطبي
              </Label>

              <Select
                value={specialtyValue}
                onValueChange={(value) =>
                  setValue("specialty", value)
                }
              >
                <SelectTrigger id="specialty">
                  <SelectValue placeholder="اختر تخصصك" />
                </SelectTrigger>

                <SelectContent>
                  {SPECIALTIES.map((spec) => (
                    <SelectItem
                      key={spec.name}
                      value={spec.name}
                      className="flex items-center gap-2"
                    >
                      <span className="text-blue-600">
                        {spec.icon}
                      </span>

                      {spec.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {errors.specialty && (
                <p className="text-sm font-medium text-red-500 mt-1">
                  {errors.specialty.message}
                </p>
              )}
            </div>

            {/* الموقع */}
            <div className="space-y-2">
              <Label htmlFor="location">
                الموقع أو الولاية
              </Label>

              <div className="relative">
                <MapPin className="absolute right-3 top-3 h-5 w-5 text-blue-500" />

                <Input
                  id="location"
                  type="text"
                  placeholder="مثال: الجزائر العاصمة"
                  className="pr-10"
                  {...register("location")}
                />
              </div>

              <p className="text-sm text-gray-500">
                هذه الخانة للواجهة فقط ولن يتم حفظها في قاعدة البيانات
              </p>
            </div>

            {/* سنوات الخبرة */}
            <div className="space-y-2">
              <Label htmlFor="experience">
                سنوات الخبرة
              </Label>

              <Input
                id="experience"
                type="number"
                placeholder="مثال: 5"
                {...register("experience", {
                  valueAsNumber: true,
                })}
              />

              {errors.experience && (
                <p className="text-sm font-medium text-red-500 mt-1">
                  {errors.experience.message}
                </p>
              )}
            </div>

            {/* رابط الشهادة */}
            <div className="space-y-2">
              <Label htmlFor="credentialUrl">
                رابط الشهادة أو الوثيقة الطبية
              </Label>

              <Input
                id="credentialUrl"
                type="url"
                placeholder="https://example.com/document.pdf"
                {...register("credentialUrl")}
              />

              {errors.credentialUrl && (
                <p className="text-sm font-medium text-red-500 mt-1">
                  {errors.credentialUrl.message}
                </p>
              )}

              <p className="text-sm text-gray-500">
                يرجى إضافة رابط لشهادتك الطبية أو
                اعتمادك المهني
              </p>
            </div>

            {/* وصف الخدمات */}
            <div className="space-y-2">
              <Label htmlFor="description">
                وصف الخدمات الطبية
              </Label>

              <Textarea
                id="description"
                placeholder="قم بوصف خبراتك الطبية والخدمات التي تقدمها وطريقتك في رعاية المرضى..."
                rows="4"
                {...register("description")}
              />

              {errors.description && (
                <p className="text-sm font-medium text-red-500 mt-1">
                  {errors.description.message}
                </p>
              )}
            </div>

            {/* الأزرار */}
            <div className="pt-2 flex items-center justify-between">
              <Button
                type="button"
                variant="outline"
                onClick={() =>
                  setStep("choose-role")
                }
                className="border-blue-300 text-blue-700 hover:bg-blue-50"
                disabled={loading}
              >
                رجوع
              </Button>

              <Button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 text-white"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    جاري الإرسال...
                  </>
                ) : (
                  "إرسال للمراجعة"
                )}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    );
  }
}
