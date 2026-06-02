import {
  Calendar,
  Video,
  CreditCard,
  User,
  FileText,
  ShieldCheck,
} from "lucide-react";

// بيانات المميزات
export const features = [
  {
    icon: <User className="h-6 w-6 text-emerald-400" />,
    title: "إنشاء حسابك",
    description:
      "سجّل وأكمل ملفك الشخصي للحصول على توصيات وخدمات طبية مخصصة لك.",
  },
  {
    icon: <Calendar className="h-6 w-6 text-emerald-400" />,
    title: "حجز المواعيد",
    description:
      "تصفح ملفات الأطباء، تحقق من التوفر، واحجز موعدًا يناسب جدولك بسهولة.",
  },
  {
    icon: <Video className="h-6 w-6 text-emerald-400" />,
    title: "استشارة عبر الفيديو",
    description:
      "تواصل مع الأطباء عبر مكالمات فيديو آمنة وعالية الجودة من منزلك.",
  },
  {
    icon: <CreditCard className="h-6 w-6 text-emerald-400" />,
    title: "رصيد الاستشارات",
    description:
      "اشترِ باقات رصيد تناسب احتياجاتك الصحية بنظام بسيط ومرن.",
  },
  {
    icon: <ShieldCheck className="h-6 w-6 text-emerald-400" />,
    title: "أطباء موثوقون",
    description:
      "جميع مقدمي الرعاية الصحية تم التحقق منهم لضمان جودة الخدمة.",
  },
  {
    icon: <FileText className="h-6 w-6 text-emerald-400" />,
    title: "السجل الطبي",
    description:
      "اطّلع وادِر سجل مواعيدك وملاحظات الأطباء والتوصيات الطبية.",
  },
];

// بيانات التقييمات
export const testimonials = [
  {
    initials: "SP",
    name: "سارة منيب.",
    role: "مريضة",
    quote:
      "ميزة الاستشارة عبر الفيديو وفّرت علي الكثير من الوقت، تمكنت من الحصول على نصيحة طبية دون مغادرة المنزل.",
  },
  {
    initials: "DR",
    name: "د.سعيداني.",
    role: "طبيب قلب",
    quote:
      "هذه المنصة غيّرت طريقة عملي بالكامل، أستطيع الآن الوصول إلى المزيد من المرضى وتقديم رعاية أفضل.",
  },
  {
    initials: "JT",
    name:  "امين معدادي.",
    role: "مريض",
    quote:
      "نظام الرصيد مريح جدًا، اشتريت باقة لعائلتي واستطعنا استخدامه عند الحاجة بسهولة.",
  },
];

// فوائد نظام الرصيد
export const creditBenefits = [
  "كل استشارة تحتاج إلى <strong class='text-emerald-400'>2 رصيد</strong> بغض النظر عن المدة",
  "الرصيد <strong class='text-emerald-400'>لا ينتهي صلاحية</strong> ويمكن استخدامه في أي وقت",
  "الاشتراكات الشهرية تمنحك <strong class='text-emerald-400'>رصيد جديد كل شهر</strong>",
  "يمكنك إلغاء أو تعديل الاشتراك <strong class='text-emerald-400'>في أي وقت بدون رسوم</strong>",
];