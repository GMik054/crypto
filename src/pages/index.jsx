import Head from 'next/head'
import Layout from '../../Components/Layout/Layout'
import MainCalculationSection from "../../Components/MainCalculationSection/MainCalculationSection";
import ExchangeSteps from "../../Components/ExchangeSteps/ExchangeSteps";
import HomeFaq from "../../Components/HomeFaq/HomeFaq";
import Partners from "../../Components/Partners/Partners";
import {APICallUrl} from "../../halpers/useWindowDimensions";
import {Backdrop, CircularProgress} from "@mui/material";
import {useSelector} from "react-redux";
import {selectIsLoading} from "../features/Slices/LoginSlice"
import {serverSideTranslations} from "next-i18next/serverSideTranslations";



export async function getServerSideProps({ locale }) {
    const rates = await fetch(`${APICallUrl}/api/v1/rates`);
    const currencies = await fetch(`${APICallUrl}/api/v1/currencies`);
    const data = {
        rates: await rates?.json(),
        currencies: await currencies?.json(),
        locale:locale
    }
    return {props: {data,...(await serverSideTranslations(locale, [
                'common',
                'footer',
            ])),  }}
}
// export async function getStaticProps({ locale }) {
//     return {
//         props: {
//             ...(await serverSideTranslations(locale, [
//                 'common',
//                 'footer',
//             ])),
//             // Will be passed to the page component as props
//         },
//     }
// }
export default function IndexPage({data}) {
    console.log(data,"DATA")
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

