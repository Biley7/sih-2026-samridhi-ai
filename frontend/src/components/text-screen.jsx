import { useEffect, useState } from "react"
import { Mic, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { getSuggestionChips } from "@/lib/schemes"

export function TextScreen({ language, seed, onSearch, onSwitchToVoice }) {
  const [query, setQuery] = useState(seed || "")

  useEffect(() => {
    if (seed) setQuery(seed)
  }, [seed])

  function handleSubmit(e) {
    e.preventDefault()
    const q = query.trim()
    if (q) onSearch(q)
  }

  return (
    <section className="rounded-xl border border-border bg-card p-5 md:p-6">
      <form onSubmit={handleSubmit}>
        <label htmlFor="scheme-query" className="text-sm font-medium">
          Describe your craft or need
        </label>
        <textarea
          id="scheme-query"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          rows={3}
          placeholder={
            language === "hi"
              ? "उदाहरण: हैंडलूम, कच्ची सामग्री, या मुद्रा लोन"
              : "e.g. handloom weaver looking for working capital"
          }
          className="mt-2 w-full resize-none rounded-lg border border-border bg-background px-3 py-2.5 text-sm outline-none ring-ring focus:ring-2"
        />
        <div className="mt-3 flex flex-col gap-2 sm:flex-row sm:items-start">
          <Button type="submit" className="flex-1" disabled={!query.trim()}>
            <Search className="size-4" />
            Search schemes
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
                Use Voice
              </Button>
            </div>
            <p className="mt-1.5 text-center text-[11px] leading-snug text-muted-foreground">
              Speak in your native language (Hindi, Tamil, Bengali, Telugu)
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
