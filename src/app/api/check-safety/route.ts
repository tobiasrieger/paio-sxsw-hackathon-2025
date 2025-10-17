import { GoogleGenerativeAI } from '@google/generative-ai';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { image } = await request.json();

    if (!image) {
      return NextResponse.json(
        { error: 'No image provided' },
        { status: 400 }
      );
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      console.error('GEMINI_API_KEY not configured');
      return NextResponse.json(
        { error: 'API key not configured' },
        { status: 500 }
      );
    }

    // Initialize Gemini API
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash-lite' });

    // Remove the data URL prefix if present
    const base64Image = image.replace(/^data:image\/\w+;base64,/, '');

    // Create the prompt for safety analysis
    const prompt = `You are an AI safety monitor for physical robots. Analyze this image and determine if there are any safety concerns with the robot or its environment.

Respond in JSON format with the following structure:
{
  "safe": boolean,
  "confidence": number (0-100),
  "summary": "Brief one-sentence summary",
  "concerns": ["array", "of", "specific concerns"] or [],
  "recommendations": ["array", "of", "safety recommendations"] or []
}

Look for:
- Obstacles or hazards in the robot's path
- People in close proximity to the robot
- Unstable positioning or potential for tipping
- Dangerous environmental conditions
- Malfunctioning components or unusual robot behavior
- Any immediate safety risks

Be concise but thorough. If the image doesn't show a robot or is unclear, indicate this in your response.`;

    // Send request to Gemini
    const result = await model.generateContent([
      prompt,
      {
        inlineData: {
          mimeType: 'image/jpeg',
          data: base64Image,
        },
      },
    ]);

    const response = await result.response;
    const text = response.text();

    // Try to parse JSON from the response
    let safetyData;
    try {
      // Extract JSON from markdown code blocks if present
      const jsonMatch = text.match(/```(?:json)?\s*(\{[\s\S]*\})\s*```/) || text.match(/(\{[\s\S]*\})/);
      const jsonText = jsonMatch ? jsonMatch[1] : text;
      safetyData = JSON.parse(jsonText);
    } catch (parseError) {
      console.error('Error parsing Gemini response:', parseError);
      // Fallback response if parsing fails
      safetyData = {
        safe: true,
        confidence: 50,
        summary: 'Unable to parse safety assessment',
        concerns: ['Response parsing error'],
        recommendations: ['Manual review recommended'],
      };
    }

    return NextResponse.json(safetyData);
  } catch (error) {
    console.error('Error in check-safety API:', error);
    return NextResponse.json(
      {
        error: 'Failed to analyze safety',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}
