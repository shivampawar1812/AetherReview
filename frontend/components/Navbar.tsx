"use client";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

export default function Navbar() {
    return (
        <motion.nav
            initial={{ y: -30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="
                fixed
                top-0
                left-0
                right-0
                z-50
                backdrop-blur-md
                bg-black/30
                border-b
                border-white/10
            "
        >
            <div className="
                max-w-7xl
                mx-auto
                px-8
                py-5
                flex
                justify-between
                items-center
            ">

                <div className="flex items-center gap-3">

                    <Image
                        src="/AetherSense.png"
                        alt="AetherSense"
                        width={1800}
                        height={1800}
                        className="
                            w-40
                            h-auto
                            object-contain
                            transition-transform
                            duration-300
                            hover:scale-110
                        "
                    />

                </div>

                <div className="
                    flex
                    gap-8
                    text-0.7xl
                    text-zinc-300
                ">

                    <Link href="#how">
                        How It Works
                    </Link>

                    <Link href="#features">
                        Features
                    </Link>

                    <Link
                        href="https://github.com/shivampawar1812/AetherSense"
                        target="_blank"
                    >
                        GitHub
                    </Link>

                </div>

            </div>
        </motion.nav>
    );
}