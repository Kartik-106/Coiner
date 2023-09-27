import React from "react";
import HomeStore from "../../stores/HomeStore";
import { Link } from "react-router-dom";
import { Header } from "../../components/Header/Header";
import "./Home.css";
import { Listitems } from "../../components/Listitems/Listitems";
export const Home = () => {
    const Store = HomeStore();

    React.useEffect(() => {
        if(Store.trending.length===0)Store.fetchCoin();
    }, []);
    return (
        <div>
            <Header />
            <header className="Home-search">
                <div className="Width">
                    <h2>Search for a coin</h2>
                    <input type="text" value={Store.query} onChange={Store.setQuery} />
                </div>
            </header>
            <div className="Home-crypto">
                <div className="Width">
                    <h2>{Store.search ? "Search results" : "Trending coins"}</h2>
                    <div className="Home-Crypto-List">
                        {Store.coins.map((coin) => {
                            return <Listitems key={coin.id} coin={coin} />;
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
};
