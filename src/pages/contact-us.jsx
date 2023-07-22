import React from 'react';
import Head from "next/head";
import Layout from "../../Components/Layout/Layout";
import Contact from "../../Components/Contact/Contact";
import {Backdrop, CircularProgress} from "@mui/material";
import {useSelector} from "react-redux";
import {selectIsLoading} from "../features/Slices/LoginSlice";
import {serverSideTranslations} from "next-i18next/serverSideTranslations";
export async function getStaticProps({locale}) {
    return {props: {locale, ...(await serverSideTranslations(locale, ['common']))}}
}
const ContactUs = () => {
    const isLoading = useSelector(selectIsLoading);

    return (
        <>
            <Head>
                <title>Contact Us</title>
                <link rel="icon" href="/favicon.png"/>
            </Head>
            <Layout>
                <Contact/>
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
    );
};


export default ContactUs;