import React from 'react';
import Head from "next/head";
import Layout from "../../Components/Layout/Layout";
import MainCalculationSection from "../../Components/MainCalculationSection/MainCalculationSection";
import ExchangeSteps from "../../Components/ExchangeSteps/ExchangeSteps";
import HomeFaq from "../../Components/HomeFaq/HomeFaq";
import PartnersSinglePage from "../../Components/Partners/PartnersSinglePage";

const Partners = () => {
    return (
        < >
            <Head>
                <title>Redux Toolkit</title>
                <link rel="icon" href="/favicon.ico"/>
            </Head>
            <Layout mainMenu={["1", '12']}>
                <PartnersSinglePage/>
            </Layout>
        </>
    );
};

export default Partners;