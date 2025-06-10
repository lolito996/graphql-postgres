import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql'
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo'
import { join } from 'path';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { MoviesModule } from './movies/movies.module';
import { FunctionModule } from './functions/function.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      playground: true,
      introspection: true,

    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      /*host: process.env.DB_HOST,
      port: +!process.env.DB_PORT,
      database: process.env.DB_NAME,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,*/
      autoLoadEntities: true,
      synchronize: true,

      url: process.env.DATABASE_URL,

    }),
    AuthModule,
    UsersModule,
    MoviesModule,
    FunctionModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
