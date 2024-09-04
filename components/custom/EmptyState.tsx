import { LucideIcon } from "lucide-react";

interface iAppProps {
  title: string;
  description: string;
  Icon: LucideIcon;
}

export function EmptyState({ title, description, Icon }: iAppProps) {
  return (
    <div className="flex flex-col items-center justify-center rounded-md border border-dashed p-8 text-center animate-in fade-in-50">
      <div className="flex size-20 items-center justify-center rounded-full bg-primary/10">
        <Icon className="size-10 text-primary" />
      </div>
      <h2 className="mt-6 text-xl font-semibold">{title}</h2>
      <p className="mb-8 mt-2 text-clip text-sm leading-tight text-muted-foreground max-w-sm mx-auto">
        {description}
      </p>
    </div>
  );
}
