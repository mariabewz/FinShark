import React, { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import { FinnhubReportedFinancial, getCashFlowStatement } from "../../api";
import { formatLargeMonetaryNumber } from "../../Helpers/NumberFormatting";
import Table from "../Table/Table";
import Spinner from "../Spinner/Spinner";

type Props = {};

const getValue = (report: FinnhubReportedFinancial, concepts: string[]) => {
  const data = report.report?.cf || [];

  for (const concept of concepts) {
    const found = data.find((x) => x.concept === concept);
    if (found) return found.value;
  }

  return 0;
};

const config = [
  {
    label: "Date",
    render: (company: FinnhubReportedFinancial) => company.endDate,
  },
  {
    label: "Operating Cashflow",
    render: (company: FinnhubReportedFinancial) =>
      formatLargeMonetaryNumber(
        getValue(company, [
          "us-gaap_NetCashProvidedByUsedInOperatingActivities",
          "us-gaap_NetCashProvidedByUsedInOperatingActivitiesContinuingOperations",
        ])
      ),
  },
  {
    label: "Property/Machinery Cashflow",
    render: (company: FinnhubReportedFinancial) =>
      formatLargeMonetaryNumber(
        getValue(company, [
          "us-gaap_PaymentsToAcquirePropertyPlantAndEquipment",
          "us-gaap_PaymentsToAcquireProductiveAssets",
        ])
      ),
  },
  {
    label: "Other Investing Cashflow",
    render: (company: FinnhubReportedFinancial) =>
      formatLargeMonetaryNumber(
        getValue(company, ["us-gaap_NetCashProvidedByUsedInInvestingActivities"])
      ),
  },
  {
    label: "Debt Cashflow",
    render: (company: FinnhubReportedFinancial) =>
      formatLargeMonetaryNumber(
        getValue(company, ["us-gaap_NetCashProvidedByUsedInFinancingActivities"])
      ),
  },
  {
    label: "CapEX",
    render: (company: FinnhubReportedFinancial) =>
      formatLargeMonetaryNumber(
        getValue(company, [
          "us-gaap_PaymentsToAcquirePropertyPlantAndEquipment",
          "us-gaap_PaymentsToAcquireProductiveAssets",
        ])
      ),
  },
  {
    label: "Free Cash Flow",
    render: (company: FinnhubReportedFinancial) => {
      const operatingCashFlow = getValue(company, [
        "us-gaap_NetCashProvidedByUsedInOperatingActivities",
        "us-gaap_NetCashProvidedByUsedInOperatingActivitiesContinuingOperations",
      ]);
      const capex = getValue(company, [
        "us-gaap_PaymentsToAcquirePropertyPlantAndEquipment",
        "us-gaap_PaymentsToAcquireProductiveAssets",
      ]);

      return formatLargeMonetaryNumber(operatingCashFlow - Math.abs(capex));
    },
  },
];

const CashflowStatement = (props: Props) => {
  const ticker = useOutletContext<string>();
  const [cashFlowData, setCashFlowData] = useState<FinnhubReportedFinancial[]>();
  useEffect(() => {
    const getRatios = async () => {
      if (!ticker) return;
      const result = await getCashFlowStatement(ticker);
      setCashFlowData(result);
    };
    getRatios();
  }, [ticker]);
  return cashFlowData && cashFlowData.length > 0 ? (
    <Table config={config} data={cashFlowData}></Table>
  ) : (
    <Spinner />
    );
};

export default CashflowStatement;
