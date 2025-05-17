import {NextResponse} from "next/server";

export async function POST(request: Request) {
  const {email, password} = await request.json();

  if (!email || !password) {
    return NextResponse.json(
      {error: "Email and password are required"},
      {status: 400}
    );
  }

  if (email === "admin@alma.com" && password === "Admin@123") {
    return NextResponse.json({message: "Login successful"}, {status: 200});
  }

  return NextResponse.json({error: "Invalid credentials"}, {status: 401});
}
