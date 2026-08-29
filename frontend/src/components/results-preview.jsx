import { Landmark } from "lucide-react"
import { getSuggestionChips } from "@/lib/schemes"

export function ResultsPreview({ loading, query, results, highlightIssuer, onChipSelect }) {
  const visible = highlightIssuer
    ? results.filter((item) => item.issuer === highlightIssuer)
    : results

  if (loading) {
    return (
      <div className="space-y-3">
        <p className="text-sm text-muted-foreground">Matching schemes for “{query}”…</p>
        {[0, 1, 2].map((i) => (
          <div key={i} className="h-24 animate-pulse rounded-xl border border-border bg-muted" />
        ))}
      </div>
    )
  }

  return (
    <div>
      <p className="text-sm text-muted-foreground">
        {visible.length} scheme{visible.length === 1 ? "" : "s"} for “{query}”
        {highlightIssuer ? ` · ${highlightIssuer}` : ""}
      </p>

      <ul className="mt-3 space-y-3">
        {visible.map((scheme) => (
          <li key={scheme.id} className="rounded-xl border border-border bg-card p-4">
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1 rounded-full bg-surface px-2 py-0.5 text-xs font-medium">
                <Landmark className="size-3" aria-hidden />
                {scheme.issuer}
              </span>
              <span className="text-xs text-muted-foreground">{scheme.category}</span>
            </div>
            <h3 className="mt-2 text-sm font-semibold md:text-base">{scheme.name}</h3>
            <p className="mt-1 text-sm text-muted-foreground">{scheme.description}</p>
            {scheme.benefit && (
              <p className="mt-2 text-xs font-medium text-primary">{scheme.benefit}</p>
            )}
          </li>
        ))}
      </ul>

      {visible.length === 0 && (
        <p className="rounded-xl border border-dashed border-border bg-surface p-4 text-sm text-muted-foreground">
          No schemes in this filter. Try another chip or clear the coverage tap.
        </p>
      )}

      <div className="mt-4 flex flex-wrap gap-2">
        {getSuggestionChips().map((chip) => (
          <button
            key={chip}
            type="button"
            onClick={() => onChipSelect(chip)}
            className="rounded-full border border-border px-3 py-1 text-xs text-muted-foreground hover:border-primary hover:text-foreground"
          >
            {chip}
          </button>
        ))}
      </div>
    </div>
  )
}
