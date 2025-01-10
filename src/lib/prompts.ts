// src/lib/prompts.ts
import { v4 as uuidv4 } from 'uuid';

/**
 * 3. PROMPT TEMPLATES
 * We generate both example JSON structures with fake data and template JSON structures with placeholders
 * for each type of financial or franchise-related document.
 */
export const DOCUMENT_PROMPTS = {
  INCOME_STATEMENT: {
    example: `You are a M&A analyst. Below is an example of an extracted Income Statement:

    {
      "companies": [
        {
          "company_id": "${uuidv4()}",
          "company_name": "Acme Corp",
          "ticker_symbol": "ACME",
          "industry": "Manufacturing",
          "country": "USA"
        }
      ],
      "periods": [
        {
          "period_id": "${uuidv4()}",
          "period_start_date": "2023-01-01",
          "period_end_date": "2023-12-31",
          "fiscal_year": 2023,
          "fiscal_quarter": 4,
          "period_type": "annual"
        }
      ],
      "income_statements": [
        {
          "id": "${uuidv4()}",
          "company_id": "${uuidv4()}",
          "reporting_period": "${uuidv4()}",
          "fiscal_year": 2023,
          "fiscal_quarter": 4,
          "revenue": 2000000,
          "cost_of_goods_sold": 1200000,
          "gross_profit": 800000,
          "operating_expenses": 200000,
          "selling_general_administrative_expenses": 150000,
          "research_development_expenses": 30000,
          "other_operating_expenses": 20000,
          "operating_income": 600000,
          "interest_expense": 20000,
          "interest_income": 5000,
          "other_income_expense_net": 10000,
          "earnings_before_tax": 585000,
          "income_tax_expense": 150000,
          "net_income": 435000,
          "preferred_dividends": 0,
          "net_income_available_to_common": 435000,
          "weighted_average_shares_outstanding_basic": 2000000,
          "weighted_average_shares_outstanding_diluted": 2100000,
          "earnings_per_share_basic": 0.2175,
          "earnings_per_share_diluted": 0.2071
        }
      ]
    }`,
    
    template: `You are a M&A analyst. Please extract the financial data from the Income Statement and return it in the exact format below. Use the provided placeholders to indicate where the extracted values should be inserted. Do not include any additional fields or text outside of the template.

    {
      "companies": [
        {
          "company_id": "{{company_id}}",
          "company_name": "{{company_name}}",
          "ticker_symbol": "{{ticker_symbol}}",
          "industry": "{{industry}}",
          "country": "{{country}}"
        }
      ],
      "periods": [
        {
          "period_id": "{{period_id}}",
          "period_start_date": "{{period_start_date}}",
          "period_end_date": "{{period_end_date}}",
          "fiscal_year": "{{fiscal_year}}",
          "fiscal_quarter": "{{fiscal_quarter}}",
          "period_type": "{{period_type}}"
        }
      ],
      "income_statements": [
        {
          "id": "{{id}}",
          "company_id": "{{company_id}}",
          "reporting_period": "{{reporting_period}}",
          "fiscal_year": "{{fiscal_year}}",
          "fiscal_quarter": "{{fiscal_quarter}}",
          "revenue": "{{revenue}}",
          "cost_of_goods_sold": "{{cost_of_goods_sold}}",
          "gross_profit": "{{gross_profit}}",
          "operating_expenses": "{{operating_expenses}}",
          "selling_general_administrative_expenses": "{{selling_general_administrative_expenses}}",
          "research_development_expenses": "{{research_development_expenses}}",
          "other_operating_expenses": "{{other_operating_expenses}}",
          "operating_income": "{{operating_income}}",
          "interest_expense": "{{interest_expense}}",
          "interest_income": "{{interest_income}}",
          "other_income_expense_net": "{{other_income_expense_net}}",
          "earnings_before_tax": "{{earnings_before_tax}}",
          "income_tax_expense": "{{income_tax_expense}}",
          "net_income": "{{net_income}}",
          "preferred_dividends": "{{preferred_dividends}}",
          "net_income_available_to_common": "{{net_income_available_to_common}}",
          "weighted_average_shares_outstanding_basic": "{{weighted_average_shares_outstanding_basic}}",
          "weighted_average_shares_outstanding_diluted": "{{weighted_average_shares_outstanding_diluted}}",
          "earnings_per_share_basic": "{{earnings_per_share_basic}}",
          "earnings_per_share_diluted": "{{earnings_per_share_diluted}}"
        }
      ]
    }`
  },

  BALANCE_SHEET: {
    example: `You are a M&A analyst. Below is an example of an extracted Balance Sheet:

    {
      "companies": [
        {
          "company_id": "${uuidv4()}",
          "company_name": "Beta Industries",
          "ticker_symbol": "BETA",
          "industry": "Technology",
          "country": "USA"
        }
      ],
      "periods": [
        {
          "period_id": "${uuidv4()}",
          "period_start_date": "2023-01-01",
          "period_end_date": "2023-12-31",
          "fiscal_year": 2023,
          "fiscal_quarter": 4,
          "period_type": "annual"
        }
      ],
      "balance_sheets": [
        {
          "id": "${uuidv4()}",
          "company_id": "${uuidv4()}",
          "reporting_period": "${uuidv4()}",
          "fiscal_year": 2023,
          "fiscal_quarter": 4,
          "cash_and_cash_equivalents": 300000,
          "short_term_investments": 75000,
          "accounts_receivable": 175000,
          "allowance_for_doubtful_accounts": 7500,
          "net_accounts_receivable": 167500,
          "inventory": 250000,
          "other_current_assets": 75000,
          "total_current_assets": 595000,
          "property_plant_equipment_gross": 900000,
          "accumulated_depreciation": 150000,
          "property_plant_equipment_net": 750000,
          "goodwill": 150000,
          "intangible_assets": 75000,
          "other_long_term_assets": 37500,
          "total_non_current_assets": 262500,
          "total_assets": 857500,
          "accounts_payable": 135000,
          "accrued_liabilities": 45000,
          "short_term_debt": 30000,
          "current_portion_of_long_term_debt": 15000,
          "other_current_liabilities": 30000,
          "total_current_liabilities": 240000,
          "long_term_debt": 450000,
          "deferred_tax_liabilities": 37500,
          "other_non_current_liabilities": 75000,
          "total_non_current_liabilities": 562500,
          "total_liabilities": 802500,
          "common_stock": 75000,
          "additional_paid_in_capital": 300000,
          "retained_earnings": 150000,
          "accumulated_other_comprehensive_income": 7500,
          "treasury_stock": -30000,
          "total_shareholders_equity": 277500,
          "total_liabilities_and_equity": 857500
        }
      ]
    }`,
    
    template: `You are a M&A analyst. Please extract the financial data from the Balance Sheet and return it in the exact format below. Use the provided placeholders to indicate where the extracted values should be inserted. Do not include any additional fields or text outside of the template.

    {
      "companies": [
        {
          "company_id": "{{company_id}}",
          "company_name": "{{company_name}}",
          "ticker_symbol": "{{ticker_symbol}}",
          "industry": "{{industry}}",
          "country": "{{country}}"
        }
      ],
      "periods": [
        {
          "period_id": "{{period_id}}",
          "period_start_date": "{{period_start_date}}",
          "period_end_date": "{{period_end_date}}",
          "fiscal_year": "{{fiscal_year}}",
          "fiscal_quarter": "{{fiscal_quarter}}",
          "period_type": "{{period_type}}"
        }
      ],
      "balance_sheets": [
        {
          "id": "{{id}}",
          "company_id": "{{company_id}}",
          "reporting_period": "{{reporting_period}}",
          "fiscal_year": "{{fiscal_year}}",
          "fiscal_quarter": "{{fiscal_quarter}}",
          "cash_and_cash_equivalents": "{{cash_and_cash_equivalents}}",
          "short_term_investments": "{{short_term_investments}}",
          "accounts_receivable": "{{accounts_receivable}}",
          "allowance_for_doubtful_accounts": "{{allowance_for_doubtful_accounts}}",
          "net_accounts_receivable": "{{net_accounts_receivable}}",
          "inventory": "{{inventory}}",
          "other_current_assets": "{{other_current_assets}}",
          "total_current_assets": "{{total_current_assets}}",
          "property_plant_equipment_gross": "{{property_plant_equipment_gross}}",
          "accumulated_depreciation": "{{accumulated_depreciation}}",
          "property_plant_equipment_net": "{{property_plant_equipment_net}}",
          "goodwill": "{{goodwill}}",
          "intangible_assets": "{{intangible_assets}}",
          "other_long_term_assets": "{{other_long_term_assets}}",
          "total_non_current_assets": "{{total_non_current_assets}}",
          "total_assets": "{{total_assets}}",
          "accounts_payable": "{{accounts_payable}}",
          "accrued_liabilities": "{{accrued_liabilities}}",
          "short_term_debt": "{{short_term_debt}}",
          "current_portion_of_long_term_debt": "{{current_portion_of_long_term_debt}}",
          "other_current_liabilities": "{{other_current_liabilities}}",
          "total_current_liabilities": "{{total_current_liabilities}}",
          "long_term_debt": "{{long_term_debt}}",
          "deferred_tax_liabilities": "{{deferred_tax_liabilities}}",
          "other_non_current_liabilities": "{{other_non_current_liabilities}}",
          "total_non_current_liabilities": "{{total_non_current_liabilities}}",
          "total_liabilities": "{{total_liabilities}}",
          "common_stock": "{{common_stock}}",
          "additional_paid_in_capital": "{{additional_paid_in_capital}}",
          "retained_earnings": "{{retained_earnings}}",
          "accumulated_other_comprehensive_income": "{{accumulated_other_comprehensive_income}}",
          "treasury_stock": "{{treasury_stock}}",
          "total_shareholders_equity": "{{total_shareholders_equity}}",
          "total_liabilities_and_equity": "{{total_liabilities_and_equity}}"
        }
      ]
    }`
  },

  CASH_FLOW_STATEMENT: {
    example: `You are a M&A analyst. Below is an example of an extracted Cash Flow Statement:

    {
      "companies": [
        {
          "company_id": "${uuidv4()}",
          "company_name": "Gamma Solutions",
          "ticker_symbol": "GAMM",
          "industry": "Software",
          "country": "USA"
        }
      ],
      "periods": [
        {
          "period_id": "${uuidv4()}",
          "period_start_date": "2023-01-01",
          "period_end_date": "2023-12-31",
          "fiscal_year": 2023,
          "fiscal_quarter": 4,
          "period_type": "annual"
        }
      ],
      "cash_flow_statements": [
        {
          "id": "${uuidv4()}",
          "company_id": "${uuidv4()}",
          "reporting_period": "${uuidv4()}",
          "fiscal_year": 2023,
          "fiscal_quarter": 4,
          "net_income": 500000,
          "depreciation_and_amortization": 80000,
          "stock_based_compensation": 20000,
          "other_non_cash_items": 10000,
          "change_in_accounts_receivable": -25000,
          "change_in_inventory": -30000,
          "change_in_accounts_payable": 15000,
          "change_in_other_working_capital": -7500,
          "cash_flow_from_operations": 565000,
          "capital_expenditures": -120000,
          "investments_in_intangibles": -15000,
          "proceeds_from_sale_of_assets": 20000,
          "other_investing_activities": 0,
          "cash_flow_from_investing": -125000,
          "issuance_of_debt": 200000,
          "repayment_of_debt": -50000,
          "issuance_of_equity": 100000,
          "repurchase_of_stock": -20000,
          "dividends_paid": -5000,
          "other_financing_activities": 0,
          "cash_flow_from_financing": 225000,
          "effect_of_exchange_rate_changes_on_cash": 0,
          "net_increase_decrease_in_cash": 665000,
          "cash_at_beginning_of_period": 750000,
          "cash_at_end_of_period": 1415000
        }
      ]
    }`,
    
    template: `You are a M&A analyst. Please extract the financial data from the Cash Flow Statement and return it in the exact format below. Use the provided placeholders to indicate where the extracted values should be inserted. Do not include any additional fields or text outside of the template.

    {
      "companies": [
        {
          "company_id": "{{company_id}}",
          "company_name": "{{company_name}}",
          "ticker_symbol": "{{ticker_symbol}}",
          "industry": "{{industry}}",
          "country": "{{country}}"
        }
      ],
      "periods": [
        {
          "period_id": "{{period_id}}",
          "period_start_date": "{{period_start_date}}",
          "period_end_date": "{{period_end_date}}",
          "fiscal_year": "{{fiscal_year}}",
          "fiscal_quarter": "{{fiscal_quarter}}",
          "period_type": "{{period_type}}"
        }
      ],
      "cash_flow_statements": [
        {
          "id": "{{id}}",
          "company_id": "{{company_id}}",
          "reporting_period": "{{reporting_period}}",
          "fiscal_year": "{{fiscal_year}}",
          "fiscal_quarter": "{{fiscal_quarter}}",
          "net_income": "{{net_income}}",
          "depreciation_and_amortization": "{{depreciation_and_amortization}}",
          "stock_based_compensation": "{{stock_based_compensation}}",
          "other_non_cash_items": "{{other_non_cash_items}}",
          "change_in_accounts_receivable": "{{change_in_accounts_receivable}}",
          "change_in_inventory": "{{change_in_inventory}}",
          "change_in_accounts_payable": "{{change_in_accounts_payable}}",
          "change_in_other_working_capital": "{{change_in_other_working_capital}}",
          "cash_flow_from_operations": "{{cash_flow_from_operations}}",
          "capital_expenditures": "{{capital_expenditures}}",
          "investments_in_intangibles": "{{investments_in_intangibles}}",
          "proceeds_from_sale_of_assets": "{{proceeds_from_sale_of_assets}}",
          "other_investing_activities": "{{other_investing_activities}}",
          "cash_flow_from_investing": "{{cash_flow_from_investing}}",
          "issuance_of_debt": "{{issuance_of_debt}}",
          "repayment_of_debt": "{{repayment_of_debt}}",
          "issuance_of_equity": "{{issuance_of_equity}}",
          "repurchase_of_stock": "{{repurchase_of_stock}}",
          "dividends_paid": "{{dividends_paid}}",
          "other_financing_activities": "{{other_financing_activities}}",
          "cash_flow_from_financing": "{{cash_flow_from_financing}}",
          "effect_of_exchange_rate_changes_on_cash": "{{effect_of_exchange_rate_changes_on_cash}}",
          "net_increase_decrease_in_cash": "{{net_increase_decrease_in_cash}}",
          "cash_at_beginning_of_period": "{{cash_at_beginning_of_period}}",
          "cash_at_end_of_period": "{{cash_at_end_of_period}}"
        }
      ]
    }`
  },

  FINANCIAL_RATIOS: {
    example: `You are a M&A analyst. Below is an example of extracted Financial Ratios:

    {
      "companies": [
        {
          "company_id": "${uuidv4()}",
          "company_name": "Delta Enterprises",
          "ticker_symbol": "DELT",
          "industry": "Healthcare",
          "country": "USA"
        }
      ],
      "periods": [
        {
          "period_id": "${uuidv4()}",
          "period_start_date": "2023-01-01",
          "period_end_date": "2023-12-31",
          "fiscal_year": 2023,
          "fiscal_quarter": 4,
          "period_type": "annual"
        }
      ],
      "financial_ratios": [
        {
          "id": "${uuidv4()}",
          "company_id": "${uuidv4()}",
          "reporting_period": "${uuidv4()}",
          "fiscal_year": 2023,
          "fiscal_quarter": 4,
          "gross_margin": 0.45,
          "operating_margin": 0.25,
          "net_margin": 0.18,
          "return_on_assets": 0.08,
          "return_on_equity": 0.12,
          "return_on_invested_capital": 0.10,
          "current_ratio": 1.3,
          "quick_ratio": 1.0,
          "inventory_turnover": 3.0,
          "receivables_turnover": 4.5,
          "asset_turnover": 0.6,
          "debt_to_equity": 1.8,
          "debt_to_ebitda": 9.0,
          "interest_coverage_ratio": 22.0,
          "price_to_earnings": 16.0,
          "price_to_book": 2.2,
          "enterprise_value": 1.6,
          "ev_to_ebitda": 0.06,
          "ev_to_ebit": 0.12,
          "revenue_growth_rate": 0.09,
          "ebitda_growth_rate": 0.04,
          "net_income_growth_rate": 0.05,
          "free_cash_flow": 60000,
          "unlevered_free_cash_flow": 72000,
          "levered_free_cash_flow": 48000,
          "dividend_yield": 0.015,
          "payout_ratio": 0.25
        }
      ]
    }`,
    
    template: `You are a M&A analyst. Please extract the financial ratios and return them in the exact format below. Use the provided placeholders to indicate where the extracted values should be inserted. Do not include any additional fields or text outside of the template:

    {
      "companies": [
        {
          "company_id": "{{company_id}}",
          "company_name": "{{company_name}}",
          "ticker_symbol": "{{ticker_symbol}}",
          "industry": "{{industry}}",
          "country": "{{country}}"
        }
      ],
      "periods": [
        {
          "period_id": "{{period_id}}",
          "period_start_date": "{{period_start_date}}",
          "period_end_date": "{{period_end_date}}",
          "fiscal_year": "{{fiscal_year}}",
          "fiscal_quarter": "{{fiscal_quarter}}",
          "period_type": "{{period_type}}"
        }
      ],
      "financial_ratios": [
        {
          "id": "{{id}}",
          "company_id": "{{company_id}}",
          "reporting_period": "{{reporting_period}}",
          "fiscal_year": "{{fiscal_year}}",
          "fiscal_quarter": "{{fiscal_quarter}}",
          "gross_margin": "{{gross_margin}}",
          "operating_margin": "{{operating_margin}}",
          "net_margin": "{{net_margin}}",
          "return_on_assets": "{{return_on_assets}}",
          "return_on_equity": "{{return_on_equity}}",
          "return_on_invested_capital": "{{return_on_invested_capital}}",
          "current_ratio": "{{current_ratio}}",
          "quick_ratio": "{{quick_ratio}}",
          "inventory_turnover": "{{inventory_turnover}}",
          "receivables_turnover": "{{receivables_turnover}}",
          "asset_turnover": "{{asset_turnover}}",
          "debt_to_equity": "{{debt_to_equity}}",
          "debt_to_ebitda": "{{debt_to_ebitda}}",
          "interest_coverage_ratio": "{{interest_coverage_ratio}}",
          "price_to_earnings": "{{price_to_earnings}}",
          "price_to_book": "{{price_to_book}}",
          "enterprise_value": "{{enterprise_value}}",
          "ev_to_ebitda": "{{ev_to_ebitda}}",
          "ev_to_ebit": "{{ev_to_ebit}}",
          "revenue_growth_rate": "{{revenue_growth_rate}}",
          "ebitda_growth_rate": "{{ebitda_growth_rate}}",
          "net_income_growth_rate": "{{net_income_growth_rate}}",
          "free_cash_flow": "{{free_cash_flow}}",
          "unlevered_free_cash_flow": "{{unlevered_free_cash_flow}}",
          "levered_free_cash_flow": "{{levered_free_cash_flow}}",
          "dividend_yield": "{{dividend_yield}}",
          "payout_ratio": "{{payout_ratio}}"
        }
      ]
    }`
  },

  /**
   * NEW ADDITION #1: FRANCHISE DISCLOSURE DOCUMENT (FDD)
   */
  FDD: {
    example: `You are a M&A analyst. Below is an example of an extracted Franchise Disclosure Document (FDD):

    {
      "companies": [
        {
          "company_id": "${uuidv4()}",
          "company_name": "FranchiseX",
          "ticker_symbol": null,
          "industry": "Food & Beverage",
          "country": "USA"
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
    
    template: `You are a M&A analyst. Please extract the financial data from the Franchise Disclosure Document (FDD) and return it in the exact format below. Use the provided placeholders to indicate where the extracted values should be inserted. Do not include any additional fields or text outside of the template.

    {
      "companies": [
        {
          "company_id": "{{company_id}}",
          "company_name": "{{company_name}}",
          "ticker_symbol": "{{ticker_symbol}}",
          "industry": "{{industry}}",
          "country": "{{country}}"
        }
      ],
      "periods": [
        {
          "period_id": "{{period_id}}",
          "period_start_date": "{{period_start_date}}",
          "period_end_date": "{{period_end_date}}",
          "fiscal_year": "{{fiscal_year}}",
          "fiscal_quarter": "{{fiscal_quarter}}",
          "period_type": "{{period_type}}"
        }
      ],
      "fdd_analysis": [
        {
          "id": "{{id}}",
          "company_id": "{{company_id}}",
          "reporting_period": "{{reporting_period}}",
          "fiscal_year": "{{fiscal_year}}",
          "franchise_fee": "{{franchise_fee}}",
          "royalty_fee_percentage": "{{royalty_fee_percentage}}",
          "ad_fund_fee_percentage": "{{ad_fund_fee_percentage}}",
          "term_of_agreement_years": "{{term_of_agreement_years}}",
          "renewal_terms": "{{renewal_terms}}",
          "territory_protection": "{{territory_protection}}",
          "training_programs_included": "{{training_programs_included}}",
          "initial_investment_range_low": "{{initial_investment_range_low}}",
          "initial_investment_range_high": "{{initial_investment_range_high}}",
          "other_fees": [
            { "name": "{{other_fees.name}}", "amount": "{{other_fees.amount}}" }
          ],
          "legal_disclaimers": "{{legal_disclaimers}}",
          "key_items_section": {
            "item_1": "{{key_items_section.item_1}}",
            "item_2": "{{key_items_section.item_2}}",
            "item_3": "{{key_items_section.item_3}}",
            "item_4": "{{key_items_section.item_4}}",
            "item_5": "{{key_items_section.item_5}}",
            "item_6": "{{key_items_section.item_6}}",
            "item_7": "{{key_items_section.item_7}}",
            "item_8": "{{key_items_section.item_8}}",
            "item_9": "{{key_items_section.item_9}}",
            "item_10": "{{key_items_section.item_10}}",
            "item_11": "{{key_items_section.item_11}}",
            "item_12": "{{key_items_section.item_12}}",
            "item_13": "{{key_items_section.item_13}}",
            "item_14": "{{key_items_section.item_14}}",
            "item_15": "{{key_items_section.item_15}}",
            "item_16": "{{key_items_section.item_16}}",
            "item_17": "{{key_items_section.item_17}}",
            "item_18": "{{key_items_section.item_18}}",
            "item_19": "{{key_items_section.item_19}}",
            "item_20": "{{key_items_section.item_20}}",
            "item_21": "{{key_items_section.item_21}}",
            "item_22": "{{key_items_section.item_22}}",
            "item_23": "{{key_items_section.item_23}}"
          },
          "date_of_issuance": "{{date_of_issuance}}"
        }
      ]
    }`
  },

  /**
   * NEW ADDITION #2: STATEMENT OF SHAREHOLDERS' EQUITY
   */
  STATEMENT_OF_SHAREHOLDERS_EQUITY: {
    example: `You are a M&A analyst. Below is an example of an extracted Statement of Shareholders' Equity:

    {
      "companies": [
        {
          "company_id": "${uuidv4()}",
          "company_name": "Epsilon Ltd.",
          "ticker_symbol": "EPSL",
          "industry": "Retail",
          "country": "USA"
        }
      ],
      "periods": [
        {
          "period_id": "${uuidv4()}",
          "period_start_date": "2023-01-01",
          "period_end_date": "2023-12-31",
          "fiscal_year": 2023,
          "fiscal_quarter": 4,
          "period_type": "annual"
        }
      ],
      "statements_of_shareholders_equity": [
        {
          "id": "${uuidv4()}",
          "company_id": "${uuidv4()}",
          "reporting_period": "${uuidv4()}",
          "fiscal_year": 2023,
          "fiscal_quarter": 4,
          "common_stock": 75000,
          "preferred_stock": 0,
          "additional_paid_in_capital": 250000,
          "retained_earnings_beginning": 175000,
          "net_income": 50000,
          "dividends_paid": -15000,
          "other_comprehensive_income": 4500,
          "treasury_stock": -7500,
          "ending_retained_earnings": 185000,
          "total_shareholders_equity": 502500
        }
      ]
    }`,
    
    template: `You are a M&A analyst. Please extract the financial data from the Statement of Shareholders' Equity and return it in the exact format below. Use the provided placeholders to indicate where the extracted values should be inserted. Do not include any additional fields or text outside of the template.

    {
      "companies": [
        {
          "company_id": "{{company_id}}",
          "company_name": "{{company_name}}",
          "ticker_symbol": "{{ticker_symbol}}",
          "industry": "{{industry}}",
          "country": "{{country}}"
        }
      ],
      "periods": [
        {
          "period_id": "{{period_id}}",
          "period_start_date": "{{period_start_date}}",
          "period_end_date": "{{period_end_date}}",
          "fiscal_year": "{{fiscal_year}}",
          "fiscal_quarter": "{{fiscal_quarter}}",
          "period_type": "{{period_type}}"
        }
      ],
      "statements_of_shareholders_equity": [
        {
          "id": "{{id}}",
          "company_id": "{{company_id}}",
          "reporting_period": "{{reporting_period}}",
          "fiscal_year": "{{fiscal_year}}",
          "fiscal_quarter": "{{fiscal_quarter}}",
          "common_stock": "{{common_stock}}",
          "preferred_stock": "{{preferred_stock}}",
          "additional_paid_in_capital": "{{additional_paid_in_capital}}",
          "retained_earnings_beginning": "{{retained_earnings_beginning}}",
          "net_income": "{{net_income}}",
          "dividends_paid": "{{dividends_paid}}",
          "other_comprehensive_income": "{{other_comprehensive_income}}",
          "treasury_stock": "{{treasury_stock}}",
          "ending_retained_earnings": "{{ending_retained_earnings}}",
          "total_shareholders_equity": "{{total_shareholders_equity}}"
        }
      ]
    }`
  },
} as const;
