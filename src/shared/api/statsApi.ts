import { API_URL } from "@/shared/api/constants";
import axios from "axios";


export const statsApi = {
    getSummary: (params?: {period?: string, startDate?: string, endDate?: string}) => 
        axios.get(`${API_URL}/stats/summary`, { params }),
    getActivity: (params?: {period?: string, startDate?: string, endDate?: string}) => 
        axios.get(`${API_URL}/stats/chart/activity`, { params }),
    getDecisions: (params?: {period?: string, startDate?: string, endDate?: string}) => 
        axios.get(`${API_URL}/stats/chart/decisions`, { params }),
    getCategories: (params?: {period?: string, startDate?: string, endDate?: string}) => 
        axios.get(`${API_URL}/stats/chart/categories`, { params })
}