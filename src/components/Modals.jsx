import React, { useState } from 'react';
import { 
  X, 
  ExternalLink, 
  Mail, 
  Sparkles, 
  Play, 
  CheckCircle2, 
  ArrowRight, 
  Layers, 
  Film, 
  Palette, 
  Box, 
  Eye, 
  Copy, 
  Download
} from 'lucide-react';

// Brand SVG Icons
const LinkedInIcon = ({ className = "w-4 h-4" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9h2.76v8.37H6.46v-8.37M7.84 6.7a1.62 1.62 0 1 0 1.62 1.62A1.62 1.62 0 0 0 7.84 6.7Z" />
  </svg>
);

const BehanceIcon = ({ className = "w-4 h-4" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M8.22 10.42c-.75 0-1.4.1-1.74.3V8.87h1.68c.84 0 1.37.3 1.37.95 0 .4-.25.6-.71.6m-.27 2.05H6.48v1.94h1.75c.9 0 1.5-.27 1.5-1.04 0-.66-.46-.9-1.28-.9M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2m-2.18 13.91H4.5V7.47h4.84c2.25 0 3.32.96 3.32 2.37 0 1-.58 1.76-1.58 2.08 1.25.26 1.95 1.15 1.95 2.37 0 1.78-1.5 2.62-3.71 2.62m6.72-2.45c.02.73.47 1.37 1.4 1.37.58 0 1.12-.22 1.38-.47l.95 1.3c-.58.62-1.5 1-2.6 1-2.14 0-3.44-1.52-3.44-3.55s1.37-3.64 3.4-3.64c2.2 0 3.2 1.6 3.2 3.65 0 .15 0 .28-.02.34h-4.27m2.87-1.5c-.05-.62-.48-1.2-1.34-1.2-.84 0-1.32.55-1.46 1.2h2.8m-.23-3.23h-2.58V8.12h2.58v.61Z" />
  </svg>
);

const YouTubeIcon = ({ className = "w-4 h-4" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="m10 15 5.19-3L10 9v6m11.56-7.83c.13.47.22 1.1.28 1.9.07.8.1 1.49.1 2.09L22 12c0 2.19-.16 3.8-.44 4.83-.25.9-.83 1.48-1.73 1.73-.47.13-1.33.22-2.65.28-1.3.07-2.49.1-3.59.1L12 19c-4.19 0-6.8-.16-7.83-.44-.9-.25-1.48-.83-1.73-1.73-.13-.47-.22-1.1-.28-1.9-.07-.8-.1-1.49-.1-2.09L2 12c0-2.19.16-3.8.44-4.83.25-.9.83-1.48 1.73-1.73.47-.13 1.33-.22 2.65-.28 1.3-.07 2.49-.1 3.59-.1L12 5c4.19 0 6.8.16 7.83.44.9.25 1.48.83 1.73 1.73Z" />
  </svg>
);

const InstagramIcon = ({ className = "w-4 h-4" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
  </svg>
);

export default function Modals({ 
  activeModal, 
  onClose, 
  onSwitchModal,
  onInteractiveEnter, 
  onInteractiveLeave 
}) {
  if (!activeModal || activeModal === 'home') return null;

  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);
  const [formSent, setFormSent] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });

  const copyEmail = () => {
    navigator.clipboard.writeText('riyasrivastava826@gmail.com');
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  const copyPhone = () => {
    navigator.clipboard.writeText('7909044169');
    setCopiedPhone(true);
    setTimeout(() => setCopiedPhone(false), 2500);
  };

  const handleContactSubmit = (e) => {
    e.preventDefault();
    setFormSent(true);
    setTimeout(() => {
      setFormSent(false);
      onClose();
    }, 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      {/* Dark Frosted Glass Overlay */}
      <div 
        className="fixed inset-0 bg-black/65 backdrop-blur-md transition-opacity duration-300"
        onClick={onClose}
      />

      {/* Modal Card */}
      <div 
        className="relative w-full max-w-3xl glass-card rounded-3xl p-6 sm:p-8 text-white z-10 my-auto max-h-[90vh] overflow-y-auto border border-white/20 shadow-2xl animate-in fade-in zoom-in-95 duration-200"
        onMouseEnter={onInteractiveEnter}
        onMouseLeave={onInteractiveLeave}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full glass-pill hover:bg-white/20 text-white/80 hover:text-white transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* ==================== WORK / PORTFOLIO MODAL ==================== */}
        {activeModal === 'work' && (
          <div>
            <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-emerald-400 font-mono mb-2">
              <Sparkles className="w-4 h-4" />
              <span>Portfolio & Creative Direction</span>
            </div>
            
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mb-2">Selected Works & Showcase</h2>
            <p className="text-xs sm:text-sm text-white/75 mb-6 max-w-xl">
              A curated selection of dynamic video reels, 3D visual concepts, and brand identity projects engineered with high aesthetic fidelity.
            </p>

            <div className="space-y-4">
              {/* Card 1: Motion Graphics & 2D/3D Video Reels */}
              <div className="p-5 rounded-2xl bg-white/5 border border-white/10 hover:border-white/25 hover:bg-white/10 transition-all duration-200 group">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-2.5">
                  <div className="flex items-center gap-2.5">
                    <div className="p-2 rounded-xl bg-red-600/30 border border-red-500/40 text-red-300">
                      <Film className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-base sm:text-lg text-white">
                        Motion Graphics & 2D/3D Video Reels
                      </h3>
                      <span className="text-[11px] font-mono text-emerald-300">Dynamic Visual Editing & Animation</span>
                    </div>
                  </div>

                  <a
                    href="https://youtu.be/e4o4Wtm1VCY"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 px-4 py-2 rounded-full bg-white text-[#770706] font-semibold text-xs hover:bg-neutral-100 shadow-md transition-all active:scale-95 w-fit"
                  >
                    <Play className="w-3.5 h-3.5 fill-current" />
                    <span>Watch Reel</span>
                    <ExternalLink className="w-3.5 h-3.5 opacity-70" />
                  </a>
                </div>

                <p className="text-xs sm:text-sm text-white/70 mb-3.5 leading-relaxed">
                  Showcasing dynamic visual editing, seamless kinetic typography, 2D/3D motion animations, and punchy rhythmic cuts designed for maximum audience retention.
                </p>

                <div className="flex flex-wrap gap-1.5">
                  {['Motion Graphics', '2D/3D Video Reels', 'Dynamic Editing', 'After Effects', 'Premiere Pro', 'Kinetic Typography'].map((tag, i) => (
                    <span key={i} className="text-[11px] font-mono px-2.5 py-0.5 rounded-md bg-white/10 text-white/85">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Card 2: Brand Identity & Advertising Renders */}
              <div className="p-5 rounded-2xl bg-white/5 border border-white/10 hover:border-white/25 hover:bg-white/10 transition-all duration-200 group">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-2.5">
                  <div className="flex items-center gap-2.5">
                    <div className="p-2 rounded-xl bg-amber-500/25 border border-amber-500/40 text-amber-300">
                      <Box className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-base sm:text-lg text-white">
                        Brand Identity & Advertising Renders
                      </h3>
                      <span className="text-[11px] font-mono text-amber-300">3D Conceptual Renders & Logo Systems</span>
                    </div>
                  </div>

                  <a
                    href="https://www.behance.net/riyasrivastava8"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 px-4 py-2 rounded-full bg-white/15 border border-white/30 text-white font-semibold text-xs hover:bg-white/25 shadow-md transition-all active:scale-95 w-fit"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>View Project</span>
                    <ExternalLink className="w-3.5 h-3.5 opacity-70" />
                  </a>
                </div>

                <p className="text-xs sm:text-sm text-white/70 mb-3.5 leading-relaxed">
                  Hyper-realistic 3D conceptual renders, luxury packaging visualization, logo design identity packages, and complete brand aesthetics crafted in Blender and Photoshop.
                </p>

                <div className="flex flex-wrap gap-1.5">
                  {['Brand Identity', '3D Renders', 'Advertising Visuals', 'Logo Design', 'Photoshop', 'Blender / C4D'].map((tag, i) => (
                    <span key={i} className="text-[11px] font-mono px-2.5 py-0.5 rounded-md bg-white/10 text-white/85">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Card 3: Cinematic Edits & Visual Art */}
              <div className="p-5 rounded-2xl bg-white/5 border border-white/10 hover:border-white/25 hover:bg-white/10 transition-all duration-200 group">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-2.5">
                  <div className="flex items-center gap-2.5">
                    <div className="p-2 rounded-xl bg-purple-500/25 border border-purple-500/40 text-purple-300">
                      <Palette className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-base sm:text-lg text-white">
                        Cinematic Edits & Visual Art
                      </h3>
                      <span className="text-[11px] font-mono text-purple-300">High-Contrast Color Grading & Aesthetics</span>
                    </div>
                  </div>

                  <a
                    href="https://www.instagram.com/riya_srivas_28/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 px-4 py-2 rounded-full bg-white/15 border border-white/30 text-white font-semibold text-xs hover:bg-white/25 shadow-md transition-all active:scale-95 w-fit"
                  >
                    <InstagramIcon className="w-3.5 h-3.5 text-pink-300" />
                    <span>View Project</span>
                    <ExternalLink className="w-3.5 h-3.5 opacity-70" />
                  </a>
                </div>

                <p className="text-xs sm:text-sm text-white/70 mb-3.5 leading-relaxed">
                  High-contrast color grading, vintage/polaroid aesthetic treatments, film grain textures, and evocative visual art tailored for social campaigns and music videos.
                </p>

                <div className="flex flex-wrap gap-1.5">
                  {['Cinematic Color Grading', 'Polaroid Aesthetic', 'Visual Art', 'Film Emulation', 'DaVinci Resolve', 'Lightroom'].map((tag, i) => (
                    <span key={i} className="text-[11px] font-mono px-2.5 py-0.5 rounded-md bg-white/10 text-white/85">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-3">
              <span className="text-xs text-white/60 font-mono">
                Have a creative brief in mind?
              </span>
              <button
                onClick={() => onSwitchModal('contact')}
                className="flex items-center gap-2 text-xs font-semibold text-white hover:text-emerald-300 transition-colors"
              >
                <span>Initiate a project</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}

        {/* ==================== ABOUT MODAL ==================== */}
        {activeModal === 'about' && (
          <div>
            <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-emerald-400 font-mono mb-2">
              <Layers className="w-4 h-4" />
              <span>Multi-Disciplinary Visual Artist</span>
            </div>
            
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mb-4">About Me</h2>

            {/* Exact Required About Content */}
            <div className="p-4 sm:p-5 rounded-2xl bg-white/5 border border-white/15 mb-6 text-sm text-white/90 leading-relaxed space-y-3 font-normal">
              <p>
                I am <span className="font-semibold text-white">Riya Srivastava</span>, a multi-disciplinary visual artist with expertise in motion design, video editing, and graphic design. My passion lies in creating cinematic, high-contrast visual concepts, modern branding, and 3D illustrations.
              </p>
              <p>
                Whether it's crafting brand identity, editing dynamic reels, or creating immersive motion graphics, I focus on delivering award-winning aesthetic appeal with precision and creativity.
              </p>
            </div>

            {/* Skills & Tools Highlighted */}
            <div className="mb-6">
              <h3 className="text-xs font-mono uppercase tracking-widest text-white/70 mb-3">
                Skills & Capabilities Highlighted
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                {[
                  { label: 'Graphic Design', desc: 'Branding, Layouts, Posters' },
                  { label: 'Video Editing', desc: 'Dynamic Reels, Commercials' },
                  { label: 'Motion Graphics', desc: 'Kinetic Type, 2D/3D Animation' },
                  { label: 'Color Grading', desc: 'High-Contrast, Film Tone' },
                  { label: '3D Render & Illustration', desc: 'Conceptual Art, Product' },
                  { label: 'Brand Identity & UI Aesthetics', desc: 'Modern Design Systems' }
                ].map((skill, idx) => (
                  <div key={idx} className="p-3 rounded-xl bg-white/5 border border-white/10 hover:border-white/20 transition-all">
                    <span className="block text-xs font-semibold text-white">{skill.label}</span>
                    <span className="text-[11px] text-white/60">{skill.desc}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Software Stack */}
            <div className="mb-6">
              <h3 className="text-xs font-mono uppercase tracking-widest text-white/70 mb-2">
                Creative Suite & Workflow
              </h3>
              <div className="flex flex-wrap gap-2">
                {['Adobe Premiere Pro', 'Adobe After Effects', 'Adobe Photoshop', 'Adobe Illustrator', 'Blender 3D', 'DaVinci Resolve', 'Figma'].map((tool, i) => (
                  <span key={i} className="text-xs font-mono px-3 py-1 rounded-full bg-white/10 border border-white/15 text-white/90">
                    {tool}
                  </span>
                ))}
              </div>
            </div>

            {/* Quick Action Footer */}
            <div className="pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-3">
              <button
                onClick={() => onSwitchModal('work')}
                className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-white text-[#770706] font-semibold text-xs hover:bg-neutral-100 transition-all"
              >
                <span>Explore Showcase</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>

              <button
                onClick={() => onSwitchModal('contact')}
                className="flex items-center gap-2 px-5 py-2.5 rounded-full glass-pill border border-white/30 text-white font-medium text-xs hover:bg-white/20 transition-all"
              >
                <Mail className="w-3.5 h-3.5" />
                <span>Get In Touch</span>
              </button>
            </div>
          </div>
        )}

        {/* ==================== CONTACT MODAL ==================== */}
        {activeModal === 'contact' && (
          <div>
            <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-emerald-400 font-mono mb-2">
              <Mail className="w-4 h-4" />
              <span>Direct Communication</span>
            </div>

            {/* Exact Required Headline */}
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mb-2">
              Let's Collaborate & Bring Your Vision to Life
            </h2>
            <p className="text-xs sm:text-sm text-white/75 mb-6 max-w-xl">
              Ready to elevate your visual identity, dynamic reels, or motion campaigns? Reach out directly or dispatch a message below.
            </p>

            {/* Quick Professional Profiles Buttons */}
            <div className="mb-6 p-4 rounded-2xl bg-white/5 border border-white/15">
              <span className="block text-xs font-mono uppercase tracking-widest text-white/70 mb-3">
                Professional Profiles & Channels
              </span>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                
                {/* LinkedIn */}
                <a
                  href="https://www.linkedin.com/in/riya-srivastava-a21232142/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 p-2.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/15 text-xs font-semibold text-white transition-all group"
                >
                  <LinkedInIcon className="w-4 h-4 text-sky-400" />
                  <span className="truncate">LinkedIn</span>
                  <ExternalLink className="w-3 h-3 opacity-60 ml-auto" />
                </a>

                {/* Behance */}
                <a
                  href="https://www.behance.net/riyasrivastava8"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 p-2.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/15 text-xs font-semibold text-white transition-all group"
                >
                  <BehanceIcon className="w-4 h-4 text-blue-400" />
                  <span className="truncate">Behance</span>
                  <ExternalLink className="w-3 h-3 opacity-60 ml-auto" />
                </a>

                {/* Motion Portfolio YouTube */}
                <a
                  href="https://youtu.be/e4o4Wtm1VCY"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 p-2.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/15 text-xs font-semibold text-white transition-all group"
                >
                  <YouTubeIcon className="w-4 h-4 text-red-400" />
                  <span className="truncate">Motion Reel</span>
                  <ExternalLink className="w-3 h-3 opacity-60 ml-auto" />
                </a>

                {/* Instagram */}
                <a
                  href="https://www.instagram.com/riya_srivas_28/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 p-2.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/15 text-xs font-semibold text-white transition-all group"
                >
                  <InstagramIcon className="w-4 h-4 text-pink-400" />
                  <span className="truncate">Instagram</span>
                  <ExternalLink className="w-3 h-3 opacity-60 ml-auto" />
                </a>

              </div>
            </div>

            {/* Direct Contact Pills: Email & Phone */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
              
              <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-between gap-3">
                <div className="min-w-0">
                  <span className="text-[10px] font-mono uppercase text-white/50 block">EMAIL ADDRESS</span>
                  <span className="text-xs sm:text-sm font-medium text-white truncate block">riyasrivastava826@gmail.com</span>
                </div>
                <button
                  type="button"
                  onClick={copyEmail}
                  className="p-2 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors flex-shrink-0"
                  title="Copy Email"
                >
                  {copiedEmail ? <CheckCircle2 className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4 text-white/70" />}
                </button>
              </div>

              <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-between gap-3">
                <div className="min-w-0">
                  <span className="text-[10px] font-mono uppercase text-white/50 block">PHONE / WHATSAPP</span>
                  <span className="text-xs sm:text-sm font-medium text-white block">+91 7909044169</span>
                </div>
                <button
                  type="button"
                  onClick={copyPhone}
                  className="p-2 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors flex-shrink-0"
                  title="Copy Phone"
                >
                  {copiedPhone ? <CheckCircle2 className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4 text-white/70" />}
                </button>
              </div>

            </div>

            {/* Functional Contact Form */}
            {formSent ? (
              <div className="p-8 rounded-2xl bg-emerald-950/70 border border-emerald-500/40 text-center flex flex-col items-center gap-3">
                <CheckCircle2 className="w-10 h-10 text-emerald-400" />
                <h3 className="text-lg font-semibold text-white">Message Dispatched Successfully!</h3>
                <p className="text-xs text-white/80">
                  Thank you for reaching out, Riya will get back to you shortly.
                </p>
              </div>
            ) : (
              <form onSubmit={handleContactSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-[11px] font-mono text-white/70 mb-1">YOUR NAME</label>
                    <input 
                      type="text" 
                      required 
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      placeholder="Jane Doe" 
                      className="w-full px-3.5 py-2.5 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/40 focus:outline-none focus:border-white/60 text-xs sm:text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-mono text-white/70 mb-1">EMAIL ADDRESS</label>
                    <input 
                      type="email" 
                      required 
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      placeholder="jane@company.com" 
                      className="w-full px-3.5 py-2.5 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/40 focus:outline-none focus:border-white/60 text-xs sm:text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-mono text-white/70 mb-1">PHONE NUMBER</label>
                    <input 
                      type="tel" 
                      value={formData.phone}
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                      placeholder="Your contact number" 
                      className="w-full px-3.5 py-2.5 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/40 focus:outline-none focus:border-white/60 text-xs sm:text-sm"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-mono text-white/70 mb-1">PROJECT DETAILS / BRIEF</label>
                  <textarea 
                    rows={3} 
                    required 
                    value={formData.message}
                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                    placeholder="Describe your design, video editing, motion graphics, or 3D project requirements..." 
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/40 focus:outline-none focus:border-white/60 text-xs sm:text-sm resize-none"
                  ></textarea>
                </div>

                <div className="flex items-center justify-between pt-1">
                  <span className="text-[11px] font-mono text-white/50">
                    Direct Contact: 7909044169
                  </span>

                  <button
                    type="submit"
                    className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-white text-[#770706] font-semibold text-xs sm:text-sm hover:bg-neutral-100 shadow-xl transition-all active:scale-95"
                  >
                    <span>Send Inquiry</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </form>
            )}
          </div>
        )}

      </div>
    </div>
  );
}
