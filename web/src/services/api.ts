const API_DOMAIN = "192.168.10.18";
const PORT = "8080";
const PROTOCOL = "http://";

export function apiHTTPURL(path: string){
    return `${PROTOCOL}${API_DOMAIN}:${PORT}${path}`;
}

export async function apiGet(path: string) {
    return await fetch(apiHTTPURL(path));
}

export async function apiPost(path: string, data?: {}) {
    return await fetch(apiHTTPURL(path), {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data)
    });
}

export function apiResourceUrl(path: string) {
    return apiHTTPURL(path);
}

export function apiWebSocketUrl(path: string) {
    return `ws://${API_DOMAIN}:${PORT}${path}`;
}

export async function apiPostFormData(path: string, body: FormData) {
    return await fetch(apiHTTPURL(path), {
        method: "POST",
        body: body
    });
}

