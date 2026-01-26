import { Module } from '@nestjs/common';
import { HashingService } from './providers/hsahing.service';
@Module({
  providers: [HashingService],
  exports: [HashingService],
})
export class CommonModule {}
