export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const apiKey = process.env.ANTHROPIC_API_KEY;

  if (!apiKey || apiKey === 'your_api_key_here') {
    return res.status(200).json({
      success: false,
      fallback: true,
      text: generateFallbackAnalysis(null),
    });
  }

  try {
    const { imageBase64, viewName, steps, checklist } = req.body;

    if (!imageBase64 || !viewName) {
      return res.status(400).json({ success: false, error: 'Missing required fields' });
    }

    const prompt = `You are a strict, world-class expert in clinical plastic surgery photography following the Photographic Standards exactly. Analyze this photograph taken for a "${viewName}" clinical photography session.

Protocol requirements for this view (MUST BE FOLLOWED WITH ABSOLUTE PRECISION):
${steps.map((s, i) => `${i + 1}. ${s}`).join('\n')}

Checklist items: ${checklist.map(c => `${c.label} (${c.hint}) - TARGET: ${c.target}`).join(', ')}

Please provide:
1. A brief overall quality assessment (1-2 sentences), emphasizing exact precision.
2. What was done correctly (list 2-3 things).
3. What MUST be corrected (list specific, actionable errors based exactly on the requirements above. If framing, ratio, centering, or patient prep is off, state it strictly).
4. An overall quality score: Excellent / Good / Acceptable / Needs Retake

You must insist that the photographer take the picture exactly as mentioned in the protocol. If there are deviations in jewelry, drape, makeup, ratio, centering, or framing edges, demand a retake. Keep the tone highly professional, precise, and authoritative. Format as plain text with clear sections labelled: ASSESSMENT, CORRECT, IMPROVE, SCORE.`;

    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 1000,
        messages: [
          {
            role: 'user',
            content: [
              {
                type: 'image',
                source: {
                  type: 'base64',
                  media_type: 'image/jpeg',
                  data: imageBase64,
                },
              },
              { type: 'text', text: prompt },
            ],
          },
        ],
      }),
    });

    if (!response.ok) {
      const errorData = await response.text();
      console.error('Anthropic API error:', response.status, errorData);
      return res.status(200).json({
        success: false,
        fallback: true,
        text: generateFallbackAnalysis(viewName),
      });
    }

    const data = await response.json();
    const text = data.content?.find(b => b.type === 'text')?.text || 'Analysis unavailable.';

    return res.status(200).json({ success: true, text });
  } catch (error) {
    console.error('Analysis error:', error);
    return res.status(200).json({
      success: false,
      fallback: true,
      text: generateFallbackAnalysis(null),
    });
  }
}

function generateFallbackAnalysis(viewName) {
  const view = viewName || 'Clinical';
  return `ASSESSMENT
This ${view} photograph should be reviewed manually against the protocol checklist. AI analysis is currently unavailable — please verify all criteria below.

CORRECT
• Photo was captured successfully
• Image data is available for manual review

IMPROVE
• Please review against the protocol checklist manually
• Verify lighting, distance, and head positioning
• Compare with reference photographs if available

SCORE
Manual Review Required`;
}
