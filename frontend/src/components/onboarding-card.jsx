import { useState } from "react"
import { Keyboard, Mic } from "lucide-react"
import { Button } from "@/components/ui/button"

const LANGUAGES = [
  { code: "hi", label: "हिन्दी" },
  { code: "en", label: "English" },
  { code: "bn", label: "বাংলা" },
  { code: "ta", label: "தமிழ்" },
  { code: "te", label: "తెలుగు" },
  { code: "mr", label: "मराठी" },
]

export function OnboardingCard({ onComplete }) {
  const [language, setLanguage] = useState("hi")
  const [defaultInput, setDefaultInput] = useState("voice")

  function handleSubmit(e) {
    e.preventDefault()
    onComplete({ language, defaultInput, lastSearch: "" })
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/40 p-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md rounded-xl border border-border bg-card p-6 shadow-lg"
      >
        <p className="text-xs font-semibold uppercase tracking-wide text-primary">Welcome</p>
        <h2 className="mt-1 text-xl font-bold">Set up NyayaSetu in one step</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          Choose a language and how you prefer to ask for schemes. You can change this later.
        </p>

        <label className="mt-5 block text-sm font-medium">
          Language
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="mt-1.5 h-11 w-full rounded-lg border border-border bg-background px-3 text-sm"
          >
            {LANGUAGES.map((lang) => (
              <option key={lang.code} value={lang.code}>
                {lang.label}
              </option>
            ))}
          </select>
        </label>

        <p className="mt-4 text-sm font-medium">Default input</p>
        <div className="mt-2 grid grid-cols-2 gap-2">
          <button
            type="button"
            onClick={() => setDefaultInput("voice")}
            className={`rounded-lg border px-3 py-3 text-left text-sm transition-colors ${
              defaultInput === "voice"
                ? "border-primary bg-surface text-foreground"
                : "border-border bg-background text-muted-foreground"
            }`}
          >
            <Mic className="mb-1 size-4 text-primary" />
            Voice
          </button>
          <button
            type="button"
            onClick={() => setDefaultInput("text")}
            className={`rounded-lg border px-3 py-3 text-left text-sm transition-colors ${
              defaultInput === "text"
                ? "border-primary bg-surface text-foreground"
                : "border-border bg-background text-muted-foreground"
            }`}
          >
            <Keyboard className="mb-1 size-4 text-primary" />
            Text
          </button>
        </div>

        <Button type="submit" className="mt-6 w-full">
          Continue
        </Button>
      </form>
    </div>
  )
}
