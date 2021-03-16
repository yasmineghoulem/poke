import { Module, HttpModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { PokemonModule } from './pokemon/pokemon.module';
import { StatsModule } from './stats/stats.module';
import { UserModule } from './user/user.module';
@Module({
  imports: [
    UserModule,
    StatsModule,
    PokemonModule,
    MongooseModule.forRoot('mongodb://localhost/pokemon'),
    HttpModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
