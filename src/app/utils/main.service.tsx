import axios, { AxiosInstance, AxiosResponse } from 'axios';
import { API_URL } from '../../const';


// types.ts

export interface ApiResponse {
    data: any;
    status?: number;
    message?: string;
    isError: boolean;
}


const apiClient: AxiosInstance = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    }
});

const handleApiResponse = (response: AxiosResponse): ApiResponse => {
    return { 
        data: response.data, 
        status: response.status ,
        message: response.statusText,
        isError: false
    };
};

const handleApiError = (error: any): ApiResponse => {
    return { 
        data : null,
        message: error.response.data?.detail || 'Error desconocido', 
        status: error.response?.status, 
        isError: true
    };
};


export const getData = async (endpoint: string): Promise<ApiResponse > => {
    try {
        const response = await apiClient.get(endpoint);
        return handleApiResponse(response);
    } catch (error) {
        return handleApiError(error);
    }
};

export const postData = async (endpoint: string, data: any): Promise<ApiResponse> => {
    try {
        const response = await apiClient.post(endpoint, data);
        return handleApiResponse(response);
    } catch (error:any) {
        
        return handleApiError(error);
    }
};