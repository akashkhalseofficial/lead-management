"use client";

import "./visa-form.css";
import Image from "next/image";
import fileIcon from "@/public/images/file-icon.png";
import diceIcon from "@/public/images/dice.png";
import heartIcon from "@/public/images/heart.png";
import {useRouter} from "next/navigation";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import * as yup from "yup";
import {pushObjectToIndexedDB} from "../indexDbService";
export default function VisaForm() {
  const schema = yup.object().shape({
    firstName: yup.string().required("First name is required"),
    lastName: yup.string().required("Last name is required"),
    email: yup
      .string()
      .required("Email is required")
      .matches(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Enter a valid email address"),
    linkedInProfile: yup
      .string()
      .required("LinkedIn profile is required")
      .matches(
        /^https:\/\/(www\.)?linkedin\.com\/.*$/,
        "Must be a valid LinkedIn profile URL starting with https://"
      ),
    visasOfInterest: yup
      .array()
      .of(yup.string())
      .required("Visa options are required"),
    resume: yup.mixed().required("Resume is required"),
    additionalInfo: yup.string().required("Additional information is required"),
  });
  const {
    register,
    handleSubmit,
    formState: {errors},
  } = useForm({
    resolver: yupResolver(schema),
  });
  const router = useRouter();
  const visaOptions = ["O-1", "EB-1A", "Eb-1A", "I don't know"];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onSubmit = async (formData: any) => {
    const payload = {...formData, status: "pending"};
    const res = await fetch("/api/visa-form", {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(payload),
    });
    if (res.ok) {
      console.log("Form submitted successfully");
      pushObjectToIndexedDB(payload);
      router.push("/visa-form/successful-submission");
    } else {
      console.log("Form submission failed");
    }
  };

  return (
    <div className="visa-form-container">
      <div className="form-header">
        <Image src={fileIcon} alt="logo" />
        <h2>Want to understand your visa options?</h2>
        <p>
          Submit the form below to our team of experienced attorneys will review
          your information and send a preliminary assessment of your case based
          on your goals.
        </p>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="">
        <input
          type="text"
          placeholder="First Name"
          {...register("firstName")}
          className="border p-2 w-full"
        />
        {errors.firstName && (
          <span className="error-message">{errors.firstName.message}</span>
        )}
        <input
          type="text"
          placeholder="Last Name"
          {...register("lastName")}
          className="border p-2 w-full"
        />
        {errors.lastName && (
          <span className="error-message">{errors.lastName.message}</span>
        )}
        <input
          type="email"
          placeholder="Email"
          {...register("email")}
          className="border p-2 w-full"
        />
        {errors.email && (
          <span className="error-message">{errors.email.message}</span>
        )}
        <div className="form-header dice">
          <Image src={diceIcon} alt="logo" />
          <h2>Visa categories of interest?</h2>
        </div>
        <div className="visa-options-container">
          {visaOptions.map((visa, index) => (
            <div key={index}>
              <input
                type="checkbox"
                id={visa}
                {...register("visasOfInterest")}
              />
              <label htmlFor={visa}>{visa}</label>
            </div>
          ))}
        </div>
        {errors.visasOfInterest && (
          <span
            className="error-message"
            style={{margin: "15px 0", maxWidth: "100%"}}
          >
            {errors.visasOfInterest.message}
          </span>
        )}

        <input
          type="text"
          placeholder="LinkedIn Profile"
          {...register("linkedInProfile")}
          className="border p-2 w-full"
        />
        {errors.linkedInProfile && (
          <span className="error-message">
            {errors.linkedInProfile.message}
          </span>
        )}
        <input
          type="file"
          {...register("resume")}
          className="border p-2 w-full"
        />
        {errors.resume && (
          <span className="error-message">{errors.resume.message}</span>
        )}
        <div className="form-header heart">
          <Image src={heartIcon} alt="logo" />
          <h2>How can we help you?</h2>
        </div>
        <textarea
          placeholder="Additional Information"
          {...register("additionalInfo")}
          className="border p-2 w-full"
        />
        {errors.additionalInfo && (
          <span className="error-message">{errors.additionalInfo.message}</span>
        )}
        <button type="submit" className="bg-blue-500 text-white px-4 py-2">
          Submit
        </button>
      </form>
    </div>
  );
}
