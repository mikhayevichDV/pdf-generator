import { AuthModule } from './auth';
import { ImageModule } from './image';
import { PdfModule } from './pdf';
import { RegisterModule } from './register';

export const APP_MODULES = [AuthModule, RegisterModule, ImageModule, PdfModule];
