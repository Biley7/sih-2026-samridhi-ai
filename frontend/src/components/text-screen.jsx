import { useEffect, useState } from "react"
import { Mic, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { getSuggestionChips } from "@/lib/schemes"
import { LANGUAGES } from "@/lib/languages"
import { t } from "@/data/translations"

export function TextScreen({ language, seed, onSearch, onSwitchToVoice, isListening, onStartListening, speechError, speechSupported = true }) {
  const [query, setQuery] = useState(seed || "")
  const [voiceRecognized, setVoiceRecognized] = useState(false)

  useEffect(() => {
    if (seed) setQuery(seed)
  }, [seed])

  function handleSubmit(e) {
    e.preventDefault()
    const q = query.trim()
    if (q) onSearch(q)
  }

  function startVoiceSearch() {
    setVoiceRecognized(false)
    onStartListening?.(language, (transcript) => {
      setQuery(transcript)
      setVoiceRecognized(true)
    })
  }

  const languageLabel = LANGUAGES.find((item) => item.code === language)?.label || language

  return (
    <section className="rounded-xl border border-border bg-card p-5 md:p-6">
      <form onSubmit={handleSubmit}>
        <label htmlFor="scheme-query" className="text-sm font-medium">
          {t(language, "describeNeed")}
        </label>
        <textarea
          id="scheme-query"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          rows={3}
          placeholder={t(language, "textPlaceholder")}
          className="mt-2 w-full resize-none rounded-lg border border-border bg-background px-3 py-2.5 text-sm outline-none ring-ring focus:ring-2"
        />
        <p
          role="status"
          className={`mt-2 rounded-full px-3 py-1.5 text-center text-xs font-medium ${isListening ? "animate-pulse bg-red-100 text-red-700" : voiceRecognized && query.trim() ? "bg-emerald-100 text-emerald-700" : "hidden"}`}
        >
          {isListening ? `🎙️ Listening in ${languageLabel}... Speak now` : `✓ Recognized: '${query.trim()}'`}
        </p>
        <div className="mt-2 flex justify-end">
          <button
            type="button"
            onClick={startVoiceSearch}
            disabled={!speechSupported}
            className={`inline-flex items-center gap-1.5 rounded-full border border-border px-3 py-1.5 text-xs font-medium text-primary transition-colors hover:bg-surface ${isListening ? "animate-pulse border-red-600 bg-red-600 text-white" : ""} ${!speechSupported ? "cursor-not-allowed opacity-50" : ""}`}
            aria-label={isListening ? t(language, "listening") : t(language, "useVoice")}
            title={speechSupported ? t(language, "useVoice") : "Voice input needs Chrome or Edge"}
          >
            <Mic className="size-4" />
            {isListening ? t(language, "listening") : t(language, "useVoice")}
          </button>
        </div>
        {speechError && (
          <p role="alert" className="mt-2 rounded-full bg-red-100 px-3 py-1.5 text-center text-xs font-medium text-red-700">
            ⚠️ {speechError}
          </p>
        )}
        <div className="mt-3 flex flex-col gap-2 sm:flex-row sm:items-start">
          <Button type="submit" className="flex-1" disabled={!query.trim()}>
            <Search className="size-4" />
            {t(language, "searchSchemes")}
          </Button>
          <div className="flex flex-1 flex-col items-center">
            <div className="relative w-full">
              <span className="pointer-events-none absolute inset-0 rounded-lg bg-primary/20 animate-pulse-ring" />
              <Button
                type="button"
                variant="outline"
                className="relative z-10 w-full border-primary text-primary"
                onClick={onSwitchToVoice}
              >
                <Mic className="size-4" />
                {t(language, "useVoice")}
              </Button>
            </div>
            <p className="mt-1.5 text-center text-[11px] leading-snug text-muted-foreground">
              {t(language, "voiceCaption")}
            </p>
          </div>
        </div>
      </form>

      <div className="mt-4 flex flex-wrap gap-2">
        {getSuggestionChips().map((chip) => (
          <button
            key={chip}
            type="button"
            onClick={() => {
              setQuery(chip)
              onSearch(chip)
            }}
            className="rounded-full border border-border px-3 py-1 text-xs text-muted-foreground hover:border-primary hover:text-foreground"
          >
            {chip}
          </button>
        ))}
      </div>
    </section>
  )
}
