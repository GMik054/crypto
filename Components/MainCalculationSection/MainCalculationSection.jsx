import React, {useEffect, useRef, useState} from 'react';
import {Card, Col, Container, Row} from "reactstrap";
import Select from 'react-select';
import IconsSection from "./IconsSection";
import ModalExchange from "./ModalExchange";
import useWindowDimensions, {APICallUrl, APICoinBase} from "../../halpers/useWindowDimensions";
import {useRouter} from "next/router";
import {Triangle} from "react-loader-spinner";
import {Skeleton} from "@mui/material";
// import {getExchangeRates} from "../../halpers/coinbaseAPI";


const MainCalculationSection = ({
                                    buy,
                                    sell,
                                    settings,
                                    currency1,
                                    setCurrency1,
                                    currency2,
                                    currencyArray1,
                                    currencyArray2,
                                    setMaxValue1,
                                    setMinValue2,
                                    maxValue1,
                                    minValue1,
                                    setMinValue1,
                                    maxValue2,
                                    setMaxValue2,
                                    minValue2,
                                    setCurrency2,
                                    setCurrencyArray1,
                                    valueCurrency2,
                                    setValueCurrency2,
                                    setCurrencyArray2,
                                    valueCurrency1,
                                    setValueCurrency1, show, setShow
                                }) => {


    const [selected, setSelected] = useState(1);

    const {width} = useWindowDimensions();

    const [isSelectOpen, setIsSelectOpen] = useState(false);
    const [isSelectOpen2, setIsSelectOpen2] = useState(false);

    const [timeoutId, setTimeoutId] = useState(null);

    const [toggle, setToggle] = useState(false);

    const [showTop, setShowTop] = useState(false);
    const [showButton, setShowButton] = useState(false);


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
            cursor: state.isFocused ? "text" : "pointer",
            backgroundColor: state.isFocused ? "#282828" : "transparent",
            borderRadius: state.menuIsOpen ? '16px 16px 0 0' : '16px',
            border: "none",
            textAlign: 'left',
            padding: "0",
            boxShadow: state.isFocused ? 'none' : 'none',
            minHeight: width < 575 ? '36px' : '38px',
            width: state.isFocused ? width > 767 ? '454px' : width < 500 ? "200px" : "300px" : width < 500 ? '120px' : "120px",
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
            backgroundColor: state.isSelected ? '#3F3F3F' : '#4F4F4F',
            color: state.isSelected ? 'white' : 'white',
            // textAlign: 'left',
            // paddingLeft: "60px",
            // borderRadius: '16px',
            cursor: "pointer",
            fontFamily: 'Montserrat',
            fontSize: width > 575 ? "14px" : "18px",
            letterSpacing: "0.18px",
            // paddingLeft:"30px",
            '&:hover': {
                backgroundColor: state.isSelected ? '#4F4F4F' : '#4F4F4F',
                color: state.isSelected ? 'white' : 'rgba(244, 244, 244, 0.8)',
                borderRadius: '0',
            },

        }),
        valueContainer: (provided, state) => {
            const isSelected = state.hasValue && state.selectProps.menuIsOpen;
            const shouldApplyPadding = (isSelectOpen || isSelectOpen2) && isSelected;

            return {
                ...provided,
                padding: shouldApplyPadding ? "0 12px" : "0",
            };
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
            // paddingLeft: "56px",
        }),
    };


    let change = (e) => {
        fetch(`${APICallUrl}/api/v1/get-currency-exchange?symbol=${currency1?.type === "sell" ? currency1?.code.toUpperCase() : currency2?.code.toUpperCase()}&convert=${currency2?.type === "buy" ? currency2?.code.toUpperCase() : currency1?.code.toUpperCase()}&price=${e}&type=${currency1?.type}`, {
            headers: {
                "Content-Type": "application/json;charset=UTF-8"
            },
        })
            .then(res => res.json().then(res => {
                    // console.log(res,"RESS")
                    setValueCurrency2(res.cost);
                    setShowButton(false);
                    setToggle(false);

                }
            ))
            .catch((error) => {
                // Handle general fetch error
                console.error('Failed to change', error);
                setShowButton(false);
                setToggle(false);
            });


    }

    // let changeInverse = (e) => {
    //     setValueCurrency2(e);
    //     setValueCurrency1(Number(e) / (1 + Number(currency1.type === "sell" ? settings?.sell_commission : settings.buy_commission) / 100) / Number(coinRate));
    // };


    const changeCurrency = async () => {
        setToggle(true);
        setShow(true);
        const minMaxRes1 = await fetch(`${APICallUrl}/api/v1/get-exchange-limit?currency=${currency2.code.toUpperCase()}&symbol=${currency1.code.toUpperCase()}`, {
            headers: {
                "Content-Type": "application/json;charset=UTF-8",
            },
        });

        const minMaxData1 = await minMaxRes1.json();
        const cur2Res = await fetch(`${APICallUrl}/api/v1/get-currency-exchange?symbol=${currency2?.type === "sell" ? currency2?.code.toUpperCase() : currency1?.code.toUpperCase()}&convert=${currency1?.type === "buy" ? currency1?.code.toUpperCase() : currency2?.code.toUpperCase()}&price=${minMaxData1?.min}&type=${currency2?.type}`)
        const minMaxRes2 = await fetch(`${APICallUrl}/api/v1/get-exchange-limit?currency=${currency1.code.toUpperCase()}&symbol=${currency2.code.toUpperCase()}`, {
            headers: {
                "Content-Type": "application/json;charset=UTF-8",
            },
        });

        const cur = await cur2Res.json();
        const minMaxData2 = await minMaxRes2.json();

        setMinValue1(minMaxData1?.min);
        setValueCurrency1(minMaxData1?.min);
        setMaxValue1(minMaxData1?.max);

        setMinValue2(cur?.cost);
        setValueCurrency2(cur?.cost);
        setMaxValue2(minMaxData2?.max);
        const tempCurrencyArray = currencyArray1;
        setCurrencyArray1(currencyArray2);
        setCurrencyArray2(tempCurrencyArray);

        const tempCurrency = currency1;
        setCurrency1(currency2);
        setCurrency2(tempCurrency);
        setShow(false);
        setToggle(false);

    }

    const toSell = (e) => {
        setSelected(e)
        if (currency1.type !== "sell") {
            changeCurrency()
        }

    }
    const toBuy = (e) => {
        setSelected(e);
        if (currency1.type !== "buy") {
            changeCurrency()
        }

    }

    const customFilter = (option, searchText) => {
        return option.data.name.toLowerCase().includes(searchText.toLowerCase()) || option.data.code.toLowerCase().includes(searchText.toLowerCase());
    };

    const selectCurrency1 = async (c) => {

        const minMaxRes1 = await fetch(`${APICallUrl}/api/v1/get-exchange-limit?currency=${c.code.toUpperCase()}&symbol=${currency2.code.toUpperCase()}`, {
            headers: {
                "Content-Type": "application/json;charset=UTF-8",
            },
        });

        const minMaxData1 = await minMaxRes1.json();

        setMinValue1(minMaxData1?.min);
        setValueCurrency1(minMaxData1?.min);
        setMaxValue1(minMaxData1?.max);
        const cur2Res = await fetch(`${APICallUrl}/api/v1/get-currency-exchange?symbol=${c?.type === "sell" ? c?.code.toUpperCase() : currency2?.code.toUpperCase()}&convert=${currency2?.type === "buy" ? currency2?.code.toUpperCase() : c?.code.toUpperCase()}&price=${minMaxData1?.min}&type=${c?.type}`)
        const minMaxRes2 = await fetch(`${APICallUrl}/api/v1/get-exchange-limit?currency=${currency2.code.toUpperCase()}&symbol=${c.code.toUpperCase()}`, {
            headers: {
                "Content-Type": "application/json;charset=UTF-8",
            },
        });
        const cur = await cur2Res.json();
        const minMaxData2 = await minMaxRes2.json();
        setMinValue2(cur?.cost);
        setValueCurrency2(cur?.cost);
        setMaxValue2(minMaxData2?.max);
        setShowTop(false);
        setShowButton(false);
        setToggle(false);


    }

    const selectCurrency2 = async (c) => {
        const minMaxRes1 = await fetch(`${APICallUrl}/api/v1/get-exchange-limit?currency=${currency1.code.toUpperCase()}&symbol=${currency2.code.toUpperCase()}`, {
            headers: {
                "Content-Type": "application/json;charset=UTF-8",
            },
        });

        const minMaxData1 = await minMaxRes1.json();

        setMinValue1(minMaxData1?.min);
        setValueCurrency1(minMaxData1?.min);
        setMaxValue1(minMaxData1?.max);

        const cur2Res = await fetch(`${APICallUrl}/api/v1/get-currency-exchange?symbol=${currency1?.type === "sell" ? currency1?.code.toUpperCase() : c?.code.toUpperCase()}&convert=${c?.type === "buy" ? c?.code.toUpperCase() : currency1?.code.toUpperCase()}&price=${valueCurrency1}&type=${currency1?.type}`)
        const minMaxRes2 = await fetch(`${APICallUrl}/api/v1/get-exchange-limit?currency=${c.code.toUpperCase()}&symbol=${currency1.code.toUpperCase()}`, {
            headers: {
                "Content-Type": "application/json;charset=UTF-8",
            },
        });
        const cur = await cur2Res.json();
        const minMaxData2 = await minMaxRes2.json();
        setMinValue2(cur?.cost);
        setValueCurrency2(cur?.cost);
        setMaxValue2(minMaxData2?.max);
        setShowButton(false);
        setToggle(false);
        setShowTop(false);


    }


    useEffect(() => {
        // Define an async function within the useEffect
        if (!toggle) { // Only proceed if toggle is false
            const intervalId = setInterval(async () => {
                try {

                    const minMaxRes1 = await fetch(`${APICallUrl}/api/v1/get-exchange-limit?currency=${currency1.code.toUpperCase()}&symbol=${currency2.code.toUpperCase()}`, {
                        headers: {
                            "Content-Type": "application/json;charset=UTF-8",
                        },
                    });

                    const minMaxData1 = await minMaxRes1.json();


                    setMinValue1(Number(valueCurrency1) < minMaxData1?.min ? minMaxData1?.min : Number(valueCurrency1));
                    setValueCurrency1(Number(valueCurrency1) < minMaxData1?.min ? minMaxData1?.min : Number(valueCurrency1));
                    setMaxValue1(minMaxData1?.max);

                    const cur2Res = await fetch(`${APICallUrl}/api/v1/get-currency-exchange?symbol=${currency2?.type === "sell" ? currency2?.code.toUpperCase() : currency1?.code.toUpperCase()}&convert=${currency1?.type === "buy" ? currency1?.code.toUpperCase() : currency2?.code.toUpperCase()}&price=${Number(valueCurrency1) < minMaxData1?.min ? minMaxData1?.min : Number(valueCurrency1)}&type=${currency1?.type}`);
                    const minMaxRes2 = await fetch(`${APICallUrl}/api/v1/get-exchange-limit?currency=${currency2.code.toUpperCase()}&symbol=${currency1.code.toUpperCase()}`, {
                        headers: {
                            "Content-Type": "application/json;charset=UTF-8",
                        },
                    });
                    const cur = await cur2Res.json();
                    const minMaxData2 = await minMaxRes2.json();
                    console.log(cur)
                    setMinValue2(cur?.cost);
                    setValueCurrency2(cur?.cost);
                    setMaxValue2(minMaxData2?.max);
                    // Do something with the data
                } catch (error) {
                    // Handle errors
                    console.error(error);
                }
            }, 10000); // 10 seconds
            return () => clearInterval(intervalId); // Clear the interval when the component is unmounted or when the effect is re-run
        }

    }, [currency1, currency2, valueCurrency1, valueCurrency2, toggle]); // dependencies


    return (
        <section className="calculation-section">
            <Container>
                <Row className="justify-content-md-center">
                    <Col xl="6" lg='7' md="12" sm="12" xs="12" className="cart">
                        <div className="calculation-banner">
                            <img src="/assets/images/Vector.svg"/>
                            <div style={{overflow: "hidden"}}>
                                <div className="buttons">
                                    <div className="custom-button">
                                        <div
                                            className={`button-area left-button-area ${selected === 1 ? 'selected' : ''}`}
                                            onClick={() => {
                                                setSelected(1);
                                                // toBuy(1)
                                            }}>
                                            <p className="text">TRADE</p>
                                        </div>
                                    </div>
                                    <div className="custom-button center-div">
                                        <div className={`button-area ${selected === 2 ? 'selected' : ''}`}
                                             onClick={() => {
                                                 // setSelected(2);
                                                 toBuy(2);
                                             }}>
                                            <p className="text">BUY</p>
                                        </div>
                                    </div>
                                    <div className="custom-button">
                                        <div
                                            className={`button-area right-button-area ${selected === 3 ? 'selected' : ''}`}
                                            onClick={() => {
                                                toSell(3)
                                            }}>
                                            <p className="text">SELL</p>
                                        </div>
                                    </div>

                                </div>
                            </div>
                            {
                                currencyArray1.length > 0 &&
                                <Row className="custom-row-form">
                                    {
                                        !show && !showButton &&
                                        <img onClick={() => {
                                            changeCurrency();
                                            setSelected(1);
                                        }} className="change-img" src="/assets/images/change.svg"/>
                                    }

                                    <Col lg="12">
                                        <div className="form-section">
                                            {
                                                show || showTop ?
                                                    <Skeleton variant="text" className="short-text"/> :
                                                    <label className='form-label'
                                                           style={Number(valueCurrency1) < minValue1 || Number(valueCurrency1) > maxValue1 ? {color: "#F00"} : {color: "white"}}>
                                                        Min {minValue1?.toFixed(2)} /
                                                        Max {maxValue1?.toFixed(2)} {currency1?.code}
                                                    </label>
                                            }
                                            <div className={`form-main ${show || showTop ? "form-main-height" : ""}`}>
                                                {
                                                    show || showTop ?

                                                        <Skeleton variant="text"
                                                                  className={`long-text ${showTop ? "w-100" : ""}`}/>
                                                        :
                                                        <input type='number'
                                                               style={Number(valueCurrency1) < minValue1 || Number(valueCurrency1) > maxValue1 ? {border: "1px solid #F00"} : {border: "none"}}
                                                               value={valueCurrency1 || 0}
                                                               onChange={(e) => {
                                                                   setToggle(true);
                                                                   setShowButton(true);
                                                                   let value = e.target.value.replace(/^0+(?=\d)/, '');
                                                                   if (value.startsWith(".")) {
                                                                       value = "0" + value;
                                                                   }
                                                                   setValueCurrency1(value);

                                                                   if (timeoutId) {
                                                                       clearTimeout(timeoutId);
                                                                   }

                                                                   const newTimeoutId = setTimeout(() => {
                                                                       change(value);
                                                                   }, 1000);

                                                                   setTimeoutId(newTimeoutId);
                                                               }}
                                                               className={`form-control form-control-custom ${isSelectOpen ? "opacity-0 position-absolute w-25" : ""}`}
                                                               id='some-id' name='first' placeholder="0"/>
                                                }
                                                {
                                                    show ?
                                                        <Skeleton variant="circular" width={44} height={44}
                                                                  className="circular-skeleton"/> :
                                                        <Select
                                                            id="1"
                                                            value={currency1}
                                                            onChange={(currency1) => {
                                                                setCurrency1(currency1);
                                                                setToggle(true);
                                                                setShowTop(true);
                                                                setShowButton(true);
                                                                selectCurrency1(currency1);
                                                                setIsSelectOpen(false);
                                                                document.getElementById('some-id').focus()
                                                            }}
                                                            onFocus={() => setIsSelectOpen(true)}
                                                            onBlur={() => setIsSelectOpen(false)}
                                                            options={currencyArray1}
                                                            filterOption={customFilter}
                                                            formatOptionLabel={options => (
                                                                <div className="country-option"
                                                                     style={{
                                                                         display: "flex",
                                                                         justifyContent: `${isSelectOpen ? "start" : "end"}`,
                                                                         alignItems: "center",
                                                                         minHeight: `${isSelectOpen ? "32px" : `${width <= 1399 && width > 500 ? "40px" : "46px"}`}`,
                                                                         padding: `${isSelectOpen ? "8px" : "0"}`
                                                                     }}>
                                                                    <img src={options?.image} title={options?.code}
                                                                         alt={options?.code}
                                                                         style={{
                                                                             maxWidth: `${isSelectOpen ? "32px" : "46px"}`,
                                                                             maxHeight: `${isSelectOpen ? "32px" : `${width <= 1399 && width > 500 ? "40px" : "46px"}`}`,
                                                                             marginRight: `${isSelectOpen ? "10px" : "0"}`,
                                                                             width: "auto",
                                                                             position: "relative"
                                                                         }}/>
                                                                    <p>{isSelectOpen && options?.name}</p>
                                                                </div>
                                                            )}
                                                            isSearchable={true}
                                                            styles={customStyles}
                                                            menuIsOpen={isSelectOpen}
                                                        />

                                                }
                                            </div>
                                        </div>
                                    </Col>
                                    <Col lg="12">
                                        <div className="form-section">
                                            {
                                                show || showButton ?
                                                    <Skeleton variant="text" className="short-text"/> :
                                                    <label className='form-label'
                                                           style={Number(valueCurrency1) < minValue1 || Number(valueCurrency1) > maxValue1 ? {color: "#F00"} : {color: "white"}}>

                                                        Min {minValue2?.toFixed(2) || 0} /
                                                        Max {maxValue2?.toFixed(2)} {currency2?.code}
                                                    </label>
                                            }


                                            <div
                                                className={`form-main ${show || showButton ? "form-main-height" : ""}`}>
                                                {/*<Triangle*/}
                                                {/*    height="80"*/}
                                                {/*    width="80"*/}
                                                {/*    color="#4fa94d"*/}
                                                {/*    ariaLabel="triangle-loading"*/}
                                                {/*    wrapperStyle={{}}*/}
                                                {/*    wrapperClassName=""*/}
                                                {/*    visible={true}*/}
                                                {/*/>*/}
                                                {
                                                    show || showButton ?
                                                        <Skeleton variant="text"
                                                                  className={`long-text ${showButton ? "w-100" : ""}`}
                                                        />

                                                        : <input type='number'
                                                                 readOnly
                                                                 style={Number(valueCurrency1) < minValue1 || Number(valueCurrency1) > maxValue1 ? {border: "1px solid #F00"} : {border: "none"}}
                                                                 value={valueCurrency2 || 0}
                                                                 onChange={(e) => {
                                                                     let value = e.target.value.replace(/^0+(?=\d)/, '');
                                                                     if (value.startsWith(".")) {
                                                                         value = "0" + value;
                                                                     }
                                                                     // changeInverse(value)
                                                                 }}
                                                                 className={`form-control form-control-custom  ${isSelectOpen2 ? "opacity-0 position-absolute w-25" : ""}`}
                                                                 id="some-id-2" name='second' placeholder="0"/>
                                                }
                                                {
                                                    show ?
                                                        <Skeleton variant="circular" width={44} height={44}
                                                                  className="circular-skeleton"/> :
                                                        <Select
                                                            id="2"
                                                            defaultValue={currency2}

                                                            value={currency2}
                                                            onChange={(currency2) => {
                                                                setShowTop(true);
                                                                setShowButton(true);
                                                                setToggle(true);
                                                                setCurrency2(currency2);
                                                                selectCurrency2(currency2);
                                                                setIsSelectOpen2(false);

                                                                document.getElementById('some-id-2').focus()
                                                            }}
                                                            onFocus={() => setIsSelectOpen2(true)}
                                                            onBlur={() => setIsSelectOpen2(false)}
                                                            options={currencyArray2}
                                                            formatOptionLabel={options => (
                                                                <div className="country-option"
                                                                     style={{
                                                                         display: "flex",
                                                                         justifyContent: `${isSelectOpen2 ? "start" : "end"}`,
                                                                         alignItems: "center",
                                                                         minHeight: `${isSelectOpen2 ? "32px" : `${width <= 1399 && width > 500 ? "40px" : "46px"}`}`,
                                                                         padding: `${isSelectOpen2 ? "8px" : "0"}`
                                                                     }}>
                                                                    <img src={options?.image} title={options?.code}
                                                                         alt={options?.code}
                                                                         style={{
                                                                             maxWidth: `${isSelectOpen2 ? "32px" : "46px"}`,
                                                                             maxHeight: `${isSelectOpen2 ? "32px" : `${width <= 1399 && width > 500 ? "40px" : "46px"}`}`,
                                                                             marginRight: `${isSelectOpen2 ? "10px" : "0"}`,
                                                                             width: "auto",
                                                                             position: "relative"
                                                                         }}/>
                                                                    <p>{isSelectOpen2 && options?.name}</p>
                                                                </div>
                                                            )}
                                                            isSearchable={true}
                                                            filterOption={customFilter}
                                                            menuIsOpen={isSelectOpen2}
                                                            styles={customStyles}
                                                        />

                                                }
                                            </div>
                                        </div>
                                    </Col>
                                </Row>
                            }
                            {
                                currencyArray1.length === 0 &&
                                <Row className="custom-row-form">

                                    <Col lg="12">
                                        <div className="form-section">
                                            {
                                                show &&
                                                <Skeleton variant="text" className="short-text"/>
                                            }
                                            <div className={`form-main ${show ? "form-main-height" : ""}`}>
                                                {
                                                    show &&
                                                    <>
                                                        <Skeleton variant="text" className="long-text"/>
                                                        <Skeleton variant="circular" width={44} height={44}
                                                                  className="circular-skeleton"/>
                                                    </>
                                                }
                                            </div>
                                        </div>
                                    </Col>
                                    <Col lg="12">
                                        <div className="form-section">
                                            {
                                                show &&
                                                <Skeleton variant="text" className="short-text"/>
                                            }


                                            <div className={`form-main ${show ? "form-main-height" : ""}`}>
                                                {
                                                    show &&
                                                    <>
                                                        <Skeleton variant="text" className="long-text"/>

                                                        <Skeleton variant="circular" width={44} height={44}
                                                                  className="circular-skeleton"/>
                                                    </>
                                                }
                                            </div>
                                        </div>
                                    </Col>
                                </Row>
                            }


                            <ModalExchange valueCurrency1={valueCurrency1} valueCurrency2={valueCurrency2}
                                           minValue1={minValue1} maxValue1={maxValue1}
                                           currency1={currency1} currency2={currency2}/>
                        </div>
                    </Col>
                    <Col xl="4" lg='5' md="12" sm="12" xs="12" className="info">
                        <div className="crypto-title-section">
                            <h2>Buy, Sell and Trade with <span>Crypto.am</span></h2>
                            <p>The main value we have is our reputation and the trust of our customers, which is
                                confirmed by more than 2000 of positive reviews.</p>
                        </div>
                    </Col>
                </Row>
            </Container>
            <IconsSection/>
        </section>
    );
};

export default MainCalculationSection;