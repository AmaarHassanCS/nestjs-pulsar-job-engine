import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma-clients/jobber-auth';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  async onModuleInit() {
    /**
     * this method will establish connection with database (it will
     * look for details inside schema.prisma file)
     */
    await this.$connect();
  }
}
