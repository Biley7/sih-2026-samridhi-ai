import { useMemo, useState } from "react"
import { Calculator } from "lucide-react"
import { Button } from "@/components/ui/button"
import { t } from "@/data/translations"

function computeEmi(loanAmount, interestRate, tenureMonths, moratoriumMonths) {
  const P = Number(loanAmount) || 0
  const n = Number(tenureMonths) || 1
  const m = Number(moratoriumMonths) || 0
  const r = Number(interestRate) / 12 / 100
  const emi = r === 0 ? P / n : (P * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1)
  const totalPayable = emi * n
  const totalInterest = totalPayable - P
  const schedule = []
  let balance = P
  for (let month = 1; month <= Math.min(n + m, 6); month += 1) {
    if (month <= m) {
      const interest = P * r
      schedule.push({
        month,
        paymentType: "MORATORIUM",
        emi: 0,
        interest,
        remainingBalance: P,
      })
    } else {
      const interest = balance * r
      const principal = emi - interest
      balance = Math.max(0, balance - principal)
      schedule.push({
        month,
        paymentType: "EMI",
        emi,
        interest,
        remainingBalance: balance,
      })
    }
  }
  return { monthlyEMI: emi, totalInterest, totalPayable, schedule }
}

function inr(n) {
  return `₹${Number(n).toLocaleString("en-IN", { maximumFractionDigits: 2 })}`
}

export function FinancialCalculator({ language = "en" }) {
  const [loanAmount, setLoanAmount] = useState("100000")
  const [interestRate, setInterestRate] = useState("6.5")
  const [tenureMonths, setTenureMonths] = useState("36")
  const [moratoriumMonths, setMoratoriumMonths] = useState("3")
  const [result, setResult] = useState(null)

  const preview = useMemo(
    () => computeEmi(loanAmount, interestRate, tenureMonths, moratoriumMonths),
    [loanAmount, interestRate, tenureMonths, moratoriumMonths],
  )

  function handleSubmit(e) {
    e.preventDefault()
    setResult(computeEmi(loanAmount, interestRate, tenureMonths, moratoriumMonths))
  }

  const shown = result || preview

  return (
    <section className="pt-6">
      <h2 className="flex items-center gap-2 text-xl font-bold text-[#0b3d6e]">
        <Calculator className="size-5" />
        {t(language, "calculatorTitle")}
      </h2>
      <p className="mt-1 text-sm text-muted-foreground">{t(language, "calculatorSubtitle")}</p>

      <div className="bg-amber-50 border border-amber-200 p-3 rounded-lg flex items-center mb-4">
        <img src="/rbi.png" alt="RBI" className="h-10 object-contain mr-3" />
        <p>Calculations align with Reserve Bank of India (RBI) Priority Sector Lending guidelines.</p>
      </div>

      <form onSubmit={handleSubmit} className="mt-3 grid gap-3 rounded-xl border border-border bg-white p-4 md:grid-cols-2">
        <label className="text-sm font-medium">
          {t(language, "loanAmount")}
          <input
            value={loanAmount}
            onChange={(e) => setLoanAmount(e.target.value)}
            className="mt-1 h-11 w-full rounded-lg border border-border bg-background px-3 text-sm"
          />
        </label>
        <label className="text-sm font-medium">
          {t(language, "interestRate")}
          <input
            value={interestRate}
            onChange={(e) => setInterestRate(e.target.value)}
            className="mt-1 h-11 w-full rounded-lg border border-border bg-background px-3 text-sm"
          />
        </label>
        <label className="text-sm font-medium">
          {t(language, "tenure")}
          <input
            value={tenureMonths}
            onChange={(e) => setTenureMonths(e.target.value)}
            className="mt-1 h-11 w-full rounded-lg border border-border bg-background px-3 text-sm"
          />
        </label>
        <label className="text-sm font-medium">
          {t(language, "moratorium")}
          <input
            value={moratoriumMonths}
            onChange={(e) => setMoratoriumMonths(e.target.value)}
            className="mt-1 h-11 w-full rounded-lg border border-border bg-background px-3 text-sm"
          />
        </label>
        <div className="md:col-span-2">
          <Button type="submit" className="w-full md:w-auto">
            {t(language, "calculateEmi")}
          </Button>
        </div>
      </form>

      <div className="mt-4 grid grid-cols-2 gap-3 md:grid-cols-3">
        <div className="rounded-xl border border-border bg-white p-4">
          <p className="text-xs text-muted-foreground">{t(language, "monthlyEmi")}</p>
          <p className="mt-1 text-lg font-bold text-[#0b3d6e]">{inr(shown.monthlyEMI)}</p>
        </div>
        <div className="rounded-xl border border-border bg-white p-4">
          <p className="text-xs text-muted-foreground">{t(language, "totalInterest")}</p>
          <p className="mt-1 text-lg font-bold">{inr(shown.totalInterest)}</p>
        </div>
        <div className="col-span-2 rounded-xl border border-border bg-white p-4 md:col-span-1">
          <p className="text-xs text-muted-foreground">{t(language, "totalPayable")}</p>
          <p className="mt-1 text-lg font-bold">{inr(shown.totalPayable)}</p>
        </div>
      </div>

      <div className="mt-4 overflow-x-auto rounded-xl border border-border bg-white">
        <table className="w-full text-left text-xs">
          <thead className="bg-slate-50 text-muted-foreground">
            <tr>
              <th className="px-3 py-2 font-medium">{t(language, "month")}</th>
              <th className="px-3 py-2 font-medium">{t(language, "type")}</th>
              <th className="px-3 py-2 font-medium">{t(language, "emi")}</th>
              <th className="px-3 py-2 font-medium">{t(language, "interest")}</th>
              <th className="px-3 py-2 font-medium">{t(language, "balance")}</th>
            </tr>
          </thead>
          <tbody>
            {shown.schedule.map((row) => (
              <tr key={row.month} className="border-t border-border">
                <td className="px-3 py-2">{row.month}</td>
                <td className="px-3 py-2">{row.paymentType}</td>
                <td className="px-3 py-2">{inr(row.emi)}</td>
                <td className="px-3 py-2">{inr(row.interest)}</td>
                <td className="px-3 py-2">{inr(row.remainingBalance)}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <p className="border-t border-border px-3 py-2 text-[11px] text-muted-foreground">
          {t(language, "scheduleNote")}
        </p>
      </div>
    </section>
  )
}
