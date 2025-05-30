import {NextResponse} from "next/server";

export async function POST(req: Request) {
  const body = await req.json();
  console.log("Received form data:", body);

  return NextResponse.json({message: "Form submitted successfully"});
}
