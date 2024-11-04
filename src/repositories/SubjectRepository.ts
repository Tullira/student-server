import { Prisma, Subject } from '@prisma/client';
import prisma from '@database';

class SubjectRepository {
  async create(data: Prisma.SubjectCreateInput): Promise<Subject> {
    const subject = await prisma.subject.create({ data });
    return subject;
  }

  async findById(id: string): Promise<Subject | null> {
    const subject = await prisma.subject.findUnique({ where: { id } });
    return subject;
  }

  async findAll(): Promise<Subject[] | null> {
    const subjects = await prisma.subject.findMany();
    return subjects as Subject[];
  }

  async update(id: string, data: Prisma.SubjectUpdateInput): Promise<Subject> {
    const subject = await prisma.subject.update({ where: { id }, data });
    return subject;
  }

  async delete(id: string): Promise<Subject> {
    const subject = await prisma.subject.delete({ where: { id } });
    return subject;
  }
}

export default new SubjectRepository();
