import React, { useEffect, useState } from "react";
import { CompanyProfile } from "../../company";
import { useParams } from "react-router-dom";
import { getCompanyProfile } from "../../api";
import CompanyDashboard from "../../Components/CompanyDashboard/CompanyDashboard";
import Sidebar from "../../Components/Sidebar/Sidebar"; // Verifique este caminho abaixo!
import Tile from "../../Components/Tile/Tile";

interface Props { }

const CompanyPage = (props: Props) => {
  let { ticker } = useParams();
  const tabItems = [
    { id: 1, title: "Company Profile", icon: "fas fa-child", content: "step 1 content" },
    { id: 2, title: "Income Statement", icon: "fas fa-users", content: "step 2 content" },
    { id: 3, title: "Balance Sheet", icon: "fas fa-network-wired", content: "step 3 content" },
    { id: 4, title: "Cash Flow", icon: "fas fa-money-check-alt", content: "step 4 content" },
  ];

  const [company, setCompany] = useState<CompanyProfile>();
  const [activeSidebarItem, setActiveSideBarItem] = useState<number>(1);

  useEffect(() => {
    const getProfileInit = async () => {
      if (!ticker) return; // Segurança caso o ticker seja undefined
      const result = await getCompanyProfile(ticker);
      setCompany(result);
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
          >
            <Tile title="Company Name" subTitle={company.name} />
            <Tile title="Ticker" subTitle={company.ticker} />
            <Tile title="Exchange" subTitle={company.exchange} />
            <Tile title="Industry" subTitle={company.finnhubIndustry} />
            <Tile
              title="Market Cap"
              subTitle={company.marketCapitalization?.toString() || "0"}
            />
            <Tile title="Website" subTitle={company.weburl} />
          </CompanyDashboard>
        </div>
      ) : (
        <div>Loading or Company Not Found...</div>
      )}
    </>
  );
};

export default CompanyPage;
