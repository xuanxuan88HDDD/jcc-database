import React from 'react';
import { Link } from 'react-router-dom';
import { Sword, ShoppingCart, Calendar, Sparkles, Star, Heart } from 'lucide-react';

const Home = () => {
  return (
    <div className="flex-grow">
      {/* 主视觉区域 - 更二次元风格 */}
      <section className="py-16 md:py-24 bg-gradient-to-r from-anime-pink/10 via-anime-purple/10 to-anime-blue/10 dark:from-anime-pink/20 dark:via-anime-purple/20 dark:to-anime-blue/20 relative overflow-hidden">
        {/* 添加装饰元素 */}
        <div className="absolute top-10 left-10 text-anime-pink animate-pulse">
          <Sparkles size={30} />
        </div>
        <div className="absolute top-20 right-20 text-anime-purple animate-bounce" style={{animationDuration: '2s'}}>
          <Star size={25} />
        </div>
        <div className="absolute bottom-20 left-1/4 text-anime-blue animate-pulse" style={{animationDuration: '1.5s'}}>
          <Heart size={28} />
        </div>
        
        <div className="container mx-auto px-4 text-center relative z-10">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-anime-pink to-anime-purple animate-pulse-anime">
            金铲铲之战资料站
          </h1>
          <p className="text-xl md:text-2xl max-w-3xl mx-auto mb-10 text-[#1C1C1E] dark:text-[#EAEAEA]">
            一站式查询金铲铲之战英雄、物品和赛季信息，助你快速掌握游戏攻略
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link 
              to="/heroes" 
              className="btn-primary px-10 py-4 text-lg font-bold hover-pop"
            >
              <Sparkles className="inline mr-2" size={20} />开始探索
            </Link>
            <Link 
              to="/seasons" 
              className="btn-secondary px-10 py-4 text-lg font-bold hover-pop"
            >
              <Star className="inline mr-2" size={20} /> 查看更新
            </Link>
          </div>
        </div>
      </section>

      {/* 内容入口区域 */}
      <section className="py-16 bg-white dark:bg-[#0D0B1C] transition-colors duration-300">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-[#1C1C1E] dark:text-[#EAEAEA]">核心功能</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <Link 
              to="/heroes" 
              className="card group bg-gradient-to-br from-anime-pink/20 to-anime-purple/20 dark:from-anime-pink/10 dark:to-anime-purple/10 border border-dashed border-anime-pink/30 hover:border-solid hover:border-anime-pink/60"
            >
              <div className="w-16 h-16 rounded-xl bg-gradient-to-r from-anime-pink to-anime-purple flex items-center justify-center mb-6 hover-pop float">
                <Sword className="text-white w-8 h-8" />
              </div>
              <h3 className="text-2xl font-bold mb-3 text-[#1C1C1E] dark:text-[#EAEAEA] group-hover:text-anime-pink transition-colors duration-300">英雄图鉴</h3>
              <p className="text-[#8D8D93] dark:text-[#D1D1D6] mb-4">
                查看所有英雄的详细信息，包括技能、羁绊和属性数据
              </p>
              <span className="text-anime-pink font-medium flex items-center group-hover:translate-x-2 transition-transform duration-300 hover-pop">
                立即查看
                <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </span>
            </Link>
            
            <Link 
              to="/items" 
              className="card group bg-gradient-to-br from-anime-blue/20 to-anime-purple/20 dark:from-anime-blue/10 dark:to-anime-purple/10 border border-dashed border-anime-blue/30 hover:border-solid hover:border-anime-blue/60"
            >
              <div className="w-16 h-16 rounded-xl bg-gradient-to-r from-anime-blue to-anime-purple flex items-center justify-center mb-6 hover-pop float" style={{animationDelay: '0.2s'}}>
                <ShoppingCart className="text-white w-8 h-8" />
              </div>
              <h3 className="text-2xl font-bold mb-3 text-[#1C1C1E] dark:text-[#EAEAEA] group-hover:text-anime-blue transition-colors duration-300">物品图鉴</h3>
              <p className="text-[#8D8D93] dark:text-[#D1D1D6] mb-4">
                了解所有物品的属性和合成路径，掌握装备搭配技巧
              </p>
              <span className="text-anime-blue font-medium flex items-center group-hover:translate-x-2 transition-transform duration-300 hover-pop">
                立即查看
                <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </span>
            </Link>
            
            <Link 
              to="/seasons" 
              className="card group bg-gradient-to-br from-anime-yellow/20 to-anime-pink/20 dark:from-anime-yellow/10 dark:to-anime-pink/10 border border-dashed border-anime-yellow/30 hover:border-solid hover:border-anime-yellow/60"
            >
              <div className="w-16 h-16 rounded-xl bg-gradient-to-r from-anime-yellow to-anime-pink flex items-center justify-center mb-6 hover-pop float" style={{animationDelay: '0.4s'}}>
                <Calendar className="text-white w-8 h-8" />
              </div>
              <h3 className="text-2xl font-bold mb-3 text-[#1C1C1E] dark:text-[#EAEAEA] group-hover:text-anime-yellow transition-colors duration-300">赛季档案</h3>
              <p className="text-[#8D8D93] dark:text-[#D1D1D6] mb-4">
                追踪各赛季更新内容，了解版本变化和重大调整
              </p>
              <span className="text-anime-yellow font-medium flex items-center group-hover:translate-x-2 transition-transform duration-300 hover-pop">
                立即查看
                <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </span>
            </Link>
          </div>
        </div>
      </section>

      {/* 特色功能介绍 */}
      <section className="py-16 bg-gradient-to-r from-[#4ECDC4]/10 to-[#6A5ACD]/10 dark:from-[#4ECDC4]/20 dark:to-[#6A5ACD]/20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-[#1C1C1E] dark:text-[#EAEAEA]">为什么选择我们</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            <div className="bg-white dark:bg-[#1A182E] p-6 rounded-xl shadow-md border border-[#D1D1D6] dark:border-[#8D8D93]">
              <div className="w-12 h-12 rounded-lg bg-[#FF6B35] flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2 text-[#1C1C1E] dark:text-[#EAEAEA]">信息聚合</h3>
              <p className="text-[#8D8D93] dark:text-[#D1D1D6]">一站式查询所有游戏资料，无需跳转多个平台</p>
            </div>
            
            <div className="bg-white dark:bg-[#1A182E] p-6 rounded-xl shadow-md border border-[#D1D1D6] dark:border-[#8D8D93]">
              <div className="w-12 h-12 rounded-lg bg-[#6A5ACD] flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2 text-[#1C1C1E] dark:text-[#EAEAEA]">新手友好</h3>
              <p className="text-[#8D8D93] dark:text-[#D1D1D6]">清晰的分类和引导，帮助新手快速上手</p>
            </div>
            
            <div className="bg-white dark:bg-[#1A182E] p-6 rounded-xl shadow-md border border-[#D1D1D6] dark:border-[#8D8D93]">
              <div className="w-12 h-12 rounded-lg bg-[#4ECDC4] flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2 text-[#1C1C1E] dark:text-[#EAEAEA]">信息对比</h3>
              <p className="text-[#8D8D93] dark:text-[#D1D1D6]">支持英雄、物品属性对比，辅助决策</p>
            </div>
            
            <div className="bg-white dark:bg-[#1A182E] p-6 rounded-xl shadow-md border border-[#D1D1D6] dark:border-[#8D8D93]">
              <div className="w-12 h-12 rounded-lg bg-[#FF6B35] flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2 text-[#1C1C1E] dark:text-[#EAEAEA]">移动优化</h3>
              <p className="text-[#8D8D93] dark:text-[#D1D1D6]">响应式布局和触摸优化，提供优秀的移动端体验</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;