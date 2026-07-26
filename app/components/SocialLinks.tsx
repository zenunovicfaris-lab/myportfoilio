"use client";

import { FaInstagram, FaFacebook, FaLinkedinIn, FaGithub, FaYoutube } from "react-icons/fa";

import { PROFILES } from "../../lib/entity";

// Hrefs come from PROFILES so the visible links can never drift from schema sameAs.
const socials = [
  { href: PROFILES.instagram, label: "Instagram", icon: FaInstagram },
  { href: PROFILES.facebook, label: "Facebook", icon: FaFacebook },
  { href: PROFILES.linkedin, label: "LinkedIn", icon: FaLinkedinIn },
  { href: PROFILES.youtube, label: "YouTube", icon: FaYoutube },
  { href: PROFILES.github, label: "GitHub", icon: FaGithub },
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
