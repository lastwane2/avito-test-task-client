import { Button, Card, CardActions, CardContent, CardMedia, Typography } from '@mui/material';
import { Link } from 'react-router-dom';


export const ItemCard = () => {
    return(
        <Card sx={{ maxWidth: 345 }}>
            <CardMedia
                sx={{ height: 140 }}
                image="/static/images/cards/contemplative-reptile.jpg"
                title="green iguana"
            />
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                    Lizard
                    -
                    стоимость
                </Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    Категория
                </Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    Дата
                </Typography>
            </CardContent>
            <CardActions>
                <Link to="/item/1">
                    <Button size="small">Открыть</Button>
                </Link>
            </CardActions>
        </Card>
    )
}