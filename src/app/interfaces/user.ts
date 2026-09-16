export interface User {
    id?: string; 
    first_name: string;
    last_name: string;
    username: string;
    email: string;
    image: string;
}

export interface UserResponse {
    page: number;
    per_page: number;
    total: number;
    total_pages: number;
    results: User[];
}