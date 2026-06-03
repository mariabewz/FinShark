import axios from "axios";
import {
  CompanyKeyMetrics,
  CompanyKeyMetricsResponse,
  CompanyProfile,
  CompanySearch,
  CompanyTenK,
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
      `http://localhost:5018/api/stock/search?query=${query}`
    );
    return response.data;

  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log("error message: ", error.message);
      throw new Error(error.response?.data?.error || error.message);
    } else {
      console.log("unexpected error: ", error);
      throw error;
    }
  }
};


export const getCompanyProfile = async (symbol: string): Promise<CompanyProfile> => {
  try {
    const response = await axios.get<CompanyProfile>(
      `http://localhost:5018/api/stock/profile/${symbol}`
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
      `http://localhost:5018/api/stock/quote/${symbol}`
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

export const getCompData = async (symbol: string): Promise<string[]> => {
  try {
    const response = await axios.get<string[]>(
      `http://localhost:5018/api/stock/peers/${symbol}`
    );

    return response.data.filter((ticker) => ticker !== symbol);
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log("error message: ", error.message);
    } else {
      console.log("unexpected error: ", error);
    }

    return [];
  }
};

export const getKeyMetrics = async (symbol: string): Promise<CompanyKeyMetrics> => {
  try {
    const response = await axios.get<CompanyKeyMetricsResponse>(
      `http://localhost:5018/api/stock/metrics/${symbol}`
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
      `http://localhost:5018/api/stock/financials-reported/${query}`
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
            `http://localhost:5018/api/stock/financials-reported/${query}`
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
            `http://localhost:5018/api/stock/financials-reported/${query}`
        );
        return response.data.data;
    } catch (error: any) {
        console.log(error.message);
        return [];
    }
};


export const getTenK = async (query: string): Promise<CompanyTenK[]> => {
    try {
        const response = await axios.get<CompanyTenK[]>(
                `http://localhost:5018/api/stock/filings/${query}`
                );
        return response.data.filter((filing) => filing.form === "10-K");
    } catch (error: any) {
        console.log(error.message);
        return [];
    }
};
