import { useState } from "react"
import { Keyboard, Mic, ShieldCheck, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DIGILOCKER_DEMO_PROFILES } from "@/lib/digilocker"
import { LANGUAGES } from "@/lib/languages"
import { t } from "@/data/translations"

export function OnboardingCard({ onComplete, onAutoFill }) {
  const [language, setLanguage] = useState("hi")
  const [defaultInput, setDefaultInput] = useState("voice")
  const [name, setName] = useState("")
  const [trade, setTrade] = useState("")
  const [category, setCategory] = useState("General")
  const [income, setIncome] = useState("")
  const [digiLockerLinked, setDigiLockerLinked] = useState(false)
  const [digiLockerOpen, setDigiLockerOpen] = useState(false)

  function fillDigiLocker(profile) {
    setName(profile.name)
    setTrade(profile.trade)
    setCategory(profile.category)
    setIncome(profile.income)
    setDigiLockerLinked(true)
    setDigiLockerOpen(false)
    onAutoFill?.(profile)
  }

  function handleSubmit(e) {
    e.preventDefault()
    onComplete({
      language,
      defaultInput,
      lastSearch: "",
      name,
      trade,
      category,
      income,
      digiLockerLinked,
    })
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-slate-900/90 p-4">
      <form
        onSubmit={handleSubmit}
        className="my-4 w-full max-w-md rounded-xl border border-border bg-card p-6 shadow-lg"
      >
        <p className="text-xs font-semibold uppercase tracking-wide text-primary">{t(language, "welcome")}</p>
        <h2 className="mt-1 text-xl font-bold">{t(language, "onboardingTitle")}</h2>
        <p className="mt-2 text-sm text-muted-foreground">{t(language, "onboardingBody")}</p>

        <Button
          type="button"
          variant="digilocker"
          className="mt-5 w-full"
          onClick={() => setDigiLockerOpen(true)}
        >
          <ShieldCheck className="size-4" />
          {t(language, "autoFillDigiLocker")}
        </Button>
        {digiLockerLinked && (
          <p className="mt-2 text-center text-xs font-medium text-emerald-700">
            {t(language, "digiLockerFetched")}
          </p>
        )}

        <div className="mt-4 grid gap-3">
          <label className="block text-sm font-medium">
            {t(language, "name")}
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-1.5 h-11 w-full rounded-lg border border-border bg-background px-3 text-sm"
              placeholder="Full name"
            />
          </label>
          <label className="block text-sm font-medium">
            {t(language, "trade")}
            <input
              value={trade}
              onChange={(e) => setTrade(e.target.value)}
              className="mt-1.5 h-11 w-full rounded-lg border border-border bg-background px-3 text-sm"
              placeholder="e.g. Handloom Weaver"
            />
          </label>
          <label className="block text-sm font-medium">
            {t(language, "income")}
            <input
              value={income}
              onChange={(e) => setIncome(e.target.value)}
              className="mt-1.5 h-11 w-full rounded-lg border border-border bg-background px-3 text-sm"
              placeholder="e.g. ₹1,80,000"
            />
          </label>
          <label className="block text-sm font-medium">
            Category
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="mt-1.5 h-11 w-full rounded-lg border border-border bg-background px-3 text-sm"
            >
              <option>SC</option>
              <option>ST</option>
              <option>OBC</option>
              <option>General</option>
            </select>
          </label>
        </div>

        <label className="mt-4 block text-sm font-medium">
          {t(language, "language")}
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

        <p className="mt-4 text-sm font-medium">{t(language, "defaultInputLabel")}</p>
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
            {t(language, "voice")}
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
            {t(language, "text")}
          </button>
        </div>

        <Button type="submit" className="mt-6 w-full">
          {t(language, "continue")}
        </Button>
      </form>

      {digiLockerOpen && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-slate-900/45 p-4">
          <div className="w-full max-w-md rounded-xl border border-border bg-white p-5 shadow-2xl">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-primary">DigiLocker demo</p>
                <h3 className="mt-1 text-lg font-bold text-[#0b3d6e]">Choose a profile to auto-fill</h3>
              </div>
              <button type="button" onClick={() => setDigiLockerOpen(false)} className="rounded-full p-1 text-slate-500 hover:bg-slate-100" aria-label="Close profile chooser">
                <X className="size-4" />
              </button>
            </div>
            <div className="mt-4 space-y-3">
              {DIGILOCKER_DEMO_PROFILES.map((profile, index) => (
                <button
                  key={profile.name}
                  type="button"
                  onClick={() => fillDigiLocker(profile)}
                  className="w-full rounded-xl border border-slate-200 p-4 text-left transition hover:border-blue-500 hover:bg-blue-50"
                >
                  <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Profile {index + 1}</p>
                  <p className="mt-1 font-semibold text-[#0b3d6e]">{profile.name}</p>
                  <p className="mt-1 text-sm text-slate-600">{profile.trade} · {profile.category} · {profile.income}</p>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
