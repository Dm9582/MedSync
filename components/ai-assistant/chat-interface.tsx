'use client';

import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { ChatMessage } from '@/types';
import { Bot, User, Send, Loader2, AlertTriangle, Heart, Stethoscope } from 'lucide-react';

const QUICK_QUESTIONS = [
  { hindi: "बुखार के लिए घरेलू उपाय", english: "Home remedies for fever", query: "मुझे बुखार है, घरेलू उपाय बताएं" },
  { hindi: "सिरदर्द का इलाज", english: "Headache treatment", query: "सिरदर्द हो रहा है, क्या करूं?" },
  { hindi: "खांसी और जुकाम", english: "Cough and cold", query: "खांसी और जुकाम है, उपाय बताएं" },
  { hindi: "पेट दर्द का इलाज", english: "Stomach pain relief", query: "पेट में दर्द हो रहा है" },
  { hindi: "एसिडिटी की समस्या", english: "Acidity problem", query: "एसिडिटी हो रही है, क्या करूं?" },
  { hindi: "अपच का इलाज", english: "Indigestion treatment", query: "खाना पचने में समस्या हो रही है" }
];

export function ChatInterface() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      message: `🙏 नमस्ते! मैं डॉ. मेडसिंक हूं, आपका AI स्वास्थ्य सहायक।

Hello! I'm Dr. MedSync, your AI Health Assistant.

मैं आपको निम्नलिखित में मदद कर सकता हूं / I can help you with:
• सामान्य लक्षणों के लिए घरेलू उपचार / Home remedies for common symptoms
• पारंपरिक भारतीय उपाय / Traditional Indian remedies  
• आयुर्वेदिक सुझाव / Ayurvedic suggestions
• कब डॉक्टर से मिलना चाहिए / When to see a doctor

⚠️ **महत्वपूर्ण:** मैं पेशेवर चिकित्सा सलाह का विकल्प नहीं हूं।
**Important:** I'm not a substitute for professional medical advice.

आज मैं आपकी कैसे मदद कर सकता हूं? / How can I help you today?`,
      sender: 'assistant',
      timestamp: new Date(),
    }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
    }
  }, [messages]);

  const sendMessage = async (messageText?: string) => {
    const messageToSend = messageText || input;
    if (!messageToSend.trim() || loading) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      message: messageToSend,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: messageToSend }),
      });

      const data = await response.json();

      const assistantMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        message: data.response || "मुझे खुशी होगी कि मैं आपकी मदद कर सकूं। कृपया अपने लक्षणों के बारे में बताएं। I'd be happy to help you. Please tell me about your symptoms.",
        sender: 'assistant',
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      const errorMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        message: `मुझे खेद है, मैं वर्तमान में उपलब्ध नहीं हूं। 
I'm sorry, I'm currently unavailable.

🌿 **तत्काल सहायता / Immediate Help:**
• आपातकाल के लिए Emergency Services का उपयोग करें
• Use Emergency Services for urgent medical needs
• गंभीर लक्षणों के लिए तुरंत डॉक्टर से मिलें
• Consult a doctor immediately for serious symptoms

आपका स्वास्थ्य हमारी प्राथमिकता है! Your health is our priority! 🏥`,
        sender: 'assistant',
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const handleQuickQuestion = (question: typeof QUICK_QUESTIONS[0]) => {
    sendMessage(question.query);
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      {/* Quick Questions */}
      <Card className="border-orange-200 bg-gradient-to-r from-orange-50 to-green-50">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-orange-700">
            <Stethoscope className="h-5 w-5" />
            त्वरित प्रश्न / Quick Questions
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {QUICK_QUESTIONS.map((question, index) => (
              <Button
                key={index}
                variant="outline"
                size="sm"
                onClick={() => handleQuickQuestion(question)}
                className="text-left h-auto p-3 border-orange-200 hover:bg-orange-100 hover:border-orange-300"
                disabled={loading}
              >
                <div>
                  <div className="font-medium text-orange-700">{question.hindi}</div>
                  <div className="text-xs text-orange-600">{question.english}</div>
                </div>
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Chat Interface */}
      <Card className="h-[600px] flex flex-col border-orange-200 shadow-lg">
        <CardHeader className="pb-3 bg-gradient-to-r from-orange-500 to-green-500 text-white rounded-t-lg">
          <CardTitle className="flex items-center gap-2">
            <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
              <Heart className="h-5 w-5" />
            </div>
            डॉ. मेडसिंक - AI स्वास्थ्य सहायक
          </CardTitle>
          <div className="flex items-center gap-2 text-sm text-orange-100 bg-white/10 p-2 rounded-md">
            <AlertTriangle className="h-4 w-4" />
            यह पेशेवर चिकित्सा सलाह का विकल्प नहीं है / Not a substitute for professional medical advice
          </div>
        </CardHeader>
        
        <CardContent className="flex-1 flex flex-col p-0">
          <ScrollArea className="flex-1 p-4" ref={scrollAreaRef}>
            <div className="space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex gap-3 ${
                    message.sender === 'user' ? 'justify-end' : 'justify-start'
                  }`}
                >
                  {message.sender === 'assistant' && (
                    <div className="w-10 h-10 rounded-full bg-gradient-to-r from-orange-500 to-green-500 flex items-center justify-center flex-shrink-0">
                      <Bot className="h-5 w-5 text-white" />
                    </div>
                  )}
                  
                  <div
                    className={`max-w-[85%] p-4 rounded-lg ${
                      message.sender === 'user'
                        ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white'
                        : 'bg-gradient-to-r from-orange-50 to-green-50 text-gray-900 border border-orange-200 shadow-sm'
                    }`}
                  >
                    <p className="text-sm whitespace-pre-wrap leading-relaxed">{message.message}</p>
                    <p className="text-xs opacity-70 mt-2">
                      {message.timestamp.toLocaleTimeString('hi-IN')}
                    </p>
                  </div>

                  {message.sender === 'user' && (
                    <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-blue-600 flex items-center justify-center flex-shrink-0">
                      <User className="h-5 w-5 text-white" />
                    </div>
                  )}
                </div>
              ))}
              
              {loading && (
                <div className="flex gap-3 justify-start">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-r from-orange-500 to-green-500 flex items-center justify-center flex-shrink-0">
                    <Bot className="h-5 w-5 text-white" />
                  </div>
                  <div className="bg-gradient-to-r from-orange-50 to-green-50 p-4 rounded-lg border border-orange-200 shadow-sm">
                    <div className="flex items-center gap-2">
                      <Loader2 className="h-4 w-4 animate-spin text-orange-600" />
                      <span className="text-sm text-gray-600">डॉ. मेडसिंक सोच रहे हैं... / Dr. MedSync is thinking...</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </ScrollArea>

          <div className="p-4 border-t bg-gray-50">
            <div className="flex gap-2">
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="अपने लक्षणों का वर्णन करें... / Describe your symptoms..."
                disabled={loading}
                className="flex-1 border-orange-200 focus:border-orange-400 bg-white"
              />
              <Button 
                onClick={() => sendMessage()} 
                disabled={loading || !input.trim()}
                className="bg-gradient-to-r from-orange-500 to-green-500 hover:from-orange-600 hover:to-green-600 px-6"
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
            <div className="mt-2 text-xs text-gray-500 text-center">
              आपातकाल में Emergency Services का उपयोग करें / Use Emergency Services for emergencies
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}