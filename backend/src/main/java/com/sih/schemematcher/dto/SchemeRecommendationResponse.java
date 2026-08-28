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
public class SchemeRecommendationResponse {

    private Integer totalMatches;
    private List<RecommendationItem> recommendations;

    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class RecommendationItem {

        private Long schemeId;
        private String schemeName;
        private String category;
        private BigDecimal maxLoanAmount;
        private BigDecimal interestRate;
        private Integer maxMoratoriumMonths;
        private Integer eligibilityScore;
        private String matchReason;
    }
}
