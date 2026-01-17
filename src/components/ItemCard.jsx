import React from 'react';
import { Star, Sparkles } from 'lucide-react';

const ItemCard = ({ item, onClick }) => {
  // 根据类型确定边框和背景颜色
  const getTypeStyle = (type) => {
    switch (type) {
      case '基础装备':
        return {
          border: 'border-2 border-dashed border-anime-yellow',
          bg: 'bg-gradient-to-br from-anime-yellow/20 to-anime-pink/10',
          badge: 'bg-gradient-to-r from-anime-yellow to-anime-pink'
        };
      case '合成装备':
        return {
          border: 'border-2 border-dashed border-anime-blue',
          bg: 'bg-gradient-to-br from-anime-blue/20 to-cyan-300/10',
          badge: 'bg-gradient-to-r from-anime-blue to-cyan-400'
        };
      case '转职装备':
        return {
          border: 'border-2 border-dashed border-anime-purple',
          bg: 'bg-gradient-to-br from-anime-purple/20 to-indigo-400/10',
          badge: 'bg-gradient-to-r from-anime-purple to-indigo-500'
        };
      default:
        return {
          border: 'border-2 border-dashed border-gray-400',
          bg: 'bg-gray-100/50',
          badge: 'bg-gray-500'
        };
    }
  };
  
  const typeStyle = getTypeStyle(item.type);
  
  return (
    <div 
      onClick={onClick}
      className={`${typeStyle.border} ${typeStyle.bg} rounded-2xl overflow-hidden shadow-lg cursor-pointer transform transition-all duration-300 hover:scale-105 hover:shadow-xl hover-pop relative`}
    >
      <div className="absolute -top-2 -right-2">
        <Sparkles className="text-anime-pink" size={16} />
      </div>
      <div className="relative pb-[100%]"> {/* 1:1 Aspect Ratio */}
        <img 
          src={item.image} 
          alt={item.name} 
          className="absolute w-full h-full object-cover"
          loading="lazy"
        />
        <div className="absolute bottom-2 right-2 bg-white/80 dark:bg-[#0D0B1C]/80 rounded-full p-1">
          <Star className="text-anime-yellow" size={12} fill="currentColor" />
        </div>
      </div>
      <div className="p-3">
        <div className="flex justify-between items-start mb-1">
          <h3 className="font-bold text-[#1C1C1E] dark:text-[#EAEAEA] truncate">{item.name}</h3>
          <span className={`${typeStyle.badge} text-white text-xs flex items-center justify-center px-2 py-1 rounded-full`}>
            {item.type === '基础装备' ? '基础' : item.type === '合成装备' ? '合成' : '转职'}
          </span>
        </div>
        <p className="text-xs text-[#8D8D93] dark:text-[#D1D1D6]">{item.season}</p>
      </div>
    </div>
  );
};

export default ItemCard;