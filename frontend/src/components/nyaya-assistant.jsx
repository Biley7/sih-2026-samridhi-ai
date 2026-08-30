import { useEffect, useState } from "react"
import { Bot, Mic, Sparkles, Volume2, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { t } from "@/data/translations"

const USER_REPLY = "I am a handloom weaver looking for subsidies."
export const ASSISTANT_QUERY = USER_REPLY

export function NyayaAssistant({ open, onOpen, onClose, onViewSchemes, language = "en" }) {
  const [chatHistory, setChatHistory] = useState([
    { sender: "ai", text: "Namaste! I am NyayaAssistant. How can I help your business today?" },
  ])
  const [query, setQuery] = useState("")
  const [isListening, setIsListening] = useState(false)

  const responseText = "I found 3 eligible MoSJE schemes for handloom weavers with up to 5% interest subvention. Click 'Scheme Matches' to view."

  useEffect(() => {
    if (open) {
      setChatHistory([{ sender: "ai", text: "Namaste! I am NyayaAssistant. How can I help your business today?" }])
      setQuery("")
    }
  }, [open])

  useEffect(() => {
    if (!isListening) return undefined
    const timer = window.setTimeout(() => {
      setQuery("I am a handloom weaver looking for subsidies.")
      setIsListening(false)
      appendConversation("I am a handloom weaver looking for subsidies.")
    }, 3000)
    return () => window.clearTimeout(timer)
  }, [isListening])

  function handleSubmit(e) {
    e.preventDefault()
    e.stopPropagation()
    const message = query.trim()
    if (!message) return
    appendConversation(message)
    setQuery("")
  }

  function appendConversation(message) {
    setChatHistory((history) => [...history, { sender: "user", text: message }])
    window.setTimeout(() => {
      setChatHistory((history) => [
        ...history,
        {
          sender: "ai",
          text: responseText,
        },
      ])
    }, 1000)
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
        className="fixed bottom-5 right-4 z-40 flex items-center gap-2 rounded-full bg-[#0b3d6e] px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-slate-400/40 transition hover:bg-[#0a355f] md:bottom-6 md:right-6"
        aria-expanded={open}
        aria-controls="nyaya-assistant-panel"
      >
        <span className="relative flex size-9 items-center justify-center rounded-full bg-white/15">
          <Bot className="size-5" aria-hidden />
          <Sparkles className="absolute -right-0.5 -top-0.5 size-3 text-amber-300" aria-hidden />
        </span>
        NyayaAssistant AI
      </button>

      {open && (
        <div className="fixed inset-0 z-40 flex items-end justify-end p-4 md:p-6">
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
            className="relative z-10 w-full max-w-sm overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between bg-gradient-to-r from-[#0b3d6e] to-[#1a5f9e] px-4 py-3 text-white">
              <div className="flex items-center gap-2">
                <Bot className="size-5" />
                <div>
                  <p className="text-sm font-semibold">NyayaAssistant AI</p>
                  <p className="flex items-center gap-1 text-[11px] text-sky-100">
                    <span className="size-1.5 animate-pulse rounded-full bg-emerald-400" />
                    {t(language, "assistantLive")}
                  </p>
                </div>
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
                  <p className="mt-1">{message.text}</p>
                </div>
              ))}
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
                type="button"
                onClick={() => setIsListening((current) => !current)}
                className={`flex size-10 shrink-0 items-center justify-center rounded-lg text-white transition ${isListening ? "animate-pulse bg-red-600" : "bg-red-500 hover:bg-red-600"}`}
                aria-label={isListening ? "Stop listening" : "Start voice input"}
              >
                <Mic className="size-4" />
              </button>
            </form>

            {chatHistory.some((message) => message.sender === "ai" && message.text.startsWith("I found 3 eligible MoSJE")) && (
              <div className="border-t border-slate-200 bg-white p-4">
                <Button
                  className="w-full"
                  onClick={(e) => {
                    e.stopPropagation()
                    onViewSchemes()
                  }}
                >
                  {t(language, "viewMatched")}
                </Button>
              </div>
            )}
          </aside>
        </div>
      )}
    </>
  )
}
