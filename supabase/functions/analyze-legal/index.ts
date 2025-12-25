import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { type, content, history, documentContext, analysisContext } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    let systemPrompt = "";
    let userPrompt = "";
    let messages: { role: string; content: string }[] = [];

    if (type === "chat") {
      systemPrompt = `You are a friendly, practical legal guidance assistant for people in India. Your role is to:

1. Explain legal questions in clear, everyday language
2. Clarify relevant Indian laws, acts, and regulations when helpful
3. Offer simple, actionable steps for common legal situations
4. Help users understand their rights and possible options
5. Explain basic procedures (filing complaints, FIRs, RTI, etc.)
6. Flag situations that should involve a qualified lawyer

GUIDELINES:
- Be empathetic, patient, and non-judgmental
- Use plain language and avoid unnecessary legal jargon
- When legal terms are used, provide brief explanations
- Offer step-by-step guidance when useful
- Reference specific Indian laws/acts only when relevant and accurate
- Clearly state that you provide guidance, not legal advice
- Recommend professional legal help for complex or high-risk matters
- If unsure, say so and avoid guessing
- Keep responses focused and concise (aim for 2–4 short paragraphs)

Common topics include tenant disputes, consumer complaints, online scams, FIRs, employment issues, banking disputes, traffic violations, family law basics, RTI, and property matters.`;

      // Build conversation with history
      messages = [{ role: "system", content: systemPrompt }];
      
      if (history && Array.isArray(history)) {
        // Add conversation history (limit to last 10 messages for context)
        const recentHistory = history.slice(-10);
        for (const msg of recentHistory) {
          messages.push({
            role: msg.role === "user" ? "user" : "assistant",
            content: msg.content
          });
        }
      } else {
        messages.push({ role: "user", content: content });
      }
      
    } else if (type === "document-chat") {
      // Document Q&A chat mode
      systemPrompt = `You are a document analysis assistant helping users understand an uploaded document through clear Q&A.

DOCUMENT CONTENT:
"""
${documentContext?.substring(0, 8000) || "No document provided"}
"""

PREVIOUS ANALYSIS:
Document Type: ${analysisContext?.documentType || "Unknown"}
Summary: ${analysisContext?.summary || "No summary available"}
Key Terms: ${analysisContext?.keyTerms?.map((t: any) => t.term).join(", ") || "None identified"}
User's Rights: ${analysisContext?.rights?.join("; ") || "None identified"}
User's Obligations: ${analysisContext?.obligations?.join("; ") || "None identified"}
Concerns: ${analysisContext?.concerns?.join("; ") || "None identified"}

ROLE:
1. Answer questions about this specific document
2. Explain clauses and terms the user asks about
3. Help the user spot rights and obligations
4. Point to relevant sections when possible
5. Be explicit when something is not covered in the document

GUIDELINES:
- Reference document sections when relevant
- Use plain language and explain legal terms briefly
- If the document doesn't contain the answer, say so clearly
- Provide concise, helpful context about Indian laws when applicable
- Remind the user this is guidance, not legal advice`;

      messages = [
        { role: "system", content: systemPrompt },
        { role: "user", content: content }
      ];

    } else if (type === "search") {
      systemPrompt = `You are a concise legal guidance assistant for users in India. Your role is to:
1. Understand the user's issue
2. Explain their rights in plain language
3. Provide clear, actionable steps they can take
4. Suggest relevant Indian laws/acts where applicable
5. Advise when to consult a professional lawyer

NOTE: This is guidance, not legal advice. Remind users to consult a qualified lawyer for specific legal matters.

Respond in JSON format:
{
  "title": "Brief title of the issue",
  "description": "Short explanation of the situation and user's rights (2-3 sentences)",
  "steps": ["Step 1", "Step 2", "Step 3", "Step 4"],
  "relevantLaw": "Name of relevant Indian law/act",
  "urgencyLevel": "low|medium|high",
  "seekProfessional": true/false,
  "category": "rent-housing|consumer-rights|employment-issues|scams-fraud|banking-finance|police-fir|traffic-violations|family-law"
}`;
      userPrompt = `Help me understand this legal issue: "${content}"`;
      messages = [
        { role: "system", content: systemPrompt },
        { role: "user", content: userPrompt }
      ];
    } else if (type === "scan") {
      systemPrompt = `You are an assistant focused on spotting scams and suspicious messages aimed at people in India. Analyze messages for:
1. Typical scam patterns (lottery, job fraud, UPI scams, phishing, impersonation)
2. Red flags and manipulative tactics
3. Language or formatting inconsistencies common in scams
4. Urgency pressure or requests for money, OTPs, or personal data

Explain your findings in simple, non-alarming language.

Respond in JSON format:
{
  "isScam": true/false,
  "confidence": "low|medium|high",
  "scamType": "lottery|job-fraud|phishing|upi-fraud|romance|impersonation|other|none",
  "redFlags": ["Flag 1", "Flag 2", "Flag 3"],
  "analysis": "Short explanation of why this may or may not be a scam (2-3 sentences)",
  "advice": "What the user should do next",
  "reportTo": ["Website or authority to report to, if applicable"]
}`;
      userPrompt = `Analyze this message for scam indicators: "${content}"`;
      messages = [
        { role: "system", content: systemPrompt },
        { role: "user", content: userPrompt }
      ];
    } else if (type === "document") {
      systemPrompt = `You are a document analysis assistant that explains legal documents, contracts, and agreements in plain language. Your role is to:
1. Identify the likely type of document
2. Explain key terms and clauses simply
3. Highlight important obligations and rights
4. Flag any concerning clauses or red flags
5. Suggest practical questions to ask before signing

NOTE: This helps with understanding only and is not a legal interpretation. Recommend professional review for important documents.

Respond in JSON format:
{
  "documentType": "Type of document identified",
  "summary": "Brief summary of what this document is about",
  "keyTerms": [{"term": "Term name", "explanation": "What it means in simple language"}],
  "obligations": ["Your obligations under this document"],
  "rights": ["Your rights under this document"],
  "concerns": ["Any concerning clauses to be aware of"],
  "questions": ["Questions to ask before signing"],
  "recommendation": "Overall recommendation"
}`;
      userPrompt = `Help me understand this document: "${content}"`;
      messages = [
        { role: "system", content: systemPrompt },
        { role: "user", content: userPrompt }
      ];
    } else {
      throw new Error("Invalid analysis type");
    }

    console.log(`Processing ${type} analysis request`);

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: messages,
        temperature: 0.7,
        max_tokens: type === "chat" || type === "document-chat" ? 1500 : 1000,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("AI gateway error:", response.status, errorText);
      
      if (response.status === 429) {
        return new Response(JSON.stringify({ 
          error: "Rate limit exceeded. Please try again in a moment." 
        }), {
          status: 429,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      
      if (response.status === 402) {
        return new Response(JSON.stringify({ 
          error: "Service temporarily unavailable. Please try again later." 
        }), {
          status: 402,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      
      throw new Error("AI gateway error");
    }

    const data = await response.json();
    const aiResponse = data.choices?.[0]?.message?.content;
    
    console.log("AI response received:", aiResponse?.substring(0, 100));

    // For chat types, return the response directly as text
    if (type === "chat" || type === "document-chat") {
      return new Response(JSON.stringify({ result: aiResponse }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Parse the JSON response from the AI for other types
    let parsedResponse;
    try {
      // Extract JSON from the response (handle markdown code blocks)
      const jsonMatch = aiResponse.match(/```json\n?([\s\S]*?)\n?```/) || 
                        aiResponse.match(/```\n?([\s\S]*?)\n?```/) ||
                        [null, aiResponse];
      parsedResponse = JSON.parse(jsonMatch[1] || aiResponse);
    } catch (parseError) {
      console.error("Failed to parse AI response as JSON:", parseError);
      // Return a structured fallback response
      parsedResponse = {
        error: "Unable to process response",
        rawResponse: aiResponse
      };
    }

    return new Response(JSON.stringify({ result: parsedResponse }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });

  } catch (error) {
    console.error("Error in analyze-legal function:", error);
    return new Response(JSON.stringify({ 
      error: error instanceof Error ? error.message : "Unknown error occurred" 
    }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});