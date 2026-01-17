import React from 'react';
import { X } from 'lucide-react';

const HeroDetailModal = ({ hero, onClose }) => {
  // 根据费用确定边框颜色
  const getBorderColor = (cost) => {
    switch (cost) {
      case 1: return 'border-gray-400';
      case 2: return 'border-green-500';
      case 3: return 'border-blue-500';
      case 4: return 'border-purple-500';
      case 5: return 'border-yellow-500';
      default: return 'border-gray-400';
    }
  };
  
  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-[#1A182E] rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-[#D1D1D6] dark:border-[#8D8D93]">
        {/* 头部 */}
        <div className="sticky top-0 bg-white dark:bg-[#1A182E] p-6 border-b border-[#D1D1D6] dark:border-[#8D8D93] flex justify-between items-start">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <h2 className="text-2xl font-bold text-[#1C1C1E] dark:text-[#EAEAEA]">{hero.name}</h2>
              <span className={`px-3 py-1 rounded-full text-white text-sm font-bold ${getBorderColor(hero.cost).replace('border', 'bg')}`}>
                {hero.cost}费
              </span>
            </div>
            <p className="text-[#6A5ACD] dark:text-[#4ECDC4]">{hero.title}</p>
          </div>
          <button 
            onClick={onClose}
            className="p-2 rounded-full hover:bg-[#F5F0FF] dark:hover:bg-[#0D0B1C] transition-colors duration-200"
          >
            <X className="w-5 h-5 text-[#8D8D93]" />
          </button>
        </div>
        
        {/* 内容 */}
        <div className="p-6">
          <div className="flex flex-col md:flex-row gap-6 mb-6">
            <div className="md:w-1/3">
              <div className="rounded-xl overflow-hidden border-2 border-[#D1D1D6] dark:border-[#8D8D93]">
                <img 
                  src={hero.image} 
                  alt={hero.name} 
                  className="w-full h-auto object-cover"
                />
              </div>
            </div>
            
            <div className="md:w-2/3">
              <div className="mb-6">
                <h3 className="text-lg font-bold mb-3 text-[#1C1C1E] dark:text-[#EAEAEA]">基本信息</h3>
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-[#F5F0FF] dark:bg-[#0D0B1C] p-3 rounded-lg">
                    <p className="text-sm text-[#8D8D93] dark:text-[#D1D1D6]">生命值</p>
                    <p className="font-bold text-[#1C1C1E] dark:text-[#EAEAEA]">{hero.health[0]} / {hero.health[1]} / {hero.health[2]}</p>
                  </div>
                  <div className="bg-[#F5F0FF] dark:bg-[#0D0B1C] p-3 rounded-lg">
                    <p className="text-sm text-[#8D8D93] dark:text-[#D1D1D6]">攻击力</p>
                    <p className="font-bold text-[#1C1C1E] dark:text-[#EAEAEA]">{hero.attack[0]} / {hero.attack[1]} / {hero.attack[2]}</p>
                  </div>
                  <div className="bg-[#F5F0FF] dark:bg-[#0D0B1C] p-3 rounded-lg">
                    <p className="text-sm text-[#8D8D93] dark:text-[#D1D1D6]">护甲</p>
                    <p className="font-bold text-[#1C1C1E] dark:text-[#EAEAEA]">{hero.armor}</p>
                  </div>
                  <div className="bg-[#F5F0FF] dark:bg-[#0D0B1C] p-3 rounded-lg">
                    <p className="text-sm text-[#8D8D93] dark:text-[#D1D1D6]">魔抗</p>
                    <p className="font-bold text-[#1C1C1E] dark:text-[#EAEAEA]">{hero.magicResist}</p>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-bold mb-3 text-[#1C1C1E] dark:text-[#EAEAEA]">羁绊</h3>
                <div className="flex flex-wrap gap-2">
                  {hero.traits.map((trait, index) => (
                    <span 
                      key={index} 
                      className="px-3 py-1 rounded-full bg-[#6A5ACD] text-white text-sm"
                    >
                      {trait}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-bold mb-3 text-[#1C1C1E] dark:text-[#EAEAEA]">技能</h3>
            <div className="bg-gradient-to-r from-[#6A5ACD]/10 to-[#4ECDC4]/10 dark:from-[#6A5ACD]/20 dark:to-[#4ECDC4]/20 p-5 rounded-xl border border-[#D1D1D6] dark:border-[#8D8D93]">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-lg bg-[#6A5ACD] flex items-center justify-center">
                  <span className="text-white font-bold">技</span>
                </div>
                <h4 className="text-xl font-bold text-[#1C1C1E] dark:text-[#EAEAEA]">{hero.skill.name}</h4>
              </div>
              <p className="text-[#1C1C1E] dark:text-[#EAEAEA] mb-4">{hero.skill.description}</p>
              
              <div className="overflow-x-auto">
                <table className="w-full min-w-full">
                  <thead>
                    <tr className="bg-[#F5F0FF] dark:bg-[#0D0B1C]">
                      <th className="py-2 px-4 text-left text-[#1C1C1E] dark:text-[#EAEAEA] font-bold">等级</th>
                      <th className="py-2 px-4 text-left text-[#1C1C1E] dark:text-[#EAEAEA] font-bold">伤害</th>
                      {hero.skill.stats[0].stun && (
                        <th className="py-2 px-4 text-left text-[#1C1C1E] dark:text-[#EAEAEA] font-bold">眩晕时间</th>
                      )}
                    </tr>
                  </thead>
                  <tbody>
                    {hero.skill.stats.map((stat, index) => (
                      <tr key={index} className="border-b border-[#D1D1D6] dark:border-[#8D8D93] last:border-0">
                        <td className="py-2 px-4 text-[#1C1C1E] dark:text-[#EAEAEA]">{stat.level}</td>
                        <td className="py-2 px-4 text-[#1C1C1E] dark:text-[#EAEAEA]">{stat.damage}</td>
                        {stat.stun && (
                          <td className="py-2 px-4 text-[#1C1C1E] dark:text-[#EAEAEA]">{stat.stun}</td>
                        )}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroDetailModal;