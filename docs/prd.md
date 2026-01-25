PRODUCT REQUIREMENTS DOCUMENT (PRD)
Isidapur.ai
1. Product Overview

Isidapur.ai adalah web app berbasis browser yang membantu pengguna mendapatkan ide masakan berdasarkan bahan yang mereka miliki di dapur.

Aplikasi ini dirancang sebagai alat bantu cepat, bukan chatbot percakapan.

Masukkan bahan → dapatkan ide masakan yang masuk akal.

2. Core Principles

Tidak ada login

Tidak ada database

Cepat, ringan, dan jujur

Manusia dulu, AI belakangan

3. Problem Statement

Pengguna sering:

Memiliki bahan masakan tapi bingung mau masak apa

Tidak punya waktu membaca resep panjang

Mengalami kelelahan memilih menu harian

Masalah inti:

Decision fatigue dalam menentukan menu masakan.

4. Product Goals

Memberikan rekomendasi masakan dalam ≤ 3 detik

Mengurangi waktu berpikir pengguna

Bisa langsung digunakan tanpa hambatan

5. Target Users
Primary

Anak kos

Pekerja

Pengguna yang memasak harian

Secondary

Mahasiswa

Orang tua

Pengguna dengan waktu terbatas

6. User Flow
Landing Page
  ↓
Input bahan (chips)
  ↓
Klik "Cari Masakan"
  ↓
Daftar rekomendasi
  ↓
Detail masakan (opsional)


Tidak ada onboarding. Tidak ada chat flow.

7. Functional Requirements
7.1 Ingredient Input

Input teks bebas

Auto-convert ke ingredient chips

Bisa hapus satu per satu

Autocomplete bahan (opsional)

7.2 AI Recommendation Engine

Input: daftar bahan dari user

Output: 3–7 rekomendasi masakan

Semua proses via API AI (stateless)

AI bertugas untuk:

Menentukan menu yang relevan

Menghitung kecocokan bahan

Menandai bahan yang kurang

7.3 Recommendation Output

Setiap rekomendasi menampilkan:

Nama masakan

Estimasi waktu

Tag (cepat / hemat / sehat / pedas)

Bahan yang kurang (jika ada)

7.4 Filters

Filter cepat berbentuk tombol:

⏱️ Cepat

💸 Hemat

🔥 Tanpa goreng

🥗 Sehat

🌶️ Pedas

Filter diterapkan sebelum request AI dikirim.

7.5 Recipe Detail View

Isi:

Bahan utama

Langkah singkat (3–5 langkah)

Catatan substitusi

Tidak ada artikel panjang.

7.6 Local Persistence (Client Side)

Disimpan di browser:

Riwayat bahan terakhir

Masakan terakhir

Favorit

Menggunakan:

localStorage atau IndexedDB

8. Non-Functional Requirements

Mobile-first

Fast load (< 1 detik)

Offline-friendly untuk UI (tanpa AI)

Accessible (kontras & teks jelas)

9. Out of Scope

User account

Database server

Sistem komentar

Upload resep user

10. System Architecture (No DB)
Browser (User)
  ↓
Next.js Frontend
  ↓
API Route (/api/recommend)
  ↓
AI API (Stateless)
  ↓
JSON Response


Tidak ada penyimpanan server-side.

11. Tech Stack (Lengkap)
11.1 Frontend

Framework: Next.js (App Router)

Language: TypeScript

Styling: Tailwind CSS

State: React hooks / Zustand (optional)

Icons: Lucide Icons / Custom SVG

Fonts: Playfair Display (heading), Inter (body)

11.2 Backend (Serverless)

Platform: Next.js API Routes / Edge Functions

Runtime: Node.js / Edge Runtime

Validation: Zod (request & response schema)

Rate Limit: Upstash / in-memory limiter

11.3 AI Layer

Provider: OpenAI API

Mode: Structured Output (JSON schema)

Usage:

Rekomendasi menu

Ranking hasil

Missing ingredient detection

Tidak ada chat memory. Tidak ada data storage.

11.4 Data Handling

Input: User-provided ingredients

Storage: Browser only (localStorage / IndexedDB)

Server: Stateless (no persistence)

11.5 Analytics (Minimal)

Tool: Plausible / Vercel Analytics

Events:

Search triggered

Recipe clicked

Tanpa tracking user personal.

11.6 Deployment

Hosting: Vercel

CI/CD: GitHub → Vercel

Env:

OPENAI_API_KEY

12. API Contract
Request
{
  "ingredients": ["telur", "tempe", "cabai"],
  "filters": ["cepat", "hemat"]
}

Response
{
  "recommendations": [
    {
      "title": "Telur Balado",
      "match_score": 0.85,
      "missing": ["bawang putih"],
      "cook_time": 15,
      "tags": ["cepat", "hemat"],
      "steps": ["Rebus telur", "Tumis bumbu", "Masukkan telur"]
    }
  ]
}

13. Error Handling

AI timeout → tampilkan pesan:

“Lagi mikir sebentar, coba lagi.”

AI gagal → tampilkan fallback kosong dengan copy human

14. Security Considerations

API key disimpan di server

Rate limit untuk mencegah abuse

Tidak menyimpan data user

15. Risks & Mitigation
Risiko	Mitigasi
AI output ngaco	Structured output schema
Biaya API	Rate limit + caching
UX terasa chatbot	UI tool-based
16. Roadmap
V1 (MVP)

Core recommendation

No DB, no login

AI-based

V2

Autocomplete bahan

Improve prompt & ranking

V3

Login (optional)

Sync antar device

17. Product Principles

Cepat lebih penting dari lengkap

Masuk akal lebih penting dari sempurna

Isidapur.ai adalah alat, bukan asisten