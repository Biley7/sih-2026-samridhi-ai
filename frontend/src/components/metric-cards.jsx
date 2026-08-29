import { Building2, Landmark, Palette, Wallet } from "lucide-react"
import { getCoverageStats } from "@/lib/schemes"

const CARDS = [
  {
    key: "central",
    label: "Central schemes",
    hint: "PMEGP, MUDRA, handloom",
    icon: Landmark,
    countKey: "central",
  },
  {
    key: "state",
    label: "State schemes",
    hint: "Top-up subsidies & cards",
    icon: Building2,
    countKey: "state",
  },
  {
    key: "artisans",
    label: "Craft & weaver",
    hint: "Clusters and looms",
    icon: Palette,
    countKey: "total",
  },
  {
    key: "credit",
    label: "Credit & subsidy",
    hint: "Working capital + margin",
    icon: Wallet,
    countKey: "total",
  },
]

export function MetricCards({ compact, activeKey, onSelect }) {
  const stats = getCoverageStats()

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
            className={`rounded-xl border p-3 text-left transition-colors ${
              active ? "border-primary bg-surface" : "border-border bg-card hover:border-primary/50"
            } ${compact ? "py-2.5" : "p-3.5"}`}
          >
            <Icon className="size-4 text-primary" aria-hidden />
            <p className="mt-2 text-lg font-bold">{stats[card.countKey]}+</p>
            <p className="text-xs font-semibold">{card.label}</p>
            {!compact && <p className="mt-0.5 text-[11px] text-muted-foreground">{card.hint}</p>}
          </button>
        )
      })}
    </div>
  )
}
