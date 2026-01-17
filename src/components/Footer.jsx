import React from 'react';

const Footer = () => {
  return (
    <footer className="py-6 bg-gradient-to-r from-anime-pink/10 via-anime-purple/10 to-anime-blue/10 dark:from-anime-pink/5 dark:via-anime-purple/5 dark:to-anime-blue/5 border-t-2 border-dashed border-anime-pink/30 transition-colors duration-300">
      <div className="container mx-auto px-4 text-center">
        <p className="text-anime-purple/80 dark:text-anime-pink/80 text-sm">
          © {new Date().getFullYear()} 金铲铲之战资料站. 所有数据均来自游戏内信息整理。
        </p>
        <p className="text-anime-blue/70 dark:text-cyan-400/70 text-xs mt-2">
          本网站为粉丝制作，与腾讯游戏官方无任何关联。
        </p>
      </div>
    </footer>
  );
};

export default Footer;