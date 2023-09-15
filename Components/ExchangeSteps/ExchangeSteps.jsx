import React, {useEffect, useState} from 'react';
import {Col, Container, Row} from "reactstrap";
import Slider from "react-slick";
import {useTranslation} from "next-i18next";
import FadeInSection from "../FadeInSection";
import Steps from "./Steps";
import {APICallUrl} from "../../halpers/useWindowDimensions";

const ExchangeSteps = () => {
    const {t} = useTranslation();
    const [coins, setCoins] = useState();

    const settings = {
        dots: false,
        infinite: true,
        arrows: true,
        speed: 500,
        slidesToShow: 5,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 5000,
        responsive: [
            {
                breakpoint: 1200,
                settings: {
                    slidesToShow: 4,
                },
            },
            {
                breakpoint: 740,
                settings: {
                    slidesToShow: 2,
                },
            },
            {
                breakpoint: 590,
                settings: {
                    slidesToShow: 2,
                    arrows: false,
                },
            },
            {
                breakpoint: 420,
                settings: {
                    slidesToShow: 1,
                    arrows: false,
                },
            },
        ],
    };

    useEffect(() => {
        fetch(`${APICallUrl}/api/v1/get-list`, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json;charset=UTF-8"
            },
        })
            .then((res) => res.json()).then((res) => {
            setCoins(res);
        })
            .catch((error) => {
                console.error('Failed to get Coins', error);
            });

    }, []);

    return (
        <section className="exchange-steps-section">

            <Container>

                <Row style={{gap: "20px"}}>
                    <Steps title={{__html: t('247')}} step1={t('step1')} step2={t('step2')} step3={t('step3')}/>
                    <FadeInSection>
                        <Col lg="12" style={{marginTop: "calc(70px + (220 - 120) * ((100vw - 320px) / (1920 - 320)))"}}>
                            <Row>
                                <Slider {...settings}>
                                    {
                                        coins?.map((el, i) => {

                                            return(
                                                <div className="slider-coins" key={i}>
                                                    <img src={el.image}/>
                                                    <h5>{el?.code}</h5>
                                                    <p>{el?.price?.toFixed(2)} USD</p>
                                                </div>
                                            )
                                        })
                                    }
                                </Slider>
                            </Row>
                        </Col>
                    </FadeInSection>
                    <FadeInSection>

                        <Col lg="12" style={{marginTop: "calc(70px + (220 - 120) * ((100vw - 320px) / (1920 - 320)))"}}
                             className="simply">
                            <Row className="justify-content-md-center d-flex">
                                <Col lg="11">
                                    {/*<h3>{t('welcome')}</h3>*/}
                                    {/*<h3><span>Lorem Ipsum</span> is simply</h3>*/}

                                    <div dangerouslySetInnerHTML={{__html: t('mainTextTitle')}}/>
                                    <p dangerouslySetInnerHTML={{__html: t('mainTextDescription').replace(/\n/g, "<br />")}} />
                                </Col>
                            </Row>

                        </Col>
                    </FadeInSection>

                </Row>
            </Container>

        </section>
    );
};

export default ExchangeSteps;