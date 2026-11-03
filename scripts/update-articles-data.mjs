import fs from "fs";

const filePath = "src/components/sites/helena-marsh/data.ts";
let content = fs.readFileSync(filePath, "utf8");

const oldArticleSection = `export interface Article {
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
}`;

const newArticleSection = `export interface Article {
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
}`;

// Normalize line endings for replacement
const isCRLF = content.includes("\r\n");
const normalize = (str) => str.replace(/\r\n/g, "\n");
const denormalize = (str) => (isCRLF ? str.replace(/\n/g, "\r\n") : str);

const newArticlesArray = `export const ARTICLES: Article[] = [
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
];`;

let norm = normalize(content);
norm = norm.replace(normalize(oldArticleSection), normalize(newArticleSection));

const artStart = norm.indexOf("export const ARTICLES: Article[] = [");
const artEnd = norm.indexOf("export interface FaqItem {");

if (artStart !== -1 && artEnd !== -1) {
  norm = norm.substring(0, artStart) + normalize(newArticlesArray) + "\n\n" + norm.substring(artEnd);
  fs.writeFileSync(filePath, denormalize(norm), "utf8");
  console.log("Successfully updated ARTICLES in data.ts!");
} else {
  console.error("Could not find article boundaries in data.ts");
}
