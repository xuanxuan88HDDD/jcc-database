import { useEffect, useState } from 'react';

// 获取所有可用的赛季和模式
export const getAvailableSeasons = async () => {
  try {
    // 尝试从HTML目录列表获取
    const response = await fetch('/jcc');
    if (response.ok) {
      const html = await response.text();
      const parser = new DOMParser();
      const doc = parser.parseFromString(html, 'text/html');
      const links = Array.from(doc.querySelectorAll('a[href]'))
        .map(a => {
          const href = a.getAttribute('href');
          // 提取目录名
          if (href && href.endsWith('/')) {
            const dirName = href.replace(/\/$/, '').split('/').pop();
            return dirName;
          }
          return null;
        })
        .filter(name => name && name.includes('_S')); // 包含_S通常是赛季目录
      
      return links.map(dir => {
        // 从目录名解析信息
        let name = dir.replace(/_/g, ' ');
        let version = '未知';
        let date = '未知';
        
        // 尝试从目录名中提取版本和日期信息
        const versionMatch = dir.match(/\d+\.\d+(\.\d+)?/g);
        if (versionMatch) {
          version = versionMatch[versionMatch.length - 1];
        }
        
        const dateMatch = dir.match(/\d{6,}/);
        if (dateMatch) {
          date = dateMatch[0];
        }
        
        // 构建季节名称
        const seasonMatch = dir.match(/S\d+/);
        if (seasonMatch) {
          const seasonNum = seasonMatch[0];
          if (dir.includes('冠军乱斗')) {
            name = `冠军乱斗 ${seasonNum}`;
          } else if (dir.includes('双城传说')) {
            name = `双城传说 ${seasonNum}`;
          } else if (dir.includes('天下无双')) {
            name = `天下无双 ${seasonNum}`;
          } else if (dir.includes('天选福星')) {
            name = `天选福星 ${seasonNum}`;
          } else if (dir.includes('强音对决')) {
            name = `强音对决 ${seasonNum}`;
          } else if (dir.includes('英雄联盟')) {
            name = `英雄联盟 ${seasonNum}`;
          } else if (dir.includes('赛博城市')) {
            name = `赛博城市 ${seasonNum}`;
          } else {
            name = `${dir.split('_')[0]} ${seasonNum}`;
          }
        }
        
        return { id: dir, name, version, date };
      });
    }
  } catch (error) {
    console.error('Error fetching seasons list from HTML:', error);
  }
  
  // 如果无法获取目录列表，则返回默认列表
  return [
    { id: '冠军乱斗_202501_S16_15.15.4', name: '冠军乱斗 S16', version: '15.15.4', date: '2025-01' },
    { id: '双城传说2_13_S14_14.13.5', name: '双城传说 S14', version: '14.13.5', date: '2024-13' },
    { id: '双城传说_6_S12_12.5.1', name: '双城传说 S12', version: '12.5.1', date: '2022-06' },
    { id: '天下无双格斗大会_15_S16_15.15.4', name: '天下无双格斗大会 S16', version: '15.15.4', date: '2025-15' },
    { id: '天选福星_4_S11_4.3.25', name: '天选福星 S11', version: '4.3.25', date: '2021-04' },
    { id: '强音对决_10_S16_15.15.3', name: '强音对决 S16', version: '15.15.3', date: '2025-10' },
    { id: '英雄联盟传奇_16_S17_16.16.1', name: '英雄联盟传奇 S17', version: '16.16.1', date: '2025-16' },
    { id: '赛博城市_14_S15_14.14.1', name: '赛博城市 S15', version: '14.14.1', date: '2024-14' },
  ];
};

// 获取所有数据的综合方法
export const loadAllData = async () => {
  try {
    const seasons = await getAvailableSeasons();
    
    // 并行加载所有数据
    const [heroesPromises, itemsPromises] = await Promise.all([
      Promise.all(seasons.map(season => loadHeroesData(season.id))),
      Promise.all(seasons.map(season => loadItemsData(season.id)))
    ]);
    
    // 合并所有数据
    const allHeroes = heroesPromises.flat();
    const allItems = itemsPromises.flat();
    
    return { heroes: allHeroes, items: allItems };
  } catch (error) {
    console.error('Error loading all data:', error);
    return { heroes: [], items: [] };
  }
};

// 动态导入英雄数据
export const loadHeroesData = async (seasonId = '冠军乱斗_202501_S16_15.15.4') => {
  try {
    // 由于静态导入不能使用变量，我们需要预先知道可能的路径
    // 在实际情况下，您可能需要设置后端API来提供这些数据
    const response = await fetch(`/jcc/${seasonId}/chess.js`);
    if (!response.ok) {
      throw new Error(`Failed to load heroes data: ${response.status}`);
    }
    
    // 由于chess.js是JSONP格式，我们需要解析它
    const text = await response.text();
    // 提取JSON部分
    const jsonStart = text.indexOf('{');
    const jsonEnd = text.lastIndexOf('}') + 1;
    const jsonData = text.substring(jsonStart, jsonEnd);
    const parsedData = JSON.parse(jsonData);
    
    // 转换数据格式以匹配前端需求
    return Object.values(parsedData.data || {}).map(hero => ({
      id: parseInt(hero.id),
      name: hero.name,
      title: hero.class, // 使用职业作为标题
      cost: parseInt(hero.price) || 1,
      traits: [hero.species], // 使用种族作为羁绊
      season: parsedData.season,
      image: hero.picture,
      health: [parseInt(hero.initHP), parseInt(hero.initHP) * 1.8, parseInt(hero.initHP) * 3.2], // 基础/2星/3星生命值
      attack: [parseInt(hero.initAttackDamage), parseInt(hero.initAttackDamage) * 1.8, parseInt(hero.initAttackDamage) * 3.2], // 基础/2星/3星攻击力
      armor: parseInt(hero.armor),
      magicResist: parseInt(hero.magicResist),
      skill: {
        name: hero.skillName,
        description: hero.skillDesc,
        stats: parseSkillStats(hero.skillBriefValue, hero.skillValueDesc)
      }
    }));
  } catch (error) {
    console.error('Error loading heroes data:', error);
    // 返回模拟数据作为后备
    return [
      {
        id: 1,
        name: '盖伦',
        title: '德玛西亚之力',
        cost: 1,
        traits: ['骑士', '战士'],
        season: 'S1',
        image: 'https://game.gtimg.cn/images/lol/act/jkzlk/mode202501s16/hero/s202501_head_garen.png',
        health: [600, 1080, 1944],
        attack: [60, 108, 194],
        armor: 40,
        magicResist: 40,
        skill: {
          name: '正义审判',
          description: '盖伦移除所有负面效果并获得护盾，然后对附近敌人造成魔法伤害。',
          stats: [
            { level: '1', damage: '200' },
            { level: '2', damage: '300' },
            { level: '3', damage: '450' }
          ]
        }
      }
    ];
  }
};

// 解析技能统计数据
const parseSkillStats = (briefValue, valueDesc) => {
  if (!briefValue || !valueDesc) return [];
  
  const levels = briefValue.split('|');
  const descParts = valueDesc.split('|');
  
  // 简单解析，实际情况可能需要更复杂的解析逻辑
  return levels.slice(0, 3).map((level, index) => ({
    level: `${index + 1}`,
    description: descParts[index] || `Level ${index + 1} value: ${level}`
  }));
};

// 动态导入物品数据
export const loadItemsData = async (seasonId = '冠军乱斗_202501_S16_15.15.4') => {
  try {
    const response = await fetch(`/jcc/${seasonId}/equip.js`);
    if (!response.ok) {
      throw new Error(`Failed to load items data: ${response.status}`);
    }
    
    const text = await response.text();
    // 提取JSON部分
    const jsonStart = text.indexOf('{');
    const jsonEnd = text.lastIndexOf('}') + 1;
    const jsonData = text.substring(jsonStart, jsonEnd);
    const parsedData = JSON.parse(jsonData);
    
    // 转换数据格式以匹配前端需求
    return Object.values(parsedData.data || {}).map(item => ({
      id: parseInt(item.id),
      name: item.name,
      type: item.type,
      season: parsedData.season,
      image: item.picture,
      description: item.desc || item.basicDesc,
      stats: parseItemStats(item.basicDesc)
    }));
  } catch (error) {
    console.error('Error loading items data:', error);
    // 返回模拟数据作为后备
    return [
      {
        id: 1,
        name: '暴风大剑',
        type: '基础装备',
        season: 'S1',
        image: 'https://www.weavefox.cn/api/bolt/unsplash_image?keyword=game,item,sword&width=300&height=300&random=item1',
        stats: { attackDamage: 10 },
        description: '基础攻击装备，提供攻击力加成。'
      }
    ];
  }
};

// 解析物品统计数据
const parseItemStats = (basicDesc) => {
  if (!basicDesc) return {};
  
  const stats = {};
  if (basicDesc.includes('物理加成')) {
    const match = basicDesc.match(/([0-9]+)物理加成/);
    if (match) {
      stats.attackDamage = parseInt(match[1]);
    }
  }
  if (basicDesc.includes('法术加成')) {
    const match = basicDesc.match(/([0-9]+)法术加成/);
    if (match) {
      stats.abilityPower = parseInt(match[1]);
    }
  }
  if (basicDesc.includes('生命上限')) {
    const match = basicDesc.match(/([0-9]+)生命上限/);
    if (match) {
      stats.health = parseInt(match[1]);
    }
  }
  
  return stats;
};

// 使用Hook来加载英雄数据
export const useHeroesData = (seasonId) => {
  const [heroes, setHeroes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const data = await loadHeroesData(seasonId);
        setHeroes(data);
        setError(null);
      } catch (err) {
        setError(err.message);
        console.error('Failed to load heroes:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [seasonId]);

  return { heroes, loading, error };
};

// 使用Hook来加载物品数据
export const useItemsData = (seasonId) => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const data = await loadItemsData(seasonId);
        setItems(data);
        setError(null);
      } catch (err) {
        setError(err.message);
        console.error('Failed to load items:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [seasonId]);

  return { items, loading, error };
};