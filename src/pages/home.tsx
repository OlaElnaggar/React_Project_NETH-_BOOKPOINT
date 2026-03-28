import { useEffect, useState } from 'react';
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import hero_bg from "../assets/hero-img.gif";
import { useSelector, useDispatch } from "react-redux";
import { fetchProducts, addToCart } from "../redux/redux";
import type { AppDispatch, RootState } from "../redux/store";
import { useNavigate } from "react-router-dom";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import StarIcon from "@mui/icons-material/Star";
import Fade from "@mui/material/Fade";


function AnimatedCounter({ target, suffix = "" }: { target: number; suffix?: string }) {
    const [count, setCount] = useState(0);
    useEffect(() => {
        let start = 0;
        const duration = 1500;
        const step = Math.ceil(target / (duration / 16));
        const timer = setInterval(() => {
            start += step;
            if (start >= target) { setCount(target); clearInterval(timer); }
            else setCount(start);
        }, 16);
        return () => clearInterval(timer);
    }, [target]);
    return <span>{count}{suffix}</span>;
}

function Home() {
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();
    const { productslist } = useSelector((state: RootState) => state.products);
    const [search, setSearch] = useState("");
    const [carouselIndex, setCarouselIndex] = useState(0);
    const [visible, setVisible] = useState(true);

    useEffect(() => { dispatch(fetchProducts()); }, [dispatch]);

    const bestPicks = productslist.filter(p => p.best_seller).slice(0, 8);
    const itemsPerPage = 4;
    const totalPages = Math.ceil(bestPicks.length / itemsPerPage);
    const currentBooks = bestPicks.slice(carouselIndex * itemsPerPage, carouselIndex * itemsPerPage + itemsPerPage);

    const handlePrev = () => {
        setVisible(false);
        setTimeout(() => { setCarouselIndex(i => (i - 1 + totalPages) % totalPages); setVisible(true); }, 300);
    };
    const handleNext = () => {
        setVisible(false);
        setTimeout(() => { setCarouselIndex(i => (i + 1) % totalPages); setVisible(true); }, 300);
    };

    const handleSearch = () => {
        if (search.trim()) navigate(`/shop?search=${encodeURIComponent(search.trim())}`);
    };

    return (
        <Box>

            <Box sx={{
                backgroundImage: `url(${hero_bg})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
                minHeight: "100vh",
                display: "flex",
                flexDirection: "column",
                justifyContent: "flex-start",
                alignItems: "center",
                pt: { xs: "110px", md: "150px" },
                px: 2,
                position: "relative",
            }}>
                <Box sx={{
                    textAlign: "center",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: "20px",
                    maxWidth: "900px",
                    animation: "fadeSlideDown 0.8s ease both",
                    "@keyframes fadeSlideDown": {
                        from: { opacity: 0, transform: "translateY(-30px)" },
                        to: { opacity: 1, transform: "translateY(0)" },
                    },
                }}>
                    <Typography variant="h2" color="secondary.main" sx={{
                        fontSize: { xs: "1.8rem", sm: "2.5rem", md: "3rem" },
                        fontWeight: 700,
                        textShadow: "0 2px 12px rgba(204,150,0,0.3)",
                    }}>
                        The Book Lover's Dreamland Awaits!
                    </Typography>
                    <Typography variant="body1" color="primary.main" sx={{ width: { xs: "90%", md: "80%" }, opacity: 0.9 }}>
                        Welcome to the ultimate book lover's paradise! Join our community and contribute to the
                        ever-evolving library of stories, where every book has a chance to inspire someone new.
                    </Typography>


                    <Box sx={{
                        display: "flex",
                        alignItems: "center",
                        border: "1px solid #CC9600",
                        borderRadius: "10px",
                        padding: "8px 8px 8px 16px",
                        gap: "10px",
                        backdropFilter: "blur(4px)",
                        backgroundColor: "rgba(0,0,0,0.2)",
                        width: { xs: "90%", sm: "395px" },
                        transition: "box-shadow 0.3s",
                        "&:focus-within": { boxShadow: "0 0 0 3px rgba(204,150,0,0.3)" },
                    }}>
                        <input
                            type="text"
                            placeholder="Search a Book"
                            value={search}
                            onChange={e => setSearch(e.target.value)}
                            onKeyDown={e => e.key === "Enter" && handleSearch()}
                            style={{
                                backgroundColor: "transparent",
                                border: "none",
                                outline: "none",
                                color: "white",
                                flex: 1,
                                fontSize: "1rem",
                                fontFamily: "Bona Nova, serif",
                            }}
                        />
                        <Button
                            variant="contained"
                            color="warning"
                            onClick={handleSearch}
                            sx={{ borderRadius: "7px", width: "100px", height: "36px", textTransform: "capitalize" }}
                        >
                            Search
                        </Button>
                    </Box>
                </Box>
            </Box>


            <Box sx={{ py: { xs: 6, md: 8 }, bgcolor: "#fff" }}>
                <Container maxWidth="lg">
                    <Typography variant="h4" align="center" fontWeight={700} gutterBottom sx={{
                        color: "#1a1a1a",
                        mb: 5,
                        position: "relative",
                        "&::after": {
                            content: '""',
                            display: "block",
                            width: "60px",
                            height: "3px",
                            bgcolor: "secondary.main",
                            margin: "12px auto 0",
                            borderRadius: "2px",
                        }
                    }}>
                        Our Best Picks
                    </Typography>


                    <Fade in={visible} timeout={300}>
                        <Grid container spacing={{ xs: 2, sm: 3, md: 4 }} justifyContent="center">
                            {currentBooks.map((book) => (
                                <Grid
                                    item
                                    key={book.id}
                                    xs={6}
                                    sm={4}
                                    md={3}
                                    lg={2.4}
                                >
                                    <Box
                                        onClick={() => {
                                            localStorage.setItem("selectedProduct", JSON.stringify(book));
                                            navigate(`/shop/${book.id}`);
                                        }}
                                        sx={{
                                            cursor: "pointer",
                                            textAlign: "center",
                                            position: "relative",
                                            transition: "all 0.3s",
                                            "&:hover": { transform: "translateY(-6px)" },
                                            "&:hover .cart-btn": { opacity: 1 },
                                        }}
                                    >

                                        <Box
                                            sx={{
                                                position: "absolute",
                                                top: 6,
                                                left: 6,
                                                zIndex: 2,
                                                bgcolor: "secondary.main",
                                                color: "#000",
                                                fontSize: { xs: "0.55rem", sm: "0.65rem" },
                                                fontWeight: 700,
                                                px: 1,
                                                py: 0.3,
                                                borderRadius: "4px",
                                                display: "flex",
                                                alignItems: "center",
                                                gap: 0.3,
                                            }}
                                        >
                                            <StarIcon sx={{ fontSize: "0.7rem" }} /> BEST
                                        </Box>


                                        <Box
                                            className="cart-btn"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                dispatch(addToCart(book));
                                            }}
                                            sx={{
                                                position: "absolute",
                                                top: 6,
                                                right: 6,
                                                zIndex: 2,
                                                bgcolor: "secondary.main",
                                                borderRadius: "4px",
                                                p: 0.5,
                                                opacity: { xs: 1, md: 0 }, 
                                                transition: "opacity 0.2s",
                                                display: "flex",
                                            }}
                                        >
                                            <ShoppingCartIcon sx={{ fontSize: "1rem", color: "#000" }} />
                                        </Box>



                                        <Box
                                            component="img"
                                            src={book.image}
                                            alt={book.title}
                                            sx={{
                                                width: "100%",
                                                height: { xs: 160, sm: 200, md: 220 },
                                                objectFit: "cover",
                                                borderRadius: "6px",
                                                boxShadow: "0 6px 20px rgba(0,0,0,0.2)",
                                            }}
                                        />


                                        <Typography
                                            variant="body1"
                                            fontWeight={700}
                                            sx={{
                                                mt: 1,
                                                fontSize: { xs: "0.8rem", sm: "0.95rem" },
                                            }}
                                        >
                                            {book.title}
                                        </Typography>


                                        <Typography
                                            variant="body2"
                                            sx={{
                                                fontSize: { xs: "0.7rem", sm: "0.85rem" },
                                                color: "text.secondary",
                                            }}
                                        >
                                            {book.author.name}
                                        </Typography>
                                    </Box>
                                </Grid>
                            ))}
                        </Grid>
                    </Fade>


                    {totalPages > 1 && (
                        <Box display="flex" justifyContent="center" alignItems="center" gap={2} mt={5}>
                            <Button onClick={handlePrev} sx={{ minWidth: 0, p: 1, color: "#666" }}>
                                <ArrowBackIosIcon fontSize="small" />
                            </Button>
                            {Array.from({ length: totalPages }).map((_, i) => (
                                <Box
                                    key={i}
                                    onClick={() => setCarouselIndex(i)}
                                    sx={{
                                        width: i === carouselIndex ? 20 : 10,
                                        height: 10,
                                        borderRadius: i === carouselIndex ? "5px" : "50%",
                                        bgcolor: i === carouselIndex ? "secondary.main" : "#ccc",
                                        cursor: "pointer",
                                        transition: "all 0.3s",
                                    }}
                                />
                            ))}
                            <Button onClick={handleNext} sx={{ minWidth: 0, p: 1, color: "#666" }}>
                                <ArrowForwardIosIcon fontSize="small" />
                            </Button>
                        </Box>
                    )}



                </Container>
            </Box>



            <Box sx={{ bgcolor: "#111", py: { xs: 6, md: 8 }, px: 2 }}>
                <Container maxWidth="lg">
                    <Grid container spacing={4} alignItems="center">
                        <Grid item xs={12} md={5}>
                            <Box sx={{
                                bgcolor: "#1a1a1a",
                                borderRadius: "12px",
                                height: "220px",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                border: "1px solid rgba(204,150,0,0.3)",
                                px: 3
                            }}>
                                <Typography variant="h5" color="secondary.main" fontWeight={700} align="center">
                                    FIND MAGIC WITHIN THE PAGES
                                </Typography>
                            </Box>
                        </Grid>

                        <Grid item xs={12} md={7}>
                            <Typography variant="h4" color="primary.main" fontWeight={400} gutterBottom>
                                Your favourite{" "}
                                <Box component="span" color="secondary.main" fontWeight={700}>Reads</Box>
                                <br />Are Here!
                            </Typography>
                            <Typography variant="body2" color="rgba(255,255,255,0.7)" sx={{ mb: 3, lineHeight: 1.8 }}>
                                Buy your favorite books online with ease! Enjoy exclusive offers and discounts on selected
                                titles. Dive into our collection and find special deals that make reading more affordable.
                                Shop now and unlock more savings with every purchase!
                            </Typography>

                            {/* Stats */}
                            <Grid container spacing={3} sx={{ mb: 3 }}>
                                {[
                                    { value: 800, suffix: "+", label: "Book Listing" },
                                    { value: 1000, suffix: "+", label: "Registered Members" },
                                    { value: 50, suffix: "+", label: "Branch Count" },
                                ].map((stat) => (
                                    <Grid item xs={4} key={stat.label}>
                                        <Typography variant="h5" color="secondary.main" fontWeight={700}>
                                            <AnimatedCounter target={stat.value} suffix={stat.suffix} />
                                        </Typography>
                                        <Typography variant="caption" color="rgba(255,255,255,0.5)">
                                            {stat.label}
                                        </Typography>
                                    </Grid>
                                ))}
                            </Grid>

                            <Button
                                variant="outlined"
                                color="secondary"
                                onClick={() => navigate("/shop")}
                                sx={{
                                    textTransform: "capitalize",
                                    borderRadius: "8px",
                                    px: 3, py: 1,
                                    "&:hover": { bgcolor: "secondary.main", color: "#000" },
                                    transition: "all 0.3s",
                                }}
                            >
                                Explore More
                            </Button>
                        </Grid>
                    </Grid>
                </Container>
            </Box>
        </Box>
    );
}

export default Home;