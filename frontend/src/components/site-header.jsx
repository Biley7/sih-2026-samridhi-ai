import { Search, Wifi, WifiOff } from "lucide-react"
import { Button } from "@/components/ui/button"
import { LANGUAGES } from "@/lib/languages"

export function SiteHeader({ language, onLanguageChange, compact, onToggleCompact, onSearchFocus }) {
  return (
    <header className="sticky top-0 z-20 shadow-sm">
      <div className="flex h-1.5">
        <span className="flex-1 bg-[#FF9933]" />
        <span className="flex-1 bg-white" />
        <span className="flex-1 bg-[#138808]" />
      </div>

      <div className="border-b border-slate-300/80 bg-gradient-to-b from-[#f3f6f9] to-[#d9e2ea]">
        <div className="mx-auto flex max-w-5xl items-center justify-between gap-4 px-4 py-3 md:px-6">
          <div className="flex min-w-0 items-center gap-3 md:gap-5">
            <img
              src="/emblem.png"
              alt="Emblem of India"
              className="h-16 w-auto shrink-0 object-contain object-left md:h-20"
            />
            <div className="min-w-0 text-left font-['Roboto',system-ui,sans-serif] uppercase leading-tight text-[#4a4a4a]">
              <p className="text-[10px] font-medium tracking-[0.16em] md:text-xs">Ministry of</p>
              <p className="text-lg font-bold tracking-[0.04em] md:text-2xl">Social Justice and</p>
              <p className="text-lg font-bold tracking-[0.04em] md:text-2xl">Empowerment</p>
              <p className="mt-1 text-[10px] font-medium tracking-[0.16em] md:text-xs">
                Government of India
              </p>
            </div>
          </div>

          <label className="relative shrink-0 self-start sm:self-center">
            <span className="sr-only">Language</span>
            <select
              value={language}
              onChange={(e) => onLanguageChange(e.target.value)}
              className="h-8 max-w-[9.5rem] rounded border border-slate-300 bg-white/90 px-2 text-[11px] font-medium text-slate-700 md:h-9 md:text-xs"
              aria-label="Language"
            >
              {LANGUAGES.map((lang) => (
                <option key={lang.code} value={lang.code}>
                  {lang.label}
                </option>
              ))}
            </select>
          </label>
        </div>
      </div>

      <div className="border-b border-border bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-5xl items-center gap-3 px-4 py-3 md:px-6">
          <div className="min-w-0 flex-1">
            <p className="text-lg font-extrabold tracking-[0.18em] text-[#0b3d6e] md:text-xl">
              NYAYASETU
            </p>
            <p className="text-[11px] leading-snug text-muted-foreground md:text-xs">
              National Scheme Matching Portal for Marginalized Entrepreneurs
            </p>
          </div>

          <Button variant="outline" size="icon" onClick={onSearchFocus} aria-label="Search by text">
            <Search className="size-4" />
          </Button>

          <Button
            variant={compact ? "default" : "outline"}
            size="sm"
            onClick={onToggleCompact}
            aria-pressed={compact}
          >
            {compact ? <WifiOff className="size-3.5" /> : <Wifi className="size-3.5" />}
            <span className="hidden sm:inline">{compact ? "Low data" : "Full"}</span>
          </Button>
        </div>
      </div>
    </header>
  )
}
