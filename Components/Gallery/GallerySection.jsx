import React from 'react';
import {Col, Container, Row} from "reactstrap";
import IconsSection from "../MainCalculationSection/IconsSection";

const GallerySection = () => {
    return (
        <>
            <section className="gallery-section">
                <Container>
                    <h3>Gallery</h3>
                    <Row style={{gap: "32px 0"}}>
                        <Col lg="7">
                            <div className="gallery-img">
                                <img src='/assets/gallery/1.png'/>
                            </div>
                        </Col>
                        <Col lg="5">
                            <div className="gallery-img">
                                <img src='/assets/gallery/2.png'/>
                            </div>
                        </Col>
                        <Col lg="5">
                            <div className="gallery-img">
                                <img src='/assets/gallery/3.png'/>
                            </div>
                        </Col>
                        <Col lg="7">
                            <div className="gallery-img">
                                <img src='/assets/gallery/4.png'/>
                            </div>
                        </Col>
                        <Col lg="12">
                            <div className="gallery-img">
                                <img src='/assets/gallery/5.png'/>
                            </div>
                        </Col>
                        <Col lg="7">
                            <div className="gallery-img">
                                <img src='/assets/gallery/6.png'/>
                            </div>
                        </Col>
                        <Col lg="5">
                            <div className="gallery-img">
                                <img src='/assets/gallery/3.png'/>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </section>
            <section className="icons-gallery">
                <IconsSection/>
            </section>
        </>

    );
};

export default GallerySection;