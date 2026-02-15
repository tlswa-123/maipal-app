import { useNavigate, useLocation } from 'react-router';
import svgPaths from "../../imports/svg-mcyz6e0wjx";

// 每日一见图标 - 四个菱形
function DailyViewIcon() {
  return (
    <div className="h-[15.989px] w-[15.989px] relative shrink-0">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        {/* 左上 */}
        <g transform="translate(1.33, 1.33)">
          <path d={svgPaths.p2baf7180} stroke="black" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33242" />
        </g>
        {/* 右上 */}
        <g transform="translate(9.33, 1.33)">
          <path d={svgPaths.p2baf7180} stroke="black" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33242" />
        </g>
        {/* 左下 */}
        <g transform="translate(1.33, 9.33)">
          <path d={svgPaths.p2baf7180} stroke="black" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33242" />
        </g>
        {/* 右下 */}
        <g transform="translate(9.33, 9.33)">
          <path d={svgPaths.p2baf7180} stroke="black" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33242" />
        </g>
      </svg>
    </div>
  );
}

// 对话图标 - 麦克风
function ChatIcon() {
  return (
    <div className="relative shrink-0 size-[18.57px]">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18.5701 18.5701">
        <path 
          d={svgPaths.p72ff680} 
          stroke="black" 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          strokeWidth="1.54751" 
        />
      </svg>
    </div>
  );
}

// 总结图标 - 日历
function SummaryIcon() {
  return (
    <div className="h-[15.989px] w-[15.989px] relative shrink-0">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 13.3242 14.6567">
        <path 
          d={svgPaths.pc81f100} 
          stroke="black" 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          strokeWidth="1.33242" 
        />
      </svg>
    </div>
  );
}

interface MaiPalBottomNavProps {
  currentTab?: 'daily-view' | 'chat' | 'summary';
  currentPage?: 'daily-view' | 'home' | 'chat' | 'summary'; // 兼容旧的属性名
}

/**
 * MaiPal 统一底部导航栏
 * 
 * 规范：
 * - 高度：70px
 * - 选中背景：#ecd1b4，圆角12px
 * - 文字：14.667px Medium
 * - 图标：每个tab不同尺寸
 */
export function MaiPalBottomNav({ currentTab, currentPage }: MaiPalBottomNavProps) {
  const navigate = useNavigate();
  const location = useLocation();

  // 判断当前选中的tab
  const getCurrentTab = (): 'daily-view' | 'chat' | 'summary' => {
    // 优先使用 currentTab
    if (currentTab) return currentTab;
    
    // 兼容 currentPage 属性
    if (currentPage) {
      if (currentPage === 'home') return 'chat';
      if (currentPage === 'daily-view') return 'daily-view';
      if (currentPage === 'summary') return 'summary';
      if (currentPage === 'chat') return 'chat';
    }
    
    // 根据路径判断
    if (location.pathname.includes('/daily-view')) return 'daily-view';
    if (location.pathname.includes('/summary')) return 'summary';
    if (location.pathname === '/home' || location.pathname === '/') return 'chat';
    
    // 默认
    return 'chat';
  };

  const activeTab = getCurrentTab();

  // 根据选中的tab计算背景框位置
  const getBackgroundPosition = () => {
    switch (activeTab) {
      case 'daily-view':
        return { left: '40px', top: '0px' };
      case 'chat':
        return { left: '158px', top: '-0.83px' };
      case 'summary':
        return { left: '276px', top: '0px' };
      default:
        return { left: '158px', top: '-0.83px' };
    }
  };

  const bgPosition = getBackgroundPosition();

  return (
    <div className="bg-white border-[#f3f4f6] border-solid border-t-[0.811px] relative h-[70px] w-full">
      {/* 选中背景框 - 根据activeTab自动移动位置 */}
      <div 
        className="absolute bg-[#ecd1b4] h-[70px] rounded-tl-[12px] rounded-tr-[12px] w-[89.992px] transition-all duration-300 ease-in-out z-0"
        style={{
          left: bgPosition.left,
          top: bgPosition.top
        }}
      />

      {/* 每日一见按钮 */}
      <button
        onClick={() => navigate('/daily-view')}
        className="absolute h-[36.311px] left-[49.99px] top-[17.99px] w-[61.308px] flex flex-col items-center gap-[3px] hover:opacity-70 transition-opacity z-10"
      >
        <DailyViewIcon />
        <p className="font-['Source_Han_Sans:Medium',sans-serif] leading-[18.333px] text-[15px] text-black text-center tracking-[0.6667px]">
          建议
        </p>
      </button>

      {/* 对话按钮 */}
      <button
        onClick={() => navigate('/home')}
        className="absolute left-[178px] top-[11px] size-[49.994px] flex flex-col items-center justify-center gap-[6.19px] hover:opacity-70 transition-opacity z-10"
      >
        <ChatIcon />
        <p className="font-['Lexend_Deca:Medium','Noto_Sans_KR:Medium','Noto_Sans_SC:Medium',sans-serif] font-medium leading-[1.18] text-[15px] text-black text-center whitespace-pre-wrap">
          对话
        </p>
      </button>

      {/* 总结按钮 */}
      <button
        onClick={() => navigate('/summary')}
        className="absolute h-[36.311px] left-[295px] top-[17.99px] w-[50px] flex flex-col items-center gap-[3px] hover:opacity-70 transition-opacity z-10"
      >
        <SummaryIcon />
        <p className="font-['Source_Han_Sans:Medium',sans-serif] leading-[18.333px] text-[15px] text-black text-center tracking-[0.6667px] whitespace-nowrap">
          总结
        </p>
      </button>
    </div>
  );
}