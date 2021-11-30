import { Injectable, Scope } from '@nestjs/common';
import { DeleteResult, ObjectID, Repository } from 'typeorm';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { Employee } from './entities/employee.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { findByField } from 'src/shared/findByField.utils';
import { EmployeeStatus } from './interfaces/employeeStatus';


@Injectable({ scope: Scope.REQUEST })
export class EmployeesService {

   
  constructor(
    @InjectRepository(Employee)
    private readonly employeeRepository: Repository<Employee>,
  ) {}


  async create(createEmployeeDto: CreateEmployeeDto) {
    const newEmploye = Object.assign(new Employee(), createEmployeeDto);
    return await this.employeeRepository.save(newEmploye);
  }

  async findAll(): Promise<Employee[]>  {
    return await this.employeeRepository.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} employee`;
  }

  async update(toUpdate: Employee, updateEmployeeDto: UpdateEmployeeDto) {
    Object.assign(toUpdate, updateEmployeeDto);
    return await this.employeeRepository.save(toUpdate);
  }



  async remove(_id: ObjectID): Promise<DeleteResult>  {
    //const toDelete = await findByField(this.employeeRepository, { _id }, true);
    return await this.employeeRepository.delete({ _id });
  }

  async getEmployeeByName(name: string):Promise<EmployeeStatus>{
    const find= await this.employeeRepository.findOne({where:{"name":{$eq:name}}})
    console.log(" from service" +find);
    return await find;
  }
}


