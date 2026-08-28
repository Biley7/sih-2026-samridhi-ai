package com.sih.schemematcher.entity;

import jakarta.persistence.*;
import lombok.*;
import java.math.BigDecimal;

@Entity
@Table(name = "schemes")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Scheme {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String title;

    @Column(nullable = false)
    private String category;

    @Column(name = "min_income")
    private BigDecimal minIncome;

    @Column(name = "max_income", nullable = false)
    private BigDecimal maxIncome;

    @Column(name = "min_cost")
    private BigDecimal minCost;

    @Column(name = "max_cost", nullable = false)
    private BigDecimal maxCost;

    @Column(name = "interest_rate_min", nullable = false)
    private BigDecimal interestRateMin;

    @Column(name = "interest_rate_max", nullable = false)
    private BigDecimal interestRateMax;

    @Column(name = "moratorium_months", nullable = false)
    private Integer moratoriumMonths;

    @Column(columnDefinition = "TEXT")
    private String description;
}