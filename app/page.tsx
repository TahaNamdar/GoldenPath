"use client";

import React from "react";
// import Removal from "@/public/assets/layout/removal.svg";
// import Shape1 from "@/public/assets/layout/homeShape1.svg";
// import ShadowShapeMd from "@/public/assets/layout/shadowShapeMd.svg";
// import Shadow from "@/public/assets/layout/circleShadow.svg";
// import SmShadow from "@/public/assets/layout/smBannerShadow.svg";
// import MainShape from "@/public/assets/layout/mainShape.svg";
// import MainShapeMd from "@/public/assets/layout/mainShapeMd.svg";
// import RemovalSm from "@/public/assets/layout/removalSm.svg";
// import Avatar1 from "@/public/assets/layout/parham.svg";
// import Avatar2 from "@/public/assets/layout/avatar2.svg";
// import LgAvatar1 from "@/public/assets/layout/lgAvatar1.svg";
// import LgAvatar2 from "@/public/assets/layout/lgAvatar2.svg";
// import MdAvatar1 from "@/public/assets/layout/mdAvatar1.svg";
// import MdAvatar2 from "@/public/assets/layout/mdAvatar2.svg";
// import FooterLogo from "@/public/assets/layout/footerLogo.svg";
// import FooterLogoSm from "@/public/assets/layout/footerLogoSm.svg";
// import WhiteStar from "@/public/assets/layout/whiteStar.svg";
// import GoldStar from "@/public/assets/layout/goldStar.svg";
// import BlueStar from "@/public/assets/layout/blueStar.svg";
import Footer from "@/app/components/footer/footer";
import Navbar from "@/app/components/navbar/navbar";

export default function Home() {
  return (
    <main className="bg-homeColor h-screen overflow-auto overflow-x-hidden">
      <section>
        {/* first section */}
        <div className="relative mb-[50px] bg-banner bg-cover bg-[url('../public/assets/layout/wallpaper.png')] h-auto md:h-auto  xl:overflow-hidden lg:h-[890px] xl:h-[1000px] 2xl:h-screen w-full md:flex md:flex-row-reverse xl:flex xl:flex-row-reverse">
          <Navbar />
          {/* <div className="absolute hidden xl:block bottom-[-10%] 2xl:bottom-[-20%] 3xl:bottom-[-8%] lg:translate-x-[-9%] xl:translate-x-[-24%] 2xl:translate-x-[-18%] 3xl:translate-x-0  overflow-x-hidden w-full xl:overflow-x-[unset]">
            <Shape1 />
          </div>
          <div className="absolute hidden xl:block bottom-[-12%] 2xl:bottom-[-22%] 3xl:bottom-[-10%]  overflow-x-hidden  xl:overflow-x-[unset]">
            <MainShape />
          </div>{" "} */}
          {/* <section className="absolute w-full bg-banner h-[160px] bottom-[-9%] xl:hidden">
            <section className="absolute bottom-[-10%]">
              <div className="2xl:hidden bottom-[-10%]  translate-x-[-20%] translate-y-[30%] lg:translate-x-[-9%] xl:translate-x-[-20%] 2xl:translate-x-[-28%] 3xl:translate-x-0  w-full xl:overflow-x-[unset]">
                <ShadowShapeMd />
              </div>
              <div className="absolute 2xl:hidden 1sm:bottom-[-12%] bottom-[-13%] translate-x-[-20%] translate-y-[10%]  w-ful xl:overflow-x-[unset]">
                <MainShapeMd />
              </div>
            </section>
          </section> */}
          {/* <div className="absolute right-[-14%] sm:right-[8%]">
            <Shadow />
          </div>
          <div className="w-full md:w-full lg:w-[100%] xl:w-7/12 2xl:w-[50%] 3xl:w-7/12 relative h-[600px] sm:h-[600px] lg:h-[700px] xl:h-full  ">
            <div className="hidden lg:block absolute  left-1/2 transform -translate-x-1/2 md:left-1/2 md:transform md:-translate-x-1/2 lg:left-1/2 lg:transform lg:-translate-x-1/2 md:top-[14%] lg:top-[10%] xl:transform-none xl:left-[unset] md:right-[unset] xl:right-[40px] 3xl:right-[80px]">
              <Removal />
            </div>
            <div className="block lg:hidden absolute  left-1/2 transform -translate-x-1/2 md:left-1/2 md:transform md:-translate-x-1/2 lg:left-1/2 lg:transform lg:-translate-x-1/2 top-[10%] xl:transform-none xl:left-[unset]  xl:right-[111px]">
              <RemovalSm />
            </div>
          </div> */}
          {/* <div className="w-full md:bg-transparent bg-banner pb-[30px] lg:pb-[unset] md:mt-[15%] md:ml-[4%] xl:mt-[unset] xl:ml-[unset] xl:bg-[unset] md:w-full lg:w-[50%] xl:w-5/12 2xl:w-[50%] 3xl:w-5/12 relative h-auto md:h-full lg:h-full xl:h-auto ">
            <div className="absolute left-[-2px] top-[16%] hidden xl:block">
              <Shadow />
            </div>
            <div className="absolute left-[1px] top-[-19%] lg:top-[10%]  xl:hidden">
              <SmShadow />
            </div>

            <div className="flex justify-center  flex-col h-full ml-[40px] mr-[20px] xl:mr-[unset] xl:ml-[97px]">
              <p className="text-white font-medium text-[52px] xl:text-[64px] lg:mt-[-22%] xl:mt-[22%] 2xl:mt-[22%] 3xl:mt-[18%] 3xl:text-[72px]">
                Take Back The
              </p>
              <p className="text-customYellow font-medium  text-[52px] xl:text-[64px] 3xl:text-[72px]">
                Control Of Your Life
              </p>
              <p className="text-white text-[20px] font-normal lg:text-[20px] 3xl:text-[24px] pb-[37px] xl:pb-[39px]">
                Set Realistic Goals, Break Them Into Tasks, Prioritize Them And
                Achieve Your Goals.
              </p>
              <div className="bg-gradient-to-r  w-[209px] p-[1px] flex justify-center rounded-[14px] from-[#ffffff1c] to-[#ffffff] ">
                <div className=" font-normal bg-banner text-white flex justify-center cursor-pointer z-30 text-[16px] pb-[18px] pt-[18px] pr-[70px] pl-[70px] rounded-[14px]  ">
                  Get Start
                </div>
              </div>
            </div>
          </div> */}
        </div>
        {/* second section */}
        {/* <div className="bg-gradient-to-t from-layoutColor to-homeColor relative ">
          <div className="hidden xl:block absolute lg:left-[6%] lg:top-[10%]">
            <WhiteStar />
          </div>{" "}
          <div className="absolute right-[2%] top-[13%] lg:right-[unset] lg:left-[3%] lg:top-[24%]">
            <WhiteStar />
          </div>{" "}
          <div className="absolute top-[46%] right-[2%] lg:right-[unset]  lg:left-[14%] lg:top-[47%]">
            <GoldStar />
          </div>{" "}
          <div className="absolute left-[2%] lg:left-[70%] top-[50%] lg:top-[44%]">
            <GoldStar />
          </div>{" "}
          <div className="absolute right-[3%] lg:right-[unset] lg:left-[32%] top-[65%] lg:top-[95%]">
            <GoldStar />
          </div>{" "}
          <div className="absolute top-[95%] left-[30%] lg:left-[unset] lgf:right-0 2xl:right-[4%] lg:top-[60%]">
            <BlueStar />
          </div>
          <div className="3xl:mt-[-30px] pb-[100px] xl:pb-0">
            <div className="flex justify-center pl-[68px] pr-[68px] mb-[60px] 3xl:ml-auto 3xl:mr-auto 3xl:w-[50%]">
              <div className="text-center">
                <p className="text-white text-[32px] sm:text-[40px] 3xl:text-[50px]">
                  Set <span className="text-customYellow">realistic goals</span>
                </p>
                <p className="text-white text-[18px] sm:text-[20px] 3xl:text-[26px]">
                  “How can you hit something when you don’t know what you aim
                  at?” Jordan Peterson
                </p>
              </div>
            </div>
            <div className="flex justify-center">
              <div className=" relative xl:hidden mb-[150px] h-[610px] bg-no-repeat w-[390px] bg-[url('../public/assets/layout/setFrame.png')] bg-cover"></div>{" "}
            </div>
            <div className="flex justify-center">
              <div className="bg-[url('../public/assets/layout/lifeGoalsBgLg.png')] 3xl:h-[970px] 3xl:mb-[160px]  3xl:w-[1440px] relative hidden 3xl:block 2xl:mb-[160px] bg-no-repeat">
                <div className="absolute bg-smallBox backdrop-blur-[18px] z-10 border-[1px] border-white rounded-[14px] 3xl:top-[10%] 3xl:left-[7%]  3xl:w-[500px] 3xl:h-[117px] text-center text-[18px] 3xl:pt-[46px] 3xl:pb-[46px] 3xl:pr-[34px] 3xl:pl-[34px]">
                  <p className="text-white">
                    Assess how fast you achieved your goals so far.
                  </p>
                </div>{" "}
                <div className="absolute bg-smallBox backdrop-blur-[18px] z-10 border-[1px] border-white rounded-[14px] 3xl:top-[23%] 3xl:right-[-2%]  3xl:w-[320px] 3xl:h-[117px] text-center text-[18px] 3xl:pt-[46px] 3xl:pb-[46px] 3xl:pr-[34px] 3xl:pl-[34px]">
                  <p className="text-white">Break it into measurable goals </p>
                </div>{" "}
                <div className="absolute bg-smallBox backdrop-blur-[18px] z-10 border-[1px] border-white rounded-[14px] 3xl:top-[70%] 3xl:right-[-5%]  3xl:w-[420px] 3xl:h-[117px] text-center text-[18px] 3xl:pt-[46px] 3xl:pb-[46px] 3xl:pr-[34px] 3xl:pl-[34px]">
                  <p className="text-white">
                    Create a realistic vision for your future life.{" "}
                  </p>
                </div>{" "}
                <div className="absolute bg-smallBox backdrop-blur-[18px] z-10 border-[1px] border-white rounded-[14px] 3xl:bottom-[-6%] 3xl:left-[10%]  3xl:w-[570px] 3xl:h-[117px] text-center text-[18px] 3xl:pt-[33px] 3xl:pb-[33px] 3xl:pr-[34px] 3xl:pl-[34px]">
                  <p className="text-white">
                    Constantly evaluate and adjust; either your goals to your
                    efforts or your efforts to your goals.{" "}
                  </p>
                </div>
              </div>
              {/* md size */}
        {/* <div className="bg-[url('../public/assets/layout/lifeMD.png')]  xl:h-[725px] xl:mb-[160px]  xl:w-[1068px] relative hidden xl:block 3xl:hidden 2xl:mb-[160px] bg-no-repeat">
                <div className="absolute bg-smallBox backdrop-blur-[18px] z-10 border-[1px] border-white rounded-[14px] xl:top-[10%] xl:left-[7%]  xl:w-[500px] xl:h-[88px] text-center text-[18px] xl:pt-[32px] xl:pb-[32px] xl:pr-[34px] xl:pl-[34px]">
                  <p className="text-white">
                    Assess how fast you achieved your goals so far.
                  </p>
                </div>{" "}
                <div className="absolute bg-smallBox backdrop-blur-[18px] z-10 border-[1px] border-white rounded-[14px] xl:top-[23%] xl:right-[7%]  xl:w-[320px] xl:h-[88px] text-center text-[14px] xl:pt-[32px] xl:pb-[32px] xl:pr-[34px] xl:pl-[34px]">
                  <p className="text-white">Break it into measurable goals </p>
                </div>{" "}
                <div className="absolute bg-smallBox backdrop-blur-[18px] z-10 border-[1px] border-white rounded-[14px] xl:top-[60%] xl:right-[-3%]  xl:w-[420px] xl:h-[88px] text-center text-[14px] xl:pt-[32px] xl:pb-[32px] xl:pr-[34px] xl:pl-[34px]">
                  <p className="text-white">
                    Create a realistic vision for your future life.{" "}
                  </p>
                </div>{" "}
                <div className="absolute bg-smallBox backdrop-blur-[18px] z-10 border-[1px] border-white rounded-[14px] xl:bottom-[-5%] xl:left-[6%]  xl:w-[420px] xl:h-[88px] text-center text-[14px] xl:pt-[22px] xl:pb-[32px] xl:pr-[34px] xl:pl-[34px]">
                  <p className="text-white">
                    Constantly evaluate and adjust; either your goals to your
                    efforts or your efforts to your goals{" "}
                  </p>
                </div>{" "}
              </div> */}
        {/* </div> */}
        {/* prioritize section */}
        {/* <div className="flex justify-center pl-[60px] pr-[60px] mb-[60px] xl:w-[75%] xl:ml-auto xl:mr-auto 3xl:w-[71%] 3xl:ml-auto 3xl:mr-auto   ">
              <div className="text-center">
                <p className="text-customYellow text-[32px] sm:text-[40px] 3xl:text-[50px]">
                  Prioritize <span className="text-white">Your Goals</span>
                </p>
                <p className="text-white text-[18px] sm:text-[20px] 3xl:text-[26px] text-left">
                  “Successfully people don’t use a complex system, they use a
                  simple system for a long period of time” Alex Hormozi
                </p>
              </div>
            </div>
            <div className="flex justify-center">
              <div className=" relative xl:hidden h-[628px] bg-cover bg-no-repeat w-[390px] bg-[url('../public/assets/layout/setFrame2.png')] "></div>{" "}
            </div> */}

        {/* <div className="flex justify-center">
              <div className="bg-[url('../public/assets/layout/YearlyXL.png')] 3xl:h-[1130px] 3xl:mb-[160px]  3xl:w-[1548px] relative hidden 3xl:block 2xl:mb-[160px] bg-no-repeat">
                <div className="absolute bg-smallBox backdrop-blur-[18px] z-10 border-[1px] border-white rounded-[14px] 3xl:top-[9%] 3xl:left-[35%]  3xl:w-[520px] 3xl:h-[117px] text-center text-[18px] 3xl:pt-[46px] 3xl:pb-[46px] 3xl:pr-[34px] 3xl:pl-[34px]">
                  <p className="text-white">
                    Prioritizie them so you know what to work on each day{" "}
                  </p>
                </div>{" "}
                <div className="absolute bg-smallBox backdrop-blur-[18px] z-10 border-[1px] border-white rounded-[14px] 3xl:top-[45%] 3xl:right-[-1%]  3xl:w-[320px] 3xl:h-[117px] text-center text-[18px] 3xl:pt-[34px] 3xl:pb-[46px] 3xl:pr-[34px] 3xl:pl-[34px]">
                  <p className="text-white">
                    Set goals in each key area of your life{" "}
                  </p>
                </div>{" "}
                <div className="absolute bg-smallBox backdrop-blur-[18px] z-10 border-[1px] border-white rounded-[14px] 3xl:bottom-[-5%] 3xl:right-[10%]  3xl:w-[320px] 3xl:h-[117px] text-center text-[18px] 3xl:pt-[34px] 3xl:pb-[46px] 3xl:pr-[34px] 3xl:pl-[34px]">
                  <p className="text-white">
                    Break them into smaller manageable goals{" "}
                  </p>
                </div>{" "}
              </div> */}

        {/*yearly goals md size */}
        {/* <div className="bg-[url('../public/assets/layout/YearlyDesktop.png')]  xl:h-[780px] xl:mb-[160px]  xl:w-[1096px] relative hidden xl:block 3xl:hidden 2xl:mb-[160px] bg-no-repeat">
                <div className="absolute bg-smallBox backdrop-blur-[18px] z-10 border-[1px] border-white rounded-[14px] xl:top-[9%] xl:left-[33%]  xl:w-[500px] xl:h-[88px] text-center text-[18px] xl:pt-[22px] xl:pb-[32px] xl:pr-[34px] xl:pl-[34px]">
                  <p className="text-white">
                    Prioritizie them so you know what to work on each day{" "}
                  </p>
                </div>{" "}
                <div className="absolute bg-smallBox backdrop-blur-[18px] z-10 border-[1px] border-white rounded-[14px] xl:top-[60%] xl:right-[-2%]  xl:w-[320px] xl:h-[88px] text-center text-[14px] xl:pt-[32px] xl:pb-[32px] xl:pr-[34px] xl:pl-[34px]">
                  <p className="text-white">
                    Set goals in each key area of your life
                  </p>
                </div>{" "}
                <div className="absolute bg-smallBox backdrop-blur-[18px] z-10 border-[1px] border-white rounded-[14px] xl:bottom-[-5%] xl:left-[40%]  xl:w-[350px] xl:h-[88px] text-center text-[14px] xl:pt-[32px] xl:pb-[32px] xl:pr-[34px] xl:pl-[34px]">
                  <p className="text-white">
                    Break them into smaller manageable goals{" "}
                  </p>
                </div>{" "}
              </div>
            </div> */}
        {/* </div>
        </div> */}

        {/* about us */}
        {/* 
        <div className="bg-homeColor ">
          <div className="pt-[83px] pb-[124px] 3xl:pt-[170px] 3xl:pb-[140px] lg:flex lg:items-center">
            <section className="lg:w-1/2">
              <div className="lg:pl-[80px] 2xl:pl-[116px] pr-[42px] pl-[42px]">
                <div className="text-center lg:text-left mb-[42px]">
                  <p className="text-white text-[32px] xl:text-[40px] 3xl:text-[53px]">
                    About <span className="text-customYellow">us</span>
                  </p>
                </div>
                <div className=" mb-[60px]">
                  <p className="text-white text-[18px] xl:text-[20px] 3xl:text-[24px] mb-[14px] font-light">
                    It all started with Saman’s obsession over productivity. He
                    used many productivity tools, sticky notes, or even a
                    combination of reminders and Google calendar, etc...
                  </p>{" "}
                  <p className="text-white text-[18px] xl:text-[20px] 3xl:text-[24px] mb-[14px] font-light">
                    He ended up creating his own system on Notion. Based on the
                    research he made on successful CEO’s productivity hacks and
                    rich of his experience using basically all the productivity
                    apps on the market, he eventually built a simple yet
                    powerful system.
                  </p>{" "}
                  <p className="text-white text-[18px] xl:text-[20px] 3xl:text-[24px] font-light">
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
                <div className="bg-layoutColor overflow-x-scroll 2xl:overflow-hidden w-[85%] xl:w-[94%] 3xl:w-[88%]  rounded-l-[55px] border-t-[2px] border-b-[2px] border-l-[2px] border-white md:h-[441px] 3xl:h-[550px] flex items-center 3xl:justify-center">
                  <div className="pt-[45px] pb-[45px] pl-[45px] 3xl:pl-0 md:flex md:items-center">
                    <div className="mb-[45px] md:mb-[unset] xl:hidden md:mr-[73px] 3xl:hidden">
                      <Avatar1 />
                    </div>
                    <div className="xl:hidden 3xl:hidden">
                      <Avatar2 />
                    </div>{" "}
                    <div className="mb-[45px] md:mb-[unset] md:mr-[73px] hidden 3xl:block">
                      <LgAvatar1 />
                    </div>
                    <div className="hidden 3xl:block">
                      <LgAvatar2 />
                    </div>{" "}
                    <div className="mb-[45px] hidden  xl:block 3xl:hidden md:mb-[unset] md:mr-[73px]  ">
                      <MdAvatar1 />
                    </div>
                    <div className="hidden xl:block 3xl:hidden ">
                      <MdAvatar2 />
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div> */}

        {/* latest section */}
        {/* <div className="bg-layoutColor relative">
          <div className="z-20 text-center">
            <div className="relative h-[650px] lg:h-[800px]">
              <div className="absolute block 3xl:hidden top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <FooterLogoSm />
              </div>{" "}
              <div className="absolute hidden 3xl:block top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <FooterLogo />
              </div>
              <div className="absolute z-10 top-1/2  transform -translate-y-1/2 pr-[14px] pt-[250px] sm:pt-[240px] lg:pt-[290px] xl:pt-[295px] 3xl:pt-[260px] pl-[14px] md:left-1/2 md:-translate-x-1/2 ">
                <p className="text-[26px] md:text-[32px] 3xl:text-[42px] text-white  mb-[140px] 3xl:mb-[180px] pl-[50px] pr-[50px] md:pr-[unset] md:pl-[unset]">
                  Get on your{" "}
                  <span className="text-customYellow">golden path</span> right
                  now
                </p>
                <p className="text-white text-[18px] md:text-[20px] 3xl:text-[26px] mb-[20px]">
                  Or go watch you tiktok garbage and miss the opportunity to
                  change your life.
                </p>
                <div className="flex justify-center">
                  <div className="pt-[27px] pb-[27px] pr-[46px] pl-[46px] w-[262px] font-light  text-customYellow text-[20px] mb-[166px] border-customYellow border-[1px] rounded-[20px] cursor-pointer ">
                    join now
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div> */}
      </section>

      {/* footer */}
      <Footer />
    </main>
  );
}
