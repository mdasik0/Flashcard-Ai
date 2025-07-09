'use client'
import React, { useEffect } from "react";
import { GiCardRandom } from "react-icons/gi";
import { RiAiGenerate } from "react-icons/ri";
import { TbPlayCardOff } from "react-icons/tb";
import './nav.css';

export default function Navbar() {
   useEffect(() => {
     const navbar = document.getElementById('navbar');
     const navItems = document.querySelectorAll('.nav-item');
     
     if (!navbar || !navItems.length) return;
     
     let isHovering = false;
     
     function calculateDistance(mouseX: number, mouseY: number, element: Element): number {
       const rect = element.getBoundingClientRect();
       const centerX = rect.left + rect.width / 2;
       const centerY = rect.top + rect.height / 2;
       
       return Math.sqrt(Math.pow(mouseX - centerX, 2) + Math.pow(mouseY - centerY, 2));
     }
     
     function applyMagnification(mouseX: number, mouseY: number) {
       const maxScale = 1.6;      // Maximum scale for the closest item
       const minScale = 0.6;      // Minimum scale for distant items
       const influenceRadius = 200; // Distance within which items are affected
       
       navItems.forEach(item => {
         const distance = calculateDistance(mouseX, mouseY, item);
         
         // Calculate scale based on distance
         let scale;
         if (distance <= influenceRadius) {
           // Linear interpolation between maxScale and minScale
           const factor = 1 - (distance / influenceRadius);
           scale = minScale + (maxScale - minScale) * factor;
         } else {
           scale = 1; // Default scale for items outside influence radius
         }
         
         // Apply transform
         (item as HTMLElement).style.transform = `scale(${scale})`;
       });
     }
     
     function resetMagnification() {
       navItems.forEach(item => {
         (item as HTMLElement).style.transform = 'scale(1)';
       });
     }
     
     // Event handlers
     const handleMouseMove = (e: MouseEvent) => {
       isHovering = true;
       applyMagnification(e.clientX, e.clientY);
     };
     
     const handleMouseEnter = () => {
       isHovering = true;
     };
     
     const handleMouseLeave = () => {
       isHovering = false;
       resetMagnification();
     };
     
     const handleTransitionEnd = () => {
       if (!isHovering) {
         navItems.forEach(item => {
           (item as HTMLElement).style.transform = 'scale(1)';
         });
       }
     };
     
     const handleClick = (index: number, item: Element) => {
       console.log(`Clicked nav item ${index + 1}: ${(item as HTMLElement).dataset.tooltip}`);
       // Add your click handling logic here
     };
     
     // Add event listeners
     navbar.addEventListener('mousemove', handleMouseMove);
     navbar.addEventListener('mouseenter', handleMouseEnter);
     navbar.addEventListener('mouseleave', handleMouseLeave);
     
     // Add individual item event listeners
     const clickHandlers: ((e: Event) => void)[] = [];
     const transitionHandlers: ((e: Event) => void)[] = [];
     
     navItems.forEach((item, index) => {
       const clickHandler = () => handleClick(index, item);
       const transitionHandler = () => handleTransitionEnd();
       
       clickHandlers.push(clickHandler);
       transitionHandlers.push(transitionHandler);
       
       item.addEventListener('click', clickHandler);
       item.addEventListener('transitionend', transitionHandler);
     });
     
     // Cleanup function
     return () => {
       if (navbar) {
         navbar.removeEventListener('mousemove', handleMouseMove);
         navbar.removeEventListener('mouseenter', handleMouseEnter);
         navbar.removeEventListener('mouseleave', handleMouseLeave);
       }
       
       navItems.forEach((item, index) => {
         if (clickHandlers[index]) {
           item.removeEventListener('click', clickHandlers[index]);
         }
         if (transitionHandlers[index]) {
           item.removeEventListener('transitionend', transitionHandlers[index]);
         }
       });
     };
   }, []);
   
   return (
     <nav className="navbar min-h-screen flex flex-col items-center justify-center gap-10 px-6" id="navbar">
       <div className="nav-item" data-tooltip="Generate Card">
         <RiAiGenerate />
       </div>
       <div className="nav-item" data-tooltip="Settings">
         <TbPlayCardOff />
       </div>
       <div className="nav-item" data-tooltip="Profile">
         <GiCardRandom />
       </div>
     </nav>
   );
}