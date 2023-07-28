import React, {useEffect, useRef, useState} from 'react';
import {Col, Container, Row} from "reactstrap";
import Select from 'react-select';
import IconsSection from "./IconsSection";
import ModalExchange from "./ModalExchange";
import useWindowDimensions, {APICoinBase} from "../../halpers/useWindowDimensions";


const MainCalculationSection = ({ buy, sell, settings}) => {

    const [selected, setSelected] = useState(1);
    const [sellActive, setSellActive] = useState(false);

    const {width} = useWindowDimensions();

    const [isSelectOpen, setIsSelectOpen] = useState(false);
    const [isSelectOpen2, setIsSelectOpen2] = useState(false);

    const [currencyArray1, setCurrencyArray1] = useState([]);
    const [currencyArray2, setCurrencyArray2] = useState([]);

    const [currency1, setCurrency1] = useState({});
    const [currency2, setCurrency2] = useState({});

    const [coinRate, setCoinRate] = useState(0);
    const [changeCurrencies, setChangeCurrencies] = useState();

    const [rateData, setRateData] = useState([]);
    const [currenciesData, setCurrenciesData] = useState([]);

    const [minValue1, setMinValue1] = useState(0);
    const [minValue2, setMinValue2] = useState(0);
    const [maxValue1, setMaxValue1] = useState(0);
    const [maxValue2, setMaxValue2] = useState(0);

    const [valueCurrency1, setValueCurrency1] = useState(0);
    const [valueCurrency2, setValueCurrency2] = useState(0);

    const lastUpdateTimeRef = useRef(Date.now());

    useEffect(() => {
        if (buy.data && sell.data) {
            setCurrency1(buy.data[0]);
            setCurrency2(sell.data[0]);
            setCurrencyArray1(buy.data);
            setCurrencyArray2(sell.data);
            fetch(`${APICoinBase}/v2/exchange-rates?currency=USD`, {
                headers: {
                    "Content-Type": "application/json;charset=UTF-8"
                },
            })
                .then(res => res.json().then(res => {
                        // console.log(res, "RES")
                        setMinValue1(Number(settings.min) * Number(res?.data?.rates[`${buy?.data[0]?.code.toUpperCase()}`]));
                        setMaxValue1(Number(settings.max) * Number(res?.data?.rates[`${buy?.data[0]?.code.toUpperCase()}`]));
                        setValueCurrency1(Number(settings.min) * Number(res?.data?.rates[`${buy?.data[0]?.code.toUpperCase()}`]));
                        fetch(`${APICoinBase}/v2/exchange-rates?currency=${buy.data[0]?.code}`, {
                            headers: {
                                "Content-Type": "application/json;charset=UTF-8"
                            },
                        })
                            .then(res => res.json().then(res => {
                                    // console.log(res, "RES")
                                    setCoinRate(Number(res?.data?.rates[`${sell?.data[0]?.code.toUpperCase()}`]))
                                    setMinValue2(Number(settings.min) * Number(res.data.rates[`${sell?.data[0].code.toUpperCase()}`]) + ((Number(settings.min) * Number(res.data.rates[`${sell?.data[0].code.toUpperCase()}`])) / 100 * Number(settings.buy_commission)));
                                    setMaxValue2(Number(settings.max) * Number(res.data.rates[`${sell?.data[0].code.toUpperCase()}`]) + ((Number(settings.max) * Number(res.data.rates[`${sell?.data[0].code.toUpperCase()}`])) / 100 * Number(settings.buy_commission)));
                                    setValueCurrency2(Number(settings.min) * Number(res.data.rates[`${sell?.data[0].code.toUpperCase()}`]) + ((Number(settings.min) * Number(res.data.rates[`${sell?.data[0].code.toUpperCase()}`])) / 100 * Number(settings.buy_commission)));

                                }
                            ));

                    }
                ));
        }
    }, [])


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


    useEffect(() => {
        if (Object.keys(currency1).length > 0) {
            fetch(`${APICoinBase}/v2/exchange-rates?currency=USD`, {
                headers: {
                    "Content-Type": "application/json;charset=UTF-8"
                },
            })
                .then(res => res.json().then(res => {
                        // console.log(res, "RES")
                        // setChangeCurrencies();
                        if (!buy?.data?.find((el) => Number(el.id) === Number(currency1.id))) {
                            setSelected(3);
                            // setSellActive(true);

                        } else if (selected === 1) {
                            setSelected(1);

                        } else {
                            setSelected(2);
                            // setSellActive(false);

                        }
                        let min = Number(settings.min) * Number(res?.data?.rates[`${currency1?.code.toUpperCase()}`]);
                        let max = Number(settings.max) * Number(res?.data?.rates[`${currency1?.code.toUpperCase()}`]);

                        setMinValue1(min);
                        setMaxValue1(max);
                        setValueCurrency1(min);
                        fetch(`${APICoinBase}/v2/exchange-rates?currency=${currency1?.code.toUpperCase()}`, {
                            headers: {
                                "Content-Type": "application/json;charset=UTF-8"
                            },
                        })
                            .then(res => res.json().then(res => {
                                    // console.log(min, "min")
                                    setCoinRate(Number(res?.data?.rates[`${currency2.code.toUpperCase()}`]));
                                    setMinValue2(min * Number(res.data.rates[`${currency2.code.toUpperCase()}`]) + ((min * Number(res.data.rates[`${currency2.code.toUpperCase()}`])) / 100 * Number(!buy?.data?.find((el) => Number(el.id) === Number(currency1.id)) ? settings?.sell_commission : settings.buy_commission)));
                                    setMaxValue2(max * Number(res.data.rates[`${currency2.code.toUpperCase()}`]) + ((max * Number(res.data.rates[`${currency2.code.toUpperCase()}`])) / 100 * Number(!buy?.data?.find((el) => Number(el.id) === Number(currency1.id)) ? settings?.sell_commission : settings.buy_commission)));
                                    setValueCurrency2(min * Number(res.data.rates[`${currency2.code.toUpperCase()}`]) + ((min * Number(res.data.rates[`${currency2.code.toUpperCase()}`])) / 100 * Number(!buy?.data?.find((el) => Number(el.id) === Number(currency1.id)) ? settings?.sell_commission : settings.buy_commission)));
                                }
                            ));

                    }
                ));
        }
    }, [currency1, currency2])


    let change = (e) => {
        setValueCurrency1(e);
        setValueCurrency2(Number(e) * Number(coinRate) + ((Number(e) * Number(coinRate)) / 100 * Number(!buy?.data?.find((el) => Number(el.id) === Number(currency1.id)) ? settings?.sell_commission : settings.buy_commission)));
    }
    // console.log(valueCurrency2, 'valueCurrency2')
    let changeInverse = (e) => {
        setValueCurrency2(e);
        setValueCurrency1(Number(e) / (1 + Number(!buy?.data?.find((el) => Number(el.id) === Number(currency1.id)) ? settings?.sell_commission : settings.buy_commission) / 100) / Number(coinRate));

    };


    const changeCurrency = () => {
        const tempCurrencyArray = currencyArray1;
        setCurrencyArray1(currencyArray2);
        setCurrencyArray2(tempCurrencyArray);
        const tempCurrency = currency1;
        setCurrency1(currency2);
        setCurrency2(tempCurrency);

    }

    const toSell = (e) => {
        setSelected(e)
        setCurrency1(sell.data[0]);
        setCurrency2(buy.data[0]);
        setCurrencyArray1(sell.data);
        setCurrencyArray2(buy.data);
    }
    const toBuy = (e) => {
        setSelected(e);
        setCurrency1(buy.data[0]);
        setCurrency2(sell.data[0]);
        setCurrencyArray1(buy.data);
        setCurrencyArray2(sell.data);
    }

    const customFilter = (option, searchText) => {
        return option.data.name.toLowerCase().includes(searchText.toLowerCase()) || option.data.code.toLowerCase().includes(searchText.toLowerCase());
    };

    // useEffect(() => {
    //     // Function to fetch data and update states
    //     const fetchDataAndUpdate = () => {
    //
    //         const currentTime = Date.now();
    //         if (currentTime - lastUpdateTimeRef.current >= 10000) {
    //             if (Object.keys(currency1).length > 0) {
    //                 console.log("YEE")
    //                 fetch(`${APICoinBase}/v2/exchange-rates?currency=USD`, {
    //                     headers: {
    //                         "Content-Type": "application/json;charset=UTF-8"
    //                     },
    //                 })
    //                     .then(res => res.json().then(res => {
    //
    //                             let min = Number(settings.min) * Number(res?.data?.rates[`${currency1?.code.toUpperCase()}`]);
    //                             let max = Number(settings.max) * Number(res?.data?.rates[`${currency1?.code.toUpperCase()}`]);
    //                             // setMinValue1(min);
    //                             // setMaxValue1(max);
    //                             // setValueCurrency1(valueCurrency1);
    //                             fetch(`${APICoinBase}/v2/exchange-rates?currency=${currency1?.code.toUpperCase()}`, {
    //                                 headers: {
    //                                     "Content-Type": "application/json;charset=UTF-8"
    //                                 },
    //                             })
    //                                 .then(res => res.json().then(res => {
    //                                         console.log(Number(valueCurrency1) * Number(res.data.rates[`${currency2.code.toUpperCase()}`]) + ((Number(valueCurrency1) * Number(res.data.rates[`${currency2.code.toUpperCase()}`])) / 100 * Number(sellActive ? settings?.sell_commission : settings.buy_commission)))
    //                                         setCoinRate(Number(res?.data?.rates[`${currency2.code.toUpperCase()}`]));
    //                                         setMinValue2(min * Number(res.data.rates[`${currency2.code.toUpperCase()}`]) + ((min * Number(res.data.rates[`${currency2.code.toUpperCase()}`])) / 100 * Number(sellActive ? settings?.sell_commission : settings.buy_commission)));
    //                                         setMaxValue2(max * Number(res.data.rates[`${currency2.code.toUpperCase()}`]) + ((max * Number(res.data.rates[`${currency2.code.toUpperCase()}`])) / 100 * Number(sellActive ? settings?.sell_commission : settings.buy_commission)));
    //                                         console.log(valueCurrency1,"valueCurrency1")
    //                                         setValueCurrency2(Number(valueCurrency1) * Number(res.data.rates[`${currency2.code.toUpperCase()}`]) + ((Number(valueCurrency1) * Number(res.data.rates[`${currency2.code.toUpperCase()}`])) / 100 * Number(sellActive ? settings?.sell_commission : settings.buy_commission)));
    //                                     }
    //                                 ));
    //
    //                         }
    //                     ));
    //             }
    //
    //
    //             lastUpdateTimeRef.current = currentTime;
    //         }
    //     };
    //
    //     // Call the fetchDataAndUpdate function initially
    //     fetchDataAndUpdate();
    //
    //     // Set an interval to call the fetchDataAndUpdate function every 10 seconds
    //     const intervalId = setInterval(() => {
    //         fetchDataAndUpdate();
    //     }, 10000); // 10000 milliseconds = 10 seconds
    //
    //     // Clear the interval when the component is unmounted
    //     return () => {
    //         clearInterval(intervalId);
    //     };
    // }, [change,changeCurrency]);

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
                                                // setSelected(1)
                                                toBuy(1)
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
                            <Row className="custom-row-form">
                                <img onClick={changeCurrency}
                                     className="change-img" src="/assets/images/change.svg"/>

                                <Col lg="12">
                                    <div className="form-section">
                                        <label className='form-label'
                                               style={Number(valueCurrency1) < minValue1 || Number(valueCurrency1) > maxValue1 ? {color: "#F00"} : {color: "white"}}>
                                            Min {minValue1.toFixed(2)} / Max {maxValue1.toFixed(2)} {currency1.code}
                                        </label>
                                        <div className='form-main'>
                                            <input type='number'
                                                   style={Number(valueCurrency1) < minValue1 || Number(valueCurrency1) > maxValue1 ? {border: "1px solid #F00"} : {border: "none"}}
                                                   value={valueCurrency1}
                                                   onChange={(e) => {
                                                       let value = e.target.value.replace(/^0+(?=\d)/, '');

                                                       if (value.startsWith(".")) {
                                                           value = "0" + value;
                                                       }
                                                       change(value)
                                                   }}
                                                   className={`form-control form-control-custom ${isSelectOpen ? "opacity-0 position-absolute w-25" : ""}`}
                                                   id='some-id' placeholder='Send Qiwi(RUB)' name='billing-company'/>
                                            <Select
                                                id="1"
                                                value={currency1}
                                                onChange={(currency1) => {
                                                    setCurrency1(currency1);
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
                                        </div>
                                    </div>
                                </Col>
                                <Col lg="12">
                                    <div className="form-section">
                                        <label className='form-label'
                                               style={Number(valueCurrency1) < minValue1 || Number(valueCurrency1) > maxValue1 ? {color: "#F00"} : {color: "white"}}>
                                            Min {minValue2.toFixed(2)} / Max {maxValue2.toFixed(2)} {currency2.code}
                                        </label>
                                        <div className='form-main'>
                                            <input type='number'
                                                   style={Number(valueCurrency1) < minValue1 || Number(valueCurrency1) > maxValue1 ? {border: "1px solid #F00"} : {border: "none"}}
                                                   value={valueCurrency2}
                                                   onChange={(e) => {
                                                       let value = e.target.value.replace(/^0+(?=\d)/, '');

                                                       if (value.startsWith(".")) {
                                                           value = "0" + value;
                                                       }
                                                       changeInverse(value)
                                                   }}
                                                   className={`form-control form-control-custom  ${isSelectOpen2 ? "opacity-0 position-absolute w-25" : ""}`}
                                                   id="some-id-2" placeholder='Receive Bitcoin(BTC)'
                                                   name='billing-company'/>
                                            <Select
                                                id="2"
                                                defaultValue={currency2}
                                                value={currency2}
                                                onChange={(currency2) => {
                                                    setCurrency2(currency2)
                                                    setIsSelectOpen2(false)
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
                                        </div>
                                    </div>
                                </Col>
                            </Row>
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