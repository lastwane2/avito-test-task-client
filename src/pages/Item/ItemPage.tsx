import { Link, useParams } from "react-router-dom"
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import styles from "./itemPage.module.scss"

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Box, Button, Modal, Typography } from "@mui/material";
import { useState } from "react";

const images = ["123", "321"]

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };


export const ItemPage = () => {
    const params = useParams()
    const [open, setOpen] = useState<boolean>(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return(
        <div style={{marginTop: "40px"}}>
            <div className={styles.upperPage}>
                <Swiper
                    modules={[Navigation, Pagination]}
                    navigation
                    pagination={{ clickable: true }}
                    spaceBetween={10}
                    slidesPerView={1}
                    style={{
                        width: '35%',
                        height: '300px',
                        margin: '0'
                    }}
                >
                    {images.map((img) => (
                        <SwiperSlide key={img}>
                        <img
                            src={img}
                            alt=""
                            style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                            borderRadius: '8px',
                            }}
                        />
                        </SwiperSlide>
                    ))}
                </Swiper>

                <div className={styles.moderatingList}>
                    список модерации        
                </div> 
                <div className={styles.buttonsContainer}>
                    <Button>Одобрить</Button> 
                    <Button>Доработка</Button> 
                    <Button onClick={handleOpen}>Отклонить</Button>
                    <Modal
                        open={open}
                        onClose={handleClose}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                    >
                    <Box sx={style}>
                        <Typography id="modal-modal-title" variant="h6" component="h2">
                        Text in a modal
                        </Typography>
                        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
                        </Typography>
                    </Box>
                    </Modal>
                </div>  
            </div>
            <div>
                Описание
            </div>
            <Link to="/list">Назад</Link>
        </div>
    )
}