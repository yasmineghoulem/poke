import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;



@Schema()
export class User {
  @Prop({type: String, required: true})
  name;
  @Prop({type: String, unique: true, required: true})
  email;
  @Prop({type: String, required: true})
  password;
}

export const UserSchema = SchemaFactory.createForClass(User);
