import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../redux/store";
import { fetchProducts, addToCart } from "../redux/redux";
import {
    Box, Button, Chip, Container, Grid,
    Typography, Skeleton, Divider,
} from "@mui/material";
import CategoryOutlinedIcon from "@mui/icons-material/CategoryOutlined";
import CreditCardOutlinedIcon from "@mui/icons-material/CreditCardOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import StarIcon from "@mui/icons-material/Star";
import MenuBookIcon from "@mui/icons-material/MenuBook";

export default function Bookdetails() {
    const { id } = useParams();
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();
    const [showFullAbout, setShowFullAbout] = useState(false);

    const { productslist, loading } = useSelector((state: RootState) => state.products);

    useEffect(() => {
        if (productslist.length === 0) dispatch(fetchProducts());
    }, [dispatch, productslist.length]);

    const product = productslist.find(p => p.id === Number(id))
        ?? JSON.parse(localStorage.getItem("selectedProduct") || "null");

    if (loading) return (
        <Container maxWidth="lg" sx={{ pt: "120px", pb: 6 }}>
            <Grid container spacing={4}>
                <Grid size={{xs:12 , md:5}} >
                    <Skeleton variant="rectangular" height={400} sx={{ borderRadius: "12px" }} />
                </Grid>
                <Grid size={{xs:12, md:7}} >
                    <Skeleton variant="text" height={60} />
                    <Skeleton variant="text" width="50%" />
                    <Skeleton variant="text" sx={{ mt: 2 }} />
                    <Skeleton variant="text" />
                    <Skeleton variant="text" width="70%" />
                </Grid>
            </Grid>
        </Container>
    );

    if (!product) return (
        <Container sx={{ pt: "120px", textAlign: "center" }}>
            <Typography variant="h5" color="error">Book not found.</Typography>
            <Button onClick={() => navigate("/shop")} sx={{ mt: 2 }}>Back to Shop</Button>
        </Container>
    );

    return (
        <Box sx={{ pt: { xs: "90px", md: "100px" }, pb: 6, minHeight: "100vh", bgcolor: "#fafafa" }}>

            <Container maxWidth="lg">

                <Button
                    startIcon={<ArrowBackIcon />}
                    onClick={() => navigate("/shop")}
                    sx={{ mb: 3, textTransform: "capitalize", color: "#555", "&:hover": { color: "secondary.main" } }}
                >
                    Back to Shop
                </Button>

                <Grid container spacing={5}>

                    <Grid size={{xs:12 , md:5}}>
                        <Box sx={{
                            borderRadius: "16px",
                            overflow: "hidden",
                            boxShadow: "0 12px 40px rgba(0,0,0,0.15)",
                            bgcolor: "#e8e0d5",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            minHeight: "340px",
                            animation: "fadeIn 0.6s ease both",
                            "@keyframes fadeIn": { from: { opacity: 0, transform: "scale(0.97)" }, to: { opacity: 1, transform: "scale(1)" } },
                        }}>
                            <Box
                                component="img"
                                src={product.image}
                                alt={product.title}
                                sx={{ width: "100%", maxWidth: "280px", height: "360px", objectFit: "cover" }}
                            />
                        </Box>


                        <Box display="flex" gap={1} mt={2} flexWrap="wrap">
                            {product.best_seller && (
                                <Chip label="⭐ Best Seller" size="small" sx={{ bgcolor: "secondary.main", color: "#000", fontWeight: 700 }} />
                            )}
                            <Chip icon={<StarIcon sx={{ fontSize: 14 }} />} label={`${product.rating} / 5`} size="small" variant="outlined" />
                            <Chip icon={<MenuBookIcon sx={{ fontSize: 14 }} />} label={`${product.pages} pages`} size="small" variant="outlined" />
                        </Box>
                    </Grid>


                    <Grid size={{xs:12 , md:7}} sx={{
                        animation: "slideIn 0.5s ease both",
                        "@keyframes slideIn": { from: { opacity: 0, transform: "translateX(20px)" }, to: { opacity: 1, transform: "translateX(0)" } },
                    }}>
                        <Typography variant="h4" fontWeight={700} color="#1a1a1a" gutterBottom>
                            {product.title}
                        </Typography>
                        <Typography variant="subtitle1" color="text.secondary" gutterBottom>
                            {product.author.name}
                        </Typography>


                        <Box display="flex" alignItems="center" gap={1} mb={2} flexWrap="wrap">
                            <CategoryOutlinedIcon sx={{ color: "secondary.main", fontSize: 20 }} />
                            <Typography variant="body2" color="secondary.main" fontWeight={600}>
                                Category:
                            </Typography>
                            {product.type?.map((t: string) => (
                                <Chip key={t} label={t} size="small" variant="outlined" sx={{ borderColor: "secondary.main", color: "#666" }} />
                            ))}
                        </Box>

                        <Typography variant="body1" color="text.secondary" sx={{ lineHeight: 1.8, mb: 3 }}>
                            {product.description}
                        </Typography>


                        <Box display="flex" alignItems="center" gap={1.5} mb={1}>
                            <CreditCardOutlinedIcon sx={{ color: "secondary.main" }} />
                            <Typography variant="h4" color="secondary.main" fontWeight={700}>
                                Rs. {product.price}/-
                            </Typography>
                            {product.original_price && (
                                <Typography variant="body2" color="text.disabled" sx={{ textDecoration: "line-through" }}>
                                    Rs. {product.original_price}/-
                                </Typography>
                            )}
                        </Box>
                        {product.discount_percent && (
                            <Typography variant="caption" color="success.main" fontWeight={600}>
                                🎉 {product.discount_percent}% OFF — Limited time offer
                            </Typography>
                        )}

                        <Box mt={3}>
                            <Button
                                variant="contained"
                                color="warning"
                                startIcon={<ShoppingCartOutlinedIcon />}
                                onClick={() => dispatch(addToCart(product))}
                                sx={{
                                    textTransform: "capitalize",
                                    borderRadius: "10px",
                                    px: 4, py: 1.2,
                                    fontWeight: 700,
                                    boxShadow: "0 4px 14px rgba(75,51,11,0.3)",
                                    "&:hover": { transform: "translateY(-2px)", boxShadow: "0 6px 20px rgba(75,51,11,0.4)" },
                                    transition: "all 0.25s",
                                }}
                            >
                                Secure copy online now
                            </Button>
                        </Box>

                        <Divider sx={{ my: 4 }} />


                        <Box>
                            <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                                <Typography variant="h6" fontWeight={700}>About This Book</Typography>
                            </Box>
                            <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.9 }}>
                                {showFullAbout ? product.about : `${product.about?.slice(0, 300)}...`}
                            </Typography>
                            <Button
                                size="small"
                                onClick={() => setShowFullAbout(v => !v)}
                                sx={{ textTransform: "capitalize", color: "secondary.main", mt: 1, p: 0 }}
                            >
                                {showFullAbout ? "Show less ▲" : "Read more ▼"}
                            </Button>
                        </Box>

                        <Divider sx={{ my: 3 }} />


                        <Box>
                            <Typography variant="subtitle1" fontWeight={700} gutterBottom>About the Author</Typography>
                            <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.8 }}>
                                {product.author.bio}
                            </Typography>
                        </Box>
                    </Grid>
                </Grid>
            </Container>
        </Box>
    );
}