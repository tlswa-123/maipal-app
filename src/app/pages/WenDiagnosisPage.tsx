import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { motion, AnimatePresence } from 'motion/react';
import { MaiPalPage, MaiPalButton, MaiPalProgress, MaiPalProgressText } from '../components/MaiPalUI';
import svgPaths from '../../imports/svg-iwoujsvjho';

export default function WenDiagnosisPage() {
  const navigate = useNavigate();
  const [recording, setRecording] = useState(false);
  const [progress, setProgress] = useState(0);
  const [completed, setCompleted] = useState(false);
  const [waveLevel, setWaveLevel] = useState(1);
  const waveAnimationRef = useRef<NodeJS.Timeout | null>(null);
  const progressIntervalRef = useRef<NodeJS.Timeout | null>(null);

  const handleStartSampling = () => {
    setRecording(true);
    setProgress(0);
    setCompleted(false);
    startWaveAnimation();
    startProgressAnimation();
  };

  const startWaveAnimation = () => {
    let currentLevel = 1;
    waveAnimationRef.current = setInterval(() => {
      currentLevel = currentLevel >= 4 ? 1 : currentLevel + 1;
      setWaveLevel(currentLevel);
    }, 500);
  };

  const startProgressAnimation = () => {
    progressIntervalRef.current = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressIntervalRef.current!);
          stopRecording();
          setCompleted(true);
          return 100;
        }
        return prev + 2;
      });
    }, 100);
  };

  const stopRecording = () => {
    setRecording(false);
    setWaveLevel(1);
    if (waveAnimationRef.current) {
      clearInterval(waveAnimationRef.current);
      waveAnimationRef.current = null;
    }
    if (progressIntervalRef.current) {
      clearInterval(progressIntervalRef.current);
      progressIntervalRef.current = null;
    }
  };

  const handleSkip = () => {
    stopRecording();
    navigate('/check/qie');
  };

  const handleNext = () => {
    navigate('/check/qie');
  };

  useEffect(() => {
    return () => {
      if (waveAnimationRef.current) clearInterval(waveAnimationRef.current);
      if (progressIntervalRef.current) clearInterval(progressIntervalRef.current);
    };
  }, []);

  return (
    <MaiPalPage>
      <div className="absolute bg-gradient-to-b from-[#ecd1b4] to-[rgba(236,209,180,0)] h-[574.999px] left-[-20.99px] top-[-263px] w-[418.997px] pointer-events-none z-0" />

      <div className="relative pt-8 px-6 z-10">
        <button onClick={() => navigate('/check/wang')} className="text-[20pt] w-9 h-9 flex items-center justify-center hover:bg-black/5 rounded-full transition-colors">
          ←
        </button>
        
        <div className="mt-4">
          <MaiPalProgress steps={4} currentStep={2} />
          <MaiPalProgressText currentStep={2} totalSteps={4} className="mt-2" />
        </div>
      </div>

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="relative flex-1 flex flex-col items-center px-6 mt-6 z-10">
        <h2 className="text-[20pt] font-bold text-black mb-1.5 leading-tight">闻诊 - 语音采集</h2>
        <p className="text-[13pt] text-black/60 text-center mb-4 leading-snug">请念出以下句子</p>
        <p className="text-[18pt] text-black text-center mb-6 leading-snug max-w-[280px]">脉脉关注您的健康</p>

        <div className="relative w-full h-[160px] flex items-center justify-center mb-6">
          <AnimatePresence>
            {recording && waveLevel >= 4 && (
              <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.8 }} transition={{ duration: 0.4 }} className="absolute" style={{ width: '413px', height: '206px', left: 'calc(50% - 206.5px)', top: 'calc(50% - 103px)' }}>
                <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 427 220">
                  <path d={svgPaths.p122174c0} stroke="#ECD1B4" strokeLinecap="round" strokeOpacity="0.4" strokeWidth="14" />
                </svg>
              </motion.div>
            )}
          </AnimatePresence>

          <AnimatePresence>
            {recording && waveLevel >= 3 && (
              <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.8 }} transition={{ duration: 0.4 }} className="absolute" style={{ width: '278px', height: '139px', left: 'calc(50% - 139px)', top: 'calc(50% - 69.5px)' }}>
                <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 292 153">
                  <path d={svgPaths.p3a28b3ac} stroke="#ECD1B4" strokeLinecap="round" strokeOpacity="0.6" strokeWidth="14" />
                </svg>
              </motion.div>
            )}
          </AnimatePresence>

          <AnimatePresence>
            {recording && waveLevel >= 2 && (
              <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.8 }} transition={{ duration: 0.4 }} className="absolute" style={{ width: '146px', height: '73px', left: 'calc(50% - 73px)', top: 'calc(50% - 36.5px)' }}>
                <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 160 87">
                  <path d={svgPaths.p10aaf40} stroke="#ECD1B4" strokeLinecap="round" strokeOpacity="0.8" strokeWidth="14" />
                </svg>
              </motion.div>
            )}
          </AnimatePresence>

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="absolute" style={{ width: '56px', height: '56px', left: 'calc(50% - 28px)', top: 'calc(50% - 28px)' }}>
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 55.9998 55.9998">
              <g>
                <path d="M27.9999 44.3332V51.3331" stroke="#ECD1B4" strokeLinecap="round" strokeLinejoin="round" strokeWidth="4.66665" />
                <path d={svgPaths.p5cb9460} stroke="#ECD1B4" strokeLinecap="round" strokeLinejoin="round" strokeWidth="4.66665" />
                <path d={svgPaths.p19463700} stroke="#ECD1B4" strokeLinecap="round" strokeLinejoin="round" strokeWidth="4.66665" />
              </g>
            </svg>
          </motion.div>

          {completed && (
            <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="absolute size-[120px] rounded-full bg-[#ecd1b4] flex items-center justify-center" style={{ left: 'calc(50% - 60px)', top: 'calc(50% - 60px)' }}>
              <svg className="size-16 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
              </svg>
            </motion.div>
          )}
        </div>

        {recording && !completed && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-[280px] mb-4">
            <div className="h-2 bg-black/10 rounded-full overflow-hidden">
              <motion.div className="h-full bg-[#ecd1b4]" style={{ width: `${progress}%` }} />
            </div>
            <p className="text-[13pt] text-black/60 text-center mt-2 leading-tight">正在采集声音... {Math.round(progress)}%</p>
          </motion.div>
        )}

        {completed && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-[#ecd1b4]/30 rounded-[14px] p-4 mb-4 w-full max-w-[280px]">
            <h3 className="text-[15pt] font-bold text-black mb-1.5 leading-tight">闻诊结果</h3>
            <p className="text-[13pt] text-black/70 leading-snug">声音洪亮清晰，语调平和。气息充沛，提示肺气充足，精神状态良好。</p>
          </motion.div>
        )}

        <div className="mt-auto w-full mb-8 space-y-3">
          {!recording && !completed ? (
            <>
              <MaiPalButton onClick={handleStartSampling} variant="primary">开始采样</MaiPalButton>
              <button onClick={handleSkip} className="w-full text-[14pt] text-black/60 hover:text-black py-3 transition-colors">跳过此步骤</button>
            </>
          ) : recording && !completed ? (
            <>
              <MaiPalButton disabled variant="primary" className="opacity-50">采集中...</MaiPalButton>
              <button onClick={handleSkip} className="w-full text-[14pt] text-black/60 hover:text-black py-3 transition-colors">跳过此步骤</button>
            </>
          ) : (
            <>
              <MaiPalButton onClick={handleNext} variant="primary">下一步：切诊</MaiPalButton>
              <button onClick={handleSkip} className="w-full text-[14pt] text-black/60 hover:text-black py-3 transition-colors">跳过剩余步骤</button>
            </>
          )}
        </div>
      </motion.div>
    </MaiPalPage>
  );
}