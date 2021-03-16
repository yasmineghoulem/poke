import { Controller, Get } from "@nestjs/common";
import { StatsService } from './stats.service';

@Controller('stats')
export class StatsController {
  constructor(private readonly statsService: StatsService) {}
  @Get('/ability')
  async getMostUsedAbility(): Promise<object[]> {
    return await this.statsService.getMostUsedAbility();
  }
  @Get('/avg')
  async getAvg(): Promise<object> {
    return await this.statsService.getAvg();
  }
}
