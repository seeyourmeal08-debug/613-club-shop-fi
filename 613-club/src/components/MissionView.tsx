/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'motion/react';
import philosophySpotlightImg from '../assets/images/philosophy_spotlight.jpg';
// @ts-ignore
import img9656 from '../assets/images/IMG_9656.JPG';
// @ts-ignore
import img9550 from '../assets/images/IMG_9550.JPG';
import heroMainImg from '../assets/images/hero_main.jpg';

interface MissionViewProps {
  onDonateClick: () => void;
}

export default function MissionView({ onDonateClick }: MissionViewProps) {
  return (
    <div className="bg-[#fbf9f9] text-[#1b1c1c] font-sans antialiased">
      {/* Hero Section */}
      <section className="relative h-[620px] md:h-[680px] flex flex-col justify-end items-center text-center px-6 overflow-hidden pb-16">
        {/* Background Image of Hero (Ivy and model) */}
        <div className="absolute inset-0 z-0 select-none overflow-hidden">
          {/* Subtle dark gradient overlay instead of white washing for crisp detail */}
          <div className="absolute inset-0 bg-black/35 z-10" />
          <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-black/80 to-transparent z-10" />
          <img
            alt="Transformation Through Action Background"
            className="w-full h-full object-cover object-[center_36%] scale-[1.75] origin-center"
            src={heroMainImg}
            referrerPolicy="no-referrer"
          />
        </div>

        {/* Hero content */}
        <div className="relative z-20 max-w-4xl mx-auto space-y-4">
          <span className="text-xs uppercase tracking-[0.4em] text-white/90 font-mono font-bold" id="our-identity-label">
            OUR IDENTITY
          </span>
          <h1 className="text-4xl md:text-6xl font-headline font-extrabold tracking-wider text-white uppercase leading-none" id="transformation-title bg-slate-900">
            TRANSFORMATION<br />THROUGH ACTION
          </h1>
          <p className="text-sm md:text-base max-w-xl mx-auto text-neutral-200 font-light leading-relaxed">
            From the streets of Montreal to the halls of a Yeshiva. This is the story of choosing a path of purpose over a path of silence.
          </p>
        </div>
      </section>

      {/* Section 01: France to Montreal */}
      <section className="py-24 px-6 md:px-16 max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <div className="space-y-6 pr-0 md:pr-12">
          <span className="text-xs uppercase tracking-widest text-[#570013] font-mono font-semibold">
            01. THE BEGINNING
          </span>
          <h2 className="text-3xl md:text-4xl text-[#1b1c1c] font-headline font-light tracking-tight">
            France to Montreal.
          </h2>
          <div className="space-y-4 text-sm text-[#5e5e5b] font-light leading-relaxed">
            <p>
              Ten years ago, I packed my life in France and moved to Montreal as a student. I was just another face in the crowd, navigating a new culture and a new language.
            </p>
            <p>
              Life was quiet, predictable, and distinctly secular. But the world has a way of calling you back to your roots when you least expect it.
            </p>
          </div>
        </div>
        <div className="rounded-sm overflow-hidden aspect-[3/4] bg-[#efeded]">
          <img
            alt="France to Montreal Philosophy Spotlight"
            className="w-full h-full object-cover filter brightness-[0.98] hover:scale-105 transition-transform duration-700"
            src={philosophySpotlightImg}
            referrerPolicy="no-referrer"
          />
        </div>
      </section>

      {/* Section 02: A Voice in the Crowd */}
      <section className="bg-white py-24 px-6 md:px-16 border-t border-b border-[#efeded]">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="order-2 md:order-1 rounded-sm overflow-hidden aspect-[4/3] relative bg-[#efeded]" id="cteen-video-thumbnail">
            <img
              alt="The Spark image"
              className="w-full h-full object-cover select-none pointer-events-none"
              src={img9656}
              referrerPolicy="no-referrer"
            />
          </div>

          <div className="order-1 md:order-2 space-y-6 pl-0 md:pl-12">
            <span className="text-xs uppercase tracking-widest text-[#570013] font-mono font-semibold">
              02. THE SPARK
            </span>
            <h2 className="text-3xl md:text-4xl text-[#1b1c1c] font-headline font-light tracking-tight">
              A Voice in the Crowd.
            </h2>
            <p className="text-sm text-[#5e5e5b] font-light leading-relaxed">
              It started with a video supporting Israel at the CTeen Shabbaton. I didn't expect it to go viral. I didn't expect it to change everything. But when you stand for something, the world notices.
            </p>
            <div className="border-l-2 border-[#570013] pl-4 italic text-sm text-[#570013] font-light leading-relaxed">
              "Suddenly, my identity wasn't private anymore. It was public, and it was a target."
            </div>
          </div>
        </div>
      </section>

      {/* Section 03: The Weight of Conviction */}
      <section className="py-24 px-6 md:px-16 max-w-7xl mx-auto text-center space-y-12">
        <div className="max-w-2xl mx-auto space-y-4">
          <span className="text-xs uppercase tracking-widest text-[#570013] font-mono font-semibold">
            03. THE CONFRONTATION
          </span>
          <h2 className="text-3xl md:text-4xl text-[#1b1c1c] font-headline font-light tracking-tight">
            The Weight of Conviction.
          </h2>
          <p className="text-sm text-[#5e5e5b] font-light leading-relaxed">
            Following the video, the atmosphere at my school shifted. Antisemitism wasn't just a headline—it was in the hallways. For my own safety, I was forced to leave.
          </p>
        </div>

        {/* Three Columns Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left max-w-5xl mx-auto pt-8">
          <div className="space-y-4 border-t border-[#e0bfbf] pt-4">
            <h3 className="text-xs tracking-wider text-[#570013] font-mono font-semibold uppercase">
              THE CHOICE
            </h3>
            <p className="text-xs text-[#5e5e5b] font-light leading-relaxed">
              Instead of hiding, I doubled down. I began wearing Tzitzit and Tefillin daily—not as a habit, but as a shield.
            </p>
          </div>
          <div className="space-y-4 border-t border-[#efeded] pt-4">
            <h3 className="text-xs tracking-wider text-[#570013] font-mono font-semibold uppercase">
              THE TRANSITION
            </h3>
            <p className="text-xs text-[#5e5e5b] font-light leading-relaxed">
              I transferred to a Jewish school, seeking a community that wouldn't ask me to apologize for who I am.
            </p>
          </div>
          <div className="space-y-4 border-t border-[#efeded] pt-4">
            <h3 className="text-xs tracking-wider text-[#570013] font-mono font-semibold uppercase">
              THE DESTINATION
            </h3>
            <p className="text-xs text-[#5e5e5b] font-light leading-relaxed">
              Now, the journey leads to Israel. A full year of immersive study in Yeshiva. The search for true depth.
            </p>
          </div>
        </div>
      </section>

      {/* Section 04: The Core Mandate - Split Banner */}
      <section className="grid grid-cols-1 md:grid-cols-12 min-h-[600px] border-t border-b border-[#efeded]">
        {/* Left Side: Tallit Image */}
        <div className="md:col-span-6 relative bg-[#efeded]">
          <img
            alt="The Core Mandate image"
            className="w-full h-full object-cover select-none"
            src={img9550}
            referrerPolicy="no-referrer"
          />
        </div>

        {/* Right Side: Deep crimson background description */}
        <div className="md:col-span-6 bg-[#570013] text-white flex flex-col justify-center p-8 md:p-16 space-y-6">
          <span className="text-xs uppercase tracking-widest text-[#ff828b] font-mono font-semibold">
            THE CORE MANDATE
          </span>
          <h2 className="text-4xl md:text-5xl font-light font-headline tracking-tight text-white uppercase leading-none">
            100% PROFIT<br />DONATION.
          </h2>
          <div className="space-y-4 text-xs font-light text-white/90 leading-relaxed">
            <p className="font-medium text-sm">
              Every garment created under the 613 CLUB label exists to fund this mission of spiritual education.
            </p>
            <p>
              We don't just sell clothes; we architect a future. Every purchase directly supports my journey to study in Yeshiva, ensuring that the light lit in Montreal continues to burn brighter in Jerusalem.
            </p>
          </div>
          <button
            onClick={onDonateClick}
            className="w-fit bg-white hover:bg-[#e1dfdb] text-[#570013] text-[10px] font-mono font-bold tracking-[0.2em] px-8 py-4 transition-colors uppercase border border-transparent shadow-sm hover:scale-[1.02] duration-300"
            id="donate-cta-button"
          >
            SUPPORT THE MISSION →
          </button>
        </div>
      </section>

      {/* Centered Quote Section before Footer */}
      <section className="py-24 text-center px-6">
        <div className="max-w-xl mx-auto space-y-6">
          <p className="text-[#1b1c1c] text-xl font-headline font-light tracking-tight leading-relaxed">
            613 CLUB isn't a brand. It's a commitment to higher spiritual education.
          </p>
          <div className="h-[1.5px] w-12 bg-[#570013] mx-auto"></div>
          <p className="text-xs tracking-widest text-[#5e5e5b] font-mono">
            Thank you for being part of the story.
          </p>
        </div>
      </section>
    </div>
  );
}
