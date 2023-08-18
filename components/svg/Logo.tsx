import React from "react";
import Image from "next/image";

interface LogoProps {
    width?: number;
    height?: number;
}

export default function Logo({ width = 100, height = 100 }: LogoProps) {
    return (
        <Image
            className={`w-${width} h-${height}`}
            src="./logo.svg"
            alt="logo"
            width={width}
            height={height}
        />
    );
};

