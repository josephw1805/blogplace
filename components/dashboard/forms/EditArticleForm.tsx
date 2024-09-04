"use client";

import { EditPostActions } from "@/app/actions";
import TailwindEditor from "@/components/dashboard/EditorWrapper";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { UploadDropzone } from "@/lib/uploadthing";
import { PostSchema } from "@/lib/zodSchema";
import { useForm } from "@conform-to/react";
import { parseWithZod } from "@conform-to/zod";
import { Atom } from "lucide-react";
import Image from "next/image";
import { JSONContent } from "novel";
import { useActionState, useState } from "react";
import { toast } from "sonner";
import slugify from "react-slugify";
import { SubmitButton } from "@/components/custom/SubmitButtons";

interface iAppProps {
  data: {
    title: string;
    slug: string;
    smallDescription: string;
    articleContent: any;
    id: string;
    image: string;
  };
  siteId: string;
}

export function EditArticleForm({ data, siteId }: iAppProps) {
  const [imageUrl, setImageUrl] = useState<string | undefined>(data.image);
  const [value, setValue] = useState<JSONContent | undefined>(
    data.articleContent
  );
  const [title, setTitle] = useState<string | undefined>(data.title);
  const [slug, setSlugValue] = useState<string | undefined>(data.slug);
  const [lastResult, action] = useActionState(EditPostActions, undefined);
  const [form, fields] = useForm({
    lastResult,
    onValidate({ formData }) {
      return parseWithZod(formData, { schema: PostSchema });
    },
    shouldValidate: "onBlur",
    shouldRevalidate: "onInput",
  });

  function handleSlugGeneration() {
    const titleInput = title;

    if (titleInput?.length === 0 || titleInput === undefined) {
      return toast.error("Please create a title first");
    }

    setSlugValue(slugify(title));
    return toast.success("Slug has been created");
  }

  return (
    <Card className="mt-6">
      <CardHeader>
        <CardTitle>Article Details</CardTitle>
        <CardDescription>Create the article here</CardDescription>
      </CardHeader>
      <CardContent>
        <form
          className="flex flex-col gap-6"
          id={form.id}
          onSubmit={form.onSubmit}
          action={action}
        >
          <input hidden readOnly name="articleId" value={data.id} />
          <input hidden readOnly name="siteId" value={siteId} />
          <div className="grid gap-2">
            <Label>Title</Label>
            <Input
              placeholder="Nextjs blogging application"
              key={fields.title.key}
              name={fields.title.name}
              defaultValue={fields.title.initialValue}
              onChange={(e) => setTitle(e.target.value)}
              value={title}
            />
            <p className="text-red-500 text-sm">{fields.title.errors}</p>
          </div>
          <div className="grid gap-2">
            <Label>Slug</Label>
            <Input
              placeholder="Article Slug"
              key={fields.slug.key}
              name={fields.slug.name}
              defaultValue={fields.slug.initialValue}
              onChange={(e) => setSlugValue(e.target.value)}
              value={slug}
            />
            <Button
              className="w-fit"
              variant="secondary"
              type="button"
              onClick={handleSlugGeneration}
            >
              <Atom className="size-4 mr-2" /> Generate Slug
            </Button>
            <p className="text-red-500 text-sm">{fields.slug.errors}</p>
          </div>
          <div className="grid gap-2">
            <Label>Small Description</Label>
            <Textarea
              placeholder="Small Description for your blog article..."
              className="h-32"
              key={fields.smallDescription.key}
              name={fields.smallDescription.name}
              defaultValue={data.smallDescription}
            />
            <p className="text-red-500 text-sm">
              {fields.smallDescription.errors}
            </p>
          </div>
          <div className="grid gap-2">
            <Label>Cover Image</Label>
            <input
              hidden
              readOnly
              name={fields.coverImage.name}
              key={fields.coverImage.key}
              defaultValue={fields.coverImage.initialValue}
              value={imageUrl}
            />
            {imageUrl ? (
              <Image
                src={imageUrl}
                alt="Uploaded Image"
                width={200}
                height={200}
                className="object-cover w-[200px] h-[200px] rounded-lg"
              />
            ) : (
              <UploadDropzone
                endpoint="imageUploader"
                onClientUploadComplete={(res) => {
                  setImageUrl(res[0].url);
                  toast.success("Image has been uploaded");
                }}
                onUploadError={() => {
                  toast.error("something went wrong...");
                }}
              />
            )}
            <p className="text-red-500 text-sm">{fields.coverImage.errors}</p>
          </div>
          <div className="grid gap-2">
            <Label>Article Content</Label>
            <input
              hidden
              readOnly
              name={fields.articleContent.name}
              key={fields.articleContent.key}
              defaultValue={fields.articleContent.initialValue}
              value={JSON.stringify(value)}
            />
            <TailwindEditor onChange={setValue} initialValue={value} />
            <p className="text-red-500 text-sm">
              {fields.articleContent.errors}
            </p>
          </div>
          <SubmitButton text="Update Article" />
        </form>
      </CardContent>
    </Card>
  );
}
