# Vietnamese TTS Configuration (ElevenLabs)

## Voice Settings
- **Voice**: Nhật Phong (Vietnamese male, natural)
- **Model**: eleven_v3 (best quality for Vietnamese)
- **Language**: vi

## Phonetic Hints for spokenText
English loanwords need phonetic adjustment:

| English | spokenText |
|---------|-----------|
| AI | Ây Ai |
| app | ép |
| blockchain | bờ-lốc-chên |
| cloud | cờ-lao |
| data | đa-ta |
| digital | đi-gi-tồ |
| drone | đờ-rôn |
| IoT | Ai ô Ti |
| machine learning | mờ-sin lơ-ning |
| robot | rô-bốt |
| smartphone | xờ-mác-phôn |
| startup | xờ-tác-ớp |
| tech | téc |
| wifi | wai-fai |

## Pacing Control
- Commas → short pause (~0.3s)
- Periods → medium pause (~0.5s)
- Ellipsis "..." → dramatic pause (~0.8s)
- Keep sentences short for natural rhythm

## Number Formatting
- "100" → "một trăm"
- "2024" → "hai nghìn không trăm hai mươi tư"
- "50%" → "năm mươi phần trăm"
- "$1M" → "một triệu đô la"

## Common Issues
- Long sentences → unnatural pacing. Break into shorter segments.
- Mixed language may cause pronunciation issues. Use phonetic hints.
- Test different punctuation for optimal rhythm.
