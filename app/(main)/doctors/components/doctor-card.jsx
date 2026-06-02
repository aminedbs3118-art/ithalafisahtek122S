import { User, Star, Calendar } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export function DoctorCard({ doctor }) {
  return (
    <Card className="border-blue-200 bg-white hover:border-blue-400 transition-all shadow-md rounded-2xl">
      <CardContent className="p-5">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0 overflow-hidden">
            {doctor.imageUrl ? (
              <img
                src={doctor.imageUrl}
                alt={doctor.name}
                className="w-12 h-12 rounded-full object-cover"
              />
            ) : (
              <User className="h-6 w-6 text-blue-500" />
            )}
          </div>

          <div className="flex-1">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-2">
              <h3 className="font-medium text-blue-700 text-lg">
                {doctor.name}
              </h3>

              <Badge
                variant="outline"
                className="bg-blue-50 border-blue-200 text-blue-600 self-start"
              >
                <Star className="h-3 w-3 mr-1" />
                موثّق
              </Badge>
            </div>

            <p className="text-sm text-gray-600 mb-1">
              {doctor.specialty} • {doctor.experience} سنوات خبرة
            </p>

            <div className="mt-4 line-clamp-2 text-sm text-gray-600 mb-4">
              {doctor.description}
            </div>

            <Button
              asChild
              className="w-full bg-blue-600 hover:bg-blue-700 text-white mt-2"
            >
              <Link href={`/doctors/${doctor.specialty}/${doctor.id}`}>
                <Calendar className="h-4 w-4 mr-2" />
                عرض الملف وحجز موعد
              </Link>
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}