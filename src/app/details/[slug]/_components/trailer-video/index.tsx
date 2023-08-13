"use client"

import { TrailerDetailsDto } from "@/dtos/app.dto";
import classNames from "classnames";
import BannerView from "@/components/banner-view.component";
import TrailerInfo from "./trailer-info";
import { useRef, useState } from "react";

export default function TrailerVideo({ className, trailerDetails }
    : { className?: string, trailerDetails: TrailerDetailsDto }) {

    const [isVideoPlaying, setIsVideoPlaying] = useState(false);

    const videoRef = useRef<HTMLVideoElement>(null);

    const onPlay = () => {
        if (videoRef.current?.paused || videoRef.current?.ended) {
            videoRef.current?.play();
        } else {
            videoRef.current?.pause();
        }
    }

    return (
        <div className={classNames(
            "relative",
            className
        )}>
            <BannerView>
                <div className="w-full bg-gray-500 max-h-[816px] overflow-hidden">
                    <video
                        ref={videoRef}
                        className="w-full"
                        src={trailerDetails.trailerURL}
                        poster={trailerDetails.thumbnailURL}
                        onPlay={() => {
                            setIsVideoPlaying(true);
                        }}
                        onPause={() => {
                            setIsVideoPlaying(false);
                        }}
                        onEnded={() => {
                            setIsVideoPlaying(false);
                            videoRef.current?.load();
                        }}
                    >
                    </video>
                </div>
            </BannerView>

            <TrailerInfo className="absolute bottom-0 left-1/2 -translate-x-1/2"
                trailerDetails={trailerDetails}
                isPlaying={isVideoPlaying}
                onPlay={onPlay} />
        </div>
    );
}