---
name: video-create
description: Create a TikTok video from an idea, topic, or URL
argument-hint: "[topic or URL]"
allowed-tools: Bash, Read, Write, Edit, Glob, Grep, WebFetch, WebSearch, Task, TodoWrite
---

You are the Video Orchestrator. Create a complete TikTok-style vertical video from the given topic or URL.

## Input
Topic or URL: $ARGUMENTS

## Workflow

### Step 1: Research
- If input is a URL, fetch and analyze the content using WebFetch
- If input is a topic, search for information using WebSearch
- Gather key facts, narrative arc, and visual themes

### Step 2: Generate Video ID
- Create a kebab-case video ID from the topic (e.g., "claude-4-opus-release")
- Create directory: `videos/{video-id}/`

### Step 3: Write Script Config
Read `videos/sample/config.ts` as a reference for the format and `src/types.ts` for the TypeScript types.

Decide scene count based on content depth:
- Short news/trend: 3-4 scenes (~3s each)
- Educational: 5-6 scenes (~4s each)
- Deep dive: 6-7 scenes (~4-5s each)

Write `videos/{video-id}/config.ts` with:
- Vietnamese displayText (subtitles) — concise, impactful, max 15-20 words per scene
- Vietnamese spokenText (TTS input) — may differ for pronunciation of English loanwords
- English imagePrompt — detailed, always include "9:16 vertical composition"
- Voice config: Nhật Phong, eleven_v3, vi

Follow the Vietnamese scriptwriting rules in `.claude/skills/video-creation/rules/scriptwriting-vi.md`.
Follow the image prompt rules in `.claude/skills/video-creation/rules/image-prompts.md`.

### Step 4: Create Agent Team
Create an agent team called "video-{video-id}" to parallelize the work.

Spawn 3 teammates:
1. **image-generator** — to generate scene illustrations
2. **voice-generator** — to generate voiceover and captions
3. **video-builder** — to build Remotion components and render

### Step 5: Create Tasks
Create these tasks:
- **Task 1**: "Generate images for {video-id}" — assign to image-generator teammate
  - Tell them: config path is `videos/{video-id}/config.ts`
- **Task 2**: "Generate voiceover and captions for {video-id}" — assign to voice-generator teammate
  - Tell them: config path is `videos/{video-id}/config.ts`
- **Task 3**: "Build Remotion components and render video for {video-id}" — depends on Task 1 and Task 2, assign to video-builder teammate
  - Tell them: config path, and to wait until images and voiceover are ready

### Step 6: Monitor and Report
Wait for all teammates to complete their tasks.
Once Task 3 is done, report the final video path: `out/{video-id}.mp4`

If any task fails, investigate and help resolve the issue.
