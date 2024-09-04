"use client";

import { UpdateImage } from "@/app/actions";
import { SubmitButton } from "@/components/custom/SubmitButtons";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { UploadDropzone } from "@/lib/uploadthing";
import Image from "next/image";
import { useState } from "react";
import { toast } from "sonner";

export function UploadImageForm({ siteId }: { siteId: string }) {
  const [imageUrl, setImageUrl] = useState<string | undefined>(undefined);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Image</CardTitle>
        <CardDescription>
          This is the image of your site. You can change it here
        </CardDescription>
      </CardHeader>
      <CardContent>
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt="uploaded image"
            width={200}
            height={200}
            className="size-[200px] object-cover rounded-lg"
          />
        ) : (
          <UploadDropzone
            endpoint="imageUploader"
            onClientUploadComplete={(res) => {
              setImageUrl(res[0].url);
              toast.success("Image has been uploaded");
            }}
            onUploadError={() => {
              toast.error("Something went wrong.");
            }}
          />
        )}
      </CardContent>
      <CardFooter>
        <form action={UpdateImage}>
          <input hidden readOnly name="siteId" value={siteId} />
          <input hidden readOnly name="imageUrl" value={imageUrl} />
          <SubmitButton text="Change Image" />
        </form>
      </CardFooter>
    </Card>
  );
}
