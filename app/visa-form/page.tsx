"use client";

import {RootState} from "../lib/store";
import {useSelector} from "react-redux";
import {useRouter} from "next/navigation";
import VisaFormBanner from "./banner";
import VisaForm from "./visa-form";

export default function LeadForm() {
  const user = useSelector((state: RootState) => state.user);
  const router = useRouter();
  if (!user.user.authenticated) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <VisaFormBanner />
        <VisaForm />
      </div>
    );
  } else {
    router.push("/lead-management");
  }
}
