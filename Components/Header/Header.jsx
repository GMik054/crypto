import React, {useEffect, useRef, useState} from 'react';
import {Col, Container, Row} from "reactstrap";
import Select from "react-select";
// import {FiSearch} from "@react-icons/all-files/fi/FiSearch";
import Button from "@mui/material/Button";
import Link from "next/link";
import ModalRegister from "./ModalRegister";
import ModalLogin from "./ModalLogin";
import {PersistGate} from "redux-persist/integration/react";
import {persistor} from "../../src/store";
import {useDispatch, useSelector} from "react-redux";
import {selectAuth, selectAuthUser, selectLoginToken, signOut} from "../../src/features/Slices/LoginSlice";
import ModalTransactions from "./ModalTransactions";
import {APICallUrl} from "../../halpers/useWindowDimensions";
import ThreeBarToggle from "./ThreeBarToggle";
import {FaSignOutAlt} from "@react-icons/all-files/fa/FaSignOutAlt";

const options = [
    {value: 'eng', label: 'Eng', photo: '/assets/images/eng.png'},
    {value: 'arm', label: 'Arm', photo: '/assets/images/arm.jpg'},
    {value: 'rus', label: 'Rus', photo: '/assets/images/rus.png'},
];
const Header = () => {
    const [selectedOption, setSelectedOption] = useState(options[0]);
    const [toggle, setToggle] = useState(false);
    let dispatch = useDispatch();
    const divRef = useRef();
    let auth = useSelector(selectAuth);
    let authUser = useSelector(selectAuthUser);
    let loginToken = useSelector(selectLoginToken);
    console.log(auth, "toggle")
    // console.log(authUser, "authUser")
    // console.log(loginToken, "loginToken")


    useEffect(() => {
        if (!auth) {
            fetch(`${APICallUrl}/api/v1/transactions`, {
                headers: {
                    "Content-Type": "application/json;charset=UTF-8",
                    Authorization: `Bearer ${loginToken.token}`
                },
            })
                .then(res => res.json().then(res => {
                        console.log(res, "transactions")
                    }
                ));
        }
    }, [auth])

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
            // maxWidth: "124px",
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
            // padding: "calc(2px + 4 * (100vw - 320px) / 1600) calc(8px + 8 * (100vw - 320px) / 1600)",
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
            cursor: "pointer",
            '&:hover': {
                backgroundColor: state.isSelected ? 'lightgray' : 'lightgray',

            },

        }),
        optionLabel: {
            display: "flex",
            justifyContent: "flex-start",
            alignItems: "center",
            minHeight: "36px"
        },
        optionLabelImg: {
            // maxWidth: "36px",
            maxHeight: "36px",
            // maxWidth: "36px",
            // width: "100%"
        },
        optionLabelP: {
            color: 'black',
            marginLeft: '4px',
            fontSize: "16px",
            fontWeight: "500"
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


    useEffect(() => {
        if (toggle) {
            document.body.style.overflow = 'hidden'; // Prevent scrolling
        } else {
            document.body.style.overflow = 'auto'; // Allow scrolling
        }
    }, [toggle]);

    useEffect(() => {
        dispatch({type: 'TOPMENUTOGGLE', payload: false});
        const handleOutsideClick = (event) => {
            if (divRef.current && !divRef.current.contains(event.target)) {
                setToggle(false)
            }
        };
        document.addEventListener('mousedown', handleOutsideClick);

        return () => {
            document.removeEventListener('mousedown', handleOutsideClick);
        };
    }, []);

    return (
        <header>
            <Container>
                <Row className="justify-content-center" style={{padding: "18px 0"}}>
                    <Col lg="12">
                        <Row className="header-row justify-content-between g-3">
                            <Col xl="2" lg="8" md="8" xs="8" className="logo">
                                <Link href={`/`}>
                                    <img src="/assets/images/logoHeader.png"/>
                                </Link>
                            </Col>
                            <Col xl="5" lg="6" md="6" xs="2" className={`menu ${toggle ? 'nav-menu-overlay' : ''}`}>
                                <div className="header-menu">
                                    <ThreeBarToggle setToggle={setToggle} />
                                    <ul className={`nav-menu `}
                                        style={{right: toggle ? '0px' : '-410px'}} ref={divRef}
                                    >
                                        <li className='back-btn d-lg-none'
                                            onClick={() => setToggle(false)}
                                        >
                                            <div className='close-btn'>
                                                Menu
                                                <span className='mobile-back'>
                <i className='fa fa-angle-left'></i>
              </span>
                                            </div>
                                        </li>
                                        {/*<div className="link-to">*/}

                                        <li className="dropdown">
                                            <Link href={`/`}>
                                                Home
                                            </Link>
                                        </li>
                                        <li className="dropdown">
                                            <Link href={`/partners`}>
                                                Partners
                                            </Link>
                                        </li>
                                        <li className="dropdown">
                                            <Link href={`/faq`}>
                                                FAQ
                                            </Link>

                                        </li>
                                        <li className="dropdown">

                                            <Link href={`/gallery`}>
                                                Gallery
                                            </Link>
                                        </li>
                                        <li className="dropdown">

                                            <Link href={`/contact-us`}>
                                                Contacts
                                            </Link>
                                        </li>
                                        {/*<Link href={`/`}>*/}
                                        {/*    <p>Home</p>*/}
                                        {/*</Link>*/}
                                        {/*<Link href={`/partners`}>*/}
                                        {/*    <p>Partners</p>*/}
                                        {/*</Link>*/}
                                        {/*<Link href={`/faq`}>*/}
                                        {/*    <p>FAQ</p>*/}
                                        {/*</Link>*/}
                                        {/*<Link href={`/gallery`}>*/}
                                        {/*    <p>Gallery</p>*/}
                                        {/*</Link>*/}
                                        {/*<Link href={`/contact-us`}>*/}
                                        {/*    <p>Contacts</p>*/}
                                        {/*</Link>*/}
                                        {/*</div>*/}

                                    </ul>

                                </div>
                            </Col>
                            <Col xl="2" lg="4" md="4" xs="4" className="country">
                                <div className="language-section">
                                    <Select
                                        id={options.value} // Add a static id value here
                                        defaultValue={selectedOption}
                                        onChange={setSelectedOption}
                                        options={options}
                                        // menuIsOpen={true}
                                        formatOptionLabel={options => (
                                            <div className="country-option" style={customStyles.optionLabel}>
                                                <div style={{
                                                    width: "36px",
                                                    overflow: "hidden",
                                                    borderRadius: "10px"
                                                }}>
                                                    <img src={options.photo} style={customStyles.optionLabelImg}
                                                         alt="country-image"/>
                                                </div>

                                                <p style={customStyles.optionLabelP}
                                                >{options.label}</p>
                                            </div>
                                        )}
                                        styles={customStyles}
                                    />
                                </div>
                            </Col>
                            <Col xl="3" lg="4" md="6" sm="7" xs={`${!auth ? "10" : "8"}`} className="buttons">
                                <Row className="justify-content-end">
                                    <PersistGate loading={null} persistor={persistor}>
                                        {
                                            auth ?
                                                <>
                                                    <Col lg="5" md="5" xs="5">

                                                        <ModalLogin/>
                                                    </Col>
                                                    <Col lg="7" md="7" xs="7">
                                                        <ModalRegister/>
                                                    </Col>
                                                </> :
                                                <>
                                                    <Col lg="6" md="8" xs="8">
                                                        <ModalTransactions/>
                                                    </Col>
                                                    <Col lg="6" md="2" xs="3">
                                                        <div className="header-buttons">
                                                            <Button className="login out-button"
                                                                    style={{fontSize: "15px"}}
                                                                    onClick={() => dispatch(signOut())}>Sign
                                                                Out</Button>
                                                            <FaSignOutAlt onClick={() => dispatch(signOut())} style={{color:"#2B2B2B"}}
                                                                          className="d-lg-none" size={26}/>
                                                        </div>
                                                    </Col>
                                                </>
                                        }
                                    </PersistGate>

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