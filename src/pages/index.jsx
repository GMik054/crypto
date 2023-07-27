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


export async function getServerSideProps({locale}) {
    // const rates = await fetch(`${APICallUrl}/api/v1/rates`);
    // const currencies = await fetch(`${APICallUrl}/api/v1/currencies`);
    const data = {
        // rates: await rates?.json(),
        // currencies: await currencies?.json(),
        // locale: locale
    }
    return {
        props: {
            locale, ...(await serverSideTranslations(locale,
                ['common'],)), data
        }
    }
}

// export async function getServerSideProps({locale}) {
//     return {props: {locale, ...(await serverSideTranslations(locale, ['common']))}}
// }

export default function IndexPage({data}) {
    // console.log(props,"props")
    const isLoading = useSelector(selectIsLoading);
    console.log("11")
    return (
        <>
            <Head>
                <title>Crypto Home</title>
                <link rel="icon" href="/favicon.png"/>
            </Head>
            <Layout>
                {/*<MainCalculationSection currencies={data?.currencies} rates={data?.rates}/>*/}
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

