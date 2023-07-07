import React from 'react';
import {Button, Col, Container, Form, Input, Label, Row} from "reactstrap";
import IconsSection from "../MainCalculationSection/IconsSection";
import GoogleMapReact from 'google-map-react';
const AnyReactComponent = ({ text }) => <div>{text}</div>;

const Contact = () => {
    const defaultProps = {
        center: {
            lat: 40.189513,
            lng: 44.522273
        },
        zoom: 18
    };
    return (
        <section className="contact-us-section">
            <Container>
                <Row className="justify-content-center">
                    <Col lg="7">
                        <h3>Contact Us</h3>
                        <h4 style={{paddingBottom:"16px"}}>105/1 Teryan street, 0005, Yerevan, Armenia
                            (Citadel Business Center)</h4>
                        <h4><a href="mailto:info@crypto.am">info@crypto.am</a> | <a
                            href={`tel:+374 77 12 22 23`}>+374 77 122223</a></h4>
                    </Col>
                    <Col lg="8">
                        <Form className="contact-form">
                            <Row className="gap-5">
                                <Col lg="12" className="contact-col">
                                    <Label><p>Name</p></Label>
                                    <Input type="text"/>
                                </Col>
                                <Col lg="12" className="contact-col">
                                    <Label><p>Email</p></Label>
                                    <Input type="email"/>
                                </Col>
                                <Col lg="12" className="contact-col">
                                    <Label><p>Message</p></Label>
                                    <Input type="text"/>
                                </Col>
                                <div className="contact-button">
                                    <Button >SEND</Button>
                                </div>
                            </Row>

                        </Form>

                    </Col>
                </Row>
            </Container>
            <div style={{ height: '60vh', width: '100%' }}>
                <GoogleMapReact
                    bootstrapURLKeys={{ key: "" }}
                    defaultCenter={defaultProps.center}
                    defaultZoom={defaultProps.zoom}
                >
                    <AnyReactComponent
                        lat={59.955413}
                        lng={30.337844}
                        text="My Marker"
                    />
                </GoogleMapReact>
            </div>
        </section>

    );
};

export default Contact;