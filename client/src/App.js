import "./App.scss";
import { Switch, Route } from "react-router-dom";

import Dashboardpage from "./pages/DashboardPage";
import MarketCapPage from "./pages/MarketCapPage";
import Homepage from "./pages/HomePage";
import Layout from "./components/Layout";
import Playground from "./components/playground";
import TradingViewPage from "./pages/TradingViewPage";
import LoginPage from "./pages/LoginPage";

function App() {
  return (
    <Layout>
      <Switch>
        <Route path="/" exact component={Homepage} />
        <Route path="/Login" exact component={LoginPage} />
        <Route path="/Dashboard" exact component={Dashboardpage} />
        <Route path="/MarketCap" exact component={MarketCapPage} />
        <Route path="/TradingView" exact component={TradingViewPage} />
        <Route path="/Playground" exact component={Playground} />
      </Switch>
    </Layout>
  );
}

export default App;
