import React, { useState, useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import Table from "../Table/Table";
import { FinnhubReportedFinancial, getIncomeStatement } from "../../api";
import { formatLargeMonetaryNumber } from "../../Helpers/NumberFormatting";
import Spinner from "../Spinner/Spinner";

type Props = {};

const getValue = (report: FinnhubReportedFinancial, concepts: string[]) => {
  const data = report.report?.ic || [];

  for (const concept of concepts) {
    const found = data.find((x) => x.concept === concept);
    if (found) return found.value;
  }

  return 0;
};

const configs = [
  {
    label: "Date",
    render: (company: FinnhubReportedFinancial) => company.endDate,
  },
  {
    label: "Total Revenue",
    render: (company: FinnhubReportedFinancial) =>
      formatLargeMonetaryNumber(
        getValue(company, [
          "us-gaap_RevenueFromContractWithCustomerExcludingAssessedTax",
          "us-gaap_Revenues",
          "us-gaap_SalesRevenueNet",
        ])
      ),
  },
  {
    label: "Net Income",
    render: (company: FinnhubReportedFinancial) =>
      formatLargeMonetaryNumber(
        getValue(company, [
          "us-gaap_NetIncomeLoss",
          "us-gaap_ProfitLoss",
        ])
      ),
  },
  {
    label: "Operating Expenses",
    render: (company: FinnhubReportedFinancial) =>
      formatLargeMonetaryNumber(
        getValue(company, ["us-gaap_OperatingExpenses"])
      ),
  },
  {
    label: "Cost of Revenue",
    render: (company: FinnhubReportedFinancial) =>
      formatLargeMonetaryNumber(
        getValue(company, [
          "us-gaap_CostOfRevenue",
          "us-gaap_CostOfGoodsAndServicesSold",
        ])
      ),
  },
];

const IncomeStatement = (props: Props) => {
  const ticker = useOutletContext<string>();
  const [incomeStatement, setIncomeStatement] =
    useState<FinnhubReportedFinancial[]>();
  useEffect(() => {
    const getRatios = async () => {
      if (!ticker) return;
      const result = await getIncomeStatement(ticker);
      setIncomeStatement(result);
    };
    getRatios();
  }, [ticker]);
  return (
    <>
      {incomeStatement && incomeStatement.length > 0 ? (
        <Table config={configs} data={incomeStatement} />
      ) : (
        <Spinner />
      )}
    </>
  );
};

export default IncomeStatement;
