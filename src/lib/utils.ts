import { Roles } from '@/constants';
import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

type RouteParams = {
    [key: string]: string | number;
};

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export const applyRouteParams = (
    routeTemplate: string,
    params: RouteParams
): string => {
    return Object.keys(params).reduce((currentTemplate, key) => {
        return currentTemplate.replace(`{${key}}`, String(params[key]));
    }, routeTemplate);
};

export const isOwner = (role: string) => role === Roles.Enum.Owner;

export const isAdmin = (role: string) => role === Roles.Enum.Admin;
