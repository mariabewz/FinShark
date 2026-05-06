import React, {useEffect, useState} from "react";
import {useOutletContext} from "react-router-dom";
import {FinnhubReportedFinancial, getBalanceSheet} from "../../api";
import RatioList from "../RatioList/RatioList";
import {formatLargeMonetaryNumber} from "../../Helpers/NumberFormatting";
import Spinner from "../Spinner/Spinner";

const getValue = (report: FinnhubReportedFinancial, concepts: string[]) => {
    const data = report.report?.bs || [];

    for (const concept of concepts) {
        const found = data.find((x) => x.concept === concept);
        if (found) return found.value;
    }

    return 0;
};

const BalanceSheet = () => {
    const ticker = useOutletContext<string>();
    const [companyData, setCompanyData] = useState<FinnhubReportedFinancial>();

    useEffect(() => {
        const fetchData = async () => {
            const result = await getBalanceSheet(ticker!);
            setCompanyData(result?.[0]);
        };

        fetchData();
    }, [ticker]);

    if (!companyData) return <Spinner />;

    const config = [
        {
            label: "Cash",
            render: () =>
                formatLargeMonetaryNumber(
                    getValue(companyData, [
                        "us-gaap_CashAndCashEquivalentsAtCarryingValue",
                    ])
                ),
        },
        {
            label: "Inventory",
            render: () =>
                formatLargeMonetaryNumber(
                    getValue(companyData, ["us-gaap_InventoryNet"])
                ),
        },
        {
            label: "Total Assets",
            render: () =>
                formatLargeMonetaryNumber(
                    getValue(companyData, ["us-gaap_Assets"])
                ),
        },
        {
            label: "Total Liabilities",
            render: () =>
                formatLargeMonetaryNumber(
                    getValue(companyData, ["us-gaap_Liabilities"])
                ),
        },
        {
            label: "Retained Earnings",
            render: () =>
                formatLargeMonetaryNumber(
                    getValue(companyData, [
                        "us-gaap_RetainedEarningsAccumulatedDeficit",
                    ])
                ),
        },
    ];

    return <RatioList config={config} data={companyData}/>;
};

export default BalanceSheet;
