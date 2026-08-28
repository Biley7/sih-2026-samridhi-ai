package com.sih.schemematcher.controller;

import com.sih.schemematcher.dto.SchemeRecommendationRequest;
import com.sih.schemematcher.dto.SchemeRecommendationResponse;
import com.sih.schemematcher.service.SchemeMatcherService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/schemes")
@RequiredArgsConstructor
public class SchemeController {

    private final SchemeMatcherService schemeMatcherService;

    @PostMapping("/recommend")
    public ResponseEntity<SchemeRecommendationResponse> getRecommendations(
            @RequestBody SchemeRecommendationRequest request) {
        return ResponseEntity.ok(schemeMatcherService.recommendSchemes(request));
    }
}