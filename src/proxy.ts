import { NextRequest, NextResponse } from "next/server";

export function proxy(request: NextRequest) {
  const maintenanceMode = process.env.MAINTENANCE_MODE === "true";

  if (
    maintenanceMode &&
    !request.nextUrl.pathname.startsWith("/maintenance")
  ) {
    return NextResponse.redirect(
      new URL("/maintenance", request.url)
    );
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico).*)",
  ],
};