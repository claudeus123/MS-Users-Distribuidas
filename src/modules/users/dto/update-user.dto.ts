import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';

export class UpdateUserDto extends PartialType(CreateUserDto) {
    password?: string;
    city?: string;
    nickname?: string;
    first_name?: string;
    last_name?: string;
    // profile_image?: string;
}
