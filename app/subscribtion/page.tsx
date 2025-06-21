import { PricingTable } from "@clerk/nextjs";
import React from "react";
import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs/server";
import { checkAndRedirect } from "@/lib/check";
const subscribtion = async () => {
  return (
    <div>
      <PricingTable />
    </div>
  );
};

export default subscribtion;
