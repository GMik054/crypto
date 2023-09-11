import Head from 'next/head'
import Layout from '../../Components/Layout/Layout'
import MainCalculationSection from "../../Components/MainCalculationSection/MainCalculationSection";
import ExchangeSteps from "../../Components/ExchangeSteps/ExchangeSteps";
import HomeFaq from "../../Components/HomeFaq/HomeFaq";
import Partners from "../../Components/Partners/Partners";
import {APICallUrl} from "../../halpers/useWindowDimensions";
import {Backdrop, CircularProgress} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import {selectIsLoading, selectLanguage} from "../features/Slices/LoginSlice"
import {serverSideTranslations} from "next-i18next/serverSideTranslations";
import {useEffect, useState} from "react";
import FadeInSection from "../../Components/FadeInSection";
import {useTranslation} from "next-i18next";


// export async function getServerSideProps({locale}) {
//     // const rates = await fetch(`${APICallUrl}/api/v1/rates`);
//     // const currencies = await fetch(`${APICallUrl}/api/v1/currencies`);
//     const sell = await fetch(`${APICallUrl}/api/v1/currencies?type=sell`);
//     const buy = await fetch(`${APICallUrl}/api/v1/currencies?type=buy`);
//     const settings = await fetch(`${APICallUrl}/api/v1/settings`);
//
//     const data = {
//         // rates: await rates?.json(),
//         // currencies: await currencies?.json(),
//         sell: await sell?.json(),
//         buy: await buy?.json(),
//         settings: await settings?.json(),
//         locale: locale
//     }
//     return {props: {locale, ...(await serverSideTranslations(locale, ['common', 'footer'])), data}}
// }

export async function getStaticProps({locale}) {
    return {props: {locale, ...(await serverSideTranslations(locale, ['common', 'footer']))}}
}


export default function IndexPage({data}) {

    const isLoading = useSelector(selectIsLoading);

    const [currencyArray1, setCurrencyArray1] = useState([]);
    const [currencyArray2, setCurrencyArray2] = useState([]);

    const [currency1, setCurrency1] = useState({});
    const [currency2, setCurrency2] = useState({});


    const [minValue1, setMinValue1] = useState(0);
    const [minValue2, setMinValue2] = useState(0);
    const [maxValue1, setMaxValue1] = useState(0);
    const [maxValue2, setMaxValue2] = useState(0);


    const [valueCurrency1, setValueCurrency1] = useState(0);
    const [valueCurrency2, setValueCurrency2] = useState(0);
    const [show, setShow] = useState(false);
    // const [show2, setShow2] = useState(false);

    useEffect(() => {
        setShow(true);
        const fetchData = async () => {
            try {
                const sellRes = await fetch(`${APICallUrl}/api/v1/currencies?type=sell`);
                const buyRes = await fetch(`${APICallUrl}/api/v1/currencies?type=buy`);

                const sell = await sellRes.json();
                const buy = await buyRes.json();

                if (buy?.data && sell?.data) {
                    setCurrency1(buy.data[0]);
                    setCurrency2(sell.data[0]);
                    setCurrencyArray1(buy.data);
                    setCurrencyArray2(sell.data);
                    const minMaxRes1 = await fetch(`${APICallUrl}/api/v1/get-exchange-limit?currency=${buy.data[0].code.toUpperCase()}&symbol=${sell.data[0].code.toUpperCase()}`, {
                        headers: {
                            "Content-Type": "application/json;charset=UTF-8",
                        },
                    });
                    const minMaxData1 = await minMaxRes1.json();

                    setMinValue1(minMaxData1?.min);
                    setValueCurrency1(minMaxData1?.min);
                    setMaxValue1(minMaxData1?.max);
                    const minMaxRes2 = await fetch(`${APICallUrl}/api/v1/get-exchange-limit?currency=${sell.data[0].code.toUpperCase()}&symbol=${buy.data[0].code.toUpperCase()}`, {
                        headers: {
                            "Content-Type": "application/json;charset=UTF-8",
                        },
                    });

                    const cur2Res = await fetch(`${APICallUrl}/api/v1/get-currency-exchange?symbol=${sell.data[0]?.code.toUpperCase()}&convert=${buy.data[0]?.code.toUpperCase()}&price=${minMaxData1?.min}&type=${buy.data[0]?.type}`)
                    const cur = await cur2Res.json();
                    const minMaxData2 = await minMaxRes2.json();
                    setMinValue2(cur?.cost);
                    setMaxValue2(minMaxData2?.max);
                    setValueCurrency2(cur?.cost);
                    setShow(false);
                }
            } catch (error) {
                console.error('Error fetching data:', error);
                setShow(false);
            }
        };

        fetchData();
    }, []);
    const {t} = useTranslation(); // Initialize the translation hook

    const faqs2 = t('faq2', {returnObjects: true});
    return (
        <>
            <Head>
                <title>Crypto Home</title>
                <link rel="icon" href="/favicon.png"/>
            </Head>

                <Layout>
                    <MainCalculationSection
                        // buy={data?.buy} sell={data?.sell} rates={data?.rates}
                        //                     settings={data?.settings}
                        currencyArray1={currencyArray1} setCurrencyArray1={setCurrencyArray1}
                        currencyArray2={currencyArray2} setCurrencyArray2={setCurrencyArray2}
                        currency1={currency1} setCurrency1={setCurrency1} currency2={currency2}
                        setCurrency2={setCurrency2} minValue1={minValue1} setMinValue1={setMinValue1}
                        minValue2={minValue2} setMinValue2={setMinValue2} maxValue1={maxValue1}
                        setMaxValue1={setMaxValue1} maxValue2={maxValue2} setMaxValue2={setMaxValue2}
                        valueCurrency1={valueCurrency1} setValueCurrency1={setValueCurrency1}
                        valueCurrency2={valueCurrency2} setValueCurrency2={setValueCurrency2}
                        show={show} setShow={setShow}

                    />
                    <ExchangeSteps/>

                    <HomeFaq faqs2={faqs2}/>
                    {/*<Partners/>*/}
                    {isLoading && (
                        <Backdrop sx={{
                            color: '#fff',
                            zIndex: (theme) => theme.zIndex.drawer + 1000,
                            backgroundColor: "rgba(255, 255, 255, 0.3)",
                        }} open>
                            <CircularProgress style={{color: '#E8BA4E'}}/>
                        </Backdrop>
                    )}
                </Layout>

        </>
    )
}

