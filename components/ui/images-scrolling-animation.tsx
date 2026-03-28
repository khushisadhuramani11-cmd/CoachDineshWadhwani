"use client"

import ReactLenis from "lenis/react"
import { motion } from "framer-motion"

const approachSteps = [
    {
        number: "01",
        title: "Understand",
        description: "We immerse ourselves in your business to uncover challenges and opportunities.",
        icon: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-12 h-12">
                <path d="M12 2v4m0 12v4M4.93 4.93l2.83 2.83m8.48 8.48l2.83 2.83M2 12h4m12 0h4M4.93 19.07l2.83-2.83m8.48-8.48l2.83-2.83" strokeLinecap="round" />
                <circle cx="12" cy="12" r="3" />
            </svg>
        )
    },
    {
        number: "02",
        title: "Strategize",
        description: "We design tailored strategies that align with your goals and available resources.",
        icon: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-12 h-12">
                <path d="M3 3v18h18M7 17l4-4 4 4 6-6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
        )
    },
    {
        number: "03",
        title: "Implement",
        description: "We translate strategy into action, driving execution across teams with clear ownership and focus.",
        icon: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-12 h-12">
                <rect x="3" y="3" width="18" height="18" rx="2" strokeLinecap="round" />
                <path d="M3 9h18M9 21V9" strokeLinecap="round" />
            </svg>
        )
    },
    {
        number: "04",
        title: "Measure",
        description: "We establish data-driven feedback loops to monitor KPIs and ensure the strategy delivers tangible impact.",
        icon: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-12 h-12">
                <path d="M12 20a8 8 0 100-16 8 8 0 000 16z" strokeLinecap="round" />
                <path d="M12 6v6l4 2" strokeLinecap="round" />
            </svg>
        )
    },
]

const ApproachCard = ({
    number,
    title,
    description,
    icon,
}: {
    number: string
    title: string
    description: string
    icon: React.ReactNode
}) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="approach-card w-full"
        >
            <div className="rounded-[40px] relative flex flex-col overflow-hidden
                   bg-white shadow-xl
                   h-auto min-h-[300px] w-full p-12 transition-all duration-500 hover:shadow-2xl hover:-translate-y-1">
                <div className="text-[#4A607D] mb-8">
                    {icon}
                </div>
                <div className="flex justify-between items-start mb-6">
                    <h3 className="text-4xl font-medium text-[#2D3E50] font-serif">
                        {title}
                    </h3>
                    <span className="text-4xl font-medium text-[#2D3E50] font-serif opacity-80">
                        {number}
                    </span>
                </div>

                <p className="text-xl text-gray-600 leading-relaxed font-light">
                    {description}
                </p>
            </div>
        </motion.div>
    )
}

const ImagesScrollingAnimation = () => {
    return (
        <ReactLenis root>
            <div className="bg-[#947655] min-h-screen py-32">
                <div className="max-w-7xl mx-auto px-6 mb-24">
                    <div className="flex items-center gap-3 text-xs font-bold tracking-[0.2em] text-white/60 mb-8 uppercase">
                        <span className="w-2 h-2 rounded-full bg-white/60"></span>
                        Our Approach
                    </div>
                    <h2 className="text-4xl md:text-6xl font-medium text-white leading-tight max-w-5xl">
                        At Stratwell Consulting, we believe that <span className="italic">strategy</span> should do more than <span className="italic">sit on paper</span> — it should drive <span className="italic">measurable</span> change.
                    </h2>
                </div>

                <div className="max-w-7xl mx-auto px-6">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
                        <div className="sticky top-[25vh] hidden lg:block rounded-[40px] overflow-hidden h-[50vh]">
                            <img
                                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=1200&auto=format&fit=crop"
                                alt="Strategy Session"
                                className="w-full h-full object-cover"
                            />
                        </div>
                        <div className="flex flex-col gap-8">
                            {approachSteps.map((step, i) => (
                                <ApproachCard
                                    key={`step_${i}`}
                                    {...step}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </ReactLenis>
    )
}

export { ImagesScrollingAnimation }
