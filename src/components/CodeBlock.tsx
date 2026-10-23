"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { Button } from "./Button";

/** A string line: "$ cmd" (user), "# cmd" (root) or anything else (output). */
export type CodeLine = string | { prompt: "$" | "#"; cmd: string; danger?: boolean } | { out: string };

type Norm = { prompt: "$" | "#"; cmd: string; danger?: boolean; out?: undefined } | { out: string; prompt?: undefined };

function norm(line: CodeLine): Norm {
  if (typeof line !== "string") return line as Norm;
  const m = /^([$#]) (.*)$/.exec(line);
  return m ? { prompt: m[1] as "$" | "#", cmd: m[2] } : { out: line };
}

/** Light shell highlighting with the syn-* colours: flags, strings, paths, <PLACEHOLDERS>, comments. */
function highlight(cmd: string): ReactNode[] {
  const parts = cmd.split(/(\s+|"[^"]*"|'[^']*'|<[A-Z_]+>|\s#.*$)/g).filter((s) => s !== "");
  return parts.map((s, i) => {
    if (/^\s#/.test(s)) return <span key={i} className="ch-syn-cm">{s}</span>;
    if (/^<[A-Z_]+>$/.test(s)) return <span key={i} className="ch-syn-ph">{s}</span>;
    if (/^["']/.test(s)) return <span key={i} className="ch-syn-str">{s}</span>;
    if (/^--?[A-Za-z]/.test(s)) return <span key={i} className="ch-syn-kw">{s}</span>;
    if (i > 0 && /^[\w.-]*[/:][^\s]*$/.test(s)) return <span key={i} className="ch-syn-str">{s}</span>;
    return s;
  });
}

/**
 * Terminal block. Label it with the shell and the host it runs on ("bash", "attacker").
 * The prompt is not selectable and the Copy button copies commands only, never output.
 */
export function CodeBlock({ lang, host, lines = [] }: { lang?: string; host?: string; lines?: CodeLine[] }) {
  const rows = lines.map(norm);
  const [copied, setCopied] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  useEffect(() => () => clearTimeout(timer.current), []);

  const commands = rows.flatMap((l) => (l.prompt ? [l.cmd] : [])).join("\n");
  const label = [lang, host].filter(Boolean).join(" · ");

  async function copy() {
    try {
      await navigator.clipboard.writeText(commands);
      setCopied(true);
      clearTimeout(timer.current);
      timer.current = setTimeout(() => setCopied(false), 1600);
    } catch {
      // Clipboard can be blocked; the text stays selectable.
    }
  }

  return (
    <figure className="ch-code">
      <figcaption className="ch-code__bar">
        <span>{label}</span>
        {commands && (
          <Button variant="ghost" size="sm" icon={copied ? "check" : "copy"} onClick={copy} aria-label={copied ? "Copied" : `Copy commands${label ? ` (${label})` : ""}`} className="min-h-11">
            {copied ? "Copied" : "Copy"}
          </Button>
        )}
      </figcaption>
      {/* Scrolls sideways, so it must be reachable by keyboard. */}
      {/* eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex */}
      <pre tabIndex={0} role="region" aria-label={label ? `Code: ${label}` : "Code"}>
        <code>
          {rows.map((l, i) =>
            l.prompt ? (
              <span key={i} className={`ch-code__line${l.danger ? " ch-code__danger" : ""}`}>
                <span className="ch-code__prompt" aria-hidden="true">
                  {l.prompt}{" "}
                </span>
                {l.danger ? l.cmd : highlight(l.cmd)}
              </span>
            ) : (
              <span key={i} className="ch-code__line ch-code__out">
                {l.out || " "}
              </span>
            ),
          )}
        </code>
      </pre>
      <span className="ch-sr" role="status">
        {copied ? "Commands copied" : ""}
      </span>
    </figure>
  );
}
