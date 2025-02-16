package com.thisissvikas.currency_converter.currency;

import lombok.Data;

import java.util.Map;

@Data
public class CurrencyApiResponse {
    private boolean success;
    private String base;
    private Map<String, Double> rates;
}
