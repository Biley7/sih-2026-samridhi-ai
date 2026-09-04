import { Building2, Landmark, Palette, Wallet } from "lucide-react"
import { t } from "@/data/translations"

const CARDS = [
  { key: "central", count: "6+", labelKey: "centralSchemes", hintKey: "hintCentral", icon: Landmark },
  { key: "state", count: "4+", labelKey: "stateSchemes", hintKey: "hintState", icon: Building2 },
  { key: "artisans", count: "10+", labelKey: "craftWeaver", hintKey: "hintArtisans", icon: Palette },
  { key: "credit", count: "10+", labelKey: "creditSubsidy", hintKey: "hintCredit", icon: Wallet },
]

export function MetricCards({ compact, activeKey, onSelect, language = "en" }) {
  return (
    <div className={`grid gap-3 ${compact ? "grid-cols-2" : "grid-cols-2 md:grid-cols-4"}`}>
      {CARDS.map((card) => {
        const Icon = card.icon
        const active = activeKey === card.key
        return (
          <button
            key={card.key}
            type="button"
            onClick={() => onSelect(card.key)}
            aria-pressed={active}
            className={`rounded-xl border p-3 text-left transition-all ${
              active
                ? "border-[#0b3d6e] bg-sky-50 ring-2 ring-[#0b3d6e] shadow-sm"
                : "border-border bg-card hover:border-[#0b3d6e]/50"
            } ${compact ? "py-2.5" : "p-3.5"}`}
          >
            <Icon className={`size-4 ${active ? "text-[#0b3d6e]" : "text-primary"}`} aria-hidden />
            <p className="mt-2 text-lg font-bold">{card.count}</p>
            <p className="text-xs font-semibold">{t(language, card.labelKey)}</p>
            {!compact && (
              <p className="mt-0.5 text-[11px] text-muted-foreground">{t(language, card.hintKey)}</p>
            )}
          </button>
        )
      })}
    </div>
  )
}
