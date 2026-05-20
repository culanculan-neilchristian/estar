import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Container from './Container';
import PrintButton from './PrintButton';

const Header = () => {
    return (
        <header className="fixed top-0 left-0 w-full z-50 bg-[#002e53cc] border-b border-white/10 uppercase">
            <Container className="py-4 flex items-center justify-between">
                <Link href="/" className="inline-block shrink-0">
                    <Image
                        src="/logo.png"
                        alt="eStar Global"
                        width={116}
                        height={65}
                        unoptimized
                        priority
                        className="h-10 w-auto"
                    />
                </Link>

                <div className="flex items-center gap-8">
                    <nav className="hidden lg:block">
                        <ul className="flex items-center space-x-8">
                            {[].map((item) => (
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
                    <PrintButton />
                </div>
            </Container>
        </header>
    );
};

export default Header;
