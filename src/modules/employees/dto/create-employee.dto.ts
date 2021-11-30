import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsOptional, IsString, Length ,IsEnum, IsDate, IsNumber} from 'class-validator';
import { ObjectID } from 'mongodb';
import { Transform,Type } from 'class-transformer';

enum Status {
    Engineer = 'Engineer',
    Technician = 'Technician',
  }

export class CreateEmployeeDto {
 
    @ApiProperty()
    @IsString()
    readonly name: string;

    @ApiProperty()
    @IsString()
    lastname: string;

    @IsNotEmpty()
    @ApiProperty()
    @IsEmail()
    readonly email: string;

    @ApiProperty()
    @IsString()
    telephone: string;
   
    @ApiProperty()
     avatar: string;
     
     @IsNotEmpty()
    @IsEnum(Status, {
        message: 'Status must be either Engeneer or Technician',
    })
    @ApiProperty()
    readonly status: Status;
   

    

    
}
