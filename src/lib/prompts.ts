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
        "id": "uuid",
        "company_id": "uuid",
        "reporting_period": "uuid",
        "fiscal_year": "integer",
        "fiscal_quarter": "integer",
        "revenue": "numeric",
        "cost_of_goods_sold": "numeric",
        "gross_profit": "numeric",
        "operating_expenses": "numeric",
        "selling_general_administrative_expenses": "numeric",
        "research_development_expenses": "numeric",
        "other_operating_expenses": "numeric",
        "operating_income": "numeric",
        "interest_expense": "numeric",
        "interest_income": "numeric",
        "other_income_expense_net": "numeric",
        "earnings_before_tax": "numeric",
        "income_tax_expense": "numeric",
        "net_income": "numeric",
        "preferred_dividends": "numeric",
        "net_income_available_to_common": "numeric",
        "weighted_average_shares_outstanding_basic": "integer",
        "weighted_average_shares_outstanding_diluted": "integer",
        "earnings_per_share_basic": "numeric",
        "earnings_per_share_diluted": "numeric",
        "document_id": "uuid",
        "revenue_gross_revenue": "numeric",
        "revenue_net_revenue": "numeric",
        "revenue_other_revenue_interest_revenue": "numeric",
        "revenue_other_revenue_rental_income": "numeric",
        "revenue_other_revenue_royalty_income": "numeric",
        "revenue_other_revenue_dividend_income": "numeric",
        "revenue_other_revenue_foreign_exchange_gains": "numeric",
        "revenue_other_revenue_gains_from_investments": "numeric",
        "cogs_raw_materials": "numeric",
        "cogs_direct_labor": "numeric",
        "cogs_manufacturing_overheads": "numeric",
        "cogs_freight_in": "numeric",
        "cogs_import_duties": "numeric",
        "cogs_packaging_costs": "numeric",
        "cogs_inventory_write_downs": "numeric",
        "cogs_supplier_discounts": "numeric",
        "operating_expenses_sg_a_salaries_and_wages": "numeric",
        "operating_expenses_sg_a_marketing_and_advertising": "numeric",
        "operating_expenses_sg_a_rent_and_utilities": "numeric",
        "operating_expenses_sg_a_office_supplies": "numeric",
        "operating_expenses_sg_a_insurance": "numeric",
        "operating_expenses_sg_a_travel_and_entertainment": "numeric",
        "operating_expenses_sg_a_professional_fees_legal_consulting": "numeric",
        "operating_expenses_sg_a_depreciation_of_office_equipment": "numeric",
        "operating_expenses_sg_a_communication_expenses": "numeric",
        "operating_expenses_r_and_d_salaries_of_r_and_d_staff": "numeric",
        "operating_expenses_r_and_d_materials_and_supplies_for_r_and_d": "numeric",
        "operating_expenses_r_and_d_contract_research_expenses": "numeric",
        "operating_expenses_r_and_d_r_and_d_facility_costs": "numeric",
        "operating_expenses_depreciation_and_amortization_depreciation_o": "numeric",
        "operating_expenses_depreciation_and_amortization_amortization_o": "numeric",
        "operating_expenses_depreciation_and_amortization_accumulated_de": "numeric",
        "operating_expenses_other_operating_expenses_legal_fees": "numeric",
        "operating_expenses_other_operating_expenses_consulting_fees": "numeric",
        "operating_expenses_other_operating_expenses_restructuring_costs": "numeric",
        "operating_expenses_other_operating_expenses_impairment_charges": "numeric",
        "operating_expenses_other_operating_expenses_litigation_settleme": "numeric",
        "operating_expenses_other_operating_expenses_environmental_remed": "numeric",
        "other_income_expenses_interest_income": "numeric",
        "other_income_expenses_interest_expense": "numeric",
        "other_income_expenses_gain_or_loss_on_asset_sales": "numeric",
        "other_income_expenses_foreign_exchange_gains_losses": "numeric",
        "other_income_expenses_investment_income": "numeric",
        "other_income_expenses_dividend_income": "numeric",
        "other_income_expenses_unrealized_gains_losses_on_securities": "numeric",
        "other_income_expenses_other_non_operating_income": "numeric",
        "other_income_expenses_other_non_operating_expenses": "numeric",
        "income_before_tax": "numeric",
        "tax_expense_current_tax_expense": "numeric",
        "tax_expense_deferred_tax_expense": "numeric",
        "tax_expense_tax_credits": "numeric",
        "tax_expense_tax_adjustments": "numeric",
        "net_income_minority_interest": "numeric",
        "net_income_preferred_dividends": "numeric",
        "net_income_earnings_attributable_to_common_shareholders": "numeric",
        "eps_basic_eps": "numeric",
        "eps_diluted_eps": "numeric",
        "comprehensive_income_unrealized_gains_losses_on_available_for_s": "numeric",
        "comprehensive_income_pension_adjustments": "numeric",
        "comprehensive_income_foreign_currency_translation_adjustments": "numeric",
        "comprehensive_income_other_comprehensive_income_items": "numeric",
        "other_potential_items_extraordinary_items": "numeric",
        "other_potential_items_non_recurring_items": "numeric",
        "other_potential_items_discontinued_operations": "numeric"
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
        "id": "uuid",
        "company_id": "uuid",
        "reporting_period": "uuid",
        "fiscal_year": "integer",
        "fiscal_quarter": "integer",
        "cash_and_cash_equivalents": "numeric",
        "short_term_investments": "numeric",
        "accounts_receivable": "numeric",
        "allowance_for_doubtful_accounts": "numeric",
        "net_accounts_receivable": "numeric",
        "inventory": "numeric",
        "other_current_assets": "numeric",
        "total_current_assets": "numeric",
        "property_plant_equipment_gross": "numeric",
        "accumulated_depreciation": "numeric",
        "property_plant_equipment_net": "numeric",
        "goodwill": "numeric",
        "intangible_assets": "numeric",
        "other_long_term_assets": "numeric",
        "total_non_current_assets": "numeric",
        "total_assets": "numeric",
        "accounts_payable": "numeric",
        "accrued_liabilities": "numeric",
        "short_term_debt": "numeric",
        "current_portion_of_long_term_debt": "numeric",
        "other_current_liabilities": "numeric",
        "total_current_liabilities": "numeric",
        "long_term_debt": "numeric",
        "deferred_tax_liabilities": "numeric",
        "other_non_current_liabilities": "numeric",
        "total_non_current_liabilities": "numeric",
        "total_liabilities": "numeric",
        "common_stock": "numeric",
        "additional_paid_in_capital": "numeric",
        "retained_earnings": "numeric",
        "accumulated_other_comprehensive_income": "numeric",
        "treasury_stock": "numeric",
        "total_shareholders_equity": "numeric",
        "total_liabilities_and_equity": "numeric",
        "document_id": "uuid",
        "assets_current_assets_cash_and_cash_equivalents": "numeric",
        "assets_current_assets_cash_and_cash_equivalents_petty_cash": "numeric",
        "assets_current_assets_cash_and_cash_equivalents_marketable_secu": "numeric",
        "assets_current_assets_short_term_investments": "numeric",
        "assets_current_assets_accounts_receivable_trade_receivables": "numeric",
        "assets_current_assets_accounts_receivable_allowance_for_doubtfu": "numeric",
        "assets_current_assets_accounts_receivable_notes_receivable": "numeric",
        "assets_current_assets_inventory_raw_materials": "numeric",
        "assets_current_assets_inventory_work_in_progress": "numeric",
        "assets_current_assets_inventory_finished_goods": "numeric",
        "assets_current_assets_inventory_inventory_reserves": "numeric",
        "assets_current_assets_prepaid_expenses_prepaid_insurance": "numeric",
        "assets_current_assets_prepaid_expenses_prepaid_rent": "numeric",
        "assets_current_assets_prepaid_expenses_other_prepaid_costs": "numeric",
        "assets_current_assets_other_current_assets_advances_to_supplier": "numeric",
        "assets_current_assets_other_current_assets_deferred_tax_assets_": "numeric",
        "assets_current_assets_other_current_assets_miscellaneous_curren": "numeric",
        "assets_current_assets_marketable_securities": "numeric",
        "assets_current_assets_assets_held_for_sale": "numeric",
        "assets_current_assets_contract_assets": "numeric",
        "assets_current_assets_biological_assets": "numeric",
        "assets_non_current_assets_ppe_land": "numeric",
        "assets_non_current_assets_ppe_buildings": "numeric",
        "assets_non_current_assets_ppe_machinery_and_equipment": "numeric",
        "assets_non_current_assets_ppe_vehicles": "numeric",
        "assets_non_current_assets_ppe_furniture_and_fixtures": "numeric",
        "assets_non_current_assets_ppe_construction_in_progress": "numeric",
        "assets_non_current_assets_ppe_accumulated_depreciation": "numeric",
        "assets_non_current_assets_intangible_assets_goodwill": "numeric",
        "assets_non_current_assets_intangible_assets_patents": "numeric",
        "assets_non_current_assets_intangible_assets_trademarks": "numeric",
        "assets_non_current_assets_intangible_assets_copyrights": "numeric",
        "assets_non_current_assets_intangible_assets_customer_lists": "numeric",
        "assets_non_current_assets_intangible_assets_software_developmen": "numeric",
        "assets_non_current_assets_intangible_assets_licensing_agreement": "numeric",
        "assets_non_current_assets_long_term_investments_equity_securiti": "numeric",
        "assets_non_current_assets_long_term_investments_debt_securities": "numeric",
        "assets_non_current_assets_long_term_investments_investments_in_": "numeric",
        "assets_non_current_assets_long_term_investments_joint_ventures": "numeric",
        "assets_non_current_assets_long_term_investments_real_estate_inv": "numeric",
        "assets_non_current_assets_deferred_tax_assets_non_current_porti": "numeric",
        "assets_non_current_assets_natural_resources_mineral_rights": "numeric",
        "assets_non_current_assets_natural_resources_timberland": "numeric",
        "assets_non_current_assets_biological_assets": "numeric",
        "assets_non_current_assets_other_non_current_assets_security_dep": "numeric",
        "assets_non_current_assets_other_non_current_assets_deferred_cha": "numeric",
        "assets_non_current_assets_other_non_current_assets_environmenta": "numeric",
        "liabilities_current_liabilities_accounts_payable_trade_payables": "numeric",
        "liabilities_current_liabilities_accounts_payable_supplier_payab": "numeric",
        "liabilities_current_liabilities_short_term_debt_bank_loans": "numeric",
        "liabilities_current_liabilities_short_term_debt_commercial_pape": "numeric",
        "liabilities_current_liabilities_current_portion_of_long_term_de": "numeric",
        "liabilities_current_liabilities_accrued_expenses_salaries_and_w": "numeric",
        "liabilities_current_liabilities_accrued_expenses_interest_payab": "numeric",
        "liabilities_current_liabilities_accrued_expenses_taxes_payable": "numeric",
        "liabilities_current_liabilities_accrued_expenses_utilities_paya": "numeric",
        "liabilities_current_liabilities_deferred_revenue": "numeric",
        "liabilities_current_liabilities_unearned_revenue": "numeric",
        "liabilities_current_liabilities_dividends_payable": "numeric",
        "liabilities_current_liabilities_current_portion_of_deferred_tax": "numeric",
        "liabilities_current_liabilities_other_current_liabilities_custo": "numeric",
        "liabilities_current_liabilities_other_current_liabilities_advan": "numeric",
        "liabilities_current_liabilities_other_current_liabilities_misce": "numeric",
        "liabilities_long_term_liabilities_long_term_debt_bonds_payable": "numeric",
        "liabilities_long_term_liabilities_long_term_debt_notes_payable": "numeric",
        "liabilities_long_term_liabilities_long_term_debt_mortgage_payab": "numeric",
        "liabilities_long_term_liabilities_deferred_tax_liabilities_non_": "numeric",
        "liabilities_long_term_liabilities_pension_liabilities_defined_b": "numeric",
        "liabilities_long_term_liabilities_pension_liabilities_defined_c": "numeric",
        "liabilities_long_term_liabilities_lease_obligations_capital_lea": "numeric",
        "liabilities_long_term_liabilities_lease_obligations_operating_l": "numeric",
        "liabilities_long_term_liabilities_deferred_revenue_long_term_po": "numeric",
        "liabilities_long_term_liabilities_other_non_current_liabilities": "numeric",
        "equity_common_stock_authorized_shares": "integer",
        "equity_common_stock_issued_shares": "integer",
        "equity_common_stock_par_value": "numeric",
        "equity_preferred_stock_authorized_shares": "integer",
        "equity_preferred_stock_issued_shares": "integer",
        "equity_preferred_stock_par_value": "numeric",
        "equity_additional_paid_in_capital": "numeric",
        "equity_retained_earnings_beginning_retained_earnings": "numeric",
        "equity_retained_earnings_net_income": "numeric",
        "equity_retained_earnings_dividends_paid": "numeric",
        "equity_retained_earnings_prior_period_adjustments": "numeric",
        "equity_treasury_stock_cost_of_treasury_shares": "numeric",
        "equity_treasury_stock_shares_held_in_treasury": "integer",
        "equity_accumulated_other_comprehensive_income_unrealized_gains_": "numeric",
        "equity_accumulated_other_comprehensive_income_pension_plan_adju": "numeric",
        "equity_accumulated_other_comprehensive_income_foreign_currency_": "numeric",
        "equity_non_controlling_interest": "numeric",
        "equity_share_premium": "numeric",
        "equity_revaluation_surplus_if_applicable": "numeric",
        "equity_equity_in_affiliates": "numeric"
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
          "id": "uuid",
          "company_id": "uuid",
          "reporting_period": "uuid",
          "fiscal_year": "integer",
          "fiscal_quarter": "integer",
          "net_income": "numeric",
          "depreciation_and_amortization": "numeric",
          "stock_based_compensation": "numeric",
          "other_non_cash_items": "numeric",
          "change_in_accounts_receivable": "numeric",
          "change_in_inventory": "numeric",
          "change_in_accounts_payable": "numeric",
          "change_in_other_working_capital": "numeric",
          "cash_flow_from_operations": "numeric",
          "capital_expenditures": "numeric",
          "investments_in_intangibles": "numeric",
          "proceeds_from_sale_of_assets": "numeric",
          "other_investing_activities": "numeric",
          "cash_flow_from_investing": "numeric",
          "issuance_of_debt": "numeric",
          "repayment_of_debt": "numeric",
          "issuance_of_equity": "numeric",
          "repurchase_of_stock": "numeric",
          "dividends_paid": "numeric",
          "other_financing_activities": "numeric",
          "cash_flow_from_financing": "numeric",
          "effect_of_exchange_rate_changes_on_cash": "numeric",
          "net_increase_decrease_in_cash": "numeric",
          "cash_at_beginning_of_period": "numeric",
          "cash_at_end_of_period": "numeric",
          "document_id": "uuid",
          "operating_activities_cash_inflows_cash_received_from_customers": "numeric",
          "operating_activities_cash_inflows_interest_received": "numeric",
          "operating_activities_cash_inflows_dividends_received": "numeric",
          "operating_activities_cash_outflows_cash_paid_to_suppliers_and_e": "numeric",
          "operating_activities_cash_outflows_interest_paid": "numeric",
          "operating_activities_cash_outflows_income_taxes_paid": "numeric",
          "operating_activities_cash_outflows_other_operating_cash_payment": "numeric",
          "operating_activities_adjustments_for_non_cash_items_depreciatio": "numeric",
          "operating_activities_adjustments_for_non_cash_items_stock_based": "numeric",
          "operating_activities_adjustments_for_non_cash_items_deferred_in": "numeric",
          "operating_activities_adjustments_for_non_cash_items_gain_loss_o": "numeric",
          "operating_activities_adjustments_for_non_cash_items_impairment_": "numeric",
          "operating_activities_adjustments_for_non_cash_items_provision_f": "numeric",
          "operating_activities_adjustments_for_non_cash_items_other_non_c": "numeric",
          "operating_activities_changes_in_working_capital_change_in_accou": "numeric",
          "operating_activities_changes_in_working_capital_change_in_inven": "numeric",
          "operating_activities_changes_in_working_capital_change_in_prepa": "numeric",
          "operating_activities_changes_in_working_capital_change_in_other": "numeric",
          "operating_activities_changes_in_working_capital_change_in_accru": "numeric",
          "operating_activities_changes_in_working_capital_change_in_defer": "numeric",
          "operating_activities_other_operating_activities_cash_paid_for_l": "numeric",
          "operating_activities_other_operating_activities_cash_paid_for_r": "numeric",
          "operating_activities_other_operating_activities_cash_paid_for_e": "numeric",
          "investing_activities_cash_inflows_proceeds_from_sale_of_ppe": "numeric",
          "investing_activities_cash_inflows_proceeds_from_sale_of_intangi": "numeric",
          "investing_activities_cash_inflows_proceeds_from_sale_of_investm": "numeric",
          "investing_activities_cash_inflows_proceeds_from_sale_of_subsidi": "numeric",
          "investing_activities_cash_inflows_collections_on_loans_made_to_": "numeric",
          "investing_activities_cash_outflows_purchase_of_ppe_capex": "numeric",
          "investing_activities_cash_outflows_purchase_of_intangible_asset": "numeric",
          "investing_activities_cash_outflows_purchase_of_long_term_invest": "numeric",
          "investing_activities_cash_outflows_acquisition_of_subsidiaries_": "numeric",
          "investing_activities_cash_outflows_purchase_of_investments_in_a": "numeric",
          "investing_activities_cash_outflows_loans_made_to_others": "numeric",
          "investing_activities_cash_outflows_other_investing_cash_payment": "numeric",
          "investing_activities_other_investing_activities_capitalized_dev": "numeric",
          "investing_activities_other_investing_activities_payments_for_en": "numeric",
          "investing_activities_other_investing_activities_cash_paid_for_a": "numeric",
          "financing_activities_cash_inflows_proceeds_from_issuance_of_com": "numeric",
          "financing_activities_cash_inflows_proceeds_from_issuance_of_pre": "numeric",
          "financing_activities_cash_inflows_proceeds_from_issuance_of_deb": "numeric",
          "financing_activities_cash_inflows_proceeds_from_borrowings": "numeric",
          "financing_activities_cash_inflows_proceeds_from_lease_financing": "numeric",
          "financing_activities_cash_outflows_repurchase_of_common_stock_t": "numeric",
          "financing_activities_cash_outflows_repurchase_of_preferred_stoc": "numeric",
          "financing_activities_cash_outflows_payment_of_dividends_cash_di": "numeric",
          "financing_activities_cash_outflows_payment_of_dividends_stock_d": "numeric",
          "financing_activities_cash_outflows_repayment_of_debt_principal": "numeric",
          "financing_activities_cash_outflows_payments_for_lease_obligatio": "numeric",
          "financing_activities_cash_outflows_other_financing_cash_payment": "numeric",
          "financing_activities_other_financing_activities_cash_paid_for_i": "numeric",
          "financing_activities_other_financing_activities_cash_received_f": "numeric",
          "financing_activities_other_financing_activities_cash_paid_for_e": "numeric",
          "supplemental_cash_flow_non_cash_investing_and_financing_activit": "numeric"
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
          "id": "integer",
          "fiscal_year": "integer",
          "period": "character varying",
          "beginning_balances_common_stock": "numeric",
          "beginning_balances_preferred_stock": "numeric",
          "beginning_balances_additional_paid_in_capital": "numeric",
          "beginning_balances_retained_earnings": "numeric",
          "beginning_balances_treasury_stock": "numeric",
          "beginning_balances_accumulated_other_comprehensive_income_aoci": "numeric",
          "beginning_balances_non_controlling_interest": "numeric",
          "contributions_issuance_of_common_stock_number_of_shares_issued": "integer",
          "contributions_issuance_of_common_stock_par_value": "numeric",
          "contributions_issuance_of_common_stock_additional_paid_in_capit": "numeric",
          "contributions_issuance_of_preferred_stock_number_of_shares_issu": "integer",
          "contributions_issuance_of_preferred_stock_par_value": "numeric",
          "contributions_issuance_of_preferred_stock_additional_paid_in_ca": "numeric",
          "contributions_stock_options_and_warrants_issuance_of_stock_opti": "numeric",
          "contributions_stock_options_and_warrants_exercise_of_stock_opti": "numeric",
          "contributions_stock_options_and_warrants_proceeds_from_warrants": "numeric",
          "retained_earnings_net_income": "numeric",
          "retained_earnings_dividends_paid_cash_dividends": "numeric",
          "retained_earnings_dividends_paid_stock_dividends": "numeric",
          "retained_earnings_dividends_paid_property_dividends": "numeric",
          "retained_earnings_prior_period_adjustments": "numeric",
          "retained_earnings_other_adjustments_to_retained_earnings": "numeric",
          "dividends_cash_dividends_paid": "numeric",
          "dividends_stock_dividends_paid": "numeric",
          "dividends_property_dividends_paid": "numeric",
          "other_equity_changes_stock_repurchases_cost_of_treasury_shares_": "numeric",
          "other_equity_changes_stock_repurchases_reissuance_of_treasury_s": "numeric",
          "other_equity_changes_stock_based_compensation_vesting_of_stock_": "numeric",
          "other_equity_changes_stock_based_compensation_expense_recogniti": "numeric",
          "other_equity_changes_accumulated_other_comprehensive_income_unr": "numeric",
          "other_equity_changes_accumulated_other_comprehensive_income_pen": "numeric",
          "other_equity_changes_accumulated_other_comprehensive_income_for": "numeric",
          "other_equity_changes_accumulated_other_comprehensive_income_oth": "numeric",
          "other_equity_changes_revaluation_surplus_increases_in_asset_val": "numeric",
          "other_equity_changes_revaluation_surplus_decreases_in_asset_val": "numeric",
          "other_equity_changes_changes_in_ownership_interests_mergers_and": "numeric",
          "other_equity_changes_changes_in_ownership_interests_spinoffs": "numeric",
          "other_equity_changes_changes_in_ownership_interests_asset_sales": "numeric",
          "other_equity_changes_conversion_of_preferred_to_common_stock": "numeric",
          "other_equity_changes_other_changes_in_equity_capital_contributi": "numeric",
          "other_equity_changes_other_changes_in_equity_capital_withdrawal": "numeric",
          "non_controlling_interest_changes_due_to_net_income_attributable": "numeric",
          "non_controlling_interest_changes_dividends_paid_to_non_controll": "numeric",
          "non_controlling_interest_changes_other_changes_in_non_controlli": "numeric",
          "comprehensive_income_total_comprehensive_income_for_the_period": "numeric",
          "comprehensive_income_cumulative_comprehensive_income": "numeric",
          "ending_balances_common_stock": "numeric",
          "ending_balances_preferred_stock": "numeric",
          "ending_balances_additional_paid_in_capital": "numeric",
          "ending_balances_retained_earnings": "numeric",
          "ending_balances_treasury_stock": "numeric",
          "ending_balances_accumulated_other_comprehensive_income_aoci": "numeric",
          "ending_balances_non_controlling_interest": "numeric",
          "equity_in_affiliates_investment_in_affiliates": "numeric",
          "equity_in_affiliates_share_of_earnings_from_affiliates": "numeric",
          "created_at": "timestamp with time zone",
          "updated_at": "timestamp with time zone"
        }
      ]
    }`
  },
} as const;
