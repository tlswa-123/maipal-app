import { useState } from 'react';
import { useNavigate } from 'react-router';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ChevronRight, 
  User, 
  Bell, 
  Shield, 
  HelpCircle, 
  Palette, 
  LogOut,
  Moon,
  Sun,
  Mail,
  Phone,
  Lock,
  Download,
  Trash2,
  MessageSquare,
  FileText,
  Heart,
  Volume2
} from 'lucide-react';
import { MaiPalBottomNav } from '../components/MaiPalBottomNav';
import { MaiPalCard } from '../components/MaiPalUI';
import { useCheck } from '../context/CheckContext';

// 开关组件
function Switch({ checked, onChange }: { checked: boolean; onChange: (checked: boolean) => void }) {
  return (
    <button
      onClick={() => onChange(!checked)}
      className={`relative inline-flex h-[24px] w-[44px] items-center rounded-full transition-colors duration-300 ${
        checked ? 'bg-[#ecd1b4]' : 'bg-gray-300'
      }`}
    >
      <motion.span
        className="inline-block h-[18px] w-[18px] rounded-full bg-white shadow-sm"
        animate={{ x: checked ? 22 : 3 }}
        transition={{ type: 'spring', stiffness: 500, damping: 30 }}
      />
    </button>
  );
}

// 确认对话框组件
function ConfirmDialog({ 
  isOpen, 
  title, 
  message, 
  onConfirm, 
  onCancel,
  confirmText = '确认',
  cancelText = '取消',
  danger = false
}: {
  isOpen: boolean;
  title: string;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
  confirmText?: string;
  cancelText?: string;
  danger?: boolean;
}) {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-6"
        onClick={onCancel}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          onClick={(e) => e.stopPropagation()}
          className="bg-white rounded-[16pt] p-6 max-w-[280px] w-full"
        >
          <h3 className="text-[18pt] font-bold text-black mb-2 leading-tight">
            {title}
          </h3>
          <p className="text-[14pt] text-black/70 mb-6 leading-snug">
            {message}
          </p>
          <div className="flex gap-3">
            <button
              onClick={onCancel}
              className="flex-1 h-[44px] rounded-[12pt] bg-gray-100 hover:bg-gray-200 text-black text-[15pt] font-medium transition-colors"
            >
              {cancelText}
            </button>
            <button
              onClick={onConfirm}
              className={`flex-1 h-[44px] rounded-[12pt] text-[15pt] font-medium transition-colors ${
                danger 
                  ? 'bg-red-500 hover:bg-red-600 text-white' 
                  : 'bg-[#ecd1b4] hover:bg-[#d3b697] text-black'
              }`}
            >
              {confirmText}
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

export default function SettingsPage() {
  const navigate = useNavigate();
  const { hasDailyCheck, setHasDailyCheck } = useCheck();

  // 用户信息
  const [userInfo, setUserInfo] = useState({
    name: 'CC',
    gender: '女',
    birthDate: '1995-06-15',
    phone: '138****8888',
    email: 'cc@example.com'
  });

  // 健康偏好
  const [healthPreferences, setHealthPreferences] = useState({
    wang: true,
    wen: true,
    qie: true,
    wen_question: true
  });

  // 通知设置
  const [notifications, setNotifications] = useState({
    checkReminder: 'daily', // 'daily' | 'weekly' | 'off'
    companionMessage: true
  });

  // 情绪关注强度 (0-100)
  const [emotionFocus, setEmotionFocus] = useState(70);

  // 主题设置
  const [darkMode, setDarkMode] = useState(false);
  
  // 数字人偏好
  const [avatarStyle, setAvatarStyle] = useState('gentle'); // 'gentle' | 'standard' | 'lively'

  // 确认对话框状态
  const [confirmDialog, setConfirmDialog] = useState<{
    isOpen: boolean;
    title: string;
    message: string;
    action: string;
  }>({
    isOpen: false,
    title: '',
    message: '',
    action: ''
  });

  // 处理确认操作
  const handleConfirmAction = () => {
    const { action } = confirmDialog;
    
    switch (action) {
      case 'logout':
        console.log('用户登出');
        navigate('/login');
        break;
      case 'deleteAccount':
        console.log('注销账号');
        navigate('/login');
        break;
      case 'deleteHistory':
        console.log('删除历史记录');
        break;
      case 'exportData':
        console.log('导出数据');
        break;
      default:
        break;
    }
    
    setConfirmDialog({ ...confirmDialog, isOpen: false });
  };

  // 显示确认对话框
  const showConfirm = (title: string, message: string, action: string) => {
    setConfirmDialog({ isOpen: true, title, message, action });
  };

  return (
    <div className="bg-white relative h-screen overflow-hidden flex flex-col">
      {/* 背景渐变 */}
      <div className="absolute bg-gradient-to-b from-[rgba(236,209,180,0.3)] via-[rgba(236,209,180,0.15)] to-transparent h-[500px] left-0 top-0 w-full pointer-events-none z-0" />
      
      {/* 顶部标题栏 */}
      <div className="relative pt-8 px-7 z-10">
        <div className="flex items-center justify-between mb-4">
          <button 
            onClick={() => navigate('/home')} 
            className="text-[24pt] w-10 h-10 flex items-center justify-center hover:bg-black/5 rounded-full transition-colors"
          >
            ←
          </button>
          <h1 className="text-[24pt] font-bold text-black leading-tight">
            设置
          </h1>
          <div className="w-10" />
        </div>
      </div>

      {/* 主内容区域 - 可滚动 */}
      <div className="relative z-10 flex-1 px-7 pb-24 overflow-y-auto hide-scrollbar">
        <div className="space-y-4">
          
          {/* 调试工具 - 仅用于演示 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0 }}
          >
            <MaiPalCard className="p-4 bg-blue-50 border-2 border-blue-200">
              <div className="flex items-center justify-between mb-2">
                <h2 className="text-[14pt] font-bold text-blue-800 leading-tight">
                  ⚙️ 调试工具
                </h2>
                <span className="text-[11pt] text-blue-600">（演示用）</span>
              </div>
              <p className="text-[12pt] text-blue-700 mb-3 leading-snug">
                当前检测状态：{hasDailyCheck ? '✅ 已完成' : '❌ 未完成'}
              </p>
              <button
                onClick={() => setHasDailyCheck(!hasDailyCheck)}
                className="w-full py-2.5 rounded-[10pt] bg-blue-600 hover:bg-blue-700 text-white text-[14pt] font-medium transition-colors"
              >
                {hasDailyCheck ? '重置为未检测' : '设置为已检测'}
              </button>
              <p className="text-[11pt] text-blue-600 mt-2 text-center leading-snug">
                点击可切换检测状态，查看不同界面效果
              </p>
            </MaiPalCard>
          </motion.div>

          {/* A. 账户信息 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <MaiPalCard className="p-4">
              <div className="flex items-center gap-3 mb-3">
                <div className="size-10 rounded-full bg-[#ecd1b4]/30 flex items-center justify-center">
                  <User className="size-5 text-black" />
                </div>
                <h2 className="text-[16pt] font-bold text-black leading-tight flex-1">
                  账户信息
                </h2>
              </div>
              
              {/* 用户头像和基本信息 */}
              <div className="flex items-center gap-4 p-3 bg-[#ecd1b4]/10 rounded-[12pt] mb-3">
                <div className="size-16 rounded-full bg-[#ecd1b4] flex items-center justify-center text-[24pt]">
                  👤
                </div>
                <div className="flex-1">
                  <p className="text-[16pt] font-semibold text-black leading-tight">
                    {userInfo.name}
                  </p>
                  <p className="text-[13pt] text-black/60 leading-tight mt-0.5">
                    {userInfo.gender} · {userInfo.birthDate}
                  </p>
                </div>
                <button 
                  onClick={() => navigate('/profile-setup')}
                  className="text-[14pt] text-[#d3b697] hover:text-[#b39575] transition-colors"
                >
                  编辑
                </button>
              </div>
              
              {/* 联系方式 */}
              <div className="space-y-2">
                <div className="flex items-center justify-between py-2">
                  <div className="flex items-center gap-2">
                    <Phone className="size-4 text-black/60" />
                    <span className="text-[14pt] text-black/70">手机号</span>
                  </div>
                  <span className="text-[14pt] text-black">{userInfo.phone}</span>
                </div>
                <div className="flex items-center justify-between py-2">
                  <div className="flex items-center gap-2">
                    <Mail className="size-4 text-black/60" />
                    <span className="text-[14pt] text-black/70">邮箱</span>
                  </div>
                  <span className="text-[14pt] text-black">{userInfo.email}</span>
                </div>
              </div>
            </MaiPalCard>
          </motion.div>

          {/* B. 健康偏好 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <MaiPalCard className="p-4">
              <div className="flex items-center gap-3 mb-3">
                <div className="size-10 rounded-full bg-[#ecd1b4]/30 flex items-center justify-center">
                  <Heart className="size-5 text-black" />
                </div>
                <h2 className="text-[16pt] font-bold text-black leading-tight">
                  健康偏好
                </h2>
              </div>
              
              {/* 四诊偏好 */}
              <div className="space-y-3 mb-4">
                <p className="text-[14pt] font-medium text-black/80 leading-tight">
                  四诊偏好
                </p>
                <div className="space-y-2">
                  {[
                    { key: 'wang', label: '望诊', desc: '通过面色观察健康' },
                    { key: 'wen', label: '闻诊', desc: '通过声音判断状态' },
                    { key: 'qie', label: '切诊', desc: '通过脉搏了解体质' },
                    { key: 'wen_question', label: '问诊', desc: '通过问答全面了解' }
                  ].map(item => (
                    <div key={item.key} className="flex items-center justify-between py-2">
                      <div>
                        <p className="text-[14pt] font-medium text-black leading-tight">
                          {item.label}
                        </p>
                        <p className="text-[12pt] text-black/50 leading-tight">
                          {item.desc}
                        </p>
                      </div>
                      <Switch
                        checked={healthPreferences[item.key as keyof typeof healthPreferences]}
                        onChange={(checked) => 
                          setHealthPreferences({ ...healthPreferences, [item.key]: checked })
                        }
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* 通知设置 */}
              <div className="space-y-3 pt-3 border-t border-black/10">
                <div className="flex items-center gap-2">
                  <Bell className="size-4 text-black/60" />
                  <p className="text-[14pt] font-medium text-black/80 leading-tight">
                    通知设置
                  </p>
                </div>
                
                <div className="space-y-3">
                  {/* 检测提醒频率 */}
                  <div>
                    <p className="text-[13pt] font-medium text-black mb-2 leading-tight">
                      检测提醒
                    </p>
                    <div className="flex gap-2">
                      {[
                        { value: 'daily', label: '每日' },
                        { value: 'weekly', label: '每周' },
                        { value: 'off', label: '关闭' }
                      ].map(option => (
                        <button
                          key={option.value}
                          onClick={() => setNotifications({ ...notifications, checkReminder: option.value as any })}
                          className={`flex-1 py-2 rounded-[8pt] text-[13pt] font-medium transition-colors ${
                            notifications.checkReminder === option.value
                              ? 'bg-[#ecd1b4] text-black'
                              : 'bg-gray-100 text-black/60 hover:bg-gray-200'
                          }`}
                        >
                          {option.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* 陪伴消息提醒 */}
                  <div className="flex items-center justify-between">
                    <p className="text-[13pt] font-medium text-black leading-tight">
                      陪伴消息提醒
                    </p>
                    <Switch
                      checked={notifications.companionMessage}
                      onChange={(checked) => 
                        setNotifications({ ...notifications, companionMessage: checked })
                      }
                    />
                  </div>
                </div>
              </div>

              {/* 情绪关注强度 */}
              <div className="pt-3 border-t border-black/10 mt-3">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-[14pt] font-medium text-black/80 leading-tight">
                    情绪关注强度
                  </p>
                  <span className="text-[13pt] text-black/60">
                    {emotionFocus}%
                  </span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={emotionFocus}
                  onChange={(e) => setEmotionFocus(Number(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-[#ecd1b4] [&::-webkit-slider-thumb]:cursor-pointer"
                />
                <div className="flex justify-between mt-1">
                  <span className="text-[11pt] text-black/40">较少关注</span>
                  <span className="text-[11pt] text-black/40">更多关注</span>
                </div>
              </div>
            </MaiPalCard>
          </motion.div>

          {/* C. 隐私与安全 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <MaiPalCard className="p-4">
              <div className="flex items-center gap-3 mb-3">
                <div className="size-10 rounded-full bg-[#ecd1b4]/30 flex items-center justify-center">
                  <Shield className="size-5 text-black" />
                </div>
                <h2 className="text-[16pt] font-bold text-black leading-tight">
                  隐私与安全
                </h2>
              </div>
              
              <div className="space-y-2">
                <button 
                  onClick={() => console.log('修改密码')}
                  className="w-full flex items-center justify-between py-3 hover:bg-black/5 rounded-[8pt] px-2 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <Lock className="size-4 text-black/60" />
                    <span className="text-[14pt] text-black">修改密码</span>
                  </div>
                  <ChevronRight className="size-4 text-black/40" />
                </button>
                
                <button 
                  onClick={() => showConfirm(
                    '导出数据',
                    '将导出您的所有健康数据到本地文件，确认继续？',
                    'exportData'
                  )}
                  className="w-full flex items-center justify-between py-3 hover:bg-black/5 rounded-[8pt] px-2 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <Download className="size-4 text-black/60" />
                    <span className="text-[14pt] text-black">导出健康数据</span>
                  </div>
                  <ChevronRight className="size-4 text-black/40" />
                </button>
                
                <button 
                  onClick={() => showConfirm(
                    '删除历史记录',
                    '此操作将永久删除所有历史检测记录，无法恢复。确认删除？',
                    'deleteHistory'
                  )}
                  className="w-full flex items-center justify-between py-3 hover:bg-black/5 rounded-[8pt] px-2 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <Trash2 className="size-4 text-red-500" />
                    <span className="text-[14pt] text-red-500">删除历史记录</span>
                  </div>
                  <ChevronRight className="size-4 text-black/40" />
                </button>

                <div className="pt-2 border-t border-black/10 mt-2">
                  <button 
                    onClick={() => console.log('查看隐私声明')}
                    className="w-full flex items-center justify-between py-2 hover:bg-black/5 rounded-[8pt] px-2 transition-colors"
                  >
                    <span className="text-[13pt] text-black/60">隐私声明</span>
                    <ChevronRight className="size-4 text-black/40" />
                  </button>
                  <button 
                    onClick={() => console.log('查看用户协议')}
                    className="w-full flex items-center justify-between py-2 hover:bg-black/5 rounded-[8pt] px-2 transition-colors"
                  >
                    <span className="text-[13pt] text-black/60">用户协议</span>
                    <ChevronRight className="size-4 text-black/40" />
                  </button>
                </div>
              </div>
            </MaiPalCard>
          </motion.div>

          {/* E. 主题与界面 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <MaiPalCard className="p-4">
              <div className="flex items-center gap-3 mb-3">
                <div className="size-10 rounded-full bg-[#ecd1b4]/30 flex items-center justify-center">
                  <Palette className="size-5 text-black" />
                </div>
                <h2 className="text-[16pt] font-bold text-black leading-tight">
                  主题与界面
                </h2>
              </div>
              
              <div className="space-y-3">
                {/* 深色模式 */}
                <div className="flex items-center justify-between py-2">
                  <div className="flex items-center gap-3">
                    {darkMode ? <Moon className="size-4 text-black/60" /> : <Sun className="size-4 text-black/60" />}
                    <span className="text-[14pt] text-black">深色模式</span>
                  </div>
                  <Switch
                    checked={darkMode}
                    onChange={setDarkMode}
                  />
                </div>

                {/* 数字人风格 */}
                <div className="pt-2 border-t border-black/10">
                  <div className="flex items-center gap-2 mb-2">
                    <Volume2 className="size-4 text-black/60" />
                    <p className="text-[14pt] font-medium text-black/80 leading-tight">
                      数字人风格
                    </p>
                  </div>
                  <div className="flex gap-2">
                    {[
                      { value: 'gentle', label: '温柔', emoji: '🌸' },
                      { value: 'standard', label: '标准', emoji: '😊' },
                      { value: 'lively', label: '活泼', emoji: '✨' }
                    ].map(style => (
                      <button
                        key={style.value}
                        onClick={() => setAvatarStyle(style.value)}
                        className={`flex-1 py-3 rounded-[12pt] text-[13pt] font-medium transition-all ${
                          avatarStyle === style.value
                            ? 'bg-[#ecd1b4] text-black shadow-sm'
                            : 'bg-gray-50 text-black/60 hover:bg-gray-100'
                        }`}
                      >
                        <div className="text-[20pt] mb-1">{style.emoji}</div>
                        {style.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </MaiPalCard>
          </motion.div>

          {/* D. APP 使用与帮助 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <MaiPalCard className="p-4">
              <div className="flex items-center gap-3 mb-3">
                <div className="size-10 rounded-full bg-[#ecd1b4]/30 flex items-center justify-center">
                  <HelpCircle className="size-5 text-black" />
                </div>
                <h2 className="text-[16pt] font-bold text-black leading-tight">
                  使用与帮助
                </h2>
              </div>
              
              <div className="space-y-2">
                <button 
                  onClick={() => console.log('常见问题')}
                  className="w-full flex items-center justify-between py-3 hover:bg-black/5 rounded-[8pt] px-2 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <FileText className="size-4 text-black/60" />
                    <span className="text-[14pt] text-black">常见问题</span>
                  </div>
                  <ChevronRight className="size-4 text-black/40" />
                </button>
                
                <button 
                  onClick={() => console.log('使用教程')}
                  className="w-full flex items-center justify-between py-3 hover:bg-black/5 rounded-[8pt] px-2 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <FileText className="size-4 text-black/60" />
                    <span className="text-[14pt] text-black">使用教程</span>
                  </div>
                  <ChevronRight className="size-4 text-black/40" />
                </button>
                
                <button 
                  onClick={() => console.log('意见反馈')}
                  className="w-full flex items-center justify-between py-3 hover:bg-black/5 rounded-[8pt] px-2 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <MessageSquare className="size-4 text-black/60" />
                    <span className="text-[14pt] text-black">意见反馈</span>
                  </div>
                  <ChevronRight className="size-4 text-black/40" />
                </button>
              </div>
            </MaiPalCard>
          </motion.div>

          {/* F. 退出与注销 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <MaiPalCard className="p-4">
              <div className="space-y-2">
                <button 
                  onClick={() => showConfirm(
                    '退出登录',
                    '确认退出当前账号吗？',
                    'logout'
                  )}
                  className="w-full flex items-center justify-center gap-2 py-3 rounded-[12pt] bg-gray-100 hover:bg-gray-200 transition-colors"
                >
                  <LogOut className="size-4 text-black/60" />
                  <span className="text-[15pt] font-medium text-black">退出登录</span>
                </button>
                
                <button 
                  onClick={() => showConfirm(
                    '注销账号',
                    '注销后，您的所有数据将被永久删除且无法恢复。确认注销？',
                    'deleteAccount'
                  )}
                  className="w-full py-3 rounded-[12pt] text-[14pt] text-red-500 hover:bg-red-50 transition-colors"
                >
                  注销账号
                </button>
              </div>
            </MaiPalCard>
          </motion.div>

          {/* 版本信息 */}
          <div className="text-center py-4">
            <p className="text-[12pt] text-black/40">
              MaiPal v1.0.0
            </p>
          </div>

        </div>
      </div>

      {/* 底部导航 */}
      <MaiPalBottomNav currentPage="home" />

      {/* 确认对话框 */}
      <ConfirmDialog
        isOpen={confirmDialog.isOpen}
        title={confirmDialog.title}
        message={confirmDialog.message}
        onConfirm={handleConfirmAction}
        onCancel={() => setConfirmDialog({ ...confirmDialog, isOpen: false })}
        danger={confirmDialog.action === 'deleteAccount' || confirmDialog.action === 'deleteHistory'}
        confirmText={confirmDialog.action === 'deleteAccount' ? '确认注销' : '确认'}
      />
    </div>
  );
}