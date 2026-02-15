/**
 * MaiPal APP 统一 UI 组件库
 * 严格遵循设计规范：8pt栅格系统、统一字体、标准间距
 */

import { ButtonHTMLAttributes, InputHTMLAttributes, ReactNode } from 'react';
import { motion } from 'motion/react';

/* ========== 按钮组件 ========== */

interface MaiPalButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'text';
  children: ReactNode;
}

export function MaiPalButton({ 
  variant = 'primary', 
  children, 
  className = '',
  ...props 
}: MaiPalButtonProps) {
  const baseClass = 'maipal-button w-full transition-all duration-300';
  
  const variantClasses = {
    primary: 'bg-[#ecd1b4] hover:bg-[#d3b697] text-black',
    secondary: 'bg-white hover:bg-gray-50 text-black border border-gray-200',
    outline: 'bg-transparent hover:bg-[#ecd1b4]/10 text-black border-2 border-[#ecd1b4]',
    text: 'bg-transparent hover:bg-gray-50 text-black'
  };
  
  return (
    <button 
      className={`${baseClass} ${variantClasses[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}

/* 跳过按钮 */
export function MaiPalSkipButton({ 
  children = '跳过', 
  className = '',
  ...props 
}: ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button 
      className={`maipal-button-skip bg-transparent hover:bg-black/5 text-black/60 hover:text-black transition-all duration-300 ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}

/* ========== 输入框组件 ========== */

interface MaiPalInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

export function MaiPalInput({ label, className = '', ...props }: MaiPalInputProps) {
  return (
    <div className="w-full space-y-2">
      {label && (
        <label className="block text-[16pt] font-medium text-black">
          {label}
        </label>
      )}
      <input
        className={`maipal-input w-full border border-gray-200 bg-white text-black placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#ecd1b4] ${className}`}
        {...props}
      />
    </div>
  );
}

/* ========== 卡片组件 ========== */

interface MaiPalCardProps {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  hoverable?: boolean;
}

export function MaiPalCard({ 
  children, 
  className = '', 
  onClick,
  hoverable = false 
}: MaiPalCardProps) {
  const hoverClass = hoverable ? 'hover:shadow-lg cursor-pointer' : '';
  
  return (
    <div 
      className={`maipal-card ${hoverClass} transition-shadow duration-300 ${className}`}
      onClick={onClick}
    >
      {children}
    </div>
  );
}

/* ========== 进度条组件 ========== */

interface MaiPalProgressProps {
  steps: number;
  currentStep: number;
  className?: string;
}

export function MaiPalProgress({ steps, currentStep, className = '' }: MaiPalProgressProps) {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      {Array.from({ length: steps }).map((_, index) => (
        <div
          key={index}
          className={`h-1 flex-1 rounded-full transition-colors duration-300 ${
            index < currentStep ? 'bg-[#ecd1b4]' : 'bg-black/10'
          }`}
        />
      ))}
    </div>
  );
}

/* ========== 进度文本组件 ========== */

interface MaiPalProgressTextProps {
  currentStep: number;
  totalSteps: number;
  className?: string;
}

export function MaiPalProgressText({ 
  currentStep, 
  totalSteps, 
  className = '' 
}: MaiPalProgressTextProps) {
  return (
    <p className={`text-[14pt] text-black/60 ${className}`}>
      第 {currentStep} 步，共 {totalSteps} 步
    </p>
  );
}

/* ========== 页面容器组件 ========== */

interface MaiPalPageProps {
  children: ReactNode;
  className?: string;
}

export function MaiPalPage({ children, className = '' }: MaiPalPageProps) {
  return (
    <div className={`bg-white relative h-screen overflow-y-auto hide-scrollbar flex flex-col ${className}`}>
      {/* 背景渐变 */}
      <div className="absolute h-[530px] left-[-27px] top-[39px] w-[405px] pointer-events-none">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 405 530">
          <ellipse cx="202.5" cy="265" fill="url(#paint0_radial_maipal)" rx="202.5" ry="265" />
          <defs>
            <radialGradient 
              cx="0" 
              cy="0" 
              gradientTransform="translate(202.5 265) rotate(90) scale(265 202.5)" 
              gradientUnits="userSpaceOnUse" 
              id="paint0_radial_maipal" 
              r="1"
            >
              <stop stopColor="#ECD1B4" />
              <stop offset="1" stopColor="#ECD1B4" stopOpacity="0" />
            </radialGradient>
          </defs>
        </svg>
      </div>
      <div className="absolute bg-gradient-to-b from-[#ecd1b4] h-[575px] left-[-21px] to-[rgba(236,209,180,0)] top-[-263px] w-[419px] pointer-events-none" />
      
      {children}
    </div>
  );
}

/* ========== 页面头部组件 ========== */

interface MaiPalHeaderProps {
  onBack: () => void;
  title?: string;
  showMenu?: boolean;
  onMenuClick?: () => void;
  children?: ReactNode;
}

export function MaiPalHeader({ 
  onBack, 
  title, 
  showMenu = false,
  onMenuClick,
  children 
}: MaiPalHeaderProps) {
  return (
    <div className="relative pt-8 px-7 z-10">
      <div className="flex items-center justify-between mb-4">
        <button 
          onClick={onBack} 
          className="text-[24pt] w-10 h-10 flex items-center justify-center hover:bg-black/5 rounded-full transition-colors"
        >
          ←
        </button>
        {title && (
          <h1 className="text-[24pt] font-bold text-black">
            {title}
          </h1>
        )}
        {showMenu && (
          <button 
            onClick={onMenuClick}
            className="bg-[rgba(236,209,180,0.8)] h-[42px] rounded-[12px] w-[48px] flex items-center justify-center hover:bg-[rgba(236,209,180,1)] transition-colors"
          >
            <MenuIcon />
          </button>
        )}
        {!showMenu && !title && <div className="w-10" />}
      </div>
      {children}
    </div>
  );
}

/* ========== 对话气泡组件 ========== */

interface MaiPalBubbleProps {
  children: ReactNode;
  variant?: 'user' | 'ai';
  className?: string;
}

export function MaiPalBubble({ 
  children, 
  variant = 'ai', 
  className = '' 
}: MaiPalBubbleProps) {
  const variantClasses = {
    user: 'bg-[#ecd1b4] text-black ml-auto',
    ai: 'bg-white text-black border border-gray-100'
  };
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={`maipal-bubble ${variantClasses[variant]} ${className}`}
    >
      {children}
    </motion.div>
  );
}

/* ========== 加载动画组件 ========== */

export function MaiPalLoading({ text = '加载中...' }: { text?: string }) {
  return (
    <div className="flex flex-col items-center justify-center gap-4 p-8">
      <div className="relative w-12 h-12">
        <motion.div
          className="absolute inset-0 rounded-full border-4 border-[#ecd1b4] border-t-transparent"
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
        />
      </div>
      <p className="text-[14pt] text-black/60">{text}</p>
    </div>
  );
}

/* ========== 空状态组件 ========== */

interface MaiPalEmptyProps {
  icon?: ReactNode;
  title: string;
  description?: string;
  action?: ReactNode;
}

export function MaiPalEmpty({ icon, title, description, action }: MaiPalEmptyProps) {
  return (
    <div className="flex flex-col items-center justify-center gap-4 p-8 text-center">
      {icon && <div className="text-[48pt] opacity-50">{icon}</div>}
      <h3 className="text-[20pt] font-medium text-black">{title}</h3>
      {description && <p className="text-[16pt] text-black/60 max-w-[280pt]">{description}</p>}
      {action && <div className="mt-4">{action}</div>}
    </div>
  );
}

/* ========== 图标组件 ========== */

function MenuIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor">
      <path d="M8 6H21M8 12H21M8 18H21M3 6H3.01M3 12H3.01M3 18H3.01" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

/* ========== 标签组件 ========== */

interface MaiPalTagProps {
  children: ReactNode;
  active?: boolean;
  onClick?: () => void;
  className?: string;
}

export function MaiPalTag({ 
  children, 
  active = false, 
  onClick,
  className = '' 
}: MaiPalTagProps) {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-1 rounded-[12pt] border-4 border-solid transition-colors duration-300 ${
        active
          ? 'bg-[#ecd1b4] border-[#ecd1b4]'
          : 'bg-white border-[#ecd1b4] hover:bg-[#ecd1b4]/10'
      } ${className}`}
    >
      <span className="text-[16pt] font-medium text-black">
        {children}
      </span>
    </button>
  );
}

/* ========== 分隔线组件 ========== */

export function MaiPalDivider({ className = '' }: { className?: string }) {
  return <div className={`h-px bg-black/10 ${className}`} />;
}

/* ========== Toast 提示组件 ========== */

interface MaiPalToastProps {
  message: string;
  type?: 'success' | 'error' | 'info';
}

export function MaiPalToast({ message, type = 'info' }: MaiPalToastProps) {
  const colors = {
    success: 'bg-green-500',
    error: 'bg-red-500',
    info: 'bg-[#ecd1b4]'
  };
  
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className={`fixed top-8 left-1/2 -translate-x-1/2 ${colors[type]} text-white px-6 py-3 rounded-[12pt] shadow-lg z-50`}
    >
      <p className="text-[16pt] font-medium">{message}</p>
    </motion.div>
  );
}