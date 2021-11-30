import { PartialType } from '@nestjs/mapped-types';
import { CreateEmployeeDto } from './create-employee.dto';

import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsOptional, IsString, Length ,IsEnum, IsDate, IsNumber} from 'class-validator';
import { ObjectID } from 'mongodb';
import { Transform,Type } from 'class-transformer';

enum Status {
    Engineer = 'Engineer',
    Technician = 'Technician',
  }

export class UpdateEmployeeDto extends PartialType(CreateEmployeeDto) {
    @ApiProperty()
    @IsString()
    readonly name: string;

    @ApiProperty()
    @IsString()
    lastname: string;


    @ApiProperty()
    @IsEmail()
    readonly email: string;

    @ApiProperty()
    @IsString()
    telephone: string;
   
    @ApiProperty()
    avatar: string;
     
    
    @IsEnum(Status, {
        message: 'Status must be either Engeneer or Technician',
    })
    @ApiProperty()
    readonly status: Status;
     
     
}
