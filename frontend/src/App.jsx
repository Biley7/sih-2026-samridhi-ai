"use client"

import { useCallback, useMemo, useRef, useState } from "react"
import { ArrowLeft, Mic, Settings2, WifiOff } from "lucide-react"
import { SiteHeader } from "@/components/site-header"
import { OnboardingCard } from "@/components/onboarding-card"
import { ProfileStrip } from "@/components/profile-strip"
import { VoiceScreen } from "@/components/voice-screen"
import { TextScreen } from "@/components/text-screen"
import { ResultsPreview } from "@/components/results-preview"
import { MetricCards } from "@/components/metric-cards"
import { Footer } from "@/components/Footer"
import { PartnerLocator } from "@/components/partner-locator"
import { FinancialCalculator } from "@/components/financial-calculator"
import { ASSISTANT_QUERY, NyayaAssistant } from "@/components/nyaya-assistant"
import { usePreferences } from "@/hooks/use-preferences"
import { DIGILOCKER_DEMO_PROFILE } from "@/lib/digilocker"
import { filterSchemesByCoverage, getAllSchemes, matchSchemes } from "@/lib/schemes"
import { t } from "@/data/translations"

const MATCH_QUERY = "Handloom Weaver"

export default function Page() {
  const { prefs, hydrated, save, update } = usePreferences()

  const [mode, setMode] = useState("voice")
  const [phase, setPhase] = useState("input")
  const [query, setQuery] = useState("")
  const [results, setResults] = useState([])
  const [textSeed, setTextSeed] = useState(undefined)
  const [compact, setCompact] = useState(false)
  const [activeMetric, setActiveMetric] = useState(null)
  const [activeTab, setActiveTab] = useState("voice")
  const [assistantOpen, setAssistantOpen] = useState(false)
  const searchTimer = useRef(null)

  const initialisedMode = useRef(false)
  if (prefs && !initialisedMode.current) {
    initialisedMode.current = true
    setMode(prefs.defaultInput)
  }

  const runSearch = useCallback(
    (q, options = {}) => {
      const instant = Boolean(options.instant)
      setQuery(q)
      setActiveMetric(null)
      update({ lastSearch: q })
      if (searchTimer.current) clearTimeout(searchTimer.current)
      if (instant) {
        setResults(matchSchemes(q).slice(0, 3))
        setPhase("results")
        return
      }
      setPhase("loading")
      searchTimer.current = setTimeout(() => {
        setResults(matchSchemes(q))
        setPhase("results")
      }, 1200)
    },
    [update],
  )

  const highlightIssuer = useMemo(() => {
    if (activeMetric === "central") return "Central"
    if (activeMetric === "state") return "State"
    return null
  }, [activeMetric])

  function newSearch() {
    setPhase("input")
    setQuery("")
    setResults([])
    setTextSeed(undefined)
    setActiveMetric(null)
    setActiveTab("voice")
  }

  function switchToText(seed) {
    setTextSeed(seed)
    setMode("text")
    if (seed) runSearch(seed)
  }

  function applyDigiLocker() {
    update(DIGILOCKER_DEMO_PROFILE)
    setTextSeed(DIGILOCKER_DEMO_PROFILE.trade)
  }

  function handleTabChange(tabId) {
    setActiveTab(tabId)
    if (tabId === "voice") {
      setMode("voice")
      setPhase("input")
    }
    if (tabId === "matches" && results.length === 0) {
      runSearch(MATCH_QUERY, { instant: true })
    }
  }

  function handleCoverageSelect(key) {
    setActiveMetric((prev) => (prev === key ? null : key))
    setActiveTab("matches")
  }

  function viewAssistantSchemes() {
    setAssistantOpen(false)
    setActiveTab("matches")
    runSearch(ASSISTANT_QUERY, { instant: true })
  }

  const language = prefs?.language ?? "hi"
  const coverageLabels = {
    central: t(language, "centralSchemes"),
    state: t(language, "stateSchemes"),
    artisans: t(language, "craftWeaver"),
    credit: t(language, "creditSubsidy"),
  }
  const matchResults = activeMetric
    ? filterSchemesByCoverage(getAllSchemes(), activeMetric)
    : results.length
      ? results
      : matchSchemes(MATCH_QUERY).slice(0, 3)
  const matchQuery = activeMetric ? coverageLabels[activeMetric] : query || MATCH_QUERY

  return (
    <div id="top" className="artisan-backdrop relative min-h-dvh">
      {hydrated && !prefs && (
        <OnboardingCard
          onComplete={(p) => {
            save(p)
            setMode(p.defaultInput)
          }}
        />
      )}

      <SiteHeader
        language={language}
        onLanguageChange={(code) => update({ language: code })}
        compact={compact}
        onToggleCompact={() => setCompact((c) => !c)}
        onSearchFocus={() => {
          setMode("text")
          setPhase("input")
          setActiveTab("voice")
        }}
        activeTab={activeTab}
        onTabChange={handleTabChange}
      />

      <main className="relative mx-auto max-w-3xl px-4 pb-16 md:px-6">
        {activeTab === "voice" && (
          <>
            {phase === "input" && !compact && (
              <section className="pt-8 text-center md:pt-12">
                <h1 className="text-balance text-2xl font-extrabold tracking-[0.16em] text-[#0b3d6e] md:text-4xl">
                  NYAYASETU
                </h1>
                <p className="mx-auto mt-3 max-w-xl text-pretty text-lg font-semibold text-foreground md:text-xl">
                  {t(language, "heroHeadline")}
                </p>
                <p className="mx-auto mt-2 max-w-xl text-pretty text-sm text-muted-foreground md:text-base">
                  {t(language, "heroSubtitle")}
                </p>
              </section>
            )}

            {phase === "input" && prefs && (
              <div className="mt-6">
                <ProfileStrip
                  profile={prefs}
                  language={language}
                  onDigiLocker={(e) => {
                    e.stopPropagation()
                    applyDigiLocker()
                  }}
                />
              </div>
            )}

            {compact && <CompactBanner language={language} />}

            <div className="mt-4">
              {phase === "input" ? (
                mode === "voice" ? (
                  <VoiceScreen
                    language={language}
                    onConfirm={(t) => {
                      runSearch(t)
                      setActiveTab("matches")
                    }}
                    onSwitchToText={(seed) => switchToText(seed)}
                  />
                ) : (
                  <TextScreen
                    language={language}
                    seed={textSeed}
                    onSearch={(q) => {
                      runSearch(q)
                      setActiveTab("matches")
                    }}
                    onSwitchToVoice={() => setMode("voice")}
                  />
                )
              ) : (
                <div className="pt-4">
                  <button
                    type="button"
                    onClick={newSearch}
                    className="mb-3 inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
                  >
                    <ArrowLeft className="size-4" aria-hidden />
                    {t(language, "newSearch")}
                  </button>
                  <ResultsPreview
                    loading={phase === "loading"}
                    query={query}
                    results={results}
                    highlightIssuer={highlightIssuer}
                    language={language}
                    onChipSelect={(chip) => runSearch(chip)}
                  />
                </div>
              )}
            </div>

            <section className="mt-8" aria-label={t(language, "schemeCoverage")}>
              <div className="mb-3 flex items-center justify-between">
                <h2 className="text-sm font-semibold text-muted-foreground">{t(language, "schemeCoverage")}</h2>
              </div>
              <MetricCards
                compact={compact}
                activeKey={activeMetric}
                language={language}
                onSelect={handleCoverageSelect}
              />
            </section>

            {phase === "input" && (
              <div className="mt-8 flex flex-wrap items-center justify-center gap-3 text-xs text-muted-foreground">
                <span className="inline-flex items-center gap-1.5">
                  <Settings2 className="size-3.5" aria-hidden />
                  {t(language, "defaultInput")}:{" "}
                  <span className="font-semibold text-foreground">{prefs?.defaultInput ?? mode}</span>
                </span>
                <button
                  type="button"
                  onClick={() => update({ defaultInput: mode })}
                  className="rounded-full border border-border px-2.5 py-1 font-medium transition-colors hover:border-primary hover:text-foreground"
                >
                  {t(language, "setAsDefault")}
                </button>
              </div>
            )}
          </>
        )}

        {activeTab === "matches" && (
          <div className="pt-6">
            <h2 className="text-xl font-bold text-[#0b3d6e]">{t(language, "matchesTitle")}</h2>
            <p className="mt-1 text-sm text-muted-foreground">{t(language, "matchesSubtitle")}</p>
            <div className="mt-4">
              <ResultsPreview
                loading={false}
                query={matchQuery}
                results={matchResults}
                highlightIssuer={highlightIssuer}
                coverageFilter={activeMetric}
                language={language}
                onChipSelect={(chip) => runSearch(chip, { instant: true })}
              />
            </div>
            <section className="mt-8" aria-label={t(language, "schemeCoverage")}>
              <h3 className="mb-3 text-sm font-semibold text-muted-foreground">{t(language, "schemeCoverage")}</h3>
              <MetricCards
                compact={compact}
                activeKey={activeMetric}
                language={language}
                onSelect={handleCoverageSelect}
              />
            </section>
          </div>
        )}

        {activeTab === "partners" && <PartnerLocator language={language} />}

        {activeTab === "calculator" && <FinancialCalculator language={language} />}
      </main>

      <Footer />

      <NyayaAssistant
        open={assistantOpen}
        onOpen={() => setAssistantOpen(true)}
        onClose={() => setAssistantOpen(false)}
        onViewSchemes={viewAssistantSchemes}
      />
    </div>
  )
}

function CompactBanner() {
  return (
    <div className="mt-6 flex items-start gap-3 rounded-xl border border-border bg-surface p-3.5 text-surface-foreground">
      <WifiOff className="mt-0.5 size-5 shrink-0 text-primary" aria-hidden />
      <div className="text-sm">
        <p className="font-semibold">Low-data mode</p>
        <p className="mt-0.5 text-xs text-muted-foreground">
          Images are off and content is trimmed for slow networks. Showing cached scheme counts.
        </p>
        <div className="mt-2 inline-flex items-center gap-1.5 rounded-full bg-card px-2.5 py-1 text-xs font-medium text-card-foreground">
          <Mic className="size-3.5 text-primary" aria-hidden />
          Voice queries will be recorded and sent when back online.
        </div>
      </div>
    </div>
  )
}
