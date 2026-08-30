import { useEffect, useRef, useState } from "react"
import { Keyboard, Mic, Square } from "lucide-react"
import { Button } from "@/components/ui/button"
import { t } from "@/data/translations"

const SAMPLE_BY_LANG = {
  hi: "मुझे हैंडलूम बुनाई के लिए सब्सिडी चाहिए",
  en: "I need a subsidy for my handloom weaving unit",
  bn: "হ্যান্ডলুম বুননের জন্য ভর্তুকি চাই",
  ta: "கைத்தறி நெசவுக்கு மானியம் வேண்டும்",
  te: "చేనేత నేతకు సబ్సిడీ కావాలి",
  mr: "हँडलूम विणकामासाठी अनुदान हवे",
}

export function VoiceScreen({ language, onConfirm, onSwitchToText }) {
  const [isListening, setIsListening] = useState(false)
  const [transcript, setTranscript] = useState("")
  const [error, setError] = useState("")
  const onConfirmRef = useRef(onConfirm)
  onConfirmRef.current = onConfirm

  useEffect(() => {
    if (!isListening) return undefined
    const timer = window.setTimeout(() => {
      const voiceQuery = "Main handloom weaver hoon, mujhe subsidy chahiye."
      setTranscript(voiceQuery)
      setIsListening(false)
      onConfirmRef.current(voiceQuery)
    }, 3000)
    return () => window.clearTimeout(timer)
  }, [isListening])

  function startListening() {
    setError("")
    setIsListening(true)
  }

  const sample = SAMPLE_BY_LANG[language] || SAMPLE_BY_LANG.en

  return (
    <section className="rounded-xl border border-border bg-card p-5 md:p-6">
      <p className="text-center text-sm text-muted-foreground">{t(language, "speakCraft")}</p>

      <div className="mt-5 flex flex-col items-center">
        <div className="relative flex size-24 items-center justify-center">
          {!isListening && (
            <>
              <span className="absolute size-20 rounded-full bg-primary/25 animate-pulse-ring" />
              <span className="absolute size-20 rounded-full bg-primary/20 animate-pulse-ring [animation-delay:400ms]" />
            </>
          )}
          <button
            type="button"
            onClick={() => setIsListening((current) => !current)}
            className={`relative z-10 flex size-20 items-center justify-center rounded-full transition-colors ${
              isListening ? "animate-pulse bg-red-600 text-white" : "bg-surface text-primary shadow-sm"
            }`}
            aria-pressed={isListening}
            aria-label={isListening ? t(language, "listening") : t(language, "useVoice")}
          >
            {isListening ? <Square className="size-6" /> : <Mic className="size-8" />}
          </button>
        </div>
        <p className="mt-3 text-xs font-medium text-foreground">
          {isListening ? t(language, "listening") : t(language, "useVoice")}
        </p>
        <p className="mt-1 max-w-xs text-center text-[11px] leading-snug text-muted-foreground">
          {t(language, "voiceCaption")}
        </p>
      </div>

      <p className="mt-4 min-h-12 rounded-lg bg-surface px-3 py-3 text-center text-sm">
        {transcript || (
          <span className="text-muted-foreground">
            {t(language, "example")}: {sample}
          </span>
        )}
      </p>
      {error && <p className="mt-2 text-center text-xs text-primary">{error}</p>}

      <div className="mt-4 flex flex-col gap-2 sm:flex-row">
        <Button
          className="flex-1"
          disabled={!transcript.trim()}
          onClick={() => onConfirm(transcript.trim())}
        >
          {t(language, "findSchemes")}
        </Button>
        <Button variant="outline" className="flex-1" onClick={() => onSwitchToText(transcript || undefined)}>
          <Keyboard className="size-4" />
          {t(language, "typeInstead")}
        </Button>
      </div>
    </section>
  )
}
