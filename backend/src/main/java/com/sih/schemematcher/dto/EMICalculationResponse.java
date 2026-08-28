package com.sih.schemematcher.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class EMICalculationResponse {

    private BigDecimal loanAmount;
    private BigDecimal monthlyEMI;
    private BigDecimal totalInterestPayable;
    private BigDecimal totalAmountPayable;
    private Integer moratoriumMonths;
    private List<AmortizationStep> amortizationSchedule;

    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class AmortizationStep {

        private Integer month;
        private String paymentType;
        private BigDecimal emi;
        private BigDecimal principal;
        private BigDecimal interest;
        private BigDecimal remainingBalance;
    }
}
