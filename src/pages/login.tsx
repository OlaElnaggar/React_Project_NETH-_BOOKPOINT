import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Divider,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import AlternateEmailIcon from "@mui/icons-material/AlternateEmail";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, Link } from "react-router-dom";
import { z } from "zod";
import login_img from "../assets/login-img.jpg"

 

const loginSchema = z.object({
  email: z.string().min(1, "Email is required").email("Invalid email address"),
  password: z
    .string()
    .min(1, "Password is required")
    .min(6, "Minimum 6 characters"),
});
 
type LoginFormData = z.infer<typeof loginSchema>;
 

const GoogleIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24">
    <path
      fill="#4285F4"
      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
    />
    <path
      fill="#34A853"
      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
    />
    <path
      fill="#FBBC05"
      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"
    />
    <path
      fill="#EA4335"
      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
    />
  </svg>
);
 

const goldInputSx = {
  "& .MuiOutlinedInput-root": {
    backgroundColor: "#C8B560",
    borderRadius: "8px",
    color: "#2a1a00",
    fontFamily: "Bona Nova, serif",
    fontSize: "1rem",
    "& fieldset": { border: "1.5px solid #a8922a" },
    "&:hover fieldset": { borderColor: "#e0c040" },
    "&.Mui-focused fieldset": { borderColor: "#fff" },
  },
  "& .MuiInputLabel-root": {
    color: "#4B330B",
    fontFamily: "Bona Nova, serif",
    "&.Mui-focused": { color: "#2a1a00" },
  },
  "& .MuiSvgIcon-root": { color: "#4B330B" },
};
 

export default function Login() {
  const muiTheme = useTheme();
  const isMobile = useMediaQuery(muiTheme.breakpoints.down("md"));
 
  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
 
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    mode: "onChange",
  });
 
  const onSubmit = async (data: LoginFormData) => {
  try {
    setLoading(true);
    setServerError("");

    const usersRes = await axios.get("https://dummyjson.com/users");


    const user = usersRes.data.users.find(
      (u: any) => u.email === data.email
    );

    if (!user) {
      throw new Error("Email not found");
    }

    
    const res = await axios.post("https://dummyjson.com/auth/login", {
      username: user.username,
      password: data.password,
    });

    localStorage.setItem("token", res.data.token);
    reset();
    navigate("/home");

  } catch (error: any) {
    setServerError(error.message || "Login failed");
  } finally {
    setLoading(false);
  }
};
  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        bgcolor: "#111",
        px: { xs: 2, sm: 4 },
        py: { xs: 4, md: 0 },
      }}
    >
      
      <Box
        sx={{
          display: "flex",
          width: "100%",
          maxWidth: 1100,
          minHeight: { md: 520 },
          overflow: "hidden",
          boxShadow: "0 8px 60px rgba(154, 152, 152, 0.7)",
          bgcolor: "#000",
        }}
      >
      
        {!isMobile && (
          <Box
            sx={{
              width: "45%",
              flexShrink: 0,
              position: "relative",
              bgcolor: "#000",
              overflow: "hidden",
            }}
          >
            <Box
              component="img"
              src={login_img}
              alt="BookPoint illustration"
              sx={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                display: "block",
                opacity: 0.85,
              }}
            />
          </Box>
        )}
 
        
        <Box
          sx={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            px: { xs: 3, sm: 5, md: 6 },
            py: { xs: 5, md: 6 },
          }}
        >
          
          <Typography
            sx={{
              fontFamily: "Bona Nova, serif",
              fontWeight: 700,
              fontSize: { xs: "1.5rem", sm: "1.9rem", md: "2.1rem" },
              color: "#CC9600",
              textAlign: "center",
              mb: 1,
            }}
          >
            Welcome to Neth BookPoint!
          </Typography>
 
          
          <Typography
            sx={{
              fontFamily: "Bona Nova, serif",
              color: "#ccc",
              fontSize: { xs: "0.8rem", sm: "0.88rem" },
              textAlign: "center",
              mb: 3,
              lineHeight: 1.65,
            }}
          >
            Discover a seamless way to sell your books and unlock exclusive
            benefits. Enjoy a hassle-free experience, save valuable time, and
            take advantage of our amazing offers.
          </Typography>
 
          
          <Typography
            sx={{
              fontFamily: "Bona Nova, serif",
              fontWeight: 700,
              fontSize: { xs: "1.05rem", sm: "1.25rem" },
              color: "#CC9600",
              textAlign: "center",
              mb: 2.5,
            }}
          >
            Login to Your Account!
          </Typography>
 
          
          {serverError && (
            <Alert
              severity="error"
              sx={{ mb: 2, fontFamily: "Bona Nova, serif" }}
            >
              {serverError}
            </Alert>
          )}
 
          
          <TextField
            placeholder="Enter Email"
            fullWidth
            {...register("email")}
            error={!!errors.email}
            helperText={errors.email?.message}
            sx={{ ...goldInputSx, mb: 2 }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <AlternateEmailIcon />
                </InputAdornment>
              ),
            }}
            FormHelperTextProps={{
              sx: { color: "#ff8a65", fontFamily: "Bona Nova, serif" },
            }}
          />
 
        
          <TextField
            placeholder="Enter Password"
            type={showPassword ? "text" : "password"}
            fullWidth
            {...register("password")}
            error={!!errors.password}
            helperText={errors.password?.message}
            sx={{ ...goldInputSx, mb: 1 }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setShowPassword((p) => !p)}
                    edge="end"
                    size="small"
                    sx={{ color: "#4B330B" }}
                  >
                    {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
            FormHelperTextProps={{
              sx: { color: "#ff8a65", fontFamily: "Bona Nova, serif" },
            }}
          />
 
          
          <Box sx={{ textAlign: "right", mb: 2.5 }}>
            <Typography
              component={Link}
              to="/forgot-password"
              sx={{
                fontFamily: "Bona Nova, serif",
                color: "#ccc",
                fontSize: "0.85rem",
                textDecoration: "none",
                fontStyle: "italic",
                "&:hover": { color: "#CC9600" },
              }}
            >
              Forgot Password?
            </Typography>
          </Box>
 
          
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              flexWrap: "wrap",
              gap: 2,
              mb: 3,
            }}
          >
            <Button
              startIcon={<GoogleIcon />}
              sx={{
                fontFamily: "Bona Nova, serif",
                color: "#fff",
                textTransform: "none",
                fontSize: "0.95rem",
                px: 0,
                "&:hover": { bgcolor: "transparent", color: "#CC9600" },
              }}
              disableRipple
            >
              Login with Google
            </Button>
 
            <Button
              variant="contained"
              disabled={loading}
              onClick={handleSubmit(onSubmit)}
              sx={{
                fontFamily: "Bona Nova, serif",
                fontWeight: 700,
                fontSize: "1rem",
                letterSpacing: "0.12em",
                bgcolor: "#CC9600",
                color: "#1a0e00",
                px: 4,
                py: 1.2,
                borderRadius: "8px",
                boxShadow: "0 4px 20px rgba(204,150,0,0.35)",
                "&:hover": {
                  bgcolor: "#e0aa00",
                  boxShadow: "0 6px 24px rgba(204,150,0,0.55)",
                },
                "&.Mui-disabled": { bgcolor: "#7a5a00", color: "#555" },
              }}
            >
              {loading ? (
                <CircularProgress size={22} sx={{ color: "#1a0e00" }} />
              ) : (
                "LOGIN"
              )}
            </Button>
          </Box>
 
          
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1.5,
              flexWrap: "wrap",
            }}
          >
            <Divider sx={{ flex: 1, borderColor: "#333" }} />
            <Typography
              sx={{
                fontFamily: "Bona Nova, serif",
                color: "#ccc",
                fontSize: "0.85rem",
                whiteSpace: "nowrap",
              }}
            >
              Don't you have an account?
            </Typography>
            <Typography
              component={Link}
              to="/register"
              sx={{
                fontFamily: "Bona Nova, serif",
                color: "#CC9600",
                fontSize: "0.85rem",
                fontWeight: 700,
                textDecoration: "underline",
                whiteSpace: "nowrap",
                "&:hover": { color: "#e0aa00" },
              }}
            >
              Create an account
            </Typography>
            <Divider sx={{ flex: 1, borderColor: "#333" }} />
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
 