import { redirect } from "next/navigation";
import { getDoctorsBySpecialty } from "@/actions/doctors-listing";
import { DoctorCard } from "../components/doctor-card";
import { PageHeader } from "@/components/page-header";

export default async function DoctorSpecialtyPage({ params }) {
  const { specialty } = await params;

  // إعادة التوجيه إذا لم يتم تحديد التخصص
  if (!specialty) {
    redirect("/doctors");
  }

  // جلب الأطباء حسب التخصص
  const { doctors, error } = await getDoctorsBySpecialty(specialty);

  if (error) {
    console.error("Error fetching doctors:", error);
  }

  return (
    <div className="space-y-5 bg-white min-h-screen p-4">
      <PageHeader
        title={specialty.split("%20").join(" ")}
        backLink="/doctors"
        backLabel="جميع التخصصات"
      />

      {doctors && doctors.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {doctors.map((doctor) => (
            <DoctorCard key={doctor.id} doctor={doctor} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12 bg-blue-50 rounded-2xl border border-blue-100">
          <h3 className="text-xl font-medium text-blue-700 mb-2">
            لا يوجد أطباء متاحون
          </h3>

          <p className="text-gray-600">
            لا يوجد حاليًا أطباء موثقون ضمن هذا التخصص.
            يرجى المحاولة لاحقًا أو اختيار تخصص آخر.
          </p>
        </div>
      )}
    </div>
  );
}