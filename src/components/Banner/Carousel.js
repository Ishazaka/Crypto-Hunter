import axios from 'axios';
import React, { useEffect, useState } from 'react';
import AliceCarousel from 'react-alice-carousel';
import { Link } from 'react-router-dom';
import { TrendingCoins } from '../../config/api';
import { CryptoState } from "../../CryptoContext"


export function numberWithCommos(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

const carouselItem = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    cursor: "pointer",
    textTransfprm: "uppercase",
    color: "white",

}


const Carousel = () => {
    const [trending, setTrending] = useState([]);

    const { currency, symbol } = CryptoState();

    const fetchTrendingCoins = async () => {
        const { data } = await axios.get(TrendingCoins(currency));

        setTrending(data);
    };

    console.log(trending);

    useEffect(() => {
        fetchTrendingCoins();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currency])


    const items = trending.map((coin) => {
        let profit = coin?.price_change_percentage_24h >= 0;

        const profitItem = {
            color: profit > 0 ? "rgb(14, 203, 129)" : "red",
            fontWeight: 500,
        }

        return (
            <Link style={carouselItem} to={`/coins/${coin.id}`} >
                <img src={coin?.image} alt={coin.name} height="80" style={{ marginBottom: 10 }} />
                <span>{coin?.symbol}
                    &nbsp;
                    <span
                        style={profitItem}>
                        {profit && "+"} {coin?.price_change_percentage_24h?.toFixed(2)}%
                    </span>
                </span>
                <span style={{ fontSize: 18, fontWeight: 500 }}>
                    {symbol} {numberWithCommos(coin?.current_price.toFixed(2))}
                </span>

            </Link>
        )
    })


    const responsive = {
        0: {
            items: 2,
        },
        512: {
            items: 4,
        },
    };

    return <div style={{
        height: "50%",
        marginTop: 100,
        display: "flex",
        alignItems: "center",
    }} >
        <AliceCarousel
            mouseTracking
            infinite
            autoPlayInterval={1000}
            animationDuration={1500}
            disableDotsControls
            disableButtonsControls
            responsive={responsive}
            autoPlay
            items={items}
        />
    </div >;
}

export default Carousel