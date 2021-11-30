import { Entity, Column, ObjectIdColumn, Index, Unique, BeforeInsert } from 'typeorm';
import { ObjectID } from 'mongodb';

import { transformEntity } from 'src/shared/transformEntity.utlis';
import { Transform } from 'class-transformer';
import { IsEmail } from 'class-validator';

enum Status {
  Engineer = 'Engineer',
  Technician = 'Technician',
}

@Entity('employee')
export class Employee {
    @Transform(transformEntity)
    @ObjectIdColumn()
    _id: ObjectID;

    @Column()
    name: string;

    @Column()
    lastname: string;
 
    @Column()
    @IsEmail()
    @Index({ unique: true })
    email: string;

    @Column()
    telephone: string;

    @Column()
    avatar: string;
    
    @Column("enum", { enum: Status })
    status: Status;

    @Column()
    @Index({ unique: true })
    createdAt: Date;

    @BeforeInsert()
    private beforeInsertActions() {
      this.createdAt = new Date();
    }
}
