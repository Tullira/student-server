import { Prisma, UserOnSubject } from '@prisma/client';
import prisma from '../database';

class UserOnSubjectRepository {
  async create(data: Prisma.UserOnSubjectCreateInput): Promise<UserOnSubject> {
    const userOnSubject = await prisma.userOnSubject.create({ data });
    return userOnSubject;
  }

  async findByIds(userId: string, subjectId: string): Promise<UserOnSubject | null> {
    const userOnSubject = await prisma.userOnSubject.findUnique({
      where: {
        userId_subjectId: {
          userId,
          subjectId,
        },
      },
    });
    return userOnSubject;
  }

  async findByUserId(userId: string): Promise<UserOnSubject[]> {
    const userOnSubject = await prisma.userOnSubject.findMany({
      where: {
        userId,
      },
    });
    return userOnSubject;
  }

  async findBySubjectId(subjectId: string): Promise<UserOnSubject[]> {
    const userOnSubject = await prisma.userOnSubject.findMany({
      where: {
        subjectId,
      },
    });
    return userOnSubject;
  }

  async update(userId: string, subjectId: string, data: Prisma.UserOnSubjectUpdateInput): Promise<UserOnSubject> {
    const userOnSubject = await prisma.userOnSubject.update({
      where: {
        userId_subjectId: {
          userId,
          subjectId,
        },
      },
      data,
    });
    return userOnSubject;
  }

  async delete(userId: string, subjectId: string): Promise<UserOnSubject> {
    const userOnSubject = await prisma.userOnSubject.delete({
      where: {
        userId_subjectId: {
          userId,
          subjectId,
        },
      },
    });
    return userOnSubject;
  }

  async findAll(): Promise<UserOnSubject[]> {
    const userOnSubject = await prisma.userOnSubject.findMany();
    return userOnSubject;
  }
}

export default new UserOnSubjectRepository();
