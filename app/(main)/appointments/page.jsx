import { getPatientAppointments } from "@/actions/patient";
import { AppointmentCard } from "@/components/appointment-card";
import { PageHeader } from "@/components/page-header";
import { Calendar } from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { redirect } from "next/navigation";
import { getCurrentUser } from "@/actions/onboarding";

export default async function PatientAppointmentsPage() {
  const user = await getCurrentUser();

  // التحقق من أن المستخدم مريض
  if (!user || user.role !== "PATIENT") {
    redirect("/onboarding");
  }

  // جلب المواعيد
  const { appointments, error } =
    await getPatientAppointments();

  return (
    <div className="container mx-auto px-4 py-8 bg-white min-h-screen">
      <PageHeader
        icon={<Calendar className="text-blue-600" />}
        title="مواعيدي"
        backLink="/doctors"
        backLabel="البحث عن الأطباء"
      />

      <Card className="border-blue-200 bg-white shadow-lg rounded-2xl">
        <CardHeader>
          <CardTitle className="text-xl font-bold text-blue-700 flex items-center">
            <Calendar className="h-5 w-5 mr-2 text-blue-500" />
            المواعيد المحجوزة
          </CardTitle>
        </CardHeader>

        <CardContent>
          {error ? (
            <div className="text-center py-8">
              <p className="text-red-500">
                خطأ: {error}
              </p>
            </div>
          ) : appointments?.length > 0 ? (
            <div className="space-y-4">
              {appointments.map((appointment) => (
                <AppointmentCard
                  key={appointment.id}
                  appointment={appointment}
                  userRole="PATIENT"
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <Calendar className="h-12 w-12 mx-auto text-gray-400 mb-3" />

              <h3 className="text-xl font-medium text-blue-700 mb-2">
                لا توجد مواعيد حالياً
              </h3>

              <p className="text-gray-600">
                ليس لديك أي مواعيد محجوزة حتى الآن.
                يمكنك تصفح الأطباء وحجز أول استشارة
                طبية لك.
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}