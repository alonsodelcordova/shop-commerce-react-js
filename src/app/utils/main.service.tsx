import axios, { AxiosInstance, AxiosResponse } from 'axios';
import { API_URL } from '../../const';


// types.ts

export interface ApiResponse<T> {
    data: T;
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

const apiClientFormData: AxiosInstance = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'multipart/form-data',
    }
});

const handleApiResponse = (response: AxiosResponse): ApiResponse<any> => {
    return { 
        data: response.data, 
        status: response.status ,
        message: response.statusText,
        isError: false
    };
};

const handleApiError = (error: any): ApiResponse<any> => {
    return { 
        data : null,
        message: error.response.data?.detail || 'Error desconocido', 
        status: error.response?.status, 
        isError: true
    };
};

export const getUrl = (endpoint: string): string => {
    return `${API_URL}${endpoint}`;
}


export const getData = async (endpoint: string, params:any[] = []): Promise<ApiResponse<any> > => {
    try {
       
        if (params.length > 0) {
            const response = await apiClient.get(
                endpoint,
                {
                    params: {
                        ...params
                    }
                }
            );
            return handleApiResponse(response);
        }else{
            const response = await apiClient.get(endpoint);
            return handleApiResponse(response);
        }


    } catch (error) {
        return handleApiError(error);
    }
};





export const postData = async (endpoint: string, data: any): Promise<ApiResponse<any>> => {
    try {
        const response = await apiClient.post(endpoint, data);
        return handleApiResponse(response);
    } catch (error:any) {
        
        return handleApiError(error);
    }
};

export const putDataFormData = async (endpoint: string, data: any): Promise<ApiResponse<any>> => {
    try {
        const response = await apiClientFormData.put(endpoint, data);
        return handleApiResponse(response);
    } catch (error:any) {
        return handleApiError(error);
    }
}