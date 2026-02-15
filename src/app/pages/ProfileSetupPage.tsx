import { useState } from 'react';
import { useNavigate } from 'react-router';
import { motion } from 'motion/react';
import { 
  MaiPalPage, 
  MaiPalButton, 
  MaiPalInput, 
  MaiPalProgress, 
  MaiPalProgressText 
} from '../components/MaiPalUI';

export default function ProfileSetupPage() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [profile, setProfile] = useState({
    name: '',
    gender: '',
    age: '',
    height: '',
    weight: '',
  });

  const handleNext = () => {
    if (step < 3) {
      setStep(step + 1);
    } else {
      localStorage.setItem('userProfile', JSON.stringify(profile));
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
          完善个人信息
        </h1>
        {/* 优化副标题字号 */}
        <p className="text-[14pt] font-normal text-black/60 leading-snug">
          让脉脉更好地了解您
        </p>
        
        {/* 标准进度条 */}
        <div className="mt-5">
          <MaiPalProgress steps={3} currentStep={step} />
          <MaiPalProgressText currentStep={step} totalSteps={3} className="mt-2" />
        </div>
      </motion.div>

      <motion.div
        key={step}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        className="relative flex-1 px-6 mt-10 flex flex-col gap-5 z-10"
      >
        {step === 1 && (
          <>
            <MaiPalInput
              label="姓名/昵称"
              type="text"
              placeholder="请输入您的姓名"
              value={profile.name}
              onChange={(e) => setProfile({ ...profile, name: e.target.value })}
            />

            <div className="space-y-2">
              <label className="block text-[14pt] font-medium text-black">
                性别
              </label>
              <div className="flex gap-3">
                <button
                  onClick={() => setProfile({ ...profile, gender: '男' })}
                  className={`flex-1 h-[48pt] rounded-[12pt] border-2 text-[15pt] font-medium transition-all ${
                    profile.gender === '男'
                      ? 'bg-[#ecd1b4] border-[#ecd1b4] text-black'
                      : 'bg-white border-gray-200 text-black hover:border-[#ecd1b4]'
                  }`}
                >
                  男
                </button>
                <button
                  onClick={() => setProfile({ ...profile, gender: '女' })}
                  className={`flex-1 h-[48pt] rounded-[12pt] border-2 text-[15pt] font-medium transition-all ${
                    profile.gender === '女'
                      ? 'bg-[#ecd1b4] border-[#ecd1b4] text-black'
                      : 'bg-white border-gray-200 text-black hover:border-[#ecd1b4]'
                  }`}
                >
                  女
                </button>
              </div>
            </div>
          </>
        )}

        {step === 2 && (
          <>
            <MaiPalInput
              label="年龄"
              type="number"
              placeholder="请输入您的年龄"
              value={profile.age}
              onChange={(e) => setProfile({ ...profile, age: e.target.value })}
            />

            <MaiPalInput
              label="身高（cm）"
              type="number"
              placeholder="请输入您的身高"
              value={profile.height}
              onChange={(e) => setProfile({ ...profile, height: e.target.value })}
            />
          </>
        )}

        {step === 3 && (
          <>
            <MaiPalInput
              label="体重（kg）"
              type="number"
              placeholder="请输入您的体重"
              value={profile.weight}
              onChange={(e) => setProfile({ ...profile, weight: e.target.value })}
            />

            <div className="space-y-2.5">
              <label className="block text-[14pt] font-medium text-black">
                健康关注
              </label>
              <div className="flex flex-wrap gap-2">
                {['睡眠质量', '饮食调理', '情绪管理', '运动健康'].map((item) => (
                  <button
                    key={item}
                    className="px-4 py-2 rounded-[10pt] border-2 border-[#ecd1b4] text-[13pt] font-medium text-black hover:bg-[#ecd1b4] transition-colors"
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>
          </>
        )}

        <div className="mt-auto mb-8">
          <MaiPalButton variant="primary" onClick={handleNext}>
            {step === 3 ? '完成' : '下一步'}
          </MaiPalButton>
        </div>
      </motion.div>
    </MaiPalPage>
  );
}