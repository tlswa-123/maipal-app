import { useState } from 'react';
import { useNavigate } from 'react-router';
import imgImage5 from "figma:asset/bfdf1df856e25098e9e2439bd2159a6f841d368c.png";
import { motion, AnimatePresence } from 'motion/react';
import { MaiPalBottomNav } from '../components/MaiPalBottomNav';
import svgPaths from '../../imports/svg-9dipp3p5kj';

function ListIcon() {
  return (<svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24"><path d={svgPaths.p1e627b00} stroke="black" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" /></svg>);
}

function ChevronRightIcon() {
  return (<svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 19.9947 19.9947"><path d={svgPaths.p278d7ca0} stroke="black" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.6" strokeWidth="1.66623" /></svg>);
}

export default function SummaryPage() {
  const navigate = useNavigate();
  const [selectedFilter, setSelectedFilter] = useState('全部');
  const [wakeTime, setWakeTime] = useState('12');
  const [sleepTime, setSleepTime] = useState('3');
  const [napTime, setNapTime] = useState('0');
  const filters = ['全部', '报告', '记录', '收藏'];
  const weekDays = [{ label: '周一', date: '12', active: false }, { label: '周二', date: '13', active: false }, { label: '周三', date: '14', active: false }, { label: '周四', date: '15', active: false }, { label: '周五', date: '16', active: false }, { label: '周六', date: '17', active: false }, { label: '周日', date: '18', active: true }];
  const allCards = [
    { category: '报告', type: 'report', title: '今天', tag: '四诊检测', description: '面色红润，气色良好' },
    { category: '记录', type: 'record', title: '昨日作息', tag: '记录', fields: [{ label: '起床时间：', value: wakeTime, setter: setWakeTime }, { label: '入睡时间：', value: sleepTime, setter: setSleepTime }, { label: '午休时间：', value: napTime, setter: setNapTime }] },
    { category: '收藏', type: 'favorite', title: '昨日对话', tag: '收藏', messages: [{ role: 'ai', text: '脉脉：为1为2若夫人如43同时' }, { role: 'user', text: '我：为1为2若夫人如43同时' }] }
  ];
  const getFilteredCards = () => selectedFilter === '全部' ? allCards : allCards.filter(card => card.category === selectedFilter);
  const filteredCards = getFilteredCards();

  return (
    <div className="bg-white relative h-screen overflow-hidden flex flex-col">
      <div className="absolute bg-gradient-to-b from-[rgba(236,209,180,0.6)] h-[979px] left-[-16px] to-[rgba(236,209,180,0)] top-[-299px] w-[419px] pointer-events-none z-0" />
      <div className="absolute bg-white h-[186px] left-[-16px] rounded-[16px] shadow-[0px_1px_4px_0px_rgba(0,0,0,0.25)] top-[-9px] w-[419px] z-0" />
      <div className="relative pt-[32px] px-[28px] z-10"><div className="flex items-center justify-between"><h1 className="font-['Lexend_Deca:Medium','Noto_Sans_JP:Medium','Noto_Sans_SC:Medium',sans-serif] font-medium leading-[1.18] text-[24px] text-black">健康记录</h1><button onClick={() => navigate('/settings')} className="bg-[rgba(236,209,180,0.8)] size-[42px] rounded-[12px] flex items-center justify-center hover:bg-[rgba(236,209,180,1)] transition-colors"><div className="size-[24px]"><ListIcon /></div></button></div></div>
      <div className="relative z-10 px-[29px] mt-[24px] mb-[16px]"><div className="flex gap-[5px]">{weekDays.map((day, index) => (<button key={index} className={`${day.active ? 'bg-[#ecd1b4] h-[74.071px] w-[51px] rounded-[19.429px]' : 'bg-[#fafaf9] h-[61px] w-[42px] rounded-[16px]'} transition-all flex flex-col items-center justify-center`}><p className={`font-['Lexend_Deca:Medium','Noto_Sans_JP:Medium',sans-serif] font-medium leading-[1.18] text-[${day.active ? '17px' : '14px'}] ${day.active ? 'text-white' : 'text-[#a8a29e]'}`}>{day.label}</p><p className={`font-['Lexend_Deca:Medium',sans-serif] font-medium leading-[1.18] text-[${day.active ? '24.286px' : '20px'}] ${day.active ? 'text-white' : 'text-[#a8a29e]'} mt-[6px]`}>{day.date}</p></button>))}</div></div>
      <div className="relative z-10 px-[27px] mt-[16px]"><div className="flex gap-[7.996px]">{filters.map((filter) => (<button key={filter} onClick={() => setSelectedFilter(filter)} className={`h-[49.238px] rounded-[10px] border-[1.498px] border-solid border-[#ecd1b4] transition-all ${selectedFilter === filter ? 'bg-[#ecd1b4]' : 'bg-white'} ${filter === '全部' || filter === '报告' || filter === '记录' ? 'w-[66.973px]' : 'w-[67px]'}`}><p className="font-['Source_Han_Sans:Medium',sans-serif] leading-[32px] text-[17.333px] text-black text-center tracking-[0.6667px]">{filter}</p></button>))}</div></div>
      <div className="relative z-10 flex-1 px-[23px] mt-[24px] pb-[90px] overflow-y-auto hide-scrollbar"><div className="space-y-[16px]"><AnimatePresence mode="wait"><motion.div key={selectedFilter} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.3 }} className="space-y-[16px]">
        {filteredCards.map((card, index) => (<motion.div key={`${card.category}-${index}`} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.05 }}>
          {card.type === 'report' && (<button onClick={() => navigate('/check/result')} className="bg-white rounded-[21.333px] shadow-[0px_1px_4px_0px_rgba(0,0,0,0.25)] h-[79.78px] w-full flex items-center hover:shadow-lg transition-all active:scale-[0.98]"><div className="ml-[13.99px] h-[35.998px] w-[39.989px] flex-shrink-0"><div className="relative size-full overflow-hidden rounded-[10px]"><img alt="" className="absolute max-w-none object-cover pointer-events-none size-full" style={{ transform: 'translate(-16.354px, -20.217px)', width: '298.156px', height: '75.565px' }} src={imgImage5} /></div></div><div className="ml-[12px] flex-1 text-left"><div className="flex items-center gap-[7.996px] mb-[1.99px]"><p className="font-['Source_Han_Sans:Bold',sans-serif] leading-[25px] text-[20px] text-black tracking-[0.6667px]">{card.title}</p><div className="bg-[rgba(236,209,180,0.5)] h-[25.977px] rounded-[25139500px] px-[8px] flex items-center"><p className="font-['Source_Han_Sans:Regular',sans-serif] leading-[22px] text-[14.667px] text-[rgba(0,0,0,0.7)] tracking-[0.6667px]">{card.tag}</p></div></div><p className="font-['Source_Han_Sans:Regular',sans-serif] leading-[23.833px] text-[17.333px] text-[rgba(0,0,0,0.4)] tracking-[0.6667px]">{card.description}</p></div><div className="mr-[14.86px] size-[19.995px] flex-shrink-0"><ChevronRightIcon /></div></button>)}
          {card.type === 'record' && (<div className="bg-white rounded-[16px] shadow-[0px_1px_4px_0px_rgba(0,0,0,0.25)] p-[23px] space-y-[16px]"><div className="flex items-center gap-[7.996px]"><h3 className="font-['Source_Han_Sans:Bold',sans-serif] leading-[23.333px] text-[18.667px] text-black tracking-[0.6667px]">{card.title}</h3><div className="bg-[rgba(236,209,180,0.5)] h-[25.977px] rounded-[25139500px] px-[8px] flex items-center"><p className="font-['Source_Han_Sans:Regular',sans-serif] leading-[22px] text-[14.667px] text-[rgba(0,0,0,0.7)] tracking-[0.6667px]">{card.tag}</p></div></div>{card.fields?.map((field, i) => (<div key={i} className="flex items-center relative"><p className="font-['Source_Han_Sans:Regular',sans-serif] leading-[23.833px] text-[17.333px] text-[rgba(0,0,0,0.6)] tracking-[0.6667px]">{field.label}</p><div className="relative"><div className="border border-[#ecd1b4] border-solid h-[24px] w-[144px] rounded-[12px]" /><input type="number" value={field.value} onChange={(e) => field.setter(e.target.value)} className="absolute inset-0 bg-transparent text-center font-['Source_Han_Sans:Regular',sans-serif] text-[17.333px] text-[rgba(0,0,0,0.6)] tracking-[0.6667px] outline-none" /></div></div>))}</div>)}
          {card.type === 'favorite' && (<div className="bg-white rounded-[16px] shadow-[0px_1px_4px_0px_rgba(0,0,0,0.25)] p-[23px] space-y-[16px]"><div className="flex items-center gap-[7.996px]"><h3 className="font-['Source_Han_Sans:Bold',sans-serif] leading-[23.333px] text-[18.667px] text-black tracking-[0.6667px]">{card.title}</h3><div className="bg-[rgba(236,209,180,0.5)] h-[25.977px] rounded-[25139500px] px-[8px] flex items-center"><p className="font-['Source_Han_Sans:Regular',sans-serif] leading-[22px] text-[14.667px] text-[rgba(0,0,0,0.7)] tracking-[0.6667px]">{card.tag}</p></div></div><div className="space-y-[6px]">{card.messages?.map((msg, i) => (<p key={i} className="font-['Source_Han_Sans:Regular',sans-serif] leading-[23.833px] text-[17.333px] text-[rgba(0,0,0,0.4)] tracking-[0.6667px]">{msg.text}</p>))}</div></div>)}
        </motion.div>))}
      </motion.div></AnimatePresence></div></div>
      <MaiPalBottomNav currentTab="summary" />
    </div>
  );
}