import { prisma } from "@/lib/prisma";
import { hashPassword } from "@/lib/auth-utils";
import { NextResponse } from "next/server";
import { z } from "zod";

const registerSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6), // REMEMBER: Use 6+ characters when testing!
  role: z.enum(["ADMIN", "USER"]).optional(),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    
    // Validate inputs
    const { email, password, role } = registerSchema.parse(body);

    // Check if user exists
    const exists = await prisma.user.findUnique({ 
      where: { email } 
    });
    
    if (exists) {
      return NextResponse.json({ error: "User already exists" }, { status: 400 });
    }

    // Hash password
    const hashed = await hashPassword(password);

    // CRITICAL: Save to Database
    const user = await prisma.user.create({
      data: { 
        email, 
        password: hashed, 
        role: role || "USER" 
      },
    });

    console.log("User created successfully:", user.id);
    return NextResponse.json({ message: "Success", userId: user.id }, { status: 201 });

  } catch (error: any) {
    // This will print the EXACT error in your terminal (VS Code)
    console.error("PRISMA_SAVE_ERROR:", error);
    
    return NextResponse.json(
      { error: error.message || "Something went wrong" }, 
      { status: 500 }
    );
  }
}