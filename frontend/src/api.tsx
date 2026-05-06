import axios from "axios";
import {
  CompanyKeyMetrics,
  CompanyKeyMetricsResponse,
  CompanyProfile,
  CompanySearch,
} from "./company";

export interface FinnhubReportedFinancial {
  accessNumber: string;
  symbol: string;
  cik: string;
  year: number;
  quarter: number;
  form: string;
  startDate: string;
  endDate: string;
  filedDate: string;
  acceptedDate: string;
  report: {
    bs?: {
      concept: string;
      label: string;
      unit: string;
      value: number;
    }[];
    ic?: {
      concept: string;
      label: string;
      unit: string;
      value: number;
    }[];
    cf?: {
      concept: string;
      label: string;
      unit: string;
      value: number;
    }[];
  };
}

interface FinnhubReportedFinancialsResponse {
  data: FinnhubReportedFinancial[];
}

export interface FinnhubQuote {
  c: number;
  d: number | null;
  dp: number | null;
  h: number;
  l: number;
  o: number;
  pc: number;
  t: number;
}

export interface SearchResponse {
  count: number;
  result: CompanySearch[];  // FinnHub aninha o array em "result"
}
export const searchCompanies = async (query: string): Promise<SearchResponse> => {
  try {
    const response = await axios.get<SearchResponse>(
      `https://finnhub.io/api/v1/search?q=${query}&token=${process.env.REACT_APP_API_KEY}`
    );
    return response.data; // retorna só os dados

  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log("error message: ", error.message);
      throw new Error(error.message); // não retorna string
    } else {
      console.log("unexpected error: ", error);
      throw new Error("Unexpected error occurred.");
    }
  }
};


export const getCompanyProfile = async (symbol: string): Promise<CompanyProfile> => {
  try {
    const response = await axios.get<CompanyProfile>(
      `https://finnhub.io/api/v1/stock/profile2?symbol=${symbol}&token=${process.env.REACT_APP_API_KEY}`
    );

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log("error message: ", error.message);
      throw new Error(error.message);
    } else {
      console.log("unexpected error: ", error);
      throw new Error("Unexpected error occurred.");
    }
  }
};

export const getStockQuote = async (symbol: string): Promise<FinnhubQuote> => {
  try {
    const response = await axios.get<FinnhubQuote>(
      `https://finnhub.io/api/v1/quote?symbol=${symbol}&token=${process.env.REACT_APP_API_KEY}`
    );

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log("error message: ", error.message);
      throw new Error(error.message);
    } else {
      console.log("unexpected error: ", error);
      throw new Error("Unexpected error occurred.");
    }
  }
};

export const getKeyMetrics = async (symbol: string): Promise<CompanyKeyMetrics> => {
  try {
    const response = await axios.get<CompanyKeyMetricsResponse>(
      `https://finnhub.io/api/v1/stock/metric?symbol=${symbol}&metric=all&token=${process.env.REACT_APP_API_KEY}`
    );

    return response.data.metric;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log("error message: ", error.message);
      throw new Error(error.message);
    } else {
      console.log("unexpected error: ", error);
      throw new Error("Unexpected error occurred.");
    }
  }
};

export const getIncomeStatement = async (query: string): Promise<FinnhubReportedFinancial[]> => {
  try {
    const response = await axios.get<FinnhubReportedFinancialsResponse>(
      `https://finnhub.io/api/v1/stock/financials-reported?symbol=${query}&token=${process.env.REACT_APP_API_KEY}`
    );
    return response.data.data;
  } catch (error: any) {
    console.log("error message: ", error.message);
    return [];
  }
};

export const getBalanceSheet = async (query: string) => {
    try {
        const response = await axios.get<FinnhubReportedFinancialsResponse>(
            `https://finnhub.io/api/v1/stock/financials-reported?symbol=${query}&token=${process.env.REACT_APP_API_KEY}`
        );
        return response.data.data;
    } catch (error: any) {
        console.log(error.message);
        return [];
    }
};


export const getCashFlowStatement = async (query: string) => {
    try {
        const response = await axios.get<FinnhubReportedFinancialsResponse>(
            `https://finnhub.io/api/v1/stock/financials-reported?symbol=${query}&token=${process.env.REACT_APP_API_KEY}`
        );
        return response.data.data;
    } catch (error: any) {
        console.log(error.message);
        return [];
    }
};
