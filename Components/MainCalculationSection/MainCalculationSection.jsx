import React, {useState} from 'react';
import {Col, Container, Input, Row} from "reactstrap";
import Select from 'react-select';
import {FiSearch} from "@react-icons/all-files/fi/FiSearch";
import IconsSection from "./IconsSection";
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import {CloseIcon} from "next/dist/client/components/react-dev-overlay/internal/icons/CloseIcon";
import ModalExchange from "./ModalExchange";

const options = [
    {value: 'chocolate', label: 'Chocolate', photo: '/assets/CustomerService/Fast.svg'},
    {value: 'strawberry', label: 'Strawberry', photo: '/assets/CustomerService/Fast.svg'},
    {value: 'vanilla', label: 'Vanilla', photo: '/assets/CustomerService/Fast.svg'},
];


const MainCalculationSection = () => {
    const [m, setM] = useState(false);

    const customStyles = {

        indicatorsContainer: (provided) => ({
            ...provided,
            // display: "none"// Customize the color of the dropdown indicator
        }),
        dropdownIndicator: (provided) => ({
            ...provided,
            // display: 'none',
        }),
        clearIndicator: (provided) => ({
            ...provided,
            // display: 'none',
        }),
        container: (provided) => ({
            ...provided,
            // maxWidth: "380px",
            // width: "100%",
            // display:"flex",

        }),

        control: (provided, state) => ({
            ...provided,
            backgroundColor: state.isFocused ? "#282828" : "transparent",
            borderRadius: state.menuIsOpen ? '16px 16px 0 0' : '16px',
            border: "none",
            textAlign: 'left',
            padding: "0",
            boxShadow: state.isFocused ? 'none' : 'none',
            width: state.isFocused ? '454px' : '120px',
            // '&:select': {
            //     backgroundColor: "red"
            // },
        }),

        menu: (provided) => ({
            ...provided,
            backgroundColor: '#3F3F3F',
            borderRadius: '0 0 16px 16px',
            marginTop: '0px',
            transition: 'opacity 0.2s ease-in-out',
            overflow: "hidden"

        }),
        option: (provided, state) => ({
            ...provided,
            backgroundColor: state.isSelected ? '#4F4F4F' : '#3F3F3F',
            color: state.isSelected ? 'white' : 'white',
            // textAlign: 'left',
            // paddingLeft: "60px",
            // borderRadius: '16px',
            fontFamily: 'Montserrat',
            fontSize: "18px",
            letterSpacing: "0.18px",
            // paddingLeft:"30px",
            '&:hover': {
                backgroundColor: state.isSelected ? '#4F4F4F' : '#4F4F4F',
                color: state.isSelected ? 'white' : 'rgba(244, 244, 244, 0.8)',
                borderRadius: '0',
            },

        }),
        valueContainer: (provided, state) => ({
            ...provided,
            padding: m? "0 18px" : "0 "
            // alignItems:"start"
        }),
        placeholder: (provided, state) => ({
            ...provided,
            color: state.isSelected ? 'rgba(244, 244, 244, 0.8)' : 'rgba(244, 244, 244, 0.8)',

        }),
        input: (provided, state) => ({
            ...provided,
            color: 'white',
        }),
        singleValue: (provided, state) => ({
            ...provided,
            color: 'white',
            // paddingLeft: "56px",
        }),
    };
    let state = ["BTC", "YYUPS", "JPS"]


    const customOption = ({innerProps, label, data}) => (
        <div {...innerProps}>
            <img src={data.photo} alt={label} style={{marginRight: '8px', maxWidth: "40px"}}/>
            {label}
        </div>
    );

    const [selectedOption, setSelectedOption] = useState(options[0]);

    console.log(selectedOption, 'selectedOption')
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
                                            {!m && <input type='number' className='form-control form-control-custom'
                                                          placeholder='Send Qiwi(RUB)' name='billing-company'/>}
                                            <Select
                                                id={options.value} // Add a static id value here
                                                defaultValue={selectedOption}
                                                onChange={(selectedOption, dd) => {

                                                    setSelectedOption(selectedOption);
                                                    // setM(false);
                                                }}
                                                onFocus={() => setM(true)}
                                                onBlur={() => setM(false)} // Add onBlur event handler
                                                // components={{ Option: customOption }}
                                                options={options}
                                                formatOptionLabel={options => (
                                                    <div className="country-option"
                                                         style={{
                                                             display: "flex",
                                                             justifyContent: `${m ? "start" : "end"}`,
                                                             alignItems: "center",
                                                             minHeight: `${m ? "32px" : "46px"}`,
                                                             padding: `${m ? "8px 10px" : "0"}`
                                                         }}>
                                                        <img src={options.photo}
                                                             style={{
                                                                 maxWidth: `${m ? "32px" : "46px"}`,
                                                                 maxHeight: `${m ? "32px" : "46px"}`,
                                                                 // marginLeft: "10px",
                                                                 marginRight: `${m ? "10px" : "0"}`,
                                                                 // padding:`${m ?"0px 8px":"0"}`,
                                                                 position: "relative"
                                                             }}
                                                             alt="country-image"/>
                                                        <p>{m && options.label}</p>
                                                    </div>
                                                )}
                                                // placeholder={m ? <div style={{display: 'flex'}}><FiSearch/> Search
                                                // </div> : "Send Qiwi(RUB)"}
                                                menuIsOpen={m}
                                                styles={customStyles}
                                            />


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
                                            <input type='number' className='form-control form-control-custom'
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
                            <ModalExchange/>
                        </div>
                    </Col>
                    <Col lg='4'>
                        <div className="crypto-title-section">
                            <h2>Buy, Sell and Trade with <span>Crypto.am</span></h2>
                            <h5>The main value we have is our reputation and the trust of our customers, which is
                                confirmed by more than 2000 of positive reviews.</h5>
                        </div>
                    </Col>
                </Row>
            </Container>
            <IconsSection/>
        </section>
    );
};

export default MainCalculationSection;