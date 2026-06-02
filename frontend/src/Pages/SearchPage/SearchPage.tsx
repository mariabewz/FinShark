import React, { useState, ChangeEvent, SyntheticEvent, useEffect } from "react";
import { CompanySearch } from "../../company";
import { searchCompanies } from "../../api";
import Search from "../../Components/Search/Search";
import ListPortfolio from "../../Components/Portfolio/ListPortfolio/ListPortfolio";
import CardList from "../../Components/CardList/CardList";
import { PortfolioGet } from "../../Models/Portfolio";
import {
  portfolioAddAPI,
  portfolioDeleteAPI,
  portfolioGetAPI,
} from "../../Services/PortfolioService";
import { toast } from "react-toastify";

interface Props { }

const SearchPage = (props: Props) => {

  const [search, setSearch] = useState<string>("");
  const [portfolioValues, setPortfolioValues] = useState<PortfolioGet[] | null>(
    []
  );
  const [searchResult, setSearchResult] = useState<CompanySearch[]>([]);
  const [serverError, setServerError] = useState<string | null>(null);

   useEffect(() => {
        getPortfolio();
    }, []);

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const getPortfolio = () => {
        portfolioGetAPI()
            .then((res) => {
                if (res?.data) {
                    setPortfolioValues(res?.data);
                }
            })
            .catch((e) => {
                setPortfolioValues(null);
            });
    };

    const onPortfolioCreate = (e: any) => {
        e.preventDefault();

        const symbol = e.target[0].value;

        // 👇 evita duplicado antes de chamar API
        if (portfolioValues?.some(p => p.symbol === symbol)) {
            toast.warning("Stock already in portfolio!");
            return;
        }

        portfolioAddAPI(symbol)
            .then((res) => {
                if (res) {
                    toast.success("Stock added to portfolio!");
                    getPortfolio(); // 👈 ATUALIZA NA HORA
                }
            })
            .catch((e) => {
                toast.warning("Could not add stock to portfolio!");
            });
    };

    const onPortfolioDelete = (e: any) => {
        e.preventDefault();
        portfolioDeleteAPI(e.target[0].value).then((res) => {
            if (res?.status == 200) {
                toast.success("Stock deleted from portfolio!");
                getPortfolio();
            }
        });
    };

    const onSearchSubmit = async (e: SyntheticEvent) => {
        e.preventDefault();

        if (!localStorage.getItem("token")) {
            window.location.href = "/login";
            return;
        }

        const result = await searchCompanies(search);

        if (typeof result === "string") {
            setServerError(result);
        } else if (Array.isArray(result)) {
            setSearchResult(result);
        }
    };

    return (
        <>
            <Search
                onSearchSubmit={onSearchSubmit}
                search={search}
                handleSearchChange={handleSearchChange}
            />
            <ListPortfolio
                portfolioValues={portfolioValues!}
                onPortfolioDelete={onPortfolioDelete}
            />
            <CardList
                searchResults={searchResult}
                onPortfolioCreate={onPortfolioCreate}
            />

            {serverError && <div>Unable to connect to API</div>}
        </>
    );
};

export default SearchPage;