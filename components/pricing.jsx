"use client";

import React from "react";
import { Card, CardContent } from "./ui/card";

const Pricing = () => {
  return (
    <Card className="border-emerald-900/30 shadow-lg bg-gradient-to-b from-emerald-950/30 to-transparent">
      <CardContent className="p-6 md:p-8">
        <div className="grid md:grid-cols-3 gap-6">
          <div className="border rounded-xl p-6">
            <h2 className="text-2xl font-bold mb-2">Basic</h2>
            <p className="mb-4">$10 / consultation</p>
            <button className="border px-4 py-2 rounded-lg">
              Choose Plan
            </button>
          </div>

          <div className="border rounded-xl p-6">
            <h2 className="text-2xl font-bold mb-2">Standard</h2>
            <p className="mb-4">$25 / consultation</p>
            <button className="border px-4 py-2 rounded-lg">
              Choose Plan
            </button>
          </div>

          <div className="border rounded-xl p-6">
            <h2 className="text-2xl font-bold mb-2">Premium</h2>
            <p className="mb-4">$50 / consultation</p>
            <button className="border px-4 py-2 rounded-lg">
              Choose Plan
            </button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default Pricing;