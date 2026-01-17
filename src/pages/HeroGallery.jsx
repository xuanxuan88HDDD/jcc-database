import React, { useState, useMemo } from 'react';
import { Search, Filter, X, Sparkles, Star } from 'lucide-react';
import HeroCard from '../components/HeroCard';
import HeroDetailModal from '../components/HeroDetailModal';

// 模拟英雄数据
const mockHeroes = [
  {
    id: 1,
    name: '盖伦',
    title: '德玛西亚之力',
    cost: 1,
    traits: ['骑兵', '重装战士'],
    season: 'S1',
    image: 'https://www.weavefox.cn/api/bolt/unsplash_image?keyword=game,hero,warrior&width=300&height=300&random=hero1',
    health: [600, 1080, 1944],
    attack: [60, 108, 194],
    armor: 40,
    magicResist: 40,
    skill: {
      name: '审判',
      description: '盖伦移除所有负面效果并获得护盾，然后对附近敌人造成魔法伤害。',
      stats: [
        { level: '1', damage: '200' },
        { level: '2', damage: '300' },
        { level: '3', damage: '450' }
      ]
    }
  },
  {
    id: 2,
    name: '拉克丝',
    title: '光明使者',
    cost: 2,
    traits: ['法师', '耀光使'],
    season: 'S2',
    image: 'https://www.weavefox.cn/api/bolt/unsplash_image?keyword=game,hero,mage&width=300&height=300&random=hero2',
    health: [500, 900, 1620],
    attack: [40, 72, 130],
    armor: 20,
    magicResist: 20,
    skill: {
      name: '终极闪光',
      description: '拉克丝引导能量，然后发射一道光线对敌人造成魔法伤害并眩晕。',
      stats: [
        { level: '1', damage: '300', stun: '1.5秒' },
        { level: '2', damage: '450', stun: '2秒' },
        { level: '3', damage: '650', stun: '2.5秒' }
      ]
    }
  },
  {
    id: 3,
    name: '阿狸',
    title: '九尾妖狐',
    cost: 3,
    traits: ['法师', '神射手'],
    season: 'S3',
    image: 'https://www.weavefox.cn/api/bolt/unsplash_image?keyword=game,hero,fox&width=300&height=300&random=hero3',
    health: [600, 1080, 1944],
    attack: [50, 90, 162],
    armor: 25,
    magicResist: 25,
    skill: {
      name: '灵魄突袭',
      description: '阿狸魅惑一名敌人，然后对其造成魔法伤害。如果目标死亡，阿狸会再次施放技能。',
      stats: [
        { level: '1', damage: '400' },
        { level: '2', damage: '600' },
        { level: '3', damage: '900' }
      ]
    }
  },
  {
    id: 4,
    name: '亚索',
    title: '疾风剑豪',
    cost: 4,
    traits: ['决斗大师', '浪人'],
    season: 'S4',
    image: 'https://www.weavefox.cn/api/bolt/unsplash_image?keyword=game,hero,samurai&width=300&height=300&random=hero4',
    health: [800, 1440, 2592],
    attack: [70, 126, 227],
    armor: 35,
    magicResist: 35,
    skill: {
      name: '狂风绝息斩',
      description: '亚索闪烁到最远的敌人处，将其击飞并造成魔法伤害，然后对附近敌人进行斩击。',
      stats: [
        { level: '1', damage: '250' },
        { level: '2', damage: '350' },
        { level: '3', damage: '500' }
      ]
    }
  },
  {
    id: 5,
    name: '金克丝',
    title: '暴走萝莉',
    cost: 5,
    traits: ['强袭枪手', '姐妹'],
    season: 'S5',
    image: 'https://www.weavefox.cn/api/bolt/unsplash_image?keyword=game,hero,gunner&width=300&height=300&random=hero5',
    health: [900, 1620, 2916],
    attack: [80, 144, 259],
    armor: 30,
    magicResist: 30,
    skill: {
      name: '超究极死神飞弹',
      description: '金克丝对最远的敌人发射一枚飞弹，造成百分比最大生命值魔法伤害。',
      stats: [
        { level: '1', damage: '25%最大生命值' },
        { level: '2', damage: '35%最大生命值' },
        { level: '3', damage: '45%最大生命值' }
      ]
    }
  },
  {
    id: 6,
    name: '提莫',
    title: '迅捷斥候',
    cost: 1,
    traits: ['神射手', '约德尔人'],
    season: 'S6',
    image: 'https://www.weavefox.cn/api/bolt/unsplash_image?keyword=game,hero,mushroom&width=300&height=300&random=hero6',
    health: [500, 900, 1620],
    attack: [50, 90, 162],
    armor: 20,
    magicResist: 20,
    skill: {
      name: '毒性攻击',
      description: '提莫的攻击会使敌人中毒，在4秒内造成持续魔法伤害。',
      stats: [
        { level: '1', damage: '150总伤害' },
        { level: '2', damage: '225总伤害' },
        { level: '3', damage: '300总伤害' }
      ]
    }
  }
];

// 赛季选项
const seasonOptions = [
  { value: 'all', label: '全部赛季' },
  { value: 'S1', label: 'S1' },
  { value: 'S2', label: 'S2' },
  { value: 'S3', label: 'S3' },
  { value: 'S4', label: 'S4' },
  { value: 'S5', label: 'S5' },
  { value: 'S6', label: 'S6' }
];

// 羁绊选项
const traitOptions = [
  { value: 'all', label: '全部羁绊' },
  { value: '骑兵', label: '骑兵' },
  { value: '重装战士', label: '重装战士' },
  { value: '法师', label: '法师' },
  { value: '耀光使', label: '耀光使' },
  { value: '神射手', label: '神射手' },
  { value: '决斗大师', label: '决斗大师' },
  { value: '浪人', label: '浪人' },
  { value: '强袭枪手', label: '强袭枪手' },
  { value: '姐妹', label: '姐妹' },
  { value: '约德尔人', label: '约德尔人' }
];

// 费用选项
const costOptions = [
  { value: 'all', label: '全部费用' },
  { value: '1', label: '1费' },
  { value: '2', label: '2费' },
  { value: '3', label: '3费' },
  { value: '4', label: '4费' },
  { value: '5', label: '5费' }
];

const HeroGallery = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSeason, setSelectedSeason] = useState('all');
  const [selectedTrait, setSelectedTrait] = useState('all');
  const [selectedCost, setSelectedCost] = useState('all');
  const [selectedHero, setSelectedHero] = useState(null);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  // 过滤英雄
  const filteredHeroes = useMemo(() => {
    return mockHeroes.filter(hero => {
      const matchesSearch = hero.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          hero.title.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesSeason = selectedSeason === 'all' || hero.season === selectedSeason;
      const matchesTrait = selectedTrait === 'all' || hero.traits.includes(selectedTrait);
      const matchesCost = selectedCost === 'all' || hero.cost.toString() === selectedCost;
      
      return matchesSearch && matchesSeason && matchesTrait && matchesCost;
    });
  }, [searchTerm, selectedSeason, selectedTrait, selectedCost]);

  // 重置筛选
  const resetFilters = () => {
    setSearchTerm('');
    setSelectedSeason('all');
    setSelectedTrait('all');
    setSelectedCost('all');
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
        <h1 className="text-3xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-anime-pink to-anime-purple relative">英雄图鉴</h1>
        <p className="text-[#8D8D93] dark:text-[#D1D1D6] max-w-2xl mx-auto">
          查看所有英雄的详细信息，包括技能、羁绊和属性数据
        </p>
      </div>

      {/* 筛选和搜索区域 */}
      <div className="mb-8 card bg-gradient-to-br from-anime-pink/10 to-anime-purple/10 dark:from-anime-pink/5 dark:to-anime-purple/5 border-anime">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
          <div className="relative flex-grow max-w-md">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="搜索英雄名称..."
              className="w-full py-3 pl-10 pr-4 rounded-xl bg-[#F5F0FF] dark:bg-[#0D0B1C] border-2 border-dashed border-anime-pink/50 focus:outline-none focus:ring-2 focus:ring-anime-pink focus:border-solid transition-colors duration-200"
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-anime-pink w-5 h-5" />
          </div>
          
          <button 
            onClick={() => setIsFilterOpen(!isFilterOpen)}
            className="flex items-center justify-center gap-2 py-3 px-4 bg-gradient-to-r from-anime-pink to-anime-purple text-white rounded-xl hover-pop transition-colors duration-200 md:hidden"
          >
            <Filter className="w-5 h-5" />
            <span>筛选</span>
          </button>
          
          <button 
            onClick={resetFilters}
            className="hidden md:flex items-center justify-center gap-2 py-3 px-4 bg-gradient-to-r from-anime-blue to-cyan-400 text-white rounded-xl hover-pop transition-colors duration-200"
          >
            <X className="w-5 h-5" />
            <span>重置筛选</span>
          </button>
        </div>
        
        {/* 筛选器 - 桌面端 */}
        <div className="hidden md:grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium mb-2 text-[#1C1C1E] dark:text-[#EAEAEA]">赛季</label>
            <select
              value={selectedSeason}
              onChange={(e) => setSelectedSeason(e.target.value)}
              className="w-full py-2 px-3 rounded-lg bg-[#F5F0FF] dark:bg-[#0D0B1C] border border-[#D1D1D6] dark:border-[#8D8D93] focus:outline-none focus:ring-2 focus:ring-[#6A5ACD] transition-colors duration-200"
            >
              {seasonOptions.map(option => (
                <option key={option.value} value={option.value}>{option.label}</option>
              ))}
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-2 text-[#1C1C1E] dark:text-[#EAEAEA]">羁绊</label>
            <select
              value={selectedTrait}
              onChange={(e) => setSelectedTrait(e.target.value)}
              className="w-full py-2 px-3 rounded-lg bg-[#F5F0FF] dark:bg-[#0D0B1C] border border-[#D1D1D6] dark:border-[#8D8D93] focus:outline-none focus:ring-2 focus:ring-[#6A5ACD] transition-colors duration-200"
            >
              {traitOptions.map(option => (
                <option key={option.value} value={option.value}>{option.label}</option>
              ))}
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-2 text-[#1C1C1E] dark:text-[#EAEAEA]">费用</label>
            <select
              value={selectedCost}
              onChange={(e) => setSelectedCost(e.target.value)}
              className="w-full py-2 px-3 rounded-lg bg-[#F5F0FF] dark:bg-[#0D0B1C] border border-[#D1D1D6] dark:border-[#8D8D93] focus:outline-none focus:ring-2 focus:ring-[#6A5ACD] transition-colors duration-200"
            >
              {costOptions.map(option => (
                <option key={option.value} value={option.value}>{option.label}</option>
              ))}
            </select>
          </div>
          
          <div className="flex items-end">
            <button 
              onClick={resetFilters}
              className="flex items-center justify-center gap-2 w-full py-2 px-4 bg-[#F5F0FF] dark:bg-[#0D0B1C] rounded-lg border border-[#D1D1D6] dark:border-[#8D8D93] hover:bg-[#EAEAEA] dark:hover:bg-[#1A182E] transition-colors duration-200"
            >
              <X className="w-4 h-4 text-[#FF6B35]" />
              <span>重置筛选</span>
            </button>
          </div>
        </div>
        
        {/* 筛选器 - 移动端 */}
        {isFilterOpen && (
          <div className="md:hidden mt-4 grid grid-cols-1 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2 text-[#1C1C1E] dark:text-[#EAEAEA]">赛季</label>
              <select
                value={selectedSeason}
                onChange={(e) => setSelectedSeason(e.target.value)}
                className="w-full py-2 px-3 rounded-lg bg-[#F5F0FF] dark:bg-[#0D0B1C] border border-[#D1D1D6] dark:border-[#8D8D93] focus:outline-none focus:ring-2 focus:ring-[#6A5ACD] transition-colors duration-200"
              >
                {seasonOptions.map(option => (
                  <option key={option.value} value={option.value}>{option.label}</option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2 text-[#1C1C1E] dark:text-[#EAEAEA]">羁绊</label>
              <select
                value={selectedTrait}
                onChange={(e) => setSelectedTrait(e.target.value)}
                className="w-full py-2 px-3 rounded-lg bg-[#F5F0FF] dark:bg-[#0D0B1C] border border-[#D1D1D6] dark:border-[#8D8D93] focus:outline-none focus:ring-2 focus:ring-[#6A5ACD] transition-colors duration-200"
              >
                {traitOptions.map(option => (
                  <option key={option.value} value={option.value}>{option.label}</option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2 text-[#1C1C1E] dark:text-[#EAEAEA]">费用</label>
              <select
                value={selectedCost}
                onChange={(e) => setSelectedCost(e.target.value)}
                className="w-full py-2 px-3 rounded-lg bg-[#F5F0FF] dark:bg-[#0D0B1C] border border-[#D1D1D6] dark:border-[#8D8D93] focus:outline-none focus:ring-2 focus:ring-[#6A5ACD] transition-colors duration-200"
              >
                {costOptions.map(option => (
                  <option key={option.value} value={option.value}>{option.label}</option>
                ))}
              </select>
            </div>
          </div>
        )}
      </div>

      {/* 英雄列表 */}
      {filteredHeroes.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
          {filteredHeroes.map(hero => (
            <HeroCard 
              key={hero.id} 
              hero={hero} 
              onClick={() => setSelectedHero(hero)} 
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <div className="text-5xl mb-4">😢</div>
          <h3 className="text-xl font-bold mb-2 text-[#1C1C1E] dark:text-[#EAEAEA]">未找到匹配的英雄</h3>
          <p className="text-[#8D8D93] dark:text-[#D1D1D6] mb-4">请尝试调整筛选条件或搜索关键词</p>
          <button 
            onClick={resetFilters}
            className="px-4 py-2 bg-[#6A5ACD] text-white rounded-lg hover:bg-[#6A5ACD]/90 transition-colors duration-200"
          >
            重置筛选
          </button>
        </div>
      )}
      
      {/* 英雄详情模态框 */}
      {selectedHero && (
        <HeroDetailModal 
          hero={selectedHero} 
          onClose={() => setSelectedHero(null)} 
        />
      )}
    </div>
  );
};

export default HeroGallery;