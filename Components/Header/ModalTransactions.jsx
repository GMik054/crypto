import React, {useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import Backdrop from "@mui/material/Backdrop";
import Fade from "@mui/material/Fade";
import Box from "@mui/material/Box";
import {CloseIcon} from "next/dist/client/components/react-dev-overlay/internal/icons/CloseIcon";
import {Col, Row} from "reactstrap";
import {selectAuthUser} from "../../src/features/Slices/LoginSlice";
import {useTranslation} from "next-i18next";

const ModalTransactions = () => {
        const [open, setOpen] = useState(false);
        const handleOpen = () => setOpen(true);
        const handleClose = () => setOpen(false);
        const user = useSelector(selectAuthUser);
    console.log(user)
    function formatDate(inputDate) {
        const date = new Date(inputDate);
        const day = date.getUTCDate().toString().padStart(2, '0');
        const month = (date.getUTCMonth() + 1).toString().padStart(2, '0');
        const year = date.getUTCFullYear();
        const hours = date.getUTCHours().toString().padStart(2, '0');
        const minutes = date.getUTCMinutes().toString().padStart(2, '0');
        const seconds = date.getUTCSeconds().toString().padStart(2, '0');

        return `${day}.${month}.${year} ${hours}:${minutes}:${seconds}`;
    }

        const {t} = useTranslation();

        return (
            <div className="header-buttons" style={{justifyContent: "end"}}>
                <Button className="register" onClick={handleOpen}>{t('transactions')}</Button>

                <Modal
                    aria-labelledby="transition-modal-title"
                    aria-describedby="transition-modal-description"
                    open={open}
                    onClose={handleClose}
                    closeAfterTransition
                    slots={{backdrop: Backdrop}}
                    slotProps={{
                        backdrop: {
                            timeout: 500,
                        },
                    }}
                >
                    <Fade in={open}>
                        <Box className="modal-box">
                            <Button onClick={handleClose} className="close-button">
                                <CloseIcon/>
                            </Button>
                            <h5>{t('transactions')}</h5>

                            <Row className="g-2">

                                {
                                    user?.exchange_history?.map((el, i) => {
                                        return (
                                            <Col lg="12" xs="12" key={i}>
                                                <div className="single-transaction">
                                                    <p># <span>{el.id}</span></p>
                                                    <p>{t('date')}: <span>{formatDate(el?.created_at)}</span></p>
                                                    <p>{t('name')}: <span>{el?.name}</span></p>
                                                    <p>{t('exchange')}: <span>{el?.content}</span></p>
                                                    <p>{t('phone')}: <span>{el?.phone}</span></p>
                                                    <p>{t('email')}: <span>{el?.email}</span></p>
                                                </div>
                                            </Col>
                                        )
                                    })
                                }
                            </Row>

                            <Button
                                className={`modal-exchange-button active`}
                                onClick={handleClose}
                            >{t('close')}</Button>
                        </Box>
                    </Fade>
                </Modal>
            </div>


        );
    }
;

export default ModalTransactions;