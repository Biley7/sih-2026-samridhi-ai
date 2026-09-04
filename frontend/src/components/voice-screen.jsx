import { useEffect, useState } from "react"
import { Keyboard, Mic } from "lucide-react"
import { Button } from "@/components/ui/button"
import { t } from "@/data/translations"
import { LANGUAGES } from "@/lib/languages"

const SAMPLE_BY_LANG = {
  hi: "मुझे हैंडलूम बुनाई के लिए सब्सिडी चाहिए",
  en: "I need a subsidy for my handloom weaving unit",
  bn: "হ্যান্ডলুম বুননের জন্য ভর্তুকি চাই",
  ta: "கைத்தறி நெசவுக்கு மானியம் வேண்டும்",
  te: "చేనేత నేతకు సబ్సిడీ కావాలి",
  mr: "हँडलूम विणकामासाठी अनुदान हवे",
}

export function VoiceScreen({ language, initialQuery = "", onConfirm, onSwitchToText, isListening, onStartListening, speechError, speechSupported = true }) {
  const [transcript, setTranscript] = useState(initialQuery)
  const [voiceRecognized, setVoiceRecognized] = useState(false)

  useEffect(() => {
    setTranscript(initialQuery)
    setVoiceRecognized(false)
  }, [initialQuery])

  function startListening() {
    setVoiceRecognized(false)
    onStartListening?.(language, (spokenText) => {
      setTranscript(spokenText)
      setVoiceRecognized(true)
    })
  }

  const sample = SAMPLE_BY_LANG[language] || SAMPLE_BY_LANG.en
  const languageLabel = LANGUAGES.find((item) => item.code === language)?.label || language

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
            onClick={startListening}
            disabled={!speechSupported}
            className={`relative z-10 flex size-20 items-center justify-center rounded-full transition-colors ${
              isListening ? "animate-pulse bg-red-600 text-white" : "bg-surface text-primary shadow-sm"
            } ${!speechSupported ? "cursor-not-allowed opacity-50" : ""}`}
            aria-pressed={isListening}
            aria-label={isListening ? t(language, "listening") : t(language, "useVoice")}
          >
            <Mic className="size-8" />
          </button>
        </div>
        <p className="mt-3 text-xs font-medium text-foreground">
          {isListening ? t(language, "listening") : t(language, "useVoice")}
        </p>
        {!speechSupported && (
          <p role="alert" className="mt-2 max-w-xs rounded-full bg-amber-100 px-3 py-1.5 text-center text-xs font-medium text-amber-800">
            Voice input needs Google Chrome or Microsoft Edge. You can still type below.
          </p>
        )}
        {speechError && (
          <p role="alert" className="mt-2 max-w-xs rounded-full bg-red-100 px-3 py-1.5 text-center text-xs font-medium text-red-700">
            ⚠️ {speechError}
          </p>
        )}
        <p className="mt-1 max-w-xs text-center text-[11px] leading-snug text-muted-foreground">
          {t(language, "voiceCaption")}
        </p>
      </div>

      <textarea
        value={transcript}
        onChange={(e) => setTranscript(e.target.value)}
        rows={3}
        placeholder={`${t(language, "example")}: ${sample}`}
        aria-label={t(language, "speakCraft")}
        className="mt-4 w-full resize-none rounded-lg bg-surface px-3 py-3 text-center text-sm outline-none ring-ring focus:ring-2"
      />
      <p
        role="status"
        className={`mt-2 rounded-full px-3 py-1.5 text-center text-xs font-medium ${isListening ? "animate-pulse bg-red-100 text-red-700" : voiceRecognized && transcript.trim() ? "bg-emerald-100 text-emerald-700" : "hidden"}`}
      >
        {isListening ? `🎙️ Listening in ${languageLabel}... Speak now` : `✓ Recognized: '${transcript.trim()}'`}
      </p>

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
