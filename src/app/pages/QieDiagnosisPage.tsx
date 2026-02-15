import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { motion } from 'motion/react';
import { Hand } from 'lucide-react';
import { MaiPalButton } from '../components/MaiPalUI';

export default function QieDiagnosisPage() {
  const navigate = useNavigate();
  const [measuring, setMeasuring] = useState(false);
  const [progress, setProgress] = useState(0);
  const [completed, setCompleted] = useState(false);
  const [heartRate, setHeartRate] = useState(0);

  useEffect(() => {
    if (measuring) {
      const interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval);
            setCompleted(true);
            setHeartRate(72);
            return 100;
          }
          return prev + 1;
        });
      }, 100);
      return () => clearInterval(interval);
    }
  }, [measuring]);

  const handleStart = () => {
    setMeasuring(true);
  };

  const handleNext = () => {
    navigate('/check/wen-question');
  };

  const handleSkip = () => {
    navigate('/check/wen-question');
  };

  return (
    <div className="bg-white relative size-full flex flex-col">
      <div className="absolute h-[530px] left-[-27px] top-[39px] w-[405px]">
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

      <div className="absolute bg-gradient-to-b from-[#ecd1b4] h-[575px] left-[-21px] to-[rgba(236,209,180,0)] top-[-263px] w-[419px]" />

      <div className="relative pt-8 px-8">
        <button onClick={() => navigate('/check/wen')} className="text-[24px]">
          ←
        </button>
        <div className="flex items-center gap-2 mt-4">
          <div className="h-1 flex-1 bg-[#ecd1b4] rounded-full" />
          <div className="h-1 flex-1 bg-[#ecd1b4] rounded-full" />
          <div className="h-1 flex-1 bg-[#ecd1b4] rounded-full" />
          <div className="h-1 flex-1 bg-black/10 rounded-full" />
        </div>
        <p className="font-['Lexend_Deca:Medium','Noto_Sans_SC:Medium',sans-serif] font-medium text-[14px] text-black/60 mt-2">
          第 3 步，共 4 步
        </p>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="relative flex-1 flex flex-col items-center px-8 mt-8"
      >
        <h2 className="font-['Lexend_Deca:Medium','Noto_Sans_SC:Medium',sans-serif] font-medium text-[32px] text-black mb-2">
          切诊
        </h2>
        <p className="font-['Lexend_Deca:Medium','Noto_Sans_SC:Medium',sans-serif] text-[16px] text-black/60 text-center mb-8">
          请将手指轻放在手机的摄像头上，让脉脉感受您的脉搏
        </p>

        <div className="relative w-full max-w-[300px] aspect-square flex items-center justify-center mb-8">
          <div className={`size-[200px] rounded-full flex items-center justify-center ${measuring ? 'bg-[#ecd1b4]' : 'bg-[#ecd1b4]/30'}`}>
            {measuring && !completed ? (
              <motion.div
                animate={{ 
                  scale: [1, 1.1, 1],
                  opacity: [0.5, 1, 0.5]
                }}
                transition={{ repeat: Infinity, duration: 1 }}
                className="size-[180px] rounded-full bg-red-400/50 flex items-center justify-center"
              >
                <motion.div
                  className="size-[160px] rounded-full bg-red-400/70 flex items-center justify-center"
                >
                  <Hand className="size-16 text-white" />
                </motion.div>
              </motion.div>
            ) : completed ? (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="size-full rounded-full bg-[#ecd1b4] flex items-center justify-center"
              >
                <div className="text-center">
                  <svg className="size-20 text-white mx-auto mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                  <p className="font-['Lexend_Deca:Medium','Noto_Sans_SC:Medium',sans-serif] font-medium text-[24px] text-white">
                    {heartRate} BPM
                  </p>
                </div>
              </motion.div>
            ) : (
              <Hand className="size-16 text-white" />
            )}
          </div>
        </div>

        {measuring && !completed && (
          <div className="w-full max-w-[300px] mb-4">
            <div className="h-[60px] bg-black/5 rounded-[12px] mb-4 overflow-hidden flex items-center px-4">
              <svg className="w-full h-[40px]" viewBox="0 0 300 40">
                <motion.path
                  d="M0,20 Q10,20 15,10 T30,20 Q40,20 45,30 T60,20 L300,20"
                  fill="none"
                  stroke="#ecd1b4"
                  strokeWidth="2"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
                />
              </svg>
            </div>
            <div className="h-2 bg-black/10 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-[#ecd1b4]"
                style={{ width: `${progress}%` }}
              />
            </div>
            <p className="font-['Lexend_Deca:Medium','Noto_Sans_SC:Medium',sans-serif] text-[14px] text-black/60 text-center mt-2">
              正在测量脉搏... {progress}%
            </p>
          </div>
        )}

        {completed && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-[#ecd1b4]/30 rounded-[16px] p-6 mb-4 w-full max-w-[300px]"
          >
            <h3 className="font-['Lexend_Deca:Medium','Noto_Sans_SC:Medium',sans-serif] font-medium text-[18px] text-black mb-2">
              切诊结果
            </h3>
            <p className="font-['Lexend_Deca:Medium','Noto_Sans_SC:Medium',sans-serif] text-[14px] text-black/70">
              脉搏平稳有力，节律规整。心率 {heartRate} 次/分钟，处于正常范围。
            </p>
          </motion.div>
        )}

        <div className="mt-auto w-full mb-8 space-y-3">
          {!measuring ? (
            <>
              <MaiPalButton
                onClick={handleStart}
                variant="primary"
              >
                开始测量
              </MaiPalButton>
              <button
                onClick={handleSkip}
                className="w-full text-[14pt] text-black/60 hover:text-black py-3 transition-colors"
              >
                跳过此步骤
              </button>
            </>
          ) : completed ? (
            <>
              <MaiPalButton
                onClick={handleNext}
                variant="primary"
              >
                下一步：问诊
              </MaiPalButton>
              <button
                onClick={handleSkip}
                className="w-full text-[14pt] text-black/60 hover:text-black py-3 transition-colors"
              >
                跳过剩余步骤
              </button>
            </>
          ) : (
            <>
              <MaiPalButton
                disabled
                variant="primary"
                className="opacity-50"
              >
                测量中...
              </MaiPalButton>
              <button
                onClick={handleSkip}
                className="w-full text-[14pt] text-black/60 hover:text-black py-3 transition-colors"
              >
                跳过此步骤
              </button>
            </>
          )}
        </div>
      </motion.div>
    </div>
  );
}