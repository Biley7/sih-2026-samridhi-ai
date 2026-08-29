import { useState } from "react"
import { Keyboard, Mic, ShieldCheck } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DIGILOCKER_DEMO_PROFILE } from "@/lib/digilocker"
import { LANGUAGES } from "@/lib/languages"

export function OnboardingCard({ onComplete }) {
  const [language, setLanguage] = useState("hi")
  const [defaultInput, setDefaultInput] = useState("voice")
  const [name, setName] = useState("")
  const [trade, setTrade] = useState("")
  const [income, setIncome] = useState("")
  const [digiLockerLinked, setDigiLockerLinked] = useState(false)

  function fillDigiLocker() {
    setName(DIGILOCKER_DEMO_PROFILE.name)
    setTrade(DIGILOCKER_DEMO_PROFILE.trade)
    setIncome(DIGILOCKER_DEMO_PROFILE.income)
    setDigiLockerLinked(true)
  }

  function handleSubmit(e) {
    e.preventDefault()
    onComplete({
      language,
      defaultInput,
      lastSearch: "",
      name,
      trade,
      income,
      digiLockerLinked,
    })
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-foreground/40 p-4">
      <form
        onSubmit={handleSubmit}
        className="my-4 w-full max-w-md rounded-xl border border-border bg-card p-6 shadow-lg"
      >
        <p className="text-xs font-semibold uppercase tracking-wide text-primary">Welcome</p>
        <h2 className="mt-1 text-xl font-bold">Set up NYAYASETU in one step</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          Choose a language, link your documents, and how you prefer to ask for schemes.
        </p>

        <Button type="button" variant="digilocker" className="mt-5 w-full" onClick={fillDigiLocker}>
          <ShieldCheck className="size-4" />
          Auto-fill with DigiLocker
        </Button>
        {digiLockerLinked && (
          <p className="mt-2 text-center text-xs font-medium text-emerald-700">
            Documents fetched from DigiLocker (demo)
          </p>
        )}

        <div className="mt-4 grid gap-3">
          <label className="block text-sm font-medium">
            Name
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-1.5 h-11 w-full rounded-lg border border-border bg-background px-3 text-sm"
              placeholder="Full name"
            />
          </label>
          <label className="block text-sm font-medium">
            Trade
            <input
              value={trade}
              onChange={(e) => setTrade(e.target.value)}
              className="mt-1.5 h-11 w-full rounded-lg border border-border bg-background px-3 text-sm"
              placeholder="e.g. Handloom Weaver"
            />
          </label>
          <label className="block text-sm font-medium">
            Annual income
            <input
              value={income}
              onChange={(e) => setIncome(e.target.value)}
              className="mt-1.5 h-11 w-full rounded-lg border border-border bg-background px-3 text-sm"
              placeholder="e.g. ₹1,80,000"
            />
          </label>
        </div>

        <label className="mt-4 block text-sm font-medium">
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
