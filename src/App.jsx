import React, { useState, useEffect, useRef } from 'react';
import { 
  Sun, Moon, Cpu, ShieldCheck, ToggleRight, 
  Activity, Building2, User, Mail, 
  ChevronRight, BarChart3, Cloud, CheckCircle2, PieChart, AlertTriangle,
  Plug, Wifi, MonitorSmartphone, LayoutDashboard, Info, CreditCard, PenTool,
  Zap, Settings, ClipboardList, Briefcase, Gem, ArrowRight, Laptop, Server, Power,
  Gauge, HardDrive, Factory, Download, Sliders, History, MapPin, Phone, ShieldAlert, TrendingDown, FileText, Calendar
} from 'lucide-react';

export default function App() {
  // --- Global State ---
  const [isDark, setIsDark] = useState(false);
  const [currentPage, setCurrentPage] = useState('home'); 

  // Scroll to top on page change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentPage]);

  // --- Live IoT Data Simulation ---
  const [data, setData] = useState({
    r: { v: 229.4, i: 142.2, kw: 31.54, pf: 0.98, thd: 1.2 },
    y: { v: 231.8, i: 146.8, kw: 33.12, pf: 0.97, thd: 1.4 },
    b: { v: 230.5, i: 144.1, kw: 32.45, pf: 0.99, thd: 1.1 },
    hz: 50.01, kwh: 14250.5, totalKw: 97.11,
    history: Array.from({length: 20}, () => Math.random() * 40 + 60) 
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setData(prev => {
        const getV = () => +(230 + (Math.random() * 2 - 1)).toFixed(1);
        const getI = () => +(145 + (Math.random() * 5 - 2.5)).toFixed(1);
        const rV = getV(), yV = getV(), bV = getV();
        const rI = getI(), yI = getI(), bI = getI();
        const newTotal = +(((rV * rI * 0.98) + (yV * yI * 0.97) + (bV * bI * 0.99)) / 1000).toFixed(2);
        
        return {
          r: { v: rV, i: rI, kw: +((rV * rI * 0.98) / 1000).toFixed(2), pf: 0.98, thd: 1.2 },
          y: { v: yV, i: yI, kw: +((yV * yI * 0.97) / 1000).toFixed(2), pf: 0.97, thd: 1.4 },
          b: { v: bV, i: bI, kw: +((bV * bI * 0.99) / 1000).toFixed(2), pf: 0.99, thd: 1.1 },
          hz: +(50 + (Math.random() * 0.04 - 0.02)).toFixed(2),
          kwh: +(prev.kwh + 0.025).toFixed(2),
          totalKw: newTotal,
          history: [...prev.history.slice(1), newTotal]
        };
      });
    }, 1500);
    return () => clearInterval(interval);
  }, []);

  const theme = {
    bg: isDark ? 'bg-[#000000]' : 'bg-[#f5f5f7]',
    text: isDark ? 'text-[#f5f5f7]' : 'text-[#1d1d1f]',
    textMuted: isDark ? 'text-[#86868b]' : 'text-[#86868b]',
    navBg: isDark ? 'bg-black/70 border-white/10' : 'bg-white/70 border-black/5',
    glassBase: isDark ? 'bg-[#1d1d1f]/60 border border-white/20 shadow-2xl shadow-black' : 'bg-white/60 border border-black/10 shadow-2xl shadow-black/5',
    glassElevated: isDark ? 'bg-[#2d2d2f]/80 border border-white/10' : 'bg-white/80 border border-black/10',
    input: isDark ? 'bg-black/50 border border-white/20 text-white focus:border-blue-500' : 'bg-white/80 border border-black/10 text-black focus:border-blue-500',
    accent: 'text-blue-500',
    accentBg: 'bg-blue-500'
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard': return <DashboardPage data={data} theme={theme} isDark={isDark} />;
      case 'installation': return <InstallationPage theme={theme} isDark={isDark} setCurrentPage={setCurrentPage} />;
      case 'pricing': return <PricingPage theme={theme} isDark={isDark} setCurrentPage={setCurrentPage} />;
      case 'contact': return <ContactPage theme={theme} isDark={isDark} />;
      case 'home':
      default: return <HomePage data={data} theme={theme} isDark={isDark} setCurrentPage={setCurrentPage} />;
    }
  };

  return (
    <div className={`min-h-screen transition-colors duration-500 font-sans ${theme.bg} ${theme.text} overflow-x-hidden selection:bg-blue-500/30`}>
      <style dangerouslySetInnerHTML={{__html: `
        .preserve-3d { transform-style: preserve-3d; }
        .backdrop-blur-apple { backdrop-filter: blur(20px); -webkit-backdrop-filter: blur(20px); }
        html { scroll-behavior: smooth; }
        @keyframes fadeInUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        .animate-fade-in { opacity: 0; animation: fadeInUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
        @keyframes handFloat { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-10px); } }
        .animate-hand { animation: handFloat 3s ease-in-out infinite; }
        @keyframes ledBlink { 0%, 100% { opacity: 1; } 50% { opacity: 0.3; } }
        .led-status { animation: ledBlink 1s step-end infinite; }
        @keyframes spin-slow { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        .animate-spin-slow { animation: spin-slow 8s linear infinite; }
      `}} />

      <nav className={`fixed w-full z-50 transition-all duration-300 backdrop-blur-apple border-b ${theme.navBg}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex justify-between items-center">
          <div className="flex items-center gap-3 cursor-pointer group" onClick={() => setCurrentPage('home')}>
            <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${isDark ? 'bg-gradient-to-b from-zinc-800 to-black border border-white/10' : 'bg-gradient-to-b from-zinc-700 to-zinc-950 border border-black shadow-lg'}`}>
               <div className="w-3 h-3 border-[1.5px] border-blue-500 rounded-sm" />
            </div>
            <div className="flex flex-col leading-none mt-1">
              <span className="text-lg font-black uppercase tracking-tight">BLACKBOX</span>
              <span className="text-[8px] font-bold tracking-widest opacity-60 uppercase">Bharat Sparkline</span>
            </div>
          </div>
          <div className="flex items-center gap-6">
            <div className={`hidden md:flex gap-6 text-xs font-bold tracking-wide ${theme.textMuted}`}>
              <button onClick={() => setCurrentPage('home')} className={`hover:text-blue-500 transition-colors uppercase ${currentPage === 'home' ? 'text-blue-500' : ''}`}>Home</button>
              <button onClick={() => setCurrentPage('dashboard')} className={`hover:text-blue-500 transition-colors uppercase ${currentPage === 'dashboard' ? 'text-blue-500' : ''}`}>Dashboard</button>
              <button onClick={() => setCurrentPage('installation')} className={`hover:text-blue-500 transition-colors uppercase ${currentPage === 'installation' ? 'text-blue-500' : ''}`}>Installation</button>
              <button onClick={() => setCurrentPage('pricing')} className={`hover:text-blue-500 transition-colors uppercase ${currentPage === 'pricing' ? 'text-blue-500' : ''}`}>Pricing</button>
            </div>
            <button onClick={() => setIsDark(!isDark)} className="p-2 rounded-full transition-colors">{isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}</button>
            <button onClick={() => setCurrentPage('contact')} className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-1.5 rounded-full text-xs font-semibold transition-all">Contact Us</button>
          </div>
        </div>
      </nav>

      <main className="pt-16 min-h-screen flex flex-col">{renderPage()}</main>

      <footer className={`pt-16 pb-8 border-t border-inherit text-xs font-medium tracking-wide mt-auto ${isDark ? 'bg-[#0a0a0a] text-[#86868b]' : 'bg-[#ececec] text-[#86868b]'}`}>
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8 mb-8">
            <div>
                <p className={`font-bold mb-2 ${theme.text}`}>Bharat Sparkline Energy Ltd.</p>
                <p className="max-w-sm leading-relaxed text-left">Pioneering precision energy management and IoT infrastructure for the modern industrial age.</p>
            </div>
            <div className="md:text-right space-y-1">
                <p className="font-bold text-blue-500">Sales & Inquiries</p>
                <p>+91 9595364574 / 8888884999</p>
                <p>sales@bslenergy.in</p>
            </div>
          </div>
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 pt-8 border-t border-inherit">
            <p>Copyright (c) 2026 Bharat Sparkline Energy Ltd. All rights reserved.</p>
            <div className="flex gap-6">
              <button onClick={() => setCurrentPage('home')} className="hover:text-blue-500 transition-colors">Home</button>
              <button onClick={() => setCurrentPage('pricing')} className="hover:text-blue-500 transition-colors">Pricing</button>
              <button onClick={() => setCurrentPage('contact')} className="hover:text-blue-500 transition-colors">Contact</button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

function HomePage({ data, theme, isDark, setCurrentPage }) {
  return (
    <div className="animate-fade-in">
      {/* Apple-style Hero Section */}
      <section className="relative pt-24 pb-32 px-4 max-w-7xl mx-auto text-center overflow-hidden">
        <h2 className="text-blue-500 font-bold tracking-widest uppercase text-xs mb-6 animate-fade-in">Bharat Sparkline Energy Ltd.</h2>
        <h1 className="text-5xl md:text-[70px] font-bold tracking-tighter mb-8 leading-[1.1] animate-fade-in max-w-5xl mx-auto">
          BSL BlackBox (TM) - The Future of Electrical Panels
        </h1>
        <p className={`text-xl md:text-2xl max-w-3xl mx-auto mb-12 leading-relaxed font-medium ${theme.textMuted} animate-fade-in`}>
          Gaining 100% visibility into your energy consumption shouldn't be complicated. 
          The <b>BlackBox</b> by Bharat Sparkline is an industrial-grade necessity designed to monitor, 
          protect, and automate your power infrastructure.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4 animate-fade-in">
          <button onClick={() => setCurrentPage('installation')} className="bg-blue-600 hover:bg-blue-700 text-white px-10 py-4 rounded-2xl font-bold transition-all shadow-xl shadow-blue-500/20">Explore Setup</button>
          <button onClick={() => setCurrentPage('dashboard')} className={`px-10 py-4 rounded-2xl font-bold border transition-all ${isDark ? 'border-white/20 hover:bg-white/5' : 'border-black/10 hover:bg-black/5'}`}>Live Dashboard</button>
        </div>
      </section>

      {/* Why Blackbox - Simple & Necessity Focused */}
      <section className={`py-32 ${isDark ? 'bg-zinc-950' : 'bg-zinc-50'}`}>
        <div className="max-w-7xl mx-auto px-4 text-center">
            <div className="mb-20">
                <h2 className="text-4xl md:text-5xl font-bold tracking-tighter mb-4">Why is BlackBox a necessity?</h2>
                <p className={`text-xl max-w-2xl mx-auto ${theme.textMuted}`}>Running a modern facility without real-time data is a risk to your machinery and your bottom line.</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 text-left">
                <WhyCard 
                    icon={<ShieldAlert className="text-red-500" />}
                    title="Prevents Damage"
                    desc="Monitors phase unbalance and voltage spikes instantly. A small investment that saves motors worth lakhs."
                    theme={theme}
                />
                <WhyCard 
                    icon={<TrendingDown className="text-emerald-500" />}
                    title="Cuts Hidden Costs"
                    desc="Identifies exactly where energy is being wasted. Knowledge is the first step to reducing your monthly bills."
                    theme={theme}
                />
                <WhyCard 
                    icon={<PieChart className="text-blue-500" />}
                    title="Simple Audit"
                    desc="No more manual meter readings. Get automated, accurate reports of your energy usage on any device."
                    theme={theme}
                />
                <WhyCard 
                    icon={<CheckCircle2 className="text-purple-500" />}
                    title="Avoids Penalties"
                    desc="Real-time load tracking ensures you never cross your sanctioned limit, avoiding heavy utility company fines."
                    theme={theme}
                />
            </div>
        </div>
      </section>

      {/* Brand Context */}
      <section className="py-32 px-4 max-w-7xl mx-auto border-t border-white/10">
        <div className="grid md:grid-cols-2 gap-20 items-center">
            <div className={`p-12 rounded-[3rem] ${theme.glassBase} aspect-square flex flex-col justify-center`}>
                <Building2 className="w-16 h-16 text-blue-500 mb-8" />
                <h3 className="text-4xl font-bold mb-4">Engineering Trust.</h3>
                <p className={`text-lg ${theme.textMuted}`}>Developed by <b>Bharat Sparkline Energy Ltd.</b>, BlackBox is built for durability. We combine decades of electrical expertise with the speed of modern IoT.</p>
            </div>
            <div className="space-y-8 text-left">
                <h2 className="text-4xl md:text-6xl font-bold tracking-tighter leading-tight">Data You Can Trust.<br/>Service You Rely On.</h2>
                <p className={`text-xl ${theme.textMuted}`}>Join hundreds of industries that rely on BSL technology to manage their power infrastructure with confidence.</p>
                <button onClick={() => setCurrentPage('contact')} className="flex items-center gap-2 font-bold text-blue-500 hover:gap-4 transition-all text-lg">
                    Contact Our Sales Team <ArrowRight size={24} />
                </button>
            </div>
        </div>
      </section>
    </div>
  );
}

function WhyCard({ icon, title, desc, theme }) {
    return (
        <div className={`p-8 rounded-[2rem] border ${theme.glassBase} transition-all hover:border-blue-500/50`}>
            <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center mb-6">
                {icon}
            </div>
            <h3 className="text-xl font-bold mb-3">{title}</h3>
            <p className={`text-sm leading-relaxed ${theme.textMuted}`}>{desc}</p>
        </div>
    );
}

function DashboardPage({ data, theme, isDark }) {
    return (
      <div className="max-w-7xl mx-auto w-full px-4 py-12 animate-fade-in flex-1">
        <div className="mb-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div>
            <h1 className="text-4xl font-bold tracking-tighter mb-1 text-left">Live Energy Monitor</h1>
            <p className={`font-medium ${theme.textMuted}`}>Device ID: <span className="text-blue-500 font-mono">BBX-LTP-001</span> | Main Incomer</p>
          </div>
          <div className="flex gap-3">
             <button className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold border ${isDark ? 'border-white/10 hover:bg-white/5' : 'border-black/10 hover:bg-black/5'}`}>
                <Download size={16} /> Export Reports
             </button>
             <button className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold border ${isDark ? 'border-white/10 hover:bg-white/5' : 'border-black/10 hover:bg-black/5'}`}>
                <History size={16} /> History
             </button>
          </div>
        </div>
  
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-12">
          {/* Main Power Graph */}
          <div className={`lg:col-span-3 rounded-[2.5rem] p-8 ${theme.glassBase} flex flex-col justify-between overflow-hidden relative border-blue-500/20`}>
             <div className="flex justify-between items-start mb-8 text-left">
                <div>
                    <p className={`text-xs uppercase font-bold tracking-widest ${theme.textMuted}`}>Total Power Load (kW)</p>
                    <div className="text-6xl font-bold tracking-tighter tabular-nums">{data.totalKw}</div>
                </div>
                <div className="flex flex-col items-end gap-2">
                    <div className="px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 text-[10px] font-bold uppercase tracking-widest flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span> Connected
                    </div>
                </div>
             </div>
             <div className="h-56 w-full mt-auto relative">
                <svg viewBox="0 0 200 100" className="w-full h-full overflow-visible" preserveAspectRatio="none">
                    <path 
                        d={`M 0 100 ${data.history.map((val, i) => `L ${(i / (data.history.length - 1)) * 200} ${100 - (val - 50)}`).join(' ')} V 100 Z`}
                        fill="rgba(59, 130, 246, 0.08)"
                    />
                    <path 
                        d={data.history.map((val, i) => `${i === 0 ? 'M' : 'L'} ${(i / (data.history.length - 1)) * 200} ${100 - (val - 50)}`).join(' ')}
                        fill="none" stroke="#3b82f6" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
                    />
                </svg>
             </div>
          </div>

          {/* Quick Info Column */}
          <div className="space-y-6 text-left">
            <div className={`rounded-3xl p-6 ${theme.glassBase}`}>
                <p className={`text-[10px] uppercase font-bold tracking-widest ${theme.textMuted} mb-2`}>Today's Energy</p>
                <div className="text-3xl font-bold tabular-nums">{Math.floor(data.kwh)} <span className="text-sm font-medium opacity-40">kWh</span></div>
            </div>
            <div className={`rounded-3xl p-6 ${theme.glassBase}`}>
                <p className={`text-[10px] uppercase font-bold tracking-widest ${theme.textMuted} mb-2`}>Grid Frequency</p>
                <div className="text-3xl font-bold tabular-nums">{data.hz} <span className="text-sm font-medium opacity-40">Hz</span></div>
            </div>
            <div className={`rounded-3xl p-6 ${theme.glassBase}`}>
                <p className={`text-[10px] uppercase font-bold tracking-widest ${theme.textMuted} mb-2`}>Average PF</p>
                <div className="text-3xl font-bold tabular-nums">0.98</div>
            </div>
          </div>
        </div>
  
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <PhaseCard title="Phase R" code="L1" color="rgb(239, 68, 68)" data={data.r} theme={theme} isDark={isDark} />
          <PhaseCard title="Phase Y" code="L2" color="rgb(250, 204, 21)" data={data.y} theme={theme} isDark={isDark} />
          <PhaseCard title="Phase B" code="L3" color="rgb(59, 130, 246)" data={data.b} theme={theme} isDark={isDark} />
        </div>
      </div>
    );
  }

function PhaseCard({ title, code, color, data, theme, isDark }) {
    const radius = 35;
    const circumference = 2 * Math.PI * radius;
    const voltProgress = ((data.v - 200) / 60) * circumference;
    const loadProgress = (data.kw / 50) * circumference;

    return (
        <div className={`rounded-[2.5rem] p-8 ${theme.glassBase} border-t-4`} style={{ borderTopColor: color }}>
            <div className="flex justify-between items-center mb-8">
                <span className="font-black text-2xl tracking-tighter text-left">{title}</span>
                <div className="px-2 py-1 rounded bg-white/5 border border-white/10 font-mono text-[10px] font-bold">{code}</div>
            </div>
            <div className="grid grid-cols-2 gap-8 mb-6 text-center">
                <div>
                    <svg className="w-20 h-20 mx-auto rotate-[-90deg]">
                        <circle cx="40" cy="40" r={radius} fill="none" stroke={isDark ? "#222" : "#eee"} strokeWidth="6" />
                        <circle cx="40" cy="40" r={radius} fill="none" stroke={color} strokeWidth="6" strokeDasharray={circumference} strokeDashoffset={circumference - voltProgress} strokeLinecap="round" />
                    </svg>
                    <div className="mt-2 text-sm font-bold">{data.v}V</div>
                </div>
                <div>
                    <svg className="w-20 h-20 mx-auto rotate-[-90deg]">
                        <circle cx="40" cy="40" r={radius} fill="none" stroke={isDark ? "#222" : "#eee"} strokeWidth="6" />
                        <circle cx="40" cy="40" r={radius} fill="none" stroke="#10b981" strokeWidth="6" strokeDasharray={circumference} strokeDashoffset={circumference - loadProgress} strokeLinecap="round" />
                    </svg>
                    <div className="mt-2 text-sm font-bold">{data.kw}kW</div>
                </div>
            </div>
            <div className="space-y-3 pt-4 border-t border-white/5 text-xs font-bold uppercase tracking-widest">
                <div className="flex justify-between text-left"><span className="opacity-50">Current</span><span>{data.i} A</span></div>
                <div className="flex justify-between text-left"><span className="opacity-50">P.F.</span><span className="text-blue-500">{data.pf}</span></div>
            </div>
        </div>
    )
}

function InstallationPage({ theme, isDark }) {
  return (
    <div className="max-w-6xl mx-auto w-full px-4 py-16 animate-fade-in flex-1">
      <div className="text-center mb-16">
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-blue-500 text-white mb-6 shadow-2xl shadow-blue-500/40">
          <PenTool className="w-10 h-10" />
        </div>
        <h1 className="text-5xl md:text-7xl font-bold tracking-tighter mb-4">Installation Guide.</h1>
        <p className={`text-xl font-medium max-w-2xl mx-auto ${theme.textMuted}`}>Professional technical guide for BLACKBOX (TM) industrial deployment.</p>
      </div>

      <div className="space-y-40 mb-32">
        {/* Step 1: Mounting Options */}
        <div className="grid md:grid-cols-2 gap-16 items-center">
            <div className="space-y-6 text-left">
                <div className="w-14 h-14 rounded-full bg-blue-500 text-white flex items-center justify-center text-2xl font-bold">1</div>
                <h2 className="text-4xl font-bold tracking-tight">Step 1: Secure Mounting</h2>
                <p className={`text-lg leading-relaxed ${theme.textMuted}`}>Choose between two flexible mounting options based on your LT panel configuration. Both methods ensure secure fitment in high-vibration industrial environments.</p>
                <div className="grid grid-cols-1 gap-4">
                    <div className="p-4 rounded-xl border border-blue-500/20 bg-blue-500/5">
                        <p className="font-bold text-blue-500">Option A: 35mm DIN-Rail</p>
                        <p className="text-sm opacity-70">Standard snap-on fit for industrial control panels.</p>
                    </div>
                    <div className="p-4 rounded-xl border border-white/10 bg-white/5">
                        <p className="font-bold text-zinc-400">Option B: Surface Plate</p>
                        <p className="text-sm opacity-70">Fixed screw mounting via corner standoffs.</p>
                    </div>
                </div>
            </div>
            <div className={`rounded-[3rem] p-10 aspect-square flex items-center justify-center relative ${theme.glassBase}`}>
                <svg viewBox="0 0 400 400" className="w-full h-full">
                    <rect x="50" y="200" width="300" height="30" fill="#333" rx="2" />
                    <rect x="50" y="205" width="300" height="5" fill="#222" />
                    <rect x="150" y="80" width="100" height="150" rx="4" fill="#000" stroke="#3b82f6" strokeWidth="2" />
                    <circle cx="230" cy="100" r="5" fill="#10b981" className="led-status" />
                    <circle cx="160" cy="90" r="3" fill="#444" />
                    <circle cx="240" cy="90" r="3" fill="#444" />
                    <circle cx="160" cy="220" r="3" fill="#444" />
                    <circle cx="240" cy="220" r="3" fill="#444" />
                    <text x="170" y="160" className="fill-white font-mono text-[8px]">BLACKBOX PRO</text>
                </svg>
            </div>
        </div>

        {/* Step 2: Power Connection (L & N) */}
        <div className="grid md:grid-cols-2 gap-16 items-center">
            <div className={`rounded-[3rem] p-10 aspect-square flex items-center justify-center relative order-2 md:order-1 ${theme.glassBase}`}>
                <svg viewBox="0 0 400 400" className="w-full h-full">
                    <rect x="150" y="100" width="100" height="200" rx="8" fill="#111" stroke="#3b82f6" strokeWidth="2" />
                    <text x="165" y="130" className="fill-blue-500 font-mono text-[10px]">POWER INPUT</text>
                    <circle cx="180" cy="270" r="8" fill="#333" stroke="#555" />
                    <circle cx="220" cy="270" r="8" fill="#333" stroke="#555" />
                    <text x="175" y="295" className="fill-zinc-500 font-bold text-[10px]">L</text>
                    <text x="215" y="295" className="fill-zinc-500 font-bold text-[10px]">N</text>
                    <path d="M180 380 V 278" stroke="#ef4444" strokeWidth="3" fill="none" strokeDasharray="5,5" />
                    <path d="M220 380 V 278" stroke="#555" strokeWidth="3" fill="none" strokeDasharray="5,5" />
                    <text x="120" y="360" className="fill-red-500 font-bold text-[10px]">PHASE (L)</text>
                    <text x="240" y="360" className="fill-zinc-500 font-bold text-[10px]">NEUTRAL (N)</text>
                </svg>
            </div>
            <div className="space-y-6 order-1 md:order-2 text-left">
                <div className="w-14 h-14 rounded-full bg-blue-500 text-white flex items-center justify-center text-2xl font-bold">2</div>
                <h2 className="text-4xl font-bold tracking-tight">Step 2: Power Connection</h2>
                <p className={`text-lg leading-relaxed ${theme.textMuted}`}>Connect the main power supply to the device. Bring the <b>Phase (Line)</b> wire to the 'L' terminal and the <b>Neutral</b> wire to the 'N' terminal. This 230V AC input powers the internal logic.</p>
            </div>
        </div>

        {/* Step 3: Voltage RYBN */}
        <div className="grid md:grid-cols-2 gap-16 items-center">
            <div className="space-y-6 text-left">
                <div className="w-14 h-14 rounded-full bg-red-500 text-white flex items-center justify-center text-2xl font-bold">3</div>
                <h2 className="text-4xl font-bold tracking-tight">Step 3: Voltage RYBN Wiring</h2>
                <p className={`text-lg leading-relaxed ${theme.textMuted}`}>Connect the four voltage reference leads to your LT panel busbars. Use the standard color code: <b>Red</b> to Phase 1, <b>Yellow</b> to Phase 2, <b>Blue</b> to Phase 3, and <b>Black</b> to the Neutral (N) busbar.</p>
            </div>
            <div className={`rounded-[3rem] p-10 aspect-square flex items-center justify-center relative ${theme.glassBase}`}>
                <svg viewBox="0 0 400 400" className="w-full h-full">
                    <rect x="50" y="60" width="300" height="15" fill="#ef4444" rx="2" />
                    <rect x="50" y="90" width="300" height="15" fill="#facc15" rx="2" />
                    <rect x="50" y="120" width="300" height="15" fill="#3b82f6" rx="2" />
                    <rect x="50" y="150" width="300" height="15" fill="#555" rx="2" />
                    <text x="360" y="72" className="fill-red-500 font-bold text-[12px]">R</text>
                    <text x="360" y="102" className="fill-yellow-500 font-bold text-[12px]">Y</text>
                    <text x="360" y="132" className="fill-blue-500 font-bold text-[12px]">B</text>
                    <text x="360" y="162" className="fill-zinc-500 font-bold text-[12px]">N</text>
                    <path d="M100 75 V 300" stroke="#ef4444" strokeWidth="2" strokeDasharray="5,5" />
                    <path d="M150 105 V 300" stroke="#facc15" strokeWidth="2" strokeDasharray="5,5" />
                    <path d="M200 135 V 300" stroke="#3b82f6" strokeWidth="2" strokeDasharray="5,5" />
                    <path d="M250 165 V 300" stroke="#888" strokeWidth="2" strokeDasharray="5,5" />
                </svg>
            </div>
        </div>

        {/* Step 4: Current CTs */}
        <div className="grid md:grid-cols-2 gap-16 items-center">
            <div className={`rounded-[3rem] p-10 aspect-square flex items-center justify-center relative order-2 md:order-1 ${theme.glassBase}`}>
                <svg viewBox="0 0 400 400" className="w-full h-full">
                    <rect x="80" y="50" width="30" height="300" fill="#ef4444" rx="15" />
                    <rect x="185" y="50" width="30" height="300" fill="#facc15" rx="15" />
                    <rect x="290" y="50" width="30" height="300" fill="#3b82f6" rx="15" />
                    <rect x="70" y="150" width="50" height="40" rx="5" fill="none" stroke="#fff" strokeWidth="4" />
                    <rect x="175" y="180" width="50" height="40" rx="5" fill="none" stroke="#fff" strokeWidth="4" />
                    <rect x="280" y="210" width="50" height="40" rx="5" fill="none" stroke="#fff" strokeWidth="4" />
                    <text x="75" y="175" className="fill-white font-bold text-[10px]">CT1</text>
                    <text x="180" y="205" className="fill-white font-bold text-[10px]">CT2</text>
                    <text x="285" y="235" className="fill-white font-bold text-[10px]">CT3</text>
                </svg>
            </div>
            <div className="space-y-6 order-1 md:order-2 text-left">
                <div className="w-14 h-14 rounded-full bg-emerald-500 text-white flex items-center justify-center text-2xl font-bold">4</div>
                <h2 className="text-4xl font-bold tracking-tight">Step 4: Current Sensors (CT 1-3)</h2>
                <p className={`text-lg leading-relaxed ${theme.textMuted}`}>Snap the split-core CT sensors around the main phase cables. Match CT1 to the Red cable, CT2 to Yellow, and CT3 to Blue. Ensure the arrow on each sensor points towards the load.</p>
            </div>
        </div>

        {/* Step 5: Software Configuration */}
        <div className="grid md:grid-cols-2 gap-16 items-center">
            <div className="space-y-6 text-left">
                <div className="w-14 h-14 rounded-full bg-purple-500 text-white flex items-center justify-center text-2xl font-bold">5</div>
                <h2 className="text-4xl font-bold tracking-tight">Step 5: Software Configuration</h2>
                <p className={`text-lg leading-relaxed ${theme.textMuted}`}>Power the unit. Connect your laptop to the <b>'ESP Meter'</b> Wi-Fi. Access 192.168.4.1 in your browser to configure: Wi-Fi SSID, Password, Static IP, API Endpoint, and CT Ratio.</p>
            </div>
            <div className={`rounded-[3rem] p-10 aspect-square flex flex-col justify-center ${theme.glassBase}`}>
                <div className="bg-black/40 rounded-xl p-6 font-mono text-xs space-y-4 shadow-2xl text-left">
                    <div className="flex justify-between border-b border-white/10 pb-2">
                        <span className="text-blue-400">Settings</span>
                        <span className="text-emerald-400">Value</span>
                    </div>
                    <div className="flex justify-between"><span>SSID:</span><span className="text-zinc-400">ESP Meter</span></div>
                    <div className="flex justify-between"><span>PASS:</span><span className="text-zinc-400">********</span></div>
                    <div className="flex justify-between"><span>IP:</span><span className="text-blue-500">192.168.1.105</span></div>
                    <div className="flex justify-between"><span>API:</span><span className="text-purple-400">api.blackbox.io</span></div>
                    <div className="flex justify-between border-t border-white/10 pt-2 font-bold">
                        <span className="text-yellow-500">CT_RATIO:</span><span className="text-white">2000:1</span>
                    </div>
                </div>
                <div className="mt-8 flex justify-center gap-6">
                    <Laptop className="text-blue-500 w-8 h-8" />
                    <Wifi className="text-emerald-500 w-8 h-8 animate-pulse" />
                </div>
            </div>
        </div>
      </div>
    </div>
  );
}

function PricingPage({ theme, isDark, setCurrentPage }) {
    return (
      <div className="max-w-7xl mx-auto w-full px-4 py-16 animate-fade-in flex-1">
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-7xl font-bold tracking-tighter mb-6 text-center">Choose your power.</h1>
          <p className={`text-xl max-w-2xl mx-auto font-medium tracking-tight ${theme.textMuted} text-center`}>
            Transparent plans designed for every scale, from small workshops to massive industrial plants.
          </p>
        </div>
  
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <PricingCard 
            title="Lite" price="9,999" icon={<Zap className="w-8 h-8 text-blue-400" />}
            desc="Perfect for single machine monitoring or small workshops."
            features={["1x Black Box Core Board", "3x 100A Split-Core CTs", "Real-time Dashboard", "7-day Data History"]}
            theme={theme} onCta={() => setCurrentPage('contact')}
          />
          <PricingCard 
            title="Advance" price="19,999" featured={true} icon={<Briefcase className="w-8 h-8 text-emerald-400" />}
            desc="Best for mid-sized factories needing load automation."
            features={["Everything in Lite", "3x 250A Industrial CTs", "Active Load Shedding", "90-day Data History"]}
            theme={theme} onCta={() => setCurrentPage('contact')}
          />
          <PricingCard 
            title="Premium" price="34,999" icon={<Gem className="w-8 h-8 text-purple-400" />}
            desc="Enterprise solution for large-scale grid management."
            features={["Everything in Advance", "500A+ Scalable CTs", "Full API & MQTT Access", "Lifetime Data Storage"]}
            theme={theme} onCta={() => setCurrentPage('contact')}
          />
        </div>
      </div>
    );
}

function PricingCard({ title, price, desc, features, theme, onCta, featured = false, icon }) {
    return (
      <div className={`rounded-[2.5rem] p-8 md:p-10 flex flex-col border transition-all duration-500 hover:scale-[1.02] ${featured ? 'bg-blue-600/10 border-blue-500 shadow-2xl shadow-blue-500/20' : theme.glassBase}`}>
        <div className="mb-6 text-left">
          <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 ${featured ? 'bg-blue-500 text-white shadow-lg shadow-blue-500/40' : 'bg-zinc-800 text-zinc-400'}`}>
            {icon}
          </div>
          <h3 className="text-2xl font-bold mb-2">{title}</h3>
          <p className={`text-sm font-medium mb-6 ${theme.textMuted}`}>{desc}</p>
          <div className="flex items-baseline gap-1">
            <span className="text-4xl font-bold tracking-tighter">Rs. {price}</span>
            <span className={`text-sm font-semibold ${theme.textMuted}`}>/ kit</span>
          </div>
        </div>
        <ul className="space-y-4 mb-10 flex-1 text-left">
          {features.map((f, i) => (
            <li key={i} className="flex items-start gap-3 text-sm font-medium">
              <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
              <span>{f}</span>
            </li>
          ))}
        </ul>
        <button onClick={onCta} className={`w-full py-4 rounded-2xl font-bold transition-all ${featured ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-500/30' : 'bg-white text-black hover:bg-zinc-200'}`}>
          Select {title}
        </button>
      </div>
    );
}

function ContactPage({ theme, isDark }) {
    return (
      <div className="max-w-5xl mx-auto w-full px-4 py-16 animate-fade-in flex-1">
        <div className="grid md:grid-cols-2 gap-20">
          <div className="space-y-12 text-left">
              <h1 className="text-5xl font-bold tracking-tighter">Let's talk scale.</h1>
              <div className="space-y-6">
                  <div className="flex gap-4">
                      <MapPin className="text-blue-500 shrink-0" />
                      <div>
                          <p className="font-bold">Headquarters</p>
                          <p className="text-sm opacity-70">Benchmark Complex, S S Ravi Shankar Marg, DGP Nagar-1, Above GPS99 Restaurant, Nashik, Maharashtra - 422006</p>
                      </div>
                  </div>
                  <div className="flex gap-4">
                      <Phone className="text-blue-500 shrink-0" />
                      <div>
                          <p className="font-bold">Contact Numbers</p>
                          <p className="text-sm opacity-70">+91 9595364574 / 8888884999</p>
                      </div>
                  </div>
                  <div className="flex gap-4">
                      <Mail className="text-blue-500 shrink-0" />
                      <div>
                          <p className="font-bold">Sales & Support</p>
                          <p className="text-sm opacity-70 font-bold text-blue-500">sales@bslenergy.in</p>
                      </div>
                  </div>
              </div>
          </div>
          <div className={`p-8 md:p-12 rounded-[3rem] ${theme.glassBase}`}>
            <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <InputField icon={<User />} placeholder="First Name" theme={theme} />
                <InputField icon={<User />} placeholder="Last Name" theme={theme} />
              </div>
              <InputField icon={<Mail />} placeholder="Work Email" type="email" theme={theme} />
              <InputField icon={<Building2 />} placeholder="Company Name" theme={theme} />
              <div className="relative group text-left">
                <Info className={`absolute left-4 top-4 w-5 h-5 transition-colors group-focus-within:text-blue-500 ${theme.textMuted}`} />
                <textarea placeholder="Tell us about your project" rows="4" className={`w-full pl-12 pr-4 py-4 rounded-2xl focus:outline-none focus:ring-1 transition-all text-sm font-medium placeholder:${theme.textMuted} ${theme.input}`}></textarea>
              </div>
              <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 rounded-2xl transition-all flex items-center justify-center gap-2 mt-2 group shadow-[0_0_20px_rgba(0,102,204,0.3)] hover:shadow-[0_0_30px_rgba(0,102,204,0.5)]">
                Send Message <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </form>
          </div>
        </div>
      </div>
    );
}

// --- Reusable Mini Components ---

function FeatureItem({ icon, title, desc, theme }) {
    return (
        <div className="flex gap-6 text-left">
            <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0">
                {icon}
            </div>
            <div>
                <h3 className="text-xl font-bold mb-1 tracking-tight">{title}</h3>
                <p className={`text-sm font-medium leading-relaxed ${theme.textMuted}`}>{desc}</p>
            </div>
        </div>
    );
}

function InputField({ icon, placeholder, theme, type="text" }) {
  return (
    <div className="relative group text-left">
      {React.cloneElement(icon, { className: `absolute left-4 top-3.5 w-5 h-5 transition-colors group-focus-within:text-blue-500 ${theme.textMuted}` })}
      <input type={type} placeholder={placeholder} className={`w-full pl-12 pr-4 py-3.5 rounded-2xl focus:outline-none focus:ring-1 transition-all text-sm font-medium placeholder:${theme.textMuted} ${theme.input}`} />
    </div>
  );
}
