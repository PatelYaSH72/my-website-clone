export interface NavLink {
  label: string;
  href: string;
}

export const NAV_LINKS: NavLink[] = [
  { label: "Advisory", href: "/coaching" },
  { label: "Services", href: "/services" },
  { label: "About", href: "/about" },
  { label: "Gallery", href: "/gallery" },
  { label: "Blogs", href: "/blogs" },
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
  timeline?: string;
  tag?: string;
  deliverables?: string[];
}

export const METHOD_STEPS: MethodStep[] = [
  {
    number: "01",
    title: "Forensic Baseline",
    description:
      "Before restructuring begins, we conduct a forensic audit of balance sheets, working capital leakage, tax exposures, and hidden covenants. You receive the unedited fiscal truth.",
    image: "/sites/helena-marsh/images/method-audit.webp",
    timeline: "Weeks 1 — 3",
    tag: "DIAGNOSTIC AUDIT",
    deliverables: [
      "Forensic balance sheet baseline",
      "Hidden covenant & debt scan",
      "Working capital leakage audit",
    ],
  },
  {
    number: "02",
    title: "Capital & Tax Architecture",
    description:
      "We engineer defensible holding structures, cross-border transfer pricing models, debt rationalization, and EBITDA protection. Built for regulatory permanence.",
    image: "/sites/helena-marsh/images/method-structure.webp",
    timeline: "Weeks 4 — 8",
    tag: "STRUCTURAL DESIGN",
    deliverables: [
      "Holding entity optimization",
      "Transfer pricing defensibility",
      "EBITDA protection blueprint",
    ],
  },
  {
    number: "03",
    title: "Boardroom Execution",
    description:
      "Fortnightly strategic sparring: board paper review, banker covenant negotiations, M&A due diligence defense, and CFO prep before high-stakes committee meetings.",
    image: "/sites/helena-marsh/images/method-board.webp",
    timeline: "Weeks 9 — 20",
    tag: "BOARDROOM SPARRING",
    deliverables: [
      "Board paper unvarnished review",
      "Bank covenant defense",
      "M&A diligence readiness",
    ],
  },
  {
    number: "04",
    title: "Continuous Assurance",
    description:
      "Quarterly fiscal pulses, working capital velocity tracking, tax savings audits, and statutory defense sign-offs. We iterate until your balance sheet is unshakeable.",
    image: "/sites/helena-marsh/images/method-assurance.webp",
    timeline: "Quarterly Ongoing",
    tag: "CONTINUOUS ASSURANCE",
    deliverables: [
      "Quarterly fiscal pulse audit",
      "Tax savings certification",
      "Statutory defense sign-offs",
    ],
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
  views?: string;
  viewsCount?: number;
  featured?: boolean;
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
    views: "24.8K views",
    viewsCount: 24800,
    featured: true,
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
    views: "38.2K views",
    viewsCount: 38200,
    featured: true,
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
    views: "41.5K views",
    viewsCount: 41500,
    featured: true,
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
    views: "19.3K views",
    viewsCount: 19300,
    featured: false,
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
  {
    slug: "promoter-debt-defense",
    tag: "DEBT COVENANTS",
    date: "OCTOBER 2026",
    readTime: "9 MIN",
    views: "47.9K views",
    viewsCount: 47900,
    featured: true,
    title: "Defending Promoter Balance Sheets Against Predatory Debt Covenants",
    excerpt:
      "How institutional lenders quietly insert leverage traps into mezzanine credit agreements, and how promoters can restructure covenants before default triggers.",
    image: "/sites/helena-marsh/images/who-ceos.webp",
    leadQuote: "Debt covenants are written in peace to be weaponized in volatility.",
    leadParagraph:
      "Promoters often celebrate closing ₹500 Cr credit lines without realizing the covenants stipulate immediate acceleration if DSCR slips by 0.1x. Restructuring debt terms before quarterly stress is the single highest-ROI activity an executive board can undertake.",
    sections: [
      {
        heading: "The hidden triggers in corporate debt agreements",
        paragraphs: [
          "Lenders routinely include cross-default clauses connecting unrelated subsidiary guarantees to the parent entity. Under distress, a minor vendor dispute in an operating unit can trigger technical insolvency across the entire holding group.",
        ],
        quote: "Read debt covenants through the eyes of a hostile takeover bidder, because that is who buys the debt at discount.",
      },
      {
        heading: "Negotiating covenant headroom during expansion",
        paragraphs: [
          "Establish covenant resets tied to capex commissioning phases, and ensure EBITDA definitions account for one-time restructuring costs.",
        ],
        list: [
          "Exclude non-recourse project finance debt from consolidated parent solvency ratios.",
          "Mandate cure periods of at least 60 business days before technical default declarations.",
          "Secure seasonal working capital headroom waivers before cyclical inventory buildups.",
        ],
      },
    ],
  },
  {
    slug: "indas-ifrs-transition-playbook",
    tag: "STATUTORY ASSURANCE",
    date: "OCTOBER 2026",
    readTime: "8 MIN",
    views: "29.4K views",
    viewsCount: 29400,
    featured: false,
    title: "Navigating the Ind AS / IFRS Transition: What Big-4 Auditors Scrutinize Most",
    excerpt:
      "A technical breakdown of fair valuation accounting, expected credit loss provisions, and lease accounting traps under Ind AS 115 and 116.",
    image: "/sites/helena-marsh/images/method-audit.webp",
    leadQuote: "Statutory compliance is not an exercise in form-filling; it is defense of corporate credibility.",
    leadParagraph:
      "Transitioning from Indian GAAP to Ind AS / IFRS disrupts historical EBITDA calculations. Revenue recognition under Ind AS 115 and asset lease recognition under Ind AS 116 can unexpectedly compress reported equity if mismanaged.",
    sections: [
      {
        heading: "Expected Credit Loss (ECL) provisioning traps",
        paragraphs: [
          "Auditors are applying unprecedented forensic scrutiny to overdue accounts receivable aging beyond 180 days. Blanket provisions directly impair net worth unless supported by documented recovery histories.",
        ],
        quote: "Unverifiable revenue recognized early is tomorrow's statutory audit qualification.",
      },
      {
        heading: "Pre-empting Big-4 audit committee queries",
        paragraphs: [
          "Prepare technical position papers on contract assets and compound financial instruments at least 60 days before the statutory audit starts.",
        ],
        list: [
          "Formalize independent registered valuer certifications for all unquoted investments.",
          "Reconcile deferred tax asset recognitions against 3-year projected taxable profits.",
          "Maintain audit-trail logs compliant with MCA statutory ledger requirements.",
        ],
      },
    ],
  },
  {
    slug: "the-anatomy-of-forensic-ledgers",
    tag: "FORENSIC AUDIT",
    date: "SEPTEMBER 2026",
    readTime: "6 MIN",
    views: "33.7K views",
    viewsCount: 33700,
    featured: false,
    title: "The Anatomy of Forensic Ledgers: Spotting EBITDA Leaks in ERP Systems",
    excerpt:
      "Unreconciled suspense accounts, vendor rebates, and capitalized R&D: where middle management hides operational margin erosion.",
    image: "/sites/helena-marsh/images/manifesto-ledger.webp",
    leadQuote: "ERP systems are only as truthful as the parameters configured into their general ledger mapping.",
    leadParagraph:
      "In high-growth companies with multiple operating entities, millions of rupees quietly evaporate through unmapped clearing accounts, duplicate vendor masters, and off-book purchase commitments that evade standard monthly MIS reviews.",
    sections: [
      {
        heading: "The three most common general ledger vulnerabilities",
        paragraphs: [
          "Suspense accounts that carry balances for over 90 days are almost always unbooked operational costs or uncollected cash discrepancies. Similarly, vendor credit notes often sit unreconciled while payments continue uninterrupted.",
        ],
        quote: "If an entry cannot be explained to a high-school student in two sentences, it belongs in an audit red-flag memo.",
      },
      {
        heading: "Automating forensic exception detection",
        paragraphs: [
          "Deploy automated weekly ledger interrogation scripts comparing purchase orders, goods receipt notes (GRN), and invoice disbursements.",
        ],
        list: [
          "Flag payments made to vendors whose bank IFSC codes or PAN match employee master data.",
          "Isolate all journal entries posted outside standard business operating hours.",
          "Enforce zero tolerance for manual adjustments posted directly to revenue accounts.",
        ],
      },
    ],
  },
  {
    slug: "boardroom-equilibrium-in-crisis",
    tag: "EXECUTIVE EQUILIBRIUM",
    date: "AUGUST 2026",
    readTime: "10 MIN",
    views: "52.1K views",
    viewsCount: 52100,
    featured: true,
    title: "Boardroom Equilibrium: Staying Composed When ₹1,000+ Cr Is Under Sovereign Scrutiny",
    excerpt:
      "Psychological resilience and decision hygiene when credit rating agencies, tax authorities, and promoter factions collide in closed-door sessions.",
    image: "/sites/helena-marsh/images/who-founders.webp",
    leadQuote: "When everyone in the room is panicking, the leader with the clear balance sheet controls the room.",
    leadParagraph:
      "Under high-stakes audit or debt renegotiation, intellectual capability matters far less than emotional self-mastery. The quickest way to lose ₹100 Cr in valuation is to react defensively to aggressive questioning from consortium lenders or regulators.",
    sections: [
      {
        heading: "The psychology of high-stakes financial confrontations",
        paragraphs: [
          "Hostile questions are designed to elicit hasty commitments. In boardroom finance, silence is an asset. Never negotiate or clarify balance sheet positions without referencing verified statutory trial balances.",
        ],
        quote: "Clarity is calm. Uncertainty breeds panic. Ground every word in the verified ledger.",
      },
      {
        heading: "The five-step crisis composure checklist",
        paragraphs: [
          "Establish a unified single-spokesperson protocol with legal counsel and statutory auditors before any external stakeholder meeting.",
        ],
        list: [
          "Separate immediate operational cash liquidity needs from long-term capital restructure debates.",
          "Provide factual documentation within 24 hours rather than offering verbal assurances in the room.",
          "Maintain daily physical stamina and cognitive hygiene; fatigue is where fatal concessions are made.",
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


export interface GalleryItem {
  id: string;
  title: string;
  category: string;
  badge?: string;
  collection: "Boardroom Deliberations" | "Global Summits" | "Due Diligence & Audits" | "Advisory Engagements";
  year: string;
  date?: string;
  location: string;
  image: string;
  description: string;
  featured?: boolean;
}

export const GALLERY_COLLECTIONS = [
  "All Collections",
  "Boardroom Deliberations",
  "Global Summits",
  "Due Diligence & Audits",
  "Advisory Engagements",
] as const;

export const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: "gal-1",
    title: "Series D Pre-IPO Audit Defense",
    category: "Audit Defense",
    badge: "DUE DILIGENCE",
    collection: "Due Diligence & Audits",
    year: "2026",
    date: "SEPTEMBER, 2026",
    location: "Platina, BKC Mumbai",
    image: "/sites/helena-marsh/images/case-fintech.webp",
    description: "Closed-door forensic audit clearance for fintech unicorn preceding formal statutory filing.",
    featured: true,
  },
  {
    id: "gal-2",
    title: "Sovereign Debt & Capital Restructuring",
    category: "Capital Advisory",
    badge: "TRANSITIONS",
    collection: "Boardroom Deliberations",
    year: "2025",
    date: "AUGUST, 2025",
    location: "Mayfair, London",
    image: "/sites/helena-marsh/images/who-ceos.webp",
    description: "Promoter debt rationalization and covenant defense session with European institutional lenders.",
    featured: true,
  },
  {
    id: "gal-3",
    title: "Global Balance Sheet Governance Keynote",
    category: "Keynote Address",
    badge: "SELF-AWARENESS",
    collection: "Global Summits",
    year: "2026",
    date: "JULY, 2026",
    location: "Marina Bay, Singapore",
    image: "/sites/helena-marsh/images/fenil-speaking.webp",
    description: "Keynote on Sovereign Balance Sheet Architecture & EBITDA Permanence for Asia-Pacific enterprise promoters.",
    featured: true,
  },
  {
    id: "gal-4",
    title: "Industrial Conglomerate Tax Architecture",
    category: "Tax Structuring",
    badge: "TAX GOVERNANCE",
    collection: "Due Diligence & Audits",
    year: "2025",
    date: "NOVEMBER, 2025",
    location: "Ahmedabad & Mumbai",
    image: "/sites/helena-marsh/images/case-manufacturing.webp",
    description: "Cross-border holding entity restructuring and transfer pricing defense across 32 subsidiary units.",
    featured: true,
  },
  {
    id: "gal-5",
    title: "Executive Committee Strategic Sparring",
    category: "Boardroom",
    badge: "BOARD AUDIT",
    collection: "Boardroom Deliberations",
    year: "2026",
    date: "JUNE, 2026",
    location: "BKC, Mumbai",
    image: "/sites/helena-marsh/images/who-executives.webp",
    description: "Fortnightly strategic review with Group CFO and audit committee chairs on cash-flow resilience.",
    featured: true,
  },
  {
    id: "gal-6",
    title: "HealthTech Cross-Border M&A Valuation",
    category: "M&A Valuation",
    badge: "CAPITAL COVENANTS",
    collection: "Due Diligence & Audits",
    year: "2025",
    date: "OCTOBER, 2025",
    location: "London & Zurich",
    image: "/sites/helena-marsh/images/case-healthtech.webp",
    description: "IBBI registered valuation and cap-table audit for cross-border hospital network acquisition.",
    featured: false,
  },
  {
    id: "gal-7",
    title: "Promoters Closed-Door Round Table",
    category: "Promoter Counsel",
    badge: "EQUILIBRIUM",
    collection: "Advisory Engagements",
    year: "2026",
    date: "MAY, 2026",
    location: "The Oberoi, Mumbai",
    image: "/sites/helena-marsh/images/who-founders.webp",
    description: "Private gathering of first-generation industrial promoters navigating succession and capital allocation.",
    featured: true,
  },
  {
    id: "gal-8",
    title: "Statutory Assurance & Working Capital War Room",
    category: "Working Capital",
    badge: "FORENSIC LEDGER",
    collection: "Due Diligence & Audits",
    year: "2026",
    date: "APRIL, 2026",
    location: "BKC, Mumbai",
    image: "/sites/helena-marsh/images/manifesto-ledger.webp",
    description: "Multi-entity trial balance reconciliation and ledger liquidity unlock session.",
    featured: false,
  },
  {
    id: "gal-9",
    title: "Institutional Audit Committee Address",
    category: "Keynote Address",
    badge: "STATUTORY RIGOR",
    collection: "Global Summits",
    year: "2025",
    date: "DECEMBER, 2025",
    location: "New Delhi",
    image: "/sites/helena-marsh/images/fenil-arch.png",
    description: "Address to institutional audit chairs on Ind AS/IFRS statutory compliance and forensic vigilance.",
    featured: false,
  },
  {
    id: "gal-10",
    title: "Finance Leadership Bench Sparring",
    category: "Bench Advisory",
    badge: "FELLOWSHIP",
    collection: "Advisory Engagements",
    year: "2026",
    date: "MARCH, 2026",
    location: "Bangalore",
    image: "/sites/helena-marsh/images/who-teams.webp",
    description: "Evaluating internal financial controls and grooming scaleup finance directors for CFO succession.",
    featured: false,
  },
  {
    id: "gal-11",
    title: "Pre-Listing Treasury Rationalization Session",
    category: "Treasury",
    badge: "SOVEREIGN ALPHA",
    collection: "Boardroom Deliberations",
    year: "2026",
    date: "FEBRUARY, 2026",
    location: "Nariman Point, Mumbai",
    image: "/sites/helena-marsh/images/case-conglomerate.webp",
    description: "Rationalizing working capital lines and debt maturity covenants before public market prospectus filing.",
    featured: true,
  },
  {
    id: "gal-12",
    title: "Forensic General Ledger Integrity Review",
    category: "Forensic Audit",
    badge: "BALANCE SHEET",
    collection: "Due Diligence & Audits",
    year: "2025",
    date: "SEPTEMBER, 2025",
    location: "BKC, Mumbai",
    image: "/sites/helena-marsh/images/article-diligence.webp",
    description: "Deep-dive ERP forensic audit identifying ₹28 Cr untracked operational leakages across 14 divisions.",
    featured: false,
  },
  {
    id: "gal-13",
    title: "Sovereign Wealth Fund Advisory Session",
    category: "Sovereign Fund",
    badge: "DISA PRINCIPLES",
    collection: "Global Summits",
    year: "2026",
    date: "JANUARY, 2026",
    location: "DIFC, Dubai",
    image: "/sites/helena-marsh/images/manifesto-bkc.webp",
    description: "Advising institutional allocation chairs on fiscal governance and tax structuring in India corridors.",
    featured: true,
  },
  {
    id: "gal-14",
    title: "First 90 Days CFO Transition Sparring",
    category: "CFO Trajectory",
    badge: "CFO TRANSITIONS",
    collection: "Advisory Engagements",
    year: "2026",
    date: "JULY, 2026",
    location: "Worli, Mumbai",
    image: "/sites/helena-marsh/images/fenil-portrait.png",
    description: "One-on-one strategic preparation for incoming CFO before their inaugural board audit committee meeting.",
    featured: false,
  },
  {
    id: "gal-15",
    title: "Cross-Border Transfer Pricing Defense",
    category: "Tax Structuring",
    badge: "FISCAL DEFENSE",
    collection: "Due Diligence & Audits",
    year: "2025",
    date: "AUGUST, 2025",
    location: "Singapore & Mumbai",
    image: "/sites/helena-marsh/images/article-tax.webp",
    description: "Arm's length documentation and transfer pricing defense across Singapore, UK, and India entities.",
    featured: true,
  },
];

export interface ServiceMandate {
  id: string;
  number: string;
  title: string;
  badge: string;
  tagline: string;
  description: string;
  focus: string[];
  deliverables: string[];
  metrics: { value: string; label: string }[];
  targetAudience: string;
  duration: string;
  image: string;
  ctaText: string;
  href: string;
}

export const SERVICE_MANDATES: ServiceMandate[] = [
  {
    id: "business-consultancy",
    number: "01",
    title: "Business Consultancy",
    badge: "MANDATE I · ENTERPRISE ARCHITECTURE",
    tagline: "Corporate restructuring, fiscal modeling & M&A due diligence.",
    description:
      "Transforming regulatory compliance into balance sheet alpha. We restructure multi-tier holding entities, rationalize debt covenants, model Ind AS / IFRS compliance, and conduct unvarnished buy-side/sell-side financial due diligence before institutional capital commits.",
    focus: [
      "Ind AS / IFRS compliance and statutory audit preparation",
      "EBITDA leak diagnostics and operational margin reclamation",
      "Working capital velocity & cash conversion cycle acceleration",
      "Debt covenant defense, promoter leverage & refinancing models",
      "Buy-side & sell-side forensic financial due diligence",
    ],
    deliverables: [
      "Multi-entity consolidation & tax architecture roadmap",
      "Forensic EBITDA leak report & working capital unlock",
      "IBBI / ICAI compliant valuation & diligence defense pack",
      "Board-ready audit committee presentation suite",
    ],
    metrics: [
      { value: "₹14,000+ Cr", label: "Assets Assured" },
      { value: "₹42 Cr", label: "EBITDA Leaks Plugged" },
      { value: "32 Units", label: "Entities Restructured" },
    ],
    targetAudience: "Promoters, Board of Directors, Managing Directors & Private Equity portfolio companies.",
    duration: "4 to 16 Weeks",
    image: "/sites/helena-marsh/images/case-fintech.webp",
    ctaText: "Inquire about Business Consultancy",
    href: "/book?service=business-consultancy",
  },
  {
    id: "career-consultation",
    number: "02",
    title: "Career Consultation",
    badge: "MANDATE II · EXECUTIVE TRAJECTORY",
    tagline: "Executive trajectory, CFO transition & fiscal authority.",
    description:
      "The transition from controller or VP Finance to the CFO chair is the most perilous jump in corporate leadership. We equip finance executives with the strategic armor, board presence, and forensic mastery required to command respect from day one.",
    focus: [
      "The First 90 Days Playbook: establishing immediate authority",
      "Conducting an uncompromising forensic baseline on inherited numbers",
      "Mastering the promoter dynamic and board sparring sessions",
      "Audit Committee leadership and credit rating agency defense",
      "Repositioning from technical accountant to strategic commercial partner",
    ],
    deliverables: [
      "Inaugural 90-Day CFO board roadmap & audit checklist",
      "Executive balance sheet defense & rehearsal simulations",
      "Direct priority counsel during critical board cycles",
      "Personal career trajectory mapping for CFO succession",
    ],
    metrics: [
      { value: "90 Days", label: "Execution Blueprint" },
      { value: "100%", label: "Audit Committee Alignment" },
      { value: "0", label: "Inherited Surprises" },
    ],
    targetAudience: "New CFOs, Group Financial Controllers, Finance Directors, and Promoters scaling finance leadership.",
    duration: "14 Weeks (Structured Sprint)",
    image: "/sites/helena-marsh/images/who-executives.webp",
    ctaText: "Apply for Career Consultation",
    href: "/book?service=career-consultation",
  },
  {
    id: "mentoring",
    number: "03",
    title: "Mentoring",
    badge: "MANDATE III · NEXT-GEN FELLOWSHIP",
    tagline: "Fellowship for emerging finance leaders & young partners.",
    description:
      "A highly selective 1-on-1 fellowship for exceptional Chartered Accountants and rising corporate finance practitioners. Grounded in Socratic inquiry, forensic ledgers, DISA principles, and real-world high-stakes statutory rigor.",
    focus: [
      "1-on-1 Socratic sparring on live balance sheet anomalies",
      "DISA and forensic audit techniques that standard courses miss",
      "Navigating regulatory bodies (ICAI, NFRA, RBI, SEBI) with integrity",
      "Developing sovereign judgment when data is incomplete or ambiguous",
      "Building a peerless professional reputation and partner practice",
    ],
    deliverables: [
      "Bi-weekly private sparring and ledger post-mortem reviews",
      "Access to proprietary working capital & restructuring frameworks",
      "Lifelong fellowship network of elite finance practitioners",
      "Direct guidance on high-stakes career crossroads",
    ],
    metrics: [
      { value: "1-on-1", label: "Socratic Sparring" },
      { value: "180+", label: "Mandate Case Archives" },
      { value: "12 Leaders", label: "Max Cohort Size" },
    ],
    targetAudience: "Chartered Accountants with 3–10 years experience, aspiring partners, and scaleup finance heads.",
    duration: "6 or 12 Months",
    image: "/sites/helena-marsh/images/who-teams.webp",
    ctaText: "Apply for Mentoring Fellowship",
    href: "/book?service=mentoring",
  },
  {
    id: "life-lessons-coaching",
    number: "04",
    title: "Life Lessons / Coaching",
    badge: "MANDATE IV · EXECUTIVE EQUILIBRIUM",
    tagline: "High-stakes boardroom equilibrium & personal longevity.",
    description:
      "When ₹1,000+ Cr is hanging in the balance, promoter pressure is suffocating, and statutory deadlines loom, technical skill alone is insufficient. This mandate provides confidential psychological grounding, decision hygiene, and equilibrium for finance leaders in the eye of the storm.",
    focus: [
      "High-stakes boardroom composure under severe promoter tension",
      "Managing lender scrutiny and credit rating downgrade pressures",
      "Cognitive clarity and decision hygiene during restructuring crises",
      "Preventing executive burnout while maintaining razor-sharp vigilance",
      "Ethical backbone: standing firm when asked to compromise ledgers",
    ],
    deliverables: [
      "Confidential monthly or bi-weekly strategic equilibrium retainer",
      "24/7 priority emergency line for acute boardroom emergencies",
      "Personal leadership longevity & resilience framework",
      "Unflinching, independent sounding board with absolute discretion",
    ],
    metrics: [
      { value: "24/7", label: "Emergency Advisory Line" },
      { value: "100%", label: "Irrevocable Confidentiality" },
      { value: "15+ Yrs", label: "Boardroom Wisdom" },
    ],
    targetAudience: "Founders, Promoters, CFOs, and Managing Partners managing severe scale, litigation, or debt renegotiation.",
    duration: "Annual Retainer (12 Months)",
    image: "/sites/helena-marsh/images/who-founders.webp",
    ctaText: "Inquire about Life Lessons & Coaching",
    href: "/book?service=life-lessons-coaching",
  },
];

