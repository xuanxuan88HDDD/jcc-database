import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Search, Sword, ShoppingCart, Calendar } from 'lucide-react';
import HeroCard from '../components/HeroCard';
import ItemCard from '../components/ItemCard';

// 模拟数据
const mockHeroes = [
  {
    id: 1,
    name: '盖伦',
    title: '德玛西亚之力',
    cost: 1,
    traits: ['骑兵', '重装战士'],
    season: 'S1',
    image: 'https://www.weavefox.cn/api/bolt/unsplash_image?keyword=game,hero,warrior&width=300&height=300&random=hero1'
  },
  {
    id: 2,
    name: '拉克丝',
    title: '光明使者',
    cost: 2,
    traits: ['法师', '耀光使'],
    season: 'S2',
    image: 'https://www.weavefox.cn/api/bolt/unsplash_image?keyword=game,hero,mage&width=300&height=300&random=hero2'
  },
  {
    id: 3,
    name: '阿狸',
    title: '九尾妖狐',
    cost: 3,
    traits: ['法师', '神射手'],
    season: 'S3',
    image: 'https://www.weavefox.cn/api/bolt/unsplash_image?keyword=game,hero,fox&width=300&height=300&random=hero3'
  }
];

const mockItems = [
  {
    id: 1,
    name: '暴风大剑',
    type: '基础装备',
    season: 'S1',
    image: 'https://www.weavefox.cn/api/bolt/unsplash_image?keyword=game,item,sword&width=300&height=300&random=item1'
  },
  {
    id: 2,
    name: '反曲之弓',
    type: '基础装备',
    season: 'S1',
    image: 'https://www.weavefox.cn/api/bolt/unsplash_image?keyword=game,item,bow&width=300&height=300&random=item2'
  },
  {
    id: 3,
    name: '无尽之刃',
    type: '合成装备',
    season: 'S1',
    image: 'https://www.weavefox.cn/api/bolt/unsplash_image?keyword=game,item,sword&width=300&height=300&random=item9'
  }
];

const mockSeasons = [
  {
    id: 1,
    name: 'S1 - 初露锋芒',
    period: '2018年12月 - 2019年3月',
    image: 'https://www.weavefox.cn/api/bolt/unsplash_image?keyword=game,season,beginning&width=300&height=150&random=season1'
  },
  {
    id: 2,
    name: 'S2 - 光与影',
    period: '2019年3月 - 2019年6月',
    image: 'https://www.weavefox.cn/api/bolt/unsplash_image?keyword=game,season,light,darkness&width=300&height=150&random=season2'
  }
];

const SearchResults = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [heroResults, setHeroResults] = useState([]);
  const [itemResults, setItemResults] = useState([]);
  const [seasonResults, setSeasonResults] = useState([]);
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const query = params.get('q') || '';
    setSearchTerm(query);
    
    if (query) {
      // 模拟搜索结果
      const filteredHeroes = mockHeroes.filter(hero => 
        hero.name.toLowerCase().includes(query.toLowerCase()) || 
        hero.title.toLowerCase().includes(query.toLowerCase())
      );
      
      const filteredItems = mockItems.filter(item => 
        item.name.toLowerCase().includes(query.toLowerCase())
      );
      
      const filteredSeasons = mockSeasons.filter(season => 
        season.name.toLowerCase().includes(query.toLowerCase())
      );
      
      setHeroResults(filteredHeroes);
      setItemResults(filteredItems);
      setSeasonResults(filteredSeasons);
    } else {
      setHeroResults([]);
      setItemResults([]);
      setSeasonResults([]);
    }
  }, [location.search]);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold mb-2 text-[#1C1C1E] dark:text-[#EAEAEA]">搜索结果</h1>
        <p className="text-[#8D8D93] dark:text-[#D1D1D6] max-w-2xl mx-auto">
          搜索关键词: <span className="font-bold text-[#6A5ACD] dark:text-[#4ECDC4]">{searchTerm}</span>
        </p>
      </div>

      {searchTerm ? (
        <>
          {/* 英雄搜索结果 */}
          <div className="mb-12">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-lg bg-[#FF6B35] flex items-center justify-center">
                <Sword className="text-white w-5 h-5" />
              </div>
              <h2 className="text-2xl font-bold text-[#1C1C1E] dark:text-[#EAEAEA]">英雄</h2>
              <span className="px-3 py-1 bg-[#F5F0FF] dark:bg-[#0D0B1C] text-[#8D8D93] dark:text-[#D1D1D6] rounded-full text-sm">
                {heroResults.length} 个结果
              </span>
            </div>
            
            {heroResults.length > 0 ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
                {heroResults.map(hero => (
                  <HeroCard key={hero.id} hero={hero} />
                ))}
              </div>
            ) : (
              <div className="text-center py-8 bg-[#F5F0FF] dark:bg-[#1A182E] rounded-xl border border-[#D1D1D6] dark:border-[#8D8D93]">
                <p className="text-[#8D8D93] dark:text-[#D1D1D6]">未找到相关英雄</p>
              </div>
            )}
          </div>
          
          {/* 物品搜索结果 */}
          <div className="mb-12">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-lg bg-[#6A5ACD] flex items-center justify-center">
                <ShoppingCart className="text-white w-5 h-5" />
              </div>
              <h2 className="text-2xl font-bold text-[#1C1C1E] dark:text-[#EAEAEA]">物品</h2>
              <span className="px-3 py-1 bg-[#F5F0FF] dark:bg-[#0D0B1C] text-[#8D8D93] dark:text-[#D1D1D6] rounded-full text-sm">
                {itemResults.length} 个结果
              </span>
            </div>
            
            {itemResults.length > 0 ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
                {itemResults.map(item => (
                  <ItemCard key={item.id} item={item} />
                ))}
              </div>
            ) : (
              <div className="text-center py-8 bg-[#F5F0FF] dark:bg-[#1A182E] rounded-xl border border-[#D1D1D6] dark:border-[#8D8D93]">
                <p className="text-[#8D8D93] dark:text-[#D1D1D6]">未找到相关物品</p>
              </div>
            )}
          </div>
          
          {/* 赛季搜索结果 */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-lg bg-[#4ECDC4] flex items-center justify-center">
                <Calendar className="text-white w-5 h-5" />
              </div>
              <h2 className="text-2xl font-bold text-[#1C1C1E] dark:text-[#EAEAEA]">赛季</h2>
              <span className="px-3 py-1 bg-[#F5F0FF] dark:bg-[#0D0B1C] text-[#8D8D93] dark:text-[#D1D1D6] rounded-full text-sm">
                {seasonResults.length} 个结果
              </span>
            </div>
            
            {seasonResults.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {seasonResults.map(season => (
                  <div 
                    key={season.id} 
                    className="bg-white dark:bg-[#1A182E] rounded-xl overflow-hidden shadow-md border border-[#D1D1D6] dark:border-[#8D8D93] transition-all duration-300 hover:shadow-lg"
                  >
                    <div className="relative pb-[50%]"> {/* 2:1 Aspect Ratio */}
                      <img 
                        src={season.image} 
                        alt={season.name} 
                        className="absolute w-full h-full object-cover"
                        loading="lazy"
                      />
                    </div>
                    <div className="p-4">
                      <h3 className="font-bold text-lg text-[#1C1C1E] dark:text-[#EAEAEA] mb-1">{season.name}</h3>
                      <p className="text-sm text-[#8D8D93] dark:text-[#D1D1D6]">{season.period}</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 bg-[#F5F0FF] dark:bg-[#1A182E] rounded-xl border border-[#D1D1D6] dark:border-[#8D8D93]">
                <p className="text-[#8D8D93] dark:text-[#D1D1D6]">未找到相关赛季</p>
              </div>
            )}
          </div>
        </>
      ) : (
        <div className="text-center py-12">
          <Search className="w-16 h-16 mx-auto text-[#D1D1D6] dark:text-[#8D8D93] mb-4" />
          <h3 className="text-xl font-bold mb-2 text-[#1C1C1E] dark:text-[#EAEAEA]">请输入搜索关键词</h3>
          <p className="text-[#8D8D93] dark:text-[#D1D1D6] max-w-md mx-auto">
            在顶部搜索框中输入英雄、物品或赛季名称进行搜索
          </p>
        </div>
      )}
    </div>
  );
};

export default SearchResults;