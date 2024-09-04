import { Check } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { SubmitButton } from "./SubmitButtons";
import Link from "next/link";
import { CreateSubscription } from "@/app/actions";

interface iAppProps {
  id: number;
  cardTitle: string;
  cardDescription: string;
  priceTitle: string;
  benefits: string[];
}

export const Plans: iAppProps[] = [
  {
    id: 0,
    cardTitle: "Freelancer",
    cardDescription: "The best pricing plan for people starting out.",
    benefits: [
      "1 Site",
      "Up to 1000 articles",
      "Up to 1000 articles",
      "Up to 1000 articles",
    ],
    priceTitle: "Free",
  },
  {
    id: 1,
    cardTitle: "Startup",
    cardDescription: "The best pricing plan for professionals.",
    benefits: [
      "Unlimited Sites",
      "Unlimited articles",
      "Unlimited articles",
      "Unlimited articles",
    ],
    priceTitle: "$1",
  },
];

export function PricingPlans() {
  return (
    <>
      <div className="max-w-3xl mx-auto text-center">
        <p className="font-semibold text-primary">Pricing</p>
        <h1 className="mt-2 text-4xl font-bold tracking-tight sm:text-5xl">
          Pricing Plans for everyone and evey budget!
        </h1>
      </div>
      <p className="mx-auto mt-6 max-w-2xl text-center leading-tight text-muted-foreground">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Similique
        praesentium voluptatibus reiciendis mollitia voluptates corporis at.
      </p>
      <div className="grid grid-cols-1 gap-8 mt-16 lg:grid-cols-2">
        {Plans.map((item) => (
          <Card key={item.id} className={item.id === 1 ? "border-primary" : ""}>
            <CardHeader>
              <CardTitle>
                {item.id === 1 ? (
                  <div className="flex items-center justify-between">
                    <h3 className="text-primary">{item.cardTitle}</h3>
                    <Badge className="text-xs font-semibold leading-5 text-primary bg-primary/20 pointer-events-none">
                      Most popular
                    </Badge>
                  </div>
                ) : (
                  <>{item.cardTitle}</>
                )}
              </CardTitle>
              <CardDescription>{item.cardDescription}</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="mt-6 text-4xl font-bold tracking-tight">
                {item.priceTitle}
              </p>
              <ul className="mt-8 space-y-3 text-sm leading-6 text-muted-foreground">
                {item.benefits.map((benefit, index) => (
                  <li key={index} className="flex gap-x-3">
                    <Check className="text-primary size-5" />
                    {benefit}
                  </li>
                ))}
              </ul>
            </CardContent>
            <CardFooter>
              {item.id === 1 ? (
                <form className="w-full" action={CreateSubscription}>
                  <SubmitButton text="Buy Plan" className="mt-5 w-full" />
                </form>
              ) : (
                <Button variant="outline" className="mt-5 w-full" asChild>
                  <Link href="/dashboard">Try for free</Link>
                </Button>
              )}
            </CardFooter>
          </Card>
        ))}
      </div>
    </>
  );
}
