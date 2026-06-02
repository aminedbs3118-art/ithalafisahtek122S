import { currentUser } from "@clerk/nextjs/server";
import { db } from "./prisma";

export const checkUser = async () => {
  const user = await currentUser();

  if (!user) {
    return null;
  }

  try {
    // البحث عن المستخدم
    let loggedInUser = await db.user.findUnique({
      where: {
        clerkUserId: user.id,
      },
      include: {
        transactions: {
          where: {
            type: "CREDIT_PURCHASE",
            createdAt: {
              gte: new Date(
                new Date().getFullYear(),
                new Date().getMonth(),
                1
              ),
            },
          },
          orderBy: {
            createdAt: "desc",
          },
          take: 1,
        },
      },
    });

    // إذا المستخدم موجود
    if (loggedInUser) {
      return loggedInUser;
    }

    // إنشاء مستخدم جديد
    const name =
      `${user.firstName || ""} ${user.lastName || ""}`.trim() ||
      "مستخدم جديد";

   loggedInUser = await db.user.upsert({
  where: {
    email: user.emailAddresses?.[0]?.emailAddress,
  },

  update: {
    clerkUserId: user.id,
    imageUrl: user.imageUrl || "",
  },

  create: {
    clerkUserId: user.id,
    name,
    email:
      user.emailAddresses?.[0]?.emailAddress || "noemail@example.com",
    imageUrl: user.imageUrl || "",
    role: "UNASSIGNED",
    credits: 0,

    transactions: {
      create: {
        type: "CREDIT_PURCHASE",
        packageId: "free_user",
        amount: 0,
      },
    },
  },
});

    return loggedInUser;
  } catch (error) {
    console.error("CHECK USER ERROR:", error);

    return null;
  }
};