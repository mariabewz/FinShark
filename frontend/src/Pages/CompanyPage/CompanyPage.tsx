import React, { useEffect, useState } from "react";
import { CompanyProfile } from "../../company";
import { useParams } from "react-router-dom";
import { getCompanyProfile, getStockQuote } from "../../api";
import CompanyDashboard from "../../Components/CompanyDashboard/CompanyDashboard";
import Sidebar from "../../Components/Sidebar/Sidebar";
import Tile from "../../Components/Tile/Tile";
import Spinner from "../../Components/Spinner/Spinner";
import CompFinder from "../../Components/CompFinder/CompFinder";

interface Props { }

const CompanyPage = (props: Props) => {
  let { ticker } = useParams();
  const tabItems = [
    { id: 1, title: "Company Profile", icon: "fas fa-child", content: "step 1 content" },
    { id: 2, title: "Income Statement", icon: "fas fa-users", content: "step 2 content" },
    { id: 3, title: "Balance Sheet", icon: "fas fa-network-wired", content: "step 3 content" },
    { id: 4, title: "Cash Flow Statement", icon: "fas fa-money-check-alt", content: "step 4 content" },
  ];


  const [company, setCompany] = useState<CompanyProfile>();
  const [price, setPrice] = useState<number>();
  const [activeSidebarItem, setActiveSideBarItem] = useState<number>(1);

  useEffect(() => {
    const getProfileInit = async () => {
      if (!ticker) return; // Segurança caso o ticker seja undefined
      const [profile, quote] = await Promise.all([
        getCompanyProfile(ticker),
        getStockQuote(ticker),
      ]);
      setCompany(profile);
      setPrice(quote.c);
    };
    getProfileInit();
  }, [ticker]); // Adicionado ticker aqui para atualizar se a URL mudar

  return (
    <>
      {company ? (
        <div className="w-full relative flex overflow-x-hidden">
          <Sidebar
            tabItems={tabItems}
            setActiveSideBarItem={setActiveSideBarItem}
            activeSidebarItem={activeSidebarItem}
          />
          <CompanyDashboard 
            tabItems={tabItems} 
            activeSidebarItem={activeSidebarItem}
            ticker={ticker!}
          >
            <Tile title="Company Name" subTitle={company.name} />
            <Tile title="Ticker" subTitle={company.ticker} />
            <Tile
              title="Price"
              subTitle={price ? `$${price.toFixed(2)}` : "N/A"}
            />
            <Tile title="Industry" subTitle={company.finnhubIndustry} />
            <Tile
              title="Market Cap"
              subTitle={company.marketCapitalization?.toString() || "0"}
            />
            <Tile title="Website" subTitle={company.weburl} />
            <CompFinder ticker={ticker!} /> 
            <p className="bg-white shadow rounded text-medium font-medium text-gray-900 p-3 mt-1 m-4">
              {company.name} is listed on {company.exchange}
              {company.finnhubIndustry
                ? ` and operates in the ${company.finnhubIndustry} industry.`
                : "."}
            </p>
          </CompanyDashboard>
        </div>
      ) : (
        <Spinner />
              )}
    </>
  );
};

export default CompanyPage;
