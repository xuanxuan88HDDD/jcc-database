import React from 'react';
import { X } from 'lucide-react';

const ItemDetailModal = ({ item, onClose }) => {
  // 根据类型确定边框颜色
  const getBorderColor = (type) => {
    switch (type) {
      case '基础装备': return 'border-gray-400';
      case '合成装备': return 'border-blue-500';
      case '转职装备': return 'border-purple-500';
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
              <h2 className="text-2xl font-bold text-[#1C1C1E] dark:text-[#EAEAEA]">{item.name}</h2>
              <span className={`px-3 py-1 rounded-full text-white text-sm font-bold ${getBorderColor(item.type).replace('border', 'bg')}`}>
                {item.type}
              </span>
            </div>
            <p className="text-[#6A5ACD] dark:text-[#4ECDC4]">{item.season}</p>
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
                  src={item.image} 
                  alt={item.name} 
                  className="w-full h-auto object-cover"
                />
              </div>
            </div>
            
            <div className="md:w-2/3">
              <div className="mb-6">
                <h3 className="text-lg font-bold mb-3 text-[#1C1C1E] dark:text-[#EAEAEA]">属性</h3>
                <div className="bg-[#F5F0FF] dark:bg-[#0D0B1C] p-4 rounded-lg">
                  <ul className="space-y-2">
                    {Object.entries(item.stats).map(([key, value], index) => (
                      <li key={index} className="flex justify-between">
                        <span className="text-[#8D8D93] dark:text-[#D1D1D6]">
                          {key === 'attackDamage' && '攻击力'}
                          {key === 'attackSpeed' && '攻击速度'}
                          {key === 'abilityPower' && '法术强度'}
                          {key === 'health' && '生命值'}
                          {key === 'armor' && '护甲'}
                          {key === 'magicResist' && '魔抗'}
                          {key === 'critChance' && '暴击几率'}
                          {key === 'mana' && '法力值'}
                          {key === 'special' && '特殊效果'}
                        </span>
                        <span className="font-bold text-[#1C1C1E] dark:text-[#EAEAEA]">{value}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-bold mb-3 text-[#1C1C1E] dark:text-[#EAEAEA]">描述</h3>
                <p className="text-[#1C1C1E] dark:text-[#EAEAEA] bg-[#F5F0FF] dark:bg-[#0D1B2E] p-4 rounded-lg">
                  {item.description}
                </p>
              </div>
            </div>
          </div>
          
          {item.components && (
            <div>
              <h3 className="text-lg font-bold mb-3 text-[#1C1C1E] dark:text-[#EAEAEA]">合成路径</h3>
              <div className="bg-gradient-to-r from-[#6A5ACD]/10 to-[#4ECDC4]/10 dark:from-[#6A5ACD]/20 dark:to-[#4ECDC4]/20 p-5 rounded-xl border border-[#D1D1D6] dark:border-[#8D8D93]">
                <div className="flex flex-col items-center">
                  <div className="flex items-center justify-center gap-4 mb-4">
                    <div className="text-center">
                      <div className="w-16 h-16 rounded-lg bg-[#F5F0FF] dark:bg-[#0D0B1C] border-2 border-[#D1D1D6] dark:border-[#8D8D93] flex items-center justify-center mb-2">
                        <span className="text-sm text-[#1C1C1E] dark:text-[#EAEAEA]">{item.components[0]}</span>
                      </div>
                      <span className="text-xs text-[#8D8D93] dark:text-[#D1D1D6]">组件1</span>
                    </div>
                    
                    <div className="text-2xl text-[#6A5ACD] dark:text-[#4ECDC4]">+</div>
                    
                    <div className="text-center">
                      <div className="w-16 h-16 rounded-lg bg-[#F5F0FF] dark:bg-[#0D0B1C] border-2 border-[#D1D1D6] dark:border-[#8D8D93] flex items-center justify-center mb-2">
                        <span className="text-sm text-[#1C1C1E] dark:text-[#EAEAEA]">{item.components[1]}</span>
                      </div>
                      <span className="text-xs text-[#8D8D93] dark:text-[#D1D1D6]">组件2</span>
                    </div>
                  </div>
                  
                  <div className="text-2xl text-[#6A5ACD] dark:text-[#4ECDC4] mb-4">↓</div>
                  
                  <div className="text-center">
                    <div className="w-20 h-20 rounded-lg bg-gradient-to-br from-[#6A5ACD] to-[#4ECDC4] flex items-center justify-center mb-2 border-2 border-white dark:border-[#1A182E] shadow-lg">
                      <span className="text-white font-bold">{item.name}</span>
                    </div>
                    <span className="text-xs text-[#8D8D93] dark:text-[#D1D1D6]">合成结果</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ItemDetailModal;