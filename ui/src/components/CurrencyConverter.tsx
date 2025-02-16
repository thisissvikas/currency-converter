import { useState, useEffect } from "react";
import { TextField, MenuItem, Typography, Box, Paper } from "@mui/material";

const API_BASE_URL = "http://localhost:8080/api/currency";

const CurrencyConverter = () => {
  const [amount, setAmount] = useState(1);
  const [fromCurrency, setFromCurrency] = useState("USD");
  const [toCurrency, setToCurrency] = useState("INR");
  const [convertedAmount, setConvertedAmount] = useState<string | null>(null);
  const [currencies, setCurrencies] = useState<string[]>([]);

  // Fetch the supported currencies from backend
  useEffect(() => {
    fetch(`${API_BASE_URL}/supported-currencies`)
      .then((res) => res.json())
      .then((data) => {
        setCurrencies(data); // Assuming backend returns an array of strings
      })
      .catch((error) => {
        console.error("Error fetching supported currencies:", error);
      });
  }, []);

  // Fetch conversion result when inputs change
  useEffect(() => {
    if (amount > 0 && fromCurrency && toCurrency) {
      fetch(`${API_BASE_URL}/conversion`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          sourceCurrency: fromCurrency,
          targetCurrency: toCurrency,
          amount,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.conversionResultValue) {
            setConvertedAmount(data.conversionResultValue.toFixed(2)); // Round to 2 decimal places
          } else {
            setConvertedAmount(null);
          }
        })
        .catch((error) => {
          console.error("Error fetching exchange rate:", error);
          setConvertedAmount(null);
        });
    }
  }, [amount, fromCurrency, toCurrency]);

  return (
    <Box sx={{ maxWidth: 400, mx: "auto", mt: 4, textAlign: "center" }}>
      <Typography variant="h4" gutterBottom>
        Currency Converter
      </Typography>

      {/* Input for Amount */}
      <TextField
        label="Amount"
        type="number"
        value={amount}
        onChange={(e) => setAmount(Number(e.target.value))}
        fullWidth
        margin="normal"
      />

      {/* Dropdown for From Currency */}
      <TextField
        select
        label="From"
        value={fromCurrency}
        onChange={(e) => setFromCurrency(e.target.value)}
        fullWidth
        margin="normal"
      >
        {currencies.map((cur) => (
          <MenuItem key={cur} value={cur}>
            {cur}
          </MenuItem>
        ))}
      </TextField>

      {/* Dropdown for To Currency */}
      <TextField
        select
        label="To"
        value={toCurrency}
        onChange={(e) => setToCurrency(e.target.value)}
        fullWidth
        margin="normal"
      >
        {currencies.map((cur) => (
          <MenuItem key={cur} value={cur}>
            {cur}
          </MenuItem>
        ))}
      </TextField>

      {/* Converted Amount Display */}
      {convertedAmount !== null && (
        <Paper
          sx={{
            mt: 3,
            p: 2,
            backgroundColor: "#f5f5f5",
            display: "inline-block",
            borderRadius: "8px",
          }}
          elevation={3}
        >
          <Typography variant="h5" color="primary">
            {amount} {fromCurrency} = {convertedAmount} {toCurrency}
          </Typography>
        </Paper>
      )}
    </Box>
  );
};

export default CurrencyConverter;
