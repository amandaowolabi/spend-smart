"use client";
import Image from "next/image";
import Img1 from "../../public/Splash-Image.png";
import { LuChartPie } from "react-icons/lu";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Splash() {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push("/dashboard");
    }, 3000);

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <main className="bg-[#A8E6CF] h-screen flex flex-col overflow-auto">
      <div className="flex gap-4 pt-12 px-6 max-w-md">
        <div className="bg-[#34A853] py-3 px-5 rounded-xl">
          <LuChartPie className="text-5xl text-white" />
        </div>
        <h3 className="text-white my-auto text-4xl font-times font-normal">
          SpendSmart
        </h3>
      </div>

      <div className="max-w-md mx-auto pt-12">
        <Image src={Img1} alt="background chart" className="mx-auto pt-10" />
      </div>

      <div className="max-w-md mx-auto ps-14 pt-24 pe-6">
        <h3 className="text-[2.7rem] text-[#34A853] font-times">
          Track Your Spendings.
        </h3>
      </div>
    </main>
  );
}
