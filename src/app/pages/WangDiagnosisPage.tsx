import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router';
import { motion } from 'motion/react';
import { Camera } from 'lucide-react';
import { MaiPalPage, MaiPalButton, MaiPalProgress, MaiPalProgressText } from '../components/MaiPalUI';

export default function WangDiagnosisPage() {
  const navigate = useNavigate();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [cameraActive, setCameraActive] = useState(false);
  const [cameraError, setCameraError] = useState(false);
  const [permissionDenied, setPermissionDenied] = useState(false);
  
  // 检测步骤状态
  const [step, setStep] = useState<'ready' | 'face-scanning' | 'face-done' | 'tongue-ready' | 'tongue-scanning' | 'completed'>('ready');
  const [faceProgress, setFaceProgress] = useState(0);
  const [tongueProgress, setTongueProgress] = useState(0);
  
  const progressIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // 启动摄像头
  const startCamera = async (): Promise<boolean> => {
    try {
      setPermissionDenied(false);
      setCameraError(false);
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { facingMode: 'user' },
        audio: false 
      });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        // 显式播放视频
        try {
          await videoRef.current.play();
        } catch (playError) {
          console.error('视频播放错误:', playError);
        }
        setCameraActive(true);
        return true;
      }
      return false;
    } catch (error: any) {
      setCameraActive(false);
      setCameraError(true);
      if (error.name === 'NotAllowedError' || error.name === 'PermissionDeniedError') {
        setPermissionDenied(true);
      } else {
        console.error('摄像头硬件错误:', error);
      }
      return false;
    }
  };

  // 停止摄像头
  const stopCamera = () => {
    if (videoRef.current?.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream;
      stream.getTracks().forEach(track => track.stop());
      videoRef.current.srcObject = null;
      setCameraActive(false);
    }
  };

  // 清理进度定时器
  const clearProgressInterval = () => {
    if (progressIntervalRef.current) {
      clearInterval(progressIntervalRef.current);
      progressIntervalRef.current = null;
    }
  };

  // 开始面部检测
  const startFaceDetection = () => {
    setStep('face-scanning');
    setFaceProgress(0);
    
    progressIntervalRef.current = setInterval(() => {
      setFaceProgress((prev) => {
        if (prev >= 100) {
          clearProgressInterval();
          setStep('face-done');
          return 100;
        }
        return prev + 1;
      });
    }, 100);
  };

  // 继续舌苔检测
  const continueTongueDetection = () => {
    setStep('tongue-ready');
    setTimeout(() => {
      setStep('tongue-scanning');
      setTongueProgress(0);
      
      progressIntervalRef.current = setInterval(() => {
        setTongueProgress((prev) => {
          if (prev >= 100) {
            clearProgressInterval();
            setStep('completed');
            return 100;
          }
          return prev + 1;
        });
      }, 100);
    }, 1500);
  };

  // 开始检测
  const handleStart = async () => {
    if (!cameraActive) {
      const success = await startCamera();
      if (success) {
        setTimeout(() => {
          startFaceDetection();
        }, 300);
      }
    } else {
      startFaceDetection();
    }
  };

  // 跳过步骤
  const handleSkip = () => {
    clearProgressInterval();
    stopCamera();
    navigate('/check/wen');
  };

  // 下一步
  const handleNext = () => {
    stopCamera();
    navigate('/check/wen');
  };

  useEffect(() => {
    return () => {
      clearProgressInterval();
      stopCamera();
    };
  }, []);

  return (
    <MaiPalPage>
      <div className="relative pt-8 px-6 z-10">
        <button 
          onClick={() => { stopCamera(); navigate('/home'); }} 
          className="text-[20pt] w-9 h-9 flex items-center justify-center hover:bg-black/5 rounded-full transition-colors"
        >
          ←
        </button>
        
        <div className="mt-4">
          <MaiPalProgress steps={4} currentStep={1} />
          <MaiPalProgressText currentStep={1} totalSteps={4} className="mt-2" />
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="relative flex-1 flex flex-col items-center px-6 mt-6 z-10"
      >
        <h2 className="text-[20pt] font-bold text-black mb-1.5 leading-tight">
          {step === 'tongue-ready' || step === 'tongue-scanning' ? '望诊 - 舌苔检测' : '望诊 - 面部检测'}
        </h2>
        <p className="text-[13pt] text-black/60 text-center mb-6 leading-snug">
          {step === 'tongue-ready' || step === 'tongue-scanning' 
            ? '请伸出舌头，让脉脉为您检测舌苔' 
            : '请保持面部正对屏幕，让脉脉为您检测面色'}
        </p>

        <div className="relative w-full max-w-[280px] aspect-square rounded-[20px] overflow-hidden bg-black mb-6">
          <video
            ref={videoRef}
            autoPlay
            playsInline
            muted
            className="absolute inset-0 w-full h-full object-cover mirror"
            style={{ transform: 'scaleX(-1)' }}
          />
          
          {cameraActive && (step === 'ready' || step === 'face-scanning') && (
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <motion.div
                animate={{ 
                  scale: step === 'face-scanning' ? [1, 1.05, 1] : 1,
                  opacity: step === 'face-scanning' ? [0.8, 1, 0.8] : 0.8
                }}
                transition={{ repeat: step === 'face-scanning' ? Infinity : 0, duration: 2 }}
                className="w-[180px] h-[220px] border-4 border-[#ecd1b4] rounded-[20px]"
              />
            </div>
          )}

          {cameraActive && (step === 'tongue-ready' || step === 'tongue-scanning') && (
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <motion.div
                animate={{ 
                  scale: step === 'tongue-scanning' ? [1, 1.05, 1] : 1,
                  opacity: step === 'tongue-scanning' ? [0.8, 1, 0.8] : 0.8
                }}
                transition={{ repeat: step === 'tongue-scanning' ? Infinity : 0, duration: 2 }}
                className="w-[200px] h-[150px] border-4 border-[#ecd1b4] rounded-[20px]"
              />
            </div>
          )}

          {cameraError && (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/80 text-white p-4">
              <Camera className="size-14 mb-3 opacity-50" />
              <p className="text-center mb-2 text-[14pt] font-medium">
                {permissionDenied ? '需要摄像头权限' : '无法访问摄像头'}
              </p>
              {permissionDenied && (
                <p className="text-center text-[12pt] text-white/70 mb-4 max-w-[240px]">
                  请在浏览器设置中允许访问摄像头
                </p>
              )}
              <button
                onClick={startCamera}
                className="bg-[#ecd1b4] text-black px-6 py-2 rounded-[12px] text-[14pt] font-medium"
              >
                重新尝试
              </button>
            </div>
          )}

          {step === 'face-done' && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="absolute inset-0 flex items-center justify-center bg-[#ecd1b4]/90"
            >
              <svg className="size-16 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
              </svg>
            </motion.div>
          )}

          {step === 'completed' && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="absolute inset-0 flex items-center justify-center bg-[#ecd1b4]/90"
            >
              <svg className="size-16 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
              </svg>
            </motion.div>
          )}
        </div>

        {step === 'face-scanning' && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full max-w-[280px] mb-4"
          >
            <div className="h-2 bg-black/10 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-[#ecd1b4]"
                style={{ width: `${faceProgress}%` }}
              />
            </div>
            <p className="text-[13pt] text-black/60 text-center mt-2 leading-tight">
              正在分析面色... {Math.round(faceProgress)}%
            </p>
          </motion.div>
        )}

        {step === 'tongue-scanning' && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full max-w-[280px] mb-4"
          >
            <div className="h-2 bg-black/10 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-[#ecd1b4]"
                style={{ width: `${tongueProgress}%` }}
              />
            </div>
            <p className="text-[13pt] text-black/60 text-center mt-2 leading-tight">
              正在分析舌苔... {Math.round(tongueProgress)}%
            </p>
          </motion.div>
        )}

        <div className="mt-auto w-full mb-8 space-y-3">
          {!cameraActive ? (
            <>
              <MaiPalButton onClick={handleStart} disabled={cameraError} variant="primary">
                开始检测
              </MaiPalButton>
              <button onClick={handleSkip} className="w-full text-[14pt] text-black/60 hover:text-black py-3 transition-colors">
                跳过此步骤
              </button>
            </>
          ) : step === 'face-done' ? (
            <>
              <MaiPalButton onClick={continueTongueDetection} variant="primary">
                继续检测：舌苔
              </MaiPalButton>
              <button onClick={handleSkip} className="w-full text-[14pt] text-black/60 hover:text-black py-3 transition-colors">
                跳过剩余步骤
              </button>
            </>
          ) : step === 'completed' ? (
            <>
              <MaiPalButton onClick={handleNext} variant="primary">
                下一步：闻诊
              </MaiPalButton>
            </>
          ) : (
            <>
              <MaiPalButton disabled variant="primary" className="opacity-50">
                检测中...
              </MaiPalButton>
              <button onClick={handleSkip} className="w-full text-[14pt] text-black/60 hover:text-black py-3 transition-colors">
                跳过此步骤
              </button>
            </>
          )}
        </div>
      </motion.div>
    </MaiPalPage>
  );
}