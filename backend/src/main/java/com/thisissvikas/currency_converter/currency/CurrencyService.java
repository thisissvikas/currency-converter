package com.thisissvikas.currency_converter.currency;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CurrencyService {

    private final CurrencyConverterService currencyConverterService;

    public List<String> getSupportedCurrencies() {
        return List.of("USD", "INR", "EUR", "DKK");
    }

    public CurrencyConversionResultDTO convertCurrency(CurrencyConversionInputDTO currencyConversionInput) {
        var sourceCurrency = currencyConversionInput.sourceCurrency();
        var targetCurrency = currencyConversionInput.targetCurrency();
        var amount = currencyConversionInput.amount();
        return new CurrencyConversionResultDTO(sourceCurrency, targetCurrency, amount,
                currencyConverterService.convertCurrency(sourceCurrency, targetCurrency, amount));
    }
}
