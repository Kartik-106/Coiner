import React, { useEffect } from "react";
import ShowStore from "../../stores/ShowStore";
import { useParams } from "react-router-dom";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Header } from "../../components/Header/Header";
import "./Show.css";
const data = [
  {
    name: "Page A",
    uv: 4000,
    pv: 2400,
    amt: 2400,
  },
];

export const Show = () => {
  const Store = ShowStore();
  const Params = useParams();
  React.useEffect(() => {
    Store.fetchData(Params.id);
    return () => {
      Store.reset()
    }
  }, []);
  return (
    <div>
      <Header back />
      {Store.dataRes && <>
        <header className="Show-Header">
          <img src={Store.dataRes.data.image.large} />
          <h2>
            {Store.dataRes.data.name} ({Store.dataRes.data.symbol})
          </h2>
        </header>
        <div className="Width">
          <div className="Show-Graph">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={Store.graphData}
                margin={{
                  top: 10,
                  right: 30,
                  left: 0,
                  bottom: 0,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="Date" />
                <YAxis />
                <Tooltip />
                <Area
                  type="monotone"
                  dataKey="prices"
                  stroke="#8884d8"
                  fill="#8884d8"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="Width Crypto-Detail">
          <h2>Details</h2>
          <div className="Show-Detail-Row">
            <h3>Market Cap rank</h3>
            <span>{Store.dataRes.data.market_cap_rank}</span>
          </div>
          <div className="Show-Detail-Row">
            <h3>24hr High</h3>
            <span>${Store.dataRes.data.market_data.high_24h.usd}</span>
          </div>
          <div className="Show-Detail-Row">
            <h3>24hr Low</h3>
            <span>${Store.dataRes.data.market_data.low_24h.usd}</span>
          </div>
          <div className="Show-Detail-Row">
            <h3>Circulating Supply</h3>
            <span>{Store.dataRes.data.market_data.circulating_supply}</span>
          </div>
          <div className="Show-Detail-Row">
            <h3>Current Price</h3>
            <span>${Store.dataRes.data.market_data.current_price.usd}</span>
          </div>
        </div>
      </>}
    </div>
  );
};
