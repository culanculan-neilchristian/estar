import Link from 'next/link';
import Image from 'next/image';
import { Facebook, Instagram, Linkedin, MapPin, Mail, Phone, Clock } from 'lucide-react';
import Container from './Container';
const Footer = () => {
    return (
        <footer className="border-t border-white/10">
            <div className="bg-[#023864] pt-16 pb-16">
            <Container>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16">
                    {/* Brand Info */}
                    <div className="lg:col-span-1 space-y-8">
                        <Link href="/" className="inline-block">
                            <Image
                                src="/logo.png"
                                alt="eStar Global"
                                width={116}
                                height={65}
                                unoptimized
                                className="h-10 w-auto"
                            />
                        </Link>
                        <p className="text-sm text-white/80 leading-relaxed max-w-xs">
                            We help ministries strategically plant churches and reach unreached people 
                            through powerful tools, partnerships, and prayer.
                        </p>
                        <div className="flex gap-4">
                            <Link href="#" className="w-10 h-10 rounded-full border border-white/30 flex items-center justify-center text-white hover:border-white transition-all">
                                <Facebook size={18} />
                            </Link>
                            <Link href="#" className="w-10 h-10 rounded-full border border-white/30 flex items-center justify-center text-white hover:border-white transition-all">
                                <Instagram size={18} />
                            </Link>
                            <Link href="#" className="w-10 h-10 rounded-full border border-white/30 flex items-center justify-center text-white hover:border-white transition-all">
                                <Linkedin size={18} />
                            </Link>
                        </div>
                    </div>

                    {/* Spacer for 2nd column if needed according to design, but design has Quick Links in 3rd/4th spot on wide screens */}
                    <div className="hidden lg:block"></div>

                    {/* Quick Links */}
                    <div className="space-y-8">
                        <h4 className="text-sm font-bold text-white uppercase tracking-widest">Quick Links</h4>
                        <ul className="space-y-4">
                            {['Home'].map((link) => (
                                <li key={link}>
                                    <Link href="#" className="text-sm text-white hover:text-white/80 transition-colors">{link}</Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Get in Touch */}
                    <div className="space-y-8">
                        <h4 className="text-sm font-bold text-white uppercase tracking-widest">Get in Touch</h4>
                        <ul className="space-y-5">
                            <li className="flex gap-4 text-[#8FB9DC]">
                                <MapPin size={18} className="flex-shrink-0 text-white" />
                                <span className="text-sm leading-tight">123 Main Street,<br />New York, NY 10001</span>
                            </li>
                            <li className="flex gap-4 text-[#8FB9DC] items-center">
                                <Mail size={18} className="flex-shrink-0 text-white" />
                                <span className="text-sm leading-tight">contact@mysite.com</span>
                            </li>
                            <li className="flex gap-4 text-[#8FB9DC] items-center">
                                <Phone size={18} className="flex-shrink-0 text-white" />
                                <span className="text-sm leading-tight">+1 123-456-7890</span>
                            </li>
                            <li className="flex gap-4 text-[#8FB9DC]">
                                <Clock size={18} className="flex-shrink-0 text-white" />
                                <span className="text-sm leading-tight">Mon-Fri<br />9:00AM - 5:00PM</span>
                            </li>
                        </ul>
                    </div>
                </div>

            </Container>
            </div>

            {/* Bottom Bar */}
            <div className="bg-[#4691CB] py-5">
                <Container>
                    <p className="text-xs font-bold text-white uppercase tracking-[0.3em] text-center">
                        &copy; {new Date().getFullYear()} All Rights Reserved.
                    </p>
                </Container>
            </div>
        </footer>
    );
};

export default Footer;
