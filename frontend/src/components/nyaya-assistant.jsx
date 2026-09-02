import { useEffect, useState } from "react"
import { Mic, SendHorizontal, Volume2, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { t } from "@/data/translations"

const USER_REPLY = "I am a handloom weaver looking for subsidies."
const QUICK_PROMPTS = ["Handloom Weaver subsidy", "SC/ST entrepreneur loan"]
export const ASSISTANT_QUERY = USER_REPLY

export function NyayaAssistant({ open, onOpen, onClose, onViewSchemes, language = "en" }) {
  const [chatHistory, setChatHistory] = useState([
    { sender: "ai", text: "Namaste! I am NyayaAssistant. How can I help your business today?" },
  ])
  const [query, setQuery] = useState("")
  const [isListening, setIsListening] = useState(false)

  useEffect(() => {
    if (open) {
      setChatHistory([{ sender: "ai", text: "Namaste! I am NyayaAssistant. How can I help your business today?" }])
      setQuery("")
    }
  }, [open])

  useEffect(() => {
    if (!isListening) return undefined
    const timer = window.setTimeout(() => {
      const voiceQuery = "I am a handloom weaver looking for subsidies."
      setQuery(voiceQuery)
      setIsListening(false)
      appendConversation(voiceQuery)
    }, 3000)
    return () => window.clearTimeout(timer)
  }, [isListening])

  function getAiReply(message) {
    const normalized = message.toLowerCase()

    if (normalized.includes("handloom") || normalized.includes("weaver")) {
      return {
        text: "I found 3 eligible handloom weaver support schemes with interest subvention and capital assistance. I can narrow the best matches for your unit profile.",
        showSchemes: true,
      }
    }

    if (normalized.includes("sc") || normalized.includes("st") || normalized.includes("entrepreneur") || normalized.includes("loan")) {
      return {
        text: "I found 2 SC/ST entrepreneur credit support schemes and a working-capital loan option that match your requirement. I can shortlist the strongest fit.",
        showSchemes: true,
      }
    }

    return {
      text: "I can help you shortlist the closest subsidy or loan scheme. I have matched the options most relevant to your business profile.",
      showSchemes: true,
    }
  }

  function handleSubmit(e) {
    e.preventDefault()
    e.stopPropagation()
    const message = query.trim()
    if (!message) return
    appendConversation(message)
    setQuery("")
  }

  function appendConversation(message) {
    const trimmedMessage = message.trim()
    if (!trimmedMessage) return

    setChatHistory((history) => [...history, { sender: "user", text: trimmedMessage }])

    const aiReply = getAiReply(trimmedMessage)

    window.setTimeout(() => {
      setChatHistory((history) => [
        ...history,
        {
          sender: "ai",
          text: aiReply.text,
          showSchemes: aiReply.showSchemes,
        },
      ])
    }, 700)
  }

  return (
    <>
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation()
          if (open) onClose()
          else onOpen()
        }}
        className="fixed bottom-4 right-4 z-50 rounded-full bg-white p-1 shadow-lg shadow-slate-400/40 transition hover:scale-105 md:bottom-6 md:right-6"
        aria-expanded={open}
        aria-controls="nyaya-assistant-panel"
        aria-label="Open NyayaAssistant AI"
      >
        <img src="/assistant-logo.png" alt="NyayaAssistant" className="h-12 w-12 rounded-full object-cover" />
      </button>

      {open && (
        <div className="fixed inset-0 z-50 flex items-end justify-end p-2 md:p-6">
          <button
            type="button"
            className="absolute inset-0 bg-slate-900/25"
            aria-label="Close assistant"
            onClick={onClose}
          />
          <aside
            id="nyaya-assistant-panel"
            role="dialog"
            aria-label="NyayaAssistant AI"
            className="relative z-10 w-full max-w-sm overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl md:bottom-0 md:right-0 md:ml-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between bg-gradient-to-r from-[#0b3d6e] to-[#1a5f9e] px-4 py-3 text-white">
              <div className="flex items-center space-x-2">
                <img src="/assistant-logo.png" alt="NyayaAssistant" className="h-8 w-8 rounded-full object-cover" />
                <p className="text-sm font-semibold">NyayaAssistant AI</p>
              </div>
              <button type="button" onClick={onClose} className="rounded-full p-1 hover:bg-white/10" aria-label="Close">
                <X className="size-4" />
              </button>
            </div>

            <div className="flex items-center gap-2 border-b border-amber-200 bg-amber-50 px-4 py-2.5 text-xs font-medium text-amber-950">
              <Volume2 className="size-3.5 shrink-0 text-amber-700" aria-hidden />
              {t(language, "assistantBanner")}
            </div>

            <div className="space-y-3 bg-slate-50 p-4">
              {chatHistory.map((message, index) => (
                <div key={`${message.sender}-${index}`} className={message.sender === "user" ? "ml-8 rounded-2xl rounded-tr-sm bg-[#0b3d6e] px-3.5 py-2.5 text-sm text-white shadow-sm" : "mr-8 rounded-2xl rounded-tl-sm border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-slate-800 shadow-sm"}>
                  <p className="text-[10px] font-medium uppercase tracking-wide text-slate-400">{message.sender === "user" ? t(language, "youLabel") : "NyayaAssistant"}</p>
                  <p className="mt-1 whitespace-pre-line">{message.text}</p>
                  {message.showSchemes && (
                    <Button
                      className="mt-3 w-full"
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation()
                        onViewSchemes()
                      }}
                    >
                      {t(language, "viewMatched")}
                    </Button>
                  )}
                </div>
              ))}
            </div>

            <div className="border-t border-slate-200 bg-white p-3">
              <div className="flex flex-wrap gap-2">
                {QUICK_PROMPTS.map((prompt) => (
                  <button
                    key={prompt}
                    type="button"
                    onClick={() => appendConversation(prompt)}
                    className="rounded-full border border-slate-200 bg-slate-50 px-2.5 py-1 text-[11px] font-medium text-slate-700 transition hover:border-[#0b3d6e] hover:text-[#0b3d6e]"
                  >
                    {prompt}
                  </button>
                ))}
              </div>
            </div>

            <form
              className="flex items-center gap-2 border-t border-slate-200 bg-white p-3"
              onSubmit={handleSubmit}
            >
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={isListening ? "Listening in native language..." : "Ask NyayaAssistant..."}
                className="h-10 min-w-0 flex-1 rounded-lg border border-slate-200 px-3 text-sm outline-none focus:border-[#0b3d6e]"
                aria-label="Ask NyayaAssistant"
              />
              <button
                type="submit"
                className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-[#0b3d6e] text-white transition hover:bg-[#0a355f]"
                aria-label="Send message"
              >
                <SendHorizontal className="size-4" />
              </button>
              <button
                type="button"
                onClick={() => setIsListening((current) => !current)}
                className={`flex size-10 shrink-0 items-center justify-center rounded-lg text-white transition ${isListening ? "animate-pulse bg-red-600" : "bg-red-500 hover:bg-red-600"}`}
                aria-label={isListening ? "Stop listening" : "Start voice input"}
              >
                <Mic className="size-4" />
              </button>
            </form>
          </aside>
        </div>
      )}
    </>
  )
}
