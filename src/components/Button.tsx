import Link from "next/link";
import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";
import { Icon, type IconName } from "./Icon";

interface Common {
  variant?: "primary" | "accent" | "outline" | "ghost";
  size?: "md" | "sm";
  icon?: IconName;
  /** Hides the text visually; it stays as the accessible name. */
  iconOnly?: boolean;
  className?: string;
  children: ReactNode;
}

type LinkProps = Common & { href: string; external?: boolean } & Omit<AnchorHTMLAttributes<HTMLAnchorElement>, keyof Common | "href">;
type ButtonProps = Common & { href?: undefined; external?: undefined } & Omit<ButtonHTMLAttributes<HTMLButtonElement>, keyof Common>;

const OWN_KEYS = ["variant", "size", "icon", "iconOnly", "className", "children", "href", "external"];

/** The props left for the underlying <a> or <button>. */
function htmlProps(p: object) {
  const rest: Record<string, unknown> = { ...p };
  for (const k of OWN_KEYS) delete rest[k];
  return rest;
}

export function Button(props: LinkProps | ButtonProps) {
  const { variant = "primary", size = "md", icon, iconOnly, className, children } = props;
  const cls = ["ch-btn", `ch-btn--${variant}`, size === "sm" && "ch-btn--sm", iconOnly && "ch-btn--icon", className].filter(Boolean).join(" ");
  const content = (
    <>
      {icon && <Icon name={icon} size={size === "sm" ? 16 : 20} />}
      {iconOnly ? <span className="ch-sr">{children}</span> : children}
    </>
  );

  if (props.href !== undefined) {
    const anchor = htmlProps(props) as AnchorHTMLAttributes<HTMLAnchorElement>;
    if (props.external) {
      return (
        <a href={props.href} className={cls} target="_blank" rel="noopener noreferrer" {...anchor}>
          {content}
          <span className="ch-sr"> (opens in a new tab)</span>
        </a>
      );
    }
    return (
      <Link href={props.href} className={cls} {...anchor}>
        {content}
      </Link>
    );
  }

  return (
    <button type="button" className={cls} {...(htmlProps(props) as ButtonHTMLAttributes<HTMLButtonElement>)}>
      {content}
    </button>
  );
}
