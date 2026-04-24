'use client';

import React from 'react';
import Image from 'next/image';
import { Church, Megaphone, UserRound, MapPin, Scroll } from 'lucide-react';
import Container from '@/components/layout/Container';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import missionImg from '@/assets/images/mission.jpg';
import visionImg from '@/assets/images/vision.jpg';
import approachImg from '@/assets/images/approach.jpg';
import storyHeroImg from '@/assets/images/Our Story.jpg';
import ctaImg from '@/assets/images/CTA.jpg';
import acc1 from '@/assets/images/accolades1.png';
import acc2 from '@/assets/images/accolades2.png';
import acc3 from '@/assets/images/accolades3.png';
import acc4 from '@/assets/images/accolades4.png';
import acc5 from '@/assets/images/accolades5.png';

const AboutUs = () => {
    const { ref: storyRef, isVisible: storyVisible } = useScrollReveal();
    const { ref: historyRef, isVisible: historyVisible } = useScrollReveal();
    const { ref: missionRef, isVisible: missionVisible } = useScrollReveal();
    const { ref: visionRef, isVisible: visionVisible } = useScrollReveal();
    const { ref: approachRef, isVisible: approachVisible } = useScrollReveal();
    const { ref: impactRef, isVisible: impactVisible } = useScrollReveal();
    const { ref: teamRef, isVisible: teamVisible } = useScrollReveal();
    const { ref: accoladesRef, isVisible: accoladesVisible } = useScrollReveal();
    const { ref: ctaRef, isVisible: ctaVisible } = useScrollReveal();

    return (
        <div className="bg-black text-white">
            {/* Our Story - Hero Section */}
            <section ref={storyRef} className="relative pt-30 pb-30 border-b border-white/5 overflow-hidden">
                {/* Hero Background with Image and Overlay */}
                <div className="absolute inset-0 z-0">
                    <Image 
                        src={storyHeroImg} 
                        alt="Our Story Header" 
                        fill 
                        className="object-cover opacity-30"
                        priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-[#747474]/80 via-black/80 to-black z-10" />
                </div>

                <Container className="relative z-20">
                    <div className="space-y-12">
                        <div className={`space-y-4 reveal-on-scroll fade-up ${storyVisible ? 'is-visible' : ''}`}>
                            <span className="eyebrow">ABOUT US</span>
                            <h1 className="heading-1">Our Story</h1>
                        </div>
                        
                        <div className="space-y-8">
                            <p className={`paragraph text-xl md:text-2xl text-white/90 leading-relaxed reveal-on-scroll fade-up delay-100 ${storyVisible ? 'is-visible' : ''}`}>
                                The story of eStar began with a burden — the reality that millions of people in Thailand 
                                lived in villages with no church, no Christian witness, and no access to the Gospel. 
                                Entire communities were growing up and passing away without ever hearing the name of Jesus.
                            </p>
                            <p className={`paragraph text-lg md:text-xl text-white/70 leading-relaxed reveal-on-scroll fade-up delay-200 ${storyVisible ? 'is-visible' : ''}`}>
                                In 2019, a small group of believers asked a question that would define our mission: 
                                <span className="text-white italic block mt-3 text-xl font-medium">
                                    &quot;What if we could see exactly where the Gospel has not gone, and equip the church to go there?&quot;
                                </span>
                            </p>
                            <p className={`paragraph text-lg md:text-xl text-white/70 leading-relaxed reveal-on-scroll fade-up delay-300 ${storyVisible ? 'is-visible' : ''}`}>
                                This question gave birth to eStar Foundation. At first, the vision was simple — to map the spread of the Gospel 
                                in Thailand. But what began as a tool quickly became a movement. With clear data, churches could finally see where 
                                the need was greatest. With training and resources, pastors and missionaries could go with confidence. 
                                With collaboration, the body of Christ could begin working together to finish the Task.
                            </p>
                            <p className={`paragraph text-lg md:text-xl text-white/70 leading-relaxed reveal-on-scroll fade-up delay-400 ${storyVisible ? 'is-visible' : ''}`}>
                                The name &quot;eStar&quot; reflects this vision. Just as the star guided the wise men to Christ, 
                                we exist to guide the church toward places where Christ has not yet been proclaimed. 
                                The &quot;e&quot; represents evangelism and equipping — the heart of what we do every day.
                            </p>
                        </div>
                    </div>
                </Container>
            </section>



            {/* Our Mission */}
            <section ref={missionRef} className="py-20 border-b border-white/5">
                <Container>
                    <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
                        {/* Image Left */}
                        <div className={`w-full lg:w-1/2 reveal-on-scroll scale-in ${missionVisible ? 'is-visible' : ''}`}>
                            <div className="relative aspect-[4/3] rounded-[40px] overflow-hidden shadow-2xl border border-white/10 group">
                                <Image 
                                    src={missionImg} 
                                    alt="Our Mission" 
                                    fill 
                                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                                />
                            </div>
                        </div>
                        
                        {/* Content Right */}
                        <div className="w-full lg:w-1/2 space-y-8">
                            <div className={`reveal-on-scroll fade-up ${missionVisible ? 'is-visible' : ''}`}>
                                <h2 className="heading-1 mb-6">Our Mission</h2>
                                <div className="space-y-6">
                                    <p className="paragraph text-lg">
                                        Our mission is to see the Gospel brought to every village. We do this by 
                                        helping the church identify where the Gospel has not gone, and by 
                                        equipping believers to take the Good News there.
                                    </p>
                                    <p className="paragraph text-lg">
                                        Through mapping, training, and sending, eStar works to multiply churches, 
                                        transform communities, and advance the Great Commission in Thailand and beyond.
                                    </p>
                                </div>
                            </div>
                            
                            <div className={`quote-box reveal-on-scroll fade-up delay-200 ${missionVisible ? 'is-visible' : ''}`}>
                                <p className="text-xl font-bold text-white/90">
                                    We are guided by Christ&apos;s command:
                                </p>
                                <p className="text-lg italic text-white/60 mt-2">
                                    &quot;Go therefore and make disciples of all nations.&quot; — Matthew 28:19
                                </p>
                            </div>
                        </div>
                    </div>
                </Container>
            </section>

            {/* Our Vision */}
            <section ref={visionRef} className="py-20 border-b border-white/5">
                <Container>
                    <div className="flex flex-col-reverse lg:flex-row items-center gap-16 lg:gap-24">
                        {/* Content Left */}
                        <div className="w-full lg:w-1/2 space-y-12">
                            <div className={`reveal-on-scroll fade-up ${visionVisible ? 'is-visible' : ''}`}>
                                <h2 className="heading-1 mb-6">Our Vision</h2>
                                <div className="space-y-6">
                                    <p className="paragraph text-lg">
                                        We believe in a bold, God-sized vision: a future where every village in Thailand — 
                                        and eventually every village across Southeast Asia — has a thriving Christian presence.
                                    </p>
                                    <p className="paragraph text-lg">
                                        This vision is not only about planting churches on a map, but about seeing 
                                        communities transformed by the love of Christ. We dream of disciples making 
                                        disciples, churches multiplying in strength, and generations living in the hope of the Gospel.
                                    </p>
                                    <p className="text-sm font-bold text-white/40 uppercase tracking-widest pt-4">
                                        By 2037, our key goals are:
                                    </p>
                                </div>
                            </div>
                            
                            {/* Stats Grid */}
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
                                {[
                                    { icon: Church, label: "100% of Thailand's villages mapped and engaged with the Gospel" },
                                    { icon: Megaphone, label: "30,000 churches planted nationwide" },
                                    { icon: UserRound, label: "A thriving Christian witness in every province" }
                                ].map((stat, i) => (
                                    <div key={i} className={`flex flex-col items-center text-center reveal-on-scroll scale-in ${visionVisible ? 'is-visible' : ''}`} style={{ transitionDelay: `${i * 100 + 200}ms` }}>
                                        <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center mb-4 shadow-xl">
                                            <stat.icon className="w-8 h-8 text-black" />
                                        </div>
                                        <span className="text-[10px] font-black text-white/50 uppercase tracking-[0.2em] leading-relaxed max-w-[120px]">
                                            {stat.label}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>
                        
                        {/* Image Right */}
                        <div className={`w-full lg:w-1/2 reveal-on-scroll scale-in ${visionVisible ? 'is-visible' : ''}`}>
                            <div className="relative aspect-[4/3] rounded-[40px] overflow-hidden shadow-2xl border border-white/10 group">
                                <Image 
                                    src={visionImg} 
                                    alt="Our Vision" 
                                    fill 
                                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                                />
                            </div>
                        </div>
                    </div>
                </Container>
            </section>

            {/* Our Approach */}
            <section ref={approachRef} className="py-20">
                <Container>
                    <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
                        {/* Image Left */}
                        <div className={`w-full lg:w-1/2 reveal-on-scroll scale-in ${approachVisible ? 'is-visible' : ''}`}>
                            <div className="relative aspect-[4/3] rounded-[40px] overflow-hidden shadow-2xl border border-white/10 group">
                                <Image 
                                    src={approachImg} 
                                    alt="Our Approach" 
                                    fill 
                                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                                />
                            </div>
                        </div>
                        
                        {/* Content Right */}
                        <div className="w-full lg:w-1/2 space-y-10">
                            <div className={`reveal-on-scroll fade-up ${approachVisible ? 'is-visible' : ''}`}>
                                <h2 className="heading-1 mb-6">Our Approach</h2>
                                <p className="paragraph text-lg mb-10">
                                    At eStar we believe that faith and strategy work best when combined. Our approach is 
                                    designed to bring clarity, focus, and momentum to the mission:
                                </p>
                                
                                <ul className="space-y-6">
                                    {[
                                        { title: "Mapping the Need", desc: "Identifying villages that remain unreached by the Gospel." },
                                        { title: "Equipping the Church", desc: "Training and resourcing pastors, leaders, and missionaries with practical tools." },
                                        { title: "Sending and Multiplying", desc: "Establishing new churches in unreached areas, empowering them to disciple others and plant more churches." }
                                    ].map((item, i) => (
                                        <li key={i} className={`flex gap-4 reveal-on-scroll fade-up ${approachVisible ? 'is-visible' : ''}`} style={{ transitionDelay: `${i * 100 + 400}ms` }}>
                                            <div className="w-2 h-2 rounded-full bg-white mt-2 shrink-0" />
                                            <div>
                                                <h4 className="text-lg font-bold text-white">{item.title}</h4>
                                                <p className="text-white/60 leading-relaxed font-light">{item.desc}</p>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            
                            <p className={`paragraph text-lg italic text-white/40 border-t border-white/10 pt-8 reveal-on-scroll fade-up delay-700 ${approachVisible ? 'is-visible' : ''}`}>
                                This approach ensures that no village is forgotten, and every community has the 
                                opportunity to encounter the Good News of Jesus.
                            </p>
                        </div>
                    </div>
                </Container>
            </section>

            {/* Our History Timeline Section */}
            <section ref={historyRef} className="py-20 overflow-hidden relative border-t border-white/10">
                {/* Subtle Background Glow */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-white/5 blur-[120px] rounded-full" />
                
                <Container className="relative z-10">
                    <div className={`text-center mb-24 reveal-on-scroll fade-up ${historyVisible ? 'is-visible' : ''}`}>
                        <h2 className="heading-1 text-white">Our History</h2>
                    </div>

                    <div className="relative max-w-6xl mx-auto">
                        {/* Central Vertical Line */}
                        <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-white/10 hidden md:block" />

                        <div className="space-y-24 mt-20 md:mt-0">
                            {[
                                {
                                    year: "2025",
                                    title: "Looking Forward",
                                    content: "Today, eStar continues to look ahead with bold faith. The mission remains clear: by 2027, every village in Thailand will be engaged with the Gospel. At the same time, the foundation is preparing to expand its reach into Southeast Asia, laying the groundwork for an even greater movement of transformation across the region."
                                },
                                {
                                    year: "2024",
                                    title: "Strengthening Partnerships",
                                    content: "Partnerships became a powerful force for progress. With the collaboration of churches and supporters worldwide, 660 churches had been planted across Thailand since eStar's founding. In that same year, more than $660,000 was raised to accelerate the mission, marking a milestone in both faith and provision."
                                },
                                {
                                    year: "2023",
                                    title: "Expanding the Mission",
                                    content: "The mission expanded rapidly. More than 28,000 villages across Thailand were engaged with the Gospel, and over 58,000 souls came to faith through church planting and outreach efforts. The movement was no longer just growing—it was multiplying."
                                },
                                {
                                    year: "2022",
                                    title: "First Wave of Church Planting",
                                    content: "Momentum began to build as hundreds of churches were planted in unreached communities. Discipleship movements started taking root, with local believers stepping into leadership and spreading the Gospel in their own contexts."
                                },
                                {
                                    year: "2021",
                                    title: "Equipping Local Churches",
                                    content: "The next step was empowering those closest to the mission: local pastors, missionaries, and leaders. Training programs were established to equip them with the tools and strategies needed to reach their surrounding villages. Dozens of churches began to rise to the challenge, forming the backbone of a growing network."
                                },
                                {
                                    year: "2020",
                                    title: "Mapping the Unreached",
                                    content: "In its first major step, eStar launched a nationwide mapping system to identify unreached communities. Thousands of villages without any Christian presence were discovered. This groundwork provided the direction and urgency that fueled the mission forward."
                                },
                                {
                                    year: "2019",
                                    title: "The Vision Begins",
                                    content: "A small group of believers united around one life-changing question: 'What if every village in Thailand could hear the Gospel?' Out of this vision, eStar Foundation was founded. The early focus was clear—map the unreached, equip local leaders, and send workers to carry the light of Christ."
                                }
                            ].map((item, index) => (
                                <div key={index} className="relative group">
                                    {/* Year Bubble */}
                                    <div className={`absolute left-1/2 transform -translate-x-1/2 -top-12 md:top-1/2 md:-translate-y-1/2 z-20 transition-transform duration-500 group-hover:scale-110 reveal-on-scroll scale-in ${historyVisible ? 'is-visible' : ''}`} style={{ transitionDelay: `${index * 50}ms` }}>
                                        <div className="w-16 h-16 rounded-full bg-[#747474] border-4 border-black shadow-[0_0_20px_rgba(116,116,116,0.3)] flex items-center justify-center">
                                            <span className="text-white font-bold text-lg">{item.year}</span>
                                        </div>
                                    </div>

                                    {/* Content Card */}
                                    <div className={`flex flex-col md:flex-row items-center w-full ${index % 2 === 0 ? 'md:justify-start' : 'md:justify-end'}`}>
                                        <div className={`w-full md:w-[42%] bg-white rounded-[32px] p-8 md:p-10 shadow-2xl mt-8 md:mt-0 reveal-on-scroll ${index % 2 === 0 ? 'fade-up' : 'fade-up'} ${historyVisible ? 'is-visible' : ''} relative`} style={{ transitionDelay: `${index * 100 + 100}ms` }}>
                                            {/* Pointer Triangle */}
                                            <div className={`absolute top-1/2 -translate-y-1/2 hidden md:block w-0 h-0 border-t-[10px] border-t-transparent border-b-[10px] border-b-transparent ${index % 2 === 0 ? '-right-4 border-l-[16px] border-l-white' : '-left-4 border-r-[16px] border-r-white'}`} />
                                            
                                            <h3 className="text-xl md:text-2xl font-black text-[#747474] mb-4 tracking-tight leading-tight uppercase italic">
                                                {item.title}
                                            </h3>
                                            <p className="text-sm md:text-base text-gray-700 leading-relaxed font-normal">
                                                {item.content}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </Container>
            </section>

            {/* Our Impact Section */}
            <section ref={impactRef} className="bg-[#747474] py-32 overflow-hidden relative border-t border-white/5">
                <Container className="relative z-10">
                    <div className={`text-center mb-16 reveal-on-scroll fade-up ${impactVisible ? 'is-visible' : ''}`}>
                        <h2 className="heading-1 text-white mb-6">Our Impact</h2>
                        <p className="paragraph max-w-2xl mx-auto text-white/90">
                            Behind each number is a life touched, a family changed, a village transformed. 
                            These stories remind us that the vision is not only possible — it is already happening.
                        </p>
                    </div>

                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 max-w-5xl mx-auto">
                        {[
                            { icon: Church, label: "Churches Planted", value: "660" },
                            { icon: UserRound, label: "Souls Saved", value: "58,446" },
                            { icon: MapPin, label: "Villages Reached", value: "26,284" },
                            { icon: Scroll, label: "Missions Raised", value: "$660,403" }
                        ].map((stat, i) => (
                            <div key={i} className={`flex flex-col items-center text-center reveal-on-scroll scale-in ${impactVisible ? 'is-visible' : ''}`} style={{ transitionDelay: `${i * 100 + 200}ms` }}>
                                <div className="w-20 h-20 rounded-full bg-white flex items-center justify-center mb-6 shadow-xl">
                                    <stat.icon className="w-10 h-10 text-[#747474]" />
                                </div>
                                <span className="text-3xl md:text-4xl font-black text-white mb-2 tracking-tight">
                                    {stat.value}
                                </span>
                                <span className="text-[10px] font-black text-white/80 uppercase tracking-[0.2em]">{stat.label}</span>
                            </div>
                        ))}
                    </div>
                </Container>
            </section>

            {/* Our Team Section */}
            <section ref={teamRef} className="bg-black py-32 overflow-hidden relative">
                <Container className="relative z-10">
                    <div className={`text-center mb-20 reveal-on-scroll fade-up ${teamVisible ? 'is-visible' : ''}`}>
                        <h2 className="heading-1 text-white mb-8">Our Team</h2>
                        <div className="max-w-3xl mx-auto border-2 border-dashed border-white/10 p-8 rounded-2xl">
                            <p className="paragraph text-lg text-white/60 italic leading-relaxed">
                                The strength of eStar lies in its people — pastors, missionaries, strategists, and global partners 
                                who share one vision: to see every village reached with the Gospel. Though our team serves in 
                                different roles, we are united in one calling: to finish the task together.
                            </p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
                        {Array.from({ length: 4 }).map((_, i) => (
                            <div key={i} className={`flex flex-col rounded-[32px] overflow-hidden bg-[#747474]/10 reveal-on-scroll scale-in ${teamVisible ? 'is-visible' : ''}`} style={{ transitionDelay: `${i * 100}ms` }}>
                                <div className="relative aspect-[1/1] bg-[#d1d5db] flex items-center justify-center p-8">
                                    <div className="w-full h-full relative opacity-40">
                                        <UserRound className="w-full h-full text-[#4b5563]" strokeWidth={1} />
                                    </div>
                                </div>
                                <div className="bg-[#747474] p-6 text-center">
                                    <h4 className="text-xl font-bold text-white tracking-tight leading-tight">Name Surname</h4>
                                    <p className="text-sm font-medium text-white/70 mt-1 uppercase tracking-wide">Board Member</p>
                                </div>
                            </div>
                        ))}
                    </div>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-4xl mx-auto">
                        {Array.from({ length: 3 }).map((_, i) => (
                            <div key={i} className={`flex flex-col rounded-[32px] overflow-hidden bg-[#747474]/10 reveal-on-scroll scale-in ${teamVisible ? 'is-visible' : ''}`} style={{ transitionDelay: `${(i + 4) * 100}ms` }}>
                                <div className="relative aspect-[1/1] bg-[#d1d5db] flex items-center justify-center p-8">
                                    <div className="w-full h-full relative opacity-40">
                                        <UserRound className="w-full h-full text-[#4b5563]" strokeWidth={1} />
                                    </div>
                                </div>
                                <div className="bg-[#747474] p-6 text-center">
                                    <h4 className="text-xl font-bold text-white tracking-tight leading-tight">Name Surname</h4>
                                    <p className="text-sm font-medium text-white/70 mt-1 uppercase tracking-wide">Board Member</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </Container>
            </section>
            {/* Our Accolades Section */}
            <section ref={accoladesRef} className="bg-[#747474] py-24 overflow-hidden relative border-t border-white/10">
                <Container className="relative z-10">
                    <div className={`text-center mb-16 reveal-on-scroll fade-up ${accoladesVisible ? 'is-visible' : ''}`}>
                        <h2 className="heading-1 text-white mb-6">Our Accolades</h2>
                        <p className="paragraph max-w-3xl mx-auto text-white/80">
                            Through God&apos;s grace, eStar&apos;s work has been recognized by mission networks and church partners 
                            worldwide. From pioneering village mapping systems to training leaders and planting churches, 
                            each milestone serves as a testimony of lives transformed and the ongoing mission to reach every village.
                        </p>
                    </div>

                    <div className={`flex flex-col md:flex-row justify-center items-center gap-12 lg:gap-24 opacity-70 grayscale invert brightness-0 reveal-on-scroll fade-up delay-200 ${accoladesVisible ? 'is-visible' : ''}`}>
                        {[acc1, acc2, acc3, acc4, acc5].map((icon, i) => (
                            <div key={i} className="relative h-10 w-32 md:h-16 md:w-48 shrink-0">
                                <Image 
                                    src={icon} 
                                    alt={`Accolade ${i + 1}`} 
                                    fill 
                                    className="object-contain"
                                />
                            </div>
                        ))}
                    </div>
                </Container>
            </section>

            {/* CTA Section */}
            <section ref={ctaRef} className="relative py-32 overflow-hidden">
                {/* Background Image with Overlay */}
                <div className="absolute inset-0 z-0">
                    <Image 
                        src={ctaImg} 
                        alt="Join the Movement" 
                        fill 
                        className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-[#747474]/80 to-[#747474]/40 z-10" />
                </div>

                <Container className="relative z-20 text-center">
                    <div className={`max-w-3xl mx-auto space-y-10 reveal-on-scroll fade-up ${ctaVisible ? 'is-visible' : ''}`}>
                        <div className="border-2 border-dashed border-white/20 p-8 rounded-3xl backdrop-blur-sm">
                            <h2 className="heading-1 text-white leading-tight">
                                Ready to keep making a difference?
                            </h2>
                        </div>
                        
                        <p className="paragraph text-xl text-white/90">
                            Together, we can reach the rest. Help us map, equip, 
                            and send the Church to the very edge of the harvest field.
                        </p>

                        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-4">
                            <button className="px-10 py-5 bg-white text-[#747474] font-black uppercase tracking-widest rounded-full hover:bg-gray-200 transition-all duration-300 shadow-xl scale-100 hover:scale-105">
                                Give Now
                            </button>
                            <button className="px-10 py-5 bg-black/40 border-2 border-white/20 text-white font-black uppercase tracking-widest rounded-full backdrop-blur-md hover:bg-white hover:text-black transition-all duration-300 scale-100 hover:scale-105">
                                Contact Us
                            </button>
                        </div>
                        
                        <div className="pt-6">
                            <a href="#" className="text-white/40 text-sm font-bold uppercase tracking-widest border-b border-white/20 pb-1 hover:text-white transition-colors">
                                Already gave? See your personal impact
                            </a>
                        </div>
                    </div>
                </Container>
            </section>
        </div>
    );
};

export default AboutUs;
