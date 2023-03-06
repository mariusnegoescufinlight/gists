export interface ServiceResponse{
    status?: number;
    message?: string;
    body?: any;
}

export interface AlertInterface{
    show: boolean;
    type: 'error' | 'success';
    message: string;
}

export interface GithubUser{
    name: string;
    login: string;
    bio: string;
    avatar_url: string;
}

export interface Gist{
    id: string;
    created_at: string;
    files: GistFile[];
    forks_url: string;
    url: string;
}
export interface GistFile{
    filename: string;
    type: string;
    language: string;
    raw_url: string;
    badge: string;
    content: string;
}
