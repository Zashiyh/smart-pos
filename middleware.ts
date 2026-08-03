import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {

  const token =
    req.cookies.get("token")?.value;

  const role =
    req.cookies.get("role")?.value?.toLowerCase();


  const { pathname } =
    req.nextUrl;



  // ===============================
  // PROTECT DASHBOARD
  // ===============================

  if (pathname.startsWith("/dashboard")) {


    if (!token) {

      return NextResponse.redirect(
        new URL(
          "/login",
          req.url
        )
      );

    }

  }



  // ===============================
  // ADMIN ONLY ROUTES
  // ===============================

  const adminOnlyRoutes = [

    "/dashboard/products",
    "/dashboard/categories",
    "/dashboard/suppliers",
    "/dashboard/reports",
    "/dashboard/settings",

  ];



  const isAdminOnly =
    adminOnlyRoutes.some(
      (route) =>
        pathname.startsWith(route)
    );



  if (isAdminOnly) {


    if (role !== "admin") {


      return NextResponse.redirect(
        new URL(
          "/dashboard?error=unauthorized",
          req.url
        )
      );


    }


  }



  // ===============================
  // ALLOW REQUEST
  // ===============================

  return NextResponse.next();

}



export const config = {

  matcher: [
    "/dashboard/:path*",
  ],

};