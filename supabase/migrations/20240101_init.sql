-- Create tables for document storage and analysis
CREATE TABLE documents (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  url TEXT NOT NULL,
  analyzed_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Companies table
CREATE TABLE companies (
  id SERIAL PRIMARY KEY,
  document_id INTEGER REFERENCES documents(id),
  company_name TEXT NOT NULL,
  ticker_symbol TEXT,
  industry TEXT,
  country TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Financial periods
CREATE TABLE periods (
  id SERIAL PRIMARY KEY,
  document_id INTEGER REFERENCES documents(id),
  period_start_date DATE NOT NULL,
  period_end_date DATE NOT NULL,
  fiscal_year INTEGER NOT NULL,
  fiscal_quarter INTEGER NOT NULL,
  period_type TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Income statements
CREATE TABLE income_statements (
  id SERIAL PRIMARY KEY,
  document_id INTEGER REFERENCES documents(id),
  company_id INTEGER REFERENCES companies(id),
  period_id INTEGER REFERENCES periods(id),
  fiscal_year INTEGER NOT NULL,
  fiscal_quarter INTEGER NOT NULL,
  revenue NUMERIC,
  cost_of_goods_sold NUMERIC,
  gross_profit NUMERIC,
  operating_expenses NUMERIC,
  operating_income NUMERIC,
  net_income NUMERIC,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Balance sheets
CREATE TABLE balance_sheets (
  id SERIAL PRIMARY KEY,
  document_id INTEGER REFERENCES documents(id),
  company_id INTEGER REFERENCES companies(id),
  period_id INTEGER REFERENCES periods(id),
  fiscal_year INTEGER NOT NULL,
  fiscal_quarter INTEGER NOT NULL,
  total_assets NUMERIC,
  total_liabilities NUMERIC,
  total_equity NUMERIC,
  current_assets NUMERIC,
  current_liabilities NUMERIC,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Cash flow statements
CREATE TABLE cash_flow_statements (
  id SERIAL PRIMARY KEY,
  document_id INTEGER REFERENCES documents(id),
  company_id INTEGER REFERENCES companies(id),
  period_id INTEGER REFERENCES periods(id),
  fiscal_year INTEGER NOT NULL,
  fiscal_quarter INTEGER NOT NULL,
  operating_cash_flow NUMERIC,
  investing_cash_flow NUMERIC,
  financing_cash_flow NUMERIC,
  net_change_in_cash NUMERIC,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Financial ratios
CREATE TABLE financial_ratios (
  id SERIAL PRIMARY KEY,
  document_id INTEGER REFERENCES documents(id),
  company_id INTEGER REFERENCES companies(id),
  period_id INTEGER REFERENCES periods(id),
  fiscal_year INTEGER NOT NULL,
  fiscal_quarter INTEGER NOT NULL,
  gross_margin NUMERIC,
  operating_margin NUMERIC,
  net_margin NUMERIC,
  return_on_equity NUMERIC,
  return_on_assets NUMERIC,
  current_ratio NUMERIC,
  debt_to_equity NUMERIC,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Storage policies
CREATE POLICY "Allow public uploads" ON storage.objects
  FOR INSERT WITH CHECK (bucket_id = 'documents');

CREATE POLICY "Allow public reads" ON storage.objects
  FOR SELECT USING (bucket_id = 'documents'); 