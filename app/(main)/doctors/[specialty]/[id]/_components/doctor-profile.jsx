// /app/doctors/[id]/_components/doctor-profile.jsx
"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

import {
  User,
  Calendar,
  Clock,
  Medal,
  FileText,
  ChevronDown,
  ChevronUp,
  AlertCircle,
} from "lucide-react";

import { Button } from "@/components/ui/button";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Separator } from "@/components/ui/separator";

import { Badge } from "@/components/ui/badge";

import { SlotPicker } from "./slot-picker";
import { AppointmentForm } from "./appointment-form";

import {
  Alert,
  AlertDescription,
} from "@/components/ui/alert";

export function DoctorProfile({
  doctor,
  availableDays,
}) {
  const [showBooking, setShowBooking] =
    useState(false);

  const [selectedSlot, setSelectedSlot] =
    useState(null);

  const router = useRouter();

  // حساب عدد المواعيد المتاحة
  const totalSlots = availableDays?.reduce(
    (total, day) => total + day.slots.length,
    0
  );

  const toggleBooking = () => {
    setShowBooking(!showBooking);

    if (!showBooking) {
      // تمرير تلقائي لقسم الحجز
      setTimeout(() => {
        document
          .getElementById("booking-section")
          ?.scrollIntoView({
            behavior: "smooth",
          });
      }, 100);
    }
  };

  const handleSlotSelect = (slot) => {
    setSelectedSlot(slot);
  };

  const handleBookingComplete = () => {
    router.push("/appointments");
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 bg-white min-h-screen">
      {/* العمود الأيسر */}
      <div className="md:col-span-1">
        <div className="md:sticky md:top-24">
          <Card className="border-blue-200 bg-white shadow-lg rounded-2xl">
            <CardContent className="pt-6">
              <div className="flex flex-col items-center text-center">
                {/* صورة الطبيب */}
                <div className="relative w-32 h-32 rounded-full overflow-hidden mb-4 bg-blue-100">
                  {doctor.imageUrl ? (
                    <Image
                      src={doctor.imageUrl}
                      alt={doctor.name}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <User className="h-16 w-16 text-blue-500" />
                    </div>
                  )}
                </div>

                {/* اسم الطبيب */}
                <h2 className="text-xl font-bold text-blue-700 mb-1">
                  د. {doctor.name}
                </h2>

                {/* التخصص */}
                <Badge
                  variant="outline"
                  className="bg-blue-50 border-blue-200 text-blue-600 mb-4"
                >
                  {doctor.specialty}
                </Badge>

                {/* الخبرة */}
                <div className="flex items-center justify-center mb-2">
                  <Medal className="h-4 w-4 text-blue-500 mr-2" />

                  <span className="text-gray-600">
                    {doctor.experience} سنوات خبرة
                  </span>
                </div>

                {/* زر الحجز */}
                <Button
                  onClick={toggleBooking}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white mt-4"
                >
                  {showBooking ? (
                    <>
                      إخفاء الحجز
                      <ChevronUp className="ml-2 h-4 w-4" />
                    </>
                  ) : (
                    <>
                      حجز موعد
                      <ChevronDown className="ml-2 h-4 w-4" />
                    </>
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* العمود الأيمن */}
      <div className="md:col-span-2 space-y-6">
        {/* معلومات الطبيب */}
        <Card className="border-blue-200 bg-white shadow-lg rounded-2xl">
          <CardHeader>
            <CardTitle className="text-xl font-bold text-blue-700">
              نبذة عن د. {doctor.name}
            </CardTitle>

            <CardDescription className="text-gray-600">
              الخلفية المهنية والخبرات الطبية
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-6">
            {/* الوصف */}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-blue-500" />

                <h3 className="text-blue-700 font-medium">
                  الوصف
                </h3>
              </div>

              <p className="text-gray-600 whitespace-pre-line">
                {doctor.description}
              </p>
            </div>

            <Separator className="bg-blue-100" />

            {/* التوفر */}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-blue-500" />

                <h3 className="text-blue-700 font-medium">
                  المواعيد المتاحة
                </h3>
              </div>

              {totalSlots > 0 ? (
                <div className="flex items-center">
                  <Calendar className="h-5 w-5 text-blue-500 mr-2" />

                  <p className="text-gray-600">
                    يوجد {totalSlots} موعد متاح
                    للحجز خلال الأيام الأربعة
                    القادمة
                  </p>
                </div>
              ) : (
                <Alert className="border-yellow-200 bg-yellow-50">
                  <AlertCircle className="h-4 w-4 text-yellow-600" />

                  <AlertDescription className="text-yellow-700">
                    لا توجد مواعيد متاحة خلال
                    الأيام الأربعة القادمة.
                    يرجى المحاولة لاحقًا.
                  </AlertDescription>
                </Alert>
              )}
            </div>
          </CardContent>
        </Card>

        {/* قسم الحجز */}
        {showBooking && (
          <div id="booking-section">
            <Card className="border-blue-200 bg-white shadow-lg rounded-2xl">
              <CardHeader>
                <CardTitle className="text-xl font-bold text-blue-700">
                  حجز موعد
                </CardTitle>

                <CardDescription className="text-gray-600">
                  اختر الوقت المناسب وأدخل
                  تفاصيل الاستشارة
                </CardDescription>
              </CardHeader>

              <CardContent className="space-y-6">
                {totalSlots > 0 ? (
                  <>
                    {/* اختيار الموعد */}
                    {!selectedSlot && (
                      <SlotPicker
                        days={availableDays}
                        onSelectSlot={
                          handleSlotSelect
                        }
                      />
                    )}

                    {/* نموذج الحجز */}
                    {selectedSlot && (
                      <AppointmentForm
                        doctorId={doctor.id}
                        slot={selectedSlot}
                        onBack={() =>
                          setSelectedSlot(null)
                        }
                        onComplete={
                          handleBookingComplete
                        }
                      />
                    )}
                  </>
                ) : (
                  <div className="text-center py-6">
                    <Calendar className="h-12 w-12 mx-auto text-gray-400 mb-3" />

                    <h3 className="text-xl font-medium text-blue-700 mb-2">
                      لا توجد مواعيد متاحة
                    </h3>

                    <p className="text-gray-600">
                      هذا الطبيب لا يملك مواعيد
                      متاحة خلال الأيام الأربعة
                      القادمة. يرجى المحاولة
                      لاحقًا أو اختيار طبيب آخر.
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}