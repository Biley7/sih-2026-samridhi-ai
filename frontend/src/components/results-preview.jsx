import { Landmark, CircleCheck } from "lucide-react"
import { getSuggestionChips } from "@/lib/schemes"
import { t } from "@/data/translations"

export function ResultsPreview({
  loading,
  query,
  results,
  highlightIssuer,
  coverageFilter,
  onChipSelect,
  language = "en",
}) {
  const visible = coverageFilter
    ? results
    : highlightIssuer
      ? results.filter((item) => item.issuer === highlightIssuer)
      : results

  const filterLabel =
    coverageFilter === "central" || highlightIssuer === "Central"
      ? t(language, "issuerCentral")
      : coverageFilter === "state" || highlightIssuer === "State"
        ? t(language, "issuerState")
        : coverageFilter === "artisans"
          ? t(language, "craftWeaver")
          : coverageFilter === "credit"
            ? t(language, "creditSubsidy")
            : ""

  if (loading) {
    return (
      <div className="space-y-3">
        <p className="text-sm text-muted-foreground">
          {t(language, "matchingFor")} “{query}”…
        </p>
        {[0, 1, 2].map((i) => (
          <div key={i} className="h-24 animate-pulse rounded-xl border border-border bg-muted" />
        ))}
      </div>
    )
  }

  const countLabel =
    visible.length === 1 ? t(language, "schemeSingular") : t(language, "schemesFor")

  return (
    <div>
      <p className="text-sm text-muted-foreground">
        {visible.length} {countLabel} “{query}”
        {filterLabel ? ` · ${filterLabel}` : ""}
      </p>

      <ul className="mt-3 space-y-3">
        {visible.map((scheme) => (
          <li key={scheme.id} className="rounded-xl border border-border bg-card p-4">
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1 rounded-full bg-surface px-2 py-0.5 text-xs font-medium">
                <Landmark className="size-3" aria-hidden />
                {scheme.issuer === "State" ? t(language, "issuerState") : t(language, "issuerCentral")}
              </span>
              <span className="text-xs text-muted-foreground">{scheme.category}</span>
            </div>
            <h3 className="mt-2 text-sm font-semibold md:text-base">{scheme.name}</h3>
            <p className="mt-1 text-sm text-muted-foreground">{scheme.description}</p>
            {scheme.benefit && (
              <p className="mt-2 text-xs font-medium text-primary">{scheme.benefit}</p>
            )}
            <p className="mt-3 inline-flex items-start gap-1.5 rounded-md bg-emerald-50 px-2.5 py-1.5 text-xs font-medium text-emerald-800">
              <CircleCheck className="mt-0.5 size-3.5 shrink-0 text-emerald-600" aria-hidden />
              {t(language, "whyMatched")}: {t(language, "whyMatchedDetail")}
            </p>
            <button
              type="button"
              className="mt-3 inline-flex h-9 items-center rounded-lg bg-[#0b3d6e] px-3 text-xs font-semibold text-white hover:bg-[#0a355f]"
            >
              {t(language, "applyNow")}
            </button>
          </li>
        ))}
      </ul>

      {visible.length === 0 && (
        <p className="rounded-xl border border-dashed border-border bg-surface p-4 text-sm text-muted-foreground">
          {t(language, "noSchemes")}
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
