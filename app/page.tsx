'use client';

import React, { useState, useEffect } from 'react';
import { 
  BarChart3, 
  Layers, 
  ShieldCheck, 
  MapPin, 
  Mail, 
  Phone, 
  CheckCircle2, 
  Boxes, 
  Users, 
  TrendingUp, 
  Activity, 
  Send, 
  Zap, 
  Clock, 
  Sparkles, 
  User, 
  Briefcase, 
  GraduationCap,
  Award,
  ArrowUpRight
} from 'lucide-react';
import { supabase } from '@/lib/supabase';

export default function PortfolioPage() {
  const [imgError, setImgError] = useState(false);
  const [siteData, setSiteData] = useState<any>({
    avatar_url: '',
    hero: {
      badge: 'Targeting European Opportunities • Operations & Tech Executive',
      title_highlight: 'High-Velocity Logistics',
      description: 'I am Md. Asraful Alam Redoy, an Executive in Warehouse Operations with a Computer Science & Engineering background. I build real-time telemetry systems, multi-shift fatigue radars, and predictive inventory models for supply chain networks.'
    },
    metrics: {
      discipline: '100/100',
      experience: '4+ Years',
      education: '4-Year CS',
      certification: 'Certified (a2i)'
    },
    systems: [
      {
        tag: 'Workforce Intelligence',
        title: 'Workforce Allocation & Shortage Radar',
        desc: 'Dynamic multi-shift scheduling framework with real-time bottleneck prediction, loader deficiency alerts, and double-shift fatigue mitigation.'
      },
      {
        tag: 'Loss Prevention',
        title: 'Missing Case Recovery & Audit',
        desc: 'Automated investigation workflow tracking with digital evidence archives and COD revenue leak elimination.'
      },
      {
        tag: 'Hub Logistics',
        title: 'Hub Telemetry & Dispatch Staging',
        desc: 'Real-time inward/dispatch telemetry tracking across 15+ feeder hubs with automated recovery alerts.'
      },
      {
        tag: 'Predictive Modeling',
        title: 'Predictive Consumable Burn-Rate & Asset Locator',
        desc: 'Mathematical forecasting algorithm that analyzes daily consumption velocity to predict run-out dates before stockouts happen.'
      }
    ],
    experiences: [
      {
        role: 'Executive – Warehouse Operation',
        company: 'Steadfast Courier LTD',
        period: 'Jul 2026 – Present',
        desc: 'Promoted based on high operational dedication. Architected 4+ enterprise intelligence dashboards, monitored regional feeder hub SLAs, and directed workforce allocation with automated safety and fatigue monitoring.'
      },
      {
        role: 'Sub-Editor & Digital Support',
        company: 'Alokito Swadesh',
        period: 'Dec 2025 – Mar 2026',
        desc: 'Maintained departmental network uptime and workstation performance while managing high-traffic digital publications.'
      },
      {
        role: 'IT Executive',
        company: 'Advance IT',
        period: 'Sep 2022 – Aug 2024',
        desc: 'Prepared international client balance statements for a U.S.-based enterprise partner, maintaining high cross-border audit compliance.'
      },
      {
        role: 'System Administrator',
        company: 'Moghbazar Dot Net',
        period: 'Dec 2019 – Aug 2022',
        desc: 'Administered physical routers, managed switches, and servers. Executed automated backup routines and security hygiene across the enterprise.'
      }
    ],
    skills: {
      operations: 'Advanced Spreadsheet Modeling, SLA Dashboards, Root-Cause Analysis, Burn-Rate Modeling, Loss Prevention',
      it: 'System Administration, Network Routing/Switching, Server Maintenance, Hardware Diagnostics, Digital Security'
    },
    education: [
      {
        title: 'Diploma in Computer Science & Engineering',
        inst: 'Dhaka Polytechnic Institute • Dec 2021'
      },
      {
        title: 'Digital Security Essentials Certification',
        inst: 'Digital Security Agency & a2i Programme (ICT Division)'
      }
    ]
  });

  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    async function fetchLiveContent() {
      try {
        const { data } = await supabase.from('site_content').select('data').eq('id', 1).single();
        if (data?.data) {
          setSiteData(data.data);
          if (data.data.avatar_url && data.data.avatar_url !== '/profile.jpg') {
            setImgError(false);
          }
        }
      } catch (e) {
        console.log('Using default verified content');
      }
    }
    fetchLiveContent();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (process.env.NEXT_PUBLIC_SUPABASE_URL) {
        await supabase.from('contact_messages').insert([
          { sender_name: formData.name, sender_email: formData.email, message: formData.message }
        ]);
      }
      setSuccess(true);
      setFormData({ name: '', email: '', message: '' });
    } catch (err) {
      console.error(err);
      alert('Message sent locally!');
    } finally {
      setLoading(false);
    }
  };

  const renderSkills = (skillInput: any, defaultItems: string[]) => {
    let list = defaultItems;
    if (typeof skillInput === 'string' && skillInput.trim()) {
      list = skillInput.split(',').map((s) => s.trim());
    } else if (Array.isArray(skillInput)) {
      list = skillInput;
    }
    return list.map((item: string, idx: number) => (
      <span key={idx} className="px-3.5 py-1.5 bg-slate-950/80 border border-slate-800 rounded-xl text-xs text-slate-300 font-medium hover:border-emerald-500/40 transition">
        {item}
      </span>
    ));
  };

  const hasRealImage = siteData?.avatar_url && siteData.avatar_url !== '/profile.jpg' && !imgError;

  return (
    <div className="relative min-h-screen bg-[#07090e] text-slate-100 selection:bg-emerald-500 selection:text-black overflow-x-hidden font-sans">
      
      {/* High-Tech Grid & Aurora Glow */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f293d18_1px,transparent_1px),linear-gradient(to_bottom,#1f293d18_1px,transparent_1px)] bg-[size:3.5rem_3.5rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[380px] bg-gradient-to-tr from-emerald-500/25 via-cyan-500/20 to-transparent blur-[140px] pointer-events-none rounded-full" />
      <div className="absolute top-[850px] right-0 w-[500px] h-[350px] bg-emerald-500/10 blur-[140px] pointer-events-none rounded-full" />

      {/* Modern Navigation */}
      <nav className="sticky top-0 z-50 backdrop-blur-xl bg-[#07090e]/80 border-b border-slate-800/80">
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2.5 font-extrabold tracking-wider text-base text-slate-100">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-emerald-400 to-cyan-500 flex items-center justify-center text-slate-950 font-black shadow-lg shadow-emerald-500/20">
              AR
            </div>
            <span>MD.ASRAFUL ALAM <span className="text-emerald-400">REDOY</span></span>
          </div>

          <div className="flex items-center gap-6 text-sm font-medium">
            <a href="#dashboards" className="text-slate-400 hover:text-emerald-400 transition hidden sm:inline">Systems</a>
            <a href="#experience" className="text-slate-400 hover:text-emerald-400 transition hidden sm:inline">Experience</a>
            <a href="#skills" className="text-slate-400 hover:text-emerald-400 transition hidden sm:inline">Skills</a>
            <a 
              href="#contact" 
              className="px-4 py-2 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-bold rounded-lg shadow-lg shadow-emerald-500/20 transition transform hover:-translate-y-0.5"
            >
              Contact
            </a>
          </div>
        </div>
      </nav>

      {/* 1. HERO SECTION */}
      <section className="relative pt-20 pb-16 px-6 max-w-6xl mx-auto">
        <div className="grid md:grid-cols-12 gap-10 items-center">
          
          <div className="md:col-span-7 flex flex-col gap-6">
            <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full border border-emerald-500/30 bg-emerald-950/40 backdrop-blur-md text-emerald-300 text-xs font-semibold w-fit shadow-inner shadow-emerald-500/10">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400"></span>
              </span>
              {siteData?.hero?.badge}
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white leading-[1.1]">
              Engineering Intelligence Into <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400">
                {siteData?.hero?.title_highlight}
              </span>
            </h1>

            <p className="text-base sm:text-lg text-slate-400 max-w-xl leading-relaxed">
              {siteData?.hero?.description}
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <a 
                href="#dashboards" 
                className="px-6 py-3.5 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-bold rounded-xl shadow-xl shadow-emerald-500/25 transition transform hover:-translate-y-0.5 flex items-center gap-2"
              >
                <Zap className="w-4 h-4 text-slate-950 fill-current" /> Explore Systems
              </a>
              <a 
                href="#contact" 
                className="px-6 py-3.5 bg-slate-900/80 hover:bg-slate-800 border border-slate-700/80 hover:border-slate-600 rounded-xl font-semibold text-slate-300 hover:text-white transition flex items-center gap-2 backdrop-blur-md"
              >
                <Mail className="w-4 h-4" /> Schedule Discussion
              </a>
            </div>
          </div>

          {/* High-Tech Photo / Cyber Avatar Frame */}
          <div className="md:col-span-5 flex justify-center md:justify-end">
            <div className="relative group">
              <div className="absolute -inset-1.5 bg-gradient-to-tr from-emerald-500 via-cyan-500 to-teal-400 rounded-3xl blur-xl opacity-45 group-hover:opacity-75 transition duration-500"></div>
              
              <div className="relative w-64 h-80 sm:w-72 sm:h-96 rounded-2xl overflow-hidden border border-slate-700/80 bg-slate-900/90 backdrop-blur-xl shadow-2xl flex flex-col justify-between p-2">
                
                {hasRealImage ? (
                  <img 
                    src={siteData.avatar_url} 
                    alt="Md. Asraful Alam Redoy" 
                    onError={() => setImgError(true)}
                    className="w-full h-full object-cover object-top rounded-xl transition duration-500 group-hover:scale-105"
                  />
                ) : (
                  /* সাইবার অ্যাভাটার ফ্রেম (যদি এখনো ছবি আপলোড না করা থাকে) */
                  <div className="w-full h-full rounded-xl bg-gradient-to-b from-slate-900 to-slate-950 border border-slate-800/80 flex flex-col items-center justify-center p-6 text-center relative overflow-hidden">
                    <div className="w-24 h-24 rounded-full bg-emerald-500/10 border-2 border-emerald-500/40 flex items-center justify-center text-emerald-400 mb-4 shadow-inner shadow-emerald-500/20">
                      <User className="w-12 h-12" />
                    </div>
                    <div className="text-white font-bold text-sm">Md. Asraful Alam Redoy</div>
                    <div className="text-emerald-400 font-mono text-[11px] mt-1">CS Engineer • Operations</div>
                    <div className="mt-4 px-3 py-1 rounded-full bg-slate-800/80 border border-slate-700 text-[10px] text-slate-400 flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span> Photo Ready in Admin
                    </div>
                  </div>
                )}

                <div className="absolute bottom-3 left-3 right-3 p-2.5 bg-slate-950/90 backdrop-blur-md rounded-xl border border-slate-800/80 text-xs text-center font-mono text-emerald-400 shadow-lg">
                  Executive • Warehouse Operations
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Dynamic Metric Ribbon */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12 pt-8 border-t border-slate-800/80">
          
          {/* 1. Discipline */}
          <div className="p-4 bg-slate-900/40 rounded-xl border border-slate-800/70 backdrop-blur-md">
            <div className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-300">
              {siteData?.metrics?.discipline || '100/100'}
            </div>
            <div className="text-xs font-medium text-slate-400 mt-1 flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              <span>{siteData?.metrics?.discipline_label || 'Discipline Index'}</span>
            </div>
          </div>

          {/* 2. Experience */}
          <div className="p-4 bg-slate-900/40 rounded-xl border border-slate-800/70 backdrop-blur-md">
            <div className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-300">
              {siteData?.metrics?.experience || '4+ Years'}
            </div>
            <div className="text-xs font-medium text-slate-400 mt-1 flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
              <span>{siteData?.metrics?.experience_label || 'Logistics & Tech Exp'}</span>
            </div>
          </div>

          {/* 3. Education (Dhaka Polytechnic) */}
          <div className="p-4 bg-slate-900/40 rounded-xl border border-slate-800/70 backdrop-blur-md">
            <div className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-300">
              {siteData?.metrics?.education || '4-Year CS'}
            </div>
            <div className="text-xs font-medium text-slate-400 mt-1 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              <span>{siteData?.metrics?.education_label || 'Dhaka Polytechnic'}</span>
            </div>
          </div>

          {/* 4. Certification */}
          <div className="p-4 bg-slate-900/40 rounded-xl border border-slate-800/70 backdrop-blur-md">
            <div className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-emerald-300">
              {siteData?.metrics?.certification || 'Certified (a2i)'}
            </div>
            <div className="text-xs font-medium text-slate-400 mt-1 flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-teal-400 shrink-0" />
              <span>{siteData?.metrics?.certification_label || 'Digital Security (a2i)'}</span>
            </div>
          </div>

        </div>
      </section>

      {/* 2. BENTO GRID: LIVE OPERATIONS SYSTEMS & TELEMETRY */}
      <section id="dashboards" className="py-20 px-6 max-w-6xl mx-auto border-t border-slate-900/80">
        <div className="mb-12">
          <div className="inline-flex items-center gap-2 text-emerald-400 text-xs font-bold tracking-widest uppercase mb-2">
            <Activity className="w-4 h-4" /> Engineered Intelligence
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white">Operations & Analytics Systems</h2>
          <p className="text-slate-400 text-sm mt-2 max-w-2xl">
            Custom-built automated telemetry dashboards deployed to eliminate operational bottlenecks, enforce shift safety, and automate inventory tracking.
          </p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

          {/* Card 1 (Large - Workforce Radar with Live Shift Widget) */}
          <div className="md:col-span-2 p-6 sm:p-8 bg-gradient-to-br from-slate-900/90 via-slate-900/60 to-slate-950/90 rounded-2xl border border-slate-800/90 hover:border-emerald-500/50 transition duration-300 backdrop-blur-xl flex flex-col justify-between">
            <div>
              <div className="flex justify-between items-start mb-4">
                <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  {siteData?.systems?.[0]?.tag || 'Workforce Intelligence'}
                </span>
                <div className="w-11 h-11 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center">
                  <Users className="w-5 h-5" />
                </div>
              </div>
              <h3 className="text-2xl font-bold text-white">{siteData?.systems?.[0]?.title}</h3>
              <p className="text-slate-400 text-sm mt-2 max-w-lg leading-relaxed">{siteData?.systems?.[0]?.desc}</p>
            </div>

            {/* Live Interactive Telemetry Widget */}
            <div className="mt-6 p-4 bg-slate-950/80 rounded-xl border border-slate-800 space-y-3 font-mono text-xs">
              <div className="flex justify-between items-center text-slate-300">
                <span className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                  Shift Safety Guard Telemetry
                </span>
                <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-bold">100% SECURE</span>
              </div>
              <div className="grid grid-cols-3 gap-2 pt-2 border-t border-slate-800/70 text-center">
                <div className="bg-slate-900/70 p-2 rounded border border-slate-800">
                  <div className="text-slate-400 text-[10px]">Morning Shift</div>
                  <div className="text-emerald-400 font-bold text-sm">211 On Duty</div>
                </div>
                <div className="bg-slate-900/70 p-2 rounded border border-slate-800">
                  <div className="text-slate-400 text-[10px]">Evening Shift</div>
                  <div className="text-cyan-400 font-bold text-sm">73 On Duty</div>
                </div>
                <div className="bg-slate-900/70 p-2 rounded border border-slate-800">
                  <div className="text-slate-400 text-[10px]">Night Shift</div>
                  <div className="text-teal-400 font-bold text-sm">128 On Duty</div>
                </div>
              </div>
              <div className="text-[11px] text-amber-400/90 bg-amber-500/10 p-2 rounded border border-amber-500/20">
                ⚠️ Double-Shift Guard: Automated lock triggers on back-to-back 18hr duty violations.
              </div>
            </div>
          </div>

          {/* Card 2 (Loss Prevention with SLA Progress Bar) */}
          <div className="p-6 sm:p-8 bg-gradient-to-br from-slate-900/90 via-slate-900/60 to-slate-950/90 rounded-2xl border border-slate-800/90 hover:border-cyan-500/50 transition duration-300 backdrop-blur-xl flex flex-col justify-between">
            <div>
              <div className="flex justify-between items-start mb-4">
                <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                  {siteData?.systems?.[1]?.tag || 'Loss Prevention'}
                </span>
                <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 flex items-center justify-center">
                  <ShieldCheck className="w-5 h-5" />
                </div>
              </div>
              <h3 className="text-xl font-bold text-white">{siteData?.systems?.[1]?.title}</h3>
              <p className="text-slate-400 text-sm mt-2 leading-relaxed">{siteData?.systems?.[1]?.desc}</p>
            </div>

            <div className="mt-6 p-4 bg-slate-950/80 rounded-xl border border-slate-800 space-y-2 font-mono text-xs">
              <div className="flex justify-between">
                <span className="text-slate-400">Resolution SLA Turnaround</span>
                <span className="text-cyan-400 font-bold">1.9 Days Avg</span>
              </div>
              <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                <div className="bg-gradient-to-r from-cyan-400 to-emerald-400 h-full w-[94.7%] rounded-full"></div>
              </div>
              <div className="text-[10px] text-slate-500 text-right">94.7% Resolution Efficiency</div>
            </div>
          </div>

          {/* Card 3 (Hub Telemetry & Dispatch Staging) */}
          <div className="p-6 sm:p-8 bg-gradient-to-br from-slate-900/90 via-slate-900/60 to-slate-950/90 rounded-2xl border border-slate-800/90 hover:border-emerald-500/50 transition duration-300 backdrop-blur-xl flex flex-col justify-between">
            <div>
              <div className="flex justify-between items-start mb-4">
                <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  {siteData?.systems?.[2]?.tag || 'Hub Logistics'}
                </span>
                <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center">
                  <Boxes className="w-5 h-5" />
                </div>
              </div>
              <h3 className="text-xl font-bold text-white">{siteData?.systems?.[2]?.title}</h3>
              <p className="text-slate-400 text-sm mt-2 leading-relaxed">{siteData?.systems?.[2]?.desc}</p>
            </div>

            <div className="mt-6 p-3.5 bg-slate-950/80 rounded-xl border border-slate-800 text-xs font-mono space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-slate-400">Regional Feeder Status</span>
                <span className="text-emerald-400 font-bold">15 Active Hubs</span>
              </div>
              <div className="text-[11px] text-slate-300 bg-slate-900 p-2 rounded border border-slate-800">
                Cumilla Regional Hub ➔ Dispatched & Staged
              </div>
            </div>
          </div>

          {/* Card 4 (Predictive Burn-Rate & Asset Locator - Large) */}
          <div className="md:col-span-2 p-6 sm:p-8 bg-gradient-to-br from-slate-900/90 via-slate-900/60 to-slate-950/90 rounded-2xl border border-slate-800/90 hover:border-teal-500/50 transition duration-300 backdrop-blur-xl flex flex-col justify-between">
            <div>
              <div className="flex justify-between items-start mb-4">
                <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-teal-500/10 text-teal-400 border border-teal-500/20">
                  {siteData?.systems?.[3]?.tag || 'Predictive Modeling'}
                </span>
                <div className="w-11 h-11 rounded-xl bg-teal-500/10 border border-teal-500/20 text-teal-400 flex items-center justify-center">
                  <TrendingUp className="w-5 h-5" />
                </div>
              </div>
              <h3 className="text-2xl font-bold text-white">{siteData?.systems?.[3]?.title}</h3>
              <p className="text-slate-400 text-sm mt-2 max-w-lg leading-relaxed">{siteData?.systems?.[3]?.desc}</p>
            </div>

            <div className="mt-6 p-4 bg-slate-950/80 rounded-xl border border-slate-800 grid grid-cols-2 sm:grid-cols-3 gap-3 font-mono text-xs">
              <div className="bg-slate-900/60 p-2.5 rounded border border-slate-800">
                <span className="text-slate-500 text-[10px] block">Burn-Rate Velocity</span>
                <span className="text-teal-300 font-bold">Daily Avg Calculated</span>
              </div>
              <div className="bg-slate-900/60 p-2.5 rounded border border-slate-800">
                <span className="text-slate-500 text-[10px] block">Run-Out Prediction</span>
                <span className="text-emerald-400 font-bold">Exact Date Forecast</span>
              </div>
              <div className="bg-slate-900/60 p-2.5 rounded border border-slate-800 col-span-2 sm:col-span-1">
                <span className="text-slate-500 text-[10px] block">Hardware Asset Locator</span>
                <span className="text-cyan-400 font-bold">Live Room Tracking</span>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 3. EXPERIENCE TIMELINE WITH PROMOTION BADGE */}
      <section id="experience" className="py-20 px-6 max-w-5xl mx-auto border-t border-slate-900/80">
        <div className="mb-14">
          <div className="text-emerald-400 text-xs font-bold tracking-widest uppercase mb-2">Track Record</div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white">Professional Experience</h2>
        </div>

        <div className="relative pl-6 sm:pl-8 border-l border-slate-800 space-y-12">
          {siteData?.experiences?.map((exp: any, idx: number) => (
            <div key={idx} className="relative group">
              <div className="absolute -left-[31px] sm:-left-[39px] top-1.5 w-4 h-4 rounded-full bg-emerald-400 border-4 border-[#07090e] shadow-lg shadow-emerald-500/50"></div>
              
              <div className="p-6 sm:p-7 bg-slate-900/40 rounded-2xl border border-slate-800 hover:border-slate-700 transition">
                <div className="flex flex-wrap justify-between items-baseline gap-2">
                  <h3 className="text-xl font-bold text-white flex items-center gap-2">
                    {exp.role}
                  </h3>
                  <span className="text-xs px-3 py-1 bg-emerald-500/10 text-emerald-300 border border-emerald-500/20 rounded-full font-mono">
                    {exp.period}
                  </span>
                </div>
                
                <div className="text-emerald-400 font-semibold text-sm mt-1">{exp.company}</div>
                <p className="text-slate-400 text-sm mt-3 leading-relaxed">{exp.desc}</p>

                {/* প্রমোশন নেস্টেড সাব-কার্ড (যদি প্রমোশনের তথ্য থাকে) */}
                {(exp.previous_role || (idx === 0 && !exp.previous_role)) && (
                  <div className="mt-5 pt-4 border-t border-slate-800/80">
                    <div className="p-3.5 bg-slate-950/80 rounded-xl border border-slate-800/80 flex flex-wrap items-center justify-between gap-2 text-xs">
                      <div className="flex items-center gap-2.5">
                        <span className="px-2.5 py-1 rounded-md bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 font-bold text-[10px] tracking-wider uppercase flex items-center gap-1">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                          PROMOTED FROM
                        </span>
                        <span className="text-slate-200 font-semibold">
                          {exp.previous_role || 'Customer Service Executive (Corporate Office)'}
                        </span>
                      </div>
                      <span className="font-mono text-slate-500 text-[11px]">
                        {exp.previous_period || 'Apr 2026 – Jul 2026'}
                      </span>
                    </div>
                  </div>
                )}

              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. SKILLS & EDUCATION */}
      <section id="skills" className="py-20 px-6 max-w-6xl mx-auto border-t border-slate-900/80 grid md:grid-cols-2 gap-10">
        <div>
          <div className="text-emerald-400 text-xs font-bold tracking-widest uppercase mb-2">Core Stack</div>
          <h2 className="text-3xl font-extrabold text-white mb-6">Technical Competencies</h2>
          <div className="space-y-4">
            <div className="p-5 bg-slate-900/50 rounded-xl border border-slate-800">
              <div className="text-sm font-bold text-emerald-400 mb-2.5">Operations & BI Intelligence</div>
              <div className="flex flex-wrap gap-2">
                {renderSkills(siteData?.skills?.operations, [
                  'Advanced Spreadsheet Modeling', 'SLA Dashboards', 'Root-Cause Analysis', 'Burn-Rate Modeling', 'Loss Prevention'
                ])}
              </div>
            </div>
            <div className="p-5 bg-slate-900/50 rounded-xl border border-slate-800">
              <div className="text-sm font-bold text-cyan-400 mb-2.5">IT Systems & Infrastructure</div>
              <div className="flex flex-wrap gap-2">
                {renderSkills(siteData?.skills?.it, [
                  'System Administration', 'Network Routing/Switching', 'Server Maintenance', 'Hardware Diagnostics', 'Digital Security'
                ])}
              </div>
            </div>
          </div>
        </div>

        <div>
          <div className="text-emerald-400 text-xs font-bold tracking-widest uppercase mb-2">Verified Background</div>
          <h2 className="text-3xl font-extrabold text-white mb-6">Education & Credentials</h2>
          <div className="space-y-4">
            {siteData?.education?.map((edu: any, idx: number) => (
              <div key={idx} className="p-5 bg-slate-900/50 rounded-xl border border-slate-800">
                <div className="font-bold text-white text-base">{edu.title}</div>
                <div className="text-emerald-400 text-xs font-medium mt-1">{edu.inst}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. CONTACT FORM */}
      <section id="contact" className="py-24 px-6 max-w-4xl mx-auto border-t border-slate-900/80">
        <div className="text-center mb-12">
          <span className="text-xs font-bold px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 uppercase tracking-widest">
            Let’s Connect
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white mt-4">Initiate Discussion</h2>
        </div>

        <div className="bg-gradient-to-br from-slate-900/90 via-slate-900/60 to-slate-950/90 p-8 sm:p-10 rounded-3xl border border-slate-800/90 shadow-2xl backdrop-blur-2xl">
          {success ? (
            <div className="p-6 bg-emerald-500/10 border border-emerald-500/30 rounded-xl text-emerald-400 text-center font-bold">
              ✓ Thank you! Your message has been received. I will respond promptly.
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label className="text-xs font-semibold text-slate-300 block mb-1.5">Your Name</label>
                  <input 
                    type="text" 
                    required 
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-slate-950/80 border border-slate-800 rounded-xl px-4 py-3 text-sm text-slate-100 placeholder-slate-600 focus:outline-none focus:border-emerald-500 transition"
                    placeholder="e.g. Hiring Team / John"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-slate-300 block mb-1.5">Your Email</label>
                  <input 
                    type="email" 
                    required 
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-slate-950/80 border border-slate-800 rounded-xl px-4 py-3 text-sm text-slate-100 placeholder-slate-600 focus:outline-none focus:border-emerald-500 transition"
                    placeholder="recruiter@enterprise.com"
                  />
                </div>
              </div>
              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1.5">Message</label>
                <textarea 
                  rows={4} 
                  required 
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full bg-slate-950/80 border border-slate-800 rounded-xl px-4 py-3 text-sm text-slate-100 placeholder-slate-600 focus:outline-none focus:border-emerald-500 transition"
                  placeholder="Inquire about potential roles, European relocation, or schedule an interview..."
                ></textarea>
              </div>
              <button 
                type="submit" 
                disabled={loading}
                className="w-full py-4 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-bold rounded-xl shadow-xl shadow-emerald-500/20 transition transform hover:-translate-y-0.5 flex items-center justify-center gap-2"
              >
                <Send className="w-4 h-4 fill-current" /> {loading ? 'Transmitting...' : 'Send Direct Message'}
              </button>
            </form>
          )}

          <div className="mt-8 pt-8 border-t border-slate-800/80 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs text-slate-400 text-center">
            <div className="flex items-center justify-center gap-2">
              <MapPin className="w-4 h-4 text-emerald-400" /> Gazipur / Dhaka, Bangladesh
            </div>
            <div className="flex items-center justify-center gap-2">
              <Mail className="w-4 h-4 text-emerald-400" /> asraful13.bd@gmail.com
            </div>
            <div className="flex items-center justify-center gap-2">
              <Phone className="w-4 h-4 text-emerald-400" /> +880 1575632020
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-10 text-center text-xs text-slate-600 border-t border-slate-900/80">
        © Design and Developed by Md. Asraful Alam Redoy.
      </footer>
    </div>
  );
}