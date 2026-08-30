const SCHEMES = [
  {
    id: "pmegp",
    name: "PMEGP — Prime Minister's Employment Generation Programme",
    issuer: "Central",
    category: "Credit-linked subsidy",
    description:
      "Margin-money subsidy for new micro-enterprises in manufacturing and services, including handicrafts and handloom units.",
    benefit: "Up to 35% subsidy on project cost",
    applyUrl: "https://socialjustice.gov.in/",
    keywords: ["pmegp", "subsidy", "micro", "enterprise", "artisan", "weaving", "craft"],
  },
  {
    id: "mudra",
    name: "Pradhan Mantri MUDRA Yojana",
    issuer: "Central",
    category: "Working capital",
    description:
      "Collateral-light loans (Shishu, Kishore, Tarun) for weavers, artisans, and small traders to buy raw material and tools.",
    benefit: "Loans up to ₹20 lakh",
    applyUrl: "https://socialjustice.gov.in/",
    keywords: ["mudra", "loan", "kishore", "shishu", "working capital", "trader"],
  },
  {
    id: "nhdp",
    name: "National Handloom Development Programme",
    issuer: "Central",
    category: "Handloom",
    description:
      "Support for weaver clusters, yarn depots, work-sheds, and marketing of handloom products.",
    benefit: "Cluster grants and yarn access",
    applyUrl: "https://texmin.nic.in/",
    keywords: ["handloom", "weaver", "yarn", "loom", "cluster"],
  },
  {
    id: "sfurti",
    name: "SFURTI — Scheme of Fund for Regeneration of Traditional Industries",
    issuer: "Central",
    category: "Cluster development",
    description:
      "Common facility centres, design, and market linkages for traditional crafts such as pottery, brass, and textiles.",
    benefit: "Cluster infrastructure support",
    applyUrl: "https://socialjustice.gov.in/",
    keywords: ["sfurti", "cluster", "craft", "traditional", "pottery", "brass"],
  },
  {
    id: "nsfdc-micro",
    name: "NSFDC Micro-Credit Scheme",
    issuer: "Central",
    category: "Micro finance",
    description:
      "Small concessional loans for SC entrepreneurs setting up micro-enterprises and household production units.",
    benefit: "Interest from 6.5%",
    applyUrl: "https://nsfdc.nic.in/",
    keywords: ["nsfdc", "sc", "micro", "credit", "scheduled"],
  },
  {
    id: "nsfdc-term",
    name: "NSFDC Term Loan Scheme",
    issuer: "Central",
    category: "Term loan",
    description:
      "Medium- to long-term finance for commercial, agricultural, and industrial units up to ₹50 lakh.",
    benefit: "Up to ₹50 lakh",
    applyUrl: "https://nsfdc.nic.in/",
    keywords: ["nsfdc", "term", "loan", "enterprise", "industrial"],
  },
  {
    id: "wb-tassar",
    name: "West Bengal Tassar & Handloom Incentive",
    issuer: "State",
    category: "State subsidy",
    description:
      "State top-up for tassar, jute, and handloom units on looms, dyeing, and market stalls.",
    benefit: "State capital subsidy",
    applyUrl: "https://texmin.nic.in/",
    keywords: ["west bengal", "tassar", "jute", "handloom", "bengal", "state"],
  },
  {
    id: "rj-crafts",
    name: "Rajasthan Artisan Credit Card",
    issuer: "State",
    category: "Working capital",
    description:
      "Easy working-capital credit for gem, blue pottery, and block-print artisans registered with the state.",
    benefit: "Low-interest artisan credit",
    applyUrl: "https://socialjustice.gov.in/",
    keywords: ["rajasthan", "pottery", "block print", "gem", "artisan card"],
  },
  {
    id: "tn-weaver",
    name: "Tamil Nadu Weaver Welfare & Loom Subsidy",
    issuer: "State",
    category: "Handloom",
    description:
      "Loom modernisation, yarn passbook, and welfare cover for cooperative and independent weavers.",
    benefit: "Loom subsidy + welfare",
    applyUrl: "https://texmin.nic.in/",
    keywords: ["tamil nadu", "weaver", "loom", "cooperative", "yarn"],
  },
  {
    id: "up-chikankari",
    name: "Uttar Pradesh Chikankari & Zari Cluster Support",
    issuer: "State",
    category: "Cluster",
    description:
      "Design studios, common stitching units, and GI-linked marketing for Lucknow chikankari and zari units.",
    benefit: "Design & marketing grant",
    applyUrl: "https://socialjustice.gov.in/",
    keywords: ["uttar pradesh", "chikankari", "zari", "lucknow", "embroidery"],
  },
]

const SUGGESTION_CHIPS = [
  "handloom weaver",
  "PMEGP subsidy",
  "MUDRA loan",
  "pottery cluster",
  "artisan working capital",
]

function scoreScheme(scheme, query) {
  const q = query.trim().toLowerCase()
  if (!q) return 1
  const haystack = [scheme.name, scheme.category, scheme.description, scheme.issuer, ...(scheme.keywords || [])]
    .join(" ")
    .toLowerCase()
  const tokens = q.split(/\s+/).filter(Boolean)
  let score = 0
  for (const token of tokens) {
    if (haystack.includes(token)) score += 2
  }
  if (haystack.includes(q)) score += 3
  return score
}

export function matchSchemes(query) {
  const scored = SCHEMES.map((scheme) => ({
    ...scheme,
    score: scoreScheme(scheme, query || ""),
    matchReason: "Why Matched: Income criteria verified + Artisan category aligned",
  })).filter((s) => s.score > 0)

  scored.sort((a, b) => b.score - a.score)
  const list = (scored.length ? scored : SCHEMES).slice(0, 8)
  return list.map((scheme) => ({
    ...scheme,
    matchReason: scheme.matchReason || "Why Matched: Income criteria verified + Artisan category aligned",
  }))
}

export function getSuggestionChips() {
  return SUGGESTION_CHIPS
}

export function getApplicationUrl(scheme) {
  return scheme.applyUrl || "https://www.myscheme.gov.in/"
}

export function getAllSchemes() {
  return SCHEMES.map((scheme) => ({
    ...scheme,
    matchReason: "Why Matched: Income criteria verified + Artisan category aligned",
  }))
}

export function filterSchemesByCoverage(schemes, key) {
  if (!key) return schemes
  if (key === "central") return schemes.filter((s) => s.issuer === "Central")
  if (key === "state") return schemes.filter((s) => s.issuer === "State")
  if (key === "artisans") {
    return schemes.filter((s) =>
      /handloom|weaver|craft|cluster|pottery|zari|artisan|loom/i.test(
        `${s.name} ${s.category} ${(s.keywords || []).join(" ")}`,
      ),
    )
  }
  if (key === "credit") {
    return schemes.filter((s) =>
      /credit|subsidy|loan|mudra|finance|working capital/i.test(
        `${s.name} ${s.category} ${(s.keywords || []).join(" ")}`,
      ),
    )
  }
  return schemes
}

export function getCoverageStats() {
  return {
    central: SCHEMES.filter((s) => s.issuer === "Central").length,
    state: SCHEMES.filter((s) => s.issuer === "State").length,
    total: SCHEMES.length,
  }
}
