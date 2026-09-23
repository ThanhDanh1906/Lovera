import React, { useState } from 'react';
import {
  Heart,
  Sparkles,
  Compass,
  Coffee,
  Calendar,
  Clock,
  DollarSign,
  Share2,
  Bookmark,
  Check,
  Smartphone,
  Droplets,
  Send,
  Flame,
  Smile,
  ChevronRight,
  Code,
  Copy,
  Users,
  QrCode,
  ArrowRight,
  Wifi,
  Battery,
  MapPin
} from 'lucide-react';

import avatarAlex from './assets/images/partner_avatar_alex_1790144456462.jpg';
import avatarSam from './assets/images/partner_avatar_sam_1790144470464.jpg';
import gardenBanner from './assets/images/love_garden_blooms_1790144486251.jpg';

type FlowScreen = 'login' | 'pairing' | 'home' | 'garden' | 'planner' | 'status';
type DateType = 'Romantic' | 'Cozy' | 'Adventure';

interface GeneratedPlan {
  title: string;
  type: DateType;
  budget: number;
  duration: string;
  summary: string;
  timeline: { time: string; activity: string; tip: string }[];
  coupleTip: string;
}

export default function App() {
  // Mobile device view vs responsive mode
  const [deviceFrame, setDeviceFrame] = useState<boolean>(true);
  const [currentScreen, setCurrentScreen] = useState<FlowScreen>('home');

  // Auth & Pairing State
  const [email, setEmail] = useState('alex@lovera.app');
  const [password, setPassword] = useState('••••••••');
  const [myPairCode, setMyPairCode] = useState('LOV-8942');
  const [inputPairCode, setInputPairCode] = useState('');

  // Partner State
  const [partnerOne, setPartnerOne] = useState('Alex');
  const [partnerTwo, setPartnerTwo] = useState('Sam');
  const [daysCount, setDaysCount] = useState(365);
  const [lovePoints, setLovePoints] = useState(1500);
  const [level, setLevel] = useState(4);
  const [waterAnimation, setWaterAnimation] = useState(false);
  const [pingSent, setPingSent] = useState(false);
  const [batteryLevel, setBatteryLevel] = useState(88);

  // AI Dating Planner form state
  const [budget, setBudget] = useState(65);
  const [dateType, setDateType] = useState<DateType>('Romantic');
  const [isGenerating, setIsGenerating] = useState(false);
  const [savedPlan, setSavedPlan] = useState(false);
  const [currentPlan, setCurrentPlan] = useState<GeneratedPlan | null>({
    title: 'Bữa Tối Ánh Nến & Dạo Phố Ngắm Sao',
    type: 'Romantic',
    budget: 65,
    duration: '3.5 tiếng',
    summary: 'Buổi chiều hoàng hôn nhẹ nhàng với bánh ngọt thủ công, sau đó cùng dạo bước dưới ánh đèn đêm và nghe một bản nhạc chung.',
    timeline: [
      { time: '18:00', activity: 'Gặp nhau tại góc quán trà hoa yêu thích', tip: 'Tặng nhau một nhành hoa nhỏ bí mật' },
      { time: '19:15', activity: 'Dùng bữa tối ấm cúng dưới ánh nến', tip: 'Hỏi đối phương điều làm họ cười nhiều nhất tuần qua' },
      { time: '20:45', activity: 'Đi dạo ngắm sao & chia sẻ tai nghe', tip: 'Bật danh sách LOVERA Acoustic Love Memories' }
    ],
    coupleTip: 'Để điện thoại chế độ Không Làm Phiền (Do Not Disturb) trong suốt bữa tối.'
  });

  const [floatingHearts, setFloatingHearts] = useState<{ id: number; x: number; y: number }[]>([]);

  // Web Audio chime
  const playChime = (freq = 520) => {
    try {
      const audioCtx = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, audioCtx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(freq * 1.4, audioCtx.currentTime + 0.2);
      gain.gain.setValueAtTime(0.12, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.3);
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start();
      osc.stop(audioCtx.currentTime + 0.3);
    } catch {
      // Audio fallback
    }
  };

  const triggerHeartBurst = (e?: React.MouseEvent) => {
    const id = Date.now();
    const x = e ? e.clientX : window.innerWidth / 2;
    const y = e ? e.clientY : window.innerHeight / 2;
    setFloatingHearts(prev => [...prev.slice(-6), { id, x, y }]);
    setTimeout(() => {
      setFloatingHearts(prev => prev.filter(h => h.id !== id));
    }, 1500);
  };

  // Interactions
  const handleWaterGarden = (e: React.MouseEvent) => {
    playChime(640);
    setWaterAnimation(true);
    setLovePoints(prev => prev + 50);
    triggerHeartBurst(e);
    setTimeout(() => setWaterAnimation(false), 1200);
  };

  const handleSendPing = (e: React.MouseEvent) => {
    playChime(780);
    setPingSent(true);
    setLovePoints(prev => prev + 25);
    triggerHeartBurst(e);
    setTimeout(() => setPingSent(false), 2400);
  };

  const handleGenerateDate = () => {
    setIsGenerating(true);
    playChime(480);
    setSavedPlan(false);

    setTimeout(() => {
      let newPlan: GeneratedPlan;
      if (dateType === 'Romantic') {
        newPlan = {
          title: budget > 90 ? 'Nhà Hàng View Sông & Du Thuyền Hoàng Hôn' : 'Bữa Tối Ánh Nến & Dạo Phố Ngắm Sao',
          type: 'Romantic',
          budget,
          duration: '3.5 tiếng',
          summary: `Một buổi tối lãng mạn sâu sắc được tối ưu hóa cho ngân sách $${budget}, tập trung vào những khoảnh khắc dịu dàng bên nhau.`,
          timeline: [
            { time: '18:00', activity: 'Đón người ấy & nhành hồng nhung', tip: 'Viết một mẩu giấy note cảm ơn người ấy' },
            { time: '19:15', activity: 'Thưởng thức bữa tối ấm cúng nhẹ nhàng', tip: 'Nhắc lại kỉ niệm ngày đầu mới gặp' },
            { time: '21:00', activity: 'Dạo cầu đi bộ & cùng nghe bản nhạc quen', tip: 'Trao nhau cái ôm thật chặt trước khi về' }
          ],
          coupleTip: 'Nắm tay đối phương suốt chặng đường đi dạo và trao nhau một nụ hôn nhẹ.'
        };
      } else if (dateType === 'Cozy') {
        newPlan = {
          title: 'Làm Bánh Ngọt Tại Nhà & Chiếu Phim Lều Vải',
          type: 'Cozy',
          budget,
          duration: '3 tiếng',
          summary: 'Buổi hẹn êm đềm tại không gian riêng, bật đèn vàng ấm, nướng bánh cookie và cùng đắp chung một chiếc chăn len.',
          timeline: [
            { time: '17:30', activity: 'Chuẩn bị trà ấm & thắp nến thơm vani', tip: 'Chọn mùi hương tinh dầu dịu nhẹ dễ chịu' },
            { time: '18:30', activity: 'Cùng nướng bánh hoặc ăn lẩu nhỏ', tip: 'Đút bánh cho nhau và chụp một bức polaroid' },
            { time: '20:15', activity: 'Xem bộ phim tình cảm ấm áp', tip: 'Tựa đầu vào vai nhau và mát-xa tay thư giãn' }
          ],
          coupleTip: 'Tắt hết thông báo mạng xã hội để chỉ có thế giới của hai người.'
        };
      } else {
        newPlan = {
          title: 'Chèo Sup Hoàng Hôn & Khám Phá Quán Nước Ẩn',
          type: 'Adventure',
          budget,
          duration: '4 tiếng',
          summary: 'Tràn đầy năng lượng với những hoạt động ngoài trời, kích thích hormone hạnh phúc và tạo kỉ niệm mới mẻ.',
          timeline: [
            { time: '15:30', activity: 'Chuẩn bị đồ thể thao đôi & bắt đầu chèo', tip: 'Đua thuyền vui vẻ và ghi lại video ngắn' },
            { time: '17:45', activity: 'Ngắm mặt trời lặn trên mặt nước', tip: 'Thưởng thức dừa tươi ướp lạnh ngọt mát' },
            { time: '19:30', activity: 'Khám phá quán ăn đường phố lạ miệng', tip: 'Chấm điểm món ăn cùng nhau' }
          ],
          coupleTip: 'Luôn luôn đập tay ăn mừng (high-five) khi cùng nhau vượt qua một thử thách!'
        };
      }

      setCurrentPlan(newPlan);
      setIsGenerating(false);
      playChime(880);
    }, 700);
  };

  return (
    <div className="min-h-screen bg-stone-100 text-stone-800 flex flex-col items-center justify-start selection:bg-rose-200 selection:text-rose-900 relative">
      
      {/* Main App Canvas */}
      <main className="w-full flex-1 flex flex-col items-center justify-start py-3 sm:py-6 px-0 sm:px-4">
        
        {/* Mobile Device Canvas */}
        <div
          className={`transition-all duration-300 ease-out ${
            deviceFrame
              ? 'w-full max-w-[400px] sm:rounded-[3rem] shadow-2xl shadow-rose-950/15 border-0 sm:border-[8px] sm:border-stone-800 bg-stone-900 overflow-hidden relative min-h-screen sm:min-h-auto'
              : 'w-full max-w-[420px] rounded-3xl border border-rose-100 shadow-xl shadow-rose-200/40 bg-white overflow-hidden'
          }`}
        >
          
          {/* ========================================================= */}
          {/* 1. SAFE AREA: VÙNG AN TOÀN TRÊN CÙNG (STATUS BAR HỆ THỐNG) */}
          {/* Tách biệt hoàn toàn, nội dung app bắt đầu từ dưới thanh này */}
          {/* ========================================================= */}
          <div className="bg-stone-900 text-white/80 h-11 px-6 flex items-center justify-between text-[11px] font-medium select-none z-30 relative shrink-0">
            <span className="font-semibold tracking-tight">9:41</span>
            {/* Dynamic Island / Notch */}
            <div className="w-20 h-3.5 bg-black rounded-full mx-auto flex items-center justify-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-stone-800"></span>
              <span className="w-1.5 h-1.5 rounded-full bg-stone-700"></span>
            </div>
            <div className="flex items-center gap-1.5 text-[10px]">
              <Wifi className="w-3 h-3" />
              <Battery className="w-3.5 h-3.5" />
            </div>
          </div>

          {/* ========================================================= */}
          {/* 2. DUY NHẤT 1 THANH HEADER ĐẦU TRANG                      */}
          {/* Căn trái: LOVERA TOGETHER | Căn phải: Badge Online        */}
          {/* ========================================================= */}
          <div className="bg-white/95 backdrop-blur-md border-b border-rose-100/60 px-4 py-2.5 flex items-center justify-between sticky top-0 z-20 shadow-2xs">
            {/* Căn trái: Logo Tên App LOVERA TOGETHER */}
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-xl bg-gradient-to-tr from-rose-500 to-purple-600 flex items-center justify-center text-white shadow-xs">
                <Heart className="w-3.5 h-3.5 fill-white" />
              </div>
              <div className="flex items-baseline gap-1.5">
                <span className="font-serif-romantic text-xl font-bold tracking-tight bg-gradient-to-r from-rose-600 via-rose-500 to-purple-600 bg-clip-text text-transparent">
                  LOVERA
                </span>
                <span className="text-[10px] uppercase font-bold tracking-wider text-rose-400">
                  TOGETHER
                </span>
              </div>
            </div>

            {/* Căn phải: Trạng thái hoạt động (Badge Online) */}
            <button
              onClick={() => {
                playChime(550);
                setCurrentScreen('status');
              }}
              className="flex items-center gap-1.5 px-2.5 py-1 bg-emerald-50/90 hover:bg-emerald-100 border border-emerald-200/90 rounded-full transition-colors active:scale-95"
              title="Xem trạng thái kết nối chi tiết"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span className="text-[11px] font-bold text-emerald-800">Online</span>
            </button>
          </div>

          {/* ========================================================= */}
          {/* 3. NỘI DUNG CUỘN (SCROLLABLE CANVAS - GRID HỆ 8PT & MARGIN)*/}
          {/* Margin trái phải 16px cố định, các Card không dính mép    */}
          {/* ========================================================= */}
          <div className="bg-gradient-to-b from-rose-50/60 via-stone-50/40 to-purple-50/50 min-h-[640px] max-h-[740px] overflow-y-auto pb-24 text-stone-800 select-none">
            
            {/* ------------------------------------------------------- */}
            {/* SCREEN: HOME DASHBOARD                                  */}
            {/* ------------------------------------------------------- */}
            {currentScreen === 'home' && (
              <div className="space-y-3.5 pt-3">
                
                {/* --------------------------------------------------- */}
                {/* CARD 1: KHỐI CẶP ĐÔI (Avatar Alex & Sam)           */}
                {/* Padding tinh gọn, căn lề 16px (mx-4)                */}
                {/* --------------------------------------------------- */}
                <div className="mx-4 bg-white/95 backdrop-blur-md rounded-2xl p-3.5 border border-rose-100/90 shadow-xs">
                  {/* Hàng Avatars & Đường kết nối */}
                  <div className="relative flex items-center justify-between">
                    
                    {/* Partner 1: Alex */}
                    <div className="flex items-center gap-2.5 z-10">
                      <div className="relative">
                        <div className="w-11 h-11 rounded-full overflow-hidden ring-2 ring-rose-400 ring-offset-2 ring-offset-white shadow-xs">
                          <img
                            src={avatarAlex}
                            alt={partnerOne}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 border-2 border-white rounded-full"></span>
                      </div>
                      <div>
                        <h3 className="font-bold text-xs text-stone-900 leading-tight">{partnerOne}</h3>
                        <p className="text-[10px] text-stone-500 flex items-center gap-0.5 mt-0.5">
                          <Smile className="w-2.5 h-2.5 text-rose-400" />
                          <span>Đang nhớ bạn</span>
                        </p>
                      </div>
                    </div>

                    {/* Đường kết nối tâm tình với trái tim đập nhẹ */}
                    <div className="absolute inset-x-20 top-1/2 -translate-y-1/2 flex items-center justify-center pointer-events-none">
                      <div className="w-full h-[1.5px] bg-gradient-to-r from-rose-300 via-rose-400 to-purple-300 rounded-full"></div>
                      <div className="absolute bg-white px-1.5 py-0.5 rounded-full border border-rose-200 shadow-xs flex items-center">
                        <Heart className="w-3 h-3 text-rose-500 fill-rose-500 animate-heart-pulse" />
                      </div>
                    </div>

                    {/* Partner 2: Sam */}
                    <div className="flex items-center gap-2.5 z-10 flex-row-reverse text-right">
                      <div className="relative">
                        <div className="w-11 h-11 rounded-full overflow-hidden ring-2 ring-purple-400 ring-offset-2 ring-offset-white shadow-xs">
                          <img
                            src={avatarSam}
                            alt={partnerTwo}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 border-2 border-white rounded-full"></span>
                      </div>
                      <div>
                        <h3 className="font-bold text-xs text-stone-900 leading-tight">{partnerTwo}</h3>
                        <p className="text-[10px] text-stone-500 flex items-center justify-end gap-0.5 mt-0.5">
                          <Flame className="w-2.5 h-2.5 text-amber-500" />
                          <span>Đã kết nối</span>
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Hành động nhanh: Căn chỉnh cân đối, phân tách trực quan */}
                  <div className="mt-2.5 pt-2.5 border-t border-rose-100/70 flex items-center justify-between text-xs">
                    <div className="flex items-center gap-1.5 text-stone-600">
                      <span className="w-1.5 h-1.5 rounded-full bg-rose-400"></span>
                      <span className="text-[11px] font-medium text-stone-500">
                        {pingSent ? '💌 Đã gửi: "Nhớ em rất nhiều!"' : 'Gửi rung cảm yêu thương'}
                      </span>
                    </div>

                    <button
                      onClick={handleSendPing}
                      className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-gradient-to-r from-rose-500 to-purple-600 hover:from-rose-600 hover:to-purple-700 text-white font-semibold text-[11px] shadow-xs active:scale-95 transition-all"
                    >
                      <Send className="w-3 h-3" />
                      <span>{pingSent ? 'Đã gửi ❤️' : 'Gửi Love Ping'}</span>
                    </button>
                  </div>
                </div>

                {/* --------------------------------------------------- */}
                {/* CARD 2: KHỐI HÀNH TRÌNH YÊU (Love Day Counter)       */}
                {/* Chiều cao thu gọn, font 18-20px vừa vặn, tương phản */}
                {/* WCAG cao: nền gradient sẫm tinh tế, chữ trắng rõ nét*/}
                {/* --------------------------------------------------- */}
                <div className="mx-4 relative overflow-hidden rounded-2xl bg-gradient-to-br from-rose-600 via-rose-700 to-purple-800 text-white p-4 shadow-md shadow-rose-950/20 text-center">
                  
                  {/* Subtle ambient lighting */}
                  <div className="absolute -top-8 -right-8 w-24 h-24 bg-white/10 rounded-full blur-xl pointer-events-none"></div>

                  <div className="flex items-center justify-between mb-1.5">
                    <div className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest text-rose-200">
                      <Heart className="w-3 h-3 fill-rose-300 text-rose-300 animate-heart-pulse" />
                      <span>Hành Trình Yêu</span>
                    </div>

                    {/* Nút demo tinh chỉnh ngày */}
                    <div className="flex items-center gap-1 bg-black/25 rounded-md px-1 py-0.5 text-[9px] text-rose-100">
                      <button onClick={() => setDaysCount(prev => Math.max(1, prev - 1))} className="px-1 hover:text-white">-1d</button>
                      <button onClick={() => setDaysCount(365)} className="px-1 font-bold hover:text-white">365</button>
                      <button onClick={() => setDaysCount(prev => prev + 1)} className="px-1 hover:text-white">+1d</button>
                    </div>
                  </div>

                  {/* Tiêu đề được thu gọn kích thước vừa phải (18px-20px) */}
                  <h2 className="font-serif-romantic text-lg sm:text-xl font-bold tracking-tight text-white mb-1">
                    Chúng mình đã bên nhau
                  </h2>

                  {/* Số ngày nổi bật, độ tương phản sắc nét WCAG AA */}
                  <div className="flex items-baseline justify-center gap-1.5 my-1">
                    <span className="text-4xl sm:text-5xl font-black tracking-tight font-serif-romantic text-white drop-shadow-sm">
                      {daysCount}
                    </span>
                    <span className="text-xl font-serif-romantic font-semibold text-rose-100">
                      Ngày
                    </span>
                  </div>

                  {/* Phụ đề 1 năm yêu nhau */}
                  <div className="pt-2 mt-2 border-t border-white/20 flex items-center justify-between text-[11px] text-rose-100/95 font-medium">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3 text-rose-200" />
                      <span>Kỷ niệm 1 Năm Yêu</span>
                    </span>
                    <span className="text-white font-bold bg-white/15 px-2 py-0.5 rounded-full">
                      8,760 Giờ
                    </span>
                  </div>
                </div>

                {/* --------------------------------------------------- */}
                {/* NỘI DUNG TIẾP THEO ĐƯỢC HÉ LỘ (Scroll Teaser Peek)  */}
                {/* Nhờ khối counter thu gọn, người dùng thấy ngay 2 thẻ */}
                {/* Vườn hoa và AI Planner, kích thích hành vi cuộn trang*/}
                {/* --------------------------------------------------- */}
                <div className="mx-4 pt-1">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold text-stone-700">Khám Phá Cùng Nhau</span>
                    <span className="text-[10px] text-stone-400 font-medium">Vuốt để xem thêm ↓</span>
                  </div>

                  <div className="grid grid-cols-2 gap-2.5">
                    {/* Thẻ Love Garden Mini */}
                    <div
                      onClick={() => {
                        playChime(600);
                        setCurrentScreen('garden');
                      }}
                      className="bg-white/95 p-3 rounded-2xl border border-rose-100/90 shadow-2xs hover:border-rose-300 transition-all cursor-pointer active:scale-98"
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-base">🌸</span>
                        <span className="text-[10px] font-bold text-rose-600 bg-rose-50 px-1.5 py-0.5 rounded-md">
                          1,500 Pts
                        </span>
                      </div>
                      <h4 className="font-bold text-xs text-stone-900 leading-tight">Love Garden</h4>
                      <p className="text-[10px] text-stone-500 mt-0.5">Cấp 4: Đang nở rộ</p>
                    </div>

                    {/* Thẻ AI Dating Planner Mini */}
                    <div
                      onClick={() => {
                        playChime(600);
                        setCurrentScreen('planner');
                      }}
                      className="bg-white/95 p-3 rounded-2xl border border-purple-100/90 shadow-2xs hover:border-purple-300 transition-all cursor-pointer active:scale-98"
                    >
                      <div className="flex items-center justify-between mb-1">
                        <Sparkles className="w-4 h-4 text-purple-600" />
                        <span className="text-[10px] font-bold text-purple-600 bg-purple-50 px-1.5 py-0.5 rounded-md">
                          Gợi Ý Date
                        </span>
                      </div>
                      <h4 className="font-bold text-xs text-stone-900 leading-tight">AI Dating Planner</h4>
                      <p className="text-[10px] text-stone-500 mt-0.5">Lên lịch hẹn lãng mạn</p>
                    </div>
                  </div>
                </div>

                {/* Dải thông điệp ngọt ngào hàng ngày */}
                <div className="mx-4 bg-gradient-to-r from-rose-50 via-white to-purple-50 p-3 rounded-2xl border border-rose-100/70 flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-xl bg-rose-100 text-rose-600 flex items-center justify-center shrink-0">
                    <Heart className="w-4 h-4 fill-rose-500 text-rose-500" />
                  </div>
                  <div className="text-[11px] leading-snug">
                    <strong className="font-bold text-stone-900">Lời nhắn hôm nay: </strong>
                    <span className="text-stone-600">"Hạnh phúc là khi mở mắt ra và biết có một người luôn yêu mình."</span>
                  </div>
                </div>

              </div>
            )}

            {/* ------------------------------------------------------- */}
            {/* SCREEN: LOVE GARDEN                                     */}
            {/* ------------------------------------------------------- */}
            {currentScreen === 'garden' && (
              <div className="space-y-3 pt-3">
                <div className="mx-4 flex items-center justify-between">
                  <div>
                    <h2 className="font-serif-romantic text-lg font-bold text-stone-900">Love Garden</h2>
                    <p className="text-[10px] text-stone-500">Vườn hoa số của hai bạn</p>
                  </div>
                  <div className="px-3 py-1 bg-gradient-to-r from-rose-500 to-purple-600 text-white rounded-full text-xs font-bold shadow-2xs flex items-center gap-1.5">
                    <Sparkles className="w-3 h-3 text-amber-200" />
                    <span>Love Points: {lovePoints.toLocaleString()}</span>
                  </div>
                </div>

                {/* Ảnh Vườn Hoa */}
                <div className="mx-4 relative h-40 rounded-2xl overflow-hidden border border-rose-200 shadow-inner group">
                  <img
                    src={gardenBanner}
                    alt="Digital Love Garden"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-stone-900/25 to-transparent flex flex-col justify-end p-3.5 text-white">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-xs font-bold drop-shadow-sm flex items-center gap-1">
                          <span>Khu Vườn Cấp {level}: Hoa Hồng & Oải Hương</span>
                          <span className="text-amber-300">✨</span>
                        </p>
                        <p className="text-[10px] text-stone-200">14 ngày tưới nước liên tiếp 🔥</p>
                      </div>

                      <button
                        onClick={handleWaterGarden}
                        className="px-3 py-1.5 rounded-xl bg-white/25 hover:bg-white/35 backdrop-blur-md border border-white/40 text-white text-xs font-bold flex items-center gap-1 active:scale-95 transition-all shadow-sm"
                      >
                        <Droplets className={`w-3.5 h-3.5 text-cyan-300 ${waterAnimation ? 'animate-bounce' : ''}`} />
                        <span>Tưới (+50)</span>
                      </button>
                    </div>
                  </div>

                  {waterAnimation && (
                    <div className="absolute inset-0 bg-cyan-500/25 backdrop-blur-xs flex items-center justify-center animate-fade-in pointer-events-none">
                      <div className="text-center">
                        <Droplets className="w-10 h-10 text-cyan-200 animate-bounce mx-auto" />
                        <span className="text-xs font-bold text-white drop-shadow-md">+50 Love Points!</span>
                      </div>
                    </div>
                  )}
                </div>

                {/* Tiến trình Level */}
                <div className="mx-4 bg-white/95 p-3.5 rounded-2xl border border-rose-100 shadow-2xs">
                  <div className="flex justify-between text-xs font-medium mb-1">
                    <span className="text-stone-700">Tiến trình lên Cấp {level + 1} (Khu Vườn Ánh Trăng)</span>
                    <span className="font-bold text-rose-600">{lovePoints} / 2,000 XP</span>
                  </div>
                  <div className="w-full h-2.5 bg-rose-100 rounded-full overflow-hidden p-0.5">
                    <div
                      className="h-full bg-gradient-to-r from-rose-500 to-purple-600 rounded-full transition-all duration-700"
                      style={{ width: `${Math.min(100, (lovePoints / 2000) * 100)}%` }}
                    ></div>
                  </div>
                  <div className="flex justify-between text-[10px] text-stone-500 mt-2">
                    <span>Chuỗi chăm sóc: 14 ngày</span>
                    <span className="text-purple-600 font-semibold">Còn {2000 - lovePoints} XP để thăng cấp</span>
                  </div>
                </div>

                {/* Huy hiệu hoa */}
                <div className="mx-4 grid grid-cols-3 gap-2">
                  <div className="bg-white p-2 rounded-xl border border-rose-100 text-center">
                    <span className="text-lg">🌹</span>
                    <h5 className="font-bold text-[11px] text-stone-800 mt-0.5">Hồng Nhung</h5>
                    <span className="text-[9px] text-emerald-600 font-medium">Đang nở</span>
                  </div>
                  <div className="bg-white p-2 rounded-xl border border-purple-100 text-center">
                    <span className="text-lg">🪻</span>
                    <h5 className="font-bold text-[11px] text-stone-800 mt-0.5">Oải Hương</h5>
                    <span className="text-[9px] text-emerald-600 font-medium">Đang nở</span>
                  </div>
                  <div className="bg-stone-50 p-2 rounded-xl border border-dashed border-stone-300 text-center opacity-70">
                    <span className="text-lg">🌸</span>
                    <h5 className="font-bold text-[11px] text-stone-600 mt-0.5">Anh Đào</h5>
                    <span className="text-[9px] text-stone-400">Cấp 5 mở</span>
                  </div>
                </div>
              </div>
            )}

            {/* ------------------------------------------------------- */}
            {/* SCREEN: AI DATING PLANNER                               */}
            {/* ------------------------------------------------------- */}
            {currentScreen === 'planner' && (
              <div className="space-y-3 pt-3">
                <div className="mx-4 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-xl bg-purple-100 text-purple-600 flex items-center justify-center">
                      <Sparkles className="w-4 h-4" />
                    </div>
                    <div>
                      <h2 className="font-serif-romantic text-lg font-bold text-stone-900 leading-tight">AI Dating Planner</h2>
                      <p className="text-[10px] text-stone-500">Lên lịch hẹn lãng mạn</p>
                    </div>
                  </div>
                  <span className="text-[10px] font-bold text-purple-600 bg-purple-50 px-2 py-0.5 rounded-full border border-purple-200">
                    +150 Points
                  </span>
                </div>

                <div className="mx-4 bg-white/95 p-4 rounded-2xl border border-rose-100 shadow-2xs space-y-3">
                  {/* Slider Ngân sách */}
                  <div>
                    <div className="flex justify-between text-xs font-semibold text-stone-700 mb-1">
                      <span>Ngân sách buổi hẹn</span>
                      <span className="text-rose-600 font-bold bg-rose-50 px-2 py-0.5 rounded-md border border-rose-200/60">
                        ${budget} (~{(budget * 25).toLocaleString()}k VNĐ)
                      </span>
                    </div>
                    <input
                      type="range"
                      min="15"
                      max="200"
                      step="5"
                      value={budget}
                      onChange={(e) => setBudget(Number(e.target.value))}
                      className="slider-romantic w-full cursor-pointer"
                    />
                    <div className="flex justify-between text-[10px] text-stone-400 mt-1 font-medium">
                      <span>$15 (Ấm cúng)</span>
                      <span>$100 (Nhà hàng)</span>
                      <span>$200+ (Cao cấp)</span>
                    </div>
                  </div>

                  {/* Tags phong cách */}
                  <div>
                    <label className="text-xs font-semibold text-stone-700 block mb-1.5">Phong cách</label>
                    <div className="grid grid-cols-3 gap-2">
                      {(['Romantic', 'Cozy', 'Adventure'] as DateType[]).map((type) => {
                        const isSelected = dateType === type;
                        return (
                          <button
                            key={type}
                            type="button"
                            onClick={() => setDateType(type)}
                            className={`py-1.5 px-2 rounded-xl text-xs font-semibold transition-all flex items-center justify-center gap-1 ${
                              isSelected
                                ? 'bg-rose-500 text-white shadow-xs'
                                : 'bg-stone-100 text-stone-600 hover:bg-stone-200/70'
                            }`}
                          >
                            <span>{type === 'Romantic' ? 'Lãng mạn' : type === 'Cozy' ? 'Ấm cúng' : 'Phiêu lưu'}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <button
                    onClick={handleGenerateDate}
                    disabled={isGenerating}
                    className="w-full py-2.5 bg-gradient-to-r from-rose-500 to-purple-600 text-white font-semibold text-xs rounded-xl shadow-xs active:scale-98 transition-all flex items-center justify-center gap-2"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-white" />
                    <span>{isGenerating ? 'Đang tạo kế hoạch...' : 'Generate Date Plan'}</span>
                  </button>
                </div>

                {/* Kết quả lịch trình */}
                {currentPlan && (
                  <div className="mx-4 bg-rose-50/70 p-3.5 rounded-2xl border border-rose-200/80 shadow-2xs space-y-2">
                    <div className="flex justify-between items-start">
                      <div>
                        <span className="text-[9px] font-bold text-rose-600 uppercase tracking-wider">Lịch trình đề xuất</span>
                        <h4 className="font-serif-romantic text-xs font-bold text-stone-900">{currentPlan.title}</h4>
                      </div>
                      <span className="text-[10px] bg-white px-2 py-0.5 rounded-md border border-stone-200 font-semibold">{currentPlan.duration}</span>
                    </div>

                    <p className="text-[11px] text-stone-600 leading-relaxed">{currentPlan.summary}</p>

                    <div className="space-y-1.5">
                      {currentPlan.timeline.map((item, idx) => (
                        <div key={idx} className="bg-white p-2 rounded-xl border border-rose-100 text-xs flex gap-2">
                          <span className="font-bold text-rose-500 text-[10px] bg-rose-50 px-1.5 py-0.5 rounded shrink-0">{item.time}</span>
                          <div className="min-w-0">
                            <p className="font-semibold text-stone-800 text-[11px]">{item.activity}</p>
                            <p className="text-[10px] text-stone-500">{item.tip}</p>
                          </div>
                        </div>
                      ))}
                    </div>

                    <button
                      onClick={() => {
                        setSavedPlan(!savedPlan);
                        playChime(650);
                      }}
                      className={`w-full py-2 rounded-xl text-xs font-medium flex items-center justify-center gap-1.5 transition-colors ${
                        savedPlan ? 'bg-emerald-500 text-white' : 'bg-white border border-rose-200 text-rose-600 hover:bg-rose-50'
                      }`}
                    >
                      <Bookmark className="w-3.5 h-3.5" />
                      <span>{savedPlan ? 'Đã lưu vào lịch hẹn' : 'Save Date Plan'}</span>
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* ------------------------------------------------------- */}
            {/* SCREEN: CONNECTION STATUS                               */}
            {/* ------------------------------------------------------- */}
            {currentScreen === 'status' && (
              <div className="space-y-3 pt-3">
                <div className="mx-4 flex items-center justify-between">
                  <div>
                    <h2 className="font-serif-romantic text-lg font-bold text-stone-900">Connection Status</h2>
                    <p className="text-[10px] text-stone-500">Thời gian thực</p>
                  </div>
                  <div className="flex items-center gap-1.5 px-2.5 py-1 bg-emerald-50 border border-emerald-200 rounded-full">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                    <span className="text-[11px] font-bold text-emerald-800">Trực Tuyến</span>
                  </div>
                </div>

                <div className="mx-4 bg-white/95 p-4 rounded-2xl border border-rose-100 shadow-2xs space-y-3">
                  <div className="flex items-center justify-between pb-2.5 border-b border-stone-100">
                    <div className="flex items-center gap-2">
                      <div className="w-10 h-10 rounded-full overflow-hidden ring-2 ring-purple-300">
                        <img src={avatarSam} alt="Sam" className="w-full h-full object-cover" />
                      </div>
                      <div>
                        <h4 className="font-bold text-xs text-stone-900">{partnerTwo} (Người yêu)</h4>
                        <p className="text-[10px] text-stone-500">Hoạt động 1 phút trước</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center gap-1 text-emerald-600 font-bold text-xs">
                        <Battery className="w-3.5 h-3.5" />
                        <span>{batteryLevel}% Pin</span>
                      </div>
                      <span className="text-[9px] text-stone-400">Đang kết nối</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div className="bg-stone-50 p-2.5 rounded-xl border border-stone-200/70">
                      <span className="text-[10px] text-stone-500 flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-rose-500" />
                        <span>Khoảng cách</span>
                      </span>
                      <p className="font-bold text-stone-900 mt-1">1.2 km</p>
                      <p className="text-[10px] text-stone-500">Cùng thành phố</p>
                    </div>

                    <div className="bg-stone-50 p-2.5 rounded-xl border border-stone-200/70">
                      <span className="text-[10px] text-stone-500 flex items-center gap-1">
                        <Heart className="w-3 h-3 text-rose-500 fill-rose-500" />
                        <span>Nhịp tim đôi</span>
                      </span>
                      <p className="font-bold text-stone-900 mt-1">74 BPM</p>
                      <p className="text-[10px] text-emerald-600 font-medium">Đồng điệu</p>
                    </div>
                  </div>

                  <button
                    onClick={handleSendPing}
                    className="w-full py-2.5 bg-gradient-to-r from-rose-500 to-purple-600 text-white font-semibold text-xs rounded-xl shadow-xs flex items-center justify-center gap-1.5 active:scale-98 transition-all"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>{pingSent ? 'Đã gửi nhịp tim thành công!' : 'Gửi Nhịp Tim Yêu Thương'}</span>
                  </button>
                </div>

                <div className="mx-4">
                  <button
                    onClick={() => setCurrentScreen('home')}
                    className="w-full py-2 bg-white border border-stone-200 hover:bg-stone-50 text-stone-700 text-xs font-semibold rounded-xl transition-colors"
                  >
                    ← Quay lại Trang Chủ
                  </button>
                </div>
              </div>
            )}

            {/* ------------------------------------------------------- */}
            {/* SCREEN: LOGIN                                           */}
            {/* ------------------------------------------------------- */}
            {currentScreen === 'login' && (
              <div className="mx-4 pt-6 space-y-4">
                <div className="text-center">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-rose-500 to-purple-600 mx-auto flex items-center justify-center text-white shadow-md shadow-rose-300 mb-2">
                    <Heart className="w-7 h-7 fill-white" />
                  </div>
                  <h2 className="font-serif-romantic text-2xl font-bold tracking-tight text-stone-900">
                    LOVERA
                  </h2>
                  <p className="text-xs text-stone-500">Đăng nhập không gian tình yêu</p>
                </div>

                <div className="bg-white/95 p-4 rounded-2xl border border-rose-100 shadow-2xs space-y-3">
                  <div>
                    <label className="text-xs font-semibold text-stone-700 block mb-1">Email</label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl border border-stone-200 text-xs focus:outline-rose-500"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-stone-700 block mb-1">Mật khẩu</label>
                    <input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl border border-stone-200 text-xs focus:outline-rose-500"
                    />
                  </div>

                  <button
                    onClick={() => {
                      playChime(600);
                      setCurrentScreen('pairing');
                    }}
                    className="w-full py-2.5 bg-gradient-to-r from-rose-500 to-purple-600 text-white font-semibold text-xs rounded-xl shadow-xs flex items-center justify-center gap-1.5"
                  >
                    <span>Đăng Nhập</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            )}

            {/* ------------------------------------------------------- */}
            {/* SCREEN: PAIRING                                         */}
            {/* ------------------------------------------------------- */}
            {currentScreen === 'pairing' && (
              <div className="mx-4 pt-4 space-y-3">
                <div className="text-center">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-rose-500 bg-rose-50 px-2.5 py-1 rounded-full border border-rose-200">
                    Ghép đôi
                  </span>
                  <h2 className="font-serif-romantic text-xl font-bold text-stone-900 mt-1.5">
                    Kết Nối Với Người Ấy
                  </h2>
                </div>

                <div className="bg-white/95 p-4 rounded-2xl border border-rose-100 shadow-2xs text-center space-y-2">
                  <span className="text-xs font-semibold text-stone-500">Mã kết nối của bạn:</span>
                  <div className="bg-rose-50 py-2 px-3 rounded-xl font-mono text-lg font-bold text-rose-600 tracking-widest">
                    {myPairCode}
                  </div>
                  <div className="w-24 h-24 bg-stone-100 mx-auto rounded-xl flex items-center justify-center my-2">
                    <QrCode className="w-16 h-16 text-stone-700" />
                  </div>
                </div>

                <div className="bg-white/95 p-3.5 rounded-2xl border border-purple-100 shadow-2xs">
                  <label className="text-xs font-semibold text-stone-700 block mb-1">Nhập mã đối phương:</label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={inputPairCode}
                      onChange={(e) => setInputPairCode(e.target.value.toUpperCase())}
                      placeholder="LOV-XXXX"
                      className="flex-1 px-3 py-1.5 rounded-xl border border-stone-200 text-xs font-mono"
                    />
                    <button
                      onClick={() => {
                        playChime(700);
                        setCurrentScreen('home');
                      }}
                      className="px-3 py-1.5 bg-rose-600 text-white font-semibold text-xs rounded-xl"
                    >
                      Ghép Đôi
                    </button>
                  </div>
                </div>
              </div>
            )}

          </div>

          {/* ========================================================= */}
          {/* 4. FIXED BOTTOM TAB BAR (THUMB ZONE ERGONOMICS)           */}
          {/* ========================================================= */}
          <nav className="absolute bottom-0 inset-x-0 bg-white/95 backdrop-blur-md border-t border-rose-100/80 px-6 py-2 flex items-center justify-between z-30 shadow-xs">
            <button
              onClick={() => {
                playChime(500);
                setCurrentScreen('home');
              }}
              className={`flex flex-col items-center gap-0.5 text-xs transition-colors ${
                currentScreen === 'home' ? 'text-rose-600 font-bold' : 'text-stone-400 hover:text-stone-600'
              }`}
            >
              <Heart className={`w-5 h-5 ${currentScreen === 'home' ? 'fill-rose-600' : ''}`} />
              <span className="text-[10px]">Home</span>
            </button>

            <button
              onClick={() => {
                playChime(500);
                setCurrentScreen('garden');
              }}
              className={`flex flex-col items-center gap-0.5 text-xs transition-colors ${
                currentScreen === 'garden' ? 'text-rose-600 font-bold' : 'text-stone-400 hover:text-stone-600'
              }`}
            >
              <Droplets className="w-5 h-5" />
              <span className="text-[10px]">Garden</span>
            </button>

            <button
              onClick={() => {
                playChime(500);
                setCurrentScreen('planner');
              }}
              className={`flex flex-col items-center gap-0.5 text-xs transition-colors ${
                currentScreen === 'planner' ? 'text-rose-600 font-bold' : 'text-stone-400 hover:text-stone-600'
              }`}
            >
              <Sparkles className="w-5 h-5" />
              <span className="text-[10px]">AI Planner</span>
            </button>

            <button
              onClick={() => {
                playChime(500);
                setCurrentScreen('status');
              }}
              className={`flex flex-col items-center gap-0.5 text-xs transition-colors ${
                currentScreen === 'status' ? 'text-rose-600 font-bold' : 'text-stone-400 hover:text-stone-600'
              }`}
            >
              <Wifi className="w-5 h-5" />
              <span className="text-[10px]">Status</span>
            </button>
          </nav>

          {/* Smartphone Bottom Home Bar Indicator */}
          {deviceFrame && (
            <div className="absolute bottom-1 inset-x-0 flex justify-center pointer-events-none z-40">
              <div className="w-28 h-1 bg-stone-400/80 rounded-full"></div>
            </div>
          )}

        </div>
      </main>

      {/* Floating Heart Particles Animation */}
      {floatingHearts.map((heart) => (
        <div
          key={heart.id}
          className="fixed pointer-events-none z-50 text-rose-500 animate-soft-float"
          style={{
            left: `${heart.x}px`,
            top: `${heart.y}px`,
            transition: 'all 1.6s cubic-bezier(0.16, 1, 0.3, 1)',
            transform: 'translate(-50%, -80px) scale(1.4)',
            opacity: 0
          }}
        >
          <Heart className="w-6 h-6 fill-rose-500 drop-shadow-md" />
        </div>
      ))}

    </div>
  );
}
