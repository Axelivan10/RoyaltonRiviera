import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { ManningModule } from './manning/manning.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'axelivan',
    password: 'Axel12345@2023',
    database: 'nestjs',
    entities: [__dirname + '/**/*.entity{.ts,.js}'],
    synchronize: true
  }),
    UsersModule,
    AuthModule,
    ManningModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
