import { useState } from "react"
import { ChevronRight, Mail, MapPin, Phone, Share2 } from "lucide-react"
import { Modal } from "@/components/ui/modal"

const QUICK_LINKS = [
  { id: "about", label: "About Us" },
  { id: "contact", label: "Contact Us" },
  { id: "screen-reader", label: "Screen Reader" },
  { id: "accessibility", label: "Accessibility Statement" },
  { id: "faq", label: "FAQs" },
  { id: "disclaimer", label: "Disclaimer" },
  { id: "terms", label: "Terms & Conditions" },
  { id: "dashboard", label: "Scheme Dashboard" },
]

const PORTALS = [
  { name: "Digital India", href: "https://www.digitalindia.gov.in", logo: "/digital-india.png" },
  { name: "DigiLocker", href: "https://www.digilocker.gov.in", logo: "/digilocker.png" },
  { name: "UMANG", href: "https://web.umang.gov.in", logo: "/umang.png" },
]

const FAQS = [
  {
    q: "How is eligibility calculated?",
    a: "Eligibility is computed from DigiLocker-verified income, artisan/trade category, project cost, and MoSJE / NSFDC scheme ceilings. NYAYASETU assigns a match score; it does not sanction a loan.",
  },
  {
    q: "How do I track my application?",
    a: "After you apply through a listed channel partner (SCA, public sector bank, or RRB), use the partner acknowledgement number on the Scheme Dashboard or the bank’s portal. NYAYASETU shows match status only, not disbursement.",
  },
  {
    q: "Which documents are required for MoSJE-linked schemes?",
    a: "Typically Aadhaar, income certificate, caste/category certificate where applicable, and proof of trade (weaver/artisan ID). Auto-fill via DigiLocker is a demo convenience and must be verified by the partner.",
  },
  {
    q: "Does a high match score guarantee subsidy or credit?",
    a: "No. A match indicates likely fit with published scheme rules. Final sanction, interest, moratorium, and subsidy release rest with the concerned bank or State Channelising Agency.",
  },
]

const LEGAL_TEXT = `NYAYASETU is a scheme-matching engine operated for demonstration under Smart India Hackathon 2026. It surfaces concessional credit and subsidy programmes associated with the Ministry of Social Justice and Empowerment (MoSJE) and partner institutions on the basis of self-declared or DigiLocker-demo profile data.

Nothing on this portal constitutes an offer of finance, a government order, or an entitlement. Recommendation scores are indicative. Final loan or subsidy approval, quantum, rate of interest, security, and disbursement depend solely on the concerned partner bank, State Channelising Agency, or implementing department after independent due diligence.

Users shall not treat displayed EMI figures, partner locations, or document auto-fill as legally binding. The Government of India, MoSJE, and Team Zero Gravity accept no liability for decisions taken solely on the basis of this matching interface.`

function ModalBody({ id }) {
  if (id === "faq") {
    return (
      <ul className="space-y-4">
        {FAQS.map((item) => (
          <li key={item.q}>
            <p className="font-semibold text-[#0b3d6e]">{item.q}</p>
            <p className="mt-1 text-slate-600">{item.a}</p>
          </li>
        ))}
      </ul>
    )
  }

  if (id === "terms" || id === "disclaimer") {
    return <p className="whitespace-pre-line">{LEGAL_TEXT}</p>
  }

  if (id === "contact") {
    return (
      <ul className="space-y-3">
        <li>
          <span className="font-medium">Address: </span>
          Shastri Bhawan, Dr. Rajendra Prasad Road, New Delhi - 110001
        </li>
        <li>
          <span className="font-medium">Email: </span>
          nyayasetu26@gov.in
        </li>
        <li>
          <span className="font-medium">Helpline: </span>
          1800-11-0031 / 14566 (9:00 AM to 5:30 PM)
        </li>
      </ul>
    )
  }

  if (id === "about") {
    return (
      <p>
        NYAYASETU is the National Scheme Matching Portal for marginalized entrepreneurs. It helps
        artisans, weavers, and first-generation borrowers discover MoSJE-linked credit and subsidy
        schemes in their own language.
      </p>
    )
  }

  if (id === "screen-reader") {
    return (
      <p>
        This portal is designed to work with NVDA, JAWS, and TalkBack. Use the language selector in
        the ministry ribbon and the Voice AI Search tab for spoken queries. Skip to main content by
        activating the first heading after the ribbon.
      </p>
    )
  }

  if (id === "accessibility") {
    return (
      <p>
        NYAYASETU aims to conform to GIGW and WCAG 2.1 AA for public digital services. Colour is not
        the only indicator of status; scheme matches also use text badges. Report barriers to
        nyayasetu26@gov.in.
      </p>
    )
  }

  if (id === "dashboard") {
    return (
      <p>
        The Scheme Dashboard lists matched programmes, coverage filters (Central / State), and
        partner locator status. Application tracking after submission is provided by the partner
        bank or SCA, not by this matching engine.
      </p>
    )
  }

  return <p>Information will be published here.</p>
}

export function Footer() {
  const [modalId, setModalId] = useState(null)
  const active = QUICK_LINKS.find((link) => link.id === modalId)

  return (
    <footer className="bg-[#211e3b] text-slate-200">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-12 sm:px-6 md:grid-cols-2 lg:grid-cols-4">
        <div>
          <p className="text-sm font-semibold text-white">© 2026 NYAYASETU</p>
          <p className="mt-3 text-xs leading-relaxed text-slate-300">
            Supported by Ministry of Social Justice and Empowerment (MoSJE) | Government of India
          </p>
          <button
            type="button"
            className="mt-5 inline-flex items-center gap-2 rounded-full border border-white/50 px-4 py-2 text-xs font-medium text-white transition hover:bg-white/10"
          >
            <Share2 className="size-3.5" aria-hidden />
            Connect on Social Media
          </button>
        </div>

        <div>
          <h2 className="text-sm font-semibold text-white">Quick Links</h2>
          <ul className="mt-4 space-y-2">
            {QUICK_LINKS.map((link) => (
              <li key={link.id}>
                <button
                  type="button"
                  onClick={() => setModalId(link.id)}
                  className="inline-flex items-center gap-1.5 text-left text-xs text-slate-300 hover:text-white"
                >
                  <ChevronRight className="size-3.5 shrink-0 text-slate-400" aria-hidden />
                  {link.label}
                </button>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="text-sm font-semibold text-white">Useful Links</h2>
          <div className="mt-4 grid grid-cols-2 gap-2">
            {PORTALS.map((portal) => (
              <a
                key={portal.name}
                href={portal.href}
                target="_blank"
                rel="noreferrer"
                className="flex min-h-[3.25rem] items-center justify-center rounded-md bg-white px-2 py-2 text-center text-[10px] font-semibold leading-tight text-slate-800 shadow-sm hover:bg-slate-100"
              >
                <img src={portal.logo} alt={portal.name} className="h-8 object-contain" />
              </a>
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-sm font-semibold text-white">Get in Touch</h2>
          <ul className="mt-4 space-y-3 text-xs leading-relaxed text-slate-300">
            <li className="flex gap-2">
              <MapPin className="mt-0.5 size-3.5 shrink-0 text-slate-400" aria-hidden />
              <span>Shastri Bhawan, Dr. Rajendra Prasad Road, New Delhi - 110001</span>
            </li>
            <li className="flex gap-2">
              <Mail className="mt-0.5 size-3.5 shrink-0 text-slate-400" aria-hidden />
              <span>nyayasetu26@gov.in</span>
            </li>
            <li className="flex gap-2">
              <Phone className="mt-0.5 size-3.5 shrink-0 text-slate-400" aria-hidden />
              <span>1800-11-0031 / 14566 (9:00 AM to 5:30 PM)</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/15">
        <div className="mx-auto flex max-w-6xl flex-col gap-2 px-4 py-3 pb-24 text-[11px] text-slate-400 sm:flex-row sm:items-center sm:justify-between sm:px-6 md:pb-3">
          <p>Last Updated On : 29/08/2026 | v-1.0.4</p>
          <p>Smart India Hackathon 2026 | Team Zero Gravity</p>
        </div>
      </div>

      <Modal open={Boolean(active)} title={active?.label ?? ""} onClose={() => setModalId(null)}>
        {active ? <ModalBody id={active.id} /> : null}
      </Modal>
    </footer>
  )
}
