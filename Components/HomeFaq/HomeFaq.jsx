import React from 'react';
import {Accordion} from "react-bootstrap";
import {Col, Container, Row} from "reactstrap";
import {useTranslation} from "next-i18next";
import FadeInSection from "../FadeInSection";

const HomeFaq = ({background}) => {
    const {t} = useTranslation(); // Initialize the translation hook
    const faqs = t('faq', {returnObjects: true});

    return (
        <section className={`faq-section ${background ? "faq-single" : ""}`}>
            <Container>
                <FadeInSection>
                    <Row className="justify-content-md-center d-flex">
                        <Col lg="11">
                            <h3>{t('faqTitle')}</h3>
                            <Accordion className="accordion-div">
                                {
                                    faqs.map((el, i) => {
                                        return (
                                            <Accordion.Item key={i} eventKey={i} className="card card-div">
                                                <Accordion.Header><h5>{el.title}</h5></Accordion.Header>
                                                <Accordion.Body style={{paddingLeft: "0", paddingRight: "0"}}>
                                                    <p className="text-accardion-part">{el.description}</p>
                                                </Accordion.Body>
                                            </Accordion.Item>
                                        )
                                    })
                                }
                            </Accordion>
                        </Col>
                    </Row>
                </FadeInSection>
            </Container>
        </section>
    );
};

export default HomeFaq;