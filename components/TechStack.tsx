"use client";
import React from "react";
import Image from "next/image";
import Slider from "react-infinite-logo-slider";
import figma from "@/lib/images/figma.webp";
import git from "@/lib/images/git.webp";
import github1 from "@/lib/images/github1.webp";
import nextjs from "@/lib/images/nextjs.webp";
import ts from "@/lib/images/ts.webp";
import postman from "@/lib/images/postman.webp";
import react from "@/lib/images/react.webp";
import tailwind from "@/lib/images/tailwind.webp";

export default function TechStack() {
  return (
    <div>
      <Slider
        width={"170px"}
        duration={60}
        pauseOnHover={false}
        blurBorders={true}
        blurBorderColor={"#0B0F1A"}
      >
        <Slider.Slide>
          <div className="bg-white rounded-[50%] p-2 w-[50px] h-[50px] md:w-[60px] md:h-[60px] ">
            <Image src={react} alt="alt" width={100} />
          </div>
        </Slider.Slide>
        <Slider.Slide>
          <div className="bg-white rounded-[50%] p-2 w-[50px] h-[50px] md:w-[60px] md:h-[60px] ">
            <Image src={ts} alt="alt" width={100} />
          </div>
        </Slider.Slide>
        <Slider.Slide>
          <div className="bg-white rounded-[50%] p-2 w-[50px] h-[50px] md:w-[60px] md:h-[60px] ">
            <Image src={nextjs} alt="alt" width={100} />
          </div>
        </Slider.Slide>
        <Slider.Slide>
          <div className="bg-white rounded-[50%] p-2 w-[50px] h-[50px] md:w-[60px] md:h-[60px] ">
            <Image src={postman} alt="alt" width={100} />
          </div>
        </Slider.Slide>
        <Slider.Slide>
          <div className="bg-white rounded-[50%] p-2 w-[50px] h-[50px] md:w-[60px] md:h-[60px] ">
            <Image src={figma} alt="alt" width={100} />
          </div>
        </Slider.Slide>
        <Slider.Slide>
          <div className="bg-white rounded-[50%] p-2 w-[50px] h-[50px] md:w-[60px] md:h-[60px] ">
            <Image src={tailwind} alt="alt" width={100} />
          </div>
        </Slider.Slide>
        <Slider.Slide>
          <div className="bg-white rounded-[50%] p-2 w-[50px] h-[50px] md:w-[60px] md:h-[60px] ">
            <Image src={git} alt="alt" width={100} />
          </div>
        </Slider.Slide>
        <Slider.Slide>
          <div className="bg-white rounded-[50%] p-2 w-[50px] h-[50px] md:w-[60px] md:h-[60px] ">
            <Image src={github1} alt="alt" width={100} />
          </div>
        </Slider.Slide>
      </Slider>
    </div>
  );
}
