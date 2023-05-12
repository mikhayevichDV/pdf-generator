import { applyDecorators, UseGuards } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';

import { JwtAuthGuard } from '../guards';

export const IsAuthenticated = (): MethodDecorator => applyDecorators(ApiBearerAuth(), UseGuards(JwtAuthGuard));
