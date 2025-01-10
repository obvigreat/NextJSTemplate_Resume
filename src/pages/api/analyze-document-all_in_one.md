/**
 * This Next.js API route demonstrates how to:
 * 1) Upload a file to a fixed Supabase public storage URL (in the "initial_fin_doc" folder).
 * 2) Extract and analyze the file content using OpenAI.
 * 3) Store the resulting JSON in Supabase storage as well.
 * 4) Parse the JSON and insert structured data into your Supabase database tables.
 *
 * GOAL: You can copy/paste this code into a new file (e.g. pages/api/analyze-document.ts)
 *       in your Next.js project WITHOUT further alterations. Make sure to:
 *       - Have the required Supabase tables, columns, and a public "documents" bucket set up.
 *       - Set the following environment variables:
 *            NEXT_PUBLIC_SUPABASE_URL
 *            SUPABASE_SERVICE_ROLE_KEY
 *            OPENAI_API_KEY
 */

import { NextApiRequest, NextApiResponse } from 'next';
import OpenAI from 'openai';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { v4 as uuidv4 } from 'uuid';

// ----------------------------------
// 1. ENVIRONMENT & SUPABASE CLIENT
// ----------------------------------
const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY || '';
const OPENAI_API_KEY = process.env.OPENAI_API_KEY || '';

if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY || !OPENAI_API_KEY) {
  throw new Error(
    'Missing required environment variables: NEXT_PUBLIC_SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, OPENAI_API_KEY'
  );
}

// Initialize Supabase client
const supabase: SupabaseClient = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);
// Initialize OpenAI client
const openai = new OpenAI({ apiKey: OPENAI_API_KEY });

// ----------------------------------
// 2. INTERFACES
// ----------------------------------
interface FinancialData {
  companies: Array<{
    company_id: string;
    company_name: string;
    ticker_symbol?: string;
    industry?: string;
    country?: string;
  }>;
  periods: Array<{
    period_id: string;
    period_start_date: string;
    period_end_date: string;
    fiscal_year: number;
    fiscal_quarter: number;
    period_type: string;
  }>;
  income_statements: Array<{
    id: string;
    company_id: string;
    reporting_period: string;
    fiscal_year: number;
    fiscal_quarter: number;
    revenue: number;
    cost_of_goods_sold: number;
    gross_profit: number;
    operating_expenses: number;
    selling_general_administrative_expenses: number;
    research_development_expenses: number;
    other_operating_expenses: number;
    operating_income: number;
    interest_expense: number;
    interest_income: number;
    other_income_expense_net: number;
    earnings_before_tax: number;
    income_tax_expense: number;
    net_income: number;
    preferred_dividends: number;
    net_income_available_to_common: number;
    weighted_average_shares_outstanding_basic: number;
    weighted_average_shares_outstanding_diluted: number;
    earnings_per_share_basic: number;
    earnings_per_share_diluted: number;
  }>;
  balance_sheets: Array<{
    id: string;
    company_id: string;
    reporting_period: string;
    fiscal_year: number;
    fiscal_quarter: number;
    cash_and_cash_equivalents: number;
    short_term_investments: number;
    accounts_receivable: number;
    allowance_for_doubtful_accounts: number;
    net_accounts_receivable: number;
    inventory: number;
    other_current_assets: number;
    total_current_assets: number;
    property_plant_equipment_gross: number;
    accumulated_depreciation: number;
    property_plant_equipment_net: number;
    goodwill: number;
    intangible_assets: number;
    other_long_term_assets: number;
    total_non_current_assets: number;
    total_assets: number;
    accounts_payable: number;
    accrued_liabilities: number;
    short_term_debt: number;
    current_portion_of_long_term_debt: number;
    other_current_liabilities: number;
    total_current_liabilities: number;
    long_term_debt: number;
    deferred_tax_liabilities: number;
    other_non_current_liabilities: number;
    total_non_current_liabilities: number;
    total_liabilities: number;
    common_stock: number;
    additional_paid_in_capital: number;
    retained_earnings: number;
    accumulated_other_comprehensive_income: number;
    treasury_stock: number;
    total_shareholders_equity: number;
    total_liabilities_and_equity: number;
  }>;
  cash_flow_statements: Array<{
    id: string;
    company_id: string;
    reporting_period: string;
    fiscal_year: number;
    fiscal_quarter: number;
    net_income: number;
    depreciation_and_amortization: number;
    stock_based_compensation: number;
    other_non_cash_items: number;
    change_in_accounts_receivable: number;
    change_in_inventory: number;
    change_in_accounts_payable: number;
    change_in_other_working_capital: number;
    cash_flow_from_operations: number;
    capital_expenditures: number;
    investments_in_intangibles: number;
    proceeds_from_sale_of_assets: number;
    other_investing_activities: number;
    cash_flow_from_investing: number;
    issuance_of_debt: number;
    repayment_of_debt: number;
    issuance_of_equity: number;
    repurchase_of_stock: number;
    dividends_paid: number;
    other_financing_activities: number;
    cash_flow_from_financing: number;
    effect_of_exchange_rate_changes_on_cash: number;
    net_increase_decrease_in_cash: number;
    cash_at_beginning_of_period: number;
    cash_at_end_of_period: number;
  }>;
  financial_ratios: Array<{
    id: string;
    company_id: string;
    reporting_period: string;
    fiscal_year: number;
    fiscal_quarter: number;
    gross_margin: number;
    operating_margin: number;
    net_margin: number;
    return_on_assets: number;
    return_on_equity: number;
    return_on_invested_capital: number;
    current_ratio: number;
    quick_ratio: number;
    inventory_turnover: number;
    receivables_turnover: number;
    asset_turnover: number;
    debt_to_equity: number;
    debt_to_ebitda: number;
    interest_coverage_ratio: number;
    price_to_earnings: number;
    price_to_book: number;
    enterprise_value: number;
    ev_to_ebitda: number;
    ev_to_ebit: number;
    revenue_growth_rate: number;
    ebitda_growth_rate: number;
    net_income_growth_rate: number;
    free_cash_flow: number;
    unlevered_free_cash_flow: number;
    levered_free_cash_flow: number;
    dividend_yield: number;
    payout_ratio: number;
  }>;
  mna_analysis: Array<{
    id: string;
    company_id: string;
    reporting_period: string;
    target_company_id: string;
    estimated_synergies: number;
    accretion_dilution_percent: number;
    pro_forma_eps: number;
    wacc: number;
    terminal_value: number;
  }>;
  user_profiles: Array<{
    id: string;
    first_name: string;
    last_name: string;
    email: string;
    settings: Record<string, any>;
    preferences: Record<string, any>;
    created_at: string;
    updated_at: string;
  }>;
  organizations: Array<{
    id: string;
    name: string;
    description: string;
    user_id: string;
    settings: Record<string, any>;
    created_at: string;
    updated_at: string;
  }>;
  deals: Array<{
    id: string;
    title: string;
    description: string;
    company_name: string;
    deal_type: string;
    asking_price: number;
    business_description: string;
    status: string;
    user_id: string;
    organization_id: string;
    metrics: Record<string, any>;
    deal_terms: Record<string, any>;
    tags: string[];
    created_at: string;
    updated_at: string;
  }>;
}

// ----------------------------------
// 3. PROMPT TEMPLATES
// ----------------------------------
const DOCUMENT_PROMPTS = {
  INCOME_STATEMENT: `You are analyzing an Income Statement. Extract the financial data and return it in this exact format:
  {
    "companies": [
      {
        "company_id": "${uuidv4()}",
        "company_name": "Company Name",
        "ticker_symbol": null,
        "industry": null,
        "country": null
      }
    ],
    "periods": [
      {
        "period_id": "${uuidv4()}",
        "period_start_date": "2023-01-01",
        "period_end_date": "2023-12-31",
        "fiscal_year": 2023,
        "fiscal_quarter": 1,
        "period_type": "annual"
      }
    ],
    "income_statements": [
      {
        "id": "${uuidv4()}",
        "company_id": "${uuidv4()}",
        "reporting_period": "${uuidv4()}",
        "fiscal_year": 2023,
        "fiscal_quarter": 1,
        "revenue": 1000000,
        "cost_of_goods_sold": 600000,
        "gross_profit": 400000,
        "operating_expenses": 150000,
        "selling_general_administrative_expenses": 100000,
        "research_development_expenses": 30000,
        "other_operating_expenses": 20000,
        "operating_income": 210000,
        "interest_expense": 10000,
        "interest_income": 2000,
        "other_income_expense_net": 5000,
        "earnings_before_tax": 213000,
        "income_tax_expense": 53000,
        "net_income": 160000,
        "preferred_dividends": 0,
        "net_income_available_to_common": 160000,
        "weighted_average_shares_outstanding_basic": 1000000,
        "weighted_average_shares_outstanding_diluted": 1050000,
        "earnings_per_share_basic": 0.16,
        "earnings_per_share_diluted": 0.152
      }
    ]
  }`,

  BALANCE_SHEET: `You are analyzing a Balance Sheet. Extract the financial data and return it in this exact format:
  {
    "companies": [
      {
        "company_id": "${uuidv4()}",
        "company_name": "Company Name",
        "ticker_symbol": null,
        "industry": null,
        "country": null
      }
    ],
    "periods": [
      {
        "period_id": "${uuidv4()}",
        "period_start_date": "2023-01-01",
        "period_end_date": "2023-12-31",
        "fiscal_year": 2023,
        "fiscal_quarter": 1,
        "period_type": "annual"
      }
    ],
    "balance_sheets": [
      {
        "id": "${uuidv4()}",
        "company_id": "${uuidv4()}",
        "reporting_period": "${uuidv4()}",
        "fiscal_year": 2023,
        "fiscal_quarter": 1,
        "cash_and_cash_equivalents": 200000,
        "short_term_investments": 50000,
        "accounts_receivable": 150000,
        "allowance_for_doubtful_accounts": 5000,
        "net_accounts_receivable": 145000,
        "inventory": 200000,
        "other_current_assets": 50000,
        "total_current_assets": 445000,
        "property_plant_equipment_gross": 600000,
        "accumulated_depreciation": 100000,
        "property_plant_equipment_net": 500000,
        "goodwill": 100000,
        "intangible_assets": 50000,
        "other_long_term_assets": 25000,
        "total_non_current_assets": 675000,
        "total_assets": 1120000,
        "accounts_payable": 90000,
        "accrued_liabilities": 30000,
        "short_term_debt": 20000,
        "current_portion_of_long_term_debt": 10000,
        "other_current_liabilities": 20000,
        "total_current_liabilities": 170000,
        "long_term_debt": 300000,
        "deferred_tax_liabilities": 25000,
        "other_non_current_liabilities": 50000,
        "total_non_current_liabilities": 375000,
        "total_liabilities": 545000,
        "common_stock": 50000,
        "additional_paid_in_capital": 200000,
        "retained_earnings": 100000,
        "accumulated_other_comprehensive_income": 5000,
        "treasury_stock": -20000,
        "total_shareholders_equity": 335000,
        "total_liabilities_and_equity": 880000
      }
    ]
  }`,

  CASH_FLOW: `You are analyzing a Cash Flow Statement. Extract the financial data and return it in this exact format:
  {
    "companies": [
      {
        "company_id": "${uuidv4()}",
        "company_name": "Company Name",
        "ticker_symbol": null,
        "industry": null,
        "country": null
      }
    ],
    "periods": [
      {
        "period_id": "${uuidv4()}",
        "period_start_date": "2023-01-01",
        "period_end_date": "2023-12-31",
        "fiscal_year": 2023,
        "fiscal_quarter": 1,
        "period_type": "annual"
      }
    ],
    "cash_flow_statements": [
      {
        "id": "${uuidv4()}",
        "company_id": "${uuidv4()}",
        "reporting_period": "${uuidv4()}",
        "fiscal_year": 2023,
        "fiscal_quarter": 1,
        "net_income": 160000,
        "depreciation_and_amortization": 50000,
        "stock_based_compensation": 10000,
        "other_non_cash_items": 5000,
        "change_in_accounts_receivable": -15000,
        "change_in_inventory": -20000,
        "change_in_accounts_payable": 10000,
        "change_in_other_working_capital": -5000,
        "cash_flow_from_operations": 190000,
        "capital_expenditures": -50000,
        "investments_in_intangibles": -5000,
        "proceeds_from_sale_of_assets": 10000,
        "other_investing_activities": 0,
        "cash_flow_from_investing": -45000,
        "issuance_of_debt": 100000,
        "repayment_of_debt": -20000,
        "issuance_of_equity": 50000,
        "repurchase_of_stock": -10000,
        "dividends_paid": 0,
        "other_financing_activities": 0,
        "cash_flow_from_financing": 120000,
        "effect_of_exchange_rate_changes_on_cash": 0,
        "net_increase_decrease_in_cash": 265000,
        "cash_at_beginning_of_period": 500000,
        "cash_at_end_of_period": 765000
      }
    ]
  }`,

  FINANCIAL_RATIOS: `You are analyzing Financial Ratios. Extract the financial data and return it in this exact format:
  {
    "companies": [
      {
        "company_id": "${uuidv4()}",
        "company_name": "Company Name",
        "ticker_symbol": null,
        "industry": null,
        "country": null
      }
    ],
    "periods": [
      {
        "period_id": "${uuidv4()}",
        "period_start_date": "2023-01-01",
        "period_end_date": "2023-12-31",
        "fiscal_year": 2023,
        "fiscal_quarter": 1,
        "period_type": "annual"
      }
    ],
    "financial_ratios": [
      {
        "id": "${uuidv4()}",
        "company_id": "${uuidv4()}",
        "reporting_period": "${uuidv4()}",
        "fiscal_year": 2023,
        "fiscal_quarter": 1,
        "gross_margin": 0.4,
        "operating_margin": 0.23,
        "net_margin": 0.16,
        "return_on_assets": 0.07,
        "return_on_equity": 0.10,
        "return_on_invested_capital": 0.09,
        "current_ratio": 1.2,
        "quick_ratio": 0.9,
        "inventory_turnover": 2.5,
        "receivables_turnover": 4.0,
        "asset_turnover": 0.5,
        "debt_to_equity": 2.0,
        "debt_to_ebitda": 10.0,
        "interest_coverage_ratio": 20.0,
        "price_to_earnings": 15.0,
        "price_to_book": 2.0,
        "enterprise_value": 1.5,
        "ev_to_ebitda": 0.05,
        "ev_to_ebit": 0.10,
        "revenue_growth_rate": 0.08,
        "ebitda_growth_rate": 0.03,
        "net_income_growth_rate": 0.04,
        "free_cash_flow": 50000,
        "unlevered_free_cash_flow": 60000,
        "levered_free_cash_flow": 40000,
        "dividend_yield": 0.01,
        "payout_ratio": 0.20
      }
    ]
  }`,
} as const;

// ----------------------------------
// 4. UTILS: DETECT DOCUMENT TYPE
// ----------------------------------
const KEYWORDS = {
  INCOME_STATEMENT: ['revenue', 'net income', 'gross profit', 'operating income', 'earnings per share'],
  BALANCE_SHEET: ['assets', 'liabilities', 'equity', 'current assets', 'total assets'],
  CASH_FLOW: ['cash flow', 'operating activities', 'investing activities', 'financing activities'],
  FINANCIAL_RATIOS: ['ratio', 'margin', 'return on', 'turnover', 'coverage'],
};

function detectDocumentType(content: string): keyof typeof DOCUMENT_PROMPTS {
  const contentLower = content.toLowerCase();
  const matches = Object.entries(KEYWORDS).map(([type, words]) => {
    const count = words.filter((w) => contentLower.includes(w)).length;
    return { type, count };
  });
  const best = matches.sort((a, b) => b.count - a.count)[0];
  if (best && best.count > 0 && best.type in DOCUMENT_PROMPTS) {
    return best.type as keyof typeof DOCUMENT_PROMPTS;
  }
  return 'INCOME_STATEMENT';
}

// ----------------------------------
// 5. HELPER: BUILD PROMPT
// ----------------------------------
function getPromptForDocumentType(
  documentType: keyof typeof DOCUMENT_PROMPTS,
  fileContent: string
): string {
  const prompt = DOCUMENT_PROMPTS[documentType];
  return `${prompt}

    RULES:
    1. ALL numbers must be actual numbers (1000000), not strings ("1000000")
    2. ALL dates must be in YYYY-MM-DD format
    3. Use null for unknown values
    4. Keep EXACTLY this structure
    5. Include AT LEAST company_name and fiscal_year
    6. NO additional fields
    7. NO markdown
    8. NO explanations
    9. ONLY the JSON object

    For CSV/XLSX files:
    - First row often contains headers
    - Look for columns that match financial metrics
    - Convert any currency values to numbers
    - Remove any currency symbols or commas
    - Dates must be YYYY-MM-DD

    For PDF files:
    - The data may be unstructured text, do your best to find the relevant financial info
    - Follow the same rules above

    Content to analyze:
    ${fileContent}
  `;
}

// ----------------------------------
// 6. HELPER: EXTRACT JSON FROM OpenAI
// ----------------------------------
function extractJsonFromOpenAI(response: string): string {
  let content = response.trim();
  if (content.includes('```')) {
    const match = content.match(/```(?:json)?([\s\S]+?)```/);
    if (match) {
      content = match[1].trim();
    }
  }
  const start = content.indexOf('{');
  const end = content.lastIndexOf('}');
  if (start < 0 || end < 0) {
    throw new Error('No JSON object found in OpenAI response');
  }
  return content.substring(start, end + 1);
}

// ----------------------------------
// 7. MAIN HANDLER
// ----------------------------------
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    if (req.method !== 'POST') {
      return res.status(405).json({ error: 'Method not allowed' });
    }

    /**
     * EXPECTED BODY:
     * {
     *   "fileName": "MyDocument.csv",
     *   "fileType": "csv",
     *   "fileBase64": "base64-encoded-file-content"
     * }
     *
     * If you are using multipart/form-data, parse accordingly.
     */
    const { fileName, fileType, fileBase64 } = req.body || {};
    if (!fileName || !fileType || !fileBase64) {
      return res.status(400).json({
        error: 'Missing required parameters: fileName, fileType, fileBase64',
      });
    }

    // -----------------------------------------------------
    // STEP 1: Upload the file to Supabase storage (public)
    // -----------------------------------------------------
    // We'll store it in the "documents" bucket under "initial_fin_doc/<fileName>"
    const filePath = `initial_fin_doc/${fileName}`;
    console.log(`Uploading file to: ${filePath}`);

    const fileBuffer = Buffer.from(fileBase64, 'base64');

    // Upload the file only once
    const { error: uploadError } = await supabase.storage
      .from('documents')
      .upload(filePath, fileBuffer, {
        upsert: true,
        contentType: fileType,
      });

    if (uploadError) {
      throw new Error(`Failed to upload file to Supabase: ${uploadError.message}`);
    }

    // Build the public URL
    const { data: publicData } = supabase.storage
      .from('documents')
      .getPublicUrl(filePath);

    const publicUrl = publicData?.publicUrl;
    if (!publicUrl) {
      throw new Error('Could not generate a public URL for the uploaded file.');
    }
    console.log('File publicly available at:', publicUrl);

    // -----------------------------------------------------
    // STEP 2: Extract content from the file in memory
    // -----------------------------------------------------
    // Since we already have `fileBuffer`, there's no need to fetch from the public URL again.
    // We can interpret the buffer directly:
    let fileContent = '';
    const lowerType = fileType.toLowerCase();

    if (lowerType === 'csv') {
      fileContent = fileBuffer.toString('utf8');
    } else if (lowerType === 'pdf' || lowerType === 'xlsx') {
      // For demonstration, we might just convert the file to base64 text for the OpenAI prompt
      // (or parse further if you have a library to handle XLSX/PDF)
      fileContent = fileBuffer.toString('base64');
    } else {
      // Fallback: treat as raw text or base64
      fileContent = fileBuffer.toString('base64');
    }

    // -----------------------------------------------------
    // STEP 3: Use OpenAI to analyze file content
    // -----------------------------------------------------
    const docType = detectDocumentType(fileContent);
    const prompt = getPromptForDocumentType(docType, fileContent);

    // Attempt call to OpenAI with a 60s timeout
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 60000);

    let completion;
    try {
      completion = await openai.chat.completions.create(
        {
          model: 'o1-mini',
          messages: [{ role: 'user', content: prompt }],
        },
        { signal: controller.signal }
      );
    } finally {
      clearTimeout(timeout);
    }

    if (!completion?.choices?.[0]?.message?.content) {
      throw new Error('No content returned from OpenAI');
    }

    // -----------------------------------------------------
    // STEP 4: Extract JSON from OpenAI's response
    // -----------------------------------------------------
    let structuredData: Partial<FinancialData> = {};
    try {
      const rawJson = extractJsonFromOpenAI(completion.choices[0].message.content);
      structuredData = JSON.parse(rawJson);
    } catch (jsonErr: any) {
      throw new Error(`Could not parse JSON from OpenAI: ${jsonErr.message}`);
    }

    // -----------------------------------------------------
    // STEP 5: Store the raw JSON file in Supabase (optional)
    // -----------------------------------------------------
    // We'll store the JSON in "initial_fin_doc/json/<unique>.json"
    const jsonFileName = `${uuidv4()}.json`;
    const jsonPath = `initial_fin_doc/json/${jsonFileName}`;
    console.log('Storing JSON at:', jsonPath);

    const { error: jsonUploadError } = await supabase.storage
      .from('documents')
      .upload(
        jsonPath,
        Buffer.from(JSON.stringify(structuredData, null, 2)),
        {
          upsert: true,
          contentType: 'application/json',
        }
      );

    if (jsonUploadError) {
      throw new Error(`Failed to store JSON file in Supabase: ${jsonUploadError.message}`);
    }

    const { data: jsonPublicData } = supabase.storage
      .from('documents')
      .getPublicUrl(jsonPath);

    const jsonPublicUrl = jsonPublicData?.publicUrl || null;
    console.log('JSON publicly available at:', jsonPublicUrl);

    // -----------------------------------------------------
    // STEP 6: Merge with default sections & minimal fixes
    // -----------------------------------------------------
    const defaultSections: FinancialData = {
      companies: [],
      periods: [],
      income_statements: [],
      balance_sheets: [],
      cash_flow_statements: [],
      financial_ratios: [],
      mna_analysis: [],
      user_profiles: [],
      organizations: [],
      deals: [],
    };

    // Ensures every array is present
    const mergedData = { ...defaultSections, ...structuredData };

    // Guarantee at least one company + period
    const company_id = uuidv4();
    if (!mergedData.companies.length) {
      mergedData.companies.push({
        company_id,
        company_name: fileName.replace(/\.[^/.]+$/, '').replace(/_/g, ' '),
      });
    } else {
      // Overwrite the first one’s company_id
      mergedData.companies[0].company_id = company_id;
    }

    const period_id = uuidv4();
    if (!mergedData.periods.length) {
      mergedData.periods.push({
        period_id,
        period_start_date: `${new Date().getFullYear()}-01-01`,
        period_end_date: `${new Date().getFullYear()}-12-31`,
        fiscal_year: new Date().getFullYear(),
        fiscal_quarter: 1,
        period_type: 'annual',
      });
    } else {
      mergedData.periods[0].period_id = period_id;
    }

    // Fix references in statements
    if (mergedData.income_statements.length) {
      mergedData.income_statements = mergedData.income_statements.map((s) => ({
        ...s,
        id: uuidv4(),
        company_id,
        reporting_period: period_id,
      }));
    }
    if (mergedData.balance_sheets.length) {
      mergedData.balance_sheets = mergedData.balance_sheets.map((s) => ({
        ...s,
        id: uuidv4(),
        company_id,
        reporting_period: period_id,
      }));
    }
    if (mergedData.cash_flow_statements.length) {
      mergedData.cash_flow_statements = mergedData.cash_flow_statements.map((s) => ({
        ...s,
        id: uuidv4(),
        company_id,
        reporting_period: period_id,
      }));
    }
    if (mergedData.financial_ratios.length) {
      mergedData.financial_ratios = mergedData.financial_ratios.map((s) => ({
        ...s,
        id: uuidv4(),
        company_id,
        reporting_period: period_id,
      }));
    }

    // -----------------------------------------------------
    // STEP 7: Insert a 'document' record in Supabase
    // -----------------------------------------------------
    // Make sure your 'documents' table doesn't conflict with the 'documents' storage bucket name
    // If so, rename the table or the bucket.
    const { data: docRecord, error: docError } = await supabase
      .from('documents')
      .insert({
        name: fileName,
        url: publicUrl,
        file_type: fileType,
        file_extension: fileName.split('.').pop() || null,
        analyzed_at: new Date().toISOString(),
        confidence_score: 0,
        json_file_url: jsonPublicUrl, // optional if you have such a column
      })
      .select()
      .single();

    if (docError) {
      throw new Error(`Error inserting into 'documents' table: ${docError.message}`);
    }
    if (!docRecord?.id) {
      throw new Error('No valid document ID returned after insert.');
    }

    const documentId = docRecord.id;

    // -----------------------------------------------------
    // STEP 8: Parse & store data in the appropriate tables
    // -----------------------------------------------------
    const insertRecords = async (table: string, records: any[]) => {
      if (!records?.length) return;
      const { error } = await supabase
        .from(table)
        .insert(records.map((r) => ({ ...r, document_id: documentId })));
      if (error) {
        throw new Error(`Failed to insert into ${table}: ${error.message}`);
      }
    };

    await insertRecords('companies', mergedData.companies);
    await insertRecords('periods', mergedData.periods);
    await insertRecords('income_statements', mergedData.income_statements);
    await insertRecords('balance_sheets', mergedData.balance_sheets);
    await insertRecords('cash_flow_statements', mergedData.cash_flow_statements);
    await insertRecords('financial_ratios', mergedData.financial_ratios);

    // If desired, also handle 'mna_analysis', 'user_profiles', 'organizations', 'deals', etc.

    // -----------------------------------------------------
    // DONE: Return success
    // -----------------------------------------------------
    return res.status(200).json({
      success: true,
      documentId,
      publicUrl,
      jsonPublicUrl,
      data: mergedData,
    });
  } catch (error: any) {
    console.error('Error in analyze-document route:', error);
    return res.status(500).json({
      success: false,
      error: error.message || 'Unknown server error',
    });
  }
}