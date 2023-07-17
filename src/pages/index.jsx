// import type {NextPage} from 'next'
import Head from 'next/head'

// import Counter from '../features/counter/Counter'
// import styles from '../styles/_home.scss';
import Layout from '../../Components/Layout/Layout'
import MainCalculationSection from "../../Components/MainCalculationSection/MainCalculationSection";
import ExchangeSteps from "../../Components/ExchangeSteps/ExchangeSteps";
import HomeFaq from "../../Components/HomeFaq/HomeFaq";
import Partners from "../../Components/Partners/Partners";
import {APICallUrl} from "../../halpers/useWindowDimensions";


export async function getStaticProps() {
    const rates = await fetch(`${APICallUrl}/api/v1/rates`);
    const currencies = await fetch(`${APICallUrl}/api/v1/currencies`);
    const data = {
        rates: await rates?.json(),
        currencies: await currencies?.json(),
    }
    return {props: {data}}
}
export default function IndexPage({data}) {
    console.log(data,"DATA")
    return (
        < >
            <Head>
                <title>Redux Toolkit</title>
                <link rel="icon" href="/favicon.ico"/>
            </Head>
            <Layout mainMenu={["1", '12']}>
                <MainCalculationSection currencies={data?.currencies} rates={data?.rates}/>
                <ExchangeSteps/>
                <HomeFaq/>
                <Partners/>
            </Layout>
        </>
    )
}

