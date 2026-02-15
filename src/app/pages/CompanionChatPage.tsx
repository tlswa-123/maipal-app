import { useEffect } from 'react';
import { useNavigate } from 'react-router';

export default function CompanionChatPage() {
  const navigate = useNavigate();

  // 自动重定向到首页（对话功能已整合到首页）
  useEffect(() => {
    navigate('/home');
  }, [navigate]);

  return (
    <div className="bg-white size-full flex items-center justify-center">
      <p className="text-[14pt] text-black/60">正在跳转到对话主界面...</p>
    </div>
  );
}