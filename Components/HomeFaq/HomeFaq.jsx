import React from 'react';
import {Accordion} from "react-bootstrap";
import {Col, Container, Row} from "reactstrap";

const HomeFaq = ({background}) => {

    const info_2 = [
        {text: "How to make an exchange on your service?"},
        {text: "How long does the exchange take?"},
        {text: "How long to wait for Cashin replenishment?"},
        {text: "Why was my order rejected?"}
    ]

    return (
        <section className={`faq-section ${background ? "faq-single" : ""}`}>
            <Container>
                <Row className="justify-content-md-center d-flex">
                    <Col lg="11">
                        <h3>FAQ</h3>
                        <Accordion className="accordion-div">
                            {
                                info_2.map((el, i) => {
                                    return (
                                        <Accordion.Item key={i} eventKey={i} className="card card-div">
                                            <Accordion.Header><h5>{el.text}</h5></Accordion.Header>
                                            <Accordion.Body>
                                                {/*<p className="text-accardion-part">{decodeEntities(el.text3_eng)}</p>*/}
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