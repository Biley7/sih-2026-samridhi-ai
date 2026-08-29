import { useRef, useState } from "react"
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

const LOCALE = {
  hi: "hi-IN",
  en: "en-IN",
  bn: "bn-IN",
  ta: "ta-IN",
  te: "te-IN",
  mr: "mr-IN",
}

export function VoiceScreen({ language, onConfirm, onSwitchToText }) {
  const [listening, setListening] = useState(false)
  const [transcript, setTranscript] = useState("")
  const [error, setError] = useState("")
  const recognitionRef = useRef(null)

  function stopListening() {
    recognitionRef.current?.stop?.()
    recognitionRef.current = null
    setListening(false)
  }

  function startListening() {
    setError("")
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
    if (!SpeechRecognition) {
      const sample = SAMPLE_BY_LANG[language] || SAMPLE_BY_LANG.en
      setTranscript(sample)
      setError(t(language, "micUnavailable"))
      return
    }

    const recognition = new SpeechRecognition()
    recognition.lang = LOCALE[language] || "en-IN"
    recognition.interimResults = true
    recognition.continuous = false

    recognition.onresult = (event) => {
      const last = event.results[event.results.length - 1]
      setTranscript(last[0].transcript)
    }
    recognition.onerror = () => {
      setError(t(language, "hearError"))
      setListening(false)
    }
    recognition.onend = () => setListening(false)

    recognitionRef.current = recognition
    setListening(true)
    recognition.start()
  }

  const sample = SAMPLE_BY_LANG[language] || SAMPLE_BY_LANG.en

  return (
    <section className="rounded-xl border border-border bg-card p-5 md:p-6">
      <p className="text-center text-sm text-muted-foreground">{t(language, "speakCraft")}</p>

      <div className="mt-5 flex flex-col items-center">
        <div className="relative flex size-24 items-center justify-center">
          {!listening && (
            <>
              <span className="absolute size-20 rounded-full bg-primary/25 animate-pulse-ring" />
              <span className="absolute size-20 rounded-full bg-primary/20 animate-pulse-ring [animation-delay:400ms]" />
            </>
          )}
          <button
            type="button"
            onClick={listening ? stopListening : startListening}
            className={`relative z-10 flex size-20 items-center justify-center rounded-full transition-colors ${
              listening ? "bg-primary text-primary-foreground" : "bg-surface text-primary shadow-sm"
            }`}
            aria-pressed={listening}
            aria-label={listening ? t(language, "listening") : t(language, "useVoice")}
          >
            {listening ? <Square className="size-6" /> : <Mic className="size-8" />}
          </button>
        </div>
        <p className="mt-3 text-xs font-medium text-foreground">
          {listening ? t(language, "listening") : t(language, "useVoice")}
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
