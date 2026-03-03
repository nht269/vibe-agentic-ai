# Vibe Agentic AI - TikTok Video Pipeline

Automated TikTok video creation using Claude Code Agent Teams.
Run `/video:create [topic or URL]` to generate Vietnamese-narrated vertical videos (1080x1920).

## Tech Stack
- **Remotion** — React-based video rendering
- **@remotion/captions** — TikTok-style word-by-word subtitles
- **@google/genai** — Gemini 2.5 Flash for scene illustrations
- **ElevenLabs MCP** — Vietnamese TTS (Nhat Phong voice, eleven_v3)

## Environment Variables
- `GEMINI_API_KEY` — Google AI API key for image generation
- `ELEVENLABS_API_KEY` — Set in MCP server config

## Commands
- `npm run studio` — Open Remotion Studio for preview
- `npm run render -- <CompositionId>` — Render a specific video
- `npm run generate-images -- <config-path>` — Generate images for a video

## Project Structure
- `src/` — Remotion components (Root.tsx = composition registry)
- `videos/{id}/config.ts` — Video configs (see videos/sample/config.ts)
- `public/images/{id}/` — Generated scene PNGs
- `public/voiceover/{id}/` — Generated MP3s + durations.json
- `public/captions/{id}/` — Word-timed caption JSONs
- `scripts/` — Utility scripts (image generation)
- `out/` — Rendered MP4 output

## Conventions
- Named exports for React components, one per file
- Use `useCurrentFrame()` + `interpolate()` for animations, `spring()` for smooth motion
- Video dimensions: 1080x1920 (vertical), 30 FPS
- Reference `src/SampleVideo.tsx` and `src/SampleNarrated.tsx` for component patterns

## Agent Teams
Uses `CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS=1`. See `.claude/agents/` for specialists.
