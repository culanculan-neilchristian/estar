'use client';

import React from 'react';
import Image from 'next/image';
import Container from '@/components/layout/Container';
import grandmaImage from '@/assets/images/image 17.jpg';
import vanImage from '@/assets/images/Image 1.jpg';
import baptismImage from '@/assets/images/Image 2.jpg';
import gatheringImage from '@/assets/images/Image 4.jpg';
import { useScrollReveal } from '@/hooks/useScrollReveal';

const TransformedLives = () => {
    const { ref, isVisible } = useScrollReveal();
    return (
        <section ref={ref} className="bg-[#002E50] py-24 border-t border-white/10 overflow-hidden text-white">
            <Container>
                <div className={`text-center mb-20 reveal-on-scroll fade-up ${isVisible ? 'is-visible' : ''}`}>
                    <h2 className="heading-1 text-white">Transformed Lives</h2>
                </div>

                {/* Main Story */}
                <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 items-center mb-24">
                    {/* Grandma Image */}
                    <div className={`w-full lg:w-5/12 reveal-on-scroll scale-in ${isVisible ? 'is-visible' : ''}`}>
                        <div className="relative aspect-square rounded-[32px] overflow-hidden group">
                            <Image 
                                src={grandmaImage} 
                                alt="Grandma Somnuek" 
                                fill 
                                className="object-cover transition-transform duration-700 group-hover:scale-105"
                            />
                        </div>
                    </div>

                    {/* Story Text */}
                    <div className="w-full lg:w-7/12 space-y-6">
                        <div className={`reveal-on-scroll fade-up delay-100 ${isVisible ? 'is-visible' : ''}`}>
                            <h3 className="text-2xl font-bold text-white mb-1">Grandma Somnuek, Age 70</h3>
                            <p className="text-xl font-medium text-white/70 italic">A Heart Transformed</p>
                        </div>
                        
                        <div className="space-y-4">
                            <p className={`paragraph text-white reveal-on-scroll fade-up delay-200 ${isVisible ? 'is-visible' : ''}`}>
                                Known throughout her village for her energy and love of dancing at ordination ceremonies, 
                                Grandma Somnuek never missed a local celebration. The sounds of drums and folk music filled her with joy.
                            </p>
                            <p className={`paragraph text-white reveal-on-scroll fade-up delay-300 ${isVisible ? 'is-visible' : ''}`}>
                                But everything changed when she heard about Jesus. &quot;Jesus loves you. He gives true joy,&quot; 
                                someone from a local church told her. Curious, she began attending services. The peace she found 
                                there was unlike anything she had experienced before. As she prayed and read the Bible, her heart began to change.
                            </p>
                            <p className={`paragraph text-white reveal-on-scroll fade-up delay-400 ${isVisible ? 'is-visible' : ''}`}>
                                One Sunday, as she rode her bike to church, she passed a large ordination ceremony. 
                                The drums called to her—but something deeper stirred. &quot;Will you choose the old joy or the lasting one?&quot; 
                                She chose Jesus.
                            </p>
                            <p className={`paragraph text-white font-medium reveal-on-scroll fade-up delay-500 ${isVisible ? 'is-visible' : ''}`}>
                                Now, Grandma Somnuek worships with joy and peace in her heart, knowing that true happiness 
                                comes not from dancing, but from Christ.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Gallery */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {[
                        { img: vanImage, alt: "Community Outreach Van" },
                        { img: baptismImage, alt: "Baptism Ceremony" },
                        { img: gatheringImage, alt: "Village Gathering" }
                    ].map((item, idx) => (
                        <div 
                            key={idx} 
                            className={`relative aspect-[4/3] rounded-2xl overflow-hidden group shadow-2xl reveal-on-scroll scale-in ${isVisible ? 'is-visible' : ''}`}
                            style={{ transitionDelay: `${600 + (idx * 100)}ms` }}
                        >
                            <Image 
                                src={item.img} 
                                alt={item.alt} 
                                fill 
                                className="object-cover transition-transform duration-700 group-hover:scale-110"
                            />
                        </div>
                    ))}
                </div>
            </Container>
        </section>
    );
};

export default TransformedLives;
