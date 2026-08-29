import { useEffect, useState } from "react"
import { Bot, Sparkles, Volume2, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { t } from "@/data/translations"

const USER_REPLY = "I am a handloom weaver looking for subsidies."
export const ASSISTANT_QUERY = USER_REPLY

export function NyayaAssistant({ open, onOpen, onClose, onViewSchemes, language = "en" }) {
  const [step, setStep] = useState(1)

  useEffect(() => {
    if (open) setStep(1)
  }, [open])

  function handleUserReply(e) {
    e.stopPropagation()
    setStep(2)
    window.setTimeout(() => setStep(3), 450)
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
              <div className="mr-8 rounded-2xl rounded-tl-sm border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-slate-800 shadow-sm">
                <p className="text-[10px] font-medium uppercase tracking-wide text-[#0b3d6e]">NyayaAssistant</p>
                <p className="mt-1">{t(language, "assistantGreeting")}</p>
              </div>

              {step === 1 && (
                <button
                  type="button"
                  onClick={handleUserReply}
                  className="ml-8 w-[calc(100%-2rem)] rounded-2xl rounded-tr-sm border border-[#0b3d6e] bg-white px-3.5 py-2.5 text-left text-sm text-[#0b3d6e] shadow-sm hover:bg-sky-50"
                >
                  <p className="text-[10px] font-medium uppercase tracking-wide text-slate-400">{t(language, "tapToReply")}</p>
                  <p className="mt-1">{t(language, "assistantUserReply")}</p>
                </button>
              )}

              {step >= 2 && (
                <div className="ml-8 rounded-2xl rounded-tr-sm bg-[#0b3d6e] px-3.5 py-2.5 text-sm text-white shadow-sm">
                  <p className="text-[10px] font-medium uppercase tracking-wide text-sky-200">{t(language, "youLabel")}</p>
                  <p className="mt-1">{t(language, "assistantUserReply")}</p>
                </div>
              )}

              {step >= 3 && (
                <div className="mr-8 rounded-2xl rounded-tl-sm border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-slate-800 shadow-sm">
                  <p className="text-[10px] font-medium uppercase tracking-wide text-[#0b3d6e]">NyayaAssistant</p>
                  <p className="mt-1">{t(language, "assistantFound")}</p>
                </div>
              )}
            </div>

            {step >= 3 && (
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
