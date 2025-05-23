import axios, {  AxiosResponse } from 'axios';
import { API_URL } from '../../const';
import { getUserLocale } from './StorageUser';



export interface ApiResponse<T> {
    data: T;
    status?: number;
    message?: string;
    isError: boolean;
}

export interface ListDataResponse<T>{
    data : T[]
    limit: number
    skip: number
    total: number
}

const apiClient =  (token : string) =>  { 
    return  axios.create({
        baseURL: API_URL,
        headers: {
            'Content-Type': 'application/json',
            'X-Token': 'Token '+ token
        }
    });
}

const apiClientFormData = (token:string) => {
    return axios.create({
        baseURL: API_URL,
        headers: {
            'Content-Type': 'multipart/form-data',
            'X-Token': 'Token '+ token
        }
    });
}

const handleApiResponse = (response: AxiosResponse): ApiResponse<any> => {
    return { 
        data: response?.data, 
        status: response.status ,
        message: response.statusText,
        isError: false
    };
};

const handleApiError = (error: any): ApiResponse<any> => {
    return { 
        data : null,
        message: error.response?.data?.detail || 'Error desconocido', 
        status: error.response?.status, 
        isError: true
    };
};

export const getUrl = (endpoint: string): string => {
    return `${API_URL}${endpoint}`;
}


export const getData = async (endpoint: string, params:any = null): Promise<ApiResponse<any> > => {
    const user = getUserLocale();
    try {
        if (params != null) {
            const response = await apiClient(user.token?.token||'').get(
                endpoint,
                {
                    params: {
                        ...params
                    }
                }
            );
            return handleApiResponse(response);
        }else{
            const response = await apiClient(user.token?.token||'').get(endpoint);
            return handleApiResponse(response);
        }


    } catch (error) {
        return handleApiError(error);
    }
};





export const postData = async (endpoint: string, data: any): Promise<ApiResponse<any>> => {
    const user = getUserLocale();
    try {
        const response = await apiClient(user.token?.token||'').post(endpoint, data);
        return handleApiResponse(response);
    } catch (error:any) {
        
        return handleApiError(error);
    }
};

export const putDataFormData = async (endpoint: string, data: any): Promise<ApiResponse<any>> => {
    const user = getUserLocale();
    try {
        const response = await apiClientFormData(user.token?.token||'').put(endpoint, data);
        return handleApiResponse(response);
    } catch (error:any) {
        return handleApiError(error);
    }
}