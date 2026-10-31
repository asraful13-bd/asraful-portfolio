'use client';

import React, { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { 
  Shield, Upload, Save, LogOut, CheckCircle2, User, Mail, 
  Lock, LayoutDashboard, Briefcase, Cpu, Layers, Plus, Trash2
} from 'lucide-react';
import Link from 'next/link';

export default function AdminPage() {
  const [session, setSession] = useState<any>(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [authLoading, setAuthLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<'hero' | 'systems' | 'experience' | 'skills' | 'messages'>('hero');

  // Site Content State
  const [siteData, setSiteData] = useState<any>(null);
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [notification, setNotification] = useState('');
  const [messages, setMessages] = useState<any[]>([]);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      if (session) loadAllData();
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      if (session) loadAllData();
    });

    return () => subscription.unsubscribe();
  }, []);

  const loadAllData = async () => {
    const { data: content } = await supabase.from('site_content').select('data').eq('id', 1).single();
    if (content?.data) setSiteData(content.data);

    const { data: msgs } = await supabase.from('contact_messages').select('*').order('created_at', { ascending: false });
    if (msgs) setMessages(msgs);
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthLoading(true);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) alert('লগইন ব্যর্থ হয়েছে: ' + error.message);
    setAuthLoading(false);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setSession(null);
  };

  // ডিরেক্ট ছবি আপলোড
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      const file = e.target.files?.[0];
      if (!file) return;

      setUploading(true);
      const fileExt = file.name.split('.').pop();
      const fileName = `profile-${Date.now()}.${fileExt}`;

      const { error: uploadError } = await supabase.storage.from('portfolio').upload(fileName, file, { upsert: true });
      if (uploadError) throw uploadError;

      const { data: urlData } = supabase.storage.from('portfolio').getPublicUrl(fileName);
      const updatedData = { ...siteData, avatar_url: urlData.publicUrl };
      setSiteData(updatedData);

      await supabase.from('site_content').upsert({ id: 1, data: updatedData });
      setNotification('✓ ছবি সফলভাবে পরিবর্তন হয়েছে!');
      setTimeout(() => setNotification(''), 4000);
    } catch (err: any) {
      alert('ছবি আপলোডে সমস্যা: ' + err.message);
    } finally {
      setUploading(false);
    }
  };

  // সেভ ফাংশন
  const handleSaveAll = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setSaving(true);
    try {
      const { error } = await supabase.from('site_content').upsert({ id: 1, data: siteData });
      if (error) throw error;
      setNotification('✓ সকল পরিবর্তন সফলভাবে সংরক্ষিত ও লাইভ হয়েছে!');
      setTimeout(() => setNotification(''), 4000);
    } catch (err: any) {
      alert('সেভ ব্যর্থ হয়েছে: ' + err.message);
    } finally {
      setSaving(false);
    }
  };

  // -------------------------------------------------------------
  // নতুন আইটেম যুক্ত ও ডিলিট করার ফাংশনসমূহ (Add & Delete Handlers)
  // -------------------------------------------------------------

  // ১. নতুন চাকরি/অভিজ্ঞতা যোগ ও ডিলিট
  const handleAddExperience = () => {
    const newExp = {
      role: 'নতুন পদবীর নাম',
      company: 'কোম্পানির নাম',
      period: 'মাস সাল – বর্তমান',
      desc: 'কাজের দায়িত্ব ও অর্জনের বিবরণ লিখুন...',
      previous_role: '',
      previous_period: ''
    };
    setSiteData({
      ...siteData,
      experiences: [newExp, ...(siteData.experiences || [])]
    });
  };

  const handleDeleteExperience = (index: number) => {
    if (!confirm('আপনি কি নিশ্চিত এই চাকুরির তথ্য মুছে ফেলতে চান?')) return;
    const updated = siteData.experiences.filter((_: any, idx: number) => idx !== index);
    setSiteData({ ...siteData, experiences: updated });
  };

  // ২. নতুন ড্যাশবোর্ড/সিস্টেম যোগ ও ডিলিট
  const handleAddSystem = () => {
    const newSys = {
      tag: 'নতুন ক্যাটাগরি',
      title: 'সিস্টেম বা ড্যাশবোর্ডের নাম',
      desc: 'এই সিস্টেম দিয়ে কী কী মনিটরিং বা অপারেশনাল কাজ করা হয় তার বিবরণ...'
    };
    setSiteData({
      ...siteData,
      systems: [...(siteData.systems || []), newSys]
    });
  };

  const handleDeleteSystem = (index: number) => {
    if (!confirm('আপনি কি নিশ্চিত এই ড্যাশবোর্ডটি মুছে ফেলতে চান?')) return;
    const updated = siteData.systems.filter((_: any, idx: number) => idx !== index);
    setSiteData({ ...siteData, systems: updated });
  };

  // ৩. নতুন ডিগ্রি/সার্টিফিকেশন যোগ ও ডিলিট
  const handleAddEducation = () => {
    const newEdu = {
      title: 'নতুন ডিগ্রি বা সার্টিফিকেটের নাম',
      inst: 'শিক্ষা প্রতিষ্ঠান বা প্রতিষ্ঠানের নাম • সাল'
    };
    setSiteData({
      ...siteData,
      education: [...(siteData.education || []), newEdu]
    });
  };

  const handleDeleteEducation = (index: number) => {
    if (!confirm('আপনি কি নিশ্চিত এই শিক্ষাগত যোগ্যতা মুছে ফেলতে চান?')) return;
    const updated = siteData.education.filter((_: any, idx: number) => idx !== index);
    setSiteData({ ...siteData, education: updated });
  };

  if (!session) {
    return (
      <div className="min-h-screen bg-[#07090e] flex items-center justify-center p-6 text-slate-100 font-sans">
        <div className="w-full max-w-md bg-slate-900/90 border border-slate-800 p-8 rounded-3xl shadow-2xl backdrop-blur-xl">
          <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto mb-5">
            <Lock className="w-7 h-7" />
          </div>
          <h2 className="text-2xl font-black text-center text-white">Super Admin Portal</h2>
          <p className="text-slate-400 text-xs text-center mt-1 mb-8">Sign in with your verified Supabase credentials</p>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="text-xs text-slate-300 font-medium block mb-1.5">Admin Email</label>
              <input 
                type="email" 
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-slate-200 focus:outline-none focus:border-emerald-500"
              />
            </div>
            <div>
              <label className="text-xs text-slate-300 font-medium block mb-1.5">Password</label>
              <input 
                type="password" 
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-slate-200 focus:outline-none focus:border-emerald-500"
              />
            </div>
            <button 
              type="submit" 
              disabled={authLoading}
              className="w-full py-3.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-extrabold rounded-xl shadow-lg transition mt-2"
            >
              {authLoading ? 'Signing In...' : 'Sign In as Super Admin'}
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#07090e] text-slate-100 p-6 md:p-12 font-sans">
      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* Top Header */}
        <div className="flex flex-wrap justify-between items-center pb-6 border-b border-slate-800 gap-4">
          <div>
            <h1 className="text-2xl font-black text-white flex items-center gap-2.5">
              <Shield className="w-6 h-6 text-emerald-400" /> CMS & Master Control Center
            </h1>
            <p className="text-slate-400 text-xs mt-1">Logged in: <span className="text-emerald-400 font-mono">{session.user.email}</span></p>
          </div>
          <div className="flex items-center gap-3">
            <button 
              onClick={() => handleSaveAll()}
              disabled={saving}
              className="px-5 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs rounded-xl shadow-lg transition flex items-center gap-2"
            >
              <Save className="w-4 h-4" /> {saving ? 'Saving...' : 'Save All Changes'}
            </button>
            <Link href="/" target="_blank" className="px-4 py-2.5 bg-slate-900 border border-slate-800 hover:border-slate-700 text-xs text-slate-300 rounded-xl">
              Live Site ↗
            </Link>
            <button 
              onClick={handleLogout}
              className="px-4 py-2.5 bg-rose-500/10 border border-rose-500/20 text-rose-400 hover:bg-rose-500/20 text-xs font-semibold rounded-xl flex items-center gap-1.5"
            >
              <LogOut className="w-3.5 h-3.5" /> Sign Out
            </button>
          </div>
        </div>

        {/* Save Notification */}
        {notification && (
          <div className="p-4 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs rounded-xl flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4" /> {notification}
          </div>
        )}

        {/* CMS Tabs Navigation */}
        <div className="flex flex-wrap gap-2 border-b border-slate-800 pb-3">
          {[
            { id: 'hero', label: '1. Profile & Hero', icon: User },
            { id: 'systems', label: `2. Operations Systems (${siteData?.systems?.length || 0})`, icon: Layers },
            { id: 'experience', label: `3. Work Experience (${siteData?.experiences?.length || 0})`, icon: Briefcase },
            { id: 'skills', label: `4. Skills & Education (${siteData?.education?.length || 0})`, icon: Cpu },
            { id: 'messages', label: `5. Messages (${messages.length})`, icon: Mail },
          ].map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-4 py-2.5 rounded-xl text-xs font-bold transition flex items-center gap-2 ${
                  activeTab === tab.id 
                    ? 'bg-emerald-500 text-slate-950 shadow-lg shadow-emerald-500/20' 
                    : 'bg-slate-900/60 text-slate-400 hover:text-slate-200 border border-slate-800'
                }`}
              >
                <Icon className="w-4 h-4" /> {tab.label}
              </button>
            );
          })}
        </div>

        {/* TAB 1: Profile & Hero */}
        {activeTab === 'hero' && siteData && (
          <div className="space-y-6">
            <div className="bg-slate-900/60 border border-slate-800 p-8 rounded-3xl backdrop-blur-xl">
              <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                <Upload className="w-5 h-5 text-emerald-400" /> প্রোফাইল ছবি সরাসরি আপলোড করুন
              </h2>
              <div className="flex flex-col sm:flex-row items-center gap-6">
                <div className="w-32 h-40 rounded-xl overflow-hidden border-2 border-emerald-500/50 bg-slate-950 shrink-0">
                  <img src={siteData.avatar_url || '/profile.jpg'} alt="Preview" className="w-full h-full object-cover object-top" />
                </div>
                <div className="space-y-2">
                  <input 
                    type="file" 
                    accept="image/*"
                    onChange={handleImageUpload}
                    disabled={uploading}
                    className="block text-xs text-slate-400 file:mr-4 file:py-2.5 file:px-5 file:rounded-xl file:border-0 file:bg-emerald-500 file:text-slate-950 file:font-bold hover:file:bg-emerald-400 cursor-pointer"
                  />
                  <p className="text-[11px] text-slate-500">{uploading ? 'আপলোড হচ্ছে...' : 'কম্পিউটার থেকে ছবি বেছে নিন, সাথে সাথে ক্লাউডে চলে যাবে।'}</p>
                </div>
              </div>
            </div>

            <div className="bg-slate-900/60 border border-slate-800 p-8 rounded-3xl backdrop-blur-xl space-y-4">
              <h2 className="text-lg font-bold text-white">Hero টেক্সট ও মেট্রিক্স এডিটর</h2>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs text-slate-400 block mb-1">Status Badge</label>
                  <input 
                    type="text" 
                    value={siteData.hero?.badge || ''} 
                    onChange={(e) => setSiteData({ ...siteData, hero: { ...siteData.hero, badge: e.target.value } })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-slate-200"
                  />
                </div>
                <div>
                  <label className="text-xs text-slate-400 block mb-1">Gradient Headline</label>
                  <input 
                    type="text" 
                    value={siteData.hero?.title_highlight || ''} 
                    onChange={(e) => setSiteData({ ...siteData, hero: { ...siteData.hero, title_highlight: e.target.value } })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-slate-200"
                  />
                </div>
              </div>
              <div>
                <label className="text-xs text-slate-400 block mb-1">Hero Description (Bio)</label>
                <textarea 
                  rows={3} 
                  value={siteData.hero?.description || ''} 
                  onChange={(e) => setSiteData({ ...siteData, hero: { ...siteData.hero, description: e.target.value } })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-slate-200"
                />
              </div>

              <div className="pt-4 border-t border-slate-800">
                <label className="text-xs text-slate-300 block mb-3 font-bold">
                  ৪টি প্রধান মেট্রিক (সংখ্যা এবং নিচের লেবেল)
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                  
                  {/* Metric 1 */}
                  <div className="p-3.5 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
                    <span className="text-[10px] text-slate-500 font-mono">১ম মেট্রিক</span>
                    <div>
                      <label className="text-[10px] text-slate-400 block mb-0.5">বড় সংখ্যা / মান</label>
                      <input 
                        type="text" 
                        placeholder="যেমন: 100/100"
                        value={siteData.metrics?.discipline || ''} 
                        onChange={(e) => setSiteData({ 
                          ...siteData, 
                          metrics: { ...siteData.metrics, discipline: e.target.value } 
                        })}
                        className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2 text-xs text-emerald-400 font-bold font-mono"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] text-slate-400 block mb-0.5">নিচের লেবেল (লেখা)</label>
                      <input 
                        type="text" 
                        placeholder="যেমন: Discipline Index"
                        value={siteData.metrics?.discipline_label || ''} 
                        onChange={(e) => setSiteData({ 
                          ...siteData, 
                          metrics: { ...siteData.metrics, discipline_label: e.target.value } 
                        })}
                        className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2 text-xs text-slate-200"
                      />
                    </div>
                  </div>

                  {/* Metric 2 */}
                  <div className="p-3.5 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
                    <span className="text-[10px] text-slate-500 font-mono">২য় মেট্রিক</span>
                    <div>
                      <label className="text-[10px] text-slate-400 block mb-0.5">বড় সংখ্যা / মান</label>
                      <input 
                        type="text" 
                        placeholder="যেমন: 4+ Years"
                        value={siteData.metrics?.experience || ''} 
                        onChange={(e) => setSiteData({ 
                          ...siteData, 
                          metrics: { ...siteData.metrics, experience: e.target.value } 
                        })}
                        className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2 text-xs text-cyan-400 font-bold font-mono"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] text-slate-400 block mb-0.5">নিচের লেবেল (লেখা)</label>
                      <input 
                        type="text" 
                        placeholder="যেমন: Logistics & Tech Exp"
                        value={siteData.metrics?.experience_label || ''} 
                        onChange={(e) => setSiteData({ 
                          ...siteData, 
                          metrics: { ...siteData.metrics, experience_label: e.target.value } 
                        })}
                        className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2 text-xs text-slate-200"
                      />
                    </div>
                  </div>

                  {/* Metric 3 (Dhaka Polytechnic) */}
                  <div className="p-3.5 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
                    <span className="text-[10px] text-slate-500 font-mono">৩য় মেট্রিক</span>
                    <div>
                      <label className="text-[10px] text-slate-400 block mb-0.5">বড় সংখ্যা / মান</label>
                      <input 
                        type="text" 
                        placeholder="যেমন: 4-Year CS"
                        value={siteData.metrics?.education || ''} 
                        onChange={(e) => setSiteData({ 
                          ...siteData, 
                          metrics: { ...siteData.metrics, education: e.target.value } 
                        })}
                        className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2 text-xs text-emerald-400 font-bold font-mono"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] text-slate-400 block mb-0.5">নিচের লেবেল (লেখা)</label>
                      <input 
                        type="text" 
                        placeholder="যেমন: Dhaka Polytechnic"
                        value={siteData.metrics?.education_label || ''} 
                        onChange={(e) => setSiteData({ 
                          ...siteData, 
                          metrics: { ...siteData.metrics, education_label: e.target.value } 
                        })}
                        className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2 text-xs text-slate-200"
                      />
                    </div>
                  </div>

                  {/* Metric 4 */}
                  <div className="p-3.5 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
                    <span className="text-[10px] text-slate-500 font-mono">৪র্থ মেট্রিক</span>
                    <div>
                      <label className="text-[10px] text-slate-400 block mb-0.5">বড় সংখ্যা / মান</label>
                      <input 
                        type="text" 
                        placeholder="যেমন: Certified (a2i)"
                        value={siteData.metrics?.certification || ''} 
                        onChange={(e) => setSiteData({ 
                          ...siteData, 
                          metrics: { ...siteData.metrics, certification: e.target.value } 
                        })}
                        className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2 text-xs text-teal-400 font-bold font-mono"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] text-slate-400 block mb-0.5">নিচের লেবেল (লেখা)</label>
                      <input 
                        type="text" 
                        placeholder="যেমন: Digital Security (a2i)"
                        value={siteData.metrics?.certification_label || ''} 
                        onChange={(e) => setSiteData({ 
                          ...siteData, 
                          metrics: { ...siteData.metrics, certification_label: e.target.value } 
                        })}
                        className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2 text-xs text-slate-200"
                      />
                    </div>
                  </div>

                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: Operations Systems (With Add & Delete) */}
        {activeTab === 'systems' && siteData && (
          <div className="bg-slate-900/60 border border-slate-800 p-8 rounded-3xl backdrop-blur-xl space-y-6">
            <div className="flex justify-between items-center pb-4 border-b border-slate-800">
              <div>
                <h2 className="text-lg font-bold text-white flex items-center gap-2">
                  <Layers className="w-5 h-5 text-emerald-400" /> অপারেশন্স ড্যাশবোর্ড ও সিস্টেম
                </h2>
                <p className="text-xs text-slate-400 mt-1">মোট সিস্টেম: {siteData.systems?.length || 0} টি</p>
              </div>
              <button 
                type="button"
                onClick={handleAddSystem}
                className="px-4 py-2 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/20 text-xs font-bold rounded-xl flex items-center gap-1.5 transition"
              >
                <Plus className="w-4 h-4" /> নতুন ড্যাশবোর্ড যোগ করুন
              </button>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {siteData.systems?.map((sys: any, idx: number) => (
                <div key={idx} className="p-5 bg-slate-950 border border-slate-800 rounded-2xl space-y-3 relative group">
                  <div className="flex justify-between items-center">
                    <span className="text-[10px] px-2 py-0.5 rounded bg-slate-800 text-slate-400 font-mono">Item #{idx + 1}</span>
                    <button 
                      type="button"
                      onClick={() => handleDeleteSystem(idx)}
                      className="p-1.5 text-rose-400 hover:bg-rose-500/10 rounded-lg transition"
                      title="মুছে ফেলুন"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  <div>
                    <label className="text-[11px] text-slate-500 block mb-1">Tag / Category</label>
                    <input 
                      type="text" 
                      value={sys.tag || ''} 
                      onChange={(e) => {
                        const newSys = [...siteData.systems];
                        newSys[idx].tag = e.target.value;
                        setSiteData({ ...siteData, systems: newSys });
                      }}
                      className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2 text-xs text-emerald-400"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] text-slate-500 block mb-1">Dashboard Title</label>
                    <input 
                      type="text" 
                      value={sys.title || ''} 
                      onChange={(e) => {
                        const newSys = [...siteData.systems];
                        newSys[idx].title = e.target.value;
                        setSiteData({ ...siteData, systems: newSys });
                      }}
                      className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2 text-xs text-white font-bold"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] text-slate-500 block mb-1">Description</label>
                    <textarea 
                      rows={3} 
                      value={sys.desc || ''} 
                      onChange={(e) => {
                        const newSys = [...siteData.systems];
                        newSys[idx].desc = e.target.value;
                        setSiteData({ ...siteData, systems: newSys });
                      }}
                      className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2 text-xs text-slate-300"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 3: Work Experience (With Add & Delete + Promotion) */}
        {activeTab === 'experience' && siteData && (
          <div className="bg-slate-900/60 border border-slate-800 p-8 rounded-3xl backdrop-blur-xl space-y-6">
            <div className="flex justify-between items-center pb-4 border-b border-slate-800">
              <div>
                <h2 className="text-lg font-bold text-white flex items-center gap-2">
                  <Briefcase className="w-5 h-5 text-emerald-400" /> চাকুরির অভিজ্ঞতা ও ক্যারিয়ার ট্রেইল
                </h2>
                <p className="text-xs text-slate-400 mt-1">মোট অভিজ্ঞতা: {siteData.experiences?.length || 0} টি</p>
              </div>
              <button 
                type="button"
                onClick={handleAddExperience}
                className="px-4 py-2 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/20 text-xs font-bold rounded-xl flex items-center gap-1.5 transition"
              >
                <Plus className="w-4 h-4" /> নতুন অভিজ্ঞতা যোগ করুন
              </button>
            </div>

            <div className="space-y-6">
              {siteData.experiences?.map((exp: any, idx: number) => (
                <div key={idx} className="p-6 bg-slate-950 border border-slate-800 rounded-2xl space-y-4 relative">
                  
                  <div className="flex justify-between items-center pb-2 border-b border-slate-900">
                    <span className="text-[10px] px-2.5 py-0.5 rounded bg-emerald-500/10 text-emerald-400 font-mono">Job Position #{idx + 1}</span>
                    <button 
                      type="button"
                      onClick={() => handleDeleteExperience(idx)}
                      className="p-1.5 text-rose-400 hover:bg-rose-500/10 rounded-lg transition flex items-center gap-1 text-xs"
                    >
                      <Trash2 className="w-4 h-4" /> ডিলিট করুন
                    </button>
                  </div>

                  <div className="grid md:grid-cols-3 gap-3">
                    <div>
                      <label className="text-[11px] text-slate-400 block mb-1">বর্তমান পদবী</label>
                      <input 
                        type="text" 
                        value={exp.role || ''} 
                        onChange={(e) => {
                          const newExp = [...siteData.experiences];
                          newExp[idx].role = e.target.value;
                          setSiteData({ ...siteData, experiences: newExp });
                        }}
                        className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2.5 text-xs text-white font-bold"
                      />
                    </div>
                    <div>
                      <label className="text-[11px] text-slate-400 block mb-1">কোম্পানির নাম</label>
                      <input 
                        type="text" 
                        value={exp.company || ''} 
                        onChange={(e) => {
                          const newExp = [...siteData.experiences];
                          newExp[idx].company = e.target.value;
                          setSiteData({ ...siteData, experiences: newExp });
                        }}
                        className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2.5 text-xs text-emerald-400"
                      />
                    </div>
                    <div>
                      <label className="text-[11px] text-slate-400 block mb-1">সময়কাল</label>
                      <input 
                        type="text" 
                        value={exp.period || ''} 
                        onChange={(e) => {
                          const newExp = [...siteData.experiences];
                          newExp[idx].period = e.target.value;
                          setSiteData({ ...siteData, experiences: newExp });
                        }}
                        className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2.5 text-xs text-slate-300 font-mono"
                      />
                    </div>
                  </div>

                  {/* প্রমোশন ফিল্ড (ঐচ্ছিক) */}
                  <div className="p-4 bg-slate-900/60 rounded-xl border border-dashed border-emerald-500/30 grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-[11px] text-emerald-400 font-medium block mb-1">
                        প্রমোশনের আগের পদবী (Pre-Promotion Role - যদি থাকে)
                      </label>
                      <input 
                        type="text" 
                        placeholder="যেমন: Customer Service Executive (Corporate Office)"
                        value={exp.previous_role || ''} 
                        onChange={(e) => {
                          const newExp = [...siteData.experiences];
                          newExp[idx].previous_role = e.target.value;
                          setSiteData({ ...siteData, experiences: newExp });
                        }}
                        className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-xs text-slate-200"
                      />
                    </div>
                    <div>
                      <label className="text-[11px] text-emerald-400 font-medium block mb-1">
                        আগের পদবীর সময়কাল (Pre-Promotion Period)
                      </label>
                      <input 
                        type="text" 
                        placeholder="যেমন: Apr 2026 – Jul 2026"
                        value={exp.previous_period || ''} 
                        onChange={(e) => {
                          const newExp = [...siteData.experiences];
                          newExp[idx].previous_period = e.target.value;
                          setSiteData({ ...siteData, experiences: newExp });
                        }}
                        className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-xs text-slate-300 font-mono"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-[11px] text-slate-400 block mb-1">কাজের বিবরণ (Description / Key Achievements)</label>
                    <textarea 
                      rows={2} 
                      value={exp.desc || ''} 
                      onChange={(e) => {
                        const newExp = [...siteData.experiences];
                        newExp[idx].desc = e.target.value;
                        setSiteData({ ...siteData, experiences: newExp });
                      }}
                      className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2.5 text-xs text-slate-300"
                    />
                  </div>

                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 4: Skills & Education (With Add & Delete) */}
        {activeTab === 'skills' && siteData && (
          <div className="bg-slate-900/60 border border-slate-800 p-8 rounded-3xl backdrop-blur-xl space-y-6">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <Cpu className="w-5 h-5 text-emerald-400" /> স্কিল ও শিক্ষাগত যোগ্যতা
            </h2>

            {/* Skills Inputs */}
            <div className="space-y-4">
              <div>
                <label className="text-xs text-slate-400 block mb-1">Operations & BI Analytics Skills (কমা দিয়ে লিখুন)</label>
                <input 
                  type="text" 
                  value={siteData.skills?.operations || ''} 
                  onChange={(e) => setSiteData({ ...siteData, skills: { ...siteData.skills, operations: e.target.value } })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-slate-200"
                />
              </div>
              <div>
                <label className="text-xs text-slate-400 block mb-1">IT Systems & Infrastructure Skills (কমা দিয়ে লিখুন)</label>
                <input 
                  type="text" 
                  value={siteData.skills?.it || ''} 
                  onChange={(e) => setSiteData({ ...siteData, skills: { ...siteData.skills, it: e.target.value } })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-slate-200"
                />
              </div>
            </div>

            {/* Education Manager with Add & Delete */}
            <div className="pt-6 border-t border-slate-800 space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-sm font-bold text-white">Education & Credentials ({siteData.education?.length || 0})</h3>
                <button 
                  type="button"
                  onClick={handleAddEducation}
                  className="px-3.5 py-1.5 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/20 text-xs font-bold rounded-xl flex items-center gap-1.5 transition"
                >
                  <Plus className="w-3.5 h-3.5" /> নতুন ডিগ্রি যোগ করুন
                </button>
              </div>

              {siteData.education?.map((edu: any, idx: number) => (
                <div key={idx} className="grid md:grid-cols-12 gap-3 bg-slate-950 p-4 rounded-xl border border-slate-800 items-center">
                  <div className="md:col-span-6">
                    <input 
                      type="text" 
                      value={edu.title || ''} 
                      onChange={(e) => {
                        const newEdu = [...siteData.education];
                        newEdu[idx].title = e.target.value;
                        setSiteData({ ...siteData, education: newEdu });
                      }}
                      placeholder="ডিগ্রি বা সার্টিফিকেশনের নাম"
                      className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2.5 text-xs text-white"
                    />
                  </div>
                  <div className="md:col-span-5">
                    <input 
                      type="text" 
                      value={edu.inst || ''} 
                      onChange={(e) => {
                        const newEdu = [...siteData.education];
                        newEdu[idx].inst = e.target.value;
                        setSiteData({ ...siteData, education: newEdu });
                      }}
                      placeholder="প্রতিষ্ঠান ও সাল"
                      className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2.5 text-xs text-emerald-400"
                    />
                  </div>
                  <div className="md:col-span-1 flex justify-center">
                    <button 
                      type="button"
                      onClick={() => handleDeleteEducation(idx)}
                      className="p-2 text-rose-400 hover:bg-rose-500/10 rounded-lg transition"
                      title="মুছে ফেলুন"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 5: Messages */}
        {activeTab === 'messages' && (
          <div className="bg-slate-900/60 border border-slate-800 p-8 rounded-3xl backdrop-blur-xl">
            <h2 className="text-lg font-bold text-white flex items-center gap-2 mb-4">
              <Mail className="w-5 h-5 text-cyan-400" /> Recruiter Inquiries ({messages.length})
            </h2>
            {messages.length === 0 ? (
              <div className="p-8 text-center text-slate-500 text-xs font-mono">
                এখনো কোনো মেসেজ জমা পড়েনি।
              </div>
            ) : (
              <div className="space-y-3">
                {messages.map((m) => (
                  <div key={m.id} className="p-4 bg-slate-950 rounded-2xl border border-slate-800 text-sm">
                    <div className="flex justify-between items-start">
                      <div>
                        <div className="font-bold text-white">{m.sender_name}</div>
                        <div className="text-xs text-emerald-400 font-mono">{m.sender_email}</div>
                      </div>
                      <span className="text-[10px] text-slate-500 font-mono">
                        {new Date(m.created_at).toLocaleDateString()}
                      </span>
                    </div>
                    <p className="text-slate-300 text-xs mt-3 bg-slate-900/60 p-3 rounded-xl border border-slate-800/50">
                      {m.message}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

      </div>
    </div>
  );
}