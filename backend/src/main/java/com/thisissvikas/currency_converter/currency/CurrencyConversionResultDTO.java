package com.thisissvikas.currency_converter.currency;


public record CurrencyConversionResultDTO(String sourceCurrency, String destinationCurrency, double inputValue,
                                          double conversionResultValue) {}
