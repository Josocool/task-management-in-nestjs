import { Module } from '@nestjs/common';
import { HashingService } from '../common/provider/hsahing.service';
@Module({
  providers: [HashingService],
  exports: [HashingService],
})
export class CommonModule {}
