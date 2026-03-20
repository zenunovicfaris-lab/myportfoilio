"use client";

import { FaInstagram, FaFacebook, FaLinkedinIn, FaGithub } from "react-icons/fa";

const socials = [
  {
    href: "https://www.instagram.com/znnvyc/",
    label: "Instagram",
    icon: FaInstagram,
  },
  {
    href: "https://www.facebook.com/faris.zenunovic.9/",
    label: "Facebook",
    icon: FaFacebook,
  },
  {
    href: "https://www.linkedin.com/in/fariszenunovic/",
    label: "LinkedIn",
    icon: FaLinkedinIn,
  },
  {
    href: "https://github.com/zenunovicfaris-lab",
    label: "GitHub",
    icon: FaGithub,
  },
];

export default function SocialLinks() {
  return (
    <div className="flex items-center gap-3" role="list" aria-label="Social media links">
      {socials.map(({ href, label, icon: Icon }) => (
        <a
          key={label}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={label}
          role="listitem"
          className="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-[#9ca3af] hover:text-teal-400 hover:border-teal-400/40 hover:bg-teal-400/5 transition-all duration-200"
        >
          <Icon size={15} />
        </a>
      ))}
    </div>
  );
}
