import type { ReactNode } from "react";

type SectionHeadingProps = {
  title: string;
  intro?: string;
  action?: ReactNode;
};

export function SectionHeading({ title, intro, action }: SectionHeadingProps) {
  return (
    <div className="mb-8 flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
      <div className="max-w-2xl">
        <h2 className="font-serif text-4xl leading-tight text-foreground md:text-5xl">
          {title}
        </h2>
        {intro ? <p className="mt-4 text-base leading-7 text-muted">{intro}</p> : null}
      </div>
      {action ? <div className="shrink-0">{action}</div> : null}
    </div>
  );
}
