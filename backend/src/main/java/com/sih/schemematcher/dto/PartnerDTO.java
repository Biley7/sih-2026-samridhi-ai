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
public class PartnerDTO {

    private Long id;
    private String name;
    private String partnerType;
    private String district;
    private String state;
    private BigDecimal latitude;
    private BigDecimal longitude;
    private Double distanceKm;
    private Boolean activeFundStatus;
    private String npaRating;
}
