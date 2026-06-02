"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  TrendingUp,
  Calendar,
  BarChart3,
  CreditCard,
  Loader2,
  AlertCircle,
  Coins,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { requestPayout } from "@/actions/payout";
import useFetch from "@/hooks/use-fetch";
import { toast } from "sonner";

export function DoctorEarnings({ earnings, payouts = [] }) {
  const [showPayoutDialog, setShowPayoutDialog] = useState(false);
  const [paypalEmail, setPaypalEmail] = useState("");

  const {
    thisMonthEarnings = 0,
    completedAppointments = 0,
    averageEarningsPerMonth = 0,
    availableCredits = 0,
    availablePayout = 0,
  } = earnings;

  const { loading, data, fn: submitPayoutRequest } = useFetch(requestPayout);

  const pendingPayout = payouts.find(
    (payout) => payout.status === "PROCESSING"
  );

  const handlePayoutRequest = async (e) => {
    e.preventDefault();

    if (!paypalEmail) {
      toast.error("PayPal email is required");
      return;
    }

    const formData = new FormData();
    formData.append("paypalEmail", paypalEmail);

    await submitPayoutRequest(formData);
  };

  useEffect(() => {
    if (data?.success) {
      setShowPayoutDialog(false);
      setPaypalEmail("");
      toast.success("Request submitted successfully!");
    }
  }, [data]);

  const platformFee = availableCredits * 2;

  return (
    <div className="space-y-6 bg-white text-blue-900">

      {/* Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

        <Card className="border-blue-200 bg-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-blue-500">الرصيد المتاح</p>
                <p className="text-3xl font-bold text-blue-900">
                  {availableCredits}
                </p>
                <p className="text-xs text-blue-400">
                  ${availablePayout.toFixed(2)} متاح للسحب
                </p>
              </div>
              <div className="bg-blue-100 p-3 rounded-full">
                <Coins className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-blue-200 bg-white">
          <CardContent className="p-6">
            <p className="text-sm text-blue-500">هذا الشهر</p>
            <p className="text-3xl font-bold text-blue-900">
              ${thisMonthEarnings.toFixed(2)}
            </p>
          </CardContent>
        </Card>

        <Card className="border-blue-200 bg-white">
          <CardContent className="p-6">
            <p className="text-sm text-blue-500">عدد المواعيد</p>
            <p className="text-3xl font-bold text-blue-900">
              {completedAppointments}
            </p>
          </CardContent>
        </Card>

        <Card className="border-blue-200 bg-white">
          <CardContent className="p-6">
            <p className="text-sm text-blue-500">متوسط الشهري</p>
            <p className="text-3xl font-bold text-blue-900">
              ${averageEarningsPerMonth.toFixed(2)}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Payout */}
      <Card className="border-blue-200 bg-white">
        <CardHeader>
          <CardTitle className="text-blue-900 flex items-center">
            <CreditCard className="h-5 w-5 mr-2 text-blue-600" />
            إدارة السحب
          </CardTitle>
        </CardHeader>

        <CardContent className="space-y-4">

          <div className="p-4 border border-blue-100 rounded-lg bg-blue-50">
            <h3 className="text-blue-900 font-medium mb-3">
              الأموال المتاحة للسحب
            </h3>

            {pendingPayout ? (
              <Badge className="bg-yellow-100 text-yellow-700 border-yellow-300">
                قيد المعالجة
              </Badge>
            ) : (
              <Badge className="bg-blue-100 text-blue-700 border-blue-300">
                متاح
              </Badge>
            )}

            {pendingPayout ? (
              <Alert className="mt-3">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>
                  طلب السحب قيد المراجعة من الإدارة.
                </AlertDescription>
              </Alert>
            ) : (
              <p className="text-blue-700 mt-2">
                ${availablePayout.toFixed(2)} متاح للسحب الآن
              </p>
            )}

            {!pendingPayout && availableCredits > 0 && (
              <Button
                onClick={() => setShowPayoutDialog(true)}
                className="mt-4 bg-blue-600 hover:bg-blue-700 text-white"
              >
                طلب سحب الأرباح
              </Button>
            )}
          </div>

          <Alert>
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              كل رصيد = 10$، ويتم خصم رسوم منصة 2$ لكل رصيد.
            </AlertDescription>
          </Alert>

        </CardContent>
      </Card>

      {/* Dialog */}
      <Dialog open={showPayoutDialog} onOpenChange={setShowPayoutDialog}>
        <DialogContent className="bg-white text-blue-900">
          <DialogHeader>
            <DialogTitle>طلب سحب الأرباح</DialogTitle>
            <DialogDescription>
              أدخل بريد PayPal لاستلام الأموال
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handlePayoutRequest} className="space-y-4">

            <div className="space-y-2">
              <Label>بريد PayPal</Label>
              <Input
                value={paypalEmail}
                onChange={(e) => setPaypalEmail(e.target.value)}
                className="border-blue-200"
                placeholder="example@paypal.com"
              />
            </div>

            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => setShowPayoutDialog(false)}
              >
                إلغاء
              </Button>

              <Button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700"
                disabled={loading}
              >
                {loading ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  "تأكيد السحب"
                )}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

    </div>
  );
}