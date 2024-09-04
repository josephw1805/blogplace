import { PricingPlans } from "@/components/custom/Pricing";
import { Features } from "@/components/frontend/Features";
import { Hero } from "@/components/frontend/Hero";
import Partners from "@/components/frontend/Partners";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";

export default async function Home() {
  const { getUser } = getKindeServerSession();
  const session = await getUser();

  if (session) {
    return redirect("/dashboard");
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-24">
      <Hero />
      <Partners />
      <Features />
      <PricingPlans />
    </div>
  );
}
