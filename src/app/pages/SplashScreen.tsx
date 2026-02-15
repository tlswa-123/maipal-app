import { useEffect } from 'react';
import { useNavigate } from 'react-router';
import { motion } from 'motion/react';

export default function SplashScreen() {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/login');
    }, 2500);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="bg-gradient-to-b from-[#ecd1b4] to-white relative size-full flex flex-col items-center justify-center overflow-hidden">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        className="flex flex-col items-center gap-6"
      >
        <div className="relative size-[160px]">
          <svg className="block size-full" viewBox="0 0 200 200">
            <circle cx="100" cy="100" r="95" fill="white" opacity="0.3" />
            <circle cx="100" cy="100" r="70" fill="white" opacity="0.5" />
          </svg>
        </div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="flex flex-col items-center gap-2"
        >
          {/* 品牌名称 - 优化字号 */}
          <h1 className="text-[42pt] font-bold text-black leading-none">
            脉脉
          </h1>
          {/* 副标题 - 优化字号 */}
          <p className="text-[16pt] font-medium text-black/60 leading-tight">
            MaiPal - 中医健康陪伴
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.6 }}
          className="mt-6"
        >
          <div className="flex gap-2">
            <div className="size-2 rounded-full bg-black/30 animate-pulse" style={{ animationDelay: '0s' }} />
            <div className="size-2 rounded-full bg-black/30 animate-pulse" style={{ animationDelay: '0.2s' }} />
            <div className="size-2 rounded-full bg-black/30 animate-pulse" style={{ animationDelay: '0.4s' }} />
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}