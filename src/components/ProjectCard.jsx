import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/lib/LanguageContext';
import { MapPin, ArrowUpRight } from 'lucide-react';
import { motion } from 'framer-motion';

export default function ProjectCard({ project, index = 0 }) {
  const { language } = useLanguage();

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
    >
      <Link to={`/projects/${project.id}`} className="group block relative overflow-hidden rounded-2xl aspect-[4/3]">
        <img
          src={project.image}
          alt={project.title[language]}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          loading="lazy"
        />
        {/* Base gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent transition-opacity duration-300" />
        {/* Hover overlay */}
        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-400" />

        {/* Arrow button — top right, same as service cards */}
        <div className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/0 group-hover:bg-white/90 border border-white/30 flex items-center justify-center transition-all duration-300 scale-75 group-hover:scale-100">
          <ArrowUpRight className="w-4 h-4 text-white group-hover:text-black transition-colors duration-200" />
        </div>

        {/* Info at bottom */}
   <div className="absolute bottom-0 left-0 right-0 p-5">
  <h3 className="font-body text-base md:text-lg font-semibold text-white leading-tight">
    {project.title[language]}
  </h3>

  <div className="flex items-center justify-between mt-2">
    <div className="flex items-center gap-1.5 text-white/70">
      <MapPin className="w-3.5 h-3.5" />
      <span className="font-body text-xs">
        {project.location[language]}
      </span>
    </div>

    <span className="font-body text-xs text-white/60">
      {project.year}
    </span>
  </div>
</div>
      </Link>
    </motion.div>
  );
}