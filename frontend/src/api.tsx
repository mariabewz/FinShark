import axios from "axios";
import { CompanyProfile, CompanySearch } from "./company";

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