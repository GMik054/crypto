import React from 'react';
import Head from "next/head";
import Layout from "../../Components/Layout/Layout";
import PartnersSinglePage from "../../Components/Partners/PartnersSinglePage";
import {Backdrop, CircularProgress} from "@mui/material";
import {useSelector} from "react-redux";
import {selectIsLoading} from "../features/Slices/LoginSlice";

const Partners = () => {
    const isLoading = useSelector(selectIsLoading);
    return (
        <>
            <Head>
                <title>Partners</title>
                <link rel="icon" href="/favicon.ico"/>
            </Head>
            <Layout >
                <PartnersSinglePage/>
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

export default Partners;