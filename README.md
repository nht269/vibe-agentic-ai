# Vibe Agentic AI

Automated TikTok video creation pipeline powered by Claude Code Agent Teams. One command generates a complete Vietnamese-narrated vertical video with AI-generated images, voiceover, and TikTok-style subtitles.

> **Framework Documentation**: This project is built on the [Vibe Agentic Framework](https://github.com/nht269/vibe-agentic-framework) — a pattern for turning simple requests into complex multi-agent workflows.

## How It Works

```
/video:create "Claude 4 Opus Release"
```

The system automatically:

1. **Researches** the topic (web search or URL fetch)
2. **Writes** a Vietnamese script with multiple scenes
3. **Generates images** via Gemini API (parallel)
4. **Generates voiceover + captions** via ElevenLabs (parallel)
5. **Builds** Remotion components and renders the final MP4

```
User ──→ Orchestrator ──→ ┌─ Image Generator (Gemini) ─┐
                          └─ Voice Generator (ElevenLabs)┘
                                       │
                                       ▼
                              Video Builder (Remotion)
                                       │
                                       ▼
                                out/{video-id}.mp4
```

## Prerequisites

- [Node.js](https://nodejs.org/) >= 18
- [Claude Code](https://claude.ai/code) CLI installed
- [ffprobe](https://ffmpeg.org/) (for audio duration detection)
- API Keys:
  - `GEMINI_API_KEY` — [Google AI Studio](https://aistudio.google.com/apikey)
  - `ELEVENLABS_API_KEY` — [ElevenLabs](https://elevenlabs.io/)

## Setup

### 1. Install dependencies

```bash
npm install
```

### 2. Set environment variables

```bash
export GEMINI_API_KEY="your-gemini-api-key"
```

### 3. Configure ElevenLabs MCP

```bash
claude mcp add-json "ElevenLabs" '{
  "command": "uvx",
  "args": ["elevenlabs-mcp"],
  "env": {
    "ELEVENLABS_API_KEY": "your-elevenlabs-api-key",
    "ELEVENLABS_MCP_BASE_PATH": "."
  }
}'
```

### 4. Enable Agent Teams

Already configured in `.claude/settings.json`. Verify with:

```bash
cat .claude/settings.json
# Should show: "CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS": "1"
```

## Usage

### Create a video from a topic

```
/video:create "Trí tuệ nhân tạo thay đổi giáo dục"
```

### Create a video from a URL

```
/video:create "https://example.com/article-about-ai"
```

### Preview in Remotion Studio

```bash
npm run studio
```

### Render a specific composition manually

```bash
npm run render -- {CompositionId} out/{video-id}.mp4
```

### Generate images only

```bash
npm run generate-images -- videos/{video-id}/config.ts
```

## Project Structure

```
├── .claude/
│   ├── commands/video/create.md     # /video:create slash command
│   ├── agents/
│   │   ├── image-generator.md       # Gemini image specialist
│   │   ├── voice-generator.md       # ElevenLabs voice specialist
│   │   └── video-builder.md         # Remotion build specialist
│   └── skills/video-creation/       # Domain knowledge (Vietnamese scripts, prompts, TTS)
├── src/
│   ├── index.ts                     # Remotion entry point
│   ├── Root.tsx                     # Composition registry
│   ├── types.ts                     # VideoConfig types
│   ├── SampleVideo.tsx              # Reference video component
│   └── SampleNarrated.tsx           # Reference narrated wrapper
├── scripts/
│   └── generate-images.ts           # Gemini API image generation
├── videos/{id}/config.ts            # Video script configs
├── public/
│   ├── images/{id}/                 # Generated scene PNGs (1080x1920)
│   ├── voiceover/{id}/              # Generated MP3s + durations.json
│   └── captions/{id}/               # Word-timed caption JSONs
└── out/                             # Rendered MP4 output
```

## Video Config Format

Each video is defined by a TypeScript config at `videos/{id}/config.ts`:

```typescript
import type { VideoConfig } from "../../src/types";

const config: VideoConfig = {
  id: "my-video",
  title: "Video Title",
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
      displayText: "Vietnamese subtitle text",
      spokenText: "Vietnamese TTS text (may differ for pronunciation)",
      imagePrompt: "English prompt for Gemini image generation, 9:16 vertical",
    },
  ],
};

export default config;
```

## Architecture

### Agents

| Agent | Role | Tools |
|-------|------|-------|
| **Orchestrator** | Research, script, coordinate team | WebSearch, WebFetch, Write |
| **Image Generator** | Generate scene illustrations | Gemini API via script |
| **Voice Generator** | TTS + word-timed captions | ElevenLabs MCP, ffprobe |
| **Video Builder** | Remotion components + render | Read, Write, Edit, Bash |

### Pipeline Flow

1. Orchestrator creates `videos/{id}/config.ts` with scene data
2. Image Generator and Voice Generator run **in parallel**:
   - Images → `public/images/{id}/scene-{NN}.png`
   - Voice → `public/voiceover/{id}/scene-{NN}.mp3` + `durations.json`
   - Captions → `public/captions/{id}/scene-{NN}.json`
3. Video Builder reads all assets, creates Remotion components, renders MP4

### Tech Stack

- **[Remotion](https://remotion.dev/)** — React-based programmatic video rendering
- **[Gemini 2.5 Flash](https://ai.google.dev/)** — AI image generation (9:16 vertical)
- **[ElevenLabs](https://elevenlabs.io/)** — Vietnamese text-to-speech (Nhật Phong voice)
- **[Claude Code Agent Teams](https://code.claude.com/docs/en/agent-teams)** — Multi-agent orchestration

## Troubleshooting

### Images not generating
- Check `GEMINI_API_KEY` is set: `echo $GEMINI_API_KEY`
- Check API quota at [Google AI Studio](https://aistudio.google.com/)

### Voice generation fails
- Verify ElevenLabs MCP is configured: `claude mcp list`
- Check API key is valid at [ElevenLabs](https://elevenlabs.io/)

### Render fails
- Run `npm run studio` to debug visually
- Check for TypeScript errors in generated components
- Verify all asset files exist in `public/`

### ffprobe not found
```bash
# macOS
brew install ffmpeg

# Ubuntu/Debian
sudo apt install ffmpeg
```
