import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";


export async function middleware(req: NextRequest) {

  const token =
    req.cookies.get("token")?.value;


  const { pathname } =
    req.nextUrl;



  if (pathname.startsWith("/dashboard")) {


    // No token
    if (!token) {

      return NextResponse.redirect(
        new URL("/login", req.url)
      );

    }



    let role = "";



    try {


      const secret =
        new TextEncoder().encode(
          process.env.JWT_SECRET!
        );



      const { payload } =
        await jwtVerify(
          token,
          secret
        );



      role =
        String(payload.role)
          .toLowerCase();



    } catch(error) {


      console.log(
        "JWT Verify Error:",
        error
      );


      return NextResponse.redirect(
        new URL("/login", req.url)
      );


    }




    const adminOnlyRoutes = [

      "/dashboard/products",
      "/dashboard/categories",
      "/dashboard/suppliers",
      "/dashboard/reports",
      "/dashboard/settings",

    ];



    const isAdminOnly =
      adminOnlyRoutes.some(
        (route)=>
          pathname.startsWith(route)
      );



    if (
      isAdminOnly &&
      role !== "admin"
    ) {


      return NextResponse.redirect(
        new URL(
          "/dashboard?error=unauthorized",
          req.url
        )
      );


    }



  }



  return NextResponse.next();

}



export const config = {

  matcher:[
    "/dashboard/:path*"
  ]

};