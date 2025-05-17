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
    const response = NextResponse.json(
      {message: "Login successful"},
      {status: 200}
    );

    response.cookies.set("token", "secure-token-value", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 60 * 60 * 1, // 1 hour
    });

    return response;
  }

  return NextResponse.json({error: "Invalid credentials"}, {status: 401});
}
