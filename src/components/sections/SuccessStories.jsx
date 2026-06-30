import React from "react";
import { motion } from "framer-motion";
import { Play } from "lucide-react";

const stories = [
  {
    id: 1,
    name: "Rahul Sharma",
    college: "Tier-3 Engineering College",
    achievement: "Won Smart India Hackathon",
    company: "Google",
    quote: "The mentorship I received completely changed my trajectory. I went from struggling with tutorials to building real products.",
    thumbnail: "https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?auto=format&fit=crop&w=600&q=80",
    duration: "2:14"
  },
  {
    id: 2,
    name: "Priya Patel",
    college: "State University",
    achievement: "Open Source Contributor",
    company: "Microsoft",
    quote: "Finding a community of ambitious builders pushed me out of my comfort zone. I landed my dream internship in 6 months.",
    thumbnail: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=600&q=80",
    duration: "1:45"
  },
  {
    id: 3,
    name: "Arjun Reddy",
    college: "Local Engineering College",
    achievement: "Built a 10k MRR Startup",
    company: "Founder",
    quote: "I didn't have a network. Topper Mantra became my network. The projects I built here were my ultimate proof of work.",
    thumbnail: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=600&q=80",
    duration: "3:02"
  }
];

export default function SuccessStories() {
  return (
    <section className="pt-32 pb-24 bg-[#0F172A] border-y border-slate-800">
      <div className="w-full max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold font-heading mb-6 text-white">
            Don't Just Take <span className="text-[#FF5722]">Our Word</span> For It
          </h2>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto">
            Hear from students who defied the odds, built incredible projects, and landed roles at top tech companies.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {stories.map((story, i) => (
            <motion.div
              key={story.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.6 }}
              className="group relative cursor-pointer"
            >
              {/* Video Thumbnail Card */}
              <div className="relative h-[400px] w-full rounded-2xl overflow-hidden shadow-2xl">
                <img 
                  src={story.thumbnail} 
                  alt={story.name} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A] via-[#0F172A]/40 to-transparent opacity-90 transition-opacity duration-300 group-hover:opacity-80" />

                {/* Play Button Overlay */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/30 transition-transform duration-300 group-hover:scale-110 group-hover:bg-[#FF5722]/90 group-hover:border-[#FF5722]">
                    <Play className="w-6 h-6 text-white ml-1" fill="currentColor" />
                  </div>
                </div>

                {/* Duration */}
                <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-sm px-2 py-1 rounded text-xs font-bold text-white border border-white/10">
                  {story.duration}
                </div>

                {/* Content */}
                <div className="absolute bottom-0 left-0 w-full p-6">
                  <div className="mb-4">
                    <span className="inline-block px-3 py-1 bg-[#FF5722] text-white text-xs font-bold rounded-full mb-3 shadow-lg shadow-orange-500/30">
                      Now at {story.company}
                    </span>
                    <p className="text-white font-serif italic text-lg leading-snug mb-4 line-clamp-3">
                      "{story.quote}"
                    </p>
                  </div>
                  
                  <div className="flex items-center gap-3 border-t border-white/10 pt-4">
                    <div>
                      <h4 className="text-white font-bold">{story.name}</h4>
                      <p className="text-slate-400 text-xs">{story.college}</p>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Hover Glow */}
              <div className="absolute -inset-0.5 bg-gradient-to-b from-[#FF5722] to-transparent rounded-2xl blur opacity-0 group-hover:opacity-20 transition duration-500 -z-10"></div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
