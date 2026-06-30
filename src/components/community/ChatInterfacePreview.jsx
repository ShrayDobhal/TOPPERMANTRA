import React from 'react';
import { motion } from 'framer-motion';
import { Hash, Settings, Bell, Search, Mic, Video, Users, Smile, PlusCircle, Send, MoreVertical, ShieldAlert } from 'lucide-react';
import { Button } from '../ui/Button';

export default function ChatInterfacePreview() {
  return (
    <section className="py-24 bg-slate-900 border-t border-slate-800 relative overflow-hidden">
      
      {/* Background Ornaments */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#FF5722]/10 rounded-full blur-[100px] pointer-events-none translate-x-1/2 -translate-y-1/2"></div>
      
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4">
          <div className="max-w-2xl">
            <motion.div
               initial={{ opacity: 0, scale: 0.9 }}
               whileInView={{ opacity: 1, scale: 1 }}
               viewport={{ once: true }}
               className="inline-flex items-center gap-2 py-1 px-3 rounded-full bg-slate-800 border border-slate-700 text-slate-300 font-bold text-xs mb-4"
            >
               <span className="w-2 h-2 rounded-full bg-[#FF5722] animate-pulse"></span>
               Supabase Realtime Powered
            </motion.div>
            <motion.h2 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="text-3xl md:text-5xl font-bold font-heading text-white mb-4"
            >
              Collaborate in <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF5722] to-[#FE6D4D]">Real-Time.</span>
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-slate-400 text-lg"
            >
              Every space comes with dedicated chat channels. Share code snippets, jump into voice rooms, and stay connected with push notifications.
            </motion.p>
          </div>
        </div>

        {/* Browser Mockup Window */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, type: "spring" }}
          className="rounded-xl overflow-hidden border border-slate-700 shadow-2xl bg-[#0B1120] flex flex-col h-[600px] max-w-5xl mx-auto"
        >
          {/* Fake Browser Toolbar */}
          <div className="h-10 bg-slate-800 border-b border-slate-700 flex items-center px-4 gap-2 shrink-0">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <div className="w-3 h-3 rounded-full bg-amber-500"></div>
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
            <div className="flex-1 flex justify-center">
              <div className="bg-slate-900 rounded-md h-6 w-64 border border-slate-700/50 flex items-center justify-center text-[10px] text-slate-500 font-mono">
                toppermantra.com/community/web-dev
              </div>
            </div>
          </div>

          {/* App Layout */}
          <div className="flex-1 flex overflow-hidden">
            
            {/* Server Sidebar (Discord Style) */}
            <div className="hidden md:flex w-16 bg-[#0B1120] border-r border-slate-800 flex-col items-center py-4 gap-3 shrink-0">
              <div className="w-12 h-12 rounded-2xl bg-[#FF5722] text-white flex items-center justify-center font-bold text-xl hover:rounded-xl transition-all cursor-pointer">
                TM
              </div>
              <div className="w-8 h-1 bg-slate-800 rounded-full my-1"></div>
              <div className="w-12 h-12 rounded-[24px] bg-indigo-500 text-white flex items-center justify-center text-2xl hover:rounded-xl transition-all cursor-pointer">
                💻
              </div>
              <div className="w-12 h-12 rounded-[24px] bg-slate-800 text-white flex items-center justify-center text-2xl hover:rounded-xl hover:bg-emerald-500 transition-all cursor-pointer group">
                <span className="group-hover:hidden">🧠</span>
                <span className="hidden group-hover:block text-sm">Join</span>
              </div>
              <div className="mt-auto w-12 h-12 rounded-[24px] bg-slate-800 text-slate-400 flex items-center justify-center hover:rounded-xl hover:text-white transition-all cursor-pointer">
                <PlusCircle className="w-6 h-6" />
              </div>
            </div>

            {/* Channels Sidebar */}
            <div className="hidden sm:flex w-60 bg-slate-900 border-r border-slate-800 flex-col shrink-0">
              <div className="h-14 flex items-center px-4 font-bold text-white shadow-sm border-b border-slate-800 shrink-0">
                Web Developers
              </div>
              <div className="flex-1 overflow-y-auto p-3 space-y-4">
                <div>
                  <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1 px-1">Text Channels</div>
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-2 text-slate-400 hover:text-slate-200 hover:bg-slate-800 px-2 py-1.5 rounded cursor-pointer transition-colors">
                      <Hash className="w-4 h-4" /> general
                    </div>
                    <div className="flex items-center gap-2 text-white bg-slate-800 px-2 py-1.5 rounded cursor-pointer">
                      <Hash className="w-4 h-4 text-slate-400" /> react-help
                    </div>
                    <div className="flex items-center justify-between text-slate-400 hover:text-slate-200 hover:bg-slate-800 px-2 py-1.5 rounded cursor-pointer transition-colors">
                      <div className="flex items-center gap-2"><Hash className="w-4 h-4" /> resources</div>
                      <div className="w-2 h-2 rounded-full bg-white"></div>
                    </div>
                  </div>
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1 px-1">Voice Rooms</div>
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-2 text-slate-400 hover:text-slate-200 hover:bg-slate-800 px-2 py-1.5 rounded cursor-pointer transition-colors">
                      <Mic className="w-4 h-4" /> Co-working Space
                    </div>
                  </div>
                </div>
              </div>
              {/* User Bar */}
              <div className="h-14 bg-slate-800/50 border-t border-slate-800 flex items-center px-3 gap-3 shrink-0">
                <div className="relative">
                  <img src="https://i.pravatar.cc/150?img=3" alt="User" className="w-8 h-8 rounded-full" />
                  <div className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-green-500 border border-slate-800"></div>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-bold text-white truncate">You</div>
                  <div className="text-xs text-slate-400 truncate">#0001</div>
                </div>
                <Settings className="w-4 h-4 text-slate-400 hover:text-white cursor-pointer" />
              </div>
            </div>

            {/* Main Chat Area */}
            <div className="flex-1 flex flex-col min-w-0 bg-[#0B1120]">
              {/* Chat Header */}
              <div className="h-14 border-b border-slate-800 flex items-center justify-between px-4 shrink-0">
                <div className="flex items-center gap-2 text-white font-bold">
                  <Hash className="w-5 h-5 text-slate-400" /> react-help
                </div>
                <div className="flex items-center gap-4 text-slate-400">
                  <Bell className="w-5 h-5 cursor-pointer hover:text-white transition-colors" />
                  <Users className="w-5 h-5 cursor-pointer hover:text-white transition-colors hidden md:block" />
                  <div className="hidden md:flex relative">
                    <Search className="w-4 h-4 absolute left-2 top-1/2 -translate-y-1/2" />
                    <input type="text" placeholder="Search" className="bg-slate-900 border border-slate-700 text-sm text-white rounded px-2 pl-8 py-1 w-32 focus:w-48 transition-all outline-none" />
                  </div>
                </div>
              </div>

              {/* Chat Feed */}
              <div className="flex-1 overflow-y-auto p-4 space-y-6">
                
                {/* Welcome Message */}
                <div className="text-center pb-4 border-b border-slate-800/50">
                  <div className="w-16 h-16 rounded-full bg-slate-800 flex items-center justify-center mx-auto mb-4">
                    <Hash className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-white font-bold text-xl mb-1">Welcome to #react-help!</h3>
                  <p className="text-slate-400 text-sm">This is the start of the #react-help channel.</p>
                </div>

                {/* Message 1 */}
                <div className="flex gap-4 group">
                  <img src="https://i.pravatar.cc/150?img=11" alt="Rahul" className="w-10 h-10 rounded-full shrink-0" />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-baseline gap-2 mb-1">
                      <span className="font-bold text-emerald-400 hover:underline cursor-pointer">Rahul Sharma</span>
                      <span className="text-xs text-slate-500">Today at 10:24 AM</span>
                    </div>
                    <p className="text-slate-300">Hey guys, does anyone know why my useEffect is triggering infinitely when I pass an object to the dependency array?</p>
                  </div>
                </div>

                {/* Message 2 */}
                <div className="flex gap-4 group hover:bg-slate-800/30 p-1 -m-1 rounded">
                  <img src="https://i.pravatar.cc/150?img=5" alt="Priya" className="w-10 h-10 rounded-full shrink-0" />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-baseline gap-2 mb-1">
                      <span className="font-bold text-indigo-400 hover:underline cursor-pointer">Priya Patel</span>
                      <span className="bg-indigo-500/20 text-indigo-300 text-[9px] font-bold uppercase px-1 rounded">Mentor</span>
                      <span className="text-xs text-slate-500">Today at 10:26 AM</span>
                    </div>
                    <p className="text-slate-300 mb-2">React uses referential equality for the dependency array. If you recreate the object on every render, the reference changes.</p>
                    <div className="bg-slate-900 border border-slate-800 p-3 rounded-md font-mono text-xs text-slate-300 overflow-x-auto">
                      <span className="text-pink-400">const</span> memoizedObj = <span className="text-blue-400">useMemo</span>(() =&gt; (&#123; key: <span className="text-green-400">'value'</span> &#125;), []);
                    </div>
                    
                    {/* Fake Moderation Popover (Hidden on default, shown on hover via group for demo) */}
                    <div className="absolute right-8 -mt-8 bg-slate-800 border border-slate-700 shadow-xl rounded flex items-center opacity-0 group-hover:opacity-100 transition-opacity">
                       <div className="p-1.5 hover:bg-slate-700 text-slate-300 cursor-pointer rounded-l"><Smile className="w-4 h-4"/></div>
                       <div className="w-px h-4 bg-slate-600"></div>
                       <div className="p-1.5 hover:bg-slate-700 text-slate-300 cursor-pointer"><ShieldAlert className="w-4 h-4"/></div>
                       <div className="w-px h-4 bg-slate-600"></div>
                       <div className="p-1.5 hover:bg-slate-700 text-slate-300 cursor-pointer rounded-r"><MoreVertical className="w-4 h-4"/></div>
                    </div>
                  </div>
                </div>

                {/* Typing Indicator */}
                <div className="flex items-center gap-2 text-slate-500 text-xs font-semibold px-2 animate-pulse">
                  <div className="flex gap-1">
                    <span className="w-1 h-1 bg-slate-500 rounded-full"></span>
                    <span className="w-1 h-1 bg-slate-500 rounded-full"></span>
                    <span className="w-1 h-1 bg-slate-500 rounded-full"></span>
                  </div>
                  Rahul Sharma is typing...
                </div>

              </div>

              {/* Chat Input */}
              <div className="p-4 shrink-0 border-t border-slate-800/50">
                <div className="bg-slate-800 rounded-lg flex items-center p-2 pr-3">
                  <div className="p-2 text-slate-400 hover:text-white cursor-pointer"><PlusCircle className="w-5 h-5"/></div>
                  <input type="text" placeholder="Message #react-help" className="flex-1 bg-transparent text-white outline-none placeholder-slate-500 mx-2" />
                  <div className="p-2 text-[#FF5722] hover:text-[#FE6D4D] cursor-pointer"><Send className="w-5 h-5"/></div>
                </div>
              </div>

            </div>

          </div>
        </motion.div>
      </div>
    </section>
  );
}
