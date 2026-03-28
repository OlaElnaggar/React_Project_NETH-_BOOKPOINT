import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";



export interface Product {
    id: number;
    title: string;
    price: number;
    original_price?: number;
    discount_percent?: number;
    image: string;
    description: string;
    about: string;
    type: string[];
    pages: number;
    rating: number;
    best_seller: boolean;
    in_stock: boolean;
    language?: string;
    publisher?: string;
    published_date?: string;
    isbn?: string;
    reviews_count?: number;
    author: {
        name: string;
        bio: string;
    };
}

interface BooksResponse {
    books: Product[];
}

export interface CartItem extends Product {
    qty: number;
}

interface ProductsState {
    productslist: Product[];
    cart: CartItem[];
    loading: boolean;
}


export const fetchProducts = createAsyncThunk<Product[]>(
    "products/fetchProducts",
    async () => {
        const res = await axios.get<BooksResponse>("/books.json");
        return res.data.books;
    }
);



const loadCart = (): CartItem[] => {
    try {
        const saved = localStorage.getItem("cart");
        return saved ? JSON.parse(saved) : [];
    } catch {
        return [];
    }
};

const initialState: ProductsState = {
    productslist: [],
    cart: loadCart(),
    loading: false,
};



const productsSlice = createSlice({
    name: "products",
    initialState,
    reducers: {
        addToCart: (state, action: PayloadAction<Product>) => {
            const product = action.payload;
            const exists = state.cart.find(item => item.id === product.id);
            if (exists) {
                exists.qty += 1;
            } else {
                state.cart.push({ ...product, qty: 1 });
            }
            localStorage.setItem("cart", JSON.stringify(state.cart));
        },

        removeFromCart: (state, action: PayloadAction<number>) => {
            state.cart = state.cart.filter(item => item.id !== action.payload);
            localStorage.setItem("cart", JSON.stringify(state.cart));
        },

        increaseQty: (state, action: PayloadAction<number>) => {
            const item = state.cart.find(i => i.id === action.payload);
            if (item) item.qty += 1;
            localStorage.setItem("cart", JSON.stringify(state.cart));
        },

        decreaseQty: (state, action: PayloadAction<number>) => {
            const item = state.cart.find(i => i.id === action.payload);
            if (item && item.qty > 1) item.qty -= 1;
            localStorage.setItem("cart", JSON.stringify(state.cart));
        },

        clearCart: (state) => {
            state.cart = [];
            localStorage.removeItem("cart");
        },
    },

    extraReducers: (builder) => {
        builder.addCase(fetchProducts.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(fetchProducts.fulfilled, (state, action) => {
            state.productslist = action.payload;
            state.loading = false;
        });
        builder.addCase(fetchProducts.rejected, (state) => {
            state.loading = false;
            console.error("Error fetching products");
        });
    },
});

export const { addToCart, removeFromCart, increaseQty, decreaseQty, clearCart } = productsSlice.actions;
export default productsSlice.reducer;