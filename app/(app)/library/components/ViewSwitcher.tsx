
'use client'

import { motion } from 'framer-motion'
import { Album, Camera, Video } from 'lucide-react'
import { View } from '@/types/interface/library'

interface ViewSwitcherProps {
    view: View;
    setView: (view: View) => void;
}

const tabs: { id: View; label: string; icon: React.ComponentType<any> }[] = [
    { id: 'images', label: 'Hình Ảnh', icon: Camera },
    { id: 'videos', label: 'Video', icon: Video },
    { id: 'albums', label: 'Album', icon: Album },
];

export const ViewSwitcher = ({ view, setView }: ViewSwitcherProps) => {
    return (
        <div className="mb-14 flex justify-center">
            <div className="relative flex items-center rounded-full bg-muted p-1 shadow-inner backdrop-blur-sm">
                {tabs.map((tab) => (
                    <button
                        key={tab.id}
                        onClick={() => setView(tab.id)}
                        className="relative z-10 rounded-full px-5 py-2 text-base font-semibold md:px-6 md:text-lg focus:outline-none"
                    >
                        {view === tab.id && (
                            <motion.div
                                layoutId="active-pill-gradient"
                                className="absolute inset-0 rounded-full bg-gradient-to-r from-gradient1-start to-gradient1-end shadow-md"
                                style={{ borderRadius: 9999 }}
                                transition={{ duration: 0.6, type: "spring", bounce: 0.25, stiffness: 150 }}
                            />
                        )}
                        <span className={`relative flex items-center transition-colors duration-500 font-black leading-tight ${view === tab.id ? 'text-white' : 'text-gray-700 hover:text-gray-900'}`}>
                            <tab.icon className="mr-1.5 inline-block size-5"/>
                            {tab.label}
                        </span>
                    </button>
                ))}
            </div>
        </div>
    )
}
