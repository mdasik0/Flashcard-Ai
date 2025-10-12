"use client";
import React, { useEffect } from "react";
import { GiCardRandom } from "react-icons/gi";
import { RiAiGenerate } from "react-icons/ri";
import { TbPlayCardOff } from "react-icons/tb";
import "./nav.css";
import Link from "next/link";
import logo from "../../public/flashcard-logo-3.png";
import Image from "next/image";
import IntroductionButton from "../UtilityComp/IntroductionButton";
import UserProfile from "./UserProfile/UserProfile";
import AuthButton from "../UtilityComp/AuthButton";
import { usePathname } from 'next/navigation';
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

  return (
    <>
      <NavForDeskTopLayout />
      <NavForMobileLayout />
    </>
  );
}

export function NavForDeskTopLayout() {
  return (
    <div className="hidden sm:flex flex-col items-center justify-between min-h-screen py-6">
      {/* logo */}
      <div
        data-tooltip="Flashcard - Ai"
        className="w-10 h-10 grid justify-center bg-[#1d1d1d] rounded-xl items-center relative logo-tooltip"
      >
        <Image
          className="w-9 h-9 absolute object-contain left-1 bottom-1.5"
          src={logo}
          alt="flashcard-ai logo"
          width={36}
          height={36}
          fetchPriority="high"
          loading="eager"
          decoding="async"
        />
      </div>

      {/* nav items */}
      <DeskTopAndTabNav />

      {/* utility items */}
      <div className="flex flex-col items-center justify-center gap-6">
        <IntroductionButton />
        <UserProfile />
      </div>
    </div>
  );
}

export function NavForMobileLayout() {
      const pathname = usePathname();
        const { data } = useSession();
      
  return (
    <div className="sm:hidden block">
      <div className="absolute top-0 left-0 w-full flex justify-between items-center p-3">
        {/* logo */}
        <div
          data-tooltip="Flashcard - Ai"
          className="w-10 h-10 grid justify-center bg-[#1d1d1d] rounded-xl items-center relative logo-tooltip"
        >
          <Image
            className="w-9 h-9 absolute object-contain left-1 bottom-1.5"
            src={logo}
            alt="flashcard-ai logo"
            width={36}
            height={36}
            fetchPriority="high"
            loading="eager"
            decoding="async"
          />
        </div>
        {data?.user ? <UserProfile /> : <AuthButton desktop={false} />}
      </div>
      <div className="absolute bottom-0 right-0 w-full max-w-[640px] flex items-center justify-center">
        <nav className="relative h-18 w-[350px] flex items-center justify-center">
          <ul className="flex items-center justify-center gap-6 w-[350px] bg-[#191919] rounded-xl duration-300">
            <li className={`indicator absolute w-16 h-16 bg-[#1a1a1a] -translate-y-[35px] duration-300 ease-in-out border-6 border-[#0A0A0A] ${pathname === '/' ? 'translate-x-[-94px]' : pathname === '/cards' ? 'translate-x-[0px]' : pathname === '/decks' ? 'translate-x-[94px]' : ''} rounded-full`}></li>
            <li className="relative list-none w-[70px] h-[70px] z-[1]">
              <Link className="relative flex items-center justify-center flex-col h-full text-center font-[500]" href={"/"}>
                <span className={`relative block leading-[75px] text-[2em] ${pathname === '/' ? '-translate-y-9' : ''} text-center duration-150`}><RiAiGenerate /></span>
                <span className={`absolute text-[0.90em] font-bold duration-200 ${pathname !== '/' ? 'opacity-0' : 'translate-y-3 opacity-100'}`}>Generate</span>
              </Link>
            </li>
            <li className="relative list-none w-[70px] h-[70px] z-[1]">
              <Link className="relative flex items-center justify-center flex-col h-full text-center font-[500]" href={"/cards"}>
                <span className={`relative block leading-[75px] text-[2em] ${pathname === '/cards' ? '-translate-y-9' : ''} text-center duration-150`}><TbPlayCardOff /></span>
                <span className={`absolute text-[0.90em] font-bold duration-200 ${pathname !== '/cards' ? 'opacity-0' : 'translate-y-3 opacity-100'}`}>Cards</span>
              </Link>
            </li>
            <li className="relative list-none w-[70px] h-[70px] z-[1]">
              <Link className="relative flex items-center justify-center flex-col h-full text-center font-[500]" href={"/decks"}>
                <span className={`relative block leading-[75px] text-[2em] ${pathname === '/decks' ? '-translate-y-9' : ''} text-center duration-150`}><GiCardRandom /></span>
                <span className={`absolute text-[0.90em] font-bold duration-200 ${pathname !== '/decks' ? 'opacity-0' : 'translate-y-3 opacity-100'}`}>Decks</span>
              </Link>
            </li>
          </ul>
        </nav>
      </div>
      </div>
  );
}

export function DeskTopAndTabNav() {
  return (
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
  );
}
