import React from 'react';
import { Star, Sparkles } from 'lucide-react';

const HeroCard = ({ hero, onClick }) => {
  // 根据费用确定边框和背景颜色
  const getCostStyle = (cost) => {
    switch (cost) {
      case 1:
        return {
          border: 'border-2 border-dashed border-anime-yellow',
          bg: 'bg-gradient-to-br from-anime-yellow/20 to-anime-pink/10',
          badge: 'bg-gradient-to-r from-anime-yellow to-anime-pink'
        };
      case 2:
        return {
          border: 'border-2 border-dashed border-anime-blue',
          bg: 'bg-gradient-to-br from-anime-blue/20 to-cyan-300/10',
          badge: 'bg-gradient-to-r from-anime-blue to-cyan-400'
        };
      case 3:
        return {
          border: 'border-2 border-dashed border-anime-purple',
          bg: 'bg-gradient-to-br from-anime-purple/20 to-indigo-400/10',
          badge: 'bg-gradient-to-r from-anime-purple to-indigo-500'
        };
      case 4:
        return {
          border: 'border-2 border-dashed border-pink-500',
          bg: 'bg-gradient-to-br from-pink-400/20 to-rose-400/10',
          badge: 'bg-gradient-to-r from-pink-500 to-rose-500'
        };
      case 5:
        return {
          border: 'border-2 border-dashed border-gradient-start',
          bg: 'bg-gradient-to-br from-gradient-start/20 to-gradient-end/10',
          badge: 'bg-gradient-to-r from-gradient-start via-gradient-mid to-gradient-end'
        };
      default:
        return {
          border: 'border-2 border-dashed border-gray-400',
          bg: 'bg-gray-100/50',
          badge: 'bg-gray-500'
        };
    }
  };
  
  const costStyle = getCostStyle(hero.cost);
  
  return (
    <div 
      onClick={onClick}
      className={`${costStyle.border} ${costStyle.bg} rounded-2xl overflow-hidden shadow-lg cursor-pointer transform transition-all duration-300 hover:scale-105 hover:shadow-xl hover-pop relative`}
    >
      <div className="absolute -top-2 -right-2">
        <Sparkles className="text-anime-pink" size={16} />
      </div>
      <div className="relative pb-[100%]"> {/* 1:1 Aspect Ratio */}
        <img 
          src={hero.image} 
          alt={hero.name} 
          className="absolute w-full h-full object-cover hover:opacity-90 transition-opacity duration-300"
          loading="lazy"
        />
        <div className="absolute bottom-2 right-2 bg-white/80 dark:bg-[#0D0B1C]/80 rounded-full p-1">
          <Star className="text-anime-yellow" size={12} fill="currentColor" />
        </div>
      </div>
      <div className="p-3">
          <div className="flex justify-between items-start mb-1">
            <h3 className="font-bold text-[#1C1C1E] dark:text-[#EAEAEA] truncate">{hero.name}</h3>
            <span className={`${costStyle.badge} text-white text-xs flex items-center justify-center w-6 h-6 rounded-full`}>
              {hero.cost}
            </span>
          </div>
          <p className="text-xs text-[#8D8D93] dark:text-[#D1D1D6] mb-2 truncate">{hero.title}</p>
          <div className="flex flex-wrap gap-1">
            {hero.traits.map((trait, index) => (
              <span 
                key={index} 
                className="px-2 py-1 text-xs rounded-full bg-gradient-to-r from-anime-pink/30 to-anime-purple/30 text-anime-purple border border-dashed border-anime-pink/40"
              >
                {trait}
              </span>
            ))}
          </div>
        </div>
    </div>
  );
};

export default HeroCard;