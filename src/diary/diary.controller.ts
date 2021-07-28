import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { DiaryService } from './diary.service';
import { CreateDiaryDto } from './dto/create-diary.dto';
import { UpdateDiaryDto } from './dto/update-diary.dto';

@Controller('api/diary')
export class DiaryController {
  constructor(private readonly diaryService: DiaryService) { }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    return await this.diaryService.find(id);
  }

  @Post()
  create(@Body() createData: CreateDiaryDto) {
    return this.diaryService.create(createData);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateData: UpdateDiaryDto) {
    return this.diaryService.update(id, updateData);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.diaryService.remove(id);
  }
}
