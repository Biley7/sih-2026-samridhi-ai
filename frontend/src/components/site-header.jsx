import { Languages, Search, Wifi, WifiOff } from "lucide-react"
import { Button } from "@/components/ui/button"

const LANGUAGES = [
  { code: "hi", label: "हिन्दी" },
  { code: "en", label: "English" },
  { code: "bn", label: "বাংলা" },
  { code: "ta", label: "தமிழ்" },
  { code: "te", label: "తెలుగు" },
  { code: "mr", label: "मराठी" },
]

export function SiteHeader({ language, onLanguageChange, compact, onToggleCompact, onSearchFocus }) {
  return (
    <header className="sticky top-0 z-20 border-b border-border bg-background/90 backdrop-blur">
      <div className="mx-auto flex max-w-3xl items-center gap-3 px-4 py-3 md:px-6">
        <div className="min-w-0 flex-1">
          <p className="text-xs font-medium uppercase tracking-wide text-primary">NyayaSetu AI</p>
          <h1 className="truncate text-sm font-semibold md:text-base">Scheme finder for artisans</h1>
        </div>

        <label className="relative hidden items-center sm:flex">
          <Languages className="pointer-events-none absolute left-2.5 size-3.5 text-muted-foreground" aria-hidden />
          <select
            value={language}
            onChange={(e) => onLanguageChange(e.target.value)}
            className="h-9 appearance-none rounded-lg border border-border bg-card pl-8 pr-7 text-xs font-medium"
            aria-label="Language"
          >
            {LANGUAGES.map((lang) => (
              <option key={lang.code} value={lang.code}>
                {lang.label}
              </option>
            ))}
          </select>
        </label>

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
    </header>
  )
}
