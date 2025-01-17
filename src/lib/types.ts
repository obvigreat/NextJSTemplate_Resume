// src/lib/types.ts

export interface FinancialData {
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
