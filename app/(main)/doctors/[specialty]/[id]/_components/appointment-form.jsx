"use client";

import { useState, useEffect } from "react";

import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

import { format } from "date-fns";

import {
  Loader2,
  Clock,
  ArrowLeft,
  Calendar,
  CreditCard,
} from "lucide-react";

import { bookAppointment } from "@/actions/appointments";

import { toast } from "sonner";

import useFetch from "@/hooks/use-fetch";

export function AppointmentForm({
  doctorId,
  slot,
  onBack,
  onComplete,
}) {
  const [description, setDescription] =
    useState("");

  // Hook لمعالجة الطلبات
  const {
    loading,
    data,
    fn: submitBooking,
  } = useFetch(bookAppointment);

  // إرسال النموذج
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("doctorId", doctorId);
    formData.append("startTime", slot.startTime);
    formData.append("endTime", slot.endTime);
    formData.append("description", description);

    await submitBooking(formData);
  };

  // التعامل مع النتيجة
  useEffect(() => {
    if (data) {
      if (data.success) {
        toast.success("تم حجز الموعد بنجاح!");
        onComplete();
      }
    }
  }, [data]);

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6"
    >
      {/* معلومات الموعد */}
      <div className="bg-blue-50 p-4 rounded-lg border border-blue-200 space-y-3">
        <div className="flex items-center">
          <Calendar className="h-5 w-5 text-blue-500 mr-2" />

          <span className="text-blue-700 font-medium">
            {format(
              new Date(slot.startTime),
              "EEEE, MMMM d, yyyy"
            )}
          </span>
        </div>

        <div className="flex items-center">
          <Clock className="h-5 w-5 text-blue-500 mr-2" />

          <span className="text-gray-700">
            {slot.formatted}
          </span>
        </div>

        <div className="flex items-center">
          <CreditCard className="h-5 w-5 text-blue-500 mr-2" />

          <span className="text-gray-600">
            التكلفة:{" "}
            <span className="text-blue-700 font-medium">
              2 رصيد
            </span>
          </span>
        </div>
      </div>

      {/* وصف الحالة */}
      <div className="space-y-2">
        <Label htmlFor="description">
          وصف المشكلة الطبية (اختياري)
        </Label>

        <Textarea
          id="description"
          placeholder="يرجى كتابة أي تفاصيل حول حالتك الصحية أو الأمور التي ترغب بمناقشتها أثناء الموعد..."
          value={description}
          onChange={(e) =>
            setDescription(e.target.value)
          }
          className="bg-white border-blue-200 h-32 focus:border-blue-400"
        />

        <p className="text-sm text-gray-500">
          سيتم مشاركة هذه المعلومات مع الطبيب
          قبل موعدك.
        </p>
      </div>

      {/* الأزرار */}
      <div className="flex justify-between pt-2">
        <Button
          type="button"
          variant="outline"
          onClick={onBack}
          disabled={loading}
          className="border-blue-300 text-blue-700 hover:bg-blue-50"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          تغيير الوقت
        </Button>

        <Button
          type="submit"
          disabled={loading}
          className="bg-blue-600 hover:bg-blue-700 text-white"
        >
          {loading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              جاري الحجز...
            </>
          ) : (
            "تأكيد الحجز"
          )}
        </Button>
      </div>
    </form>
  );
}