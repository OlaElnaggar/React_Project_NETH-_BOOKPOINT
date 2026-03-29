import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import CardActionArea from "@mui/material/CardActionArea";
import { Box, IconButton } from "@mui/material";
import { decreaseQty, increaseQty, removeFromCart, type CartItem } from "../redux/redux";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "../redux/store";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";

interface CardBookProps {
    product: CartItem;
}

export default function CardCart({ product }: CardBookProps) {
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();

    return (
        <Card
            sx={{
                // width: "264px",
                display: "flex",
                flexDirection: "column",
                pb: 2,
                borderRadius: "12px",
                border: "1px solid #eee",
                boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
                transition: "box-shadow 0.25s",
                "&:hover": { boxShadow: "0 8px 24px rgba(0,0,0,0.1)" },
                position: "relative",
            }}
        >
            
            <IconButton
                size="small"
                onClick={() => dispatch(removeFromCart(product.id))}
                sx={{
                    position: "absolute", top: 6, right: 6, zIndex: 2,
                    color: "#aaa",
                    "&:hover": { color: "error.main", bgcolor: "rgba(255,0,0,0.06)" },
                    transition: "color 0.2s",
                }}
            >
                <DeleteOutlineIcon fontSize="small" />
            </IconButton>

            <CardActionArea
                sx={{ display: "flex", flexDirection: "column", flexGrow: 1, alignItems: "center", pt: 2 }}
                onClick={() => navigate(`/shop/${product.id}`)}
            >
                <CardMedia
                    component="img"
                    image={product.image}
                    alt={product.title}
                    sx={{
                        width: { xs: "120px", sm: "145px" },
                        height: { xs: "175px", sm: "210px" },
                        objectFit: "cover",
                        borderRadius: "6px",
                        boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
                    }}
                />

                <CardContent sx={{ width: "100%", pb: 1 }}>
                    <Typography variant="subtitle1" fontWeight={700} noWrap>
                        {product.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" gutterBottom>
                        {product.author.name}
                    </Typography>
                    <Typography variant="body1" color="warning.main" fontWeight={700}>
                        Rs. {product.price}/=
                    </Typography>
                </CardContent>
            </CardActionArea>

        
            <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                gap={1}
                mt={1}
                onClick={e => e.stopPropagation()}
            >
                <Typography color="text.secondary" variant="body2" fontWeight={600}>
                    Copies
                </Typography>
                <Box
                    display="flex"
                    alignItems="center"
                    sx={{
                        border: "1px solid #ddd",
                        borderRadius: "8px",
                        overflow: "hidden",
                    }}
                >
                    <IconButton
                        size="small"
                        onClick={() => dispatch(decreaseQty(product.id))}
                        sx={{ borderRadius: 0, px: 0.5, "&:hover": { bgcolor: "rgba(0,0,0,0.05)" } }}
                    >
                        <RemoveIcon sx={{ fontSize: 14 }} />
                    </IconButton>
                    <Typography sx={{ px: 1.5, minWidth: "28px", textAlign: "center", fontSize: "0.9rem" }}>
                        {product.qty}
                    </Typography>
                    <IconButton
                        size="small"
                        onClick={() => dispatch(increaseQty(product.id))}
                        sx={{ borderRadius: 0, px: 0.5, "&:hover": { bgcolor: "rgba(0,0,0,0.05)" } }}
                    >
                        <AddIcon sx={{ fontSize: 14 }} />
                    </IconButton>
                </Box>
            </Box>
        </Card>
    );
}