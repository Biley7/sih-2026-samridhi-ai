import { ShieldCheck } from "lucide-react"
import { Button } from "@/components/ui/button"
import { t } from "@/data/translations"

export function ProfileStrip({ profile, onDigiLocker, language = "en" }) {
  const linked = Boolean(profile?.digiLockerLinked || profile?.name)

  return (
    <section className="rounded-xl border border-border bg-white p-4 shadow-sm">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-[#0066b3]">
            {t(language, "applicantProfile")}
          </p>
          {linked ? (
            <dl className="mt-2 grid gap-1 text-sm">
              <div>
                <dt className="inline text-muted-foreground">{t(language, "name")}: </dt>
                <dd className="inline font-medium">{profile.name}</dd>
              </div>
              <div>
                <dt className="inline text-muted-foreground">{t(language, "trade")}: </dt>
                <dd className="inline font-medium">{profile.trade}</dd>
              </div>
              <div>
                <dt className="inline text-muted-foreground">{t(language, "income")}: </dt>
                <dd className="inline font-medium">{profile.income}</dd>
              </div>
            </dl>
          ) : (
            <p className="mt-1 text-sm text-muted-foreground">{t(language, "digiLockerHint")}</p>
          )}
        </div>
        <Button
          type="button"
          variant="digilocker"
          onClick={(e) => {
            e.preventDefault()
            e.stopPropagation()
            onDigiLocker(e)
          }}
        >
          <ShieldCheck className="size-4" />
          {t(language, "autoFillDigiLocker")}
        </Button>
      </div>
    </section>
  )
}
