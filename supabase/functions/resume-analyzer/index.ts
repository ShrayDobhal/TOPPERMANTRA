import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const { text } = await req.json();

    if (!text) {
      return new Response(JSON.stringify({ error: 'No resume text provided' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const geminiApiKey = Deno.env.get('GEMINI_API_KEY');
    if (!geminiApiKey) {
      throw new Error('GEMINI_API_KEY is not set');
    }

    const prompt = `
You are an expert ATS (Applicant Tracking System) and career coach AI.
Analyze the following resume text and provide a highly detailed JSON response EXACTLY matching this schema:

{
  "overallScore": number (0-100),
  "atsScore": number (0-100),
  "qualityScore": {
    "grammar": number,
    "formatting": number,
    "achievements": number,
    "leadership": number,
    "projects": number,
    "technicalSkills": number,
    "communication": number,
    "experienceQuality": number
  },
  "careerReadiness": number (0-100),
  "interviewReadiness": {
    "score": number,
    "weakTopics": [string],
    "strongTopics": [string],
    "likelyQuestions": [string]
  },
  "atsAnalysis": {
    "formatting": { "score": number, "reason": string, "suggestion": string },
    "keywordOptimization": { "score": number, "reason": string, "suggestion": string },
    "structure": { "score": number, "reason": string, "suggestion": string }
  },
  "sectionReviews": [
    { "section": string, "strength": string, "weakness": string, "suggestion": string, "priority": "High" | "Medium" | "Low", "impact": string }
  ],
  "missingSections": [
    { "section": string, "suggestion": string }
  ],
  "keywordIntelligence": {
    "present": [string],
    "missing": [string],
    "overused": [string],
    "suggested": [string],
    "densityScore": number
  },
  "salaryEstimate": {
    "current": string (e.g. "₹12,00,000 - ₹15,00,000"),
    "potential": string,
    "confidence": string
  },
  "suitableRoles": [
    { "role": string, "match": number }
  ],
  "skillCategories": {
    "Programming Languages": [string],
    "Frameworks": [string],
    "Tools": [string]
  }
}

Important Rules:
- Return ONLY the JSON object, absolutely no markdown formatting like \`\`\`json.
- Calculate realistic and critical scores based on the actual resume text provided.
- Ensure the salary estimates are localized to Indian Rupees (₹) unless the resume specifically mentions foreign work.
- Provide actionable, specific feedback in the section reviews, pointing out exact missing metrics or weak action verbs.

Resume Text:
"""
${text}
"""
    `;

    const geminiResponse = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-flash-latest:generateContent?key=${geminiApiKey}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [{
          parts: [{ text: prompt }]
        }],
        generationConfig: {
          temperature: 0.2,
          responseMimeType: "application/json"
        }
      }),
    });

    const geminiData = await geminiResponse.json();
    
    if (!geminiResponse.ok) {
      console.error('Gemini API Error:', geminiData);
      throw new Error(geminiData.error?.message || 'Failed to call Gemini API');
    }

    let resultText = geminiData.candidates[0].content.parts[0].text;
    
    // Clean up potential markdown formatting if Gemini still includes it
    resultText = resultText.replace(/^```json\n?/g, '').replace(/\n?```$/g, '').trim();
    
    const parsedResult = JSON.parse(resultText);

    return new Response(JSON.stringify(parsedResult), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Function Error:', error.message);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
