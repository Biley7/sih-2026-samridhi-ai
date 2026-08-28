# API Contract Specification

**Base URL:** `http://localhost:8080/api/v1`  
**Headers:** `Content-Type: application/json`

---

## Endpoint 1: Scheme Recommendation

Evaluates candidate eligibility based on income caps, project cost, age, and education level. Returns matched concessional schemes with computed eligibility scores.

- **Route:** `POST /api/v1/schemes/recommend`
- **Request Body:**

```json
{
  "annualIncome": 350000.00,
  "projectCost": 120000.00,
  "category": "SC",
  "age": 24,
  "educationLevel": "GRADUATE"
}

{
  "totalMatches": 2,
  "recommendations": [
    {
      "schemeId": 101,
      "schemeName": "National Scheduled Castes Finance and Development Corporation Micro-Credit Scheme",
      "category": "Micro Finance",
      "maxLoanAmount": 140000.00,
      "interestRate": 6.50,
      "maxMoratoriumMonths": 3,
      "eligibilityScore": 95,
      "matchReason": "Income is within ₹5.00L limit; project cost aligns with Micro Finance cap (≤ ₹1.40L)."
    }
  ]
}

{
  "loanAmount": 100000.00,
  "interestRate": 6.50,
  "tenureMonths": 36,
  "moratoriumMonths": 3
}

{
  "loanAmount": 100000.00,
  "monthlyEMI": 3064.91,
  "totalInterestPayable": 10336.76,
  "totalAmountPayable": 110336.76,
  "moratoriumMonths": 3,
  "amortizationSchedule": [
    {
      "month": 1,
      "paymentType": "MORATORIUM",
      "emi": 0.00,
      "principal": 0.00,
      "interest": 541.67,
      "remainingBalance": 100000.00
    }
  ]
}