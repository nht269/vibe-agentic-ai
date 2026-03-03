import type { VideoConfig } from "../../src/types";

const config: VideoConfig = {
  id: "sample",
  title: "AI Thay Doi Cuoc Song",
  dimensions: { width: 1080, height: 1920 },
  fps: 30,
  voice: {
    name: "Nhật Phong",
    model: "eleven_v3",
    language: "vi",
  },
  scenes: [
    {
      id: "scene-01",
      displayText: "Trí tuệ nhân tạo đang thay đổi thế giới",
      spokenText: "Trí tuệ nhân tạo đang thay đổi thế giới",
      imagePrompt:
        "A futuristic cityscape with holographic AI interfaces floating in the air, neon blue and purple lighting, cinematic, 9:16 vertical composition, photorealistic digital art",
    },
    {
      id: "scene-02",
      displayText: "Từ y tế đến giáo dục, AI có mặt ở khắp nơi",
      spokenText: "Từ y tế đến giáo dục, Ây Ai có mặt ở khắp nơi",
      imagePrompt:
        "Split scene showing AI in healthcare with a robot assisting surgery and education with a holographic classroom, warm lighting, 9:16 vertical, digital illustration",
    },
    {
      id: "scene-03",
      displayText: "Hãy sẵn sàng cho tương lai với AI",
      spokenText: "Hãy sẵn sàng cho tương lai với Ây Ai",
      imagePrompt:
        "A person standing at a crossroads looking toward a bright AI-powered future, sunrise, inspirational, 9:16 vertical, cinematic digital art",
    },
  ],
};

export default config;
