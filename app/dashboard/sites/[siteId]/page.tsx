import { columns } from "@/components/dashboard/columns";
import { DataTable } from "@/components/custom/dataTable";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import prisma from "@/lib/db";
import { requireUser } from "@/lib/requireUser";
import { Book, Newspaper, PlusCircle, Settings } from "lucide-react";
import Link from "next/link";
import { EmptyState } from "@/components/custom/EmptyState";

async function getData(userId: string, siteId: string) {
  const data = await prisma.site.findUnique({
    where: {
      id: siteId,
      userId: userId,
    },
    select: {
      subdirectory: true,
      posts: {
        select: {
          image: true,
          title: true,
          createdAt: true,
          siteId: true,
          id: true,
        },
        orderBy: {
          createdAt: "desc",
        },
      },
    },
  });
  return data;
}

export default async function SiteIdRoute({
  params,
}: {
  params: { siteId: string };
}) {
  const user = await requireUser();
  const data = await getData(user.id, params.siteId);

  return (
    <>
      <div className="flex flex-col md:flex-row justify-end gap-4">
        <Button asChild className="w-fit" variant="secondary">
          <Link href={`/blog/${data?.subdirectory}`}>
            <Book className="size-4 mr-2" />
            View Blog
          </Link>
        </Button>
        <Button asChild className="w-fit" variant="secondary">
          <Link href={`/dashboard/sites/${params.siteId}/settings`}>
            <Settings className="size-4 mr-2" />
            Settings
          </Link>
        </Button>
        <Button asChild className="w-fit">
          <Link href={`/dashboard/sites/${params.siteId}/create`}>
            <PlusCircle className="size-4 mr-2" />
            Create Article
          </Link>
        </Button>
      </div>
      {data?.posts === undefined || data.posts.length === 0 ? (
        <EmptyState
          title="You don't have any articles created"
          description="You currently don't have any articles. Please create some so that
            you can see them right here!"
          Icon={Newspaper}
        />
      ) : (
        <Card>
          <CardHeader>
            <CardTitle>Articles</CardTitle>
            <CardDescription>Manage your Articles</CardDescription>
          </CardHeader>
          <CardContent>
            <DataTable
              columns={columns}
              data={data.posts}
              searchKey={"title"}
            />
          </CardContent>
        </Card>
      )}
    </>
  );
}
