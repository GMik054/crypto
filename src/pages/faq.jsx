import React from 'react';
import HomeFaq from "../../Components/HomeFaq/HomeFaq";
import Head from "next/head";
import Layout from "../../Components/Layout/Layout";
import {Backdrop, CircularProgress} from "@mui/material";
import {useSelector} from "react-redux";
import {selectIsLoading} from "../features/Slices/LoginSlice";

const Faq = () => {
    const isLoading = useSelector(selectIsLoading);
    let background = true
    return (
        < >
            <Head>
                <title>Faqs</title>
                <link rel="icon" href="/favicon.png"/>
            </Head>
            <Layout >
                <HomeFaq background={background}/>
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

export default Faq;