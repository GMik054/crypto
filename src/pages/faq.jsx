import React from 'react';
import {Button, Col, Container, Form, Input, Label, Row} from "reactstrap";
import GoogleMapReact from "google-map-react";
import HomeFaq from "../../Components/HomeFaq/HomeFaq";
import Head from "next/head";
import Layout from "../../Components/Layout/Layout";
import GallerySection from "../../Components/Gallery/GallerySection";

const Faq = () => {

    let background = true
    return (
        < >
            <Head>
                <title>Redux Toolkit</title>
                <link rel="icon" href="/favicon.ico"/>
            </Head>
            <Layout mainMenu={["1", '12']}>
                <HomeFaq background={background}/>
            </Layout>
        </>


    );
};

export default Faq;