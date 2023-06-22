import React from 'react';
import {Col, Container, Row} from "reactstrap";
import Slider from "react-slick";

const Partners = () => {
    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 5,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 5000
    };
    return (
        <section className="partners-section">
            <Container>
                <Row className="g-5">
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