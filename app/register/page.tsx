"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";


export default function RegisterPage() {


  const router = useRouter();


  const [form, setForm] = useState({

    name: "",
    email: "",
    password: "",
    role: "Cashier",

  });


  const [loading, setLoading] = useState(false);


  const [message, setMessage] = useState("");





  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) {


    setForm({

      ...form,

      [e.target.name]: e.target.value,

    });


  }








  async function handleSubmit(
    e: React.FormEvent
  ) {


    e.preventDefault();


    setLoading(true);

    setMessage("");



    try {


      const res = await fetch(
        "/api/auth/register",
        {

          method: "POST",

          headers: {

            "Content-Type": "application/json",

          },


          body: JSON.stringify(form),


        }
      );



      const data = await res.json();




      if(data.success){


        setMessage(
          "Account created successfully."
        );


        setTimeout(() => {

          router.push("/login");

        },1500);



      }else{


        setMessage(data.message);


      }



    } catch(error){


      setMessage(
        "Something went wrong."
      );


    } finally {


      setLoading(false);


    }


  }






  return (

    <div
      className="
        flex
        min-h-screen
        items-center
        justify-center
        bg-muted/30
        p-6
      "
    >



      <div
        className="
          w-full
          max-w-md
          rounded-3xl
          border
          bg-background
          p-8
          shadow-xl
        "
      >



        <h1
          className="
            text-3xl
            font-bold
          "
        >
          Create Account
        </h1>



        <p
          className="
            mt-2
            text-sm
            text-muted-foreground
          "
        >
          Register a new SmartPOS user
        </p>







        <form
          onSubmit={handleSubmit}
          className="
            mt-6
            space-y-4
          "
        >





          <input

            name="name"

            value={form.name}

            onChange={handleChange}

            placeholder="Full Name"

            className="
              w-full
              rounded-xl
              border
              bg-transparent
              px-4
              py-3
              outline-none
            "

            required

          />






          <input

            type="email"

            name="email"

            value={form.email}

            onChange={handleChange}

            placeholder="Email Address"

            className="
              w-full
              rounded-xl
              border
              bg-transparent
              px-4
              py-3
              outline-none
            "

            required

          />







          <input

            type="password"

            name="password"

            value={form.password}

            onChange={handleChange}

            placeholder="Password"

            className="
              w-full
              rounded-xl
              border
              bg-transparent
              px-4
              py-3
              outline-none
            "

            required

          />







          <select

            name="role"

            value={form.role}

            onChange={handleChange}

            className="
              w-full
              rounded-xl
              border
              bg-background
              px-4
              py-3
              outline-none
            "

          >

            <option value="Admin">
              Admin
            </option>


            <option value="Cashier">
              Cashier
            </option>


          </select>









          <button

            disabled={loading}

            className="
              w-full
              rounded-xl
              bg-primary
              py-3
              font-semibold
              text-primary-foreground
              hover:opacity-90
            "

          >

            {loading
              ? "Creating..."
              : "Create Account"
            }


          </button>





        </form>






        {message && (

          <p
            className="
              mt-4
              text-center
              text-sm
            "
          >

            {message}

          </p>

        )}








        <p
          className="
            mt-6
            text-center
            text-sm
          "
        >

          Already have an account?


          {" "}


          <Link

            href="/login"

            className="
              font-semibold
              text-primary
            "

          >

            Login

          </Link>


        </p>





      </div>



    </div>

  );

}