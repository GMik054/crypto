import React, {Fragment, useEffect, useRef, useState} from 'react';
import {Col, Container, Row} from "reactstrap";
import Select from "react-select";
import Button from "@mui/material/Button";
import Link from "next/link";
import ModalRegister from "./ModalRegister";
import ModalLogin from "./ModalLogin";
import {PersistGate} from "redux-persist/integration/react";
import {persistor} from "../../src/store";
import {useDispatch, useSelector} from "react-redux";
import {
    selectAuth,
    selectIsLoading,
    selectLoginToken, setUser,
    signOut
} from "../../src/features/Slices/LoginSlice";
import ModalTransactions from "./ModalTransactions";
import {APICallUrl} from "../../halpers/useWindowDimensions";
import ThreeBarToggle from "./ThreeBarToggle";
import {CloseIcon} from "next/dist/client/components/react-dev-overlay/internal/icons/CloseIcon";
import {useRouter} from "next/router";
import {useTranslation} from "next-i18next";

const options = [
    {value: 'eng', label: 'Eng', photo: '/assets/countries/eng.png'},
    {value: 'arm', label: 'Arm', photo: '/assets/countries/arm.jpg'},
    {value: 'rus', label: 'Rus', photo: '/assets/countries/rus.png'},
];


const Header = ({links}) => {

        const [selectedOption, setSelectedOption] = useState(options[0]);

        const [toggle, setToggle] = useState(false);

        const router = useRouter();
        const {pathname, asPath, query} = router;

        const divRef = useRef();

        const dispatch = useDispatch();

        const auth = useSelector(selectAuth);
        const loginToken = useSelector(selectLoginToken);
        const isLoading = useSelector(selectIsLoading);

        // console.log(auth, "toggle")
        // console.log(loginToken, "loginToken")
        const {t} = useTranslation('common');


        useEffect(() => {
            if (!auth) {
                fetch(`${APICallUrl}/api/v1/transactions`, {
                    headers: {
                        "Content-Type": "application/json;charset=UTF-8",
                        Authorization: `Bearer ${loginToken.token}`
                    },
                })
                    .then(res => res.json().then(res => {
                            // console.log(res, "transactions")
                            dispatch(setUser(res))
                        }
                    ));
            } else {
                setUser({})
            }
        }, [auth, isLoading])

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
                maxWidth: "100px",
                width: "100%",
                display: "flex",
                justifyContent: "center"
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
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = 'auto';
            }
        }, [toggle]);

        useEffect(() => {
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
        console.log(selectedOption, "selectedOption")
        useEffect(() => {
            if (selectedOption.value === "rus") {
                router.push({pathname, query}, asPath, {locale: "ru"})
            } else if (selectedOption.value === "arm") {
                router.push({pathname, query}, asPath, {locale: "am"})
            } else {
                router.push({pathname, query}, asPath, {locale: "en"})
            }
        }, [selectedOption])
        return (
            <header>
                <Container>
                    <h1>{t('welcome')}</h1>

                    <Row className="justify-content-center" style={{padding: "18px 0"}}>
                        <Col lg="12">
                            <Row className="header-row justify-content-between align-items-center g-3">
                                <Col xl="2" lg="8" md="5" sm="4" xs={`${!auth ? "4" : "5"}`} className="logo">
                                    <Link href={`/`}>
                                        <img src="/assets/images/logoHeader.svg" className="logo-img" alt="crypto-logo"
                                             title="crypto-logo"/>
                                    </Link>
                                </Col>
                                <Col xl="5" lg="1" md="1" xs="1" className={`menu ${toggle ? 'nav-menu-overlay' : ''}`}>
                                    <div className="header-menu">
                                        <ThreeBarToggle setToggle={setToggle}/>
                                        <ul className="nav-menu" style={{right: toggle ? '0px' : '-410px'}} ref={divRef}>
                                            <li className='back-btn d-xl-none'>
                                                <Row className='close-btn justify-content-between'>
                                                    <Col lg="8" xs="8" className="language-mob">
                                                        {
                                                            options?.map((el, i) => {
                                                                return (
                                                                    <Fragment key={i}>
                                                                        <p onClick={() => setSelectedOption(el)}
                                                                           className={`${selectedOption.value === el.value ? "active" : ""}`}>
                                                                            {el.label}
                                                                        </p>
                                                                        <div className="line"/>
                                                                    </Fragment>
                                                                )
                                                            })
                                                        }
                                                    </Col>
                                                    <Col lg="2" xs="2" className='mobile-back'
                                                         onClick={() => setToggle(false)}>
                                                        <CloseIcon/></Col>
                                                </Row>
                                            </li>
                                            {
                                                links?.map((el, i) => {
                                                    return (
                                                        <Fragment key={i}>
                                                            <li className="dropdown">
                                                                <Link href={`/${el?.value}`}
                                                                      onClick={() => router.asPath === `/${el.value}` ? setToggle(false) : ""}
                                                                      className={`${router.asPath === `/${el.value}` ? "active-link" : ""}`}>
                                                                    {el?.label}
                                                                </Link>
                                                            </li>
                                                        </Fragment>
                                                    )
                                                })
                                            }
                                        </ul>
                                    </div>
                                </Col>
                                <Col xl="2" lg="4" md="4" xs="4" className="country">
                                    <div className="language-section">
                                        <Select
                                            id={options.value}
                                            defaultValue={selectedOption}
                                            onChange={setSelectedOption}
                                            options={options}
                                            isSearchable={false}
                                            // menuIsOpen={true}
                                            formatOptionLabel={options => (
                                                <div className="country-option" style={customStyles.optionLabel}>
                                                    <div style={{
                                                        width: "36px",
                                                        overflow: "hidden",
                                                        borderRadius: "10px"
                                                    }}>
                                                        <img src={options.photo} style={customStyles.optionLabelImg}
                                                             alt={options.label} title={options.label}/>
                                                    </div>

                                                    <p style={customStyles.optionLabelP}
                                                    >{options.label}</p>
                                                </div>
                                            )}
                                            styles={customStyles}
                                        />
                                    </div>
                                </Col>
                                <Col xl="3" lg="3" md="6" sm="7" xs={`${!auth ? "7" : "6"}`} className="buttons">
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
                                                        <Col xl="6" lg="9" md="8" xs="9">
                                                            <ModalTransactions/>
                                                        </Col>
                                                        <Col xl="6" lg="3" md="2" xs="3">
                                                            <div className="header-buttons">
                                                                <Button className="login out-button"
                                                                        style={{fontSize: "15px"}}
                                                                        onClick={() => dispatch(signOut())}>Sign
                                                                    Out</Button>
                                                                <img src="/assets/images/logout.svg"
                                                                     onClick={() => dispatch(signOut())}
                                                                     className="d-xl-none"/>
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
    }
;

export default Header;