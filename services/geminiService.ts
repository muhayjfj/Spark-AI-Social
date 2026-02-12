
import { GoogleGenAI, Type, GenerateContentResponse, Modality } from "@google/genai";

export class GeminiService {
  private static instance: GeminiService;
  
  private constructor() {}

  public static getInstance(): GeminiService {
    if (!GeminiService.instance) {
      GeminiService.instance = new GeminiService();
    }
    return GeminiService.instance;
  }

  private getClient() {
    // API key must be from process.env.API_KEY as per hard requirement
    return new GoogleGenAI({ apiKey: process.env.API_KEY });
  }

  async generateFastResponse(prompt: string): Promise<string> {
    const ai = this.getClient();
    try {
        const response = await ai.models.generateContent({
          model: 'gemini-3-flash-preview',
          contents: prompt,
        });
        return response.text || "لم يتمكن Spark AI من صياغة رد حالياً.";
    } catch (error) {
        console.error("Gemini Error:", error);
        return "حدث عطل فني في المحرك العصبي. يرجى المحاولة لاحقاً.";
    }
  }

  async thinkDeeply(prompt: string): Promise<string> {
    const ai = this.getClient();
    try {
        const response = await ai.models.generateContent({
          model: 'gemini-3-pro-preview',
          contents: prompt,
          config: {
            thinkingConfig: { thinkingBudget: 32768 }
          }
        });
        return response.text || "لم تكتمل عملية التحليل المعمق.";
    } catch (error) {
        return "المحرك التحليلي مشغول حالياً بالمعالجة الفائقة.";
    }
  }

  async searchGrounding(query: string): Promise<{ text: string, sources: any[] }> {
    const ai = this.getClient();
    try {
        const response = await ai.models.generateContent({
          model: "gemini-3-flash-preview",
          contents: query,
          config: {
            tools: [{ googleSearch: {} }],
          },
        });

        const text = response.text || "نتائج البحث المتقدم الموثوقة...";
        const sources = response.candidates?.[0]?.groundingMetadata?.groundingChunks || [];
        return { text, sources };
    } catch (error) {
        return { text: "فشل الاتصال بمحرك البحث العالمي.", sources: [] };
    }
  }

  async generateImage(prompt: string, aspectRatio: string = "9:16", size: string = "1K"): Promise<string | undefined> {
    const ai = this.getClient();
    try {
        const response = await ai.models.generateContent({
          model: 'gemini-3-pro-image-preview',
          contents: { parts: [{ text: prompt }] },
          config: {
            imageConfig: {
              aspectRatio: aspectRatio as any,
              imageSize: size as any
            }
          }
        });

        if (response.candidates?.[0]?.content?.parts) {
          for (const part of response.candidates[0].content.parts) {
            if (part.inlineData) {
              return `data:image/png;base64,${part.inlineData.data}`;
            }
          }
        }
    } catch (error) {
        console.error("Image Gen Error:", error);
    }
    return undefined;
  }

  async generateVideo(prompt: string, aspectRatio: '16:9' | '9:16' = '9:16'): Promise<string | undefined> {
    const ai = this.getClient();
    try {
        let operation = await ai.models.generateVideos({
          model: 'veo-3.1-fast-generate-preview',
          prompt: prompt,
          config: {
            numberOfVideos: 1,
            resolution: '720p',
            aspectRatio: aspectRatio
          }
        });

        let attempts = 0;
        const maxAttempts = 120; // 20 minutes limit
        while (!operation.done && attempts < maxAttempts) {
          await new Promise(resolve => setTimeout(resolve, 10000));
          operation = await ai.operations.getVideosOperation({ operation: operation });
          attempts++;
        }

        const downloadLink = operation.response?.generatedVideos?.[0]?.video?.uri;
        if (downloadLink) {
            const response = await fetch(`${downloadLink}&key=${process.env.API_KEY}`);
            const blob = await response.blob();
            return URL.createObjectURL(blob);
        }
    } catch (error) {
        console.error("Video Gen Error:", error);
    }
    return undefined;
  }
}
