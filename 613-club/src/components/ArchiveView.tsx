/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'motion/react';

export default function ArchiveView() {
  const archiveItemsLocal = [
    {
      id: 'arch-1',
      name: '613 CLUB HOODIE (GREY)',
      src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAPwc07qlHjhrwhsgm6gYi6iKq4upt7F-9eqhD-Pjsn1aEE2At26Accjlwlh-FTtamDE5bQSgJyamrD__mMAvoywPa14pjrGHBowfOGqftZz17hPZpPv8414OYN9kMAhIIGDthftIWaexRBQYhSAQEvSrRj4vB3mrAlTlB9fWTBWgg8aKcMvWnF7dXa14va2BMtFmI_vI2pMg5sIWaqcSFbwKZP1DdHV6jaXsnzS5Fs76UWdLBiqZEB0TuhNmBqe9Mi0kowwh3Uc8Kt'
    },
    {
      id: 'arch-2',
      name: '613 CLUB HOODIE WITH EMBROIDERY',
      src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDoQc2iMqeAq42TZs0WpGAlUZaFP4fUNeOSIp21RRoRoKS8f_vjI0kOmPunMxu_WjnXNRCXmnK2UG2T8sCvg7Rt3SuJc_trONJOgaUDD1Vk-6-agimqpZrg0iEjmGgFlFXkjCqF4uS8lXYt_b5DPREVeQOhP1mz9n8DiGjwxHEEnGyVXv1XRoi6f98PtO0fsKxC7RwdwnFwu9pEl2PP6P0VsQ9Y8xhDOstiP2qT6HTXvOVJBvRRTdhxwyDOF_3R5eaW7Z1jPEz_tJAs'
    },
    {
      id: 'arch-3',
      name: '613 CLUB HOODIE COUCH ARCHITECTURE',
      src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCyJYpUrZFW3dXd3ypgB2LYuPZ7UYNDuwCBA42pXCUBNb8ML-PeEDC9D8Y7Mi5SG9AXVV_GuQEmN9DnlhphCoh5nQ0X7CrcqX5M6DrPpd7WoG2gnUAdQXcZ2hZhjPEgXYrdOd8aLf00ULrIWOkpEZNUGqKnKJVBAqt6XWMx3zYcFEuWe1I95n_GgnPdqNT1aN5W_CB20QbWzGKcR7HN0wU04vOWvr3Eh3_0rhdITiqw-IvCXqAwha-8WWVH4So9EuolIhb-cVpK-Mfg'
    }
  ];

  return (
    <div className="bg-[#fbf9f9] text-[#1b1c1c] font-sans antialiased min-h-screen pt-32 pb-24">
      {/* Centered Archive Header */}
      <header className="text-center mb-16 px-6">
        <h1 className="text-2xl md:text-3xl font-light font-headline tracking-[0.4em] text-[#570013] uppercase">
          ARCHIVE / DROP 01
        </h1>
        <div className="h-[1px] w-12 bg-[#570013] mx-auto mt-6"></div>
      </header>

      {/* Monolith Gallery Grid */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-7xl mx-auto px-6 md:px-12">
        {archiveItemsLocal.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.15, duration: 0.6 }}
            className="relative aspect-[3/4] group overflow-hidden bg-[#efeded] shadow-sm hover:shadow-md transition-shadow duration-300"
            id={`archive-item-${item.id}`}
          >
            <img
              alt={item.name}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              src={item.src}
              referrerPolicy="no-referrer"
            />
            {/* Blurry Sold Out Overlay */}
            <div className="absolute inset-0 flex items-center justify-center bg-black/25 backdrop-blur-[4px]">
              <span className="font-mono text-[10px] md:text-xs font-semibold text-white border border-white/30 px-8 py-3.5 tracking-[0.5em] bg-black/20 backdrop-blur-md uppercase">
                SOLD OUT
              </span>
            </div>
            <div className="absolute bottom-0 left-0 w-full h-[1px] bg-[#e0bfbf]"></div>
          </motion.div>
        ))}
      </section>
    </div>
  );
}
