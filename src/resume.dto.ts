import { Optional } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsArray, IsString, Matches } from 'class-validator';
export class resumeDTO {
  @Matches(/^[a-zA-Z ]*$/, { message: 'name must be alphabets' }) 
  @IsString()
  name: string;
  @IsString()
  designation: string;
  @IsString()
  techSKils: string;
  @IsString()
  description: string;
  @IsString()
  experience: string;
  @IsArray()
  projects: [
    {
      title: string;
      duration: string;
      techStack: string;
      shortDescription: string;
    },
  ];
}
