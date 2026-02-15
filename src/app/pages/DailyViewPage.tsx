import { useState } from 'react';
import { useNavigate } from 'react-router';
import imgImage5 from "figma:asset/bfdf1df856e25098e9e2439bd2159a6f841d368c.png";
import { motion, AnimatePresence } from 'motion/react';
import { MaiPalBottomNav } from '../components/MaiPalBottomNav';
import svgPaths from '../../imports/svg-rkrh7suxb2';
import { useCheck } from '../context/CheckContext';

function ListIcon() {
  return (
    <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 19.9947 19.9947">
      <path d={svgPaths.p3c8cf000} stroke="black" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66623" />
    </svg>
  );
}

export default function DailyViewPage() {
  const navigate = useNavigate();
  const { hasDailyCheck } = useCheck();
  const [selectedFilter, setSelectedFilter] = useState('全部');
  const [wakeTime, setWakeTime] = useState('');
  const [sleepTime, setSleepTime] = useState('');
  const [napTime, setNapTime] = useState('');

  const filters = ['全部', '饮食', '作息', '生活习惯'];

  const allCards = [
    { category: '饮食', type: 'advice', title: '多喝温水', tag: '饮食', description: '你的舌苔显示你有点着凉，建议温水' },
    { category: '饮食', type: 'advice', title: '多吃山药、大枣', tag: '饮食', description: '你今天有一点阴虚，推荐吃温热食物' },
    { category: '饮食', type: 'button', buttonText: '脉脉给你更详细的食谱建议' },
    { category: '作息', type: 'input', title: '昨日作息', tag: '作息', fields: [{ label: '起床时间：', value: wakeTime, setter: setWakeTime }, { label: '入睡时间：', value: sleepTime, setter: setSleepTime }, { label: '午休时间：', value: napTime, setter: setNapTime }] },
    { category: '作息', type: 'advice', title: '推荐作息', tag: '作息', texts: ['建议7点起床', '建议23点入睡', '午休半小时'] },
    { category: '生活习惯', type: 'task', title: '今日小任务', tag: '生活习惯', task: '提肛十次', detail: '2点前3杯，8点前6杯' },
    { category: '生活习惯', type: 'advice', title: '今天是小寒', tag: '生活习惯', description: '注意保暖哦！' },
    { category: '生活习惯', type: 'button', buttonText: '脉脉和你一起做任务' }
  ];

  const getFilteredCards = () => selectedFilter === '全部' ? allCards : allCards.filter(card => card.category === selectedFilter);
  const filteredCards = getFilteredCards();

  return (
    <div className="bg-white relative h-screen overflow-hidden flex flex-col">
      <div className="absolute bg-gradient-to-b from-[rgba(236,209,180,0.5)] h-[799.999px] left-[-15.99px] to-[rgba(236,209,180,0)] top-[-249.99px] w-[418.999px] pointer-events-none z-0" />
      <div className="relative pt-[39.989px] px-[23.998px] z-10">
        <div className="flex items-center justify-between mb-[11.999px]">
          <button onClick={() => navigate('/home')} className="rounded-[25139500px] size-[35.998px] flex items-center justify-center hover:bg-black/5 transition-colors"><p className="font-['Source_Han_Sans:Medium',sans-serif] leading-[32px] text-[#0a0a0a] text-[26.667px] text-center tracking-[0.6667px]">←</p></button>
          <h1 className="font-['Source_Han_Sans:Bold',sans-serif] leading-[30px] text-[24px] text-black tracking-[0.6667px]">每日一见</h1>
          <button onClick={() => navigate('/settings')} className="bg-[rgba(236,209,180,0.8)] size-[39.989px] rounded-[10px] flex items-center justify-center hover:bg-[rgba(236,209,180,1)] transition-colors"><div className="size-[19.995px]"><ListIcon /></div></button>
        </div>
        <p className="font-['Source_Han_Sans:Medium',sans-serif] leading-[23.333px] text-[18.667px] text-[rgba(0,0,0,0.7)] tracking-[0.6667px]">每天的计划都在这里</p>
      </div>
      <div className="relative z-10 px-[24px] mt-[20px]">
        <div className="flex gap-[7.996px]">
          {filters.map((filter) => (<button key={filter} onClick={() => setSelectedFilter(filter)} className={`h-[49.238px] rounded-[10px] border-[1.498px] border-solid border-[#ecd1b4] transition-all ${selectedFilter === filter ? 'bg-[#ecd1b4]' : 'bg-white'} ${filter === '生活习惯' ? 'w-[102.97px]' : 'w-[66.973px]'}`}><p className="font-['Source_Han_Sans:Medium',sans-serif] leading-[32px] text-[17.333px] text-black text-center tracking-[0.6667px]">{filter}</p></button>))}
        </div>
      </div>
      <div className="relative z-10 flex-1 px-[23.998px] mt-[20px] pb-[90px] overflow-y-auto hide-scrollbar">
        {!hasDailyCheck ? (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-[16px]">
            <h2 className="font-['Source_Han_Sans:Bold',sans-serif] leading-[26.667px] text-[21.333px] text-black tracking-[0.6667px]">今日还没有检测哦！</h2>
            <button onClick={() => navigate('/check-start')} className="bg-white border-gray-100 border rounded-[14px] shadow-[0px_4px_6px_0px_rgba(0,0,0,0.1),0px_2px_4px_0px_rgba(0,0,0,0.1)] h-[78px] w-full flex items-center hover:shadow-lg transition-all active:scale-[0.98]">
              <div className="ml-[14px] h-9 w-10 flex-shrink-0"><div className="relative size-full overflow-hidden rounded-[10px]"><img alt="" className="absolute max-w-none object-cover pointer-events-none size-full" style={{ transform: 'translate(-16.36px, -20.22px)', width: '298.156px', height: '75.562px' }} src={imgImage5} /></div></div>
              <div className="ml-[12px] flex-1 text-left"><p className="font-['Source_Han_Sans:Bold',sans-serif] leading-[25px] text-[20px] text-black tracking-[0.67px]">每日检测</p><p className="font-['Source_Han_Sans:Regular',sans-serif] leading-[21.67px] text-[17.33px] text-black/40 tracking-[0.67px]">望闻问切</p></div>
              <svg className="mr-5 size-5 flex-shrink-0" fill="none" viewBox="0 0 20 20"><path d="M7.5 15L12.5 10L7.5 5" stroke="black" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.6" strokeWidth="1.666" /></svg>
            </button>
          </motion.div>
        ) : (
          <div className="space-y-[16px]">
            <h2 className="font-['Source_Han_Sans:Bold',sans-serif] leading-[26.667px] text-[21.333px] text-black tracking-[0.6667px]">今日健康建议</h2>
            <AnimatePresence mode="wait"><motion.div key={selectedFilter} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.3 }} className="space-y-[16px]">
              {filteredCards.map((card, index) => (
                <motion.div key={`${card.category}-${index}`} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.05 }} className="bg-white rounded-[14px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_0px_rgba(0,0,0,0.1)] border-[0.749px] border-solid border-[#f3f4f6] p-[14.738px]">
                  {card.type === 'advice' && (<div className="space-y-[16px]"><div className="space-y-[3.992px]"><div className="flex gap-[7.996px] items-center"><h3 className="font-['Source_Han_Sans:Bold',sans-serif] leading-[23.333px] text-[18.667px] text-black tracking-[0.6667px]">{card.title}</h3><div className="bg-[rgba(236,209,180,0.5)] h-[25.977px] rounded-[25139500px] px-[8px] flex items-center"><p className="font-['Source_Han_Sans:Regular',sans-serif] leading-[22px] text-[14.667px] text-[rgba(0,0,0,0.7)] tracking-[0.6667px]">{card.tag}</p></div></div>{card.description && (<p className="font-['Source_Han_Sans:Regular',sans-serif] leading-[23.833px] text-[17.333px] text-[rgba(0,0,0,0.6)] tracking-[0.6667px]">{card.description}</p>)}{card.texts && card.texts.map((text, i) => (<p key={i} className="font-['Source_Han_Sans:Regular',sans-serif] leading-[23.833px] text-[17.333px] text-[rgba(0,0,0,0.6)] tracking-[0.6667px]">{text}</p>))}</div></div>)}
                  {card.type === 'input' && (<div className="space-y-[16px]"><div className="space-y-[3.992px]"><div className="flex gap-[7.996px] items-center"><h3 className="font-['Source_Han_Sans:Bold',sans-serif] leading-[23.333px] text-[18.667px] text-black tracking-[0.6667px]">{card.title}</h3><div className="bg-[rgba(236,209,180,0.5)] h-[25.977px] rounded-[25139500px] px-[8px] flex items-center"><p className="font-['Source_Han_Sans:Regular',sans-serif] leading-[22px] text-[14.667px] text-[rgba(0,0,0,0.7)] tracking-[0.6667px]">{card.tag}</p></div></div></div>{card.fields?.map((field, i) => (<div key={i} className="flex items-center gap-[8px]"><p className="font-['Source_Han_Sans:Regular',sans-serif] leading-[23.833px] text-[17.333px] text-[rgba(0,0,0,0.6)] tracking-[0.6667px]">{field.label}</p><input type="number" value={field.value} onChange={(e) => field.setter(e.target.value)} className="border border-[#ecd1b4] border-solid h-[24px] w-[144px] rounded-[12px] text-center font-['Source_Han_Sans:Regular',sans-serif] text-[17.333px] text-black outline-none" placeholder="" /></div>))}</div>)}
                  {card.type === 'task' && (<div className="space-y-[16px]"><div className="space-y-[3.992px]"><div className="flex gap-[7.996px] items-center"><h3 className="font-['Source_Han_Sans:Bold',sans-serif] leading-[23.333px] text-[18.667px] text-black tracking-[0.6667px]">{card.title}</h3><div className="bg-[rgba(236,209,180,0.5)] h-[25.977px] rounded-[25139500px] px-[8px] flex items-center"><p className="font-['Source_Han_Sans:Regular',sans-serif] leading-[22px] text-[14.667px] text-[rgba(0,0,0,0.7)] tracking-[0.6667px]">{card.tag}</p></div></div><p className="font-['Source_Han_Sans:Regular',sans-serif] leading-[23.833px] text-[17.333px] text-[rgba(0,0,0,0.6)] tracking-[0.6667px]">{card.task}</p></div>{card.detail && (<p className="font-['Source_Han_Sans:Regular',sans-serif] leading-[23.833px] text-[17.333px] text-[rgba(0,0,0,0.6)] tracking-[0.6667px]">{card.detail}</p>)}</div>)}
                  {card.type === 'button' && (<button onClick={() => navigate('/home')} className="bg-[#ecd1b4] h-[49px] w-full rounded-[10px] border-[1.498px] border-solid border-[#ecd1b4] hover:bg-[#d3b697] transition-colors"><p className="font-['Source_Han_Sans:Medium',sans-serif] leading-[32px] text-[17.333px] text-black text-center tracking-[0.6667px]">{card.buttonText}</p></button>)}
                </motion.div>
              ))}
              <button onClick={() => navigate('/check/result')} className="bg-[#ecd1b4] h-[60.733px] w-full rounded-[12px] hover:bg-[#d3b697] transition-colors"><p className="font-['Source_Han_Sans:Medium',sans-serif] leading-[32px] text-[20px] text-black text-center tracking-[0.6667px]">查看完整检测报告</p></button>
            </motion.div></AnimatePresence>
          </div>
        )}
      </div>
      <MaiPalBottomNav currentTab="daily-view" />
    </div>
  );
}