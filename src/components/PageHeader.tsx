import type { ReactNode } from "react";

export function PageHeader({
  eyebrow,
  title,
  body,
}: {
  eyebrow?: string;
  title: string;
  body?: ReactNode;
}) {
  return (
    <header className="max-w-2xl pt-4">
      {eyebrow ? (
        <p className="text-xs font-medium uppercase tracking-[0.18em] text-soft">{eyebrow}</p>
      ) : null}
      <h1 className="mt-3 text-4xl font-semibold tracking-tight text-ink sm:text-5xl">{title}</h1>
      {body ? <div className="mt-5 text-base leading-7 text-mute">{body}</div> : null}
    </header>
  );
}
