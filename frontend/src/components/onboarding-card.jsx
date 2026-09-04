import { useState } from "react"
import { Keyboard, Mic, ShieldCheck, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DIGILOCKER_DEMO_PROFILES } from "@/lib/digilocker"
import { LANGUAGES } from "@/lib/languages"
import { t } from "@/data/translations"

export function OnboardingCard({ onComplete, onAutoFill, isListening, onStartListening }) {
  const [language, setLanguage] = useState("hi")
  const [defaultInput, setDefaultInput] = useState("voice")
  const [name, setName] = useState("")
  const [trade, setTrade] = useState("")
  const [category, setCategory] = useState("General")
  const [income, setIncome] = useState("")
  const [digiLockerLinked, setDigiLockerLinked] = useState(false)
  const [digiLockerOpen, setDigiLockerOpen] = useState(false)
  const [activeVoiceField, setActiveVoiceField] = useState("")
  const languageLabel = LANGUAGES.find((item) => item.code === language)?.label || language
  const canSubmit = digiLockerLinked || (name.trim() && trade.trim())

  function listenFor(field, setValue) {
    setActiveVoiceField(field)
    onStartListening?.(language, (transcript) => {
      setValue(transcript)
      setActiveVoiceField(field)
    })
  }

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
    if (!canSubmit) return
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
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-slate-900/90 p-3">
      <form
        onSubmit={handleSubmit}
        className="my-3 w-full max-w-md max-h-[85vh] overflow-y-auto rounded-2xl border border-slate-200 bg-white p-5 shadow-2xl"
      >
        <p className="text-xs font-semibold uppercase tracking-wide text-primary">{t(language, "welcome")}</p>
        <h2 className="mt-1 text-xl font-bold">{t(language, "onboardingTitle")}</h2>
        <p className="mt-2 text-sm text-muted-foreground">{t(language, "onboardingBody")}</p>

        <Button
          type="button"
          variant="digilocker"
          className="mt-4 h-9 w-full rounded-full px-3 text-xs"
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

        <div className="mt-3 grid gap-3">
          <label className="block text-sm font-medium">
            <span className="flex items-center justify-between">
              {t(language, "name")}
              <button
                type="button"
                onClick={() => listenFor("name", setName)}
                className={`rounded-full p-2 text-primary transition-colors hover:bg-surface ${isListening ? "animate-pulse bg-red-600 text-white" : ""}`}
                aria-label={isListening ? t(language, "listening") : t(language, "useVoice")}
                title={t(language, "useVoice")}
              >
                <Mic className="size-4" />
              </button>
            </span>
            <input value={name} onChange={(e) => setName(e.target.value)} className="mt-1 h-10 w-full rounded-lg border border-border bg-background px-3 py-2 text-sm" placeholder="Full name" />
            {activeVoiceField === "name" && (isListening || name.trim()) && (
              <p role="status" className={`mt-1.5 rounded-full px-3 py-1 text-center text-xs font-medium ${isListening ? "animate-pulse bg-red-100 text-red-700" : "bg-emerald-100 text-emerald-700"}`}>
                {isListening ? `🎙️ Listening in ${languageLabel}... Speak now` : `✓ Recognized: '${name}'`}
              </p>
            )}
          </label>
          <label className="block text-sm font-medium">
            <span className="flex items-center justify-between">
              {t(language, "trade")}
              <button
                type="button"
                onClick={() => listenFor("trade", setTrade)}
                className={`rounded-full p-2 text-primary transition-colors hover:bg-surface ${isListening ? "animate-pulse bg-red-600 text-white" : ""}`}
                aria-label={isListening ? t(language, "listening") : t(language, "useVoice")}
                title={t(language, "useVoice")}
              >
                <Mic className="size-4" />
              </button>
            </span>
            <input value={trade} onChange={(e) => setTrade(e.target.value)} className="mt-1 h-10 w-full rounded-lg border border-border bg-background px-3 py-2 text-sm" placeholder="e.g. Handloom Weaver" />
            {activeVoiceField === "trade" && (isListening || trade.trim()) && (
              <p role="status" className={`mt-1.5 rounded-full px-3 py-1 text-center text-xs font-medium ${isListening ? "animate-pulse bg-red-100 text-red-700" : "bg-emerald-100 text-emerald-700"}`}>
                {isListening ? `🎙️ Listening in ${languageLabel}... Speak now` : `✓ Recognized: '${trade}'`}
              </p>
            )}
          </label>
          <label className="block text-sm font-medium">
            {t(language, "income")}
            <input
              value={income}
              onChange={(e) => setIncome(e.target.value)}
              className="mt-1 h-10 w-full rounded-lg border border-border bg-background px-3 py-2 text-sm"
              placeholder="e.g. ₹1,80,000"
            />
          </label>
          <label className="block text-sm font-medium">
            Category
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="mt-1 h-10 w-full rounded-lg border border-border bg-background px-3 py-2 text-sm"
            >
              <option>SC</option>
              <option>ST</option>
              <option>OBC</option>
              <option>General</option>
            </select>
          </label>
        </div>

        <label className="mt-3 block text-sm font-medium">
          {t(language, "language")}
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="mt-1 h-10 w-full rounded-lg border border-border bg-background px-3 py-2 text-sm"
          >
            {LANGUAGES.map((lang) => (
              <option key={lang.code} value={lang.code}>
                {lang.label}
              </option>
            ))}
          </select>
        </label>

        <p className="mt-3 text-sm font-medium">{t(language, "defaultInputLabel")}</p>
        <div className="mt-2 grid grid-cols-2 gap-2">
          <button
            type="button"
            onClick={() => setDefaultInput("voice")}
            className={`rounded-lg border px-3 py-2 text-left text-sm transition-colors ${
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
            className={`rounded-lg border px-3 py-2 text-left text-sm transition-colors ${
              defaultInput === "text"
                ? "border-primary bg-surface text-foreground"
                : "border-border bg-background text-muted-foreground"
            }`}
          >
            <Keyboard className="mb-1 size-4 text-primary" />
            {t(language, "text")}
          </button>
        </div>

        <Button type="submit" disabled={!canSubmit} className="mt-4 w-full">
          {t(language, "saveDiscover")}
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
            <div className="mt-3 flex flex-wrap gap-2">
              {DIGILOCKER_DEMO_PROFILES.map((profile) => (
                <button
                  key={profile.name}
                  type="button"
                  onClick={() => fillDigiLocker(profile)}
                  className="flex-1 rounded-full border border-slate-200 px-3 py-2 text-left transition hover:border-blue-500 hover:bg-blue-50"
                >
                  <p className="text-xs font-semibold text-[#0b3d6e]">{profile.name}</p>
                  <p className="text-[11px] text-slate-600">{profile.trade} · {profile.category}</p>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
