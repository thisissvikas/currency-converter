import axios from "axios";

const API_URL = "https://api.exchangerate.host";

export const fetchCurrencies = async (): Promise<string[]> => {
  const response = await axios.get(`${API_URL}/latest`);
  return Object.keys(response.data.rates);
};

export const convertCurrency = async (
  from: string,
  to: string,
  amount: number
): Promise<number> => {
  const response = await axios.get(`${API_URL}/convert`, {
    params: { from, to, amount },
  });
  return response.data.result;
};
