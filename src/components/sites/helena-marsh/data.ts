export interface NavLink {
  label: string;
  href: string;
}

export const NAV_LINKS: NavLink[] = [
  { label: "Advisory", href: "/coaching" },
  { label: "Results", href: "/results" },
  { label: "About", href: "/about" },
  { label: "Insights", href: "/insights" },
  { label: "Speaking", href: "/speaking" },
];

export const CLIENT_NAMES: string[] = [
  "OmniCorp Infrastructure",
  "Nexus FinTech Labs",
  "Aura Health Systems",
  "Paramount Capital",
  "Apex Logistics & Rail",
  "Solarium Renewable Power",
  "Titanium Aerospace",
  "The Kothari Family Office",
  "SERIES D FINTECH UNICORN",
  "LISTED PHARMA CONGLOMERATE",
  "CROSS-BORDER MANUFACTURING GROUP",
  "NATIONAL INFRASTRUCTURE TRUST",
];

export interface HeroQuote {
  quote: string;
  role: string;
  author?: string;
}

export const HERO_QUOTES: HeroQuote[] = [
  {
    quote: "Fenil is the only person who spots the balance sheet risk before the rating agency or audit committee does.",
    author: "Priya N.",
    role: "GROUP CFO — SERIES D FINTECH",
  },
  {
    quote: "In three months of restructuring our multi-entity tax architecture, he unlocked ₹42 Cr in EBITDA leakage that had been buried for five years.",
    author: "Rajesh V.",
    role: "PROMOTER & MD — INFRASTRUCTURE CONGLOMERATE",
  },
  {
    quote: "I came for statutory audit clearance. I left with an unshakeable five-year capital structure and zero diligence red flags.",
    author: "Ananya S.",
    role: "VP FINANCE — PUBLIC SAAS",
  },
];

export const HERO_STATS = [
  { number: "₹14,000+ Cr", label: "CAPITAL & ASSETS ASSURED" },
  { number: "180+", label: "STATUTORY & STRATEGIC MANDATES" },
  { number: "FCA", label: "FELLOW CHARTERED ACCOUNTANT (ICAI)" },
];

export interface WhoRow {
  number: string;
  title: string;
  line: string;
  image: string;
}

export const WHO_ROWS: WhoRow[] = [
  {
    number: "01",
    title: "Founders & Promoters",
    line: "scaling from ₹50 Cr to ₹500+ Cr who need sovereign financial governance",
    image: "/sites/helena-marsh/images/who-founders.webp",
  },
  {
    number: "02",
    title: "Newly Appointed CFOs",
    line: "navigating board scrutiny, audit committees, and institutional capital raising",
    image: "/sites/helena-marsh/images/who-ceos.webp",
  },
  {
    number: "03",
    title: "Pre-IPO Scaleups",
    line: "institutionalizing internal financial controls, Ind AS/IFRS, and diligence defense",
    image: "/sites/helena-marsh/images/who-executives.webp",
  },
  {
    number: "04",
    title: "Board Audit Committees",
    line: "demanding unvarnished fiscal transparency and proactive forensic risk oversight",
    image: "/sites/helena-marsh/images/who-teams.webp",
  },
];

export interface MethodStep {
  number: string;
  title: string;
  description: string;
  image: string;
}

export const METHOD_STEPS: MethodStep[] = [
  {
    number: "01",
    title: "Forensic Baseline",
    description:
      "Before restructuring begins, we conduct a forensic audit of balance sheets, working capital leakage, tax exposures, and hidden covenants. You receive the unedited fiscal truth.",
    image: "/sites/helena-marsh/images/method-audit.webp",
  },
  {
    number: "02",
    title: "Capital & Tax Architecture",
    description:
      "We engineer defensible holding structures, cross-border transfer pricing models, debt rationalization, and EBITDA protection. Built for regulatory permanence.",
    image: "/sites/helena-marsh/images/method-structure.webp",
  },
  {
    number: "03",
    title: "Boardroom Execution",
    description:
      "Fortnightly strategic sparring: board paper review, banker covenant negotiations, M&A due diligence defense, and CFO prep before high-stakes committee meetings.",
    image: "/sites/helena-marsh/images/method-board.webp",
  },
  {
    number: "04",
    title: "Continuous Assurance",
    description:
      "Quarterly fiscal pulses, working capital velocity tracking, tax savings audits, and statutory defense sign-offs. We iterate until your balance sheet is unshakeable.",
    image: "/sites/helena-marsh/images/method-assurance.webp",
  },
];

export interface Program {
  title: string;
  slug: string;
  badge?: string;
  tagline: string;
  description: string;
  price: string;
  duration: string;
  includes: string[];
  forWhom: string;
  outcomes: string[];
  href: string;
}

export const PROGRAMS: Program[] = [
  {
    title: "The First Hundred Days",
    slug: "the-first-hundred-days",
    tagline: "Take command of the balance sheet before the market tests you.",
    description:
      "A high-intensity fiscal onboarding engagement for newly appointed CFOs and promoters scaling toward institutional investment: audit defense, treasury rationalization, and board reporting overhaul.",
    price: "₹9,50,000",
    duration: "14 WEEKS",
    includes: [
      "Six 90-minute strategic advisory sessions",
      "Comprehensive balance sheet & tax exposure audit",
      "Audit committee & board rehearsal simulation",
      "Direct priority channel between meetings",
      "Full internal financial control overhaul",
    ],
    forWhom: "Newly appointed CFOs, Group Financial Controllers, and Founders preparing for institutional capital rounds.",
    outcomes: [
      "Audit committee alignment achieved in first 45 days",
      "Internal controls & cashflow leakages plugged",
      "Defensible 3-year capital allocation model delivered",
    ],
    href: "/coaching/the-first-hundred-days",
  },
  {
    title: "The Retained Strategic Advisor",
    slug: "the-principal-year",
    tagline: "One strategic session a fortnight. Twelve months. An unshakeable balance sheet.",
    description:
      "The principal corporate advisory retainer. Ongoing M&A structuring, internal financial controls, quarterly board audit preparation, and proactive regulatory and tax risk mitigation.",
    price: "₹2,50,000 / MONTH",
    duration: "12 MONTHS",
    includes: [
      "24 fortnightly strategic advisory reviews",
      "Four quarterly board audit committee briefings",
      "Two on-site treasury & operations review days",
      "Direct sponsor & promoter counsel",
      "Unlimited priority advisory calls",
    ],
    forWhom: "Promoters, Board of Directors, and CEOs managing high-growth enterprises, conglomerates, or cross-border expansion.",
    outcomes: [
      "Quarterly board audit clearance without surprises",
      "Multi-entity tax optimization & transfer pricing defense",
      "Sovereign treasury & working capital velocity",
    ],
    href: "/coaching/the-principal-year",
  },
  {
    title: "The Institutional Bench",
    slug: "the-leadership-bench",
    tagline: "Architect the financial foundation to carry the next decade of growth.",
    description:
      "Full-scale corporate restructuring, capital allocation modeling, entity consolidation, and vendor/buy-side due diligence for leadership teams executing cross-border growth.",
    price: "FROM ₹35,00,000",
    duration: "6 MONTHS",
    includes: [
      "Corporate diagnostic & multi-entity fiscal map",
      "Four full-day executive finance strategy workshops",
      "Individual advisory for finance heads & directors",
      "Capital allocation & tax architecture redesign",
      "Comprehensive buy-side/sell-side diligence pack",
    ],
    forWhom: "Executive leadership teams, family offices, and conglomerate boards restructuring entities for private equity or public listing.",
    outcomes: [
      "End-to-end buy/sell-side financial due diligence clearance",
      "Consolidation of holding entities & regulatory approval",
      "Institutional valuation defense for investor rounds",
    ],
    href: "/coaching/the-leadership-bench",
  },
];

export interface CaseStudy {
  client: string;
  title: string;
  story: string;
  metric1: { value: string; label: string };
  metric2: { value: string; label: string };
  image: string;
}

export const RESULTS_STATS = [
  { value: "₹14,800 Cr+", label: "CAPITAL & ASSETS ASSURED" },
  { value: "99.4%", label: "AUDIT & COMPLIANCE SUCCESS" },
  { value: "14+ yrs", label: "OF BOARDROOM FINANCIAL ADVISORY" },
];

export const CASE_STUDIES: CaseStudy[] = [
  {
    client: "SERIES D FINTECH UNICORN",
    title: "From complex multi-ledger books to clean Big-4 audit clearance and IPO filing.",
    story:
      "Promoted to Group CFO ahead of a ₹850 Cr institutional round. We restructured internal controls, Ind AS conversions, and board audit governance to deliver seamless clearance.",
    metric1: { value: "100%", label: "BIG-4 AUDIT CLEARANCE" },
    metric2: { value: "₹850 Cr", label: "IPO PIPELINE UNLOCKED" },
    image: "/sites/helena-marsh/images/case-fintech.webp",
  },
  {
    client: "MANUFACTURING CONGLOMERATE",
    title: "A multi-state industrial group eliminating structural tax leakage.",
    story:
      "Thirty-two subsidiary entities with trapped credits and fragmented treasury. One year of corporate rationalization unlocked ₹42 Cr in EBITDA savings and quadrupled liquidity.",
    metric1: { value: "₹42 Cr", label: "ANNUAL TAX SAVINGS" },
    metric2: { value: "4.8×", label: "WORKING CAPITAL VELOCITY" },
    image: "/sites/helena-marsh/images/case-manufacturing.webp",
  },
  {
    client: "CROSS-BORDER SAAS & HEALTHTECH",
    title: "Navigating cross-border transfer pricing and ₹180 Cr Series B due diligence.",
    story:
      "High tech talent with fragmented international revenue structures. We engineered compliant transfer pricing models and audit-proofed IP ownership with zero diligence red flags.",
    metric1: { value: "₹180 Cr", label: "CAPITAL ROUND CLOSED" },
    metric2: { value: "0", label: "DILIGENCE RED FLAGS" },
    image: "/sites/helena-marsh/images/case-healthtech.webp",
  },
  {
    client: "LISTED INFRASTRUCTURE TRUST",
    title: "Consolidating eleven operating subsidiaries through a complex merger.",
    story:
      "Two corporate cultures and ₹3,200 Cr of debt covenants. We streamlined capital reporting, synchronized statutory filings, and reduced compliance overhead by 24%.",
    metric1: { value: "16", label: "ENTITIES CONSOLIDATED" },
    metric2: { value: "−24%", label: "COMPLIANCE OVERHEAD" },
    image: "/sites/helena-marsh/images/case-conglomerate.webp",
  },
];

export interface VoiceCard {
  quote: string;
  name: string;
  role: string;
  theme: "dark" | "stone" | "pine" | "brass" | "cream";
}

export const VOICES: VoiceCard[] = [
  {
    quote: "Fenil is the only advisor who tells me the hard financial truth before the board audit committee does.",
    name: "Priya N.",
    role: "GROUP CFO — SERIES D FINTECH",
    theme: "cream",
  },
  {
    quote: "In three months of restructuring our multi-entity tax architecture, he unlocked ₹42 Cr in EBITDA leakage that had been buried for five years.",
    name: "Rajesh V.",
    role: "PROMOTER & MD — INFRASTRUCTURE CONGLOMERATE",
    theme: "dark",
  },
  {
    quote: "I came for statutory compliance. I left with a defensible 5-year capital strategy and audit immunity.",
    name: "Ananya S.",
    role: "VP FINANCE — PUBLIC SAAS",
    theme: "stone",
  },
  {
    quote: "CA Fenil Shah does not offer generic platitudes. He diagnoses balance sheet rot that teams spend years hiding, then fixes it.",
    name: "Sir Vikram M.",
    role: "NON-EXECUTIVE CHAIR — LISTED TRUST",
    theme: "pine",
  },
  {
    quote: "The financial diagnostic was brutal and revelatory. Our working capital velocity doubled within six months.",
    name: "Marguerite L.",
    role: "GROUP COO — RETAIL & LOGISTICS",
    theme: "brass",
  },
];

export interface Article {
  slug: string;
  tag: string;
  date: string;
  readTime: string;
  title: string;
  excerpt: string;
  image: string;
  leadQuote?: string;
  leadParagraph?: string;
  sections?: { heading?: string; paragraphs: string[]; quote?: string; list?: string[] }[];
}

export const ARTICLES: Article[] = [
  {
    slug: "the-meeting-after-the-meeting",
    tag: "GOVERNANCE",
    date: "SEPTEMBER 2026",
    readTime: "6 MIN",
    title: "The Board Paper Nobody Reads: Fixing Financial Reporting Before It Destroys Value",
    excerpt:
      "If your board only reads the EBITDA summary and ignores the footnotes, your governance is theatre. How to bring forensic honesty back into the boardroom.",
    image: "/sites/helena-marsh/images/article-board-paper.webp",
    leadQuote: "If your board only reads the summary and ignores the cashflow statement, governance is theatre.",
    leadParagraph:
      "You have seen it: ten directors nod at a ₹500 Cr revenue projection, say nothing about ballooning receivables and trapped working capital, pack their tablets, and two of them whisper over coffee about liquidity fears. That corridor conversation is where fiscal reality lives.",
    sections: [
      {
        heading: "Why boards avoid probing complex numbers",
        paragraphs: [
          "Most board members hesitate to probe footnotes because the social cost of looking financially illiterate or confrontational feels high. When financial decks span eighty slides of dense spreadsheets, passive acquiescence becomes the default.",
          "The consequence is that balance sheet vulnerabilities fester until statutory auditors raise red flags or credit rating agencies downgrade debt covenants.",
        ],
        quote: "Footnotes are where companies bury what they hope you won't ask. An effective board paper makes reality impossible to overlook.",
      },
      {
        heading: "Restructuring the board finance agenda",
        paragraphs: [
          "Start by placing cashflow and balance sheet health before EBITDA. An enterprise does not go bankrupt from negative paper accounting profits; it goes bankrupt when cash runs out.",
        ],
        list: [
          "Lead with Free Cash Flow conversion ratio rather than top-line revenue growth.",
          "Highlight covenant headroom and debt maturity schedules upfront.",
          "Mandate an executive 'Red Flag Memo' highlighting top three fiscal vulnerabilities every quarter.",
        ],
      },
    ],
  },
  {
    slug: "your-first-ninety-days-are-not-a-plan",
    tag: "CFO TRANSITIONS",
    date: "AUGUST 2026",
    readTime: "8 MIN",
    title: "Your First Ninety Days as CFO: Establishing Fiscal Authority Over Inherited Numbers",
    excerpt:
      "New CFOs arrive with grand ERP and restructuring plans. The ones who succeed arrive with forensic audits and a zero-tolerance policy on legacy assumptions.",
    image: "/sites/helena-marsh/images/article-ebitda.webp",
    leadQuote: "New CFOs arrive with decks. The ones who endure arrive with unvarnished audit forensics.",
    leadParagraph:
      "A financial strategy formulated before verifying inherited balances is fiction. The first ninety days in the CFO chair are not about unveiling clever financing tricks. They are for establishing absolute ownership of the balance sheet and ensuring there are zero buried surprises.",
    sections: [
      {
        heading: "Conduct an uncompromising forensic baseline",
        paragraphs: [
          "Inspect every balance sheet line item, aging debtor, off-balance-sheet commitment, and open tax litigation. Do not accept 'that's how we've always accrued it' as an answer.",
        ],
        list: [
          "Reconcile statutory tax filings against ERP general ledgers immediately.",
          "Interview external statutory auditors without company promoters in the room.",
          "Map actual operational cash generation against reported accounting EBITDA.",
          "Identify and clean up legacy reconciliations that haven't moved in four quarters.",
        ],
      },
      {
        heading: "Publish the true baseline to the Audit Committee",
        paragraphs: [
          "A transparent baseline audit presented early builds irrevocable credibility. Take the write-downs and adjustments early; once you sign the next annual report, every legacy problem becomes your problem.",
        ],
        quote: "Inherited financial skeletons must be brought to daylight in quarter one, or they become your signature in quarter four.",
      },
    ],
  },
  {
    slug: "feedback-travels-upward-slowly",
    tag: "WORKING CAPITAL",
    date: "JULY 2026",
    readTime: "5 MIN",
    title: "EBITDA Is Not Cash: The Working Capital Traps That Destroy Profitable Companies",
    excerpt:
      "Profitable on the P&L, asphyxiated on the balance sheet. How rapid scale creates lethal cashflow compression.",
    image: "/sites/helena-marsh/images/article-tax.webp",
    leadQuote: "Companies do not fail for lack of profit. They fail from lack of liquidity.",
    leadParagraph:
      "By the time working capital stress triggers banker panic, the operational causes have been compounding for quarters. Revenue growth consumes cash voraciously: inventories build, DSO expands, and supplier credit reaches its breaking point.",
    sections: [
      {
        heading: "The anatomy of growth-induced insolvency",
        paragraphs: [
          "When a business doubles its turnover from ₹100 Cr to ₹200 Cr, its working capital requirements frequently triple if billing cycles and collections are lax. High reported profit masks the fact that every rupee of margin is locked in unpaid customer invoices.",
        ],
        quote: "Revenue is vanity, profit is sanity, but cash is sovereign reality.",
      },
      {
        heading: "Implementing a strict Cash Conversion Cycle discipline",
        paragraphs: [
          "Tie executive incentives and divisional leadership metrics to cash collection velocity, not merely booking invoice value.",
        ],
        list: [
          "Calculate Days Sales Outstanding (DSO) on weekly cohorts rather than quarter-end averages.",
          "Eliminate customer credit terms granted without rigorous financial risk scoring.",
          "Structure rolling 13-week direct cashflow forecasts reviewed weekly by the CFO.",
        ],
      },
    ],
  },
  {
    slug: "deciding-what-not-to-decide",
    tag: "CAPITAL ALLOCATION",
    date: "JUNE 2026",
    readTime: "7 MIN",
    title: "Capital Allocation Under Uncertainty: Distinguishing Reversible vs Irreversible Balance Sheet Bets",
    excerpt:
      "Capital stewardship is a discipline of restraint. Some capital expenditure decisions can be rolled back; some permanently alter your solvency profile.",
    image: "/sites/helena-marsh/images/article-diligence.webp",
    leadQuote: "Capital discipline is not about hoarding cash. It is knowing which investments are irreversible doors.",
    leadParagraph:
      "Most corporate finance failures stem from treating irreversible capital commitments (leveraged acquisitions, proprietary plant build-outs) with the same casual agility as reversible operational experiments.",
    sections: [
      {
        heading: "One-way doors vs two-way doors in corporate finance",
        paragraphs: [
          "Entering debt covenants with personal promoter guarantees or cross-collateralized corporate assets is a one-way door. Once signed, your enterprise's destiny is tied to interest rate cycles and market fluctuations.",
        ],
        quote: "In finance, survival is the prerequisite for compounding. Never risk what you cannot afford to lose for what you do not strictly need.",
      },
      {
        heading: "Building sovereign balance sheet buffers",
        paragraphs: [
          "Ensure your balance sheet maintains a minimum liquidity buffer capable of weathering twelve months of zero debt capital market access.",
        ],
        list: [
          "Stress-test cashflows against a 30% drop in margin and 200 bps hike in debt financing costs.",
          "Avoid financing long-term illiquid assets with short-term working capital lines.",
          "Ensure M&A returns exceed Weighted Average Cost of Capital (WACC) with a minimum 400 bps margin of safety.",
        ],
      },
    ],
  },
];

export interface FaqItem {
  question: string;
  answer: string;
  page?: "home" | "coaching" | "all";
}

export const FAQ_ITEMS: FaqItem[] = [
  {
    question: "What happens on a strategic chemistry consultation?",
    answer:
      "Twenty-five minutes, confidential and strictly non-committal. You present the financial or corporate governance challenge your enterprise is facing, I explain how we would audit and structure it, and we assess mutual fit. If outside our core mandate, I refer you to specialized practitioners.",
    page: "all",
  },
  {
    question: "Who retains the advisory mandate — the enterprise or the promoter privately?",
    answer:
      "Most strategic advisory and CFO retainers are engaged directly by the corporate entity or board audit committee; family office and succession mandates are often engaged privately by promoters. All disclosures are protected under strict professional non-disclosure agreements.",
    page: "all",
  },
  {
    question: "How does your advisory differ from traditional compliance accounting or Big-4 audit firms?",
    answer:
      "Traditional accounting firms focus on backward-looking statutory compliance and tax filing. Big-4 firms deploy junior teams executing standardized templates. CA Fenil Shah acts as a confidential boardroom peer: senior-led, forward-looking strategic capital structuring, audit defense, and unvarnished commercial advice.",
    page: "all",
  },
  {
    question: "How do you measure and verify engagement results?",
    answer:
      "We establish quantifiable financial benchmarks at the outset: EBITDA leakage plugged, working capital cycle velocity (DSO/DPO), audit committee sign-off clearance, and tax savings realized. Everything is tied directly to the balance sheet and statutory sign-offs.",
    page: "all",
  },
  {
    question: "Do you advise in person or remotely?",
    answer:
      "Sessions and board briefings are conducted at our Bandra Kurla Complex (BKC) office in Mumbai, in Mayfair, London, or via encrypted video. On-site diligence and treasury reviews occur at client corporate headquarters.",
    page: "all",
  },
  {
    question: "How soon could we initiate an advisory mandate?",
    answer:
      "CA Fenil Shah works with twelve enterprise clients at a time and opens three mandates per quarter to ensure deep partner-level involvement. We will confirm immediate availability on the initial consultation.",
    page: "all",
  },
  {
    question: "Can our corporate entity sponsor this advisory engagement?",
    answer:
      "Yes — over 85% of mandates are corporate retainers approved by the board or managing director. We provide a concise scope of work, formal engagement terms, and quarterly deliverables documentation for corporate governance records.",
    page: "coaching",
  },
  {
    question: "How do I determine which advisory engagement fits our scale?",
    answer:
      "You do not need to pre-determine this. We diagnose your corporate structure during the chemistry call; whether you require rapid CFO stabilization (The First Hundred Days) or retained boardroom counsel, we map the appropriate mandate.",
    page: "coaching",
  },
  {
    question: "What if the engagement is not delivering the expected fiscal progress?",
    answer:
      "Both parties evaluate progress at the midpoint milestone. If identified capital optimizations or audit milestones are not being realized, we adjust the methodology, or conclude the mandate with no billing for unexpired months.",
    page: "coaching",
  },
  {
    question: "Do you advise entire finance leadership teams or boards?",
    answer:
      "Yes, through The Institutional Bench engagement. We advise CFOs, finance directors, and board audit committees collectively, provided the managing director or board chair participates in primary review milestones.",
    page: "coaching",
  },
];
