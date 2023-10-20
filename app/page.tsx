"use client";

import React from "react";
import Removal from "@/public/assets/layout/removal.svg";
import Shape1 from "@/public/assets/layout/homeShape1.svg";
import ShadowShapeMd from "@/public/assets/layout/shadowShapeMd.svg";
import Shadow from "@/public/assets/layout/circleShadow.svg";
import MainShape from "@/public/assets/layout/mainShape.svg";
import MainShapeMd from "@/public/assets/layout/mainShapeMd.svg";
import RemovalSm from "@/public/assets/layout/removalSm.svg";
import FrameSm from "@/public/assets/layout/FrameSm.svg";
import Avatar1 from "@/public/assets/layout/parham.svg";
import Avatar2 from "@/public/assets/layout/avatar2.svg";
import FooterLogo from "@/public/assets/layout/footerLogo.svg";
import FooterLogoSm from "@/public/assets/layout/footerLogoSm.svg";
import Footer from "@/app/components/footer/footer";
import Navbar from "@/app/components/navbar/navbar";

export default function Home() {
  return (
    <main className="bg-homeColor h-screen overflow-auto overflow-x-hidden">
      <section>
        {/* first section */}
        <div className="relative mb-[50px] bg-banner bg-cover bg-[url('../public/assets/layout/wallpaper.png')] h-auto md:h-auto  xl:overflow-hidden xl:h-[900px] w-full md:flex md:flex-row-reverse xl:flex xl:flex-row-reverse">
          <Navbar />
          <div className="absolute hidden 2xl:block bottom-[-10%] lg:translate-x-[-9%] xl:translate-x-[-10%] 2xl:translate-x-[-28%] 3xl:translate-x-0  overflow-x-hidden w-full xl:overflow-x-[unset]">
            <Shape1 />
          </div>
          <div className="absolute hidden 2xl:block bottom-[-12%]  overflow-x-hidden w-ful xl:overflow-x-[unset]">
            <MainShape />
          </div>{" "}
          <div className="absolute hidden md:hidden 2xl:hidden bottom-[-10%] lg:translate-x-[-9%] xl:translate-x-[-10%] 2xl:translate-x-[-28%] 3xl:translate-x-0   overflow-x-hidden w-full xl:overflow-x-[unset]">
            <ShadowShapeMd />
          </div>
          <div className="absolute hidden md:hidden 2xl:hidden bottom-[-12%]  overflow-x-hidden w-ful xl:overflow-x-[unset]">
            <MainShapeMd />
          </div>
          <div className="absolute right-[-14%] sm:right-[8%]">
            <Shadow />
          </div>
          <div className="w-full md:w-full xl:w-7/12 relative h-[600px] sm:h-[600px] lg:h-[700px] xl:h-full  ">
            <div className="hidden xl:block absolute  left-1/2 transform -translate-x-1/2 md:left-1/2 md:transform md:-translate-x-1/2 lg:left-1/2 lg:transform lg:-translate-x-1/2 md:top-[14%] lg:top-[10%] xl:transform-none xl:left-[unset] md:right-[unset] xl:right-[70px] 2xl:right-[111px]">
              <Removal />
            </div>
            <div className="block xl:hidden absolute  left-1/2 transform -translate-x-1/2 md:left-1/2 md:transform md:-translate-x-1/2 lg:left-1/2 lg:transform lg:-translate-x-1/2 top-[10%] xl:transform-none xl:left-[unset]  xl:right-[111px]">
              <RemovalSm />
            </div>
          </div>
          <div className="w-full md:bg-transparent bg-homeColor md:mt-[15%] md:ml-[4%] xl:mt-[unset] xl:ml-[unset] xl:bg-[unset] md:w-full xl:w-5/12 relative h-auto md:h-full lg:h-full xl:h-auto ">
            <div className="absolute left-[-2px] top-[16%] hidden xl:block">
              <Shadow />
            </div>

            <div className="flex justify-center  flex-col h-full ml-[40px] mr-[40px] xl:mr[unset] xl:ml-[97px]">
              <p className="text-white text-[52px] xl:text-[64px] 2xl:text-[72px]">
                Take Back The
              </p>
              <p className="text-customYellow text-[52px] xl:text-[64px] 2xl:text-[72px]">
                Control Of Your Life
              </p>
              <p className="text-white text-[20px] lg:text-[20px] 2xl:text-[24px] pb-[37px] xl:pb-[39px]">
                set realistic goals, break them into tasks, prioritize them and
                achieve your goals.
              </p>
              <div className="border-[1px] w-[209px] text-white flex justify-center cursor-pointer z-30 border-white text-[16px] pb-[18px] pt-[18px] pr-[70px] pl-[70px] rounded-[14px]  ">
                Get Start
              </div>
            </div>
          </div>
        </div>
        {/* second section */}
        <div className="bg-gradient-to-t from-layoutColor to-homeColor ">
          <div className="pt-[150px] pb-[100px]">
            <div className="flex justify-center pl-[68px] pr-[68px] mb-[60px]">
              <div className="text-center">
                <p className="text-white text-[32px] sm:[40px] xl:text-[50px]">
                  Set <span className="text-customYellow">realistic goals</span>
                </p>
                <p className="text-white text-[18px] sm:text-[20px] xl:text-[26px]">
                  “How can you hit something when you don’t know what you aim
                  at?” Jordan Peterson
                </p>
              </div>
            </div>
            <div className="flex justify-center relative 2xl:hidden">
              <FrameSm />
            </div>{" "}
            <div className="bg-[url('../public/assets/layout/lifegoals.svg')] 2xl:h-auto 2xl:w-full relative hidden 2xl:block 2xl:mb-[160px]"></div>
          </div>
        </div>

        {/* about us */}

        <div className="bg-homeColor ">
          <div className="pt-[83px] pb-[124px] lg:flex lg:items-center">
            <section className="lg:w-1/2">
              <div className="lg:pl-[80px] 2xl:pl-[116px] pr-[42px] pl-[42px]">
                <div className="text-center lg:text-left mb-[42px]">
                  <p className="text-white text-[32px]">
                    About <span className="text-customYellow">us</span>
                  </p>
                </div>
                <div className=" mb-[60px]">
                  <p className="text-white text-[18px] mb-[12px]">
                    It all started with Saman’s obsession over productivity. He
                    used many productivity tools, sticky notes, or even a
                    combination of reminders and Google calendar, etc...
                  </p>{" "}
                  <p className="text-white text-[18px] mb-[12px]">
                    He ended up creating his own system on Notion. Based on the
                    research he made on successful CEO’s productivity hacks and
                    rich of his experience using basically all the productivity
                    apps on the market, he eventually built a simple yet
                    powerful system.
                  </p>{" "}
                  <p className="text-white text-[18px]">
                    He then went on a quest to help Parham, his old friend who’s
                    a 3 time world procrastination champion. The idea was that
                    he was able to solve Parham’s problem, he could solve
                    everyone’s problem. Over 3 months, Parham made constant
                    improvements, so they both decided to productize Saman’s
                    system.
                  </p>
                </div>
              </div>
            </section>
            <section className="lg:w-1/2">
              <div className="flex justify-end">
                <div className="bg-layoutColor overflow-x-scroll 2xl:overflow-hidden w-[85%] rounded-l-[35px] border-t-[1px] border-b-[1px] border-l-[1px] border-white">
                  <div className="pt-[45px] pb-[45px] pl-[45px] md:flex md:items-center">
                    <div className="mb-[45px] md:mb-[unset] md:mr-[73px]">
                      <Avatar1 />
                    </div>
                    <div>
                      <Avatar2 />
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>

        {/* latest section */}
        <div className="bg-layoutColor relative">
          <div className="z-20 text-center">
            <div className="relative h-[650px] lg:h-[800px]">
              <div className="absolute block lg:hidden top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <FooterLogoSm />
              </div>{" "}
              <div className="absolute hidden lg:block top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <FooterLogo />
              </div>
              <div className="absolute z-10 top-1/2  transform -translate-y-1/2 pr-[14px]  1sm:pt-[270px] pt-[250px] md:pt-[220px] pl-[14px] md:left-1/2 md:-translate-x-1/2 ">
                <p className="text-[26px] md:text-[32px] xl:text-[42px] text-white  mb-[140px]">
                  Get on your{" "}
                  <span className="text-customYellow">golden path</span> right
                  now
                </p>
                <p className="text-white text-[18px] md:text-[20px] xl:text-[26px] mb-[20px]">
                  Or go watch you tiktok garbage and miss the opportunity to
                  change your life.
                </p>
                <div className="flex justify-center">
                  <div className="pt-[27px] pb-[27px] pr-[46px] pl-[46px] w-[262px]  text-customYellow text-[20px] mb-[166px] border-customYellow border-[1px] rounded-[14px] cursor-pointer ">
                    join now
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* footer */}
      <Footer />
    </main>
  );
}
