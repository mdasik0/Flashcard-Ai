"use client";
import React, { useEffect } from "react";
import { GiCardRandom } from "react-icons/gi";
import { RiAiGenerate } from "react-icons/ri";
import { TbPlayCardOff } from "react-icons/tb";
import "./nav.css";
import Link from "next/link";
import logo from "../../public/flashcard-logo-3.png";
import Image from "next/image";
import { TiInfoLarge } from "react-icons/ti";
import { LuUserRound } from "react-icons/lu";
import { useSession } from "next-auth/react";

export default function Navbar() {
  useEffect(() => {
    const navbar = document.getElementById("navbar");
    const navItems = document.querySelectorAll(".nav-item");

    if (!navbar || !navItems.length) return;

    let isHovering = false;

    function calculateDistance(
      mouseX: number,
      mouseY: number,
      element: Element
    ): number {
      const rect = element.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      return Math.sqrt(
        Math.pow(mouseX - centerX, 2) + Math.pow(mouseY - centerY, 2)
      );
    }

    function applyMagnification(mouseX: number, mouseY: number) {
      const maxScale = 1.6;
      const minScale = 0.6;
      const influenceRadius = 200;

      navItems.forEach((item) => {
        const distance = calculateDistance(mouseX, mouseY, item);

        let scale;
        if (distance <= influenceRadius) {
          const factor = 1 - distance / influenceRadius;
          scale = minScale + (maxScale - minScale) * factor;
        } else {
          scale = 1;
        }

        (item as HTMLElement).style.transform = `scale(${scale})`;
      });
    }

    function resetMagnification() {
      navItems.forEach((item) => {
        (item as HTMLElement).style.transform = "scale(1)";
      });
    }

    // SOLUTION 1: Attach events to the parent container instead of navbar

    const handleMouseMove = (e: MouseEvent) => {
      // Check if mouse is near the navbar area
      const navRect = navbar.getBoundingClientRect();
      const buffer = 100; // Extra area around navbar

      if (
        e.clientX >= navRect.left - buffer &&
        e.clientX <= navRect.right + buffer &&
        e.clientY >= navRect.top - buffer &&
        e.clientY <= navRect.bottom + buffer
      ) {
        isHovering = true;
        applyMagnification(e.clientX, e.clientY);
      } else {
        if (isHovering) {
          isHovering = false;
          resetMagnification();
        }
      }
    };

    document.addEventListener("mousemove", handleMouseMove);

    // Cleanup function
    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  const {data} = useSession();
  return (
    <div className="flex flex-col items-center justify-between min-h-screen py-6">
      <div className="w-10 h-10 grid justify-center bg-[#1d1d1d] rounded-xl items-center relative">
        <Image
          className="w-9 h-9 absolute object-contain left-1 bottom-1.5"
          src={logo}
          alt="flashcard-ai logo"
        />
      </div>
      <nav
        className="navbar flex flex-col items-center justify-center gap-10 px-6"
        id="navbar"
      >
        <Link href={"/"}>
          <div className="nav-item" data-tooltip="Generate Card">
            <RiAiGenerate />
          </div>
        </Link>
        <Link href={"/cards"}>
          <div className="nav-item" data-tooltip="Cards">
            <TbPlayCardOff />
          </div>
        </Link>
        <Link href={"/decks"}>
          <div className="nav-item" data-tooltip="Decks">
            <GiCardRandom />
          </div>
        </Link>
      </nav>
      <div className="flex flex-col items-center justify-center gap-6">
        <div data-tooltip="introduction" className="w-5 h-5 border-2 text-gray-500 hover:text-gray-200 duration-300 cursor-help rounded-full flex items-center justify-center user-profile">
          <TiInfoLarge className="" />
        </div>
        <div title="User Profile" className="border cursor-pointer w-10 h-10 flex items-center justify-center rounded-full bg-[#1a1a1a] text-gray-400 hover:text-white duration-500">
          {
            data?.user?.image ? <Image className="w-full h-full rounded-full border object-cover" width={40} height={40} src={data?.user?.image} alt="user profile picture" /> :
            <LuUserRound />
          }
        </div>
      </div>
    </div>
  );
}
