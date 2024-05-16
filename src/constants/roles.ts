import { z } from 'zod';
import { Option } from '@/types/form';

const VALUES = ['Owner', 'Admin', 'User'] as const;

export const Roles = z.enum(VALUES);

export const ROLE_OPTIONS: Option[] = [
    {
        label: 'User',
        value: Roles.Enum.User,
    },
    {
        label: 'Admin',
        value: Roles.Enum.Admin,
    },
];
