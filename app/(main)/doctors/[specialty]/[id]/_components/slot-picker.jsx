"use client";

import { useState } from "react";
import { format } from "date-fns";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

import {
  Clock,
  ChevronRight,
} from "lucide-react";

import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";

export function SlotPicker({
  days,
  onSelectSlot,
}) {
  const [selectedSlot, setSelectedSlot] =
    useState(null);

  // أول يوم يحتوي على مواعيد
  const firstDayWithSlots =
    days.find((day) => day.slots.length > 0)
      ?.date || days[0]?.date;

  const [activeTab, setActiveTab] =
    useState(firstDayWithSlots);

  const handleSlotSelect = (slot) => {
    setSelectedSlot(slot);
  };

  const confirmSelection = () => {
    if (selectedSlot) {
      onSelectSlot(selectedSlot);
    }
  };

  return (
    <div className="space-y-6">
      <Tabs
        defaultValue={activeTab}
        onValueChange={setActiveTab}
        className="w-full"
      >
        {/* التبويبات */}
        <TabsList className="w-full justify-start overflow-x-auto bg-blue-50 border border-blue-100">
          {days.map((day) => (
            <TabsTrigger
              key={day.date}
              value={day.date}
              disabled={day.slots.length === 0}
              className={
                day.slots.length === 0
                  ? "opacity-50 cursor-not-allowed"
                  : ""
              }
            >
              <div className="flex gap-2">
                <div className="opacity-80">
                  {format(
                    new Date(day.date),
                    "MMM d"
                  )}
                </div>

                <div>
                  (
                  {format(
                    new Date(day.date),
                    "EEE"
                  )}
                  )
                </div>
              </div>

              {day.slots.length > 0 && (
                <div className="ml-2 bg-blue-100 text-blue-600 text-xs px-2 py-1 rounded">
                  {day.slots.length}
                </div>
              )}
            </TabsTrigger>
          ))}
        </TabsList>

        {/* محتوى الأيام */}
        {days.map((day) => (
          <TabsContent
            key={day.date}
            value={day.date}
            className="pt-4"
          >
            {day.slots.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                لا توجد مواعيد متاحة لهذا اليوم.
              </div>
            ) : (
              <div className="space-y-3">
                <h3 className="text-lg font-medium text-blue-700 mb-2">
                  {day.displayDate}
                </h3>

                {/* بطاقات المواعيد */}
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
                  {day.slots.map((slot) => (
                    <Card
                      key={slot.startTime}
                      className={`border-blue-200 bg-white cursor-pointer transition-all shadow-sm ${
                        selectedSlot?.startTime ===
                        slot.startTime
                          ? "bg-blue-100 border-blue-500"
                          : "hover:border-blue-400"
                      }`}
                      onClick={() =>
                        handleSlotSelect(slot)
                      }
                    >
                      <CardContent className="p-3 flex items-center">
                        <Clock
                          className={`h-4 w-4 mr-2 ${
                            selectedSlot?.startTime ===
                            slot.startTime
                              ? "text-blue-600"
                              : "text-gray-400"
                          }`}
                        />

                        <span
                          className={
                            selectedSlot?.startTime ===
                            slot.startTime
                              ? "text-blue-700 font-medium"
                              : "text-gray-600"
                          }
                        >
                          {format(
                            new Date(slot.startTime),
                            "h:mm a"
                          )}
                        </span>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )}
          </TabsContent>
        ))}
      </Tabs>

      {/* زر المتابعة */}
      <div className="flex justify-end">
        <Button
          onClick={confirmSelection}
          disabled={!selectedSlot}
          className="bg-blue-600 hover:bg-blue-700 text-white"
        >
          متابعة
          <ChevronRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}