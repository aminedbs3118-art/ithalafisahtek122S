import React from "react";
import Link from "next/link";
import Image from "next/image";

import {
  Calendar,
  CreditCard,
  ShieldCheck,
  Stethoscope,
  User,
} from "lucide-react";

import { Button } from "./ui/button";
import { Badge } from "./ui/badge";

import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
} from "@clerk/nextjs";

import { checkUser } from "@/lib/checkUser";
import { checkAndAllocateCredits } from "@/actions/credits";

export default async function Header() {
  const user = await checkUser();

  if (user?.role === "PATIENT") {
    await checkAndAllocateCredits(user);
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-blue-100 bg-white/90 backdrop-blur-xl shadow-sm">
      <nav className="container mx-auto px-4 h-20 flex items-center justify-between">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-3 group"
        >
          <div className="relative overflow-hidden rounded-xl">
    <Image
  src="/1.png"
  alt="Medimeet Logo"
  width={180}
  height={100}
  className="h-12 w-auto object-contain drop-shadow-sm"
/>
          </div>
        </Link>

        {/* Right Side */}
        <div className="flex items-center gap-3">
          <SignedIn>
            {/* Admin */}
            {user?.role === "ADMIN" && (
              <Link href="/admin">
                <Button
                  variant="outline"
                  className="hidden md:flex items-center gap-2 border-blue-200 text-blue-700 hover:bg-blue-50 hover:border-blue-300 rounded-xl"
                >
                  <ShieldCheck className="h-4 w-4" />
                  لوحة التحكم
                </Button>

                <Button className="md:hidden bg-blue-100 text-blue-700 hover:bg-blue-200 rounded-xl w-10 h-10 p-0">
                  <ShieldCheck className="h-4 w-4" />
                </Button>
              </Link>
            )}

            {/* Doctor */}
            {user?.role === "DOCTOR" && (
              <Link href="/doctor">
                <Button
                  variant="outline"
                  className="hidden md:flex items-center gap-2 border-blue-200 text-blue-700 hover:bg-blue-50 hover:border-blue-300 rounded-xl"
                >
                  <Stethoscope className="h-4 w-4" />
                  لوحة الطبيب
                </Button>

                <Button className="md:hidden bg-blue-100 text-blue-700 hover:bg-blue-200 rounded-xl w-10 h-10 p-0">
                  <Stethoscope className="h-4 w-4" />
                </Button>
              </Link>
            )}

            {/* Patient */}
            {user?.role === "PATIENT" && (
              <Link href="/appointments">
                <Button
                  variant="outline"
                  className="hidden md:flex items-center gap-2 border-blue-200 text-blue-700 hover:bg-blue-50 hover:border-blue-300 rounded-xl"
                >
                  <Calendar className="h-4 w-4" />
                  مواعيدي
                </Button>

                <Button className="md:hidden bg-blue-100 text-blue-700 hover:bg-blue-200 rounded-xl w-10 h-10 p-0">
                  <Calendar className="h-4 w-4" />
                </Button>
              </Link>
            )}

            {/* Unassigned */}
            {user?.role === "UNASSIGNED" && (
              <Link href="/onboarding">
                <Button
                  variant="outline"
                  className="hidden md:flex items-center gap-2 border-blue-200 text-blue-700 hover:bg-blue-50 hover:border-blue-300 rounded-xl"
                >
                  <User className="h-4 w-4" />
                  إكمال الملف الشخصي
                </Button>

                <Button className="md:hidden bg-blue-100 text-blue-700 hover:bg-blue-200 rounded-xl w-10 h-10 p-0">
                  <User className="h-4 w-4" />
                </Button>
              </Link>
            )}
          </SignedIn>

          {/* Credits */}
          {(!user || user?.role !== "ADMIN") && (
            <Link
              href={
                user?.role === "PATIENT"
                  ? "/pricing"
                  : "/doctor"
              }
            >
              <Badge
                variant="outline"
                className="h-10 px-4 flex items-center gap-2 rounded-xl border-blue-200 bg-blue-50 hover:bg-blue-100 transition-colors"
              >
                <CreditCard className="h-4 w-4 text-blue-600" />

                <span className="text-blue-700 font-medium">
                  {user &&
                  user.role !== "ADMIN" ? (
                    <>
                      {user.credits}

                      <span className="hidden md:inline ml-1">
                        {user?.role ===
                        "PATIENT"
                          ? "رصيد"
                          : "الأرباح"}
                      </span>
                    </>
                  ) : (
                    "الأسعار"
                  )}
                </span>
              </Badge>
            </Link>
          )}

          {/* Sign In */}
          <SignedOut>
            <SignInButton>
              <Button className="bg-blue-600 hover:bg-blue-700 text-white rounded-xl px-5 shadow-md">
                تسجيل الدخول
              </Button>
            </SignInButton>
          </SignedOut>

          {/* User Button */}
          <SignedIn>
            <div className="rounded-full ring-2 ring-blue-100 hover:ring-blue-300 transition-all">
              <UserButton
                appearance={{
                  elements: {
                    avatarBox:
                      "w-10 h-10",
                    userButtonPopoverCard:
                      "shadow-2xl border border-blue-100",
                    userPreviewMainIdentifier:
                      "font-semibold text-blue-700",
                  },
                }}
                afterSignOutUrl="/"
              />
            </div>
          </SignedIn>
        </div>
      </nav>
    </header>
  );
}