import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { Button } from '../components/ui/button';
import { motion } from 'motion/react';
import imgE8F194311Dbe8Ea9369F9B655985F50A2 from "figma:asset/d834302f12a4aa666948d09ac39a5777f92044aa.png";
import svgPaths from '../../imports/svg-axy0vrmv61';

export default function WenQuestionPage() {
  const navigate = useNavigate();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [chatHistory, setChatHistory] = useState<Array<{ role: 'ai' | 'user'; message: string }>>([
    { role: 'ai', message: '您好！让我们聊聊您最近的身体状况。最近睡眠质量如何？' }
  ]);

  const chatContainerRef = useRef<HTMLDivElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatHistory]);

  const questions = [
    '最近睡眠质量如何？',
    '饮食方面有什么变化吗？',
    '大小便是否正常？',
    '最近有什么不适或困扰吗？'
  ];

  const handleSend = () => {
    if (!inputValue.trim()) return;

    const newChatHistory = [
      ...chatHistory,
      { role: 'user' as const, message: inputValue }
    ];
    setChatHistory(newChatHistory);
    setAnswers([...answers, inputValue]);
    setInputValue('');

    setTimeout(() => {
      if (currentQuestion < questions.length - 1) {
        const nextQuestion = currentQuestion + 1;
        setCurrentQuestion(nextQuestion);
        setChatHistory([
          ...newChatHistory,
          { role: 'ai' as const, message: `我明白了。${questions[nextQuestion]}` }
        ]);
      } else {
        setChatHistory([
          ...newChatHistory,
          { role: 'ai' as const, message: '感谢您的配合！我已经了解了您的基本情况，让我为您生成详细的检测报告。' }
        ]);
      }
    }, 1000);
  };

  const handleComplete = () => {
    navigate('/check/result');
  };

  const handleSkip = () => {
    navigate('/check/result');
  };

  return (
    <div className="bg-white relative h-screen overflow-hidden flex flex-col">
      <div className="absolute h-[530px] left-[-27px] top-[39px] w-[405px] pointer-events-none">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 405 530">
          <ellipse cx="202.5" cy="265" fill="url(#paint0_radial_1_121)" rx="202.5" ry="265" />
          <defs>
            <radialGradient cx="0" cy="0" gradientTransform="translate(202.5 265) rotate(90) scale(265 202.5)" gradientUnits="userSpaceOnUse" id="paint0_radial_1_121" r="1">
              <stop stopColor="#ECD1B4" />
              <stop offset="1" stopColor="#ECD1B4" stopOpacity="0" />
            </radialGradient>
          </defs>
        </svg>
      </div>

      <div className="absolute bg-gradient-to-b from-[#ecd1b4] h-[575px] left-[-21px] to-[rgba(236,209,180,0)] top-[-263px] w-[419px] pointer-events-none" />

      <div className="relative pt-8 px-8 bg-white z-10">
        <button onClick={() => navigate('/check/qie')} className="text-[24px]">
          ←
        </button>
        <div className="flex items-center gap-2 mt-4">
          <div className="h-1 flex-1 bg-[#ecd1b4] rounded-full" />
          <div className="h-1 flex-1 bg-[#ecd1b4] rounded-full" />
          <div className="h-1 flex-1 bg-[#ecd1b4] rounded-full" />
          <div className="h-1 flex-1 bg-[#ecd1b4] rounded-full" />
        </div>
        <p className="font-['Lexend_Deca:Medium','Noto_Sans_SC:Medium',sans-serif] font-medium text-[14px] text-black/60 mt-2">
          第 4 步，共 4 步
        </p>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="relative flex-1 flex flex-col px-8 mt-4 overflow-hidden"
      >
        <div className="flex items-center gap-3 mb-4">
          <div className="size-12 rounded-full overflow-hidden flex-shrink-0">
            <img alt="" className="size-full object-cover" src={imgE8F194311Dbe8Ea9369F9B655985F50A2} />
          </div>
          <div>
            <h2 className="font-['Lexend_Deca:Medium','Noto_Sans_SC:Medium',sans-serif] font-medium text-[20px] text-black">
              问诊
            </h2>
            <p className="font-['Lexend_Deca:Medium','Noto_Sans_SC:Medium',sans-serif] text-[14px] text-black/60">
              脉脉在线
            </p>
          </div>
        </div>

        <div 
          ref={chatContainerRef}
          className="flex-1 mb-4 space-y-4 overflow-y-auto hide-scrollbar pb-4"
        >
          {chatHistory.map((chat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex ${chat.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[80%] rounded-[16px] px-4 py-3 ${
                  chat.role === 'user'
                    ? 'bg-[#ecd1b4] text-black'
                    : 'bg-black/5 text-black'
                }`}
              >
                <p className="font-['Lexend_Deca:Medium','Noto_Sans_SC:Medium',sans-serif] text-[15px]">
                  {chat.message}
                </p>
              </div>
            </motion.div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        <div className="pb-8">
          {currentQuestion >= questions.length ? (
            <div className="space-y-3">
              <Button
                onClick={handleComplete}
                className="w-full bg-[#ecd1b4] hover:bg-[#d3b697] text-black font-medium text-[18px] rounded-[12px] py-6"
              >
                查看检测结果
              </Button>
              <button
                onClick={handleSkip}
                className="w-full font-['Lexend_Deca:Medium','Noto_Sans_SC:Medium',sans-serif] text-[16px] text-black/60 hover:text-black py-3"
              >
                跳过此步骤
              </button>
            </div>
          ) : (
            <div className="space-y-3">
              <div className="bg-[rgba(255,255,255,0.75)] rounded-[24px] shadow-[0px_4px_20px_0px_rgba(0,0,0,0.1)] p-4 w-full">
                <div className="flex gap-2 items-end">
                  <div className="bg-[rgba(255,255,255,0.9)] h-[47.993px] rounded-[24px] relative flex-1 min-w-0">
                    <div className="flex items-center gap-3 px-5 py-[14px] h-full">
                      <input
                        type="text"
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' && !e.shiftKey) {
                            e.preventDefault();
                            handleSend();
                          }
                        }}
                        placeholder="输入您的回答..."
                        className="font-['Source_Han_Sans:Regular',sans-serif] text-[21.333px] text-black placeholder:text-[rgba(10,10,10,0.5)] tracking-[0.6667px] bg-transparent outline-none flex-1 min-w-0 leading-normal"
                      />
                      <button className="shrink-0 size-[20px]">
                        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
                          <path d="M10 15.8333V18.3324" stroke="black" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66606" />
                          <path d={svgPaths.pb4beb80} stroke="black" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66606" />
                          <path d={svgPaths.p25182900} stroke="black" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66606" />
                        </svg>
                      </button>
                    </div>
                    <div aria-hidden="true" className="absolute border-[#ecd1b4] border-[1.622px] border-solid inset-0 pointer-events-none rounded-[24px]" />
                  </div>

                  <button
                    onClick={handleSend}
                    className="bg-[#ecd1b4] size-[48px] rounded-[12px] flex items-center justify-center hover:bg-[#d3b697] transition-colors shrink-0"
                  >
                    <svg className="block size-[20px]" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
                      <g clipPath="url(#clip0_send)">
                        <path d={svgPaths.p7de2100} stroke="black" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66606" />
                        <path d={svgPaths.p31491280} stroke="black" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66606" />
                      </g>
                      <defs>
                        <clipPath id="clip0_send">
                          <rect fill="white" height="20" width="20" />
                        </clipPath>
                      </defs>
                    </svg>
                  </button>
                </div>
              </div>

              <button
                onClick={handleSkip}
                className="w-full font-['Lexend_Deca:Medium','Noto_Sans_SC:Medium',sans-serif] text-[16px] text-black/60 hover:text-black py-3"
              >
                跳过此步骤
              </button>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
}