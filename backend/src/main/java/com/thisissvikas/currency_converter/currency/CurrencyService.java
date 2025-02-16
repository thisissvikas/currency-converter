package com.thisissvikas.currency_converter.currency;

import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CurrencyService {
    public List<String> getSupportedCurrencies() {
        return List.of("USD", "INR", "EUR", "DKK");
    }

    public CurrencyConversionResultDTO convertCurrency(CurrencyConversionInputDTO currencyConversionInput) {
        return new CurrencyConversionResultDTO(currencyConversionInput.sourceCurrency(),
                currencyConversionInput.targetCurrency(), currencyConversionInput.amount(), 84.0);
    }
}
