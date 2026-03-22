import React from 'react';
import Link from 'next/link';
import Container from './Container';

const Header = () => {
    return (
        <header className="fixed top-0 left-0 w-full z-50 bg-black border-b border-white/10 uppercase">
            <Container className="py-4 flex items-center justify-between">
                <div className="flex items-center gap-2">
                    {/* Placeholder for Logo */}
                    <div className="flex items-center space-x-2">
                        <div className="w-8 h-8 flex items-center justify-center">
                            <svg width="32" height="32" viewBox="0 0 24 24" fill="white">
                                <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
                            </svg>
                        </div>
                        <div className="flex flex-col -space-y-1">
                            <span className="text-xl font-black tracking-tight text-white uppercase italic">ESTAR</span>
                            <span className="text-[10px] tracking-widest text-white/50 uppercase">Global</span>
                        </div>
                    </div>
                </div>

                <nav>
                    <ul className="flex items-center space-x-8">
                        {['Home', 'About Us', 'The Movement', 'Stories', 'Donate', 'Contact'].map((item) => (
                            <li key={item}>
                                <Link 
                                    href={item === 'Home' ? '/' : `/${item.toLowerCase().replace(/\s+/g, '-')}`}
                                    className="text-sm font-medium text-white/80 hover:text-white transition-colors duration-200 tracking-wide"
                                >
                                    {item}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </nav>
            </Container>
        </header>
    );
};

export default Header;
