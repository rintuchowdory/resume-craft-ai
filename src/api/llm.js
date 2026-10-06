// AI proxy: direct frontend InvokeLLM calls to the Base44 backend are blocked
// by a platform routing restriction. We route them through the user's own
// Gemini-powered backend (AI-Rights-Coach on Render) instead.
const AI_PROXY_URL = "https://ai-rights-coach-backend.onrender.com/ai/generate";

export const InvokeLLM = async (data) => {
  const res = await fetch(AI_PROXY_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      prompt: data.prompt,
      response_json_schema: data.response_json_schema,
      max_tokens: data.max_tokens || 2048,
    }),
  });
  if (!res.ok) {
    const detail = await res.text().catch(() => "");
    throw new Error(`AI request failed (${res.status}): ${detail.slice(0, 200)}`);
  }
  const json = await res.json();
  return json.data;
};
