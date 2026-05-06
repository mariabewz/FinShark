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
                companyData.length > 0 ? (
                    companyData.map((ticker) => (
                        <CompFinderItem key={ticker} ticker={ticker} />
                    ))
                ) : (
                    <p className="text-sm text-blueGray-500">
                        No comparable companies found.
                    </p>
                )
            ) : (
                <Spinner />
            )}
        </div>
    );
};

export default CompFinder;
