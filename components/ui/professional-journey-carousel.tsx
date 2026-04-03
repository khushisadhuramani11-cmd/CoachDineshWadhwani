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
    {
        id: 1,
        date: "Sep 2021 - Present",
        duration: "4 yrs 7 mos",
        company: "NICE Ltd",
        role: "Sr. Director of Engineering",
        description: "Leading the Workforce and Customer Experience (WCX) group of ~400 engineers in Pune. Responsible for product enhancements across 8 product lines, driving engineering deliveries, innovation, and operations with strong Agile practices.",
        logo: "/assets/logo1.png"
    },
    {
        id: 2,
        date: "May 2016 - Sep 2021",
        duration: "5 yrs 5 mos",
        company: "Capita Sims",
        role: "Head of Engineering",
        description: "Led the India engineering organization supporting Education Software Solutions (ESS UK), scaled the delivery team from 100 to 1200+ resources, and transitioned to a standalone organization after acquisition. Owned engineering operations, product delivery, and tech practices.",
        logo: "/assets/logo2.png"
    },
    {
        id: 3,
        date: "Mar 2010 - May 2016",
        duration: "6 yrs 3 mos",
        company: "IBM",
        role: "Sr. Manager, Engineering",
        description: "Managed end-to-end engineering for procurement domain software, built high-performing teams, and launched new initiatives to accelerate business growth with best-in-class delivery and Agile team culture.",
        logo: "/assets/logo3.png"
    },
    {
        id: 4,
        date: "Sep 2008 - Apr 2010",
        duration: "1 yr 8 mos",
        company: "Core Objects",
        role: "Competency Head / Engineering Manager",
        description: "Led UI competency for product suite and managed engineering delivery for Avery Dennison projects, establishing strong team coordination and software quality standards.",
        logo: "/assets/logo4.png"
    },
    {
        id: 5,
        date: "Dec 2005 - Aug 2008",
        duration: "2 yrs 9 mos",
        company: "Xpanxion",
        role: "Snr. Program Manager",
        description: "Managed strategic programs for Turner Broadcasting Atlanta, leading cross-functional teams and delivering complex projects on schedule.",
        logo: "/assets/logo5.png"
    },
    {
        id: 6,
        date: "Mar 2002 - Dec 2005",
        duration: "3 yrs 10 mos",
        company: "Zensar Technologies",
        role: "Project Manager",
        description: "Responsible for end-to-end project management and successful delivery for Zensar customers, driving process improvements and customer satisfaction.",
        logo: "/assets/logo6.png"
    },
    {
        id: 7,
        date: "May 2001 - Mar 2002",
        duration: "11 mos",
        company: "AJILON NORTH AMERICA",
        role: "Consultant",
        description: "Worked as technology consultant for Verizon web portal development, focusing on design and implementation of business-critical solutions.",
        logo: "/assets/logo7.png"
    },
    {
        id: 8,
        date: "Jan 2000 - May 2001",
        duration: "1 yr 5 mos",
        company: "Diaspark Inc",
        role: "Consultant",
        description: "Joined as Java consultant for Juniper Financials project in Delaware, delivering high-quality software development in a collaborative team.",
        logo: "/assets/logo8.png"
    }
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
    const isSmallMobile = containerWidth < 480;
    const cardWidth = isSmallMobile ? Math.min(containerWidth - 30, 280) : isMobile ? Math.min(containerWidth - 40, 300) : 350;
    const gap = isSmallMobile ? 16 : isMobile ? 20 : 32;

    // Calculate how much to translate the track so the currentIndex card is centered
    // Translate = Center of Container - (Left offset of current card + Half card width)
    const translateAmount = (containerWidth / 2) - ((currentIndex * (cardWidth + gap)) + (cardWidth / 2));

    const handleDragEnd = (e: any, { offset, velocity }: any) => {
        const swipePower = Math.abs(offset.x) * velocity.x;

        // If swiped far enough or fast enough to the left, go next
        if (offset.x < -50 || swipePower < -10000) {
            handleNext();
        } 
        // If swiped far enough or fast enough to the right, go previous
        else if (offset.x > 50 || swipePower > 10000) {
            handlePrev();
        }
    };

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

            <div className="relative h-[300px] sm:h-[340px] md:h-[380px] lg:h-[400px]">
                <motion.div
                    className="absolute flex items-center top-0 left-0 h-full cursor-grab active:cursor-grabbing"
                    animate={{ x: translateAmount }}
                    transition={{ type: "spring", stiffness: 200, damping: 25 }}
                    style={{ gap: `${gap}px` }}
                    drag="x"
                    dragConstraints={{ left: translateAmount, right: translateAmount }}
                    dragElastic={0.2}
                    onDragEnd={handleDragEnd}
                >
                    {journeyData.map((item, index) => {
                        const isCenter = index === currentIndex;
                        // Calculate opacity based on distance from center for a smoother fade
                        const distance = Math.abs(index - currentIndex);
                        let cardOpacity = 1;
                        if (distance === 1) cardOpacity = 0.5;
                        else if (distance > 1) cardOpacity = 0.2;

                        return (
                            <motion.div
                                key={item.id}
                                className="relative rounded-2xl p-8 border border-white/10 backdrop-blur-md shrink-0"
                                animate={{
                                    scale: isCenter ? 1 : 0.85,
                                    opacity: isCenter ? 1 : cardOpacity,
                                    backgroundColor: isCenter ? "rgba(255, 255, 255, 0.08)" : "rgba(255, 255, 255, 0.03)"
                                }}
                                transition={{ duration: 0.4 }}
                                onClick={() => setCurrentIndex(index)}
                                style={{
                                    width: `${cardWidth}px`,
                                    minHeight: '260px',
                                    maxHeight: '320px',
                                    height: 'auto',
                                    boxShadow: isCenter ? '0 20px 45px -10px rgba(0, 0, 0, 0.45)' : 'none'
                                }}
                            >
                                <div className="absolute top-0 right-0 w-32 h-32 bg-yellow-500/20 rounded-full blur-3xl -z-10"></div>

                                {item.logo && (
                                    <div className="h-8 sm:h-10 mb-6 rounded-md flex items-center justify-start border border-white/5 bg-white/5 px-2 py-1 inline-block w-auto max-w-[60%]">
                                        <img src={item.logo} alt={item.company} className="max-h-full max-w-full object-contain" />
                                    </div>
                                )}

                                <div className="flex gap-2 mb-4 flex-wrap items-center">
                                    <span className="text-xs sm:text-sm text-amber-200 font-bold tracking-wide uppercase">
                                        {item.date}
                                    </span>
                                    <span className="text-xs sm:text-sm text-gray-300 font-medium tracking-wide uppercase">
                                        {item.duration}
                                    </span>
                                </div>

                                <h4 className="text-lg sm:text-lg md:text-xl text-white font-serif mb-3 leading-tight">
                                    {item.role}
                                </h4>
                                <h5 className="text-xs sm:text-sm font-semibold text-amber-500 mb-3 uppercase tracking-wide">
                                    {item.company}
                                </h5>

                                <p className="text-gray-300 text-xs sm:text-sm leading-relaxed">
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
