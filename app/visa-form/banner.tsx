

"use client";  

import Image from 'next/image'
import banner from "@/public/images/logo-bg.png";
import "./banner.css";
export default function VisaFormBanner() {
    return (
        <div className="banner-container">
            <Image
                className="banner-image"
                src={banner}
                alt="Visa Form Banner"
            />
            <div className="banner-text">
                Get An Assessment Of Your Immigration Case
            </div>
        </div>
    );
}