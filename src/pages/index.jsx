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


export async function getStaticProps({locale}) {
    // const rates = await fetch(`${APICallUrl}/api/v1/rates`);
    // const currencies = await fetch(`${APICallUrl}/api/v1/currencies`);
    const sell = await fetch(`${APICallUrl}/api/v1/currencies?type=sell`);
    const buy = await fetch(`${APICallUrl}/api/v1/currencies?type=buy`);
    const settings = await fetch(`${APICallUrl}/api/v1/settings`);

    const data = {
        // rates: await rates?.json(),
        // currencies: await currencies?.json(),
        sell: await sell?.json(),
        buy: await buy?.json(),
        settings: await settings?.json(),
        locale: locale
    }
    return {props: {locale, ...(await serverSideTranslations(locale, ['common'])), data}}
}

// export async function getServerSideProps({locale}) {
//     return {props: {locale, ...(await serverSideTranslations(locale, ['common']))}}
// }

export default function IndexPage({data}) {
    console.log(data,"data")
    const isLoading = useSelector(selectIsLoading);

    return (
        <>
            <Head>
                <title>Crypto Home</title>
                <link rel="icon" href="/favicon.png"/>
            </Head>
            <Layout>
                <MainCalculationSection buy={data?.buy} sell={data?.sell} rates={data?.rates} settings={data?.settings}/>
                <ExchangeSteps/>
                <HomeFaq/>
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

