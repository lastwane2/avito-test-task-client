import { API_URL } from "@/shared/api/constants";
import { IrejectOrRequest } from "@/shared/types";
import axios from "axios";


export const adsApi = {
  approveAd: (id: string) => axios.post(`${API_URL}/ads/${id}/approve`),
  rejectAd: ({id, data}: {id: string; data: IrejectOrRequest}) => axios.post(`${API_URL}/ads/${id}/reject`, data),
  requestChanges: ({id, data}: {id: string; data: IrejectOrRequest}) => axios.post(`${API_URL}/ads/${id}/request-changes`, data),
};