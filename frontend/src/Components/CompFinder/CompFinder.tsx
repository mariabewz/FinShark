import React, { useEffect, useState } from "react";
import CompFinderItem from "../CompFinderItem/CompFinderItem";
import { getCompData } from "../../api";
import Spinner from "../Spinner/Spinner";

type Props = {
    ticker: string;
};

const CompFinder = ({ ticker }: Props) => {
    const [companyData, setCompanyData] = useState<string[] | null>(null);

    useEffect(() => {
        const getComps = async () => {
            const value = await getCompData(ticker);
            setCompanyData(value);
        };

        getComps();
    }, [ticker]);

    return (
        <div className="inline-flex flex-wrap gap-2 m-4">
            {companyData ? (
                companyData.map((ticker, index) => (
                    <CompFinderItem key={index} ticker={ticker} />
                ))
            ) : (
                <Spinner />
            )}
        </div>
    );
};

export default CompFinder;
