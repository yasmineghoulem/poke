import { Injectable, HttpService} from "@nestjs/common";
import { User, UserDocument } from './schemas/user.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Pokemon } from "../pokemon/schemas/pokemon.schema";
@Injectable()
export class UserService {
  constructor(
    private httpService: HttpService,
    @InjectModel('User')
    private readonly userModel: Model<UserDocument>,
  ) {}
  async findAll(): Promise<User[]> {
    return await this.userModel.find();
  }
  async findOne(user: User): Promise<User> {
    return await this.userModel.findOne({email: user.email});
  }
  async auth(email: string): Promise<User> {
    return await this.userModel.findOne({email});
  }
  async create(user: User): Promise<User> {
    const newUser = new this.userModel(user);
    return newUser.save();
  }
  async delete(_id: string): Promise<User>{
    return await this.userModel.findOneAndDelete({ _id })
  }
  async update(_id: string, body: User): Promise<User>{
    return await this.userModel.findOneAndUpdate({ _id }, body, { new: true })
  }
}
