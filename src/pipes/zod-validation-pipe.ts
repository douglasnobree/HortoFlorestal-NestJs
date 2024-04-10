import {
    PipeTransform,
    ArgumentMetadata,
    BadRequestException,
} from '@nestjs/common';
import { ZodError, ZodSchema } from 'zod';
import { fromZodError } from 'zod-validation-error';

export class ZodValidationPipe implements PipeTransform {
    constructor(private schema: ZodSchema) {}

    transform(value: unknown, metadata: ArgumentMetadata) {
        console.log('Validando dados recebidos')
        console.log(value)
        try {
            this.schema.parse(value);
        } catch (error) {
            if (error instanceof ZodError) {
                throw new BadRequestException({
                    message: 'Validation Type failed',
                    statuscode: 400,
                    errors: fromZodError(error),
                });
            }
            throw new BadRequestException('Validation failed');
        }
        return value;
    }
    
}
