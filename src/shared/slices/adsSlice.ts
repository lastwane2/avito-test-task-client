import { API_URL } from '@/shared/api/constants';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios';

interface AdsFilters {
    status?: string;
    categoryId?: string;
    minPrice?: string;
    maxPrice?: string;
    search?: string;
    page?: number;
    limit?: number;
    sortBy?: string;
    sortOrder?: string;
}

interface IAd {
    id: number;
    title: string;
    price: number;
    category: string;
    status: "pending" | "approved" | "rejected" | "draft";
    createdAt: string;
    images: string[];
    description?: string;
    categoryId?: number;
    updatedAt?: string;
    seller?: any;
    characteristics?: any;
    moderationHistory?: any[];
}

export const getAds = createAsyncThunk(
    "ads/getAds",
    async (filters : AdsFilters) => {
        const response = await axios.get(`${API_URL}/ads`, {
            params: filters
        })
        return response.data
    }
)

export const getAdById = createAsyncThunk(
    "ads/getAdById",
    async (id: string) => {
        const response = await axios.get(`${API_URL}/ads/${id}`)
        return response.data
    }
)


const adsSlice = createSlice({
    name: "ads",
    initialState: {
        items: [] as IAd[],
        loading: false,
        currentAd: null,
        currentAdLoading: false,
        pagination: {
            currentPage: 1,
            totalPages: 1,
            totalItems: 0,
            itemsPerPage: 10
        },

    },
    reducers: {
        setPage: (state, action) => {
            state.pagination.currentPage = action.payload
        },

    },
    extraReducers: (builder) => {
        builder
            .addCase(getAds.pending, (state) => {
                state.loading = true
            })
            .addCase(getAds.fulfilled, (state, action) => {
                state.loading = false
                state.items = action.payload.ads
                state.pagination = action.payload.pagination
            })
            .addCase(getAds.rejected, (state) => {
                state.loading = false
            })
            
            .addCase(getAdById.pending, (state) => {
                state.currentAdLoading = true
            })
            .addCase(getAdById.fulfilled, (state, action) => {
                state.currentAdLoading = false
                state.currentAd = action.payload
            })
            .addCase(getAdById.rejected, (state) => {
                state.currentAdLoading = false
                state.currentAd = null
            })
    }
})

export const { setPage } = adsSlice.actions
export default adsSlice.reducer