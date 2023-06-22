import React, {useState} from 'react';
import {Col, Container, Row} from "reactstrap";
import Select from 'react-select';

const options = [
    {value: 'chocolate', label: 'Chocolate'},
    {value: 'strawberry', label: 'Strawberry'},
    {value: 'vanilla', label: 'Vanilla'},
];
const MainCalculationSection = () => {
    const customStyles = {

        indicatorsContainer: (provided) => ({
            ...provided,
            display: "none"// Customize the color of the dropdown indicator
        }),
        dropdownIndicator: (provided) => ({
            ...provided,
            display: 'none',
        }),
        clearIndicator: (provided) => ({
            ...provided,
            display: 'none',
        }),
        container: (provided) => ({
            ...provided,
            maxWidth: "380px",
            width: "100%"
        }),

        control: (provided, state) => ({
            ...provided,
            backgroundColor: state.isFocused ? "#282828" : "#282828",
            borderRadius: state.menuIsOpen ? '16px 16px 0 0' : '16px',
            border: "none",
            textAlign: 'left',
            padding: "calc(2px + 4 * (100vw - 320px) / 1600) calc(8px + 8 * (100vw - 320px) / 1600)",
            boxShadow: state.isFocused ? 'none' : 'none',
            '&:hover': {
                // borderColor: '#007bff',

            },
        }),
        menu: (provided) => ({
            ...provided,
            backgroundColor: '#3F3F3F',
            borderRadius: '0 0 16px 16px',
            marginTop: '0px',
            transition: 'opacity 0.2s ease-in-out',

        }),
        option: (provided, state) => ({
            ...provided,
            backgroundColor: state.isSelected ? '#4F4F4F' : '#3F3F3F',
            color: state.isSelected ? 'white' : 'white',
            textAlign: 'left',
            borderRadius: '16px',
            '&:hover': {
                backgroundColor: state.isSelected ? '#4F4F4F' : '#4F4F4F',
                color: state.isSelected ? 'white' : 'gray',
            },
        }),
        placeholder: (provided, state) => ({
            ...provided,
            color: state.isSelected ? 'white' : 'white',
        }),
        input: (provided, state) => ({
            ...provided,
            color: 'white',
        }),
        singleValue: (provided, state) => ({
            ...provided,
            color: 'white',
        }),
    };
    let state = ["BTC", "YYUPS", "JPS"]
    const customerService = [
        {
            id: 1,
            svg: <img src='/assets/CustomerService/Fast.svg' style={{marginRight: "14px"}}></img>,
            title: 'We are Fast',
            subtitle: 'It will take you less than 5 min to use our services.'
        },
        {
            id: 2,
            svg: <img src='/assets/CustomerService/Trusted.svg' style={{marginRight: "14px"}}></img>,
            title: 'We are Trusted',
            subtitle: 'We have been providing high-quality cryptocurrency exchange services for over 2 years.'
        },
        {
            id: 3,
            svg: <img src='/assets/CustomerService/Rates.svg' style={{marginRight: "14px"}}></img>,
            title: 'Best Rates',
            subtitle: 'We guarantee to offer best price in the international market along with superior customer services.'
        },
        {
            id: 4,
            svg: <img src='/assets/CustomerService/Global.svg' style={{marginRight: "14px"}}></img>,
            title: 'We are Global',
            subtitle: 'We provide cryptocurrency exchange services worldwide.'
        },
    ]

    const [selectedOption, setSelectedOption] = useState(null);
    const [m, setM] = useState(false);
    console.log(m,"mmmmmmm")
    return (
        <section className="calculation-section">
            <Container>
                <Row className="justify-content-md-center">
                    <Col lg='6'>
                        <div className="calculation-banner">
                            <img src="/assets/images/Vector.svg"/>
                            <div className="buttons">
                                <div className="custom-button">
                                    <div className="button-area left-button-area">
                                        <p className="text">TRADE</p>
                                    </div>
                                </div>
                                <div className="custom-button center-div">
                                    <div className="button-area">
                                        <p className="text">BUY</p>
                                    </div>
                                </div>
                                <div className="custom-button">
                                    <div className="button-area right-button-area">
                                        <p className="text">SELL</p>
                                    </div>
                                </div>

                            </div>
                            <Row className="custom-row-form">
                                <Col lg="12">
                                    <div className="form-section">
                                        <label className='form-label'>
                                            Min 5000 RUB
                                        </label>
                                        <div className='form-main'>
                                            <Select
                                                id={options.value} // Add a static id value here

                                                defaultValue={selectedOption}
                                                onChange={setSelectedOption}
                                                // openMenuOnClick={e => setM(e)}
                                                options={options}
                                                placeholder={'Search'}
                                                styles={customStyles}
                                            />
                                            {/*<input type='text' className='form-control form-control-custom'*/}
                                            {/*       placeholder='Send Qiwi(RUB)' name='billing-company'/>*/}

                                            {/*<select*/}
                                            {/*    className='form-select checkout-form'*/}
                                            {/*    // value={citi?.abbreviation}*/}
                                            {/*    // onChange={handleSelectChange}*/}
                                            {/*>*/}
                                            {/*    {state?.map((elem, i) => (*/}
                                            {/*        <option key={i} value={elem}>*/}
                                            {/*            {elem}*/}
                                            {/*        </option>*/}
                                            {/*    ))}*/}
                                            {/*</select>*/}
                                        </div>

                                    </div>
                                </Col>
                                <Col lg="12">
                                    <div className="form-section">
                                        <label className='form-label'>
                                            Min 0.0021547430 BTC
                                        </label>
                                        <div className='form-main'>
                                            <input type='text' className='form-control form-control-custom'
                                                   placeholder='Receive Bitcoin(BTC)' name='billing-company'/>

                                            {/*<select*/}
                                            {/*    className='form-select checkout-form'*/}
                                            {/*    // value={citi?.abbreviation}*/}
                                            {/*    // onChange={handleSelectChange}*/}
                                            {/*>*/}
                                            {/*    {state?.map((elem, i) => (*/}
                                            {/*        <option key={i} value={elem}>*/}
                                            {/*            {elem}*/}
                                            {/*        </option>*/}
                                            {/*    ))}*/}
                                            {/*</select>*/}
                                        </div>
                                    </div>
                                </Col>
                            </Row>

                            <div className="custom-single-button">
                                <div className="button-area">
                                    <h5 className="text">EXCHANGE</h5>
                                </div>
                            </div>

                        </div>

                    </Col>
                    <Col lg='5'>
                        <div className="crypto-title-section">
                            <h2>Buy, Sell and Trade with <span>Crypto.am</span></h2>
                            <h5>The main value we have is our reputation and the trust of our customers, which is
                                confirmed by more than 2000 of positive reviews.</h5>
                        </div>
                    </Col>
                </Row>
            </Container>
            <Container>
                <Row className="icons-info">
                    {customerService.map((elem) => {
                        return (
                            <Col xl='3' sm='6' key={elem.id}>
                                <div className='service-wrap'>
                                    <div className='service-icon'>{elem.svg}</div>
                                    <div className='service-content'>
                                        <h4 className='mb-2 mt-2'>{elem.title}</h4>
                                        <p className='font-light'>{elem.subtitle}</p>
                                    </div>
                                </div>
                            </Col>
                        );
                    })}
                </Row>
            </Container>
        </section>
    );
};

export default MainCalculationSection;