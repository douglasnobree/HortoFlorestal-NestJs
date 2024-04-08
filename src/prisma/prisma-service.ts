import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService
    extends PrismaClient
    implements OnModuleDestroy, OnModuleInit
{
    public client: PrismaClient | undefined;

    constructor() {
        super({
            log: ['warn', 'error'],
        });
    }
    onModuleDestroy() {
        this.$disconnect();
    }
    onModuleInit() {
        this.$connect();
    }
}
