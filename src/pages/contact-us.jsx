import React from 'react';
import Head from "next/head";
import Layout from "../../Components/Layout/Layout";
import GallerySection from "../../Components/Gallery/GallerySection";
import Contact from "../../Components/Contact/Contact";

const ContactUs = () => {
    return (
        < >
            <Head>
                <title>Redux Toolkit</title>
                <link rel="icon" href="/favicon.ico"/>
            </Head>
            <Layout mainMenu={["1", '12']}>
                <Contact/>
            </Layout>
        </>
    );
};


export default ContactUs;