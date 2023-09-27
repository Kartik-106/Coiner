import React from "react";
import { Link } from "react-router-dom";
import './Listitems.css'
export const Listitems = (coin) => {
    return (
        <div className="Crypto-List">
            <Link to={`${coin.coin.id}`}>
                <span className="Crypto-image">
                    <img src={coin.coin.image} alt="css" />
                </span>
                <span className="Crypto-name">{coin.coin.name}</span>
                {coin.coin.PriceBtc && <span className="Crypto-prices">
                    <span className="Crypto-BTC">
                        <img src="./bitcoin.webp" alt="" />
                        {coin.coin.PriceBtc} BTC
                    </span>
                    <span className="Crypto-USD">({coin.coin.priceUSD} USD)</span>
                </span>}
            </Link>
            {console.log(coin)}
        </div>
    );
};
