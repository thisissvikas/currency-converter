package com.thisissvikas.currency_converter.currency;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@RequiredArgsConstructor
@Service
public class CurrencyConverterService {

    private final RestTemplate restTemplate;

    public double convertCurrency(String sourceCurrency, String targetCurrency, double amount){
        CurrencyApiResponse response = restTemplate.getForObject("https://api.fxratesapi.com/latest", CurrencyApiResponse.class);
        if (response == null || response.getRates() == null) {
            throw new RuntimeException("Failed to fetch exchange rates");
        }

        if (!response.getRates().containsKey(sourceCurrency) || !response.getRates().containsKey(targetCurrency)) {
            throw new IllegalArgumentException("Unsupported currency");
        }

        double fromRate = response.getRates().get(sourceCurrency);
        double toRate = response.getRates().get(targetCurrency);

        double convertedAmount = (amount / fromRate) * toRate;
        return Math.round(convertedAmount * 100.0) / 100.0;
    }
}
