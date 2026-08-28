-- Enable PostGIS Extension on Supabase
CREATE EXTENSION IF NOT EXISTS postgis;

-- 1. SCHEMES TABLE
CREATE TABLE IF NOT EXISTS schemes (
    id BIGSERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    category VARCHAR(100) NOT NULL, -- Micro Finance, Term Loan, Education Loan
    min_income NUMERIC(12, 2) DEFAULT 0.00,
    max_income NUMERIC(12, 2) NOT NULL DEFAULT 500000.00,
    min_cost NUMERIC(12, 2) DEFAULT 0.00,
    max_cost NUMERIC(12, 2) NOT NULL,
    interest_rate_min NUMERIC(5, 2) NOT NULL,
    interest_rate_max NUMERIC(5, 2) NOT NULL,
    moratorium_months INT NOT NULL DEFAULT 3,
    description TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 2. CHANNEL PARTNERS TABLE
CREATE TABLE IF NOT EXISTS channel_partners (
    id BIGSERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    type VARCHAR(50) NOT NULL, -- SCA, PSB, RRB, NBFC-MFI
    district VARCHAR(100) NOT NULL,
    state VARCHAR(100) NOT NULL,
    latitude NUMERIC(10, 8) NOT NULL,
    longitude NUMERIC(11, 8) NOT NULL,
    location GEOGRAPHY(POINT, 4326),
    active_fund_status BOOLEAN DEFAULT TRUE,
    npa_rating VARCHAR(20) DEFAULT 'LOW', -- LOW, MEDIUM, HIGH
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Spatial index for radius searches
CREATE INDEX IF NOT EXISTS idx_channel_partners_location 
ON channel_partners USING GIST(location);

-- Trigger to auto-update PostGIS Point from Lat/Lng
CREATE OR REPLACE FUNCTION update_partner_location()
RETURNS TRIGGER AS $$
BEGIN
    NEW.location = ST_SetSRID(ST_MakePoint(NEW.longitude, NEW.latitude), 4326)::geography;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE TRIGGER trg_update_partner_location
BEFORE INSERT OR UPDATE ON channel_partners
FOR EACH ROW EXECUTE FUNCTION update_partner_location();

-- 3. USER APPLICATIONS TABLE
CREATE TABLE IF NOT EXISTS user_applications (
    id BIGSERIAL PRIMARY KEY,
    user_name VARCHAR(150) NOT NULL,
    income NUMERIC(12, 2) NOT NULL,
    project_cost NUMERIC(12, 2) NOT NULL,
    recommended_scheme_id BIGINT REFERENCES schemes(id),
    assigned_partner_id BIGINT REFERENCES channel_partners(id),
    status VARCHAR(50) DEFAULT 'RECOMMENDED',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- SEED DATA SETUP FOR DEMO
INSERT INTO schemes (title, category, min_income, max_income, min_cost, max_cost, interest_rate_min, interest_rate_max, moratorium_months, description)
VALUES 
('NSFDC Micro-Credit Scheme', 'Micro Finance', 0.00, 500000.00, 10000.00, 140000.00, 6.50, 7.00, 3, 'Small financial assistance for micro-enterprises targeting SC entrepreneurs.'),
('NSFDC Term Loan Scheme', 'Term Loan', 0.00, 500000.00, 140001.00, 5000000.00, 8.00, 9.50, 6, 'Medium to long term loan for commercial and industrial ventures.'),
('NSFDC Education Loan Scheme', 'Education Loan', 0.00, 500000.00, 50000.00, 2000000.00, 4.00, 6.00, 12, 'Concessional educational loans for professional higher education.');

INSERT INTO channel_partners (name, type, district, state, latitude, longitude, active_fund_status, npa_rating)
VALUES 
('West Bengal SC, ST & OBC Development Corporation', 'SCA', 'Kolkata', 'West Bengal', 22.5697, 88.3697, true, 'LOW'),
('Punjab National Bank - Regional Micro Branch', 'PSB', 'Kolkata', 'West Bengal', 22.5726, 88.3639, true, 'LOW'),
('Bangiya Gramin Vikash Bank', 'RRB', 'North 24 Parganas', 'West Bengal', 22.7219, 88.3932, true, 'MEDIUM');