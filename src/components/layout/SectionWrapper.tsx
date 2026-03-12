import { cn } from "@/lib/utils";

interface SectionWrapperProps {
  id: string;
  children: React.ReactNode;
  className?: string;
  alternate?: boolean;
}

export function SectionWrapper({
  id,
  children,
  className,
  alternate,
}: SectionWrapperProps) {
  return (
    <section
      id={id}
      className={cn(
        "px-4 py-16 md:py-24",
        alternate ? "bg-secondary" : "bg-background",
        className
      )}
    >
      <div className="mx-auto max-w-6xl">{children}</div>
    </section>
  );
}
