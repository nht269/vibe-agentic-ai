import React from "react";
import {
  AbsoluteFill,
  Img,
  Sequence,
  interpolate,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

interface SceneProps {
  sceneId: string;
  videoId: string;
  displayText: string;
  durationInFrames: number;
}

const Scene: React.FC<SceneProps> = ({
  sceneId,
  videoId,
  displayText,
  durationInFrames,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const scale = interpolate(frame, [0, durationInFrames], [1, 1.15], {
    extrapolateRight: "clamp",
  });

  const textOpacity = spring({
    frame: frame - 8,
    fps,
    config: { damping: 200 },
  });

  const textY = interpolate(textOpacity, [0, 1], [30, 0]);

  return (
    <AbsoluteFill>
      <AbsoluteFill style={{ transform: `scale(${scale})` }}>
        <Img
          src={staticFile(`images/${videoId}/${sceneId}.png`)}
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
      </AbsoluteFill>

      <AbsoluteFill
        style={{
          background:
            "linear-gradient(transparent 40%, rgba(0,0,0,0.85) 100%)",
        }}
      />

      <AbsoluteFill
        style={{
          justifyContent: "flex-end",
          alignItems: "center",
          padding: "0 60px 220px",
        }}
      >
        <div
          style={{
            color: "white",
            fontSize: 52,
            fontWeight: 700,
            textAlign: "center",
            textShadow: "0 2px 10px rgba(0,0,0,0.6)",
            opacity: textOpacity,
            transform: `translateY(${textY}px)`,
            lineHeight: 1.4,
          }}
        >
          {displayText}
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

export interface SampleVideoScene {
  id: string;
  displayText: string;
  durationInFrames: number;
}

interface SampleVideoProps {
  videoId: string;
  scenes: SampleVideoScene[];
}

export const SampleVideo: React.FC<SampleVideoProps> = ({
  videoId,
  scenes,
}) => {
  let currentFrame = 0;

  return (
    <AbsoluteFill style={{ backgroundColor: "black" }}>
      {scenes.map((scene) => {
        const from = currentFrame;
        currentFrame += scene.durationInFrames;
        return (
          <Sequence
            key={scene.id}
            from={from}
            durationInFrames={scene.durationInFrames}
          >
            <Scene
              sceneId={scene.id}
              videoId={videoId}
              displayText={scene.displayText}
              durationInFrames={scene.durationInFrames}
            />
          </Sequence>
        );
      })}
    </AbsoluteFill>
  );
};
