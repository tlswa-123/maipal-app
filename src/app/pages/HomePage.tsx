import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import imgAvatar from "figma:asset/d834302f12a4aa666948d09ac39a5777f92044aa.png";
import imgImage5 from "figma:asset/bfdf1df856e25098e9e2439bd2159a6f841d368c.png";
import { motion, AnimatePresence } from 'motion/react';
import { Send } from 'lucide-react';
import { MaiPalBottomNav } from '../components/MaiPalBottomNav';
import svgPaths from '../../imports/svg-0qxrpg5pzc';
import { useCheck } from '../context/CheckContext';

interface ChatMessage {
  id: number;
  role: 'ai' | 'user';
  message: string;
}

export default function HomePage() {
  const navigate = useNavigate();
  const { hasDailyCheck } = useCheck();
  const [inputValue, setInputValue] = useState('');
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([
    { id: 1, role: 'ai', message: '新的一天开始了\n脉脉想知道你的身体情况！' }
  ]);
  const [nextId, setNextId] = useState(2);

  // 发送消息
  const handleSend = () => {
    if (!inputValue.trim()) return;

    // 添加用户消息
    const userMessage: ChatMessage = {
      id: nextId,
      role: 'user',
      message: inputValue
    };
    
    let newHistory = [...chatHistory, userMessage];
    
    // 如果超过3条，删除最早的一条
    if (newHistory.length > 3) {
      newHistory = newHistory.slice(1);
    }
    
    setChatHistory(newHistory);
    setInputValue('');
    setNextId(nextId + 1);

    // AI 回应逻辑
    setTimeout(() => {
      let response = '';
      
      if (inputValue.includes('累') || inputValue.includes('疲劳')) {
        response = '我理解您的感受。持续疲劳可能是多种原因造成的。';
      } else if (inputValue.includes('睡眠') || inputValue.includes('失眠')) {
        response = '睡眠问题确实很困扰人。建议您睡前1小时避免使用电子设备。';
      } else if (inputValue.includes('检测') || inputValue.includes('诊断')) {
        response = '好的！我可以为您进行四诊检测。点击建议页面即可开始！';
      } else {
        response = '我明白了。请继续告诉我更多细节，这样我能更好地帮助您。';
      }

      const aiMessage: ChatMessage = {
        id: nextId + 1,
        role: 'ai',
        message: response
      };

      let updatedHistory = [...newHistory, aiMessage];
      
      // 如果超过3条，删除最早的一条
      if (updatedHistory.length > 3) {
        updatedHistory = updatedHistory.slice(1);
      }
      
      setChatHistory(updatedHistory);
      setNextId(nextId + 2);
    }, 1000);
  };

  return (
    <div className="bg-white relative h-screen overflow-hidden">
      {/* 背景渐变 */}
      <div className="absolute bg-gradient-to-b from-[rgba(236,209,180,0.6)] h-[499.99px] left-0 to-[rgba(0,0,0,0)] top-0 via-1/2 via-[rgba(236,209,180,0.3)] w-full pointer-events-none z-0" />
      
      {/* 顶部问候语和设置按钮 */}
      <div className="absolute content-stretch flex h-[67.993px] items-start justify-between left-[21px] top-[27.99px] w-[350.846px] z-30">
        {/* 问候语 */}
        <div className="h-[67.993px] relative shrink-0 w-[221.996px]">
          <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[7.992px] items-start relative size-full">
            {/* 第一行 */}
            <div className="h-[30px] relative shrink-0 w-[96px]">
              <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
                <p className="absolute font-['Noto_Sans_SC:Medium',sans-serif] font-medium leading-[30px] left-0 text-[24px] text-black top-0 tracking-[0.67px]">你好 CC!</p>
              </div>
            </div>
            {/* 第二行 */}
            <div className="flex-[1_0_0] min-h-px min-w-px relative w-[221.996px]">
              <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
                <p className="absolute font-['Noto_Sans_SC:Medium',sans-serif] font-medium leading-[30px] left-0 text-[24px] text-black top-[-3.46px] tracking-[0.67px]">早上好！我是脉脉！</p>
              </div>
            </div>
          </div>
        </div>

        {/* 设置按钮 */}
        <button
          onClick={() => navigate('/settings')}
          className="bg-[rgba(236,209,180,0.8)] relative rounded-[12px] shrink-0 size-[47.993px] hover:bg-[rgba(236,209,180,1)] transition-colors"
        >
          <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center pr-[0.013px] relative size-full">
            <div className="relative shrink-0 size-[23.99px]">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 23.9899 23.9899">
                <g>
                  <path d={svgPaths.p228e9980} stroke="black" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.99916" />
                  <path d={svgPaths.p17d5a240} stroke="black" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.99916" />
                </g>
              </svg>
            </div>
          </div>
        </button>
      </div>

      {/* 数字人和对话气泡区域 */}
      <div className="absolute left-[-27.99px] size-[449.99px] top-[262px] z-10 pointer-events-none">
        {/* 光晕 */}
        <div className="absolute bg-[rgba(236,209,180,0.1)] blur-[64px] left-[-124.99px] rounded-[27461600px] size-[699.991px] top-[-124.99px]" />
        
        {/* 数字人图片 */}
        <div className="absolute left-0 size-[449.99px] top-[-26px]">
          <img alt="脉脉" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgAvatar} />
        </div>

        {/* 对话气泡 */}
        <div className="absolute w-[449.99px] top-0 left-0 pointer-events-auto">
          <AnimatePresence mode="popLayout">
            {chatHistory.map((chat, index) => {
              // 计算气泡位置（从上往下堆叠）
              const baseTop = -147;
              const spacing = 24;
              
              let top = baseTop;
              let left = 0;
              
              // 累加之前所有气泡的高度和间距
              for (let i = 0; i < index; i++) {
                const prevMessage = chatHistory[i];
                const prevHeight = prevMessage.message.includes('\n') ? 114 : 67;
                top += prevHeight + spacing;
              }
              
              // 当前气泡高度
              const bubbleHeight = chat.message.includes('\n') ? 114 : 67;
              
              // 根据角色设置水平位置
              if (chat.role === 'ai') {
                left = 48.99;
              } else {
                left = 85;
              }

              return (
                <motion.div
                  key={chat.id}
                  initial={{ opacity: 0, y: 20, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -20, scale: 0.9 }}
                  transition={{ duration: 0.4 }}
                  layout
                  className="absolute bg-[rgba(255,255,255,0.8)] content-stretch flex flex-col items-start pt-[15.998px] px-[19.987px] rounded-[20px] shadow-[0px_4px_20px_0px_rgba(0,0,0,0.15)]"
                  style={{
                    top: `${top}px`,
                    left: `${left}px`,
                    width: '279.989px',
                    minHeight: `${bubbleHeight}px`
                  }}
                >
                  <div className="h-[82.481px] relative shrink-0 w-full">
                    <div className="absolute font-['Noto_Sans_SC:Regular',sans-serif] font-normal leading-[27.5px] left-0 text-[20px] text-black top-[-2.82px] tracking-[0.67px] w-[207px] whitespace-pre-wrap">
                      {chat.message}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      </div>

      {/* 每日检测提醒卡片 - 当未完成检测时显示 */}
      <AnimatePresence>
        {!hasDailyCheck && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            className="absolute left-[19.99px] top-[589.99px] w-[352.866px] z-20"
          >
            <button
              onClick={() => navigate('/check-start')}
              className="bg-white border-gray-100 border rounded-[14px] shadow-[0px_4px_6px_0px_rgba(0,0,0,0.1),0px_2px_4px_0px_rgba(0,0,0,0.1)] h-[78px] w-full flex items-center hover:shadow-lg transition-all active:scale-[0.98]"
            >
              {/* 图标 */}
              <div className="ml-[14px] h-9 w-10 flex-shrink-0">
                <div className="relative size-full overflow-hidden rounded-[10px]">
                  <img 
                    alt="" 
                    className="absolute max-w-none object-cover pointer-events-none size-full"
                    style={{
                      transform: 'translate(-16.36px, -20.22px)',
                      width: '298.156px',
                      height: '75.562px'
                    }}
                    src={imgImage5} 
                  />
                </div>
              </div>

              {/* 文字内容 */}
              <div className="ml-[12px] flex-1 text-left">
                <p className="font-['Source_Han_Sans:Bold',sans-serif] leading-[25px] text-[20px] text-black tracking-[0.67px]">
                  每日检测
                </p>
                <p className="font-['Source_Han_Sans:Regular',sans-serif] leading-[21.67px] text-[17.33px] text-black/40 tracking-[0.67px]">
                  望闻问切
                </p>
              </div>

              {/* 箭头 */}
              <svg className="mr-5 size-5 flex-shrink-0" fill="none" viewBox="0 0 20 20">
                <path 
                  d="M7.5 15L12.5 10L7.5 5" 
                  stroke="black" 
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.5"
                />
              </svg>
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 输入框区域 */}
      <div className="absolute bg-[rgba(255,255,255,0.75)] content-stretch flex flex-col h-[79.988px] items-start left-[19.99px] pt-[15.998px] px-[15.998px] rounded-[24px] shadow-[0px_4px_20px_0px_rgba(0,0,0,0.1)] top-[683.99px] w-[352.866px] z-20">
        <div className="h-[47.993px] relative shrink-0 w-full">
          {/* 发送按钮 */}
          <button
            onClick={handleSend}
            disabled={!inputValue.trim()}
            className="absolute bg-[#ecd1b4] content-stretch flex items-center justify-center left-[272.88px] rounded-[12px] size-[47.993px] top-0 hover:bg-[#d3b697] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <div className="relative shrink-0 size-[19.987px]">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 19.9873 19.9873">
                <g clipPath="url(#clip0_send)">
                  <path d={svgPaths.p2de2a800} stroke="black" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66561" />
                  <path d={svgPaths.p7f48a00} stroke="black" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66561" />
                </g>
                <defs>
                  <clipPath id="clip0_send">
                    <rect fill="white" height="19.9873" width="19.9873" />
                  </clipPath>
                </defs>
              </svg>
            </div>
          </button>

          {/* 输入框 */}
          <div className="absolute bg-[rgba(255,255,255,0.9)] h-[47.993px] left-0 rounded-[24px] top-0 w-[264.886px]">
            <div className="absolute content-stretch flex gap-[11.995px] h-[47.993px] items-center left-0 px-[19.987px] top-0 w-[264.886px]">
              {/* 文本输入 */}
              <div className="flex-[1_0_0] h-[31.995px] min-h-px min-w-px relative">
                <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center overflow-clip relative rounded-[inherit] size-full">
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
                    className="font-['Arimo:Regular','Noto_Sans_SC:Regular','Noto_Sans_JP:Regular',sans-serif] font-normal leading-[normal] text-[21.333px] text-black placeholder:text-[rgba(10,10,10,0.5)] tracking-[0.6667px] bg-transparent outline-none w-full"
                  />
                </div>
              </div>
              
              {/* 麦克风图标 */}
              <button className="relative shrink-0 size-[19.987px]">
                <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
                  <div className="h-[19.987px] overflow-clip relative shrink-0 w-full">
                    <div className="absolute inset-[8.33%_37.5%_37.5%_37.5%]">
                      <div className="absolute inset-[-7.69%_-16.67%]">
                        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 6.66244 12.4921">
                          <path d={svgPaths.p26a05c00} stroke="black" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.6" strokeWidth="1.66561" />
                        </svg>
                      </div>
                    </div>
                    <div className="absolute inset-[41.67%_20.83%_20.83%_20.83%]">
                      <div className="absolute inset-[-11.11%_-7.14%]">
                        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 13.3249 9.16085">
                          <path d={svgPaths.p112c2280} stroke="black" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.6" strokeWidth="1.66561" />
                        </svg>
                      </div>
                    </div>
                    <div className="absolute bottom-[8.33%] left-1/2 right-1/2 top-[79.17%]">
                      <div className="absolute inset-[-33.33%_-0.83px]">
                        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 1.66561 4.16402">
                          <path d="M0.832805 0.832805V3.33122" stroke="black" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.6" strokeWidth="1.66561" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              </button>
            </div>
            {/* 边框 */}
            <div className="absolute border-[#ecd1b4] border-[0.818px] border-solid h-[47.993px] left-0 rounded-[24px] top-0 w-[264.886px] pointer-events-none" />
          </div>
        </div>
      </div>

      {/* 底部导航栏 */}
      <div className="absolute bottom-0 left-0 right-0 z-30">
        <MaiPalBottomNav currentTab="chat" />
      </div>
    </div>
  );
}