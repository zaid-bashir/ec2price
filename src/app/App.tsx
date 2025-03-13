import { AppHeader, Page } from "@dynatrace/strato-components-preview/layouts";
import React from "react";
import { Link, Route, Routes } from "react-router-dom";
import { EC2Hosts } from "./pages/EC2Hosts";
import GraphsCustom from "./pages/GraphsCustom";

export const App = () => {
  return (
    <Page>
      <Page.Header>
        <AppHeader>
             <AppHeader.NavItems>
               <AppHeader.AppNavLink as={Link} to="/" appName="EC2 Consumption" >
               </AppHeader.AppNavLink>
               <AppHeader.NavItem as={Link} to="/graphs">
                 Graph Visualisation
               </AppHeader.NavItem>
             </AppHeader.NavItems>
           </AppHeader>
      </Page.Header>
      <Page.Main>
        <Routes>
          <Route path="/" element={<EC2Hosts />} />
          <Route path="/graphs" element={<GraphsCustom />} />
        </Routes>
      </Page.Main>
    </Page>
  );
};
