import { ShieldCheck } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DIGILOCKER_DEMO_PROFILE } from "@/lib/digilocker"

export function ProfileStrip({ profile, onDigiLocker }) {
  const linked = Boolean(profile?.digiLockerLinked || profile?.name)

  return (
    <section className="rounded-xl border border-border bg-white p-4 shadow-sm">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-[#0066b3]">Applicant profile</p>
          {linked ? (
            <dl className="mt-2 grid gap-1 text-sm">
              <div>
                <dt className="inline text-muted-foreground">Name: </dt>
                <dd className="inline font-medium">{profile.name}</dd>
              </div>
              <div>
                <dt className="inline text-muted-foreground">Trade: </dt>
                <dd className="inline font-medium">{profile.trade}</dd>
              </div>
              <div>
                <dt className="inline text-muted-foreground">Income: </dt>
                <dd className="inline font-medium">{profile.income}</dd>
              </div>
            </dl>
          ) : (
            <p className="mt-1 text-sm text-muted-foreground">
              Link DigiLocker to auto-fill name, trade, and income for matching.
            </p>
          )}
        </div>
        <Button type="button" variant="digilocker" onClick={onDigiLocker}>
          <ShieldCheck className="size-4" />
          Auto-fill with DigiLocker
        </Button>
      </div>
    </section>
  )
}
