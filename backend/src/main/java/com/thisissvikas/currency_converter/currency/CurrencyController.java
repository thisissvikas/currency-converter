package com.thisissvikas.currency_converter.currency;

import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/currency")
@AllArgsConstructor
public class CurrencyController {

    private final CurrencyService currencyService;

    @GetMapping("/supported-currencies")
    public ResponseEntity<List<String>> getSupportedCurrencies() {
        return ResponseEntity.ok(currencyService.getSupportedCurrencies());
    }

    @PostMapping("/conversion")
    public ResponseEntity<CurrencyConversionResultDTO> convertCurrency(@RequestBody CurrencyConversionInputDTO currencyConversionInput) {
        return ResponseEntity.ok(currencyService.convertCurrency(currencyConversionInput));
    }
}
