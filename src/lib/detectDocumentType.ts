// src/lib/detectDocumentType.ts
import { DOCUMENT_PROMPTS } from './prompts';

/**
 * Keywords used to validate document types
 */
const KEYWORDS: Record<keyof typeof DOCUMENT_PROMPTS, string[]> = {
  INCOME_STATEMENT: [
    "Revenue",
    "Gross Revenue",
    "Net Revenue",
    "Other Revenue",
    "Interest Revenue",
    "Rental Income",
    "Royalty Income",
    "Dividend Income",
    "Foreign Exchange Gains",
    "Gains from Investments",
    "Cost of Goods Sold (COGS)",
    "Raw Materials",
    "Direct Labor",
    "Manufacturing Overheads",
    "Freight-in",
    "Import Duties",
    "Packaging Costs",
    "Inventory Write-Downs",
    "Supplier Discounts",
    "Gross Profit",
    "Operating Expenses",
    "Selling, General, and Administrative Expenses (SG&A)",
    "Salaries and Wages",
    "Marketing and Advertising",
    "Rent and Utilities",
    "Office Supplies",
    "Insurance",
    "Travel and Entertainment",
    "Professional Fees (Legal, Consulting)",
    "Depreciation of Office Equipment",
    "Communication Expenses",
    "Research and Development (R&D)",
    "Salaries of R&D Staff",
    "Materials and Supplies for R&D",
    "Contract Research Expenses",
    "R&D Facility Costs",
    "Depreciation and Amortization",
    "Depreciation of Property, Plant, and Equipment (PPE)",
    "Amortization of Intangible Assets",
    "Accumulated Depreciation",
    "Other Operating Expenses",
    "Legal Fees",
    "Consulting Fees",
    "Restructuring Costs",
    "Impairment Charges",
    "Litigation Settlements",
    "Environmental Remediation Costs",
    "Operating Income (Operating Profit)",
    "Other Income and Expenses",
    "Interest Income",
    "Interest Expense",
    "Gain or Loss on Asset Sales",
    "Foreign Exchange Gains/Losses",
    "Investment Income",
    "Dividend Income",
    "Unrealized Gains/Losses on Securities",
    "Other Non-Operating Income",
    "Other Non-Operating Expenses",
    "Income Before Tax (Earnings Before Tax - EBT)",
    "Tax Expense",
    "Current Tax Expense",
    "Deferred Tax Expense",
    "Tax Credits",
    "Tax Adjustments",
    "Net Income (Net Profit or Net Earnings)",
    "Minority Interest",
    "Preferred Dividends",
    "Earnings Attributable to Common Shareholders",
    "Earnings Per Share (EPS)",
    "Basic EPS",
    "Diluted EPS",
    "Comprehensive Income",
    "Unrealized Gains/Losses on Available-for-Sale Securities",
    "Pension Adjustments",
    "Foreign Currency Translation Adjustments",
    "Other Comprehensive Income Items",
    "Other Potential Items",
    "Extraordinary Items",
    "Non-Recurring Items",
    "Discontinued Operations"
  ],
  BALANCE_SHEET: [
    "Assets",
    "Cash and Cash Equivalents",
    "Petty Cash",
    "Marketable Securities",
    "Short-Term Investments",
    "Accounts Receivable (AR)",
    "Trade Receivables",
    "Allowance for Doubtful Accounts",
    "Notes Receivable",
    "Inventory",
    "Raw Materials",
    "Work-in-Progress (WIP)",
    "Finished Goods",
    "Inventory Reserves",
    "Prepaid Expenses",
    "Prepaid Insurance",
    "Prepaid Rent",
    "Other Prepaid Costs",
    "Other Current Assets",
    "Advances to Suppliers",
    "Deferred Tax Assets (Current Portion)",
    "Miscellaneous Current Assets",
    "Marketable Securities",
    "Assets Held for Sale",
    "Contract Assets",
    "Biological Assets",
    "Non-Current Assets (Long-Term Assets)",
    "Property, Plant, and Equipment (PPE)",
    "Land",
    "Buildings",
    "Machinery and Equipment",
    "Vehicles",
    "Furniture and Fixtures",
    "Construction in Progress",
    "Accumulated Depreciation",
    "Intangible Assets",
    "Goodwill",
    "Patents",
    "Trademarks",
    "Copyrights",
    "Customer Lists",
    "Software Development Costs",
    "Licensing Agreements",
    "Long-Term Investments",
    "Equity Securities",
    "Debt Securities",
    "Investments in Affiliates and Associates",
    "Joint Ventures",
    "Real Estate Investments",
    "Deferred Tax Assets (Non-Current Portion)",
    "Natural Resources",
    "Mineral Rights",
    "Timberland",
    "Biological Assets",
    "Other Non-Current Assets",
    "Security Deposits",
    "Deferred Charges",
    "Environmental Liabilities",
    "Liabilities",
    "Accounts Payable (AP)",
    "Trade Payables",
    "Supplier Payables",
    "Short-Term Debt",
    "Bank Loans",
    "Commercial Paper",
    "Current Portion of Long-Term Debt",
    "Accrued Expenses",
    "Salaries and Wages Payable",
    "Interest Payable",
    "Taxes Payable",
    "Utilities Payable",
    "Deferred Revenue",
    "Unearned Revenue",
    "Dividends Payable",
    "Current Portion of Deferred Tax Liabilities",
    "Other Current Liabilities",
    "Customer Deposits",
    "Advances from Customers",
    "Miscellaneous Current Liabilities",
    "Long-Term Liabilities",
    "Long-Term Debt",
    "Bonds Payable",
    "Notes Payable",
    "Mortgage Payable",
    "Deferred Tax Liabilities (Non-Current Portion)",
    "Pension Liabilities",
    "Defined Benefit Obligations",
    "Defined Contribution Obligations",
    "Lease Obligations",
    "Capital Leases",
    "Operating Leases (Long-Term)",
    "Deferred Revenue (Long-Term Portion)",
    "Other Non-Current Liabilities",
    "Asset Retirement Obligations",
    "Deferred Compensation",
    "Contingent Liabilities",
    "Environmental Remediation Liabilities",
    "Equity (Shareholder’s Equity)",
    "Common Stock",
    "Authorized Shares",
    "Issued Shares",
    "Par Value",
    "Preferred Stock",
    "Authorized Shares",
    "Issued Shares",
    "Par Value",
    "Additional Paid-In Capital (APIC)",
    "Retained Earnings",
    "Beginning Retained Earnings",
    "Net Income",
    "Dividends Paid",
    "Prior Period Adjustments",
    "Treasury Stock",
    "Cost of Treasury Shares Acquired",
    "Shares Held in Treasury",
    "Accumulated Other Comprehensive Income (AOCI)",
    "Unrealized Gains/Losses on Available-for-Sale Securities",
    "Pension Plan Adjustments",
    "Foreign Currency Translation Adjustments",
    "Non-Controlling Interest",
    "Share Premium",
    "Revaluation Surplus (if applicable)",
    "Equity in Affiliates"
  ],
  CASH_FLOW_STATEMENT: [
    "Operating Activities",
    "Cash Inflows",
    "Cash Received from Customers",
    "Interest Received",
    "Dividends Received",
    "Cash Outflows",
    "Cash Paid to Suppliers and Employees",
    "Interest Paid",
    "Income Taxes Paid",
    "Other Operating Cash Payments",
    "Adjustments for Non-Cash Items",
    "Depreciation and Amortization",
    "Stock-Based Compensation",
    "Deferred Income Taxes",
    "Gain/Loss on Sale of Assets",
    "Impairment Charges",
    "Provision for Bad Debts",
    "Other Non-Cash Adjustments",
    "Changes in Working Capital",
    "Change in Accounts Receivable",
    "Change in Inventory",
    "Change in Accounts Payable",
    "Change in Prepaid Expenses",
    "Change in Other Current Assets/Liabilities",
    "Change in Accrued Expenses",
    "Change in Deferred Revenue",
    "Other Operating Activities",
    "Cash Paid for Legal Settlements",
    "Cash Paid for Restructuring Costs",
    "Cash Paid for Environmental Remediation",
    "Investing Activities",
    "Cash Inflows",
    "Proceeds from Sale of Property, Plant, and Equipment (PPE)",
    "Proceeds from Sale of Intangible Assets",
    "Proceeds from Sale of Investments",
    "Proceeds from Sale of Subsidiaries or Business Units",
    "Collections on Loans Made to Others",
    "Cash Outflows",
    "Purchase of Property, Plant, and Equipment (CAPEX)",
    "Purchase of Intangible Assets",
    "Purchase of Long-Term Investments",
    "Acquisition of Subsidiaries or Businesses",
    "Purchase of Investments in Affiliates and Associates",
    "Loans Made to Others",
    "Other Investing Cash Payments",
    "Other Investing Activities",
    "Capitalized Development Costs",
    "Payments for Environmental Cleanups",
    "Cash Paid for Acquisitions (Non-Cash Financing)",
    "Financing Activities",
    "Cash Inflows",
    "Proceeds from Issuance of Common Stock",
    "Proceeds from Issuance of Preferred Stock",
    "Proceeds from Issuance of Debt (Bonds, Notes)",
    "Proceeds from Borrowings",
    "Proceeds from Lease Financing",
    "Cash Outflows",
    "Repurchase of Common Stock (Treasury Stock)",
    "Repurchase of Preferred Stock",
    "Payment of Dividends",
    "Cash Dividends",
    "Stock Dividends",
    "Repayment of Debt Principal",
    "Payments for Lease Obligations",
    "Other Financing Cash Payments",
    "Other Financing Activities",
    "Cash Paid for Issuance Costs",
    "Cash Received from Equity Grants",
    "Cash Paid for Equity Grants",
    "Net Increase/Decrease in Cash",
    "Cash at Beginning of Period",
    "Cash at End of Period",
    "Supplemental Cash Flow Information",
    "Non-Cash Investing and Financing Activities",
    "Conversion of Debt to Equity",
    "Acquisition of Assets by Issuing Debt",
    "Capital Lease Commitments",
    "Stock-Based Compensation Transactions",
    "Other Non-Cash Transactions"
  ],
  FDD: [
    "Franchise Disclosure Document",
    "FDD",
    "Franchisor",
    "Franchisee",
    "Franchise Fee",
    "Royalty Fee",
    "Ad Fund Fee Percentage",
    "Territory",
    "Initial Investment",
    "Term of Agreement Years",
    "Renewal Terms",
    "Territory Protection",
    "Training Programs Included",
    "Initial Investment Range Low",
    "Initial Investment Range High",
    "Other Fees",
    "Technology Fee",
    "Local Marketing",
    "Legal Disclaimers",
    "Key Items Section",
    "Date of Issuance",
    "Business Experience of Principals",
    "Litigation History",
    "Bankruptcy",
    "Initial Fees",
    "Other Fees",
    "Estimated Initial Investment",
    "Restrictions on Sources of Products and Services",
    "Franchisee Obligations",
    "Financing",
    "Franchisor Assistance, Advertising, Computer Systems, and Training",
    "Trademarks",
    "Patents, Copyrights, and Proprietary Information",
    "Obligation to Participate in the Actual Operation of the Franchise Business",
    "Restrictions on What the Franchisee May Sell",
    "Renewal, Termination, Transfer, and Dispute Resolution",
    "Public Figures",
    "Financial Performance Representations",
    "Outlets and Franchisee Information",
    "Financial Statements",
    "Contracts",
    "Receipts"
  ],
  STATEMENT_OF_SHAREHOLDERS_EQUITY: [
    "Shareholders Equity",
    "Stockholders Equity",
    "Retained Earnings",
    "Common Stock",
    "Preferred Stock",
    "Additional Paid-In Capital",
    "Treasury Stock",
    "Comprehensive Income",
    "Paid in Capital",
    "Authorized Shares",
    "Issued Shares",
    "Par Value",
    "Issuance of Common Stock",
    "Issuance of Preferred Stock",
    "Stock Options and Warrants",
    "Number of Shares Issued",
    "Additional Paid-In Capital from Common Stock",
    "Additional Paid-In Capital from Preferred Stock",
    "Issuance of Stock Options",
    "Exercise of Stock Options",
    "Proceeds from Warrants",
    "Dividends Paid",
    "Cash Dividends",
    "Stock Dividends",
    "Property Dividends",
    "Stock Repurchases (Treasury Stock)",
    "Cost of Treasury Shares Acquired",
    "Reissuance of Treasury Shares",
    "Stock-Based Compensation",
    "Vesting of Stock Awards",
    "Expense Recognition for Stock Compensation",
    "Accumulated Other Comprehensive Income (AOCI)",
    "Unrealized Gains/Losses on Available-for-Sale Securities",
    "Pension Plan Adjustments",
    "Foreign Currency Translation Adjustments",
    "Revaluation Surplus (if applicable)",
    "Increases in Asset Valuations",
    "Decreases in Asset Valuations",
    "Changes in Ownership Interests",
    "Mergers and Acquisitions",
    "Spin-offs",
    "Asset Sales Affecting Equity",
    "Conversion of Preferred to Common Stock",
    "Other Changes in Equity",
    "Capital Contributions from Owners",
    "Capital Withdrawals by Owners",
    "Non-Controlling Interest",
    "Changes Due to Net Income Attributable to Non-Controlling Interests",
    "Dividends Paid to Non-Controlling Interests",
    "Other Changes in Non-Controlling Interests",
    "Total Comprehensive Income",
    "Cumulative Comprehensive Income",
    "Equity in Affiliates",
    "Investment in Affiliates",
    "Share of Earnings from Affiliates"
  ],
  FINANCIAL_RATIOS: [
    "Ratio",
    "Liquidity",
    "Solvency",
    "Profitability",
    "Efficiency",
    "Current Ratio",
    "Quick Ratio",
    "Debt Ratio",
    "Return on Assets",
    "Return on Equity",
    "Return on Invested Capital",
    "Inventory Turnover",
    "Receivables Turnover",
    "Asset Turnover",
    "Debt to Equity",
    "Debt to EBITDA",
    "Interest Coverage Ratio",
    "Price to Earnings",
    "Price to Book",
    "Enterprise Value",
    "EV to EBITDA",
    "EV to EBIT",
    "Revenue Growth Rate",
    "EBITDA Growth Rate",
    "Net Income Growth Rate",
    "Free Cash Flow",
    "Unlevered Free Cash Flow",
    "Levered Free Cash Flow",
    "Dividend Yield",
    "Payout Ratio"
  ]
};

/**
 * Detect document type using keywords
 */
function detectDocumentTypeByKeywords(
  content: string
): keyof typeof DOCUMENT_PROMPTS {
  const contentLower = content.toLowerCase();
  
  // For each doc type, count how many keywords appear in the content
  const matches = Object.entries(KEYWORDS).map(([type, words]) => {
    // Count exact matches and partial matches separately
    const exactMatches = words
      .map(w => w.toLowerCase())
      .filter(w => contentLower.includes(w)).length;
      
    const partialMatches = words
      .map(w => w.toLowerCase())
      .filter(w => {
        // Check for word parts (more lenient matching)
        const parts = w.split(/[\s-(),/]+/);
        return parts.some(part => part.length > 3 && contentLower.includes(part));
      }).length;
      
    const totalScore = exactMatches + (partialMatches * 0.5); // Weight partial matches less
    
    return {
      type,
      exactMatches,
      partialMatches,
      totalScore,
      matchRatio: totalScore / words.length
    };
  });

  // Log match information for debugging
  console.log('Document type matches:', matches.map(m => ({
    type: m.type,
    exactMatches: m.exactMatches,
    partialMatches: m.partialMatches,
    totalScore: m.totalScore
  })));

  // Sort by total score and match ratio
  const best = matches.sort((a, b) => {
    if (Math.abs(b.totalScore - a.totalScore) > 3) {
      return b.totalScore - a.totalScore;
    }
    return b.matchRatio - a.matchRatio;
  })[0];

  // More lenient threshold - require either:
  // - 2 exact matches
  // - 1 exact match and 2 partial matches
  // - 4 partial matches
  if (best && (
    best.exactMatches >= 2 ||
    (best.exactMatches >= 1 && best.partialMatches >= 2) ||
    best.partialMatches >= 4
  )) {
    console.log('Selected document type:', best.type, 'with scores:', {
      exactMatches: best.exactMatches,
      partialMatches: best.partialMatches,
      totalScore: best.totalScore
    });
    return best.type as keyof typeof DOCUMENT_PROMPTS;
  }

  // If we can't determine type, default to INCOME_STATEMENT with a warning
  console.warn('Could not confidently determine document type, defaulting to INCOME_STATEMENT');
  return 'INCOME_STATEMENT';
}

/**
 * Detect document type from filename
 */
function detectDocumentTypeFromFilename(filename: string): keyof typeof DOCUMENT_PROMPTS | null {
  const lowerFilename = filename.toLowerCase();
  
  // Common document type indicators in filenames
  const typeIndicators = {
    'income_statement': 'INCOME_STATEMENT',
    'income statement': 'INCOME_STATEMENT',
    'profit_and_loss': 'INCOME_STATEMENT',
    'profit and loss': 'INCOME_STATEMENT',
    'p&l': 'INCOME_STATEMENT',
    'balance_sheet': 'BALANCE_SHEET',
    'balance sheet': 'BALANCE_SHEET',
    'cash_flow': 'CASH_FLOW_STATEMENT',
    'cash flow': 'CASH_FLOW_STATEMENT',
    'cashflow': 'CASH_FLOW_STATEMENT',
    'shareholders_equity': 'STATEMENT_OF_SHAREHOLDERS_EQUITY',
    'shareholders equity': 'STATEMENT_OF_SHAREHOLDERS_EQUITY',
    'stockholders_equity': 'STATEMENT_OF_SHAREHOLDERS_EQUITY',
    'stockholders equity': 'STATEMENT_OF_SHAREHOLDERS_EQUITY',
    'financial_ratios': 'FINANCIAL_RATIOS',
    'financial ratios': 'FINANCIAL_RATIOS',
    'fdd': 'FDD',
    'franchise_disclosure': 'FDD'
  } as const;

  for (const [indicator, type] of Object.entries(typeIndicators)) {
    if (lowerFilename.includes(indicator)) {
      return type as keyof typeof DOCUMENT_PROMPTS;
    }
  }

  return null;
}

/**
 * Detect document type from structured data (CSV/XLSX)
 */
function detectDocumentTypeFromStructuredData(headers: string[]): keyof typeof DOCUMENT_PROMPTS | null {
  const headerStr = headers.join(' ').toLowerCase();
  
  // Key column combinations that strongly indicate document types
  const typeIndicators = {
    INCOME_STATEMENT: [
      ['revenue', 'cost of goods sold', 'gross profit'],
      ['revenue', 'expenses', 'net income'],
      ['sales', 'cost of sales', 'gross profit']
    ],
    BALANCE_SHEET: [
      ['assets', 'liabilities', 'equity'],
      ['current assets', 'non-current assets', 'liabilities'],
      ['assets', 'liabilities', "shareholder's equity"]
    ],
    CASH_FLOW_STATEMENT: [
      ['operating activities', 'investing activities', 'financing activities'],
      ['cash flow from operations', 'cash flow from investing', 'cash flow from financing'],
      ['operating cash flow', 'investing cash flow', 'financing cash flow']
    ],
    STATEMENT_OF_SHAREHOLDERS_EQUITY: [
      ['common stock', 'retained earnings', 'treasury stock'],
      ['share capital', 'retained earnings', 'reserves'],
      ["stockholder's equity", 'accumulated earnings', 'other comprehensive income']
    ],
    FINANCIAL_RATIOS: [
      ['ratio', 'value', 'description'],
      ['financial ratio', 'calculation', 'result'],
      ['metric', 'value', 'benchmark']
    ]
  } as const;

  for (const [type, combinations] of Object.entries(typeIndicators)) {
    if (combinations.some(combo => combo.every(term => headerStr.includes(term)))) {
      return type as keyof typeof DOCUMENT_PROMPTS;
    }
  }

  return null;
}

/**
 * Combined document type detection using filename, content structure, and keywords
 */
export async function detectDocumentType(
  content: string,
  filename?: string,
  fileType?: string
): Promise<keyof typeof DOCUMENT_PROMPTS> {
  try {
    // First try filename-based detection if filename is provided
    if (filename) {
      const filenameType = detectDocumentTypeFromFilename(filename);
      if (filenameType) {
        console.log('Document type detected from filename:', filenameType);
        return filenameType;
      }
    }

    // For structured data files (CSV/XLSX), try header-based detection
    if (fileType === 'csv' || fileType === 'xlsx' || fileType === 'xls') {
      // Split content into lines and get headers
      const lines = content.split('\n');
      if (lines.length > 0) {
        const headers = lines[0].split(',').map(h => h.trim());
        const structuredType = detectDocumentTypeFromStructuredData(headers);
        if (structuredType) {
          console.log('Document type detected from structured data:', structuredType);
          return structuredType;
        }
      }
    }

    // For PDFs, try to detect based on first page content
    if (fileType === 'pdf') {
      // Get first 1000 characters for quick analysis
      const firstPageContent = content.slice(0, 1000);
      
      // Check for common PDF header patterns
      const pdfPatterns = {
        INCOME_STATEMENT: [
          /income statement/i,
          /profit (?:and|&) loss/i,
          /statement of (?:income|earnings)/i
        ],
        BALANCE_SHEET: [
          /balance sheet/i,
          /statement of (?:financial position|assets and liabilities)/i
        ],
        CASH_FLOW_STATEMENT: [
          /cash flow/i,
          /statement of cash flows/i,
          /cash flow statement/i
        ],
        FDD: [
          /franchise disclosure document/i,
          /fdd\s+item/i,
          /franchise disclosure/i
        ]
      };

      for (const [type, patterns] of Object.entries(pdfPatterns)) {
        if (patterns.some(pattern => pattern.test(firstPageContent))) {
          console.log('Document type detected from PDF patterns:', type);
          return type as keyof typeof DOCUMENT_PROMPTS;
        }
      }
    }

    // Try OpenAI detection
    try {
      const response = await fetch('/api/detect-document-type', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          content,
          filename,
          fileType 
        })
      });

      if (response.ok) {
        const { documentType: aiType } = await response.json();
        console.log('Document type detected by OpenAI:', aiType);
        return aiType;
      }
    } catch (error) {
      console.error('OpenAI detection failed:', error);
    }

    // Fall back to keyword detection
    return detectDocumentTypeByKeywords(content);

  } catch (error) {
    console.error('Error in document type detection:', error);
    return detectDocumentTypeByKeywords(content);
  }
}
