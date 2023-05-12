import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as fs from 'fs';
import { Repository } from 'typeorm';

import { UserEntity } from '@entities/user';
import { UserService } from '@shared/user/services';

import * as PDFDocument from 'pdfkit';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class PdfService {
  constructor(
    @InjectRepository(UserEntity)
    private _userRepository: Repository<UserEntity>,
    private readonly _userService: UserService,
  ) {}

  async generatePdf(email: string): Promise<any> {
    const user = await this._userService.findByEmail(email);

    if (!user.image) {
      return new NotFoundException('Image does not exist');
    }

    const doc = new PDFDocument({ size: 'A4' });

    const pdfName: string = uuidv4();

    const file: string = `pdf/${pdfName}.pdf`;
    const stream = fs.createWriteStream(file);

    doc.pipe(stream);
    doc.text(`${user.lastName} ${user.firstName}`);
    doc.image(user.image, {
      fit: [250, 300],
      align: 'center',
      valign: 'center',
    });
    doc.end();

    await new Promise((resolve: any) => {
      stream.on('finish', () => {
        resolve();
      });
    });

    await this._userRepository.update({ email }, { pdf: Buffer.from(fs.readFileSync(file)).toString('binary') });
  }
}
