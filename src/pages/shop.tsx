import { Box, Checkbox, Container, FormControlLabel, Skeleton, Typography } from "@mui/material";
import Grid from '@mui/material/Grid';
import { useEffect, useState } from "react";
import { fetchProducts } from "../redux/redux";
import CardBook from "../components/card";
import { useSelector, useDispatch } from "react-redux";
import type { AppDispatch, RootState } from "../redux/store";
import { useSearchParams } from "react-router-dom";

const FILTER_TYPES = ["All", "Fiction", "Non-Fiction", "Fantasy", "Science Fiction", "Thriller", "Self-Help", "Biography", "History", "Classic", "Children"];

function Shop() {
  const dispatch = useDispatch<AppDispatch>();
  const [searchParams] = useSearchParams();
  const urlSearch = searchParams.get("search") || "";

  const { productslist, loading } = useSelector((state: RootState) => state.products);
  const [activeFilter, setActiveFilter] = useState("All");

  useEffect(() => { dispatch(fetchProducts()); }, [dispatch]);

  
  const filtered = productslist.filter(p => {
    const matchesType = activeFilter === "All" || p.type.includes(activeFilter);
    const matchesSearch = urlSearch
      ? p.title.toLowerCase().includes(urlSearch.toLowerCase()) ||
      p.author.name.toLowerCase().includes(urlSearch.toLowerCase())
      : true;
    return matchesType && matchesSearch;
  });

  return (
    <Container maxWidth="xl" sx={{ margin: "auto", py: "100px" }}>
      <Typography
        variant="h3"
        color="secondary"
        align="center"
        gutterBottom
        sx={{
          mb: 5,
          animation: "fadeIn 0.6s ease both",
          "@keyframes fadeIn": { from: { opacity: 0, transform: "translateY(-10px)" }, to: { opacity: 1, transform: "translateY(0)" } },
        }}
      >
        Explore All Books Here
      </Typography>

      {urlSearch && (
        <Typography align="center" color="text.secondary" sx={{ mb: 2 }}>
          Showing results for: <strong>"{urlSearch}"</strong>
        </Typography>
      )}

      
      <Box sx={{
        display: "flex",
        flexWrap: "wrap",
        gap: 1,
        justifyContent: "center",
        mb: 4,
        px: 2,
      }}>
        {FILTER_TYPES.map(type => (
          <FormControlLabel
            key={type}
            control={
              <Checkbox
                checked={activeFilter === type}
                onChange={() => setActiveFilter(type)}
                size="small"
                sx={{
                  color: "#aaa",
                  "&.Mui-checked": { color: "secondary.main" },
                }}
              />
            }
            label={
              <Typography
                variant="body2"
                fontWeight={activeFilter === type ? 700 : 400}
                color={activeFilter === type ? "secondary.main" : "text.primary"}
                sx={{ transition: "color 0.2s" }}
              >
                {type}
              </Typography>
            }
            sx={{
              border: "1px solid",
              borderColor: activeFilter === type ? "secondary.main" : "#ddd",
              borderRadius: "8px",
              px: 1,
              py: 0.3,
              transition: "border-color 0.2s, background-color 0.2s",
              bgcolor: activeFilter === type ? "rgba(204,150,0,0.08)" : "transparent",
            }}
          />
        ))}
      </Box>

      
      <Grid container spacing={3} sx={{ p: 1 }} justifyContent="center">
        {loading ? (
          Array.from({ length: 8 }).map((_, idx) => (
            <Grid key={idx} item xs={12} sm={6} md={4} lg={3}>
              <Box sx={{ borderRadius: "12px", overflow: "hidden", p: 2, border: "1px solid #eee" }}>
                <Skeleton variant="rectangular" width="100%" height={200} sx={{ borderRadius: "8px" }} />
                <Skeleton variant="text" sx={{ mt: 1 }} />
                <Skeleton variant="text" width="60%" />
                <Skeleton variant="rectangular" height={32} sx={{ mt: 1, borderRadius: "6px" }} />
              </Box>
            </Grid>
          ))
        ) : filtered.length > 0 ? (
          filtered.map((product, idx) => (
            <Grid key={product.id} item xs={12} sm={6} md={4} lg={3} sx={{
              animation: `fadeInUp 0.4s ease both`,
              animationDelay: `${idx * 0.05}s`,
              "@keyframes fadeInUp": {
                from: { opacity: 0, transform: "translateY(20px)" },
                to: { opacity: 1, transform: "translateY(0)" },
              },
            }}>
              <CardBook product={product} />
            </Grid>
          ))
        ) : (
          <Grid item xs={12}>
            <Typography variant="h6" color="textSecondary" align="center">
              No books found for "{activeFilter !== "All" ? activeFilter : urlSearch}".
            </Typography>
          </Grid>
        )}
      </Grid>
    </Container>
  );
}

export default Shop;