import { AdminInfoDashboard } from "../types/AdminInterfaces";
import { ApiResponse, getData } from "../utils/main.service";

export async function get_data_admin(): Promise<ApiResponse<AdminInfoDashboard>>{
    return await getData('admin/info_dashboard');
}