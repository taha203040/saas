"use client";
import Image from "next/image";
import Lottie, { LottieRefCurrentProps } from "lottie-react";
import { cn, configureAssistant, getSubjectColor } from "@/lib/utils";
import { vapi_Provider } from "@/lib/vapi_sdk";
import soundwaves from "@/constants/soundwaves.json";
enum Callstatus {
  INACTIVE = "INACTIVE",
  ACTIVE = "ACTIVE",
  CONTECTING = "CONTECTING",
  FINICHEND = "FINICHEND",
}
import { useEffect, useRef, useState } from "react";
import { addToSessionHistory } from "@/lib/actions/companion.action";
import { useUser } from "@clerk/nextjs";
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
  const [isMuted, setisMuted] = useState(false);
  const [messages, setmessages] = useState<SavedMessage[]>([]);
  const lottieRef = useRef<LottieRefCurrentProps>(null);
const {user } = useUser()
  const handleConnect = async () => {
    setcallStatus(Callstatus.CONTECTING);
    const assistantOverrides = {
      variableValues: {
        subject,
        topic,
        style,
      },
      // clientMessages: ["transcript"],
      // serverMessages: "",
    };

    // @ts-ignore
    await vapi_Provider.start(
      configureAssistant(voice, style),
      assistantOverrides
    );
  };
  const handleDisconnect = async () => {
    setcallStatus(Callstatus.FINICHEND);
    vapi_Provider.stop();
  };
  useEffect(() => {
    if (lottieRef) {
      if (isSpeaking) lottieRef.current?.play();
      else {
        lottieRef.current?.stop();
      }
    }
  }, [lottieRef, isSpeaking]);

  useEffect(() => {
    const onCallStart = () => setcallStatus(Callstatus.ACTIVE);
    const onCallend = async () => {
      setcallStatus(Callstatus.FINICHEND);
      await addToSessionHistory(companionId);
    };
    const onError = (error: Error) => console.error("Error in call:", error);
    const onSpeechStart = () => setisSpeaking(true);
    const onSpeechEnd = () => setisSpeaking(false);
    const onMessage = (message: Message) => {
      if (message.type === "transcript" && message.transcriptType === "final") {
        const newMessage = {
          role: message.role,
          content: message.transcript,
        };
        setmessages((prev) => [newMessage, ...prev]);
      }
    };
    vapi_Provider.on("call-start", onCallStart);
    vapi_Provider.on("call-end", onCallend);
    vapi_Provider.on("error", onError);
    vapi_Provider.on("message", onMessage);
    vapi_Provider.on("speech-start", onSpeechStart);
    vapi_Provider.on("speech-end", onSpeechEnd);
    return () => {
      vapi_Provider.off("call-start", onCallStart);
      vapi_Provider.off("call-end", onCallend);
      vapi_Provider.off("error", onError);
      vapi_Provider.off("message", onMessage);
      vapi_Provider.off("speech-start", onSpeechStart);
      vapi_Provider.off("speech-end", onSpeechEnd);
    };
  }, []);
  const toggleMic = () => {
    const isMuted = vapi_Provider.isMuted();
    vapi_Provider.setMuted(!isMuted);
    setisMuted(!isMuted);
  };
  return (
    <section className="flex flex-col h-[70vh]">
      <section className="flex gap-8 max-sm:flex-col">
        <div className="companion-section">
          <div className="companion-avatar"></div>

          <div
            className={cn(
              "absolute transition-opacity duration-1000",
              // @ts-ignore
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
              className="max-sm:w-fit"
            />
          </div>
          <div
            className={cn(
              "absolute transition-opacity duration-1000",
              callStatus === Callstatus.ACTIVE ? "opacity-100" : "opacity-0"
            )}
          >
            <Lottie
              lottieRef={lottieRef}
              animationData={soundwaves}
              autoPlay={false}
              className="companion-lottie"
            />
          </div>
          <p className="font-bold text-2xl">{name}</p>
        </div>
        <div className="user-section">
          <div className="user-avatar">
            <Image
            // @ts-ignore
              src={user?.imageUrl}
              height={80}
              width={80}
              alt="avatar"
              className="rounded-lg"
            />
          </div>
          <button
            className="btn-mic"
            onClick={toggleMic}
            disabled={callStatus != Callstatus.ACTIVE}
          >
            <Image
              src={isMuted ? "/icons/mic-off.svg" : "/icons/mic-on.svg"}
              alt="micBtn"
              width={20}
              height={20}
            />
            <p className="max-sm:hidden">{isMuted ? "Unmute" : "Mute"}</p>
          </button>
          <button
            className={cn(
              "rounded-lg py-2 cursor-pointer transition-colors w-full text-white",
              callStatus === Callstatus.ACTIVE ? "bg-red-700" : "bg-primary"
            )}
            onClick={
              callStatus === Callstatus.ACTIVE
                ? handleDisconnect
                : handleConnect
            }
          >
            {callStatus === Callstatus.ACTIVE
              ? "End Session"
              : callStatus === Callstatus.CONTECTING
              ? "Connecting"
              : "Start Session"}
          </button>
        </div>
      </section>
      <section className="transcript">
        <div className="transcript-message no-scrollBar">
          {messages.map((message) => {
            if (message.role === "assistant") {
              return (
                <p key={message.content} className="">
                  {name.split(" ")[0].replace(/[.,]/g, "")}:{message.content}
                </p>
              );
            } else {
              return (
                <p
                  key={message.content}
                  className="text-primary max-sm:text-sm"
                >
                  {userName}:{message.content}
                </p>
              );
            }
          })}
        </div>
        <div className="transcript-fade" />
      </section>
    </section>
  );
};
