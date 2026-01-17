import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Sparkles, Star } from 'lucide-react';

// 模拟赛季数据
const seasons = [
  {
    id: 1,
    name: 'S1 - 初露锋芒',
    period: '2018年12月 - 2019年3月',
    image: 'https://www.weavefox.cn/api/bolt/unsplash_image?keyword=game,season,beginning&width=800&height=400&random=season1',
    description: '金铲铲之战首个赛季，奠定了游戏的基础玩法和英雄体系。',
    highlights: [
      '引入了经典的羁绊系统',
      '初始英雄池包含44个英雄',
      '基础装备合成系统上线'
    ],
    updates: [
      '新增了6个基础羁绊：骑士、法师、刺客、射手、坦克、换形师',
      '推出了经济系统，包括利息和连胜奖励',
      '初始装备池包含8个基础装备'
    ]
  },
  {
    id: 2,
    name: 'S2 - 光与影',
    period: '2019年3月 - 2019年6月',
    image: 'https://www.weavefox.cn/api/bolt/unsplash_image?keyword=game,season,light,darkness&width=800&height=400&random=season2',
    description: '以光明与黑暗为主题，引入了光明装备和黑暗装备的双线玩法。',
    highlights: [
      '首次引入光/暗双主题装备',
      '新增6个新羁绊：光、暗、森林、沙漠、剧毒、水晶',
      '英雄数量扩充至56个'
    ],
    updates: [
      '光/暗装备系统：每件装备都有光明和黑暗两种形态',
      '新增了英雄刷新机制，可以升级英雄星级',
      '调整了经济系统，增加了连败补偿'
    ]
  },
  {
    id: 3,
    name: 'S3 - 银河魔装机神',
    period: '2019年6月 - 2019年9月',
    image: 'https://www.weavefox.cn/api/bolt/unsplash_image?keyword=game,season,galaxy,mecha&width=800&height=400&random=season3',
    description: '以科幻机甲为主题，英雄化身为银河魔装机神进行战斗。',
    highlights: [
      '英雄机甲化，获得全新外观和技能特效',
      '新增6个新羁绊：星神、星舰、佣兵、狙神、秘术、剑士',
      '引入了装备分解系统'
    ],
    updates: [
      '机甲系统：英雄可以变身为强大的机甲形态',
      '装备分解：可以将不需要的装备分解为材料',
      '新增了英雄复制器，可以复制英雄'
    ]
  },
  {
    id: 4,
    name: 'S4 - 玉剑传说',
    period: '2019年9月 - 2019年12月',
    image: 'https://www.weavefox.cn/api/bolt/unsplash_image?keyword=game,season,jade,sword&width=800&height=400&random=season4',
    description: '以中国武侠为背景，融入了玉剑传说的东方奇幻元素。',
    highlights: [
      '东方武侠风格，英雄拥有全新玉剑外观',
      '新增6个新羁绊：玉剑仙、宗师、忍者、决斗大师、神射手、天神',
      '引入了天选之人机制'
    ],
    updates: [
      '天选之人：每回合随机出现一个拥有额外羁绊的英雄',
      '装备重做：多件装备进行了平衡性调整',
      '新增了英雄传送门，可以提前招募英雄'
    ]
  },
  {
    id: 5,
    name: 'S5 - 双城之战',
    period: '2019年12月 - 2020年3月',
    image: 'https://www.weavefox.cn/api/bolt/unsplash_image?keyword=game,season,cities,war&width=800&height=400&random=season5',
    description: '以皮尔特沃夫和祖安为背景，展现了双城之间的冲突与融合。',
    highlights: [
      '双城主题，英雄分为皮城和祖安两个阵营',
      '新增6个新羁绊：皮城、祖安、刺客、法师、哨兵、挑战者',
      '引入了海克斯科技系统'
    ],
    updates: [
      '海克斯科技：每回合随机出现强化选项',
      '装备重做：多件装备进行了重新设计',
      '新增了英雄重铸器，可以改变英雄职业'
    ]
  },
  {
    id: 6,
    name: 'S6 - 巨龙之巢',
    period: '2020年3月 - 2020年6月',
    image: 'https://www.weavefox.cn/api/bolt/unsplash_image?keyword=game,season,dragon,nest&width=800&height=400&random=season6',
    description: '以巨龙和巢穴为主题，玩家需要在龙巢中生存并战斗。',
    highlights: [
      '巨龙主题，引入了龙神羁绊',
      '新增6个新羁绊：龙神、吟游诗人、黑魔法师、学者、炼金术师、护卫',
      '引入了龙蛋孵化机制'
    ],
    updates: [
      '龙蛋系统：可以孵化不同属性的巨龙',
      '装备重做：新增了多个功能性装备',
      '新增了英雄融合器，可以合成高星级英雄'
    ]
  }
];

const SeasonArchive = () => {
  const [expandedSeason, setExpandedSeason] = useState(null);

  const toggleSeason = (id) => {
    setExpandedSeason(expandedSeason === id ? null : id);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8 text-center relative">
        <div className="absolute -top-4 -left-4 text-anime-pink animate-pulse">
          <Sparkles size={24} />
        </div>
        <div className="absolute -top-2 -right-6 text-anime-purple animate-bounce" style={{animationDuration: '2s'}}>
          <Star size={20} />
        </div>
        <h1 className="text-3xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-anime-pink to-anime-purple relative">赛季档案</h1>
        <p className="text-[#8D8D93] dark:text-[#D1D1D6] max-w-2xl mx-auto">
          追踪各赛季更新内容，了解版本变化和重大调整
        </p>
      </div>

      <div className="space-y-6">
        {seasons.map((season) => (
          <div 
            key={season.id} 
            className="card bg-gradient-to-br from-gradient-start/10 to-gradient-end/10 dark:from-gradient-start/5 dark:to-gradient-end/5 border-anime hover-pop"
          >
            <div 
              className="p-6 cursor-pointer"
              onClick={() => toggleSeason(season.id)}
            >
              <div className="flex flex-col md:flex-row md:items-center gap-6">
                <div className="md:w-1/4">
                  <div className="rounded-lg overflow-hidden border border-[#D1D1D6] dark:border-[#8D8D93]">
                    <img 
                      src={season.image} 
                      alt={season.name} 
                      className="w-full h-40 object-cover"
                      loading="lazy"
                    />
                  </div>
                </div>
                
                <div className="md:w-3/4">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
                    <div>
                      <h2 className="text-xl font-bold text-[#1C1C1E] dark:text-[#EAEAEA] mb-1">{season.name}</h2>
                      <p className="text-[#6A5ACD] dark:text-[#4ECDC4] mb-2">{season.period}</p>
                      <p className="text-[#8D8D93] dark:text-[#D1D1D6]">{season.description}</p>
                    </div>
                    
                    <div className="flex-shrink-0">
                      {expandedSeason === season.id ? (
                        <ChevronUp className="w-6 h-6 text-[#8D8D93]" />
                      ) : (
                        <ChevronDown className="w-6 h-6 text-[#8D8D93]" />
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {expandedSeason === season.id && (
              <div className="px-6 pb-6 border-t border-[#D1D1D6] dark:border-[#8D8D93] pt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-lg font-bold mb-3 text-[#1C1C1E] dark:text-[#EAEAEA] flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-[#FF6B35]"></div>
                      赛季亮点
                    </h3>
                    <ul className="space-y-2">
                      {season.highlights.map((highlight, index) => (
                        <li key={index} className="flex items-start">
                          <div className="w-5 h-5 rounded-full bg-[#FF6B35]/20 flex items-center justify-center flex-shrink-0 mt-0.5 mr-3">
                            <div className="w-2 h-2 rounded-full bg-[#FF6B35]"></div>
                          </div>
                          <span className="text-[#1C1C1E] dark:text-[#EAEAEA]">{highlight}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-bold mb-3 text-[#1C1C1E] dark:text-[#EAEAEA] flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-[#6A5ACD]"></div>
                      重要更新
                    </h3>
                    <ul className="space-y-2">
                      {season.updates.map((update, index) => (
                        <li key={index} className="flex items-start">
                          <div className="w-5 h-5 rounded-full bg-[#6A5ACD]/20 flex items-center justify-center flex-shrink-0 mt-0.5 mr-3">
                            <div className="w-2 h-2 rounded-full bg-[#6A5ACD]"></div>
                          </div>
                          <span className="text-[#1C1C1E] dark:text-[#EAEAEA]">{update}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default SeasonArchive;