import { useNavigate } from 'react-router';
import { motion } from 'motion/react';
import { MaiPalPage, MaiPalButton, MaiPalCard } from '../components/MaiPalUI';
import imgE8F194311Dbe8Ea9369F9B655985F50A2 from "figma:asset/d834302f12a4aa666948d09ac39a5777f92044aa.png";

export default function CheckStartPage() {
  const navigate = useNavigate();

  const steps = [
    { name: '望诊', desc: '面部检测', time: '30秒' },
    { name: '闻诊', desc: '语音采样', time: '20秒' },
    { name: '切诊', desc: '脉搏检测', time: '40秒' },
    { name: '问诊', desc: '症状询问', time: '2分钟' },
  ];

  return (
    <MaiPalPage>
      <div className="absolute h-[300px] left-[-11px] top-[60px] w-[399px] pointer-events-none z-0">
        <img alt="" className="absolute inset-0 max-w-none object-cover size-full opacity-70" src={imgE8F194311Dbe8Ea9369F9B655985F50A2} />
      </div>

      {/* 返回按钮 - 提高z-index确保可点击 */}
      <button
        onClick={() => navigate('/home')}
        className="absolute left-6 top-8 text-[20pt] z-50 w-9 h-9 flex items-center justify-center hover:bg-black/5 rounded-full transition-colors cursor-pointer"
      >
        ←
      </button>

      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative pt-20 px-6 z-10"
      >
        {/* 优化标题字号 */}
        <h1 className="text-[22pt] font-bold text-black mb-2 leading-tight">
          每日检测
        </h1>
        {/* 优化副标题字号 */}
        <p className="text-[14pt] font-normal text-black/60 leading-snug">
          脉脉将通过四诊为您提供健康分析
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="relative flex-1 px-6 mt-[240px] flex flex-col gap-3 z-10"
      >
        <MaiPalCard className="bg-[#ecd1b4]/30 mb-3">
          {/* 优化卡片标题字号 */}
          <h3 className="text-[15pt] font-bold text-black mb-3">
            检测流程
          </h3>
          {steps.map((step, index) => (
            <div key={index} className="flex items-center gap-3 mb-2.5 last:mb-0">
              <div className="size-7 rounded-full bg-[#ecd1b4] flex items-center justify-center text-[14pt] font-medium">
                {index + 1}
              </div>
              <div className="flex-1">
                {/* 优化字号 */}
                <p className="text-[14pt] font-medium text-black leading-tight">
                  {step.name}
                </p>
                {/* 优化小字 */}
                <p className="text-[12pt] font-normal text-black/60 leading-tight">
                  {step.desc}
                </p>
              </div>
              <p className="text-[12pt] font-normal text-black/60">
                {step.time}
              </p>
            </div>
          ))}
        </MaiPalCard>

        <div className="bg-[#ecd1b4]/20 rounded-[12pt] p-3 mb-3">
          <p className="text-[13pt] font-normal text-black/70 text-center leading-tight">
            预计总时间：约 3-4 分钟
          </p>
        </div>

        {/* 标准按钮 48pt高度 */}
        <MaiPalButton
          variant="primary"
          onClick={() => navigate('/check/wang')}
          className="mb-8"
        >
          开始检测
        </MaiPalButton>
      </motion.div>
    </MaiPalPage>
  );
}