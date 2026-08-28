package com.sih.schemematcher.controller;

import com.sih.schemematcher.dto.EMICalculationRequest;
import com.sih.schemematcher.dto.EMICalculationResponse;
import com.sih.schemematcher.service.EMICalculatorService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/calculator")
@RequiredArgsConstructor
public class CalculatorController {

    private final EMICalculatorService calculatorService;

    @PostMapping("/emi")
    public ResponseEntity<EMICalculationResponse> calculateEMI(
            @RequestBody EMICalculationRequest request) {
        return ResponseEntity.ok(calculatorService.calculateEMI(request));
    }
}