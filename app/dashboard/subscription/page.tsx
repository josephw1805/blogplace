import { createCustomerPotal } from "@/app/actions";
import { PricingPlans } from "@/components/custom/Pricing";
import { SubmitButton } from "@/components/custom/SubmitButtons";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import prisma from "@/lib/db";
import { requireUser } from "@/lib/requireUser";

async function getData(userId: string) {
  const data = await prisma.subscription.findUnique({
    where: {
      userId,
    },
    select: {
      status: true,
      user: {
        select: {
          customerId: true,
        },
      },
    },
  });
  return data;
}

export default async function PricingPage() {
  const user = await requireUser();
  const data = await getData(user.id);

  if (data?.status === "active") {
    return (
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Edit Subscription</CardTitle>
          <CardDescription>
            Click on the button below, this will give you the opportunity to
            change your payment details and view your statement at the same
            time.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form action={createCustomerPotal}>
            <SubmitButton text="View Subscription Details"></SubmitButton>
          </form>
        </CardContent>
      </Card>
    );
  }
  return (
    <div>
      <PricingPlans />
    </div>
  );
}
