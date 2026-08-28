package com.sih.schemematcher.controller;

import com.sih.schemematcher.dto.PartnerDTO;
import com.sih.schemematcher.repository.ChannelPartnerRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/v1/partners")
@RequiredArgsConstructor
public class PartnerController {

    private final ChannelPartnerRepository partnerRepository;

    @GetMapping("/nearby")
    public ResponseEntity<List<PartnerDTO>> getNearbyPartners(
            @RequestParam("lat") double lat,
            @RequestParam("lng") double lng,
            @RequestParam(value = "radiusKm", defaultValue = "15.0") double radiusKm) {

        List<Object[]> results = partnerRepository.findNearbyPartnersNative(lat, lng, radiusKm);
        
        List<PartnerDTO> dtos = results.stream().map(row -> PartnerDTO.builder()
                .id(((Number) row[0]).longValue())
                .name((String) row[1])
                .partnerType((String) row[2])
                .district((String) row[3])
                .state((String) row[4])
                .latitude(BigDecimal.valueOf(((Number) row[5]).doubleValue()))
                .longitude(BigDecimal.valueOf(((Number) row[6]).doubleValue()))
                .activeFundStatus((Boolean) row[7])
                .npaRating((String) row[8])
                .distanceKm(BigDecimal.valueOf(((Number) row[9]).doubleValue()).setScale(2, java.math.RoundingMode.HALF_UP).doubleValue())
                .build()
        ).collect(Collectors.toList());

        return ResponseEntity.ok(dtos);
    }
}