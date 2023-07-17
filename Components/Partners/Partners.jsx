import React from 'react';
import {Col, Container, Row} from "reactstrap";
import Slider from "react-slick";

const Partners = () => {
    const settings = {
        dots: false,
        infinite: true,
        arrows:true,
        speed: 500,
        slidesToShow: 5,
        slidesToScroll: 1,
        // autoplay: true,
        autoplaySpeed: 5000,

        responsive: [
            {
                breakpoint: 1200,
                settings: {
                    slidesToShow: 3,
                },
            },
            {
                breakpoint: 740,
                settings: {
                    slidesToShow: 2,
                },
            },
            {
                breakpoint: 585,
                settings: {
                    slidesToShow: 2,
                    arrows:false,
                },
            },
            {
                breakpoint: 420,
                settings: {
                    slidesToShow: 1,
                    arrows:false,
                },
            },
        ],
    };
    return (
        <section className="partners-section">
            <Container>
                <Row>
                    <Col lg="12">
                        <Row className="justify-content-md-center d-flex">
                            <Col lg="11">
                                <h3>Our <span>Partners</span></h3>
                            </Col></Row>
                        <Slider {...settings}>
                            <div className="slider-partners">
                                <img src="/assets/partners/bestchange.png"/>
                            </div>
                            <div className="slider-partners">
                                <img src="/assets/partners/cashback.png"/>

                            </div>
                            <div className="slider-partners">
                                <img src="/assets/partners/glazok.png"/>

                            </div>
                            <div className="slider-partners">
                                <img src="/assets/partners/wellcrypto.png"/>

                            </div>
                            <div className="slider-partners">
                                <img src="/assets/partners/sumo.png"/>
                            </div>
                        </Slider>
                    </Col>
                </Row>
            </Container>
        </section>
    );
};

export default Partners;