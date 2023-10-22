import React from "react";
import GoldenFooter from "@/public/assets/layout/goldenFooter.svg";

export default function Footer() {
  return (
    <footer>
      <div className="hidden md:block bg-[url('../public/assets/layout/footer.png')] bg-layoutColor h-[370px] w-full relative bg-auto bg-no-repeat">
        <div className="md:w-[80%] lg:w-[60%] xl:w-1/2 2xl:w-[40%]   flex flex-row-reverse justify-around pt-[60px]">
          <div>
            <p className="text-white text-[24px] mb-[18px]">Social</p>
            <p className="text-footerColor text-[20px] mb-[18px]">Youtube</p>
            <p className="text-footerColor text-[20px] mb-[18px]">LinkedIn</p>
            <p className="text-footerColor text-[20px] mb-[18px]">Instagram</p>
            <p className="text-footerColor text-[20px] mb-[18px]">Twitter</p>
            <p className="text-footerColor text-[20px] mb-[18px]">Tiktok</p>
          </div>
          <div>
            <div className="mb-[38px] flex justify-center">
              <GoldenFooter />
            </div>

            <p className="text-white text-[16px] mb-[5px]">
              all right resaved for golden path.{" "}
            </p>
            <p className="text-copyRightColor text-[16px]">copyright 2023</p>
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
              all right resaved for golden path.{" "}
            </p>
            <p className="text-copyRightColor text-[16px] font-normal">
              copyright 2023
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
