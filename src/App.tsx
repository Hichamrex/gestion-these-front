import React from "react";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Theses from "./pages/Theses";
import Accueil from "./pages/Accueil";
import Users from "./pages/Users";
import Departements from "./pages/Departements";
import Laboratoires from "./pages/Laboratoires";
import AgentRecherche from "./pages/AgentRecherche";
import Search from "./pages/Search";
import TheseDetails from "./pages/TheseDetails";
import UserInformation from "./pages/UserInformation";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Accueil />} />
        <Route path="/theses" element={<Theses />} />
        <Route path="/users" element={<Users />} />
        <Route path="/agent-recherches" element={<AgentRecherche />} />
        <Route path="/departements" element={<Departements />} />
        <Route path="/laboratoires" element={<Laboratoires />} />
        <Route path="/search" element={<Search />} />
        <Route path="/these-details/:id" element={<TheseDetails />} />
        <Route path="/user-information/:id" element={<UserInformation />} />
        <Route path="/login" element={<Login />} /> 
      </Routes>
    </BrowserRouter>
  );
}

export default App;
