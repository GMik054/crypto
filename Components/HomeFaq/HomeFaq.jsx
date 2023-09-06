import React from 'react';
import {Accordion} from "react-bootstrap";
import {Col, Container, Row} from "reactstrap";
import {useTranslation} from "next-i18next";

const HomeFaq = ({background}) => {
    const { t } = useTranslation(); // Initialize the translation hook
    const faqs = t('faq', { returnObjects: true });

    return (
        <section className={`faq-section ${background ? "faq-single" : ""}`}>
            <Container>
                <Row className="justify-content-md-center d-flex">
                    <Col lg="11">
                        <h3>FAQ</h3>
                        <Accordion className="accordion-div">
                            {
                                faqs.map((el, i) => {
                                    return (
                                        <Accordion.Item key={i} eventKey={i} className="card card-div">
                                            <Accordion.Header><h5>{el.title}</h5></Accordion.Header>
                                            <Accordion.Body style={{paddingLeft:"0", paddingRight:"0"}}>
                                                <p className="text-accardion-part">{el.description}</p>
                                            </Accordion.Body>
                                        </Accordion.Item>
                                    )
                                })
                            }
                        </Accordion>
                    </Col>
                </Row>
            </Container>
        </section>
    );
};

export default HomeFaq;