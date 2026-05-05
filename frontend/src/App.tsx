// import { ChangeEvent, SyntheticEvent, useState } from "react";
// import CardList from "./Components/CardList/CardList";
// import Search from "./Components/Search/Search";
// import { searchCompanies } from "./api";
// import { CompanySearch } from "./company";
// import ListPortfolio from "./Components/Portfolio/ListPortfolio/ListPortfolio";
// import Hero from "./Components/Hero/Hero";
import { Outlet } from "react-router";
import Navbar from "./Components/Navbar/Navbar";
import "./App.css";

function App() {

  return (

    <>
      <Navbar />
      <Outlet />
    </>
  );
}

export default App;