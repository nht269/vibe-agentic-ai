import React, { useMemo } from "react";
import {
  AbsoluteFill,
  Audio,
  Sequence,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { SampleVideo, type SampleVideoScene } from "./SampleVideo";

interface CaptionWord {
  text: string;
  startMs: number;
  endMs: number;
  timestampMs: number;
  confidence: number;
}

interface CaptionOverlayProps {
  captions: CaptionWord[];
}

const CaptionOverlay: React.FC<CaptionOverlayProps> = ({ captions }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const currentTimeMs = (frame / fps) * 1000;

  const currentWordIndex = useMemo(() => {
    return captions.findIndex(
      (w) => currentTimeMs >= w.startMs && currentTimeMs < w.endMs
    );
  }, [captions, currentTimeMs]);

  if (captions.length === 0) return null;

  // Group words into lines of ~4 words for TikTok-style display
  const wordsPerLine = 4;
  const currentGroupStart =
    currentWordIndex >= 0
      ? Math.floor(currentWordIndex / wordsPerLine) * wordsPerLine
      : -1;

  if (currentGroupStart < 0) return null;

  const visibleWords = captions.slice(
    currentGroupStart,
    currentGroupStart + wordsPerLine
  );

  return (
    <AbsoluteFill
      style={{
        justifyContent: "center",
        alignItems: "center",
        padding: "0 40px",
      }}
    >
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: "8px",
        }}
      >
        {visibleWords.map((word, i) => {
          const globalIndex = currentGroupStart + i;
          const isActive = globalIndex === currentWordIndex;
          return (
            <span
              key={`${word.startMs}-${i}`}
              style={{
                fontSize: 58,
                fontWeight: 800,
                color: isActive ? "#FFD700" : "white",
                textShadow: "0 2px 12px rgba(0,0,0,0.8)",
                transition: "color 0.1s",
              }}
            >
              {word.text.trim()}
            </span>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};

interface SampleNarratedProps {
  videoId: string;
  scenes: SampleVideoScene[];
  captionData?: Record<string, CaptionWord[]>;
}

export const SampleNarrated: React.FC<SampleNarratedProps> = ({
  videoId,
  scenes,
  captionData = {},
}) => {
  let currentFrame = 0;

  return (
    <AbsoluteFill>
      <SampleVideo videoId={videoId} scenes={scenes} />

      {scenes.map((scene) => {
        const from = currentFrame;
        currentFrame += scene.durationInFrames;
        const captions = captionData[scene.id] || [];

        return (
          <Sequence
            key={`narration-${scene.id}`}
            from={from}
            durationInFrames={scene.durationInFrames}
          >
            <Audio src={staticFile(`voiceover/${videoId}/${scene.id}.mp3`)} />
            <CaptionOverlay captions={captions} />
          </Sequence>
        );
      })}
    </AbsoluteFill>
  );
};
