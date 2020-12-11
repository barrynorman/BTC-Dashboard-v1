import { useEffect, useState, useContext } from "react";
import styled from "styled-components";

import { WidthProvider, Responsive } from "react-grid-layout";
import "./Grid-styles/grid-layout-styles.css";
import "./Grid-styles/resizable-styles.css";
import "./Grid-styles/draggable-item-styles.css";

import { DashboardContext } from "../context/DashboardContext";

import DashboardHeader from "../components/Dashboard/DashboardHeader";
import TwitterWidget from "../components/Dashboard/TwitterWidget";
import FearAndGreedIndex from "../components/Dashboard/FearAndGreedIndex";
import FinHubNewsWidget from "../components/Dashboard/FinHubNewsWidget";
import TickerCard from "../components/Dashboard/TickerCard";
import CoinMarketWidget from "../components/Dashboard/CoinMarketWidget";

import usePhemexTicker from "../hooks/Ticker/usePhemexTicker";
import useBybitTicker from "../hooks/Ticker/useBybitTicker";
import useBinanceTicker from "../hooks/Ticker/useBinanceTicker";
import useBitmexTicker from "../hooks/Ticker/useBitmexTicker";
import TradingViewChart from "../components/Dashboard/TradingViewChart";

const ResponsiveGridLayout = WidthProvider(Responsive);

const layoutLG = [
  { i: "header", x: 0, y: 0, w: 16, h: 1, minH: 1, static: true },
  { i: "21", x: 0, y: 0, w: 4, h: 1, minW: 3, maxW: 4, maxH: 1 },
  { i: "22", x: 0, y: 0, w: 4, h: 1, minW: 3, maxW: 4, maxH: 1 },
  { i: "23", x: 0, y: 0, w: 4, h: 1, minW: 3, maxW: 4, maxH: 1 },
  { i: "24", x: 0, y: 0, w: 4, h: 1, minW: 3, maxW: 4, maxH: 1 },
  { i: "NewsFeed", x: 4, y: 0, w: 6, h: 3, minH: 1 },
  { i: "twitter", x: 10, y: 0, w: 4, h: 3, minH: 1 },
  { i: "feargreed", x: 4, y: 1, w: 3, h: 1, minH: 1, minW: 3 },
  { i: "coinMarket", x: 7, y: 1, w: 6, h: 2, minH: 2, minW: 4 },
  { i: "tradingView", x: 0, y: 10, w: 7, h: 4, minH: 4, minW: 4 },
];

const layoutMD = [
  { i: "header", x: 0, y: 0, w: 16, h: 1, minH: 1, static: true },
  { i: "21", x: 0, y: 0, w: 2, h: 1, minW: 4, maxW: 4, maxH: 1 },
  { i: "22", x: 2, y: 0, w: 2, h: 1, minW: 4, maxW: 4, maxH: 1 },
  { i: "23", x: 4, y: 0, w: 2, h: 1, minW: 4, maxW: 4, maxH: 1 },
  { i: "24", x: 6, y: 0, w: 2, h: 1, minW: 4, maxW: 4, maxH: 1 },
  { i: "NewsFeed", x: 0, y: 0, w: 4, h: 3, minH: 1 },
  { i: "twitter", x: 0, y: 0, w: 2, h: 3, minH: 1 },
  { i: "feargreed", x: 4, y: 0, w: 2, h: 1, minH: 1, minW: 3 },
  { i: "coinMarket", x: 7, y: 1, w: 4, h: 2, minH: 2, minW: 6 },
  { i: "tradingView", x: 0, y: 0, w: 14, h: 4, minH: 6, minW: 6 },
];

const layoutXS = [
  { i: "header", x: 0, y: 0, w: 16, h: 1, minH: 1, static: true },
  { i: "21", x: 0, y: 0, w: 1, h: 1, minW: 1, maxW: 1, maxH: 1 },
  { i: "22", x: 2, y: 0, w: 1, h: 1, minW: 1, maxW: 1, maxH: 1 },
  { i: "23", x: 0, y: 0, w: 1, h: 1, minW: 1, maxW: 1, maxH: 1 },
  { i: "24", x: 2, y: 0, w: 1, h: 1, minW: 1, maxW: 1, maxH: 1 },
  { i: "NewsFeed", x: 0, y: 0, w: 2, h: 3, minH: 1 },
  { i: "twitter", x: 0, y: 0, w: 2, h: 3, minH: 1 },
  { i: "feargreed", x: 0, y: 0, w: 1, h: 1, minH: 1, minW: 2 },
  { i: "coinMarket", x: 0, y: 0, w: 2, h: 2, minH: 6, minW: 6 },
  { i: "tradingView", x: 0, y: 0, w: 14, h: 4, minH: 6, minW: 6 },
];

const LOCAL_STORAGE_LAYOUT_KEY = "layouts";
const defaultLayout = {lg: layoutLG, md: layoutMD, xs: layoutXS };
const gridLayout = JSON.parse(localStorage.getItem(LOCAL_STORAGE_LAYOUT_KEY)) || defaultLayout;

const Dashboardpage = () => {
  const { direction } = useContext(DashboardContext);

  const [
    phemexTickerLastPrice,
    phemexTickerData,
    connStatus,
  ] = usePhemexTicker();
  const [
    bybitTickerData,
    bybitTickerLastPrice,
    bybitConnStatus,
  ] = useBybitTicker();
  const [binanceTickerData, binanceConnStatus] = useBinanceTicker();
  const [
    bitmexTickerLastPrice,
    bitmexTickerData,
    bitmexConnStatus,
  ] = useBitmexTicker();
  const [averagePrice, setAveragePrice] = useState();

  const [layoutState, setLayoutState] = useState(gridLayout);

  useEffect(() => {
    setAveragePrice(
      (
        (bitmexTickerLastPrice?.last +
          parseFloat(binanceTickerData?.last) +
          phemexTickerLastPrice?.last / 10000 +
          bybitTickerLastPrice?.last / 10000) /
        4
      ).toFixed(2)
    );
  }, [phemexTickerData, bybitTickerData, binanceTickerData, bitmexTickerData]);

  const onLayoutChange = (currentLayout, allLayouts) => {
    localStorage.setItem(LOCAL_STORAGE_LAYOUT_KEY, JSON.stringify(allLayouts));
    setLayoutState(allLayouts);
  };

  const deleteLayoutFromLocalStorage = () => {
    localStorage.setItem(LOCAL_STORAGE_LAYOUT_KEY, JSON.stringify(defaultLayout));
    window.location.reload();
  }

  const onBreakpointChange = (breakpoint) => {
    layoutState.currentBreakpoint = breakpoint;
    setLayoutState(layoutState);
  };

  return (
    <>
      <DashboardWrapper direction={direction}>
      <button onClick={() => deleteLayoutFromLocalStorage()}>Reset Layout</button>
        <DashboardHeader averagePrice={averagePrice} />

        <ResponsiveGridLayout
          rowHeight={148}
          breakpoints={{ lg: 1000, md: 700, xs: 699 }}
          cols={{ lg: 14, md: 6, xs: 2 }}
          //autoSize={true}
          layouts={layoutState}
          onLayoutChange={(layout, layouts) => onLayoutChange(layout, layouts)}
          onBreakpointChange={onBreakpointChange}
          draggableHandle=".MyDragHandleClassName"
          draggableCancel=".MyDragCancel"
          isDraggable={true}
          isResizable={true}
        >
          {/* -- TICKER START ------------------------ */}
          <div className="item widget--base" key={21}>
            <div className="MyDragHandleClassName">
              <TickerCard
                name="BITMEX"
                last={bitmexTickerLastPrice?.last}
                vol={parseFloat(bitmexTickerData?.vol)}
                high={parseFloat(bitmexTickerData?.high).toFixed(2)}
                low={parseFloat(bitmexTickerData?.low).toFixed(2)}
                status={bitmexConnStatus}
              />
            </div>
          </div>

          <div className="item widget--base" key={22}>
            <div className="MyDragHandleClassName">
              <TickerCard
                name="BINANCE"
                last={parseFloat(binanceTickerData?.last)}
                vol={parseFloat(binanceTickerData?.vol).toFixed(2)}
                high={parseFloat(binanceTickerData?.high).toFixed(2)}
                low={parseFloat(binanceTickerData?.low).toFixed(2)}
                status={binanceConnStatus}
              />
            </div>
          </div>

          <div className="item widget--base" key={23}>
            <div className="MyDragHandleClassName">
              <TickerCard
                name="PHEMEX"
                last={(phemexTickerLastPrice?.last / 10000).toFixed(2)}
                vol={phemexTickerData?.vol / 10000}
                high={phemexTickerData?.high / 10000}
                low={phemexTickerData?.low / 10000}
                status={connStatus}
              />
            </div>
          </div>

          <div className="item widget--base" key={24}>
            <div className="MyDragHandleClassName">
              <TickerCard
                name="BYBIT"
                last={(bybitTickerLastPrice?.last / 10000).toFixed(2)}
                vol={bybitTickerData?.vol / 10000}
                high={bybitTickerData?.high / 10000}
                low={bybitTickerData?.low / 10000}
                status={bybitConnStatus}
              />
            </div>
          </div>

          {/* -- TICKER END ------------------------ */}
          <div className="item widget--base" key={"NewsFeed"}>
            <div className="MyDragHandleClassName">
              <h6 className="text-center p-1 m-0 secondary">
                Finhub Crypto News
              </h6>
            </div>
            <FinHubNewsWidget />
          </div>
          <div className="item widget--base" key={"twitter"}>
            <div className="MyDragHandleClassName">
              <h6 className="text-center p-1 m-0 secondary">Twitter</h6>{" "}
            </div>
            <TwitterWidget />
          </div>
          <div className="item widget--base" key={"feargreed"}>
            <div className="MyDragHandleClassName">
              <h6 className="text-center p-1 m-0 secondary">Fear and Greed</h6>
            </div>
            <FearAndGreedIndex />
          </div>
          <div className="item widget--base" key={"coinMarket"}>
            <div className="MyDragHandleClassName">
              <h6 className="text-center p-1 m-0 secondary">Coin Market Cap</h6>
            </div>
            <CoinMarketWidget />
          </div>

          <div className="item widget--base" key={"tradingView"}>
            <div className="MyDragHandleClassName">
              <h6 className="text-center p-1 m-0 secondary">
                TradingView Chart
              </h6>
            </div>
            <TradingViewChart dashboard={true} />
          </div>
        </ResponsiveGridLayout>
      </DashboardWrapper>
    </>
  );
};

const DashboardWrapper = styled.div`
  padding-right: 20px;
  background-image: linear-gradient(
    to bottom,
    ${(props) =>
      props.direction === "up"
        ? "rgba(93, 211, 158, 0.2)"
        : "rgba(205, 9, 11, 0.4)"},
    transparent
  );
`;

export default Dashboardpage;
