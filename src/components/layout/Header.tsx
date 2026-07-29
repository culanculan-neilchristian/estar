'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Container from './Container';
import PrintButton from './PrintButton';

const Header = () => {
    const pathname = usePathname();
    const isImpactPage = pathname?.startsWith('/impact');
    return (
        <header className="fixed top-0 left-0 w-full z-50 bg-[#002e53cc] border-b border-white/10 uppercase">
            <Container className="py-4 flex items-center justify-between">
                <Link href="/" className="inline-block shrink-0">
                    {isImpactPage ? (
                        <span className="font-bold text-white text-xl uppercase tracking-wider">eStar Thailand & AFT</span>
                    ) : (
                        <Image
                            src="/logo.png"
                            alt="eStar Global"
                            width={116}
                            height={65}
                            unoptimized
                            priority
                            className="h-10 w-auto"
                        />
                    )}
                </Link>

                <div className="flex items-center gap-8">
                    <nav className="hidden lg:block">
                        <ul className="flex items-center space-x-8">
                            <li>
                                <Link 
                                    href="/"
                                    className="text-sm font-medium text-white/80 hover:text-white transition-colors duration-200 tracking-wide uppercase"
                                >
                                    Homepage
                                </Link>
                            </li>
                            <li className="relative group py-4">
                                <button className="flex items-center gap-1 text-sm font-medium text-white/80 group-hover:text-white transition-colors duration-200 tracking-wide uppercase">
                                    Impact
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                                </button>
                                <div className="absolute top-full left-0 mt-0 w-56 bg-white text-[#091f3a] shadow-xl rounded-md overflow-hidden opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                                    <Link href="/impact" className="block px-4 py-3 text-sm hover:bg-gray-100 uppercase font-medium border-b border-gray-100">eStar Thailand & AFT</Link>
                                </div>
                            </li>
                            <li>
                                <Link 
                                    href="/movement"
                                    className="text-sm font-medium text-white/80 hover:text-white transition-colors duration-200 tracking-wide uppercase"
                                >
                                    The Movement
                                </Link>
                            </li>
                            <li>
                                <Link 
                                    href="/stories"
                                    className="text-sm font-medium text-white/80 hover:text-white transition-colors duration-200 tracking-wide uppercase"
                                >
                                    Stories
                                </Link>
                            </li>
                        </ul>
                    </nav>
                    <PrintButton />
                </div>
            </Container>
        </header>
    );
};

export default Header;
