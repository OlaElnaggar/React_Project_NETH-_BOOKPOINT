import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import CardActionArea from "@mui/material/CardActionArea";
import { Box, Button, Chip } from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import StarIcon from "@mui/icons-material/Star";
import { addToCart, type Product } from "../redux/redux";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "../redux/store";

interface CardBookProps {
    product: Product;
}

export default function CardBook({ product }: CardBookProps) {
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();

    return (
        <Card
            sx={{
                height: "100%",
                // width: "264px",
                display: "flex",
                flexDirection: "column",
                pb: 2,
                borderRadius: "12px",
                border: "1px solid #eee",
                boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
                transition: "transform 0.25s, box-shadow 0.25s",
                "&:hover": {
                    transform: "translateY(-5px)",
                    boxShadow: "0 10px 30px rgba(0,0,0,0.12)",
                },
                position: "relative",
                overflow: "visible",
            }}
            onClick={() => {
                localStorage.setItem("selectedProduct", JSON.stringify(product));
                navigate(`/shop/${product.id}`);
            }}
        >
            {/* Best seller badge */}
            {product.best_seller && (
                <Box sx={{
                    position: "absolute", top: -8, left: 10, zIndex: 2,
                    bgcolor: "secondary.main", color: "#000",
                    fontSize: "0.6rem", fontWeight: 700,
                    px: 1, py: 0.3, borderRadius: "4px",
                    display: "flex", alignItems: "center", gap: 0.3,
                }}>
                    <StarIcon sx={{ fontSize: "0.7rem" }} /> BEST SELLER
                </Box>
            )}

            <CardActionArea sx={{ display: "flex", flexDirection: "column", flexGrow: 1, alignItems: "center", pt: 2 }}>
                <CardMedia
                    component="img"
                    image={product.image}
                    alt={product.title}
                    sx={{
                        width: "145px",
                        height: "210px",
                        objectFit: "cover",
                        borderRadius: "6px",
                        boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
                    }}
                />

                <CardContent sx={{ width: "100%", pb: 1 }}>
                    <Typography gutterBottom variant="subtitle1" fontWeight={700} noWrap>
                        {product.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" gutterBottom noWrap>
                        {product.author.name}
                    </Typography>

                  
                    <Box display="flex" alignItems="center" gap={1}>
                        <Typography variant="body1" color="warning.main" fontWeight={700}>
                            Rs. {product.price}/=
                        </Typography>
                        {product.discount_percent && (
                            <Chip
                                label={`-${product.discount_percent}%`}
                                size="small"
                                sx={{ bgcolor: "rgba(75,51,11,0.1)", color: "warning.main", fontSize: "0.65rem", height: 18 }}
                            />
                        )}
                    </Box>

                    
                    <Typography variant="caption" color={product.in_stock ? "success.main" : "error.main"}>
                        {product.in_stock ? "Available across all branches" : "Out of stock"}
                    </Typography>
                </CardContent>
            </CardActionArea>

            <Button
                variant="outlined"
                color="secondary"
                startIcon={<ShoppingCartIcon sx={{ fontSize: 16 }} />}
                sx={{
                    mx: "auto",
                textTransform: "capitalize",
                    width: { xs: "150px", sm: "169px" },
                    height: "34px",
                    color: "#000",
                    borderRadius: "8px",
                    "&:hover": { bgcolor: "secondary.main", color: "#000", borderColor: "secondary.main" },
                    transition: "all 0.2s",
                }}
                onClick={(e) => {
                    e.stopPropagation();
                    dispatch(addToCart(product));
                }}
            >
                Add to Cart
            </Button>
        </Card>
    );
}