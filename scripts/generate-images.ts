import { GoogleGenAI } from "@google/genai";
import * as fs from "node:fs";
import * as path from "node:path";

async function main() {
  const configPath = process.argv[2];
  if (!configPath) {
    console.error(
      "Usage: npx tsx scripts/generate-images.ts <config-path>\n" +
        "Example: npx tsx scripts/generate-images.ts videos/sample/config.ts"
    );
    process.exit(1);
  }

  const configModule = await import(path.resolve(configPath));
  const config = configModule.default;

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    console.error("Error: GEMINI_API_KEY environment variable not set");
    process.exit(1);
  }

  const ai = new GoogleGenAI({ apiKey });
  const outputDir = path.join("public", "images", config.id);
  fs.mkdirSync(outputDir, { recursive: true });

  console.log(
    `Generating ${config.scenes.length} images for "${config.title}"...`
  );

  let successCount = 0;
  let failCount = 0;

  for (const scene of config.scenes) {
    const outputPath = path.join(outputDir, `${scene.id}.png`);

    if (fs.existsSync(outputPath) && fs.statSync(outputPath).size > 0) {
      console.log(`  [skip] ${scene.id} already exists`);
      successCount++;
      continue;
    }

    console.log(
      `  [gen] ${scene.id}: ${scene.imagePrompt.substring(0, 60)}...`
    );

    for (let attempt = 1; attempt <= 3; attempt++) {
      try {
        const response = await ai.models.generateContent({
          model: "gemini-2.5-flash-preview-05-20",
          contents: [
            {
              role: "user",
              parts: [
                {
                  text: `Generate an image: ${scene.imagePrompt}. The image MUST be in 9:16 portrait/vertical aspect ratio (1080x1920 pixels). High quality, vivid colors, suitable for a TikTok video background.`,
                },
              ],
            },
          ],
          config: {
            responseModalities: ["IMAGE", "TEXT"],
          },
        });

        const parts = response.candidates?.[0]?.content?.parts;
        if (!parts) throw new Error("No content in response");

        const imagePart = parts.find((part: any) =>
          part.inlineData?.mimeType?.startsWith("image/")
        );

        if (!imagePart?.inlineData?.data) {
          throw new Error("No image data in response");
        }

        const imageBuffer = Buffer.from(imagePart.inlineData.data, "base64");
        fs.writeFileSync(outputPath, imageBuffer);
        console.log(
          `  [ok] ${scene.id} saved (${(imageBuffer.length / 1024).toFixed(0)} KB)`
        );
        successCount++;
        break;
      } catch (error: any) {
        console.error(
          `  [error] ${scene.id} attempt ${attempt}/3: ${error.message}`
        );
        if (attempt < 3) {
          const waitMs = attempt * 5000;
          console.log(`  [wait] Retrying in ${waitMs / 1000}s...`);
          await new Promise((r) => setTimeout(r, waitMs));
        } else {
          failCount++;
        }
      }
    }

    // Rate limit delay between requests
    await new Promise((r) => setTimeout(r, 2000));
  }

  console.log(
    `\nDone. ${successCount} succeeded, ${failCount} failed. Output: ${outputDir}/`
  );
  if (failCount > 0) process.exit(1);
}

main().catch((err) => {
  console.error("Fatal error:", err);
  process.exit(1);
});
