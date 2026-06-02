import React, { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import { CompanyKeyMetrics } from "../../company";
import { getKeyMetrics } from "../../api";
import RatioList from "../RatioList/RatioList";
import Spinner from "../Spinner/Spinner";
import {
  formatLargeNonMonetaryNumber,
  formatRatio,
} from "../../Helpers/NumberFormatting";
import StockComment from "../StockComment/StockComment";

type Props = {};

const tableConfig = [
  {
    label: "Market Cap",
    render: (company: CompanyKeyMetrics) =>
      formatLargeNonMonetaryNumber(
        company.marketCapTTM || company.marketCapitalization || 0
      ),
    subTitle: "Total value of all a company's shares of stock",
  },
  {
    label: "Current Ratio",
    render: (company: CompanyKeyMetrics) =>
      formatRatio(company.currentRatioTTM),
    subTitle:
      "Measures the company's ability to pay short term debt obligations",
  },
  {
    label: "Return On Equity",
    render: (company: CompanyKeyMetrics) => formatRatio(company.roeTTM),
    subTitle:
      "Return on equity is net income divided by shareholder equity",
  },
  {
    label: "Cash Per Share",
    render: (company: CompanyKeyMetrics) =>
      formatRatio(company.cashPerShareTTM),
    subTitle: "Cash and equivalents available for each share",
  },
  {
    label: "Free Cashflow Per Share",
    render: (company: CompanyKeyMetrics) =>
      formatRatio(company.freeCashFlowPerShareTTM),
    subTitle: "Free cash flow generated for each share",
  },
  {
    label: "PE Ratio",
    render: (company: CompanyKeyMetrics) => formatRatio(company.peRatioTTM),
    subTitle: "Share price relative to earnings per share",
  },
];

const CompanyProfile = (props: Props) => {
  const ticker = useOutletContext<string>();
  const [companyData, setCompanyData] = useState<CompanyKeyMetrics>();
  useEffect(() => {
    const getCompanyKeyRatios = async () => {
      const value = await getKeyMetrics(ticker);
      setCompanyData(value);
    };
    getCompanyKeyRatios();
  }, [ticker]);
  return (
    <>
      {companyData ? (
        <>
          <RatioList config={tableConfig} data={companyData} />
          <StockComment stockSymbol={ticker} />
        </>
      ) : (
        <Spinner />
              )}
    </>
  );
};

export default CompanyProfile;
