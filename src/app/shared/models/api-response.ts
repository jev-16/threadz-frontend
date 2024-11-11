export interface ApiResponse<T = any> {
    status: 'success' | 'error',
    data?: { [index: string]: T },
    
    // ERRORS
    message?: string,

}
