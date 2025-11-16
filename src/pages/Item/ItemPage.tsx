import { Link, useParams } from "react-router-dom"
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import styles from "./itemPage.module.scss"
import { useAppDispatch, useAppSelector } from "@/shared/hooks/redux";
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Box, Button, Checkbox, Chip, FormControlLabel, FormGroup, Icon, Modal, Paper, Radio, Table, TableBody, TableCell, TableContainer, TableRow, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { getAdById } from "@/shared/slices/adsSlice";
import { adsApi } from "@/shared/api/adsApi";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { IAd } from '@/shared/types';


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
    const dispatch = useAppDispatch()
    const {currentAdLoading, currentAd} = useAppSelector(state => state.ads) as {
        currentAdLoading: boolean;
        currentAd: IAd | null;
    }
    const [openReject, setOpenReject] = useState<boolean>(false)
    const [openRequest, setOpenRequest] = useState<boolean>(false)

    const [selectedReason, setSelectedReason] = useState<string>("")
    const [otherReason, setOtherReason] = useState<string>("")
    const [comment, setComment] = useState<string>("")
    const handleReasonChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedReason(event.target.value)
    }
    const handleOtherReasonChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setOtherReason(event.target.value)
    } 
    const handleCommentChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setComment(event.target.value)
    }


    useEffect(() => {
        if (params.id) {
            dispatch(getAdById(params.id))
        }
    }, [dispatch, params.id])

    if(currentAdLoading){
        return <div>Загрузка...</div>
    }

    if(!currentAd){
        return <div>Объявление не найдено</div>
    }

    const handleApprove = () => {
        adsApi.approveAd(params.id!)
        dispatch(getAdById(params.id!))
    }

    const handleRequestChanges = () => {
        adsApi.requestChanges({id: params.id!, data: {reason: selectedReason === "Другое" ? otherReason : selectedReason, comment: comment}})
        dispatch(getAdById(params.id!))
    }

    const handleReject = () => {
        adsApi.rejectAd({id: params.id!, data: {reason: selectedReason === "Другое" ? otherReason : selectedReason, comment: comment}})
        dispatch(getAdById(params.id!))
    }

    return(
        <div className={styles.container}>
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
                    {currentAd.images.map((img : string) => (
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
                    История модерации:
                    {currentAd.moderationHistory.map((hist) => <div key={hist.id} className={styles.moderatorContainer}>
                            <span><b>Модератор:</b> {hist.moderatorName}</span>
                            <span><b>Дата:</b> {hist.timestamp.slice(0, 19)}</span>
                            <span><b>Комментарий:</b> {hist.comment}</span>
                            <span><b>Действие:</b> {hist.action}</span>
                            {hist.action !== "approved" && <span><b>Причина:</b> {hist.reason}</span>}
                        </div>
                    )}       
                </div> 
                <div className={styles.buttonsContainer}>
                    <Button
                        onClick={handleApprove}
                    >
                        Одобрить
                    </Button> 

                    
                    
                    <Button onClick={() => setOpenRequest(true)}>Доработка</Button>
                    <Modal
                        open={openRequest}
                        onClose={() => setOpenRequest(false)}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                    >
                    <Box sx={style}>
                        <Typography id="modal-modal-title" variant="h6" component="h2">
                            Доработка
                        </Typography>
                        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                            <FormGroup>
                                <FormControlLabel 
                                    control={<Radio
                                        checked={selectedReason === "Запрещенный товар"}
                                        onChange={handleReasonChange}
                                        value="Запрещенный товар" 
                                    /> 
                                } 
                                label="Запрещенный товар" 
                                />
                                <FormControlLabel 
                                    control={<Radio
                                        checked={selectedReason === "Неправильная категория"}
                                        onChange={handleReasonChange}
                                        value="Неправильная категория"
                                    /> 
                                } 
                                label="Неправильная категория" 
                                /><FormControlLabel 
                                    control={<Radio 
                                        checked={selectedReason === "Другое"}
                                        onChange={handleReasonChange}
                                        value="Другое"
                                    /> 
                                } 
                                label="Другое:" 
                                />
                                {selectedReason === "Другое" && (
                                    <TextField
                                        fullWidth
                                        label="Укажите причину"
                                        value={otherReason}
                                        onChange={handleOtherReasonChange}
                                        rows={3}
                                    />
                                )
                                }
                                <TextField
                                    sx={{mt : 2}}
                                    fullWidth
                                    label="Укажите комментарий"
                                    value={comment}
                                    onChange={handleCommentChange}
                                    rows={3}
                                />
                            </FormGroup>
                        </Typography>
                        <Button onClick={handleRequestChanges}>
                            Отправить
                        </Button>
                    </Box>
                    </Modal>



                    <Button onClick={() => setOpenReject(true)}>Отклонить</Button>
                    <Modal
                        open={openReject}
                        onClose={() => setOpenReject(false)}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                    >
                    <Box sx={style}>
                        <Typography id="modal-modal-title" variant="h6" component="h2">
                            Доработка
                        </Typography>
                        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                            <FormGroup>
                                <FormControlLabel 
                                    control={<Radio
                                        checked={selectedReason === "Запрещенный товар"}
                                        onChange={handleReasonChange}
                                        value="Запрещенный товар" 
                                    /> 
                                } 
                                label="Запрещенный товар" 
                                />
                                <FormControlLabel 
                                    control={<Radio
                                        checked={selectedReason === "Неправильная категория"}
                                        onChange={handleReasonChange}
                                        value="Неправильная категория"
                                    /> 
                                } 
                                label="Неправильная категория" 
                                /><FormControlLabel 
                                    control={<Radio 
                                        checked={selectedReason === "Другое"}
                                        onChange={handleReasonChange}
                                        value="Другое"
                                    /> 
                                } 
                                label="Другое:" 
                                />
                                {selectedReason === "Другое" && (
                                    <TextField
                                        fullWidth
                                        label="Укажите причину"
                                        value={otherReason}
                                        onChange={handleOtherReasonChange}
                                        rows={3}
                                    />
                                )
                                }
                                <TextField
                                    sx={{mt : 2}}
                                    fullWidth
                                    label="Укажите комментарий"
                                    value={comment}
                                    onChange={handleCommentChange}
                                    rows={3}
                                />
                            </FormGroup>
                        </Typography>
                        <Button onClick={handleReject}>
                            Отправить
                        </Button>
                    </Box>
                    </Modal>
                </div>  
            </div>

            <Box sx={{ mt: 3 }}>
            <Paper sx={{ p: 3, mb: 2 }}>
                <Typography variant="h6" fontWeight="bold" gutterBottom>
                Характеристики
                </Typography>
                <TableContainer>
                <Table size="small">
                    <TableBody>
                    {currentAd.characteristics && Object.entries(currentAd.characteristics).map(([key, value]) => (
                        <TableRow key={key}>
                        <TableCell 
                            component="th" 
                            scope="row"
                            sx={{ 
                            border: 'none', 
                            fontWeight: 'bold',
                            color: 'text.secondary',
                            width: '40%'
                            }}
                        >
                            {key}
                        </TableCell>
                        <TableCell sx={{ border: 'none' }}>
                            {value}
                        </TableCell>
                        </TableRow>
                    ))}
                    </TableBody>
                </Table>
                </TableContainer>
            </Paper>
            <Paper sx={{ p: 3 }}>
                <Typography variant="h6" fontWeight="bold" gutterBottom>
                    Продавец
                </Typography>
                
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <Typography variant="body1" fontWeight="bold" sx={{ mr: 1 }}>
                        {currentAd.seller?.name}
                    </Typography>
                    <Chip
                        label={`★ ${currentAd.seller?.rating}`}
                        size="small"
                        color="primary"
                        variant="outlined"
                    />
                </Box>

                <Box sx={{ display: 'flex', gap: 3, flexWrap: 'wrap' }}>
                    <Box>
                        <Typography variant="body2" color="text.secondary">
                            Объявления
                        </Typography>
                        <Typography variant="body1" fontWeight="bold">
                            {currentAd.seller?.totalAds}
                        </Typography>
                    </Box>
                    
                    <Box>
                        <Typography variant="body2" color="text.secondary">
                            На сайте с: 
                        </Typography>
                        <Typography variant="body1" fontWeight="bold">
                            {currentAd.seller?.registeredAt.slice(0,10)}
                        </Typography>
                    </Box>
                </Box>
            </Paper>
            </Box>
            <Link className={styles.link} to="/list">
                <ArrowBackIcon sx={{ color: '#343A40' }} />
            </Link>

            
        </div>
    )
}