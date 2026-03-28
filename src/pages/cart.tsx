import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../redux/store";
import {
    Box, Button, Container, Grid, Typography,
    Dialog, DialogContent, TextField, IconButton, Divider,
    Alert,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import LocalShippingOutlinedIcon from "@mui/icons-material/LocalShippingOutlined";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import PhoneOutlinedIcon from "@mui/icons-material/PhoneOutlined";
import CreditCardOutlinedIcon from "@mui/icons-material/CreditCardOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import cartsideimg from "../assets/cartSideimg.jpg";
import nobookimg from "../assets/nobook.png";
import CardCart from "../components/cartcard";
import { clearCart } from "../redux/redux";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";


const checkoutSchema = z.object({
    receiverName: z
        .string()
        .min(1,"Name is required")
        .min(3, " Name must be at least 3 characters"),
    billingAddress: z
        .string()
         .min(1,"Address is required")
        .min(5, " Address must be at least 5 characters"),
    sendingAddress: z
        .string()
         .min(1,"Sending address is required")
        .min(5, "Sending address must be at least 5 characters"),
    province: z
        .string()
         .min(1,"Province  is required")
        .min(2, "Province must be at least 2 characters"),
    contactNumber: z
        .string()
         .min(1,"Contact number is required")
        .regex(/^\+?[0-9]{7,15}$/, "Enter a valid contact number (7-15 digits)"),
    cardNumber: z
        .string()
         .min(1,"Card number is required")
        .regex(/^\d{16}$/, "Card number must be exactly 16 digits"),
});

type CheckoutFormData = z.infer<typeof checkoutSchema>;


export default function Cart() {
    const dispatch = useDispatch<AppDispatch>();
    const [checkoutOpen, setCheckoutOpen] = useState(false);
    const [submitted, setSubmitted] = useState(false);

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<CheckoutFormData>({
        resolver: zodResolver(checkoutSchema),
    });


    const cart = useSelector((state: RootState) => state.products.cart);
    const total = cart.reduce((acc, book) => acc + book.price * book.qty, 0);

    const navigate = useNavigate();


    const onSubmit = (_data: CheckoutFormData) => {
        setSubmitted(true);
        setTimeout(() => {
            setCheckoutOpen(false);
            setSubmitted(false);
            reset();
            dispatch(clearCart());
            navigate("/home");
        }, 2000);
    };


    return (
        <Box display="flex" sx={{ minHeight: "100vh", pt: { xs: "50px", md: "150px" } }} pb={"100px"}>

            <Box component="img" src={cartsideimg} width={"279px"} height={"784px"} display={{ xs: "none", md: "block" }} />

            <Container maxWidth="xl" sx={{ py: "40px", flex: 1 }}>
                <Typography variant="h3" align="center" gutterBottom sx={{
                    color: "warning.main",
                    fontWeight: 700,
                    mb: 4,
                    animation: "fadeIn 0.5s ease both",
                    "@keyframes fadeIn": { from: { opacity: 0 }, to: { opacity: 1 } },
                }}>
                    Your Cart Details
                </Typography>

                {cart.length > 0 ? (
                    <>
                        <Grid container spacing={3} justifyContent="center">
                            {cart.map((product, idx) => (
                                <Grid
                                    key={product.id}
                                    item xs={12} sm={6} md={4} lg={3}
                                    sx={{
                                        animation: "fadeInUp 0.4s ease both",
                                        animationDelay: `${idx * 0.08}s`,
                                        "@keyframes fadeInUp": {
                                            from: { opacity: 0, transform: "translateY(20px)" },
                                            to: { opacity: 1, transform: "translateY(0)" },
                                        },
                                    }}
                                >
                                    <CardCart product={product} />
                                </Grid>
                            ))}
                        </Grid>

                        <Box display="flex" flexDirection="column" alignItems="center" gap={2} mt={5}>
                            <Typography variant="h5" fontWeight={700} color="warning.main">
                                Total Price: Rs. {total.toFixed(2)}
                            </Typography>
                            <Button
                                variant="outlined"
                                color="secondary"
                                onClick={() => setCheckoutOpen(true)}
                                startIcon={<ShoppingCartOutlinedIcon />}
                                sx={{
                                    textTransform: "capitalize",
                                    width: "220px",
                                    height: "44px",
                                    color: "#000",
                                    fontWeight: 700,
                                    borderRadius: "8px",
                                    "&:hover": { bgcolor: "secondary.main", color: "#000" },
                                    transition: "all 0.3s",
                                }}
                            >
                                Proceed to Checkout
                            </Button>
                        </Box>
                    </>
                ) : (
                    <Box display="flex" flexDirection="column" alignItems="center" gap={2} mt={6}>
                        <Typography variant="h6" color="textSecondary" align="center">
                            No Books in Cart yet.
                        </Typography>
                        <Box component="img" src={nobookimg} sx={{ width: "336px", height: "240px", opacity: 0.7 }} />
                    </Box>
                )}
            </Container>

        
            <Dialog
                open={checkoutOpen}
                onClose={() => setCheckoutOpen(false)}
                PaperProps={{
                    sx: {
                        bgcolor: "#111",
                        borderRadius: "16px",
                        border: "1px solid rgba(204,150,0,0.3)",
                        color: "white",
                        minWidth: { xs: "90vw", sm: "540px" },
                        animation: "popIn 0.3s ease both",
                        "@keyframes popIn": {
                            from: { opacity: 0, transform: "scale(0.9)" },
                            to: { opacity: 1, transform: "scale(1)" },
                        },
                    }
                }}
            >
                <DialogContent sx={{ p: 4 }}>
                    <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
                        <Typography variant="h5" color="secondary.main" fontWeight={700}>
                            Checkout Details
                        </Typography>
                        <IconButton onClick={() => setCheckoutOpen(false)} sx={{ color: "white" }}>
                            <CloseIcon />
                        </IconButton>
                    </Box>

                    {submitted ? (
                        <Box textAlign="center" py={4}>
                            <Typography variant="h5" color="secondary.main" fontWeight={700}>
                                ✓ Order Placed!
                            </Typography>
                            <Typography color="rgba(255,255,255,0.7)" mt={1}>
                                Thank you for your purchase.
                            </Typography>
                        </Box>
                    ) : (
                
                        <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate>

                            
                            {Object.keys(errors).length > 0 && (
                                <Alert severity="error" sx={{ mb: 2, fontFamily: "Bona Nova, serif" }}>
                                    Please Enter Your Data.
                                </Alert>
                            )}

                            <Grid container spacing={2}>
                                {[
                                    { name: "receiverName",   label: "Receiver name",    icon: <PersonOutlineIcon sx={{ fontSize: 18 }} /> },
                                    { name: "billingAddress", label: "Billing Address",   icon: <HomeOutlinedIcon sx={{ fontSize: 18 }} /> },
                                    { name: "sendingAddress", label: "Sending Address",   icon: <LocalShippingOutlinedIcon sx={{ fontSize: 18 }} /> },
                                    { name: "province",       label: "Select Province",   icon: <LocationOnOutlinedIcon sx={{ fontSize: 18 }} /> },
                                    { name: "contactNumber",  label: "Contact Number",    icon: <PhoneOutlinedIcon sx={{ fontSize: 18 }} /> },
                                    { name: "cardNumber",     label: "Card Number",       icon: <CreditCardOutlinedIcon sx={{ fontSize: 18 }} /> },
                                ].map(field => {
                                    const fieldName = field.name as keyof CheckoutFormData;
                                    const errorMsg  = errors[fieldName]?.message;
                                    return (
                                        <Grid item xs={12} sm={6} key={field.name}>
                                            <TextField
                                                
                                                {...register(fieldName)}
                                                placeholder={field.label}
                                                fullWidth
                                                size="small"
                                                error={!!errorMsg}
                                                helperText={errorMsg}
                                                InputProps={{
                                                    startAdornment: (
                                                        <Box sx={{ mr: 1, color: "rgba(255,255,255,0.5)" }}>
                                                            {field.icon}
                                                        </Box>
                                                    ),
                                                }}
                                                sx={{
                                                    "& .MuiOutlinedInput-root": {
                                                        bgcolor: "rgba(255,255,255,0.07)",
                                                        borderRadius: "8px",
                                                        color: "white",
                                                        "& fieldset": { borderColor: "rgba(255,255,255,0.2)" },
                                                        "&:hover fieldset": { borderColor: "secondary.main" },
                                                        "&.Mui-focused fieldset": { borderColor: "secondary.main" },
                                                    },
                                                    "& input::placeholder": { color: "rgba(255,255,255,0.4)" },
                
                                                    "& .MuiFormHelperText-root": { color: "#f44336" },
                                                }}
                                            />
                                        </Grid>
                                    );
                                })}
                            </Grid>

                            <Divider sx={{ my: 3, borderColor: "rgba(255,255,255,0.1)" }} />

                            <Box display="flex" justifyContent="space-between" mb={3}>
                                <Typography color="rgba(255,255,255,0.6)">Total</Typography>
                                <Typography color="secondary.main" fontWeight={700}>Rs. {total.toFixed(2)}</Typography>
                            </Box>

                            <Grid container spacing={2}>
                                <Grid item xs={12} sm={6}>
                                    <Button
                                        fullWidth
                                        type="submit"          
                                        variant="contained"
                                        color="warning"
                                        sx={{ borderRadius: "8px", textTransform: "capitalize", fontWeight: 700, height: "44px" }}
                                    >
                                        Pay Now
                                    </Button>
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <Button
                                        fullWidth
                                        variant="outlined"
                                        onClick={() => setCheckoutOpen(false)}
                                        sx={{
                                            borderRadius: "8px", textTransform: "capitalize", height: "44px",
                                            borderColor: "rgba(255,255,255,0.3)", color: "white",
                                            "&:hover": { borderColor: "white" },
                                        }}
                                    >
                                        Close Checkout Page
                                    </Button>
                                </Grid>
                            </Grid>

                            <Typography variant="caption" color="error" display="block" align="center" mt={2}>
                                *Contact us to cancel your order
                            </Typography>
                        </Box>
                        // ─────────────────────────────────────────────────────
                    )}
                </DialogContent>
            </Dialog>
        </Box>
    );
}



