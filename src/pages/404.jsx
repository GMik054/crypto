import Head from 'next/head';
import React from 'react';
import Layout from "../../Components/Layout/Layout";
import {Backdrop, CircularProgress} from "@mui/material";
import Error404 from "../../Components/Error/Error";

import {useSelector} from "react-redux";
import {selectIsLoading} from "../features/Slices/LoginSlice";

const Error = () => {
    const isLoading = useSelector(selectIsLoading);
    return (
        < >
            <Head>
                <title>404</title>
                <link rel="icon" href="/favicon.ico"/>
            </Head>
            <Layout>
                <Error404/>
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

export default Error;
