import { useNavigate } from 'react-router';
import { Button } from '../components/ui/button';
import { motion } from 'motion/react';
import { Download, Home, FileText } from 'lucide-react';
import imgE8F194311Dbe8Ea9369F9B655985F50A2 from "figma:asset/d834302f12a4aa666948d09ac39a5777f92044aa.png";
import { useState, useEffect } from 'react';
import { useCheck } from '../context/CheckContext';

export default function CheckResultPage() {
  const navigate = useNavigate();
  const { setHasDailyCheck } = useCheck();
  const [showFullReport, setShowFullReport] = useState(false);

  useEffect(() => {
    setHasDailyCheck(true);
  }, [setHasDailyCheck]);

  const results = [
    { category: '望诊', score: 85, status: '良好', desc: '面色红润，气色良好', color: '#4ade80' },
    { category: '闻诊', score: 90, status: '优秀', desc: '声音洪亮有力，呼吸平稳', color: '#22c55e' },
    { category: '切诊', score: 88, status: '良好', desc: '脉搏平稳有力，节律规整', color: '#4ade80' },
    { category: '问诊', score: 80, status: '良好', desc: '整体状态稳定，需注意休息', color: '#86efac' }
  ];

  const overallScore = Math.round(results.reduce((acc, r) => acc + r.score, 0) / results.length);

  const handleDownloadReport = () => {
    const reportContent = `脉脉健康检测报告\n日期：${new Date().toLocaleDateString('zh-CN')}\n综合健康评分：${overallScore}\n\n详细分析：\n${results.map(r => `${r.category}：${r.status} (${r.score}分) - ${r.desc}`).join('\n')}`;
    const blob = new Blob([reportContent], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `脉脉健康报告_${new Date().toLocaleDateString('zh-CN')}.txt`;
    link.click();
    URL.revokeObjectURL(url);
  };

  if (!showFullReport) {
    return (
      <div className="bg-gradient-to-b from-[#ecd1b4]/30 to-white relative size-full flex flex-col items-center justify-center px-8">
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="flex flex-col items-center max-w-[340px]">
          <div className="size-[160px] mb-8 rounded-full overflow-hidden">
            <img alt="" className="size-full object-cover" src={imgE8F194311Dbe8Ea9369F9B655985F50A2} />
          </div>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="text-center mb-8">
            <h2 className="font-['Lexend_Deca:Medium','Noto_Sans_SC:Medium',sans-serif] font-medium text-[32px] text-black mb-4">检测完成！</h2>
            <p className="font-['Lexend_Deca:Medium','Noto_Sans_SC:Medium',sans-serif] text-[18px] text-black/70 mb-2">脉脉已经为您生成了健康报告</p>
            <div className="bg-gradient-to-br from-[#ecd1b4] to-[#d3b697] rounded-full px-6 py-3 inline-block mt-4">
              <p className="font-['Lexend_Deca:Bold','Noto_Sans_SC:Bold',sans-serif] font-bold text-[36px] text-white">{overallScore}分</p>
              <p className="font-['Lexend_Deca:Medium','Noto_Sans_SC:Medium',sans-serif] text-[16px] text-white">综合评分</p>
            </div>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="w-full space-y-3">
            <Button onClick={() => setShowFullReport(true)} className="w-full bg-[#ecd1b4] hover:bg-[#d3b697] text-black font-medium text-[18px] rounded-[12px] py-6 flex items-center justify-center gap-2">
              <FileText className="size-5" />查看检测报告
            </Button>
            <button onClick={() => navigate('/home')} className="w-full font-['Lexend_Deca:Medium','Noto_Sans_SC:Medium',sans-serif] text-[16px] text-black/60 hover:text-black py-3 flex items-center justify-center gap-2">
              <Home className="size-5" />返回首页
            </button>
          </motion.div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-b from-[#ecd1b4]/30 to-white relative h-screen flex flex-col">
      <div className="sticky top-0 bg-white/95 backdrop-blur-sm z-10 pt-8 px-8 pb-4">
        <div className="flex items-center justify-between">
          <button onClick={() => setShowFullReport(false)} className="text-[24px]">←</button>
          <h1 className="font-['Lexend_Deca:Medium','Noto_Sans_SC:Medium',sans-serif] font-medium text-[20px] text-black">健康检测报告</h1>
          <button onClick={() => navigate('/home')} className="text-black/60 hover:text-black"><Home className="size-6" /></button>
        </div>
      </div>
      <div className="flex-1 overflow-y-auto hide-scrollbar">
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="relative px-8 mt-4 pb-8">
          <div className="bg-white rounded-[24px] shadow-lg p-6 mb-6">
            <div className="flex items-center gap-4 mb-6">
              <div className="size-16 rounded-full overflow-hidden"><img alt="" className="size-full object-cover" src={imgE8F194311Dbe8Ea9369F9B655985F50A2} /></div>
              <div className="flex-1">
                <h2 className="font-['Lexend_Deca:Medium','Noto_Sans_SC:Medium',sans-serif] font-medium text-[20px] text-black">您的健康档案</h2>
                <p className="font-['Lexend_Deca:Medium','Noto_Sans_SC:Medium',sans-serif] text-[14px] text-black/60">{new Date().toLocaleDateString('zh-CN')} {new Date().toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' })}</p>
              </div>
            </div>
            <div className="bg-gradient-to-br from-[#ecd1b4] to-[#d3b697] rounded-[20px] p-6 mb-6 text-center">
              <p className="font-['Lexend_Deca:Medium','Noto_Sans_SC:Medium',sans-serif] text-[16px] text-white/80 mb-2">综合健康评分</p>
              <div className="relative size-[120px] mx-auto mb-2">
                <svg className="size-full -rotate-90"><circle cx="60" cy="60" r="50" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="10" /><circle cx="60" cy="60" r="50" fill="none" stroke="white" strokeWidth="10" strokeDasharray={`${(overallScore / 100) * 314} 314`} strokeLinecap="round" /></svg>
                <div className="absolute inset-0 flex items-center justify-center"><span className="font-['Lexend_Deca:Bold','Noto_Sans_SC:Bold',sans-serif] font-bold text-[36px] text-white">{overallScore}</span></div>
              </div>
              <p className="font-['Lexend_Deca:Medium','Noto_Sans_SC:Medium',sans-serif] text-[18px] text-white">身体状态良好</p>
            </div>
            <div className="space-y-4 mb-6">
              <h3 className="font-['Lexend_Deca:Medium','Noto_Sans_SC:Medium',sans-serif] font-medium text-[18px] text-black mb-4">详细分析</h3>
              {results.map((result, index) => (
                <motion.div key={index} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: index * 0.1 }} className="bg-[#ecd1b4]/10 rounded-[16px] p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-['Lexend_Deca:Medium','Noto_Sans_SC:Medium',sans-serif] font-medium text-[16px] text-black">{result.category}</h4>
                    <span className="font-['Lexend_Deca:Medium','Noto_Sans_SC:Medium',sans-serif] text-[14px] px-3 py-1 rounded-full bg-[#ecd1b4] text-black">{result.status}</span>
                  </div>
                  <div className="h-2 bg-black/10 rounded-full mb-2 overflow-hidden">
                    <motion.div initial={{ width: 0 }} animate={{ width: `${result.score}%` }} transition={{ delay: index * 0.1 + 0.2, duration: 0.8 }} className="h-full rounded-full" style={{ backgroundColor: result.color }} />
                  </div>
                  <p className="font-['Lexend_Deca:Medium','Noto_Sans_SC:Medium',sans-serif] text-[14px] text-black/70">{result.desc}</p>
                </motion.div>
              ))}
            </div>
            <div className="bg-[#ecd1b4]/20 rounded-[16px] p-4 mb-6">
              <h3 className="font-['Lexend_Deca:Medium','Noto_Sans_SC:Medium',sans-serif] font-medium text-[16px] text-black mb-2">健康建议</h3>
              <ul className="space-y-2 font-['Lexend_Deca:Medium','Noto_Sans_SC:Medium',sans-serif] text-[14px] text-black/70">
                <li>• 保持规律作息，每天保证7-8小时睡眠</li>
                <li>• 饮食均衡，多吃新鲜蔬果</li>
                <li>• 适量运动，每周3-5次有氧运动</li>
                <li>• 保持心情愉悦，适当放松压力</li>
              </ul>
            </div>
            <div className="space-y-3">
              <Button onClick={handleDownloadReport} className="w-full flex items-center justify-center gap-2 bg-[#ecd1b4] hover:bg-[#d3b697] rounded-[12px] py-4 text-black font-medium"><Download className="size-5" /><span className="font-['Lexend_Deca:Medium','Noto_Sans_SC:Medium',sans-serif] font-medium text-[16px]">下载报告</span></Button>
              <button onClick={() => navigate('/home')} className="w-full flex items-center justify-center gap-2 bg-[#ecd1b4]/30 hover:bg-[#ecd1b4]/50 rounded-[12px] py-4 transition-colors"><Home className="size-5" /><span className="font-['Lexend_Deca:Medium','Noto_Sans_SC:Medium',sans-serif] font-medium text-[16px]">返回首页</span></button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}