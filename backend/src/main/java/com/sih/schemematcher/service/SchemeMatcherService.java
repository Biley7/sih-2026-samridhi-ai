package com.sih.schemematcher.service;

import com.sih.schemematcher.dto.SchemeRecommendationRequest;
import com.sih.schemematcher.dto.SchemeRecommendationResponse;
import com.sih.schemematcher.entity.Scheme;
import com.sih.schemematcher.repository.SchemeRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class SchemeMatcherService {

    private final SchemeRepository schemeRepository;

    public SchemeRecommendationResponse recommendSchemes(SchemeRecommendationRequest request) {
        // Enforce hard cap rule for maximum annual family income (₹5.00 Lakhs)
        if (request.getAnnualIncome().compareTo(new BigDecimal("500000.00")) > 0) {
            return SchemeRecommendationResponse.builder()
                    .totalMatches(0)
                    .recommendations(new ArrayList<>())
                    .build();
        }

        List<Scheme> schemes = schemeRepository.findEligibleSchemes(request.getAnnualIncome(), request.getProjectCost());
        List<SchemeRecommendationResponse.RecommendationItem> items = new ArrayList<>();

        for (Scheme s : schemes) {
            int score = 100;
            String reason = "Matched criteria.";

            // Rule 1: Micro Finance Matching Logic
            if (request.getProjectCost().compareTo(new BigDecimal("140000.00")) <= 0 
                && s.getCategory().equalsIgnoreCase("Micro Finance")) {
                score = 95;
                reason = "Project cost falls within Micro Finance threshold (≤ ₹1.40L). High approval probability.";
            } 
            // Rule 2: Term Loan Matching Logic
            else if (request.getProjectCost().compareTo(new BigDecimal("140000.00")) > 0 
                     && s.getCategory().equalsIgnoreCase("Term Loan")) {
                score = 90;
                reason = "Project cost requires Term Loan structuring (up to ₹50L).";
            }

            items.add(SchemeRecommendationResponse.RecommendationItem.builder()
                    .schemeId(s.getId())
                    .schemeName(s.getTitle())
                    .category(s.getCategory())
                    .maxLoanAmount(s.getMaxCost())
                    .interestRate(s.getInterestRateMin())
                    .maxMoratoriumMonths(s.getMoratoriumMonths())
                    .eligibilityScore(score)
                    .matchReason(reason)
                    .build());
        }

        return SchemeRecommendationResponse.builder()
                .totalMatches(items.size())
                .recommendations(items)
                .build();
    }
}