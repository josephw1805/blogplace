import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import prisma from "@/lib/db";
import { Globe, PlusCircle } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import DefaultImage from "@/public/default.png";
import { requireUser } from "@/lib/requireUser";
import { EmptyState } from "@/components/custom/EmptyState";

async function getData(userId: string) {
  const data = await prisma.site.findMany({
    where: { userId },
    orderBy: {
      createdAt: "desc",
    },
  });
  return data;
}

export default async function SitesRoute() {
  const user = await requireUser();
  const data = await getData(user.id);

  return (
    <>
      <div className="flex w-full justify-end">
        <Button asChild>
          <Link href="/dashboard/sites/new">
            <PlusCircle className="mr-2 size-4" />
            Create Site
          </Link>
        </Button>
      </div>
      {data === undefined || data.length === 0 ? (
        <EmptyState
          title="You don't have any Sites created"
          description="You currently don't have any articles. Please create some so that
            you can see them right here!"
          Icon={Globe}
        />
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-7">
          {data.map((item) => (
            <Card key={item.id}>
              <Image
                src={item.imageUrl ?? DefaultImage}
                alt={item.name}
                className="rounded-t-lg object-cover w-full h-[200px]"
                width={400}
                height={200}
              />
              <CardHeader>
                <CardTitle className="truncate">{item.name}</CardTitle>
                <CardDescription className="line-clamp-2">
                  {item.description}
                </CardDescription>
              </CardHeader>
              <CardFooter>
                <Button asChild className="w-full">
                  <Link href={`/dashboard/sites/${item.id}`}>
                    View Articles
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </>
  );
}
