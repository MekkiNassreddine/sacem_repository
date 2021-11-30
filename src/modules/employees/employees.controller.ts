import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile, Put } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBody } from '@nestjs/swagger';
import { EmployeesService } from './employees.service';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { Repository, SimpleConsoleLogger } from 'typeorm';
import { Employee } from './entities/employee.entity';
import { ValidateObjectIdPipe } from 'src/shared/pipes';
import { findByField } from 'src/shared/findByField.utils';
import { InjectRepository } from '@nestjs/typeorm';
import { ObjectID } from 'mongodb';
import { EmployeeStatus } from './interfaces/employeeStatus';
import { uploadFile } from 'src/shared/file-upload.utils';
import { validateImages } from 'src/shared/filters.utils';



@Controller('employees')
export class EmployeesController {
  constructor(
    @InjectRepository(Employee)
    private readonly employeeRepository: Repository<Employee>,
    private readonly employeesService: EmployeesService
   ) 
    {}


    
  
  
  @Post('add')
 @UseInterceptors(FileInterceptor('avatar'))
  @ApiBody({ type: CreateEmployeeDto })
  async create(@Body() createEmployeeDto: CreateEmployeeDto,@UploadedFile() image) {
    if (image) {
      validateImages(image);
      createEmployeeDto.avatar = await uploadFile(image);
    }
    return await this.employeesService.create(createEmployeeDto);
  }

  @Get('all')
  findAll() {
    return this.employeesService.findAll();
  }

  @Get('one/:id')
  @ApiBody({ description: 'id', required: true })
  async findOne(@Param(new ValidateObjectIdPipe('Employee')) params): Promise<Employee>  {
    return await findByField(this.employeeRepository, { _id: params.id }, true);
  }

  @Put('update/:id')
  @UseInterceptors(FileInterceptor('avatar'))
  @ApiBody({ type: UpdateEmployeeDto })
  async update(@Param(new ValidateObjectIdPipe('Employee')) params,
  @Body() employeeData: UpdateEmployeeDto,@UploadedFile() image) {
    const toUpdate = await findByField(this.employeeRepository, { _id: params.id }, true);
    if (image) {
      validateImages(image);
      employeeData.avatar = await uploadFile(image);
    }
    console.log("employeeData.avatar : "+employeeData.avatar +" ")
    const updated = await this.employeeRepository.update(toUpdate, employeeData);
    return updated;
  }

  @Delete('delete/:id')
  async delete(@Param(new ValidateObjectIdPipe('Employee')) params) {
    return await this.employeesService.remove(new ObjectID(params.id));
  }

  @Get('by_name/:name')
  async findSchedule(@Param() params): Promise<EmployeeStatus> {
    console.log("dddddddddddddddddddd"+params.name);
    return await this.employeesService.getEmployeeByName(params.name);
  }

}
