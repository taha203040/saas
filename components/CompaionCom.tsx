"use client";
import Image from "next/image";
import {LottieRefCurrentProps} from "lottie-react";
import { cn, getSubjectColor } from "@/lib/utils";
import { vapi_Provider } from "@/lib/vapi_sdk";
enum Callstatus {
  INACTIVE = "INACTIVE",
  ACTIVE = "ACTIVE",
  CONTECTING = "CONTECTING",
  FINICHEND = "FINICHEND",
}

import { useEffect, useRef, useState } from "react";
export const CompanionCom = ({
  subject,
  name,
  topic,
  companionId,
  userImage,
  userName,
  style,
  voice,
}: CompanionComponentProps) => {
  const [callStatus, setcallStatus] = useState<Callstatus>(Callstatus.INACTIVE);
  const [isSpeaking, setisSpeaking] = useState(false);
 const lottieRef = useRef<LottieRefCurrentProps>(null);
  useEffect(() => {
    const onCallStart = () => setcallStatus(Callstatus.ACTIVE);
    const onCallend = () => setcallStatus;
    const onCallMessage = () => {}; // Handle call messages if needed
    const onError = (error: Error) => console.error("Error in call:", error);
    const onSpeechStart = () => setisSpeaking(true);
    const onSpeechEnd = () => setisSpeaking(false);

    vapi_Provider.on("call-start", onCallStart);
    vapi_Provider.on("call-end", onCallend);
    vapi_Provider.on("error", onError);
    vapi_Provider.on("message", onCallMessage);
    vapi_Provider.on("speech-start", onSpeechStart);
    vapi_Provider.on("speech-end", onSpeechEnd);
    return () => {
      vapi_Provider.off("call-start", onCallStart);
      vapi_Provider.off("call-end", onCallend);
      vapi_Provider.off("error", onError);
      vapi_Provider.off("message", onCallMessage);
      vapi_Provider.off("speech-start", onSpeechStart);
      vapi_Provider.off("speech-end", onSpeechEnd);
    };
  }, []);
  return (
    <section className="flex flex-col h-[70vh]">
      <section className="flex gap-8 max-sm:flex-col">
        <div
          className="companion-section"
        >
          <div className="companion-avatar"></div>
          <div
            className={cn(
              "absolute transition-opacity duration-1000",
              callStatus === Callstatus.FINICHEND || Callstatus.INACTIVE
                ? " opacity-1001"
                : "opacity-0",
              callStatus === Callstatus.CONTECTING &&
                "opacity-100 animate-pulse"
            )}
          >
            <Image
              src={`/icons/${subject}.svg`}
              width={150}
              height={150}
              alt="subject"
            />
            <p className="font-bold text-2xl my-4">{topic}</p>
          </div>
        </div>
      </section>
    </section>
  );
};
