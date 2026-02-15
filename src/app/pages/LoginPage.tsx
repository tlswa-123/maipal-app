import { useState } from 'react';
import { useNavigate } from 'react-router';
import { motion } from 'motion/react';
import { MaiPalPage, MaiPalButton, MaiPalInput } from '../components/MaiPalUI';

export default function LoginPage() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    // 模拟登录逻辑
    const isFirstTime = !localStorage.getItem('userProfile');
    
    if (isFirstTime) {
      navigate('/profile-setup');
    } else {
      navigate('/home');
    }
  };

  return (
    <MaiPalPage>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative pt-16 px-6 z-10"
      >
        {/* 优化标题字号 */}
        <h1 className="text-[22pt] font-bold text-black mb-2 leading-tight">
          欢迎回来
        </h1>
        {/* 优化副标题字号 */}
        <p className="text-[14pt] font-normal text-black/60 leading-snug">
          登录脉脉，开启健康之旅
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="relative flex-1 px-6 mt-12 flex flex-col gap-5 z-10"
      >
        {/* 使用标准化输入框组件 */}
        <MaiPalInput
          label="账号/手机号"
          type="text"
          placeholder="请输入账号或手机号"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <MaiPalInput
          label="密码"
          type="password"
          placeholder="请输入密码"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {/* 使用标准化按钮组件 - 48pt高度 */}
        <MaiPalButton
          variant="primary"
          onClick={handleLogin}
          className="mt-3"
        >
          登录
        </MaiPalButton>

        <div className="flex items-center justify-center gap-2 mt-3">
          {/* 使用13pt小字 */}
          <p className="text-[13pt] font-normal text-black/60">
            还没有账号？
          </p>
          <button
            onClick={() => navigate('/register')}
            className="text-[13pt] font-medium text-[#ecd1b4] underline hover:text-[#d3b697] transition-colors"
          >
            立即注册
          </button>
        </div>
      </motion.div>
    </MaiPalPage>
  );
}