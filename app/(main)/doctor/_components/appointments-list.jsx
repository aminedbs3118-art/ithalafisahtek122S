"use client";

import { useEffect } from "react";
import { getDoctorAppointments } from "@/actions/doctor";
import { AppointmentCard } from "@/components/appointment-card";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar } from "lucide-react";
import useFetch from "@/hooks/use-fetch";

export default function DoctorAppointmentsList() {
  const {
    loading,
    data,
    fn: fetchAppointments,
  } = useFetch(getDoctorAppointments);

  useEffect(() => {
    fetchAppointments();
  }, []);

  const appointments = data?.appointments || [];

  return (
    <Card className="border-blue-100 bg-white">
      <CardHeader>
        <CardTitle className="text-xl font-bold text-blue-900 flex items-center">
          <Calendar className="h-5 w-5 mr-2 text-blue-600" />
          المواعيد القادمة
        </CardTitle>
      </CardHeader>

      <CardContent>
        {loading ? (
          <div className="text-center py-8">
            <p className="text-blue-500">جاري تحميل المواعيد...</p>
          </div>
        ) : appointments.length > 0 ? (
          <div className="space-y-4">
            {appointments.map((appointment) => (
              <AppointmentCard
                key={appointment.id}
                appointment={appointment}
                userRole="DOCTOR"
                refetchAppointments={fetchAppointments}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-8">
            <Calendar className="h-12 w-12 mx-auto text-blue-300 mb-3" />

            <h3 className="text-xl font-medium text-blue-900 mb-2">
              لا توجد مواعيد قادمة
            </h3>

            <p className="text-blue-500">
              لا يوجد لديك أي مواعيد حالياً. تأكد من إعداد التوفر للسماح
              للمرضى بالحجز.
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}