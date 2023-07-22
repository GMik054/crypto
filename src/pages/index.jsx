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
import setLanguage from "next-translate/setLanguage";
import {useEffect} from "react";


export async function getServerSideProps({ locale }) {
    try {
        const [ratesResponse, currenciesResponse] = await Promise.all([
            fetch(`${APICallUrl}/api/v1/rates`),
            fetch(`${APICallUrl}/api/v1/currencies`),
        ]);

        const rates = await ratesResponse.json();
        const currencies = await currenciesResponse.json();

        const data = {
            rates,
            currencies,
        };

        return {
            props: {
                ...await serverSideTranslations(locale, ['common']),
                data,
            },
        };
    } catch (error) {
        console.error('Error fetching data:', error);

        return {
            notFound: true, // or handle the error in an appropriate way for your application
        };
    }
}
// export async function getServerSideProps({locale}) {
//     const rates = await fetch(`${APICallUrl}/api/v1/rates`);
//     const currencies = await fetch(`${APICallUrl}/api/v1/currencies`);
//     const data = {
//         rates: await rates?.json(),
//         currencies: await currencies?.json(),
//         // locale: locale
//     }
//     return {
//         props: {data, ...(await serverSideTranslations(locale, ['common']))}
//     }
// }

export default function IndexPage({data}) {
    // console.log(data,"DATA")
    const isLoading = useSelector(selectIsLoading);

    return (
        <>
            <Head>
                <title>Crypto Home</title>
                <link rel="icon" href="/favicon.png"/>
            </Head>
            <Layout>
                <MainCalculationSection currencies={data?.currencies} rates={data?.rates}/>
                <ExchangeSteps/>
                <HomeFaq/>
                <Partners/>
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

