import { useState } from 'react';
import { useNavigate } from 'react-router';
import { motion } from 'motion/react';
import { MaiPalPage, MaiPalButton, MaiPalInput } from '../components/MaiPalUI';

export default function RegisterPage() {
  const navigate = useNavigate();
  const [phone, setPhone] = useState('');
  const [code, setCode] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = () => {
    navigate('/profile-setup');
  };

  return (
    <MaiPalPage>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative pt-16 px-6 z-10"
      >
        <button
          onClick={() => navigate('/login')}
          className="absolute left-6 top-12 text-[20pt] z-50 w-9 h-9 flex items-center justify-center hover:bg-black/5 rounded-full transition-colors"
        >
          ←
        </button>
        <h1 className="text-[22pt] font-bold text-black mb-2 leading-tight">
          注册新账号
        </h1>
        <p className="text-[14pt] font-normal text-black/60 leading-snug">
          加入脉脉，开始健康管理
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="relative flex-1 px-6 mt-10 flex flex-col z-10"
      >
        <div className="space-y-5">
          <MaiPalInput
            label="手机号"
            type="tel"
            placeholder="请输入手机号"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />

          <div className="space-y-2">
            <label className="block text-[14pt] font-medium text-black">
              验证码
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="请输入验证码"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                className="maipal-input flex-1 min-w-0 border border-gray-200 bg-white text-black placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#ecd1b4]"
              />
              <button className="bg-[#ecd1b4] hover:bg-[#d3b697] text-black font-medium rounded-[12pt] px-4 h-[48pt] text-[14pt] transition-colors whitespace-nowrap shrink-0">
                获取验证码
              </button>
            </div>
          </div>

          <MaiPalInput
            label="设置密码"
            type="password"
            placeholder="请设置密码"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <div className="mt-auto pb-8 space-y-3">
          <MaiPalButton
            variant="primary"
            onClick={handleRegister}
          >
            注册
          </MaiPalButton>

          <div className="flex items-center justify-center gap-2">
            <p className="text-[13pt] font-normal text-black/60">
              已有账号？
            </p>
            <button
              onClick={() => navigate('/login')}
              className="text-[13pt] font-medium text-[#ecd1b4] underline hover:text-[#d3b697] transition-colors"
            >
              立即登录
            </button>
          </div>
        </div>
      </motion.div>
    </MaiPalPage>
  );
}