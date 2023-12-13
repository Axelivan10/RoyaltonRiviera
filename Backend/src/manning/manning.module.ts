import { Module } from '@nestjs/common';
import { ManningService } from './manning.service';
import { ManningController } from './manning.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Manning } from './manning.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Manning])],
  providers: [ManningService],
  controllers: [ManningController]
})
export class ManningModule {}
