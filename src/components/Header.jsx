import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Sun, Moon, Search } from 'lucide-react';

const Header = ({ isDarkMode, toggleTheme }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-gradient-to-r from-anime-pink/20 to-anime-purple/20 dark:from-anime-pink/10 dark:to-anime-purple/10 backdrop-blur-sm border-b-2 border-dashed border-anime-pink/50 transition-colors duration-300">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center space-x-10">
          <Link to="/" className="flex items-center space-x-2">
            <img 
              src="https://game.gtimg.cn/images/jk/logo-jcc.png" 
              alt="金铲铲资料站" 
              className="w-10 h-10 object-contain hover-pop float" 
            />
            <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-anime-pink to-anime-purple">
              金铲铲资料站
            </span>
          </Link>
          
          <nav className="hidden md:flex space-x-6">
            <Link 
              to="/heroes" 
              className="font-medium text-anime-pink hover:text-anime-purple hover-pop transition-colors duration-200"
            >
              英雄图鉴
            </Link>
            <Link 
              to="/items" 
              className="font-medium text-anime-blue hover:text-cyan-400 hover-pop transition-colors duration-200"
            >
              物品图鉴
            </Link>
            <Link 
              to="/seasons" 
              className="font-medium text-gradient-start hover:text-gradient-mid hover-pop transition-colors duration-200"
            >
              赛季档案
            </Link>
          </nav>
        </div>
        
        <div className="flex items-center space-x-4">
          <form onSubmit={handleSearch} className="relative hidden sm:block">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="搜索英雄、物品..."
              className="py-2 pl-4 pr-10 rounded-full bg-[#F5F0FF] dark:bg-[#1A182E] border-2 border-dashed border-anime-pink/50 focus:outline-none focus:ring-2 focus:ring-anime-pink w-48 md:w-64 transition-all duration-300"
            />
            <button 
              type="submit"
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#8D8D93] hover:text-[#6A5ACD]"
            >
              <Search className="w-4 h-4" />
            </button>
          </form>
          
          <button 
            onClick={toggleTheme}
            className="p-2 rounded-full bg-gradient-to-r from-anime-pink to-anime-purple hover-pop transition-colors duration-200"
            aria-label="切换主题"
          >
            {isDarkMode ? (
              <Sun className="w-5 h-5 text-white" />
            ) : (
              <Moon className="w-5 h-5 text-white" />
            )}
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;