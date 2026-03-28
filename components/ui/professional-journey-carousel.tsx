import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface JourneyItem {
    id: number;
    date: string;
    duration: string;
    company: string;
    role: string;
    description: string;
    logo?: string;
}

const journeyData: JourneyItem[] = [
    { id: 1, date: "Sep 2021 - Present", duration: "4 yrs 7 mos", company: "NICE Ltd", role: "Sr. Director of Engineering", description: "Leading WCX Engineering", logo: "logo1.png" },
    { id: 2, date: "May 2016 - Sep 2021", duration: "5 yrs 5 mos", company: "Capita Sims", role: "Head of Engineering", description: "Heading Education Software", logo: "logo2.png" },
    { id: 3, date: "Mar 2010 - May 2016", duration: "6 yrs 3 mos", company: "IBM", role: "Sr. Manager, Engineering", description: "Procurement Domain Engineering", logo: "logo3.png" },
    { id: 4, date: "Sep 2008 - Apr 2010", duration: "1 yr 8 mos", company: "Core Objects", role: "Competency Head", description: "Managing UI & Engineering", logo: "logo4.png" },
    { id: 5, date: "Dec 2005 - Aug 2008", duration: "2 yrs 9 mos", company: "Xpanxion", role: "Snr. Program Manager", description: "Strategic Projects Management", logo: "logo5.png" },
    { id: 6, date: "Mar 2002 - Dec 2005", duration: "3 yrs 10 mos", company: "Zensar Technologies", role: "Project Manager", description: "End-to-end Project Delivery", logo: "logo6.png" },
    { id: 7, date: "May 2001 - Mar 2002", duration: "11 mos", company: "AJILON NORTH AMERICA", role: "Consultant", description: "Web Portal Development", logo: "logo7.png" },
    { id: 8, date: "Jan 2000 - May 2001", duration: "1 yr 5 mos", company: "Diaspark Inc", role: "Consultant", description: "Java Software Engineering", logo: "logo8.png" }
];

const ProfessionalJourneyCarousel: React.FC = () => {
    const [currentIndex, setCurrentIndex] = useState(0); // Start with most recent focused
    const [containerWidth, setContainerWidth] = useState(0);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (containerRef.current) {
            setContainerWidth(containerRef.current.offsetWidth);
        }

        const handleResize = () => {
            if (containerRef.current) {
                setContainerWidth(containerRef.current.offsetWidth);
            }
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const handleNext = () => {
        setCurrentIndex((prev: number) => Math.min(prev + 1, journeyData.length - 1));
    };

    const handlePrev = () => {
        setCurrentIndex((prev: number) => Math.max(prev - 1, 0));
    };

    // Card width + Gap (Responsive)
    const isMobile = containerWidth < 640;
    const cardWidth = isMobile ? Math.min(containerWidth - 40, 300) : 350;
    const gap = isMobile ? 20 : 32;

    // Calculate how much to translate the track so the currentIndex card is centered
    // Translate = Center of Container - (Left offset of current card + Half card width)
    const translateAmount = (containerWidth / 2) - ((currentIndex * (cardWidth + gap)) + (cardWidth / 2));

    return (
        <div className="relative w-full pt-4 pb-16 overflow-hidden" ref={containerRef}>

            <div className="flex justify-between items-center mb-2 px-4">
                <div></div> {/* Spacer */}
                <div className="flex gap-4 z-20">
                    <button
                        onClick={handlePrev}
                        disabled={currentIndex === 0}
                        className="p-3 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-white transition-all disabled:opacity-30 disabled:cursor-not-allowed z-20"
                        aria-label="Previous role"
                    >
                        <ChevronLeft size={24} />
                    </button>
                    <button
                        onClick={handleNext}
                        disabled={currentIndex === journeyData.length - 1}
                        className="p-3 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-white transition-all disabled:opacity-30 disabled:cursor-not-allowed z-20"
                        aria-label="Next role"
                    >
                        <ChevronRight size={24} />
                    </button>
                </div>
            </div>

            <div className="relative h-[450px]">
                <motion.div
                    className="absolute flex items-center top-0 left-0 h-full"
                    animate={{ x: translateAmount }}
                    transition={{ type: "spring", stiffness: 200, damping: 25 }}
                    style={{ gap: `${gap}px` }}
                >
                    {journeyData.map((item, index) => {
                        const isCenter = index === currentIndex;
                        const isAdjacent = Math.abs(index - currentIndex) === 1;

                        return (
                            <motion.div
                                key={item.id}
                                className="relative rounded-2xl p-8 cursor-pointer border border-white/10 backdrop-blur-md"
                                animate={{
                                    scale: isCenter ? 1 : 0.85,
                                    opacity: isCenter ? 1 : (isAdjacent ? 0.3 : 0),
                                    backgroundColor: isCenter ? "rgba(255, 255, 255, 0.08)" : "rgba(255, 255, 255, 0.03)"
                                }}
                                transition={{ duration: 0.4 }}
                                onClick={() => setCurrentIndex(index)}
                                style={{
                                    width: `${cardWidth}px`,
                                    height: '380px',
                                    boxShadow: isCenter ? '0 25px 50px -12px rgba(0, 0, 0, 0.5)' : 'none'
                                }}
                            >
                                <div className="absolute top-0 right-0 w-32 h-32 bg-yellow-500/20 rounded-full blur-3xl -z-10"></div>

                                {item.logo && (
                                    <div className="h-10 mb-5 rounded-md flex items-center justify-start border border-white/5 bg-white/5 px-2 py-1 inline-block w-auto max-w-[50%]">
                                        <img src={item.logo} alt={item.company} className="max-h-full max-w-full object-contain" />
                                    </div>
                                )}

                                <div className="flex gap-2 mb-4 flex-wrap">
                                    <span className="inline-block px-3 py-1 text-xs rounded-full bg-amber-500/20 text-amber-300 font-bold tracking-wider uppercase border border-amber-500/30">
                                        {item.date}
                                    </span>
                                    <span className="inline-block px-3 py-1 text-xs rounded-full bg-white/10 text-gray-300 font-medium tracking-wider uppercase border border-white/20">
                                        {item.duration}
                                    </span>
                                </div>

                                <h4 className="text-xl text-white font-serif mb-1 leading-tight">
                                    {item.role}
                                </h4>
                                <h5 className="text-sm font-semibold text-amber-500 mb-4 uppercase tracking-wide">
                                    {item.company}
                                </h5>

                                <p className="text-gray-300 text-sm leading-relaxed">
                                    {item.description}
                                </p>

                                <div className={`absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-black/80 to-transparent pointer-events-none rounded-b-2xl transition-opacity duration-300 ${isCenter ? 'opacity-0' : 'opacity-100'}`}></div>
                            </motion.div>
                        );
                    })}
                </motion.div>
            </div>
        </div>
    );
};

export default ProfessionalJourneyCarousel;
