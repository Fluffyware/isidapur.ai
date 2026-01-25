import { NextResponse } from "next/server";
import { GoogleGenerativeAI, SchemaType } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

export async function POST(req: Request) {
    try {
        const { ingredients, filters } = await req.json();

        if (!ingredients || !Array.isArray(ingredients) || ingredients.length === 0) {
            return NextResponse.json({ error: "Bahan-bahan tidak boleh kosong." }, { status: 400 });
        }

        if (!process.env.GEMINI_API_KEY) {
            return NextResponse.json({
                error: "API Key Gemini belum diset. Silakan hubungi admin.",
                recommendations: []
            }, { status: 500 });
        }

        const model = genAI.getGenerativeModel({
            model: "gemini-2.0-flash",
            generationConfig: {
                responseMimeType: "application/json",
                responseSchema: {
                    type: SchemaType.OBJECT,
                    properties: {
                        recommendations: {
                            type: SchemaType.ARRAY,
                            items: {
                                type: SchemaType.OBJECT,
                                properties: {
                                    title: { type: SchemaType.STRING },
                                    match_score: { type: SchemaType.NUMBER },
                                    missing: { type: SchemaType.ARRAY, items: { type: SchemaType.STRING } },
                                    cook_time: { type: SchemaType.NUMBER },
                                    tags: { type: SchemaType.ARRAY, items: { type: SchemaType.STRING } },
                                    steps: { type: SchemaType.ARRAY, items: { type: SchemaType.STRING } },
                                },
                                required: ["title", "match_score", "missing", "cook_time", "tags", "steps"],
                            }
                        }
                    },
                    required: ["recommendations"],
                },
            },
        });

        const prompt = `
      Kamu adalah asisten dapur digital yang ahli dan santai bernama Isidapur.ai.
      Tugasmu adalah memberikan ide masakan berdasarkan bahan yang dimiliki pengguna.
      
      BAHAN YANG DIMILIKI: ${ingredients.join(", ")}
      FILTER: ${filters.join(", ")}
      
      ATURAN:
      1. Berikan 3-5 rekomendasi masakan yang paling masuk akal.
      2. Gunakan Bahasa Indonesia sehari-hari yang santai dan hangat.
      3. match_score adalah persentase (0-1) seberapa cocok bahan yang ada dengan resep tersebut.
      4. missing adalah daftar bahan penting yang sekiranya tidak ada tapi dibutuhkan (maksimal 3 bahan).
      5. cook_time adalah estimasi waktu masak dalam menit.
      6. tags harus menyertakan filter yang dipilih + tag relevan lainnya (maksimal 3 tag).
      7. steps adalah 3-5 langkah singkat dan jelas.
      8. Masukan masakan rumahan Indonesia yang sederhana.
      
      Prinsip: Sederhana itu cukup. Masuk akal lebih penting dari sempurna.
    `;

        const result = await model.generateContent(prompt);
        const text = result.response.text();

        return NextResponse.json(JSON.parse(text));
    } catch (error: any) {
        console.error("Gemini API Error:", error);

        return NextResponse.json({
            error: "Lagi nggak nyambung (Gemini). Coba lagi ya.",
            recommendations: []
        }, { status: 500 });
    }
}
