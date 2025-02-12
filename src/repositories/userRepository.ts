import { Prisma, User } from '@prisma/client';
import prisma from '@database';

class UserRepository {
  async create(data: Prisma.UserCreateInput): Promise<User> {
    const user = await prisma.user.create({ data });
    return user;
  }

  async findById(id: string): Promise<User | null> {
    const user = await prisma.user.findUnique({ where: { id } });
    return user;
  }

  async findAll(): Promise<User[] | null> {
    const users = await prisma.user.findMany();
    return users as User[];
  }

  async update(id: string, data: Prisma.UserUpdateInput): Promise<User> {
    const user = await prisma.user.update({ where: { id }, data });
    return user;
  }

  async delete(id: string): Promise<User> {
    const user = await prisma.user.delete({ where: { id } });
    return user;
  }
}

export default new UserRepository();
