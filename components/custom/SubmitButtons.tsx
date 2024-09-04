"use client";

import { useFormStatus } from "react-dom";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

interface iAppProps {
  text: string;
  className?: string;
  variant?:
    | "link"
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | null
    | undefined;
}

export function SubmitButton({ text, className, variant }: iAppProps) {
  const { pending } = useFormStatus();
  return (
    <>
      {pending ? (
        <Button disabled className={cn("w-fit", className)} variant={variant}>
          <Loader2 className="mr-2 size-4 animate-spin" /> Please Wait
        </Button>
      ) : (
        <Button
          variant={variant}
          className={cn("w-fit", className)}
          type="submit"
        >
          {text}
        </Button>
      )}
    </>
  );
}
