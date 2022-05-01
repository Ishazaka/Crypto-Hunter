import { CircularProgress, createTheme, ThemeProvider } from '@mui/material';

import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { HistoricalChart } from "../config/api";
import SelectButton from "./SelectButton";
import { chartDays } from "../config/data";
import { CryptoState } from "../CryptoContext";
import { Line } from 'react-chartjs-2';



// const CoinInfo = ({ coin }) => {
//     const [historicData, setHistoricData] = useState();
//     const [days, setDays] = useState(1);

//     const { currency } = CryptoState();
//     const [flag, setflag] = useState(false);


//     const fetchHistoricData = async () => {
//         const { data } = await axios.get(HistoricalChart(coin.id, days, currency));
//         setflag(true);
//         setHistoricData(data.prices);
//         // console.log(data.prices);
//     };

//     console.log("data is this", historicData);

//     useEffect(() => {
//         fetchHistoricData();
//         // eslint-disable-next-line react-hooks/exhaustive-deps
//     }, [days, currency]);


//     const darkTheme = createTheme({
//         palette: {
//             primary: {
//                 main: "#fff",
//             },
//             mode: 'dark',
//         },
//     });



//     return (
//         <ThemeProvider theme={darkTheme}>
//             <div className='container'>
//                 {!historicData | flag === false ? (
//                     <CircularProgress
//                         style={{ color: "gold" }}
//                         size={120}
//                         thickness={1}
//                     />
//                 ) : (
//                     <>




//                         <div div
//                             style={{
//                                 display: "flex",
//                                 marginTop: 20,
//                                 justifyContent: "space-around",
//                                 width: "100%",
//                             }}
//                         >
//                             {chartDays.map((day) => (
//                                 <SelectButton
//                                     key={day.value}
//                                     onClick={() => {
//                                         setDays(day.value);
//                                         setflag(false);
//                                     }}
//                                     selected={day.value === days}
//                                 >
//                                     {day.label}
//                                 </SelectButton>
//                             ))}
//                         </div>




//                     </>
//                 )







//                 }







//             </div>

//         </ThemeProvider >

//     )

// }


// export default CoinInfo;



const CoinInfo = ({ coin }) => {
    const [historicData, setHistoricData] = useState();
    const [days, setDays] = useState(1);
    const { currency } = CryptoState();
    const [flag, setflag] = useState(false);


    const infocontainer = {
        width: "70%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        marginTop: 25,
        padding: 40,
        // [theme.breakpoints.down("md")]: {
        //   width: "100%",
        //   marginTop: 0,
        //   padding: 20,
        //   paddingTop: 0,
        // },
    }


    const fetchHistoricData = async () => {
        const { data } = await axios.get(HistoricalChart(coin.id, days, currency));
        setflag(true);
        setHistoricData(data.prices);
    };

    console.log(coin);

    useEffect(() => {
        fetchHistoricData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [days]);



    const darkTheme = createTheme({
        palette: {
            primary: {
                main: "#fff",
            },
            mode: 'dark',
        },
    });



    return (
        <ThemeProvider theme={darkTheme}>
            <div style={infocontainer}>
                {!historicData | flag === false ? (
                    <CircularProgress
                        style={{ color: "gold" }}
                        size={120}
                        thickness={1}
                    />
                ) : (
                    <>
                        <Line
                            data={{
                                labels: historicData.map((coin) => {
                                    let date = new Date(coin[0]);
                                    let time =
                                        date.getHours() > 12
                                            ? `${date.getHours() - 12}:${date.getMinutes()} PM`
                                            : `${date.getHours()}:${date.getMinutes()} AM`;
                                    return days === 1 ? time : date.toLocaleDateString();
                                }),

                                datasets: [
                                    {
                                        data: historicData.map((coin) => coin[1]),
                                        label: `Price ( Past ${days} Days ) in ${currency}`,
                                        borderColor: "#EEBC1D",
                                    },
                                ],
                            }}
                            options={{
                                elements: {
                                    point: {
                                        radius: 1,
                                    },
                                },
                            }}
                        />
                        <div
                            style={{
                                display: "flex",
                                marginTop: 20,
                                justifyContent: "space-around",
                                width: "100%",
                            }}
                        >
                            {chartDays.map((day) => (
                                <SelectButton
                                    key={day.value}
                                    onClick={() => {
                                        setDays(day.value);
                                        setflag(false);
                                    }}
                                    selected={day.value === days}
                                >
                                    {day.label}
                                </SelectButton>
                            ))}
                        </div>
                    </>
                )
                }
            </div>
        </ThemeProvider>


    )
}

export default CoinInfo;