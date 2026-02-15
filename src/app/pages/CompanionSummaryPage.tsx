import { useNavigate } from 'react-router';
import { Button } from '../components/ui/button';
import { motion } from 'motion/react';
import imgE8F194311Dbe8Ea9369F9B655985F50A2 from "figma:asset/d834302f12a4aa666948d09ac39a5777f92044aa.png";
import { Heart, MessageCircle, Lightbulb } from 'lucide-react';

export default function CompanionSummaryPage() {
  const navigate = useNavigate();

  return (
    <div className="bg-gradient-to-b from-[#ecd1b4]/30 to-white relative h-screen overflow-hidden flex flex-col">
      <div className="relative pt-8 px-8">
        <button onClick={() => navigate('/companion')} className="text-[24px]">
          ←
        </button>
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="relative px-8 mt-4 flex-1 flex flex-col"
      >
        <div className="bg-white rounded-[24px] shadow-lg p-6 mb-6">
          <div className="flex items-center gap-4 mb-6">
            <div className="size-16 rounded-full overflow-hidden">
              <img alt="" className="size-full object-cover" src={imgE8F194311Dbe8Ea9369F9B655985F50A2} />
            </div>
            <div className="flex-1">
              <h1 className="font-['Lexend_Deca:Medium','Noto_Sans_SC:Medium',sans-serif] font-medium text-[24px] text-black">
                对话总结
              </h1>
              <p className="font-['Lexend_Deca:Medium','Noto_Sans_SC:Medium',sans-serif] text-[14px] text-black/60">
                {new Date().toLocaleString('zh-CN')}
              </p>
            </div>
          </div>

          {/* 对话时长和消息数 */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="bg-[#ecd1b4]/20 rounded-[16px] p-4 text-center">
              <MessageCircle className="size-8 text-[#ecd1b4] mx-auto mb-2" />
              <p className="font-['Lexend_Deca:Medium','Noto_Sans_SC:Medium',sans-serif] font-medium text-[24px] text-black">
                12
              </p>
              <p className="font-['Lexend_Deca:Medium','Noto_Sans_SC:Medium',sans-serif] text-[14px] text-black/60">
                消息数
              </p>
            </div>
            <div className="bg-[#ecd1b4]/20 rounded-[16px] p-4 text-center">
              <Heart className="size-8 text-[#ecd1b4] mx-auto mb-2" />
              <p className="font-['Lexend_Deca:Medium','Noto_Sans_SC:Medium',sans-serif] font-medium text-[24px] text-black">
                5分钟
              </p>
              <p className="font-['Lexend_Deca:Medium','Noto_Sans_SC:Medium',sans-serif] text-[14px] text-black/60">
                陪伴时长
              </p>
            </div>
          </div>

          {/* 主要话题 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-6"
          >
            <h3 className="font-['Lexend_Deca:Medium','Noto_Sans_SC:Medium',sans-serif] font-medium text-[18px] text-black mb-3">
              主要话题
            </h3>
            <div className="space-y-3">
              <div className="bg-[#ecd1b4]/10 rounded-[12px] p-4">
                <p className="font-['Lexend_Deca:Medium','Noto_Sans_SC:Medium',sans-serif] text-[15px] text-black">
                  💤 您提到了睡眠质量的问题
                </p>
              </div>
              <div className="bg-[#ecd1b4]/10 rounded-[12px] p-4">
                <p className="font-['Lexend_Deca:Medium','Noto_Sans_SC:Medium',sans-serif] text-[15px] text-black">
                  😌 脉脉为您提供了改善睡眠的建议
                </p>
              </div>
              <div className="bg-[#ecd1b4]/10 rounded-[12px] p-4">
                <p className="font-['Lexend_Deca:Medium','Noto_Sans_SC:Medium',sans-serif] text-[15px] text-black">
                  🛍️ 推荐了适合的健康产品
                </p>
              </div>
            </div>
          </motion.div>

          {/* 关键建议 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-gradient-to-br from-[#ecd1b4] to-[#d3b697] rounded-[16px] p-5 mb-6"
          >
            <div className="flex items-center gap-2 mb-3">
              <Lightbulb className="size-6 text-white" />
              <h3 className="font-['Lexend_Deca:Medium','Noto_Sans_SC:Medium',sans-serif] font-medium text-[18px] text-white">
                脉脉的建议
              </h3>
            </div>
            <ul className="space-y-2 font-['Lexend_Deca:Medium','Noto_Sans_SC:Medium',sans-serif] text-[15px] text-white/90">
              <li>• 睡前1小时避免电子设备</li>
              <li>• 保持规律的作息时间</li>
              <li>• 尝试睡前冥想或深呼吸</li>
              <li>• 适当补充助眠营养品</li>
            </ul>
          </motion.div>

          {/* 情绪记录 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="bg-[#ecd1b4]/10 rounded-[16px] p-4 mb-4"
          >
            <h3 className="font-['Lexend_Deca:Medium','Noto_Sans_SC:Medium',sans-serif] font-medium text-[16px] text-black mb-2">
              情绪状态
            </h3>
            <p className="font-['Lexend_Deca:Medium','Noto_Sans_SC:Medium',sans-serif] text-[14px] text-black/70">
              在这次对话中，脉脉感受到您对睡眠问题的关注。我会一直陪伴在您身边，帮助您改善健康状况。
            </p>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mb-8"
        >
          <Button
            onClick={() => navigate('/companion/goodbye')}
            className="w-full bg-[#ecd1b4] hover:bg-[#d3b697] text-black font-medium text-[18px] rounded-[12px] py-6"
          >
            完成
          </Button>
        </motion.div>
      </motion.div>
    </div>
  );
}