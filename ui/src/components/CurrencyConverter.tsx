import { useState, useEffect } from "react";
import { TextField, MenuItem, Typography, Box, Paper, Button } from "@mui/material";

const CurrencyConverter = () => {
  const [amount, setAmount] = useState(1);
  const [fromCurrency, setFromCurrency] = useState("USD");
  const [toCurrency, setToCurrency] = useState("INR");
  const [convertedAmount, setConvertedAmount] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const [currencies, setCurrencies] = useState<string[]>([]);

  // Fetch supported currencies on mount
  useEffect(() => {
    fetch("http://localhost:8080/api/currency/supported-currencies")
      .then((res) => res.json())
      .then((data) => setCurrencies(data))
      .catch((error) => console.error("Error fetching currencies:", error));
  }, []);

  const handleConvert = () => {
    setLoading(true);
    fetch("http://localhost:8080/api/currency/conversion", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ sourceCurrency: fromCurrency, targetCurrency: toCurrency, amount }),
    })
      .then((res) => res.json())
      .then((data) => {
        setConvertedAmount(data.conversionResultValue.toFixed(2));
      })
      .catch((error) => {
        console.error("Error fetching exchange rate:", error);
        setConvertedAmount(null);
      })
      .finally(() => setLoading(false));
  };

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

      {/* Convert Button */}
      <Button variant="contained" color="primary" onClick={handleConvert} fullWidth sx={{ mt: 2 }} disabled={loading}>
        {loading ? "Converting..." : "Convert"}
      </Button>

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
