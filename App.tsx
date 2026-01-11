
import React, { useState, useEffect } from 'react';
import { 
  XAxis, YAxis, Tooltip, ResponsiveContainer, 
  AreaChart, Area 
} from 'recharts';
import { 
  BrainCircuit, Users, Building2, TrendingUp, Sparkles, 
  ChevronRight, Mic, MapPin, ShieldCheck, HelpCircle, 
  Target, Rocket, HeartPulse, Palette, Globe, Languages, Zap,
  AreaChart as AreaChartIcon, Cpu, Video, Coffee, Heart, Server, 
  Database, Lock, Eye, CheckCircle2, X
} from 'lucide-react';
import { generateProjectIdeas } from './geminiService';
import { CitizenProfile, AIProjectIdea } from './types';

// --- Expanded Translations ---
const translations = {
  en: {
    nav: { concept: 'Concept', impact: 'Impact', partners: 'Partners', architecture: 'Tech', join: 'Join Movement' },
    hero: {
      badge: 'WORLD FIRST: CLAIR, NEW BRUNSWICK',
      title: 'One Citizen =',
      subtitle: 'Clair is becoming the first village where every resident is empowered by a custom AI-driven project to generate revenue, boost mental health, and upgrade local life.',
      cta1: 'Start Your AI Project',
      cta2: 'View Village Stats',
    },
    concept: {
      title: 'The Human-Centred Algorithm',
      subtitle: 'Our 4-step process ensures technology serves the individual, not the other way around.',
      step1: 'Profile Creation',
      step1Desc: 'Define your passions, challenges, and availability.',
      step2: 'AI Matching',
      step2Desc: 'Get 3 unique project ideas: Creative, Economic, and Community.',
      step3: 'Launch',
      step3Desc: 'Choose your path and start building with AI tools.',
      step4: 'Community Impact',
      step4Desc: 'Track your growth and community contribution live.'
    },
    impact: {
      title: 'Real-Time Impact Dashboard',
      subtitle: 'Transparency is key. We track local economic growth and citizen well-being in real-time.',
      revenue: 'Target Revenue',
      citizens: 'Citizens',
      projects: 'Active Projects',
      growth: '+12% vs last quarter',
      chartTitle: 'Growth & Social Participation',
      policyTitle: 'Systemic Outcomes',
    },
    wizard: {
      badge: 'CLAIR RESIDENT WIZARD',
      title: 'Find Your Path in the',
      accent: 'AI Economy',
      subtitle: "Whether you're a student, a senior, or a business owner, our algorithm matches your passions with tangible AI projects.",
      form: {
        name: 'Full Name',
        role: 'Citizen Role',
        passions: 'What do you love? (Passions)',
        challenges: 'What challenges do you face?',
        submit: 'Generate My Project Match',
        loading: 'Orchestrating AI Resources...'
      },
      results: 'Your Personalized AI Roadmap'
    },
    architecture: {
      title: 'Secure & Ethical Backbone',
      subtitle: 'Private data, local compute, global potential.',
      item1: 'Secure Cloud + Edge',
      item1Desc: 'Low latency processing right here in the village center.',
      item2: 'Multi-Model APIs',
      item2Desc: 'Access to Gemini, Grok, GPT-4, and open-source models.',
      item3: 'Privacy-First Data',
      item3Desc: 'Strict consent protocols following Canadian AI ethics.',
      item4: 'Open Transparency',
      item4Desc: 'Public dashboards for governance and accountability.'
    },
    modal: {
      title: 'Join the Movement',
      subtitle: 'Become a part of the world’s first AI-integrated village. Whether you’re a resident, partner, or researcher.',
      name: 'Full Name',
      email: 'Email Address',
      type: 'I am a...',
      type1: 'Resident of Clair',
      type2: 'Potential Partner',
      type3: 'Media/Researcher',
      submit: 'Request Access'
    }
  },
  fr: {
    nav: { concept: 'Concept', impact: 'Impact', partners: 'Partenaires', architecture: 'Tech', join: 'Rejoindre' },
    hero: {
      badge: 'PREMIÈRE MONDIALE : CLAIR, NOUVEAU-BRUNSWICK',
      title: 'Un Citoyen =',
      subtitle: 'Clair devient le premier village où chaque résident est propulsé par un projet IA personnalisé pour générer des revenus, booster la santé mentale et moderniser la vie locale.',
      cta1: 'Lancer mon projet IA',
      cta2: 'Statistiques du Village',
    },
    concept: {
      title: 'L’Algorithme Humano-Centré',
      subtitle: 'Notre processus en 4 étapes garantit que la technologie sert l’individu, et non l’inverse.',
      step1: 'Création de Profil',
      step1Desc: 'Définissez vos passions, défis et disponibilités.',
      step2: 'Jumelage IA',
      step2Desc: 'Recevez 3 idées uniques : Créatif, Économique et Communautaire.',
      step3: 'Lancement',
      step3Desc: 'Choisissez votre voie et commencez avec des outils IA.',
      step4: 'Impact Communautaire',
      step4Desc: 'Suivez votre croissance et votre contribution en direct.'
    },
    impact: {
      title: 'Tableau d’Impact en Temps Réel',
      subtitle: 'La transparence est essentielle. Nous suivons la croissance économique et le bien-être en direct.',
      revenue: 'Objectif Revenus',
      citizens: 'Citoyens',
      projects: 'Projets Actifs',
      growth: '+12% vs dernier trimestre',
      chartTitle: 'Croissance et Participation Sociale',
      policyTitle: 'Résultats Systémiques',
    },
    wizard: {
      badge: 'ASSISTANT RÉSIDENT DE CLAIR',
      title: 'Trouvez votre voie dans',
      accent: 'l’Économie de l’IA',
      subtitle: "Que vous soyez étudiant, aîné ou entrepreneur, notre algorithme associe vos passions à des projets IA concrets.",
      form: {
        name: 'Nom Complet',
        role: 'Rôle Citoyen',
        passions: 'Qu’est-ce qui vous passionne ?',
        challenges: 'Quels défis rencontrez-vous ?',
        submit: 'Générer mon projet',
        loading: 'Orchestration des ressources IA...'
      },
      results: 'Votre Feuille de Route IA Personnalisée'
    },
    architecture: {
      title: 'Infrastructure Éthique et Sécurisée',
      subtitle: 'Données privées, calcul local, potentiel mondial.',
      item1: 'Cloud Sécurisé + Edge',
      item1Desc: 'Traitement à faible latence directement au cœur du village.',
      item2: 'APIs Multi-Modèles',
      item2Desc: 'Accès à Gemini, Grok, GPT-4 et modèles open-source.',
      item3: 'Données : Priorité Privée',
      item3Desc: 'Protocoles de consentement stricts selon l’éthique canadienne.',
      item4: 'Transparence Ouverte',
      item4Desc: 'Tableaux publics pour la gouvernance et la reddition de comptes.'
    },
    modal: {
      title: 'Rejoindre le Mouvement',
      subtitle: 'Faites partie du premier village intégré à l’IA au monde. Que vous soyez résident, partenaire ou chercheur.',
      name: 'Nom Complet',
      email: 'Adresse Courriel',
      type: 'Je suis un...',
      type1: 'Résident de Clair',
      type2: 'Partenaire Potentiel',
      type3: 'Média/Chercheur',
      submit: 'Demander l’Accès'
    }
  }
};

const KPI_DATA = [
  { name_en: 'Citizens', name_fr: 'Citoyens', value: 1000, color: '#38bdf8' },
  { name_en: 'Active Projects', name_fr: 'Projets Actifs', value: 500, color: '#818cf8' },
  { name_en: 'Target Revenue', name_fr: 'Objectif Revenus', value: 1200000, color: '#34d399' },
];

const IMPACT_TRENDS = [
  { month: 'Jan', revenue: 45000, wellbeing: 65 },
  { month: 'Feb', revenue: 52000, wellbeing: 68 },
  { month: 'Mar', revenue: 48000, wellbeing: 72 },
  { month: 'Apr', revenue: 61000, wellbeing: 75 },
  { month: 'May', revenue: 75000, wellbeing: 82 },
  { month: 'Jun', revenue: 89000, wellbeing: 88 },
];

// --- Sub-Components ---

const NeonCard: React.FC<{ children: React.ReactNode, className?: string, id?: string }> = ({ children, className, id }) => (
  <div id={id} className={`relative group overflow-hidden bg-slate-900/40 backdrop-blur-xl border border-white/5 rounded-[2.5rem] p-8 transition-all hover:border-sky-500/30 hover:shadow-[0_0_40px_rgba(56,189,248,0.1)] ${className}`}>
    <div className="absolute top-0 right-0 w-32 h-32 bg-sky-500/10 blur-[60px] -z-10 group-hover:bg-sky-500/20 transition-all"></div>
    {children}
  </div>
);

const JoinModal: React.FC<{ isOpen: boolean, onClose: () => void, t: any }> = ({ isOpen, onClose, t }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-[#020617]/90 backdrop-blur-md animate-in fade-in duration-300">
      <div className="relative w-full max-w-xl glass border border-white/10 rounded-[3rem] p-10 shadow-2xl animate-in zoom-in-95 duration-300">
        <button onClick={onClose} className="absolute top-8 right-8 text-slate-400 hover:text-white transition-colors">
          <X size={24} />
        </button>
        <h3 className="text-4xl font-black text-white mb-4">{t.modal.title}</h3>
        <p className="text-slate-400 mb-8 font-medium">{t.modal.subtitle}</p>
        <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); onClose(); }}>
          <div>
            <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-2 block">{t.modal.name}</label>
            <input className="w-full bg-slate-950/50 border border-white/10 rounded-2xl px-6 py-4 text-white focus:ring-2 focus:ring-sky-500 outline-none" placeholder="Marc Pelletier" />
          </div>
          <div>
            <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-2 block">{t.modal.email}</label>
            <input type="email" className="w-full bg-slate-950/50 border border-white/10 rounded-2xl px-6 py-4 text-white focus:ring-2 focus:ring-sky-500 outline-none" placeholder="marc@villageclair.ca" />
          </div>
          <div>
            <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-2 block">{t.modal.type}</label>
            <select className="w-full bg-slate-950/50 border border-white/10 rounded-2xl px-6 py-4 text-white focus:ring-2 focus:ring-sky-500 outline-none">
              <option>{t.modal.type1}</option>
              <option>{t.modal.type2}</option>
              <option>{t.modal.type3}</option>
            </select>
          </div>
          <button className="w-full bg-sky-500 hover:bg-sky-400 text-white font-black py-5 rounded-2xl transition-all shadow-xl shadow-sky-500/20 uppercase tracking-widest text-sm">
            {t.modal.submit}
          </button>
        </form>
      </div>
    </div>
  );
};

export default function App() {
  const [lang, setLang] = useState<'en' | 'fr'>('fr');
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [profile, setProfile] = useState<CitizenProfile>({
    name: '',
    role: 'Worker',
    passions: '',
    challenges: '',
    timeCommitment: '5 hours/week'
  });
  const [suggestedIdeas, setSuggestedIdeas] = useState<AIProjectIdea[]>([]);

  const t = translations[lang];

  const handleSuggest = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const ideas = await generateProjectIdeas(profile, lang);
      setSuggestedIdeas(ideas);
      // Smooth scroll to results
      setTimeout(() => {
        document.getElementById('results')?.scrollIntoView({ behavior: 'smooth' });
      }, 500);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#020617] text-slate-200 selection:bg-sky-500/30">
      <JoinModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} t={t} />

      {/* Nav */}
      <nav className="fixed top-0 w-full z-50 glass border-b border-white/5 h-20">
        <div className="max-w-7xl mx-auto px-6 h-full flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-sky-400 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-sky-500/20">
              <Zap size={22} className="text-white fill-current" />
            </div>
            <span className="text-2xl font-black tracking-tighter text-white">CLAIR AI</span>
          </div>
          
          <div className="hidden lg:flex gap-10 text-[11px] font-black uppercase tracking-[0.2em] text-slate-400">
            {Object.entries(t.nav).filter(([k]) => k !== 'join').map(([key, value]) => (
              <a key={key} href={`#${key}`} className="hover:text-sky-400 transition-colors">{value}</a>
            ))}
          </div>

          <div className="flex items-center gap-4">
            <button 
              onClick={() => setLang(lang === 'en' ? 'fr' : 'en')}
              className="flex items-center gap-2 px-4 py-2 rounded-full glass border border-white/10 text-xs font-black text-sky-400 hover:bg-sky-500/10 transition-all"
            >
              <Languages size={14} /> {lang.toUpperCase()}
            </button>
            <button 
              onClick={() => setIsModalOpen(true)}
              className="bg-white text-black px-6 py-2.5 rounded-full text-xs font-black uppercase tracking-widest hover:bg-sky-400 hover:text-white transition-all shadow-xl shadow-white/5"
            >
              {t.nav.join}
            </button>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative min-h-screen flex flex-col justify-center items-center px-6 pt-20 overflow-hidden">
        <div className="absolute inset-0 opacity-20 -z-10 bg-[url('https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=2000')] bg-cover bg-center"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-[#020617]/90 via-[#020617]/60 to-[#020617] -z-10"></div>
        
        <div className="max-w-6xl mx-auto text-center relative">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-sky-500/10 border border-sky-500/20 text-sky-400 text-xs font-black tracking-[0.2em] mb-12 animate-pulse">
             <MapPin size={14} /> {t.hero.badge}
          </div>
          <h1 className="text-6xl md:text-9xl font-black text-white mb-8 tracking-tighter leading-[0.85] uppercase">
            {t.hero.title}<br />
            <span className="bg-gradient-to-r from-sky-400 via-indigo-400 to-purple-500 bg-clip-text text-transparent">
              One AI Project
            </span>
          </h1>
          <p className="text-xl md:text-3xl text-slate-400 max-w-4xl mx-auto mb-14 font-medium leading-relaxed">
            {t.hero.subtitle}
          </p>
          <div className="flex flex-wrap justify-center gap-6">
            <a href="#wizard" className="bg-sky-500 hover:bg-sky-400 text-white px-12 py-6 rounded-3xl font-black text-2xl flex items-center gap-4 transition-all shadow-[0_0_50px_rgba(56,189,248,0.4)] hover:scale-105">
              {t.hero.cta1} <Rocket size={28} />
            </a>
            <a href="#impact" className="glass text-white px-12 py-6 rounded-3xl font-black text-2xl border border-white/10 hover:bg-white/5 transition-all">
              {t.hero.cta2}
            </a>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="w-1 h-12 bg-gradient-to-b from-sky-500 to-transparent rounded-full opacity-50"></div>
        </div>
      </section>

      {/* Concept Section */}
      <section id="concept" className="py-32 relative">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-24">
            <h2 className="text-4xl md:text-6xl font-black text-white mb-6 uppercase tracking-tight">{t.concept.title}</h2>
            <p className="text-xl text-slate-400 max-w-2xl mx-auto font-medium">{t.concept.subtitle}</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { title: t.concept.step1, desc: t.concept.step1Desc, icon: Users, color: "sky" },
              { title: t.concept.step2, desc: t.concept.step2Desc, icon: BrainCircuit, color: "indigo" },
              { title: t.concept.step3, desc: t.concept.step3Desc, icon: Rocket, color: "purple" },
              { title: t.concept.step4, desc: t.concept.step4Desc, icon: TrendingUp, color: "emerald" }
            ].map((step, idx) => (
              <NeonCard key={idx} className="flex flex-col items-center text-center">
                <div className={`w-16 h-16 rounded-2xl bg-${step.color}-500/10 flex items-center justify-center text-${step.color}-400 mb-8 border border-${step.color}-500/20`}>
                  <step.icon size={32} />
                </div>
                <div className="absolute top-6 left-6 text-slate-800 font-black text-4xl -z-10">{idx + 1}</div>
                <h4 className="text-2xl font-black text-white mb-4 uppercase">{step.title}</h4>
                <p className="text-slate-400 font-medium leading-relaxed">{step.desc}</p>
              </NeonCard>
            ))}
          </div>
        </div>
      </section>

      {/* Impact Dashboard */}
      <section id="impact" className="py-32 bg-slate-950/50 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col lg:flex-row justify-between items-end gap-10 mb-20">
            <div className="max-w-2xl">
              <h2 className="text-4xl md:text-6xl font-black text-white mb-6 uppercase leading-tight">{t.impact.title}</h2>
              <p className="text-xl text-slate-500 font-medium">{t.impact.subtitle}</p>
            </div>
            <div className="flex gap-4">
              <div className="px-6 py-3 glass rounded-2xl border border-white/5 flex items-center gap-3">
                <div className="w-3 h-3 bg-sky-500 rounded-full animate-ping"></div>
                <span className="text-xs font-black uppercase tracking-widest text-sky-400">Live Data Feed</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-20">
            {KPI_DATA.map((kpi, idx) => (
              <NeonCard key={idx}>
                <p className="text-slate-500 font-black uppercase tracking-widest text-xs mb-4">
                  {lang === 'en' ? kpi.name_en : kpi.name_fr}
                </p>
                <div className="text-7xl font-black text-white mb-4 tracking-tighter">
                  {kpi.name_en === 'Target Revenue' ? `$${(kpi.value / 1000000).toFixed(1)}M` : kpi.value.toLocaleString()}
                </div>
                <div className="flex items-center gap-2 text-emerald-400 font-black text-sm uppercase tracking-widest">
                  <CheckCircle2 size={16} /> {t.impact.growth}
                </div>
              </NeonCard>
            ))}
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-5 gap-8">
            <NeonCard className="xl:col-span-3">
              <h4 className="text-2xl font-black text-white mb-10 flex items-center gap-3 uppercase tracking-widest">
                <AreaChartIcon size={24} className="text-sky-400" /> {t.impact.chartTitle}
              </h4>
              <div className="h-[400px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={IMPACT_TRENDS}>
                    <defs>
                      <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#38bdf8" stopOpacity={0.4}/>
                        <stop offset="95%" stopColor="#38bdf8" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <XAxis dataKey="month" stroke="#334155" tick={{fontSize: 12, fontWeight: 900}} />
                    <YAxis hide />
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #1e293b', borderRadius: '12px' }}
                      itemStyle={{ color: '#fff', fontWeight: 900 }}
                    />
                    <Area type="monotone" dataKey="revenue" stroke="#38bdf8" strokeWidth={6} fillOpacity={1} fill="url(#colorRevenue)" />
                    <Area type="monotone" dataKey="wellbeing" stroke="#10b981" strokeWidth={6} fillOpacity={0.1} />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </NeonCard>

            <NeonCard className="xl:col-span-2">
              <h4 className="text-2xl font-black text-white mb-10 flex items-center gap-3 uppercase tracking-widest">
                <Building2 size={24} className="text-indigo-400" /> {t.impact.policyTitle}
              </h4>
              <div className="space-y-10">
                {[
                  { en: "Unemployment", fr: "Chômage", p: 18, c: "from-sky-500 to-indigo-500" },
                  { en: "Mental Health", fr: "Santé Mentale", p: 24, c: "from-emerald-500 to-teal-500" },
                  { en: "Local Infrastructure", fr: "Infrastructure Locale", p: 45, c: "from-amber-500 to-orange-500" },
                  { en: "Youth Retention", fr: "Rétention Jeunesse", p: 12, c: "from-purple-500 to-pink-500" }
                ].map((item) => (
                  <div key={item.en}>
                    <div className="flex justify-between text-[11px] font-black mb-4 uppercase tracking-[0.2em]">
                      <span className="text-slate-400">{lang === 'en' ? item.en : item.fr}</span>
                      <span className="text-white">+{item.p}%</span>
                    </div>
                    <div className="w-full bg-white/5 h-4 rounded-full overflow-hidden border border-white/5">
                      <div className={`bg-gradient-to-r ${item.c} h-full rounded-full transition-all duration-1000`} style={{ width: `${item.p}%` }}></div>
                    </div>
                  </div>
                ))}
              </div>
            </NeonCard>
          </div>
        </div>
      </section>

      {/* AI Wizard Section */}
      <section id="wizard" className="py-40 relative">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
            <div className="order-2 lg:order-1">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-sky-500/10 border border-sky-500/20 text-sky-400 text-xs font-black tracking-widest mb-8">
                <BrainCircuit size={18} /> {t.wizard.badge}
              </div>
              <h2 className="text-5xl md:text-8xl font-black text-white mb-10 tracking-tighter leading-[0.85] uppercase">
                {t.wizard.title} <br />
                <span className="bg-gradient-to-r from-sky-400 to-indigo-400 bg-clip-text text-transparent">
                  {t.wizard.accent}
                </span>
              </h2>
              <p className="text-2xl text-slate-400 mb-12 leading-relaxed font-medium">
                {t.wizard.subtitle}
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {[
                  { icon: Target, text: lang === 'fr' ? "Personnalisé" : "Personalized" },
                  { icon: HeartPulse, text: lang === 'fr' ? "Bien-être" : "Wellness" },
                  { icon: Palette, text: lang === 'fr' ? "Créatif" : "Creative" },
                  { icon: ShieldCheck, text: lang === 'fr' ? "Éthique" : "Ethical" }
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-4 p-5 glass rounded-3xl border border-white/5 hover:border-sky-500/30 transition-all">
                    <div className="w-12 h-12 rounded-2xl bg-sky-500/10 flex items-center justify-center text-sky-400 border border-sky-500/20">
                      <item.icon size={24} />
                    </div>
                    <span className="text-slate-200 font-black uppercase tracking-widest text-sm">{item.text}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="order-1 lg:order-2">
              <div className="relative">
                <div className="absolute -inset-2 bg-gradient-to-r from-sky-500 to-indigo-600 rounded-[3.5rem] blur-2xl opacity-20"></div>
                <form onSubmit={handleSuggest} className="relative bg-slate-900 border border-white/10 p-12 rounded-[3.5rem] shadow-2xl space-y-10">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                      <label className="text-[10px] font-black uppercase tracking-[0.25em] text-slate-500 mb-3 block">{t.wizard.form.name}</label>
                      <input 
                        required
                        className="w-full bg-slate-950 border border-white/10 rounded-2xl px-8 py-5 text-white focus:ring-2 focus:ring-sky-500 outline-none transition-all placeholder:text-slate-800"
                        placeholder="Marc Pelletier"
                        onChange={e => setProfile({...profile, name: e.target.value})}
                      />
                    </div>
                    <div>
                      <label className="text-[10px] font-black uppercase tracking-[0.25em] text-slate-500 mb-3 block">{t.wizard.form.role}</label>
                      <select 
                        className="w-full bg-slate-950 border border-white/10 rounded-2xl px-8 py-5 text-white focus:ring-2 focus:ring-sky-500 outline-none appearance-none"
                        onChange={e => setProfile({...profile, role: e.target.value as any})}
                      >
                        <option>Youth</option>
                        <option>Senior</option>
                        <option>Worker</option>
                        <option>Business Owner</option>
                        <option>Disabled</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="text-[10px] font-black uppercase tracking-[0.25em] text-slate-500 mb-3 block">{t.wizard.form.passions}</label>
                    <textarea 
                      required
                      className="w-full bg-slate-950 border border-white/10 rounded-2xl px-8 py-5 text-white h-32 focus:ring-2 focus:ring-sky-500 outline-none resize-none placeholder:text-slate-800"
                      placeholder="e.g., Cooking, Regional Podcasts, Local History"
                      onChange={e => setProfile({...profile, passions: e.target.value})}
                    />
                  </div>

                  <div>
                    <label className="text-[10px] font-black uppercase tracking-[0.25em] text-slate-500 mb-3 block">{t.wizard.form.challenges}</label>
                    <textarea 
                      className="w-full bg-slate-950 border border-white/10 rounded-2xl px-8 py-5 text-white h-32 focus:ring-2 focus:ring-sky-500 outline-none resize-none placeholder:text-slate-800"
                      placeholder="e.g., Connectivity issues, Limited market"
                      onChange={e => setProfile({...profile, challenges: e.target.value})}
                    />
                  </div>

                  <button 
                    disabled={loading}
                    className="w-full bg-gradient-to-r from-sky-500 to-indigo-600 hover:scale-[1.02] active:scale-95 text-white font-black py-6 rounded-3xl transition-all shadow-2xl shadow-sky-500/30 flex items-center justify-center gap-4 uppercase tracking-[0.2em] text-sm"
                  >
                    {loading ? (
                      <div className="flex items-center gap-4"><Sparkles className="animate-spin" /> {t.wizard.form.loading}</div>
                    ) : (
                      <>{t.wizard.form.submit} <ChevronRight size={20} /></>
                    )}
                  </button>
                </form>
              </div>
            </div>
          </div>

          {/* Results Area */}
          <div id="results" className="mt-40 scroll-mt-32">
            {suggestedIdeas.length > 0 && (
              <div className="space-y-16 animate-in slide-in-from-bottom-12 duration-1000">
                <div className="text-center">
                  <h3 className="text-4xl md:text-6xl font-black text-white flex items-center justify-center gap-6 uppercase tracking-tight">
                    <Sparkles className="text-sky-400" size={48} /> {t.wizard.results}
                  </h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                  {suggestedIdeas.map((idea, idx) => (
                    <div key={idx} className="group relative">
                      <div className="absolute -inset-0.5 bg-gradient-to-br from-white/10 to-transparent rounded-[3rem] transition-all group-hover:from-sky-500/50"></div>
                      <div className="relative bg-slate-900/90 backdrop-blur-2xl p-10 rounded-[3rem] h-full flex flex-col border border-white/5">
                        <span className="inline-block px-4 py-1.5 bg-sky-500/10 border border-sky-500/20 rounded-full text-[10px] font-black uppercase tracking-[0.2em] text-sky-400 mb-8">
                          {idea.type}
                        </span>
                        <h4 className="text-3xl font-black text-white mb-6 leading-tight group-hover:text-sky-400 transition-colors">
                          {idea.title}
                        </h4>
                        <p className="text-slate-400 text-lg leading-relaxed mb-10 flex-grow font-medium">
                          {idea.description}
                        </p>
                        <div className="pt-8 border-t border-white/5 mt-auto">
                          <p className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-3">Community Value</p>
                          <p className="text-emerald-400 text-lg font-black leading-tight">{idea.potentialImpact}</p>
                          {idea.revenueModel && (
                            <div className="mt-6">
                              <p className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-3">Economic Path</p>
                              <p className="text-amber-400 text-lg font-black leading-tight">{idea.revenueModel}</p>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Architecture Section */}
      <section id="tech" className="py-32 bg-slate-950/80">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-24">
            <h2 className="text-4xl md:text-6xl font-black text-white mb-6 uppercase tracking-tight">{t.architecture.title}</h2>
            <p className="text-xl text-slate-500 max-w-2xl mx-auto font-medium">{t.architecture.subtitle}</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { title: t.architecture.item1, desc: t.architecture.item1Desc, icon: Server },
              { title: t.architecture.item2, desc: t.architecture.item2Desc, icon: Cpu },
              { title: t.architecture.item3, desc: t.architecture.item3Desc, icon: Lock },
              { title: t.architecture.item4, desc: t.architecture.item4Desc, icon: Eye }
            ].map((item, idx) => (
              <NeonCard key={idx}>
                <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center text-sky-400 mb-8 border border-white/10 group-hover:bg-sky-500 group-hover:text-white transition-all">
                  <item.icon size={28} />
                </div>
                <h4 className="text-xl font-black text-white mb-4 uppercase tracking-widest">{item.title}</h4>
                <p className="text-slate-500 font-medium leading-relaxed text-sm">{item.desc}</p>
              </NeonCard>
            ))}
          </div>
        </div>
      </section>

      {/* Partners section */}
      <section id="partners" className="py-32 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-7xl font-black text-white mb-20 uppercase tracking-tighter">
            Our Global <span className="text-sky-500">Allies</span>
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12 opacity-50 grayscale hover:grayscale-0 transition-all duration-1000">
            <div className="flex flex-col items-center gap-4">
              <Globe size={48} className="text-sky-400" />
              <span className="font-black text-xs tracking-widest uppercase">Big Tech Coalition</span>
            </div>
            <div className="flex flex-col items-center gap-4">
              <Building2 size={48} className="text-indigo-400" />
              <span className="font-black text-xs tracking-widest uppercase">Rural Canada Gov</span>
            </div>
            <div className="flex flex-col items-center gap-4">
              <Database size={48} className="text-emerald-400" />
              <span className="font-black text-xs tracking-widest uppercase">Ethical AI Labs</span>
            </div>
            <div className="flex flex-col items-center gap-4">
              <Users size={48} className="text-purple-400" />
              <span className="font-black text-xs tracking-widest uppercase">NB Innovation</span>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-32 border-t border-white/5 bg-slate-950">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-20 mb-20">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-10 h-10 bg-sky-500 rounded-xl flex items-center justify-center font-black text-white">C</div>
                <span className="text-2xl font-black tracking-tighter text-white uppercase">CLAIR AI VILLAGE</span>
              </div>
              <p className="text-slate-500 text-lg leading-relaxed max-w-md font-medium">
                The world’s first rural AI lighthouse project. Re-inventing the relationship between humans and intelligence at community scale.
              </p>
            </div>
            <div>
              <h5 className="text-white font-black uppercase tracking-widest mb-8 text-sm">{lang === 'en' ? 'Navigation' : 'Navigation'}</h5>
              <div className="flex flex-col gap-4 text-slate-500 font-bold uppercase text-xs tracking-widest">
                {Object.entries(t.nav).map(([key, value]) => (
                  <a key={key} href={`#${key}`} className="hover:text-sky-400 transition-colors">{value}</a>
                ))}
              </div>
            </div>
            <div>
              <h5 className="text-white font-black uppercase tracking-widest mb-8 text-sm">Legal & Privacy</h5>
              <div className="flex flex-col gap-4 text-slate-500 font-bold uppercase text-xs tracking-widest">
                <a href="#" className="hover:text-sky-400 transition-colors">Data Consent</a>
                <a href="#" className="hover:text-sky-400 transition-colors">Ethics Board</a>
                <a href="#" className="hover:text-sky-400 transition-colors">Transparency Report</a>
              </div>
            </div>
          </div>
          <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8">
            <p className="text-slate-700 text-[10px] font-black uppercase tracking-[0.3em]">
              © 2025 AI FOR ALL CLAIR • ONE CITIZEN = ONE PROJECT • NB, CANADA
            </p>
            <div className="flex gap-10 grayscale opacity-30">
              <div className="w-12 h-12 bg-white rounded-full"></div>
              <div className="w-12 h-12 bg-white rounded-full"></div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
