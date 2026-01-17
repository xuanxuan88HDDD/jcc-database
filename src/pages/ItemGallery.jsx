import React, { useState, useMemo } from 'react';
import { Search, Filter, X, Sparkles, Star } from 'lucide-react';
import ItemCard from '../components/ItemCard';
import ItemDetailModal from '../components/ItemDetailModal';

// 模拟物品数据
const mockItems = [
  {
    id: 1,
    name: '暴风大剑',
    type: '基础装备',
    season: 'S1',
    image: 'https://www.weavefox.cn/api/bolt/unsplash_image?keyword=game,item,sword&width=300&height=300&random=item1',
    stats: { attackDamage: 10 },
    description: '基础攻击装备，提供攻击力加成。'
  },
  {
    id: 2,
    name: '反曲之弓',
    type: '基础装备',
    season: 'S1',
    image: 'https://www.weavefox.cn/api/bolt/unsplash_image?keyword=game,item,bow&width=300&height=300&random=item2',
    stats: { attackSpeed: 10 },
    description: '基础攻击装备，提供攻击速度加成。'
  },
  {
    id: 3,
    name: '无用大棒',
    type: '基础装备',
    season: 'S1',
    image: 'https://www.weavefox.cn/api/bolt/unsplash_image?keyword=game,item,staff&width=300&height=300&random=item3',
    stats: { abilityPower: 10 },
    description: '基础法术装备，提供法术强度加成。'
  },
  {
    id: 4,
    name: '巨人腰带',
    type: '基础装备',
    season: 'S1',
    image: 'https://www.weavefox.cn/api/bolt/unsplash_image?keyword=game,item,belt&width=300&height=300&random=item4',
    stats: { health: 150 },
    description: '基础防御装备，提供生命值加成。'
  },
  {
    id: 5,
    name: '锁子甲',
    type: '基础装备',
    season: 'S1',
    image: 'https://www.weavefox.cn/api/bolt/unsplash_image?keyword=game,item,armor&width=300&height=300&random=item5',
    stats: { armor: 20 },
    description: '基础防御装备，提供护甲加成。'
  },
  {
    id: 6,
    name: '负极斗篷',
    type: '基础装备',
    season: 'S1',
    image: 'https://www.weavefox.cn/api/bolt/unsplash_image?keyword=game,item,cloak&width=300&height=300&random=item6',
    stats: { magicResist: 20 },
    description: '基础防御装备，提供魔法抗性加成。'
  },
  {
    id: 7,
    name: '金铲铲',
    type: '基础装备',
    season: 'S1',
    image: 'https://www.weavefox.cn/api/bolt/unsplash_image?keyword=game,item,spatula&width=300&height=300&random=item7',
    stats: { special: '特殊效果' },
    description: '特殊装备，与其他装备合成可获得转职效果。'
  },
  {
    id: 8,
    name: '拳套',
    type: '基础装备',
    season: 'S3',
    image: 'https://www.weavefox.cn/api/bolt/unsplash_image?keyword=game,item,gloves&width=300&height=300&random=item8',
    stats: { critChance: 10 },
    description: '基础装备，提供暴击几率加成。'
  },
  {
    id: 9,
    name: '无尽之刃',
    type: '合成装备',
    season: 'S1',
    image: 'https://www.weavefox.cn/api/bolt/unsplash_image?keyword=game,item,sword&width=300&height=300&random=item9',
    stats: { attackDamage: 20, critChance: 20 },
    description: '暴击装备，大幅提升暴击伤害。',
    components: ['暴风大剑', '暴风大剑']
  },
  {
    id: 10,
    name: '巨人杀手',
    type: '合成装备',
    season: 'S1',
    image: 'https://www.weavefox.cn/api/bolt/unsplash_image?keyword=game,item,bow&width=300&height=300&random=item10',
    stats: { attackDamage: 10, attackSpeed: 10 },
    description: '针对高生命值敌人的装备，造成额外真实伤害。',
    components: ['暴风大剑', '反曲之弓']
  },
  {
    id: 11,
    name: '灭世者的死亡之帽',
    type: '合成装备',
    season: 'S1',
    image: 'https://www.weavefox.cn/api/bolt/unsplash_image?keyword=game,item,hat&width=300&height=300&random=item11',
    stats: { abilityPower: 20 },
    description: '法术装备，大幅提升法术强度。',
    components: ['无用大棒', '无用大棒']
  },
  {
    id: 12,
    name: '珠光护手',
    type: '合成装备',
    season: 'S1',
    image: 'https://www.weavefox.cn/api/bolt/unsplash_image?keyword=game,item,gloves&width=300&height=300&random=item12',
    stats: { abilityPower: 10, critChance: 10 },
    description: '法术暴击装备，使技能可以暴击。',
    components: ['无用大棒', '拳套']
  },
  {
    id: 13,
    name: '守护天使',
    type: '合成装备',
    season: 'S1',
    image: 'https://www.weavefox.cn/api/bolt/unsplash_image?keyword=game,item,armor&width=300&height=300&random=item13',
    stats: { attackDamage: 10, armor: 20 },
    description: '防御装备，死亡后可以复活一次。',
    components: ['暴风大剑', '锁子甲']
  },
  {
    id: 14,
    name: '斯塔缇克电刃',
    type: '合成装备',
    season: 'S1',
    image: 'https://www.weavefox.cn/api/bolt/unsplash_image?keyword=game,item,bow&width=300&height=300&random=item14',
    stats: { attackSpeed: 20 },
    description: '攻击时释放连锁闪电，对多个敌人造成伤害。',
    components: ['反曲之弓', '反曲之弓']
  },
  {
    id: 15,
    name: '冰霜之心',
    type: '合成装备',
    season: 'S1',
    image: 'https://www.weavefox.cn/api/bolt/unsplash_image?keyword=game,item,belt&width=300&height=300&random=item15',
    stats: { armor: 40 },
    description: '防御装备，减少附近敌人的攻击速度。',
    components: ['锁子甲', '巨人腰带']
  },
  {
    id: 16,
    name: '狂徒铠甲',
    type: '合成装备',
    season: 'S1',
    image: 'https://www.weavefox.cn/api/bolt/unsplash_image?keyword=game,item,belt&width=300&height=300&random=item16',
    stats: { health: 300 },
    description: '防御装备，提供大量生命值和回复效果。',
    components: ['巨人腰带', '巨人腰带']
  },
  {
    id: 17,
    name: '救赎',
    type: '合成装备',
    season: 'S3',
    image: 'https://www.weavefox.cn/api/bolt/unsplash_image?keyword=game,item,belt&width=300&height=300&random=item17',
    stats: { health: 150, mana: 15 },
    description: '辅助装备，周期性为附近友军提供治疗。',
    components: ['巨人腰带', '拳套']
  },
  {
    id: 18,
    name: '卢安娜的飓风',
    type: '合成装备',
    season: 'S3',
    image: 'https://www.weavefox.cn/api/bolt/unsplash_image?keyword=game,item,bow&width=300&height=300&random=item18',
    stats: { attackSpeed: 10, critChance: 10 },
    description: '攻击时会额外攻击附近的敌人。',
    components: ['反曲之弓', '拳套']
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

// 类型选项
const typeOptions = [
  { value: 'all', label: '全部类型' },
  { value: '基础装备', label: '基础装备' },
  { value: '合成装备', label: '合成装备' },
  { value: '转职装备', label: '转职装备' }
];

const ItemGallery = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSeason, setSelectedSeason] = useState('all');
  const [selectedType, setSelectedType] = useState('all');
  const [selectedItem, setSelectedItem] = useState(null);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  // 过滤物品
  const filteredItems = useMemo(() => {
    return mockItems.filter(item => {
      const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesSeason = selectedSeason === 'all' || item.season === selectedSeason;
      const matchesType = selectedType === 'all' || item.type === selectedType;
      
      return matchesSearch && matchesSeason && matchesType;
    });
  }, [searchTerm, selectedSeason, selectedType]);

  // 重置筛选
  const resetFilters = () => {
    setSearchTerm('');
    setSelectedSeason('all');
    setSelectedType('all');
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
        <h1 className="text-3xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-anime-pink to-anime-purple relative">物品图鉴</h1>
        <p className="text-[#8D8D93] dark:text-[#D1D1D6] max-w-2xl mx-auto">
          了解所有物品的属性和合成路径，掌握装备搭配技巧
        </p>
      </div>

      {/* 筛选和搜索区域 */}
      <div className="mb-8 card bg-gradient-to-br from-anime-blue/10 to-cyan-300/10 dark:from-anime-blue/5 dark:to-cyan-300/5 border-anime">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
          <div className="relative flex-grow max-w-md">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="搜索物品名称..."
              className="w-full py-3 pl-10 pr-4 rounded-xl bg-[#F5F0FF] dark:bg-[#0D0B1C] border-2 border-dashed border-anime-blue/50 focus:outline-none focus:ring-2 focus:ring-anime-blue focus:border-solid transition-colors duration-200"
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-anime-blue w-5 h-5" />
          </div>
          
          <button 
            onClick={() => setIsFilterOpen(!isFilterOpen)}
            className="flex items-center justify-center gap-2 py-3 px-4 bg-gradient-to-r from-anime-blue to-cyan-400 text-white rounded-xl hover-pop transition-colors duration-200 md:hidden"
          >
            <Filter className="w-5 h-5" />
            <span>筛选</span>
          </button>
          
          <button 
            onClick={resetFilters}
            className="hidden md:flex items-center justify-center gap-2 py-3 px-4 bg-gradient-to-r from-anime-pink to-anime-purple text-white rounded-xl hover-pop transition-colors duration-200"
          >
            <X className="w-5 h-5" />
            <span>重置筛选</span>
          </button>
        </div>
        
        {/* 筛选器 - 桌面端 */}
        <div className="hidden md:grid grid-cols-1 md:grid-cols-3 gap-4">
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
            <label className="block text-sm font-medium mb-2 text-[#1C1C1E] dark:text-[#EAEAEA]">类型</label>
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="w-full py-2 px-3 rounded-lg bg-[#F5F0FF] dark:bg-[#0D0B1C] border border-[#D1D1D6] dark:border-[#8D8D93] focus:outline-none focus:ring-2 focus:ring-[#6A5ACD] transition-colors duration-200"
            >
              {typeOptions.map(option => (
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
              <label className="block text-sm font-medium mb-2 text-[#1C1C1E] dark:text-[#EAEAEA]">类型</label>
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="w-full py-2 px-3 rounded-lg bg-[#F5F0FF] dark:bg-[#0D0B1C] border border-[#D1D1D6] dark:border-[#8D8D93] focus:outline-none focus:ring-2 focus:ring-[#6A5ACD] transition-colors duration-200"
              >
                {typeOptions.map(option => (
                  <option key={option.value} value={option.value}>{option.label}</option>
                ))}
              </select>
            </div>
          </div>
        )}
      </div>

      {/* 物品列表 */}
      {filteredItems.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
          {filteredItems.map(item => (
            <ItemCard 
              key={item.id} 
              item={item} 
              onClick={() => setSelectedItem(item)} 
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <div className="text-5xl mb-4">😢</div>
          <h3 className="text-xl font-bold mb-2 text-[#1C1C1E] dark:text-[#EAEAEA]">未找到匹配的物品</h3>
          <p className="text-[#8D8D93] dark:text-[#D1D1D6] mb-4">请尝试调整筛选条件或搜索关键词</p>
          <button 
            onClick={resetFilters}
            className="px-4 py-2 bg-[#6A5ACD] text-white rounded-lg hover:bg-[#6A5ACD]/90 transition-colors duration-200"
          >
            重置筛选
          </button>
        </div>
      )}
      
      {/* 物品详情模态框 */}
      {selectedItem && (
        <ItemDetailModal 
          item={selectedItem} 
          onClose={() => setSelectedItem(null)} 
        />
      )}
    </div>
  );
};

export default ItemGallery;