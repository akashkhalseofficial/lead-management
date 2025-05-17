"use client";

import Image from "next/image";
import fileIcon from "@/public/images/file-icon.png";
import "./index.css";
import {useRouter} from "next/navigation";
export default function VisaFormSubmitted() {
  const router = useRouter();
  return (
    <div className="form-submitted-container">
      <Image className="banner-image" src={fileIcon} alt="Visa Form Banner" />
      <h2>Thank You</h2>
      <p>
        Your informtation was submitted to our team of immigration
        attorneys.Expect an email from hello@tryalma.ai
      </p>
      <button onClick={() => router.push("/")}>Go Back to Homepage</button>
    </div>
  );
}
