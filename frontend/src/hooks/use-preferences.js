import { useCallback, useEffect, useState } from "react"

const STORAGE_KEY = "nyayasetu-preferences"

const DEFAULT_PREFS = {
  language: "hi",
  defaultInput: "voice",
  lastSearch: "",
  name: "",
  trade: "",
  income: "",
  digiLockerLinked: false,
}

function readPrefs() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return null
    return { ...DEFAULT_PREFS, ...JSON.parse(raw) }
  } catch {
    return null
  }
}

function writePrefs(prefs) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(prefs))
}

export function usePreferences() {
  const [prefs, setPrefs] = useState(null)
  const [hydrated, setHydrated] = useState(false)

  useEffect(() => {
    setPrefs(readPrefs())
    setHydrated(true)
  }, [])

  const save = useCallback((next) => {
    const merged = { ...DEFAULT_PREFS, ...next }
    writePrefs(merged)
    setPrefs(merged)
  }, [])

  const update = useCallback((partial) => {
    setPrefs((current) => {
      const merged = { ...DEFAULT_PREFS, ...current, ...partial }
      writePrefs(merged)
      return merged
    })
  }, [])

  return { prefs, hydrated, save, update }
}
