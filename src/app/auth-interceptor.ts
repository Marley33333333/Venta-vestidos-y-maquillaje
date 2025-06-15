import { HttpInterceptorFn } from '@angular/common/http';
import { HttpRequest, HttpHandlerFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req: HttpRequest<any>, next: HttpHandlerFn) => {
    const token = localStorage.getItem('token');
    if (token && req.url.includes('/api/v1')) {
        const cloned = req.clone({
            setHeaders: {
                Authorization: `Bearer ${token.trim()}`,
                'Content-Type': 'application/json'
            }
        });
        return next(cloned);
    }
    console.log('Interceptor: No token, proceeding without Authorization'); // Debug
    return next(req);
};