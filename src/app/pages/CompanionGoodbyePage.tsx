import { useNavigate } from 'react-router';
import { Button } from '../components/ui/button';
import { motion } from 'motion/react';
import imgE8F194311Dbe8Ea9369F9B655985F50A2 from "figma:asset/d834302f12a4aa666948d09ac39a5777f92044aa.png";
import { Heart } from 'lucide-react';

export default function CompanionGoodbyePage() {
  const navigate = useNavigate();

  return (
    <div className="bg-gradient-to-b from-[#ecd1b4] to-white relative size-full flex flex-col items-center justify-center px-8">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col items-center"
      >
        <motion.div
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="size-[200px] mb-8 rounded-full overflow-hidden"
        >
          <img alt="" className="size-full object-cover" src={imgE8F194311Dbe8Ea9369F9B655985F50A2} />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-center mb-8"
        >
          <div className="flex items-center justify-center gap-2 mb-4">
            <h2 className="font-['Lexend_Deca:Medium','Noto_Sans_SC:Medium',sans-serif] font-medium text-[32px] text-black">
              感谢您的信任
            </h2>
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
            >
              <Heart className="size-8 text-red-500 fill-red-500" />
            </motion.div>
          </div>
          <p className="font-['Lexend_Deca:Medium','Noto_Sans_SC:Medium',sans-serif] text-[18px] text-black/70 mb-2">
            脉脉会一直陪伴在您身边
          </p>
          <p className="font-['Lexend_Deca:Medium','Noto_Sans_SC:Medium',sans-serif] text-[16px] text-black/60">
            随时来找我聊天，我都在这里 💚
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-[#ecd1b4]/30 rounded-[16px] p-6 mb-8 w-full max-w-[320px]"
        >
          <h3 className="font-['Lexend_Deca:Medium','Noto_Sans_SC:Medium',sans-serif] font-medium text-[16px] text-black mb-3 text-center">
            脉脉的话
          </h3>
          <p className="font-['Lexend_Deca:Medium','Noto_Sans_SC:Medium',sans-serif] text-[15px] text-black/70 text-center leading-relaxed">
            "能够倾听您的心声是我的荣幸。记住，健康不仅是身体的状态，更是心灵的平和。有任何困扰都可以来找我。"
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="bg-white rounded-[16px] p-5 mb-8 w-full max-w-[320px] shadow-md"
        >
          <h4 className="font-['Lexend_Deca:Medium','Noto_Sans_SC:Medium',sans-serif] font-medium text-[15px] text-black mb-3 text-center">
            下次见面时
          </h4>
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <div className="size-2 rounded-full bg-[#ecd1b4]" />
              <p className="font-['Lexend_Deca:Medium','Noto_Sans_SC:Medium',sans-serif] text-[14px] text-black/70">
                分享您的改善进展
              </p>
            </div>
            <div className="flex items-center gap-2">
              <div className="size-2 rounded-full bg-[#ecd1b4]" />
              <p className="font-['Lexend_Deca:Medium','Noto_Sans_SC:Medium',sans-serif] text-[14px] text-black/70">
                讨论新的健康目标
              </p>
            </div>
            <div className="flex items-center gap-2">
              <div className="size-2 rounded-full bg-[#ecd1b4]" />
              <p className="font-['Lexend_Deca:Medium','Noto_Sans_SC:Medium',sans-serif] text-[14px] text-black/70">
                继续我们的温暖对话
              </p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9 }}
          className="w-full max-w-[320px]"
        >
          <Button
            onClick={() => navigate('/home')}
            className="w-full bg-[#ecd1b4] hover:bg-[#d3b697] text-black font-medium text-[18px] rounded-[12px] py-6 mb-4"
          >
            返回首页
          </Button>
          <button
            onClick={() => navigate('/companion')}
            className="w-full font-['Lexend_Deca:Medium','Noto_Sans_SC:Medium',sans-serif] text-[16px] text-[#ecd1b4] hover:text-[#d3b697] underline"
          >
            继续对话
          </button>
        </motion.div>
      </motion.div>
    </div>
  );
}
