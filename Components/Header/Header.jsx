import React, {useState} from 'react';
import {Col, Container, Row} from "reactstrap";
import Select from "react-select";
import {FiSearch} from "@react-icons/all-files/fi/FiSearch";
import Button from "@mui/material/Button";
import Link from "next/link";

const options = [
    {value: 'eng', label: 'Eng', photo: '/assets/images/eng.png'},
    {value: 'arm', label: 'Arm', photo: '/assets/CustomerService/Fast.svg'},
    {value: 'rus', label: 'Rus', photo: '/assets/CustomerService/Fast.svg'},
];
const Header = () => {
    const [selectedOption, setSelectedOption] = useState(options[0]);
    const [m, setM] = useState(false);
    const customStyles = {
        indicatorsContainer: (provided) => ({
            ...provided,
            // display: "none"// Customize the color of the dropdown indicator
        }),
        dropdownIndicator: (provided) => ({
            ...provided,

        }),
        valueContainer: (provided) => ({
            ...provided,
            // display: 'none',
            // maxWidth:"56px"
            minHeight: "36px"
        }),
        clearIndicator: (provided) => ({
            ...provided,
            // display: 'none',
        }),
        container: (provided) => ({
            ...provided,
            maxWidth: "120px",
            width: "100%"
        }),

        control: (provided, state) => ({
            ...provided,
            backgroundColor: state.isFocused ? "transparent" : "transparent",
            borderRadius: state.menuIsOpen ? '16px 16px 0 0' : '16px',
            border: "none",
            textAlign: 'left',
            justifyContent: "center",
            // justifyContent: 'end',
            padding: "calc(2px + 4 * (100vw - 320px) / 1600) calc(8px + 8 * (100vw - 320px) / 1600)",
            boxShadow: state.isFocused ? 'none' : 'none',
            '&:hover': {},
        }),
        menu: (provided) => ({
            ...provided,
            backgroundColor: 'white',
        }),
        option: (provided, state) => ({
            ...provided,
            backgroundColor: 'white',
            // textAlign: 'left',
            // paddingLeft: "60px",

            borderRadius: '16px',
            fontFamily: 'Montserrat',
            fontSize: "18px",
            letterSpacing: "0.18px",
            // paddingLeft:"30px",
            '&:hover': {
                backgroundColor: state.isSelected ? 'lightgray' : 'darkgray',

            },

        }),
        optionLabel: {
            display: "flex",
            justifyContent: "flex-start",
            alignItems: "center"
        },
        optionLabelImg: {
            // maxWidth: "36px",
            maxHeight: "36px"
        },
        optionLabelP: {
            color: 'black',
            marginLeft: '10px',
        },
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

        }),
    };
    return (
        <header>
            <Container>
                <Row className="justify-content-center" style={{padding: "18px 0"}}>
                    <Col lg="11">
                        <Row className="header-row">
                            <Col lg="2">
                                <Link href={`/`}>
                                <img src="/assets/images/logoHeader.png"/>
                                </Link>
                            </Col>
                            <Col lg="5">
                                <div className="header-menu">
                                    <Link href={`/`}>
                                        <p>Home</p>
                                    </Link>
                                    <Link href={`/partners`}>
                                        <p>Partners</p>
                                    </Link>
                                    <Link href={`/faq`}>
                                        <p>FAQ</p>
                                    </Link>
                                    <Link href={`/gallery`}>
                                        <p>Gallery</p>
                                    </Link>
                                    <Link href={`/`}>
                                        <p>Rules</p>
                                    </Link>
                                    <Link href={`/contact-us`}>
                                        <p>Contacts</p>
                                    </Link>
                                </div>
                            </Col>
                            <Col lg="5">
                                <Row>
                                    <Col lg="6">
                                        <div className="language-section">
                                            <Select
                                                id={options.value} // Add a static id value here
                                                defaultValue={selectedOption}
                                                onChange={setSelectedOption}
                                                options={options}
                                                formatOptionLabel={options => (
                                                    <div className="country-option" style={customStyles.optionLabel}>
                                                        <img src={options.photo} style={customStyles.optionLabelImg}
                                                             alt="country-image"/>
                                                        <p style={customStyles.optionLabelP}
                                                        >{options.label}</p>
                                                    </div>
                                                )}
                                                styles={customStyles}
                                            />
                                        </div>
                                    </Col>
                                    <Col lg="2">
                                        <div className="header-buttons">
                                            <Button className="login">Login</Button>
                                        </div>

                                    </Col>
                                    <Col lg="4">
                                        <div className="header-buttons">
                                            <Button className="register">Register</Button>
                                        </div>
                                    </Col>
                                </Row>

                            </Col>
                        </Row>
                    </Col>
                </Row>

            </Container>

        </header>
    );
};

export default Header;