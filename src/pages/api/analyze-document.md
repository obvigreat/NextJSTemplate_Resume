import { NextApiRequest, NextApiResponse } from 'next';
import OpenAI from 'openai';
import { createClient } from '@supabase/supabase-js';
import { v4 as uuidv4 } from 'uuid';

// Type definition for environment variables
interface EnvVariables {
  OPENAI_API_KEY: string;
  NEXT_PUBLIC_SUPABASE_URL: string;
  SUPABASE_SERVICE_ROLE_KEY: string;
}

// Validate environment variables
const requiredEnvVars: EnvVariables = {
  OPENAI_API_KEY: process.env.OPENAI_API_KEY ?? '',
  NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL ?? '',
  SUPABASE_SERVICE_ROLE_KEY: process.env.SUPABASE_SERVICE_ROLE_KEY ?? '',
};

// Validate all required environment variables are present
Object.entries(requiredEnvVars).forEach(([name, value]) => {
  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }
});

// Initialize clients
const openai = new OpenAI({ apiKey: requiredEnvVars.OPENAI_API_KEY });
const supabase = createClient(
  requiredEnvVars.NEXT_PUBLIC_SUPABASE_URL,
  requiredEnvVars.SUPABASE_SERVICE_ROLE_KEY
);

// Type definitions
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

async function fetchFileContent(url: string, fileType: string): Promise<string> {
  try {
    // If it's a Supabase storage URL, get a signed URL first
    if (url.includes('storage.googleapis.com') || url.includes('supabase.co')) {
      // Extract the bucket name and path from the URL
      let bucketName = '';
      let path = '';
      
      // Log the original URL for debugging (without query parameters)
      console.log('Original storage URL:', url.split('?')[0]);
      
      if (url.includes('storage.googleapis.com')) {
        // For Google Storage URLs
        const match = url.match(/storage\.googleapis\.com\/([^\/]+)\/(.+?)(?:\?|$)/);
        if (match) {
          bucketName = match[1];
          path = match[2];
        }
      } else if (url.includes('supabase.co')) {
        // For Supabase Storage URLs
        const match = url.match(/storage\/v1\/object\/(?:public|authenticated)\/([^\/]+)\/(.+?)(?:\?|$)/);
        if (match) {
          bucketName = match[1];
          path = decodeURIComponent(match[2]); // Decode the URL-encoded path
        }
      }

      console.log('Extracted storage info:', {
        bucketName,
        path,
        originalUrl: url.split('?')[0]
      });

      if (!bucketName || !path) {
        throw new Error('Could not extract valid bucket name and path from URL');
      }

      // Try to get the file directly from Supabase storage first
      const { data: fileData, error: downloadError } = await supabase
        .storage
        .from(bucketName)
        .download(path);

      if (downloadError) {
        console.error('Direct download error:', downloadError);
        throw new Error(`Failed to download file: ${downloadError.message}`);
      }

      if (!fileData) {
        throw new Error('No file data received from Supabase');
      }

      // For CSV files, try to read as text first
      if (fileType.toLowerCase() === 'csv') {
        try {
          // Try to read the blob as text
          const text = await fileData.text();
          
          // Validate the content
          if (text.trim().toLowerCase().startsWith('<!doctype') || 
              text.trim().startsWith('<html') ||
              text.includes('<?xml')) {
            throw new Error('Received HTML/XML content instead of CSV');
          }

          // Basic CSV validation
          if (!text.includes(',')) {
            throw new Error('Invalid CSV format: no commas found in content');
          }

          const lines = text.trim().split('\n');
          if (lines.length < 2) {
            throw new Error('Invalid CSV format: file has less than 2 lines');
          }

          // Log the first few lines for debugging
          console.log('CSV content validation:', {
            totalLines: lines.length,
            firstLine: lines[0],
            hasCommas: text.includes(','),
            contentPreview: text.substring(0, 200)
          });

          return text;
        } catch (textError) {
          console.error('Error reading CSV as text:', textError);
          
          // Try to read as array buffer and convert
          const arrayBuffer = await fileData.arrayBuffer();
          const decoder = new TextDecoder('utf-8');
          const text = decoder.decode(arrayBuffer);
          
          // Validate the decoded content
          if (text.trim().toLowerCase().startsWith('<!doctype') || 
              text.trim().startsWith('<html') ||
              text.includes('<?xml')) {
            throw new Error('Received HTML/XML content instead of CSV after buffer conversion');
          }
          
          return text;
        }
      }

      // For other file types, convert to base64
      const arrayBuffer = await fileData.arrayBuffer();
      const base64 = Buffer.from(arrayBuffer).toString('base64');
      return base64;
    }

    throw new Error('URL must be a Supabase storage URL');
  } catch (error: any) {
    console.error('File fetch error:', {
      error: error.message,
      stack: error.stack,
      url: url.split('?')[0],
      fileType: fileType
    });
    throw new Error(`Failed to fetch file content: ${error.message}`);
  }
}

function validateFinancialData(data: any): data is FinancialData {
  try {
    // Log the entire data structure for debugging
    console.log('Validating data structure:', JSON.stringify(data, null, 2));

    // Check if data is an object
    if (typeof data !== 'object' || data === null) {
      console.error('Data is not an object');
      return false;
    }

    // Initialize missing sections with empty arrays
    const sections = [
      'companies',
      'periods',
      'income_statements',
      'balance_sheets',
      'cash_flow_statements',
      'financial_ratios',
      'mna_analysis',
      'user_profiles',
      'organizations',
      'deals'
    ];

    // Initialize missing sections with empty arrays
    sections.forEach(section => {
      if (!data[section]) {
        console.log(`Initializing missing section with empty array: ${section}`);
        data[section] = [];
      }
      if (!Array.isArray(data[section])) {
        console.log(`Converting section to array: ${section}`);
        data[section] = [data[section]].filter(Boolean);
      }
    });

    // Only validate companies and periods as they are required
    // Validate companies
    if (data.companies.length === 0) {
      console.error('No companies found in the data');
      return false;
    }

    const validCompanies = data.companies.every((company: any, index: number) => {
      console.log(`Validating company ${index}:`, company);
      const hasName = typeof company.company_name === 'string';
      if (!hasName) {
        console.error(`Company ${index} missing or invalid company_name:`, company);
      }
      return hasName;
    });

    if (!validCompanies) {
      console.error('Invalid company data structure');
      return false;
    }

    // Validate periods
    if (data.periods.length === 0) {
      console.error('No periods found in the data');
      return false;
    }

    const validPeriods = data.periods.every((period: any, index: number) => {
      console.log(`Validating period ${index}:`, period);
      const hasYear = typeof period.fiscal_year === 'number';
      if (!hasYear) {
        console.error(`Period ${index} missing or invalid fiscal_year:`, period);
      }
      return hasYear;
    });

    if (!validPeriods) {
      console.error('Invalid period data structure');
      return false;
    }

    // For income statements, only validate if they exist
    if (data.income_statements.length > 0) {
      console.log('Validating income statements:', data.income_statements);
      const validIncomeStatements = data.income_statements.every((statement: any, index: number) => {
        const requiredFields = ['revenue', 'net_income'];
        const hasRequiredFields = requiredFields.every(field => {
          const value = statement[field];
          const isValid = typeof value === 'number' || value === null;
          if (!isValid) {
            console.error(`Income statement ${index} invalid ${field}:`, value);
          }
          return isValid;
        });
        return hasRequiredFields;
      });

      if (!validIncomeStatements) {
        console.error('Invalid income statement data structure');
        return false;
      }
    }

    // Log successful validation
    console.log('Validation passed with structure:', {
      companiesCount: data.companies.length,
      periodsCount: data.periods.length,
      incomeStatementsCount: data.income_statements.length,
      companies: data.companies,
      periods: data.periods,
      incomeStatements: data.income_statements
    });

    return true;
  } catch (error) {
    console.error('Validation error:', error);
    return false;
  }
}

async function storeAnalysisResults(documentId: number, data: FinancialData) {
  const insertPromises = [];

  // Helper function to create insert promise
  const createInsertPromise = (table: string, records: any[]) => {
    if (records.length > 0) {
      return supabase
        .from(table)
        .insert(records.map(record => ({
          ...record,
          document_id: documentId
        })))
        .then(({ error }) => {
          if (error) throw new Error(`Error inserting into ${table}: ${error.message}`);
        });
    }
    return Promise.resolve();
  };

  // Create insert promises for each table
  insertPromises.push(createInsertPromise('companies', data.companies));
  insertPromises.push(createInsertPromise('periods', data.periods));
  insertPromises.push(createInsertPromise('income_statements', data.income_statements));
  insertPromises.push(createInsertPromise('balance_sheets', data.balance_sheets));
  insertPromises.push(createInsertPromise('cash_flow_statements', data.cash_flow_statements));
  insertPromises.push(createInsertPromise('financial_ratios', data.financial_ratios));

  // Execute all inserts
  await Promise.all(insertPromises);
}

// Add document type-specific prompts
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
    }`
};

// Function to detect document type from content
function detectDocumentType(content: string): string {
  const contentLower = content.toLowerCase();
  
  // Common keywords for each document type
  const keywords = {
    INCOME_STATEMENT: ['revenue', 'net income', 'gross profit', 'operating income', 'earnings per share'],
    BALANCE_SHEET: ['assets', 'liabilities', 'equity', 'current assets', 'total assets'],
    CASH_FLOW: ['cash flow', 'operating activities', 'investing activities', 'financing activities'],
    FINANCIAL_RATIOS: ['ratio', 'margin', 'return on', 'turnover', 'coverage']
  };

  // Count keyword matches for each type
  const matches = Object.entries(keywords).map(([type, words]) => ({
    type,
    count: words.filter(word => contentLower.includes(word)).length
  }));

  // Sort by match count and get the type with most matches
  const bestMatch = matches.sort((a, b) => b.count - a.count)[0];
  
  console.log('Document type detection:', {
    matches,
    bestMatch,
    contentPreview: content.substring(0, 200)
  });

  return bestMatch.count > 0 ? bestMatch.type : 'INCOME_STATEMENT'; // Default to income statement
}

// Get the appropriate prompt based on document type
function getPromptForDocumentType(documentType: string, fileContent: string): string {
  // Get the appropriate prompt
  const prompt = DOCUMENT_PROMPTS[documentType as keyof typeof DOCUMENT_PROMPTS];
  
  // Add common rules to the prompt
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

    For CSV files:
    - First row usually contains headers
    - Look for columns that match financial metrics
    - Convert any currency values to numbers
    - Remove any currency symbols or commas
    - Dates should be standardized to YYYY-MM-DD

    Content to analyze:
    ${fileContent}`;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { fileUrl, fileName, fileType, fileExtension } = req.body;

    if (!fileUrl || !fileName || !fileType) {
      return res.status(400).json({ error: 'Missing required parameters' });
    }

    console.log(`Processing ${fileType} file: ${fileName}`);

    // Fetch and process the file content
    const fileContent = await fetchFileContent(fileUrl, fileType);

    // Detect document type from content
    const documentType = detectDocumentType(fileContent);
    console.log('Detected document type:', documentType);

    // Get the appropriate prompt for the detected document type
    const combinedPrompt = getPromptForDocumentType(documentType, fileContent);
    console.log('Using prompt for document type:', documentType);

    // Set up abort controller for OpenAI request
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 60000);

    // Make the OpenAI request
    let completion;
    try {
      console.log('Sending request to OpenAI...');
      
      completion = await openai.chat.completions.create({
        model: "o1-mini",
        messages: [
          { 
            role: "user", 
            content: combinedPrompt
          }
        ]
      }, {
        signal: controller.signal
      });

      console.log('OpenAI response received:', {
        status: 'success',
        hasContent: Boolean(completion?.choices?.[0]?.message?.content),
        responseLength: completion?.choices?.[0]?.message?.content?.length || 0
      });

    } catch (error: any) {
      console.error('OpenAI API Error:', {
        message: error.message,
        type: error.type,
        code: error.code,
        stack: error.stack
      });
      throw new Error(`OpenAI API error: ${error.message}`);
    } finally {
      clearTimeout(timeout);
    }

    // Add null check for completion
    if (!completion?.choices?.[0]?.message?.content) {
      throw new Error('No content received from OpenAI');
    }

    // Clean and parse the response
    let structuredData;
    try {
      let jsonContent = completion.choices[0].message.content.trim();
      console.log('Raw OpenAI response:', jsonContent);

      // Extract JSON if wrapped in code blocks
      if (jsonContent.includes('```')) {
        const matches = jsonContent.match(/```(?:json)?([\s\S]+?)```/);
        if (!matches) {
          console.error('Failed to extract JSON from code blocks:', jsonContent);
          throw new Error('Invalid response format: Could not extract JSON from code blocks');
        }
        jsonContent = matches[1].trim();
      }

      // Find and extract JSON object
      const jsonStart = jsonContent.indexOf('{');
      const jsonEnd = jsonContent.lastIndexOf('}');
      if (jsonStart < 0 || jsonEnd < 0) {
        console.error('No JSON object found in content:', jsonContent);
        throw new Error('Invalid response format: No JSON object found');
      }
      jsonContent = jsonContent.substring(jsonStart, jsonEnd + 1);

      // Parse JSON
      try {
        structuredData = JSON.parse(jsonContent);
      } catch (parseError: unknown) {
        console.error('JSON parse error:', parseError);
        console.error('Content that failed to parse:', jsonContent);
        throw new Error(`Failed to parse JSON: ${parseError instanceof Error ? parseError.message : 'Unknown error'}`);
      }

      // Initialize missing sections with defaults
      const defaultData = {
        companies: [],
        periods: [],
        income_statements: [],
        balance_sheets: [],
        cash_flow_statements: [],
        financial_ratios: [],
        mna_analysis: [],
        user_profiles: [],
        organizations: [],
        deals: []
      };

      // Merge with default data
      structuredData = {
        ...defaultData,
        ...structuredData
      };

      // Generate consistent UUIDs for relationships
      const companyId = uuidv4();
      const periodId = uuidv4();

      // Ensure at least one company exists with consistent UUID
      if (!structuredData.companies.length) {
        const companyName = fileName.replace(/\.[^/.]+$/, '').replace(/_/g, ' ');
        structuredData.companies.push({
          company_id: companyId,
          company_name: companyName
        });
      } else {
        // Use the first company's data but with our consistent UUID
        structuredData.companies = [{
          company_id: companyId,
          company_name: structuredData.companies[0].company_name,
          ticker_symbol: structuredData.companies[0].ticker_symbol || null,
          industry: structuredData.companies[0].industry || null,
          country: structuredData.companies[0].country || null
        }];
      }

      // Ensure at least one period exists with consistent UUID
      if (!structuredData.periods.length) {
        structuredData.periods.push({
          period_id: periodId,
          fiscal_year: new Date().getFullYear(),
          fiscal_quarter: 1,
          period_type: 'annual',
          period_start_date: `${new Date().getFullYear()}-01-01`,
          period_end_date: `${new Date().getFullYear()}-12-31`
        });
      } else {
        // Use the first period's data but with our consistent UUID
        structuredData.periods = [{
          period_id: periodId,
          fiscal_year: structuredData.periods[0].fiscal_year,
          fiscal_quarter: structuredData.periods[0].fiscal_quarter || 1,
          period_type: structuredData.periods[0].period_type || 'annual',
          period_start_date: structuredData.periods[0].period_start_date || `${new Date().getFullYear()}-01-01`,
          period_end_date: structuredData.periods[0].period_end_date || `${new Date().getFullYear()}-12-31`
        }];
      }

      // Update income statements with consistent UUIDs
      if (structuredData.income_statements.length > 0) {
        structuredData.income_statements = structuredData.income_statements.map((statement: FinancialData['income_statements'][0]) => ({
          ...statement,
          id: uuidv4(),
          company_id: companyId,  // Use consistent company_id
          reporting_period: periodId  // Use consistent period_id
        }));
      }

      // Update balance sheets with consistent UUIDs
      if (structuredData.balance_sheets.length > 0) {
        structuredData.balance_sheets = structuredData.balance_sheets.map((sheet: FinancialData['balance_sheets'][0]) => ({
          ...sheet,
          id: uuidv4(),
          company_id: companyId,  // Use consistent company_id
          reporting_period: periodId  // Use consistent period_id
        }));
      }

      // Update cash flow statements with consistent UUIDs
      if (structuredData.cash_flow_statements.length > 0) {
        structuredData.cash_flow_statements = structuredData.cash_flow_statements.map((statement: FinancialData['cash_flow_statements'][0]) => ({
          ...statement,
          id: uuidv4(),
          company_id: companyId,  // Use consistent company_id
          reporting_period: periodId  // Use consistent period_id
        }));
      }

      // Update financial ratios with consistent UUIDs
      if (structuredData.financial_ratios.length > 0) {
        structuredData.financial_ratios = structuredData.financial_ratios.map((ratio: FinancialData['financial_ratios'][0]) => ({
          ...ratio,
          id: uuidv4(),
          company_id: companyId,  // Use consistent company_id
          reporting_period: periodId  // Use consistent period_id
        }));
      }

      console.log('Final structured data:', {
        companiesCount: structuredData.companies.length,
        periodsCount: structuredData.periods.length,
        companies: structuredData.companies,
        periods: structuredData.periods,
        income_statements: structuredData.income_statements.length,
        balance_sheets: structuredData.balance_sheets.length,
        cash_flow_statements: structuredData.cash_flow_statements.length,
        financial_ratios: structuredData.financial_ratios.length
      });

    } catch (error: any) {
      console.error('Data processing error:', {
        error: error.message,
        stack: error.stack,
        rawResponse: completion.choices[0].message.content
      });
      throw new Error(`Failed to process OpenAI response: ${error.message}. Please check the server logs for more details.`);
    }

    // Validate the parsed data
    if (!validateFinancialData(structuredData)) {
      console.error('Validation failed for data structure:', {
        data: JSON.stringify(structuredData, null, 2),
        companies: structuredData.companies,
        periods: structuredData.periods
      });
      throw new Error('The financial data structure is invalid. The response is missing required fields or contains invalid values.');
    }

    // Store document record with file type info
    const { data: documentRecord, error: documentError } = await supabase
      .from('documents')
      .insert({
        name: fileName,
        url: fileUrl,
        file_type: fileType,
        file_extension: fileExtension,
        analyzed_at: new Date().toISOString(),
        confidence_score: 0 // Fixed confidence score issue
      })
      .select()
      .single();

    if (documentError) throw documentError;

    // Store all extracted data
    await storeAnalysisResults(documentRecord.id, structuredData);

    return res.status(200).json({
      success: true,
      data: structuredData
    });

  } catch (error: any) {
    console.error('Analysis Error:', error);
    return res.status(500).json({
      success: false,
      error: error.message || 'An error occurred during analysis'
    });
  }
} 