import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Find user profile by userId (Supabase user_id)
export const findUserProfileByUserId = async (userId: string) => {
  return await prisma.userProfile.findUnique({
    where: { userId },
  });
};

// Create a user profile
export const createUserProfile = async ({ userId }: { userId: string }) => {
  return await prisma.userProfile.create({
    data: {
      userId,
    },
  });
};
