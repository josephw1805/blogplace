import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { X } from "lucide-react";
import Link from "next/link";

export default function CancelledRoute() {
  return (
    <div className="w-full flex flex-1 justify-center items-center">
      <Card className="w-[350px]">
        <div className="p-6">
          <div className="w-full flex justify-center">
            <X className="size-12 p-2 rounded-full bg-red-500/10 text-red-500" />
          </div>
          <div className="mt-3 text-center sm:mt-5 w-full">
            <h2 className="text-xl font-semibold">Payment Cancelled</h2>
            <p className="text-sm mt-2 text-muted-foreground tracking-tight">
              You are not charged. Plase try again
            </p>
            <Button className="w-full mt-5" asChild>
              <Link href="/dashboard">Go back to Dashboard</Link>
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}
