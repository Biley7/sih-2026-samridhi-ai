package com.sih.schemematcher.service;

import com.sih.schemematcher.dto.EMICalculationRequest;
import com.sih.schemematcher.dto.EMICalculationResponse;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.ArrayList;
import java.util.List;

@Service
public class EMICalculatorService {

    public EMICalculationResponse calculateEMI(EMICalculationRequest request) {
        BigDecimal P = request.getLoanAmount();
        BigDecimal annualRate = request.getInterestRate();
        int totalTenure = request.getTenureMonths();
        int moratorium = request.getMoratoriumMonths() != null ? request.getMoratoriumMonths() : 0;

        // Monthly Interest Rate (r = annualRate / 12 / 100)
        BigDecimal monthlyRate = annualRate.divide(new BigDecimal("1200"), 10, RoundingMode.HALF_UP);
        int activeRepaymentMonths = totalTenure - moratorium;

        // Formula: EMI = [P x r x (1+r)^n] / [(1+r)^n - 1]
        BigDecimal ratePlusOnePowN = monthlyRate.add(BigDecimal.ONE).pow(activeRepaymentMonths);
        BigDecimal numerator = P.multiply(monthlyRate).multiply(ratePlusOnePowN);
        BigDecimal denominator = ratePlusOnePowN.subtract(BigDecimal.ONE);
        
        BigDecimal monthlyEMI = numerator.divide(denominator, 2, RoundingMode.HALF_UP);

        List<EMICalculationResponse.AmortizationStep> schedule = new ArrayList<>();
        BigDecimal balance = P;
        BigDecimal totalInterest = BigDecimal.ZERO;

        // 1. Process Moratorium Period (Interest-Only or Deferred)
        for (int m = 1; m <= moratorium; m++) {
            BigDecimal moratoriumInterest = balance.multiply(monthlyRate).setScale(2, RoundingMode.HALF_UP);
            totalInterest = totalInterest.add(moratoriumInterest);

            schedule.add(EMICalculationResponse.AmortizationStep.builder()
                    .month(m)
                    .paymentType("MORATORIUM")
                    .emi(BigDecimal.ZERO)
                    .principal(BigDecimal.ZERO)
                    .interest(moratoriumInterest)
                    .remainingBalance(balance)
                    .build());
        }

        // 2. Process Active Amortization Schedule
        for (int m = 1; m <= activeRepaymentMonths; m++) {
            BigDecimal interestPayment = balance.multiply(monthlyRate).setScale(2, RoundingMode.HALF_UP);
            BigDecimal principalPayment = monthlyEMI.subtract(interestPayment).setScale(2, RoundingMode.HALF_UP);
            
            balance = balance.subtract(principalPayment);
            if (m == activeRepaymentMonths || balance.compareTo(BigDecimal.ZERO) < 0) {
                balance = BigDecimal.ZERO.setScale(2, RoundingMode.HALF_UP);
            }
            
            totalInterest = totalInterest.add(interestPayment);

            schedule.add(EMICalculationResponse.AmortizationStep.builder()
                    .month(moratorium + m)
                    .paymentType("REGULAR_EMI")
                    .emi(monthlyEMI)
                    .principal(principalPayment)
                    .interest(interestPayment)
                    .remainingBalance(balance)
                    .build());
        }

        BigDecimal totalAmount = P.add(totalInterest);

        return EMICalculationResponse.builder()
                .loanAmount(P)
                .monthlyEMI(monthlyEMI)
                .totalInterestPayable(totalInterest)
                .totalAmountPayable(totalAmount)
                .moratoriumMonths(moratorium)
                .amortizationSchedule(schedule)
                .build();
    }
}