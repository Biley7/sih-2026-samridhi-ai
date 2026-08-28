package com.sih.schemematcher.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class SchemeRecommendationRequest {

    private BigDecimal annualIncome;
    private BigDecimal projectCost;
    private String category;
    private Integer age;
    private String educationLevel;
}
