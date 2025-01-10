// src/lib/prompts.ts
import { v4 as uuidv4 } from 'uuid';

/**
 * 3. PROMPT TEMPLATES
 * We generate a JSON structure for each type of financial or franchise-related document.
 */
export const DOCUMENT_PROMPTS = {
  INCOME_STATEMENT: `You are a M&A analyst. You are analyzing an Income Statement. Extract the financial data and return it in this exact format:
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

  BALANCE_SHEET: `You are a M&A analyst. You are analyzing a Balance Sheet. Extract the financial data and return it in this exact format:
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

  CASH_FLOW: `You are a M&A analyst. You are analyzing a Cash Flow Statement. Extract the financial data and return it in this exact format:
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

  FINANCIAL_RATIOS: `You are a M&A analyst. You are analyzing Financial Ratios. Extract the financial data and return it in this exact format:
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

  /**
   *  NEW ADDITION #1: FRANCHISE DISCLOSURE DOCUMENT (FDD)
   */
  FDD: `You are a M&A analyst. You are analyzing a Franchise Disclosure Document (FDD). Extract the relevant franchise data and return it in this exact format:
  {
    "companies": [
      {
        "company_id": "${uuidv4()}",
        "company_name": "Franchisor Name",
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
        "fiscal_quarter": null,
        "period_type": "annual"
      }
    ],
    "fdd_analysis": [
      {
        "id": "${uuidv4()}",
        "company_id": "${uuidv4()}",
        "reporting_period": "${uuidv4()}",
        "fiscal_year": 2023,
        "franchise_fee": 35000,
        "royalty_fee_percentage": 0.05,
        "ad_fund_fee_percentage": 0.02,
        "term_of_agreement_years": 10,
        "renewal_terms": 1,
        "territory_protection": true,
        "training_programs_included": ["classroom", "on-site"],
        "initial_investment_range_low": 100000,
        "initial_investment_range_high": 200000,
        "other_fees": [
          { "name": "technology fee", "amount": 5000 },
          { "name": "local marketing", "amount": 3000 }
        ],
        "legal_disclaimers": "Some standard disclaimers here",
        "key_items_section": {
          "item_1": "The Franchisor and any Parents/Affiliates",
          "item_2": "Business Experience of Principals",
          "item_3": "Litigation History",
          "item_4": "Bankruptcy",
          "item_5": "Initial Fees",
          "item_6": "Other Fees",
          "item_7": "Estimated Initial Investment",
          "item_8": "Restrictions on Sources of Products and Services",
          "item_9": "Franchisee Obligations",
          "item_10": "Financing",
          "item_11": "Franchisor Assistance, Advertising, Computer Systems, and Training",
          "item_12": "Territory",
          "item_13": "Trademarks",
          "item_14": "Patents, Copyrights, and Proprietary Information",
          "item_15": "Obligation to Participate in the Actual Operation of the Franchise Business",
          "item_16": "Restrictions on What the Franchisee May Sell",
          "item_17": "Renewal, Termination, Transfer, and Dispute Resolution",
          "item_18": "Public Figures",
          "item_19": "Financial Performance Representations",
          "item_20": "Outlets and Franchisee Information",
          "item_21": "Financial Statements",
          "item_22": "Contracts",
          "item_23": "Receipts"
        },
        "date_of_issuance": "2023-12-31"
      }
    ]
  }`,

  /**
   *  NEW ADDITION #2: STATEMENT OF SHAREHOLDERS' EQUITY
   */
  STATEMENT_OF_SHAREHOLDERS_EQUITY: `You are a M&A analyst. You are analyzing a Statement of Shareholders' Equity. Extract the relevant data and return it in this exact format:
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
    "statements_of_shareholders_equity": [
      {
        "id": "${uuidv4()}",
        "company_id": "${uuidv4()}",
        "reporting_period": "${uuidv4()}",
        "fiscal_year": 2023,
        "fiscal_quarter": 1,
        "common_stock": 50000,
        "preferred_stock": 0,
        "additional_paid_in_capital": 200000,
        "retained_earnings_beginning": 150000,
        "net_income": 40000,
        "dividends_paid": -10000,
        "other_comprehensive_income": 3000,
        "treasury_stock": -5000,
        "ending_retained_earnings": 180000,
        "total_shareholders_equity": 472000
      }
    ]
  }`,
} as const;
