import { SetMetadata } from '@nestjs/common';

export const IS_PUBLIC_KEY = 'isPublic';
export const AllowUnauthorized = () => SetMetadata(IS_PUBLIC_KEY, true);
