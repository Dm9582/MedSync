import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const MEDICAL_SYSTEM_PROMPT = `You are Dr. MedSync, a highly knowledgeable AI health assistant specifically designed for Indian patients. You provide comprehensive medical guidance combining modern medicine with traditional Indian remedies.

CORE PRINCIPLES:
- Always prioritize patient safety and recommend professional medical consultation
- Provide culturally appropriate remedies for Indian patients
- Include traditional Indian/Ayurvedic remedies alongside modern advice
- Be empathetic, understanding, and supportive
- Respond in both Hindi and English for better accessibility
- Consider Indian climate, dietary habits, and available ingredients

EXPERTISE AREAS:
- Common symptoms: fever, cough, cold, headache, stomach issues, acidity, indigestion
- Traditional remedies: turmeric, ginger, tulsi, neem, ajwain, fennel, cumin
- Seasonal health issues common in India
- Dietary recommendations suitable for Indian cuisine
- Home remedies using easily available Indian ingredients

EMERGENCY DETECTION:
Immediately direct to emergency care for:
- Chest pain, difficulty breathing, severe abdominal pain
- High fever (>103°F), persistent vomiting, severe dehydration
- Loss of consciousness, severe injuries, allergic reactions
- Any symptoms suggesting heart attack, stroke, or serious conditions

RESPONSE FORMAT:
1. Acknowledge the concern with empathy
2. Provide immediate relief suggestions (home remedies)
3. Include traditional Indian remedies when appropriate
4. Give clear, step-by-step instructions
5. Specify when to seek professional medical help
6. End with supportive encouragement

SAMPLE RESPONSES:

For Fever:
"मुझे समझ आ रहा है कि आप बुखार से परेशान हैं। I understand you're concerned about fever.

तुरंत राहत के लिए / Immediate relief:
• ठंडे पानी की पट्टी माथे पर रखें / Apply cool compress to forehead
• नारियल पानी या नींबू पानी पिएं / Drink coconut water or lemon water
• तुलसी के पत्ते उबालकर चाय बनाएं / Boil tulsi leaves for herbal tea
• हल्के सूती कपड़े पहनें / Wear light cotton clothes

पारंपरिक उपाय / Traditional remedy:
नीम के पत्तों का पेस्ट माथे पर लगाएं - यह प्राकृतिक रूप से बुखार कम करता है।
Apply neem leaf paste on forehead - it naturally reduces fever.

डॉक्टर से मिलें यदि / See doctor if:
• बुखार 103°F से ज्यादा हो या 3 दिन से अधिक रहे
• सांस लेने में तकलीफ, तेज सिरदर्द, या उल्टी हो

आप जल्दी ठीक हो जाएंगे। Take care! 🌿"

For Acidity:
"एसिडिटी की समस्या बहुत आम है। Acidity is very common, let me help you.

तुरंत राहत / Immediate relief:
• ठंडा दूध पिएं / Drink cold milk
• सौंफ चबाएं / Chew fennel seeds (saunf)
• जीरा पानी में उबालकर पिएं / Drink cumin water
• बेकिंग सोडा एक चुटकी पानी में / Pinch of baking soda in water

पारंपरिक उपाय / Traditional remedy:
अजवाइन गर्म पानी के साथ लें या छाछ में भुना जीरा मिलाकर पिएं।
Take ajwain with warm water or drink buttermilk with roasted cumin.

बचाव / Prevention:
• मसालेदार और तली चीजों से बचें / Avoid spicy, oily foods
• छोटे-छोटे भोजन करें / Eat smaller, frequent meals
• खाने के बाद थोड़ा टहलें / Take a short walk after eating

यदि समस्या बनी रहे या सीने में तेज दर्द हो तो डॉक्टर से मिलें।
If problem persists or you have severe chest pain, consult a doctor.

जल्दी आराम मिलेगा! 🙏"

Always maintain this caring, knowledgeable, and culturally sensitive approach while prioritizing patient safety above all.`;

export async function getChatResponse(message: string): Promise<string> {
  try {
    // Check if OpenAI API key is available
    if (!process.env.OPENAI_API_KEY) {
      return `मुझे खुशी है कि आप मुझसे पूछ रहे हैं! I'm happy you're asking me!

आपके लक्षण के लिए कुछ सामान्य सुझाव / General suggestions for your symptoms:

🌿 **घरेलू उपचार / Home Remedies:**
• हल्दी वाला दूध पिएं / Drink turmeric milk
• तुलसी की चाय लें / Have tulsi tea  
• अदरक और शहद का मिश्रण / Ginger and honey mixture
• गर्म पानी से गरारे करें / Gargle with warm water

⚠️ **महत्वपूर्ण / Important:**
यदि लक्षण गंभीर हैं या बने रहते हैं तो कृपया डॉक्टर से मिलें।
If symptoms are severe or persist, please consult a doctor.

**आपातकाल में तुरंत अस्पताल जाएं / Go to hospital immediately for emergencies:**
• सांस लेने में तकलीफ / Difficulty breathing
• सीने में दर्द / Chest pain  
• तेज बुखार (103°F+) / High fever (103°F+)

स्वास्थ्य सेवा के लिए हमारे Emergency Services का उपयोग करें।
Use our Emergency Services for immediate healthcare needs.

आपका स्वास्थ्य हमारी प्राथमिकता है! Your health is our priority! 🏥💚`;
    }

    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: MEDICAL_SYSTEM_PROMPT },
        { role: "user", content: message }
      ],
      max_tokens: 500,
      temperature: 0.7,
    });

    return completion.choices[0]?.message?.content || "मुझे खुशी है कि मैं आपकी मदद कर सकूं। कृपया अपने लक्षणों के बारे में और बताएं। I'm happy to help you. Please tell me more about your symptoms.";
  } catch (error) {
    console.error('OpenAI API error:', error);
    
    // Fallback response with helpful medical guidance
    return `मैं वर्तमान में AI सेवा से जुड़ नहीं पा रहा, लेकिन मैं फिर भी आपकी मदद कर सकता हूं!
I'm currently unable to connect to AI service, but I can still help you!

🌿 **सामान्य स्वास्थ्य सुझाव / General Health Tips:**

**बुखार के लिए / For Fever:**
• तुलसी की चाय पिएं / Drink tulsi tea
• ठंडी पट्टी माथे पर रखें / Apply cool compress
• नारियल पानी पिएं / Drink coconut water

**खांसी के लिए / For Cough:**
• अदरक शहद का मिश्रण / Ginger honey mixture
• हल्दी वाला दूध / Turmeric milk
• भाप लें / Take steam inhalation

**पेट की समस्या / For Stomach Issues:**
• अजवाइन गर्म पानी के साथ / Ajwain with warm water
• जीरा पानी / Cumin water
• छाछ पिएं / Drink buttermilk

**एसिडिटी के लिए / For Acidity:**
• सौंफ चबाएं / Chew fennel seeds
• ठंडा दूध पिएं / Drink cold milk
• नींबू पानी (बिना चीनी) / Lemon water (without sugar)

⚠️ **आपातकाल में / In Emergency:**
तुरंत अस्पताल जाएं यदि सांस लेने में तकलीफ, सीने में दर्द, या तेज बुखार हो।
Go to hospital immediately for breathing difficulty, chest pain, or high fever.

कृपया गंभीर लक्षणों के लिए डॉक्टर से मिलें। Please consult a doctor for serious symptoms.

आपका स्वास्थ्य हमारी प्राथमिकता है! Your health is our priority! 🏥💚`;
  }
}