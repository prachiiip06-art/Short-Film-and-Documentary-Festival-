import { prisma } from "./prisma";
import bcrypt from "bcryptjs";
import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";

const SECRET = new TextEncoder().encode(
  process.env.AUTH_SECRET || "fallback-dev-secret-change-me-in-production"
);

export async function hashPassword(password: string) {
  return bcrypt.hash(password, 12);
}

export async function verifyPassword(password: string, hash: string) {
  return bcrypt.compare(password, hash);
}

export async function createSession(userId: string) {
  const token = await new SignJWT({ userId })
    .setProtectedHeader({ alg: "HS256" })
    .setExpirationTime("7d")
    .setIssuedAt()
    .sign(SECRET);

  const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);

  await prisma.session.create({
    data: { userId, token, expiresAt }
  });

  cookies().set("session", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    expires: expiresAt,
    path: "/"
  });

  return token;
}

export async function getSession() {
  const token = cookies().get("session")?.value;
  if (!token) return null;

  try {
    const { payload } = await jwtVerify(token, SECRET);
    const userId = payload.userId as string;

    const session = await prisma.session.findUnique({
      where: { token },
      include: {
        user: {
          include: {
            roles: { include: { role: true } }
          }
        }
      }
    });

    if (!session || session.expiresAt < new Date() || !session.user.isActive) {
      return null;
    }

    return {
      user: session.user,
      roles: session.user.roles.map((ur) => ur.role.name)
    };
  } catch {
    return null;
  }
}

export async function destroySession() {
  const token = cookies().get("session")?.value;
  if (token) {
    await prisma.session.deleteMany({ where: { token } });
    cookies().delete("session");
  }
}

export async function requireAuth(allowedRoles?: string[]) {
  const session = await getSession();
  if (!session) {
    throw new Error("UNAUTHORIZED");
  }
  if (allowedRoles && allowedRoles.length > 0) {
    const hasRole = session.roles.some((r) => allowedRoles.includes(r));
    if (!hasRole && !session.roles.includes("SUPER_ADMIN")) {
      throw new Error("FORBIDDEN");
    }
  }
  return session;
}
