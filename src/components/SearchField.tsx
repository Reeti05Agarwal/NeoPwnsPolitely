import { Icon } from "./Icon";

/** Labelled search input. The consumer owns the value. */
export function SearchField({ id = "search", label = "Search", placeholder, value, onChange, autoFocus }: { id?: string; label?: string; placeholder?: string; value: string; onChange: (value: string) => void; autoFocus?: boolean }) {
  return (
    <div className="ch-field">
      <label htmlFor={id}>{label}</label>
      <div className="ch-input">
        <Icon name="search" size={18} />
        {/* eslint-disable-next-line jsx-a11y/no-autofocus -- only on the dedicated search page, where typing is the whole task */}
        <input id={id} type="search" value={value} placeholder={placeholder} autoFocus={autoFocus} onChange={(e) => onChange(e.target.value)} />
      </div>
    </div>
  );
}
