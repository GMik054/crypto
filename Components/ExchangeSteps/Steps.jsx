import React from 'react';
import FadeInSection from "../FadeInSection";
import {Col, Row} from "reactstrap";
import {useTranslation} from "next-i18next";

const Steps = ({title,step1, step2, step3}) => {
    return (
        <>
            <FadeInSection>
                <Col lg='12'>
                    <Row>
                        <Col lg='2' md="3" xs="4">
                            <img style={{maxWidth: "100%"}} src="/assets/images/247.png"/>
                        </Col>
                        <Col lg='10' md='9' xs='8' className="d-flex align-items-center">
                            <div dangerouslySetInnerHTML={title}/>
                        </Col>
                    </Row>

                </Col>
            </FadeInSection>
            <FadeInSection>
                <Col lg='12'>
                    <Row className="g-4">
                        <Col lg='12'>

                            <div className="line-section">
                                <div className="dot"/>
                                <div className="long-line yellow"/>
                                <div className="dot"/>
                                <div className="long-line gray"/>
                                <div className="dot"/>
                                <div className="long-line gray"/>
                                <div className="dot"/>
                            </div>
                        </Col>
                        <Col lg='12'>
                            <div className="line-text-section">
                                <div className="line-text">
                                    <div className="dot">1</div>
                                    <p>{step1}</p>
                                </div>
                                <div className="line-text" style={{left: "-6px"}}>
                                    <div className="dot">2</div>
                                    <p>{step2}</p>
                                </div>
                                <div className="line-text" style={{left: "-8px"}}>
                                    <div className="dot">3</div>
                                    <p>{step3}</p>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </Col>
            </FadeInSection>
        </>
    );
};

export default Steps;