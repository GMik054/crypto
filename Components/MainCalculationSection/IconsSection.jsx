import React from 'react';
import {Col, Container, Row} from "reactstrap";
import {useTranslation} from "next-i18next";

const IconsSection = ({top}) => {

    const {t} = useTranslation(); // Initialize the translation hook

    const info = t('info', {returnObjects: true});
    return (
        <Container>
            <Row className={`icons-info justify-content-center ${top ? "mt-0 pt-0 pb-0" : ""}`}>
                <Col lg="11">
                    <Row className="justify-content-center g-4">

                        {info.map((elem, i) => {
                            const descriptionWithLineBreaks = elem.title.replace(/\n/g, "<br />");
                            return (
                                <Col xl='3' sm='6' xs='6' key={i}>
                                    <div className='service-wrap'>
                                        <div className='service-icon'>
                                            <img src={elem.img}></img>
                                        </div>
                                        <div className='service-content'>
                                            <h4 className='mb-2 mt-2'
                                                dangerouslySetInnerHTML={{__html: descriptionWithLineBreaks}}/>
                                            <p className='font-light'>{elem.description}</p>
                                        </div>
                                    </div>
                                </Col>
                            );
                        })}
                    </Row>

                </Col>

            </Row>
        </Container>
    );
}
    ;

    export default IconsSection;