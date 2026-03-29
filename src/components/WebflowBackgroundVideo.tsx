"use client";

import React, { useRef, useState, useEffect } from "react";

interface WebflowBackgroundVideoProps {
    posterUrl: string;
    videoMp4: string;
    videoWebm: string;
    id?: string;
}

export default function WebflowBackgroundVideo({
    posterUrl,
    videoMp4,
    videoWebm,
    id,
}: WebflowBackgroundVideoProps) {
    const videoRef = useRef<HTMLVideoElement>(null);
    const [isPlaying, setIsPlaying] = useState(false);

    useEffect(() => {
        const video = videoRef.current;
        if (!video) return;

        // Try to play immediately if video is ready
        const attemptPlay = () => {
            const playPromise = video.play();
            if (playPromise !== undefined) {
                playPromise
                    .then(() => setIsPlaying(true))
                    .catch(() => setIsPlaying(false));
            }
        };

        // Listen for when video can play
        const handleCanPlay = () => {
            // Check if video is in viewport before auto-playing
            const rect = video.getBoundingClientRect();
            const isInViewport = rect.top < window.innerHeight && rect.bottom > 0;
            if (isInViewport) {
                attemptPlay();
            }
        };

        video.addEventListener('canplay', handleCanPlay);

        // If video is already loaded, try to play
        if (video.readyState >= 3) {
            handleCanPlay();
        }

        // Use IntersectionObserver to play/pause based on visibility
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        attemptPlay();
                    } else {
                        video.pause();
                        setIsPlaying(false);
                    }
                });
            },
            {
                threshold: 0.1,
            }
        );

        observer.observe(video);

        return () => {
            video.removeEventListener('canplay', handleCanPlay);
            observer.unobserve(video);
            observer.disconnect();
        };
    }, []);

    const togglePlay = (e: React.MouseEvent) => {
        // Prevent Webflow JS or other listeners from interfering
        e.stopPropagation();
        e.nativeEvent.stopImmediatePropagation();

        if (!videoRef.current) return;

        if (videoRef.current.paused) {
            videoRef.current.play().catch(console.error);
            setIsPlaying(true);
        } else {
            videoRef.current.pause();
            setIsPlaying(false);
        }
    };

    // Sync state with actual video events (e.g. browser context menu, auto-pause)
    const onPlay = () => setIsPlaying(true);
    const onPause = () => setIsPlaying(false);

    return (
        <div
            data-poster-url={posterUrl}
            data-video-urls={`${videoMp4},${videoWebm}`}
            data-autoplay="true"
            data-loop="true"
            data-wf-ignore="true"
            className="background-video w-background-video w-background-video-atom"
            suppressHydrationWarning
        >
            <video
                id={id}
                ref={videoRef}
                autoPlay
                loop
                muted
                playsInline
                preload="auto"
                style={{ backgroundImage: `url("${posterUrl}")` }}
                data-wf-ignore="true"
                data-object-fit="cover"
                onPlay={onPlay}
                onPause={onPause}
            >
                <source src={videoMp4} data-wf-ignore="true" type="video/mp4" />
                <source src={videoWebm} data-wf-ignore="true" type="video/webm" />
            </video>

            <noscript>
                <style>{`
          [data-wf-bgvideo-fallback-img] {
            display: none;
          }
          @media (prefers-reduced-motion: reduce) {
            [data-wf-bgvideo-fallback-img] {
              position: absolute;
              z-index: -100;
              display: inline-block;
              height: 100%;
              width: 100%;
              object-fit: cover;
            }
          }
        `}</style>
                <img
                    data-wf-bgvideo-fallback-img="true"
                    src={posterUrl}
                    alt=""
                />
            </noscript>

            <div aria-live="polite">
                <button
                    type="button"
                    // Removed data-w-bg-video-control to prevents webflow.js from hijacking
                    aria-controls={id}
                    className="w-backgroundvideo-backgroundvideoplaypausebutton play-pause-btn w-background-video--control"
                    onClick={togglePlay}
                    onMouseDown={(e) => e.stopPropagation()}
                    onMouseUp={(e) => e.stopPropagation()}
                >
                    {/* Pause Icon: Show when playing */}
                    <span className="play-state" hidden={!isPlaying}>
                        <img
                            src="https://uploads-ssl.webflow.com/6022af993a6b2191db3ed10c/628299f8aa233b83918e24fd_Pause.svg"
                            loading="lazy"
                            alt="Pause video"
                            className="play-sate-image"
                        />
                    </span>
                    {/* Play Icon: Show when paused */}
                    <span className="pause-state" hidden={isPlaying}>
                        <img
                            loading="lazy"
                            alt="Play video"
                            src="https://uploads-ssl.webflow.com/6022af993a6b2191db3ed10c/628298b20ae0236682d4b87f_Play-24.svg"
                            className="pause-state-image"
                        />
                    </span>
                </button>
            </div>
        </div>
    );
}
