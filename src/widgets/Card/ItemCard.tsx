import { Button, Card, CardActions, CardContent, CardMedia, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

interface IAdProps {
    ad : {
        id: number,
        title: string,
        price: number,
        category: string,
        status: "pending" | "approved" | "rejected" | "draft",
        createdAt : string,
        images: string[],
        description?: string;
        categoryId?: number;
        updatedAt?: string;
        seller?: any;
        characteristics?: any;
        moderationHistory?: any[];
    }
    
}

export const ItemCard = (props : IAdProps) => {
    const { ad } = props

    return(
        <Card sx={{ maxWidth: 345 }}>
            <CardMedia
                sx={{ height: 140 }}
                image={ad.images[0]}
            />
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                    {ad.title} - {ad.price} руб.
                </Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    {ad.category}
                </Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    Размещено: {ad.createdAt.slice(0, 10)}
                </Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    {ad.status}
                </Typography>
            </CardContent>
            <CardActions>
                <Link to={`/item/${ad.id}`}>
                    <Button size="small">Открыть</Button>
                </Link>
            </CardActions>
        </Card>
    )
}