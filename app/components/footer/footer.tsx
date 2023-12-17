import React from "react";
import GoldenFooter from "@/public/assets/layout/goldenFooter.svg";
import { useRouter } from "next/navigation";

export default function Footer() {
  const router = useRouter();

  return (
    <footer>
      <div className="hidden md:block bg-[url('../public/assets/layout/footer.png')] bg-layoutColor h-[370px] w-full relative bg-auto bg-no-repeat">
        <div className="md:w-[80%] lg:w-[60%] xl:w-1/2 2xl:w-[40%]   flex flex-row-reverse justify-around pt-[60px]">
          <div>
            <p className="text-white text-[24px] mb-[18px]">SOCIAL</p>
            <p
              onClick={() => router.push("https://youtube.com/")}
              className="text-footerColor text-[20px] mb-[18px] cursor-pointer"
            >
              Youtube
            </p>
            <p
              onClick={() => router.push("https://www.linkedin.com/")}
              className="text-footerColor text-[20px] mb-[18px] cursor-pointer"
            >
              LinkedIn
            </p>
            <p
              onClick={() => router.push("https://www.instagram.com/")}
              className="text-footerColor text-[20px] mb-[18px] cursor-pointer"
            >
              Instagram
            </p>
            <p
              onClick={() => router.push("https://twitter.com/?lang=en")}
              className="text-footerColor text-[20px] mb-[18px] cursor-pointer"
            >
              Twitter
            </p>
            <p
              onClick={() => router.push("https://www.tiktok.com/en/")}
              className="text-footerColor text-[20px] mb-[18px] cursor-pointer"
            >
              Tiktok
            </p>
          </div>
          <div>
            <div className="mb-[38px] flex justify-center">
              <GoldenFooter />
            </div>

            <p className="text-white text-[16px] mb-[5px]">
              All Right Resaved For Golden Path.{" "}
            </p>
            <p className="text-copyRightColor text-[16px]">Copyright 2023</p>
          </div>
        </div>
        <div className=" md:w-[20%] lg:w-[40%] xl:w-1/2 2xl:w-[60%] "></div>
      </div>
      <div className="block md:hidden bg-[url('../public/assets/layout/smFooter.png')] bg-layoutColor h-[740px] w-full relative bg-cover bg-no-repeat">
        <div className="text-center pt-[87px]">
          <p className="text-white text-[24px] mb-[18px] font-normal">SOCIAL</p>
          <p className="text-footerColor text-[20px] mb-[18px] font-normal">
            Youtube
          </p>
          <p className="text-footerColor text-[20px] mb-[18px] font-normal">
            LinkedIn
          </p>
          <p className="text-footerColor text-[20px] mb-[18px] font-normal">
            Instagram
          </p>
          <p className="text-footerColor text-[20px] mb-[18px] font-normal">
            Twitter
          </p>
          <p className="text-footerColor text-[20px] mb-[18px] font-normal">
            Tiktok
          </p>
        </div>
        <div className="mt-[70px] sm:mt-[160px] md:mt-[120px]">
          <div className="text-center">
            <div className="mb-[30px] flex justify-center ">
              <GoldenFooter />
            </div>
            <p className="text-white text-[16px] mb-[5px] font-normal">
              All Right Resaved For Golden Path.{" "}
            </p>
            <p className="text-copyRightColor text-[16px] font-normal">
              Copyright 2023
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
