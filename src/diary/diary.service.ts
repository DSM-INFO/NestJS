import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateDiaryDto } from './dto/create-diary.dto';
import { UpdateDiaryDto } from './dto/update-diary.dto';
import { Diary } from './entities/diary.entity';

@Injectable()
export class DiaryService {
  constructor(
    @InjectRepository(Diary) private diaryRepository: Repository<Diary>,
  ) { }

  async find(id: number): Promise<Diary> {
     const ID = await this.diaryRepository.findOne({ where: { id } });
    if(!ID) {
      throw new UnauthorizedException();
    }
    return this.diaryRepository.findOne({ id: id });
  }

  create(createData: CreateDiaryDto) {
    return this.diaryRepository.save(createData);
  }

  async update(id: string, updateData: UpdateDiaryDto): Promise<void> {
    await this.diaryRepository.update(id, updateData);
  }

  async remove(id: string): Promise<void> {
    await this.diaryRepository.delete(id);
  }
}
