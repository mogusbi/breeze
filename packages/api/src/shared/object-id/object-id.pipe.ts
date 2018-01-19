import {NotFoundException, Pipe, PipeTransform} from '@nestjs/common';
import {Types} from 'mongoose';

@Pipe()
export class ObjectIdPipe implements PipeTransform<string> {
  public transform (value: string): string {
    if (Types.ObjectId.isValid(value)) {
      return value;
    }

    throw new NotFoundException();
  }
}
