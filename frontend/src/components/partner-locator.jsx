import { Building2, MapPin, Navigation } from "lucide-react"
import { t } from "@/data/translations"

const PARTNERS = [
  {
    id: 1,
    name: "West Bengal Scheduled Castes Development Corporation",
    type: "SCA",
    district: "Kolkata",
    state: "West Bengal",
    km: 1.2,
    activeFundStatus: true,
    npaRating: "LOW",
  },
  {
    id: 2,
    name: "Punjab National Bank — Central Branch",
    type: "PSB",
    district: "Kolkata",
    state: "West Bengal",
    km: 1.8,
    activeFundStatus: true,
    npaRating: "LOW",
  },
  {
    id: 3,
    name: "State Bank of India — Regional Micro Finance",
    type: "PSB",
    district: "Kolkata",
    state: "West Bengal",
    km: 2.4,
    activeFundStatus: true,
    npaRating: "LOW",
  },
  {
    id: 4,
    name: "Bangiya Gramin Vikash Bank",
    type: "RRB",
    district: "North 24 Parganas",
    state: "West Bengal",
    km: 8.6,
    activeFundStatus: true,
    npaRating: "MEDIUM",
  },
]

export function PartnerLocator({ language = "en" }) {
  return (
    <section className="pt-6">
      <h2 className="text-xl font-bold text-[#0b3d6e]">{t(language, "partnersTitle")}</h2>
      <p className="mt-1 text-sm text-muted-foreground">{t(language, "partnersSubtitle")}</p>

      <div className="mt-4 overflow-hidden rounded-xl border border-border bg-white">
        <div className="relative h-40 bg-gradient-to-br from-sky-100 via-slate-100 to-emerald-50">
          <div className="absolute inset-0 opacity-40 [background-image:linear-gradient(#94a3b8_1px,transparent_1px),linear-gradient(90deg,#94a3b8_1px,transparent_1px)] [background-size:24px_24px]" />
          <div className="absolute left-[38%] top-[42%] flex flex-col items-center">
            <MapPin className="size-8 text-primary drop-shadow" />
            <span className="rounded bg-white/90 px-1.5 text-[10px] font-semibold">{t(language, "you")}</span>
          </div>
          <div className="absolute left-[52%] top-[28%]">
            <MapPin className="size-5 text-[#0b3d6e]" />
          </div>
          <div className="absolute left-[28%] top-[58%]">
            <MapPin className="size-5 text-[#0b3d6e]" />
          </div>
          <p className="absolute bottom-2 left-3 rounded bg-white/90 px-2 py-1 text-[11px] font-medium text-slate-600">
            Kolkata · 15 km radius
          </p>
        </div>

        <ul className="divide-y divide-border">
          {PARTNERS.map((p) => (
            <li key={p.id} className="flex items-start gap-3 p-4">
              <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-surface text-[#0b3d6e]">
                <Building2 className="size-4" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-semibold">{p.name}</p>
                <p className="mt-0.5 text-xs text-muted-foreground">
                  {p.type} · {p.district}, {p.state}
                </p>
                <div className="mt-2 flex flex-wrap gap-1.5">
                  <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[11px]">{p.km} km</span>
                  <span
                    className={`rounded-full px-2 py-0.5 text-[11px] ${
                      p.activeFundStatus ? "bg-emerald-50 text-emerald-800" : "bg-rose-50 text-rose-800"
                    }`}
                  >
                    {p.activeFundStatus ? t(language, "fundsActive") : t(language, "fundsPaused")}
                  </span>
                  <span className="rounded-full bg-sky-50 px-2 py-0.5 text-[11px] text-sky-800">
                    NPA {p.npaRating}
                  </span>
                </div>
              </div>
              <button
                type="button"
                className="inline-flex items-center gap-1 rounded-lg border border-border px-2 py-1 text-[11px] font-medium hover:border-primary"
              >
                <Navigation className="size-3" />
                {t(language, "route")}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
