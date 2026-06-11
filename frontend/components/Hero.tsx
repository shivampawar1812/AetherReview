"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import UploadForm from "./UploadForm";

export default function Hero() {
    return (
        <section className="
            relative
            min-h-screen pt-32 pb-20
            overflow-visible
            flex
            items-center
            justify-center
            px-6
        ">

            {/* Glow */}

            <div className="
                absolute
                w-[700px]
                h-[700px]
                rounded-full
                bg-pink-600/20
                blur-[140px]
            " />

            <div className="
                relative
                z-10
                max-w-5xl
                text-center
            ">

                <motion.div
                    initial={{
                        opacity: 0,
                        y: 30,
                    }}
                    animate={{
                        opacity: 1,
                        y: 0,
                    }}
                    transition={{
                        duration: 0.8,
                    }}
                >

                    <Image
                        src="/AetherSense Logo.png"
                        alt="AetherSense"
                        width={800}
                        height={800}
                        className="
                            mx-auto
                            max-w-[90vw]
                            h-auto
                        "
                    />

                </motion.div>

                <motion.h1
                    initial={{
                        opacity: 0,
                        y: 20,
                    }}
                    animate={{
                        opacity: 1,
                        y: 0,
                    }}
                    transition={{
                        delay: 0.2,
                        duration: 0.8,
                    }}
                    className="
                        text-5xl
                        md:text-4xl
                        font-bold
                        mt-8
                    "
                >
                    Discover What's Truly Novel.
                </motion.h1>

                <motion.p
                    initial={{
                        opacity: 0,
                        y: 20,
                    }}
                    animate={{
                        opacity: 1,
                        y: 0,
                    }}
                    transition={{
                        delay: 0.4,
                        duration: 0.8,
                    }}
                    className="
                        text-zinc-400
                        text-xl
                        mt-8
                        max-w-3xl
                        mx-auto
                    "
                >
                    Upload your research paper and uncover related literature,
                    research gaps, and novel contributions using AI-powered
                    literature intelligence.
                </motion.p>

                <motion.div
                    initial={{
                        opacity: 0,
                        y: 20,
                    }}
                    animate={{
                        opacity: 1,
                        y: 0,
                    }}
                    transition={{
                        delay: 0.6,
                        duration: 0.8,
                    }}
                    className="mt-14"
                >
                    <UploadForm />
                </motion.div>

            </div>

        </section>
    );
}