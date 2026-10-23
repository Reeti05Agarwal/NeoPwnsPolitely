export interface ChipOption {
  value: string;
  label: string;
  count?: number;
}

/**
 * Toggle chips in a fieldset. Pass a string `value` for single choice,
 * or an array for multiple choice. The consumer owns the state.
 */
export function FilterChips({ legend, options, value, onChange }: { legend?: string; options: ChipOption[]; value: string | string[]; onChange: (value: string) => void }) {
  return (
    <fieldset className="ch-chips">
      {legend && <legend>{legend}</legend>}
      {options.map((o) => {
        const on = Array.isArray(value) ? value.includes(o.value) : value === o.value;
        return (
          <button key={o.value} type="button" className="ch-chip" aria-pressed={on} onClick={() => onChange(o.value)}>
            {o.label}
            {o.count != null && <span className="ch-chip__n">{o.count}</span>}
          </button>
        );
      })}
    </fieldset>
  );
}
