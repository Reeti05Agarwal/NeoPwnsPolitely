import type { ReactNode } from "react";
import { Icon, type IconName } from "./Icon";
import { site } from "@/lib/site";

export type CalloutType = "note" | "tip" | "warning" | "legal" | "defence";

const META: Record<CalloutType, [string, IconName]> = {
  note: ["NOTE", "info"],
  tip: ["TIP", "info"],
  warning: ["WARNING", "alert"],
  legal: ["LEGAL", "scale"],
  defence: ["DEFENCE", "shield"],
};

/** Tinted box with a word label. Never a coloured left border. */
export function Callout({ type = "note", title, children }: { type?: CalloutType; title?: string; children: ReactNode }) {
  const [label, icon] = META[type];
  return (
    <aside className={`ch-callout ch-callout--${type}`} role="note" aria-label={label.toLowerCase()}>
      <div className="ch-callout__label">
        <Icon name={icon} size={18} />
        <span>{label + (title ? ` · ${title}` : "")}</span>
      </div>
      <div className="ch-callout__body">{children}</div>
    </aside>
  );
}

/** The responsible-use line, shown above the first command on any page with offensive technique. */
export function Responsible({ children }: { children?: ReactNode }) {
  return (
    <Callout type="legal">
      <p>
        {site.responsibleUse} {children ?? "Lab targets here are intentionally vulnerable and run locally."}
      </p>
    </Callout>
  );
}
