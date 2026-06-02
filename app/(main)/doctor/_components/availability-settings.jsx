"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Clock, Plus, Loader2, AlertCircle } from "lucide-react";
import { format } from "date-fns";
import { setAvailabilitySlots } from "@/actions/doctor";
import useFetch from "@/hooks/use-fetch";
import { toast } from "sonner";

export function AvailabilitySettings({ slots }) {
  const [showForm, setShowForm] = useState(false);

  const { loading, fn: submitSlots, data } = useFetch(setAvailabilitySlots);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      startTime: "",
      endTime: "",
    },
  });

  function createLocalDateFromTime(timeStr) {
    const [hours, minutes] = timeStr.split(":").map(Number);
    const now = new Date();
    return new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate(),
      hours,
      minutes
    );
  }

  const onSubmit = async (data) => {
    if (loading) return;

    const formData = new FormData();

    const startDate = createLocalDateFromTime(data.startTime);
    const endDate = createLocalDateFromTime(data.endTime);

    if (startDate >= endDate) {
      toast.error("وقت الانتهاء يجب أن يكون بعد وقت البداية");
      return;
    }

    formData.append("startTime", startDate.toISOString());
    formData.append("endTime", endDate.toISOString());

    await submitSlots(formData);
  };

  useEffect(() => {
    if (data && data?.success) {
      setShowForm(false);
      toast.success("تم تحديث أوقات التوفر بنجاح");
    }
  }, [data]);

  const formatTimeString = (dateString) => {
    try {
      return format(new Date(dateString), "h:mm a");
    } catch {
      return "وقت غير صالح";
    }
  };

  return (
    <Card className="border-blue-100 bg-white">

      <CardHeader>
        <CardTitle className="text-xl font-bold text-blue-900 flex items-center">
          <Clock className="h-5 w-5 mr-2 text-blue-600" />
          إعدادات التوفر
        </CardTitle>

        <CardDescription className="text-blue-500">
          قم بتحديد أوقات عملك لاستقبال حجوزات المرضى
        </CardDescription>
      </CardHeader>

      <CardContent>

        {/* عرض التوفر الحالي */}
        {!showForm ? (
          <>
            <div className="mb-6">
              <h3 className="text-lg font-medium text-blue-900 mb-3">
                أوقات التوفر الحالية
              </h3>

              {slots.length === 0 ? (
                <p className="text-blue-500">
                  لم تقم بإضافة أي أوقات بعد. قم بإضافة أوقاتك لبدء استقبال
                  المواعيد.
                </p>
              ) : (
                <div className="space-y-3">
                  {slots.map((slot) => (
                    <div
                      key={slot.id}
                      className="flex items-center p-3 rounded-md bg-blue-50 border border-blue-100"
                    >
                      <div className="bg-blue-100 p-2 rounded-full mr-3">
                        <Clock className="h-4 w-4 text-blue-600" />
                      </div>

                      <div>
                        <p className="text-blue-900 font-medium">
                          {formatTimeString(slot.startTime)} -{" "}
                          {formatTimeString(slot.endTime)}
                        </p>

                        <p className="text-xs text-blue-500">
                          {slot.appointment ? "محجوز" : "متاح"}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <Button
              onClick={() => setShowForm(true)}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white"
            >
              <Plus className="h-4 w-4 mr-2" />
              إضافة وقت التوفر
            </Button>
          </>
        ) : (
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-4 border border-blue-100 rounded-md p-4"
          >
            <h3 className="text-lg font-medium text-blue-900 mb-2">
              تحديد التوفر اليومي
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

              <div className="space-y-2">
                <Label>وقت البداية</Label>
                <Input
                  type="time"
                  {...register("startTime", {
                    required: "وقت البداية مطلوب",
                  })}
                  className="border-blue-200"
                />
                {errors.startTime && (
                  <p className="text-sm text-red-500">
                    {errors.startTime.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label>وقت النهاية</Label>
                <Input
                  type="time"
                  {...register("endTime", {
                    required: "وقت النهاية مطلوب",
                  })}
                  className="border-blue-200"
                />
                {errors.endTime && (
                  <p className="text-sm text-red-500">
                    {errors.endTime.message}
                  </p>
                )}
              </div>

            </div>

            <div className="flex justify-end gap-3 pt-2">

              <Button
                type="button"
                variant="outline"
                onClick={() => setShowForm(false)}
                disabled={loading}
                className="border-blue-200"
              >
                إلغاء
              </Button>

              <Button
                type="submit"
                disabled={loading}
                className="bg-blue-600 hover:bg-blue-700 text-white"
              >
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    جاري الحفظ...
                  </>
                ) : (
                  "حفظ التوفر"
                )}
              </Button>

            </div>
          </form>
        )}

        {/* شرح */}
        <div className="mt-6 p-4 bg-blue-50 border border-blue-100 rounded-md">

          <h4 className="font-medium text-blue-900 mb-2 flex items-center">
            <AlertCircle className="h-4 w-4 mr-2 text-blue-600" />
            كيف يعمل التوفر
          </h4>

          <p className="text-blue-600 text-sm">
            عند تحديد أوقات التوفر، يمكن للمرضى حجز المواعيد خلال هذه الفترات.
            يمكنك تعديل الأوقات في أي وقت دون التأثير على المواعيد المحجوزة.
          </p>

        </div>

      </CardContent>
    </Card>
  );
}