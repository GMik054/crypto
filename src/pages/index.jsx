// import type {NextPage} from 'next'
import Head from 'next/head'

// import Counter from '../features/counter/Counter'
// import styles from '../styles/home.scss';
import Layout from '../../Components/Layout/Layout'
import MainCalculationSection from "../../Components/MainCalculationSection/MainCalculationSection";
import ExchangeSteps from "../../Components/ExchangeSteps/ExchangeSteps";
import HomeFaq from "../../Components/HomeFaq/HomeFaq";
import Partners from "../../Components/Partners/Partners";

export default function IndexPage() {
    return (
        <div
        >
            <Head>
                <title>Redux Toolkit</title>
                <link rel="icon" href="/favicon.ico"/>
            </Head>
            <Layout mainMenu={["1", '12']}>
                <MainCalculationSection/>
                <ExchangeSteps/>
                <HomeFaq/>
                <Partners/>
            </Layout>
        </div>
    )
}

