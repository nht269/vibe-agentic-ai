export interface Scene {
  id: string;
  displayText: string;
  spokenText: string;
  imagePrompt: string;
}

export interface VoiceConfig {
  name: string;
  model: string;
  language: string;
}

export interface VideoConfig {
  id: string;
  title: string;
  dimensions: { width: number; height: number };
  fps: number;
  voice: VoiceConfig;
  scenes: Scene[];
}
