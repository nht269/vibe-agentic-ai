---
name: video-creation
description: Domain knowledge for creating TikTok-style videos including Vietnamese scriptwriting, image prompt engineering, and TTS configuration.
user-invocable: false
---

# Video Creation Domain Knowledge

## Vietnamese Scriptwriting
See [rules/scriptwriting-vi.md](rules/scriptwriting-vi.md) for patterns on writing engaging Vietnamese video scripts, including hook structure, displayText vs spokenText differences, and scene pacing.

## Image Prompt Engineering
See [rules/image-prompts.md](rules/image-prompts.md) for Gemini image generation prompt templates, style consistency rules, and required elements.

## Vietnamese TTS Configuration
See [rules/tts-vietnamese.md](rules/tts-vietnamese.md) for ElevenLabs phonetic hints for English loanwords, pacing control, and number formatting in Vietnamese.

## Component Patterns
- Reference `src/SampleVideo.tsx` for scene component patterns (AbsoluteFill, Img, spring, interpolate)
- Reference `src/SampleNarrated.tsx` for narrated wrapper patterns (Audio, CaptionOverlay)
- Use `@remotion/captions` for TikTok-style word-by-word subtitles
- Use `spring()` for smooth entrance animations, `interpolate()` for linear animations
