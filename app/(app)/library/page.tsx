'use client'

import { useMemo, useState } from 'react'
import { motion } from 'framer-motion';
import { GalleryHorizontal, Image as ImageIcon, Video as VideoIcon } from 'lucide-react';

// Types and mock data
import { Album, VideoEmbed, View } from '@/types/interface/library'
import { assets, sampleAlbums, videoEmbeds } from './data/mock-data'

// Static media statistics (placeholder values, matching ContactSection's static nature)
const mediaStats = [
  {
    icon: ImageIcon,
    title: 'Tổng số ảnh',
    content: '1500+', // Placeholder
    color: 'from-[#33B54A] to-[#2EA043]',
  },
  {
    icon: VideoIcon,
    title: 'Tổng số video',
    content: '500+', // Placeholder
    color: 'from-[#F78F1E] to-[#E67E17]',
  },
  {
    icon: GalleryHorizontal,
    title: 'Tổng số album',
    content: '150+', // Placeholder
    color: 'from-[#33B54A] to-[#2EA043]', // Alternating color
  },
];


// Components
import { Hero } from './components/Hero'
import { ViewSwitcher } from './components/ViewSwitcher'
import { MediaGrid } from './components/MediaGrid'
import { ImageCard } from './components/ImageCard'
import { VideoCard } from './components/VideoCard'
import { AlbumCard } from './components/AlbumCard'
import { VideoPlayer } from './components/VideoPlayer'
import { ImageLightbox } from './components/ImageLightbox'
import { AlbumDetailModal } from './components/AlbumDetailModal'

type Playlist = { videos: VideoEmbed[]; startIndex: number };

const LibraryPage = () => {
    // --- STATE MANAGEMENT ---
    const [view, setView] = useState<View>('images');
    
    // State for top-level lightboxes and players
    const [imageIndex, setImageIndex] = useState(-1);
    const [activePlaylist, setActivePlaylist] = useState<Playlist | null>(null);
    
    // State for the album detail modal
    const [selectedAlbum, setSelectedAlbum] = useState<Album | null>(null);

    // --- MEMOIZED DATA FOR LIGHTBOXES ---
    const allImageSlides = useMemo(() => assets.map(asset => ({ src: asset.src })), []);

    // --- EVENT HANDLERS ---
    const openVideoPlayer = (videos: VideoEmbed[], startIndex: number) => {
        setActivePlaylist({ videos, startIndex });
    };

    const handleOpenAlbum = (album: Album) => {
        setSelectedAlbum(album);
    };

    const renderContent = () => {
        switch (view) {
            case 'images':
                return (
                    <MediaGrid
                        view="images"
                        items={assets}
                        renderItem={(asset, index) => (
                            <ImageCard 
                                key={asset.id} 
                                asset={asset} 
                                index={index} 
                                onClick={() => setImageIndex(index)} 
                            />
                        )}
                    />
                );
            case 'videos':
                return (
                    <MediaGrid
                        view="videos"
                        items={videoEmbeds}
                        renderItem={(video, index) => (
                           <VideoCard 
                                key={video.id} 
                                video={video} 
                                index={index} 
                                onClick={() => openVideoPlayer(videoEmbeds, index)} 
                           />
                        )}
                    />
                );
            case 'albums':
                return (
                    <MediaGrid
                        view="albums"
                        items={sampleAlbums.filter(a => a.status === 'published')}
                        renderItem={(album) => (
                            <AlbumCard 
                                key={album.id}
                                album={album}
                                index={0} // Index not used for album animation here
                                onClick={() => handleOpenAlbum(album)}
                            />
                        )}
                    />
                );
            default:
                return null;
        }
    }

    return (
        <div className='bg-white text-gray-800 antialiased'>
            <Hero assets={assets} />

            {/* Statistics Section */}
            <section className='relative -mt-16 z-20'>
                <div className='container mx-auto px-4'>
                    <div className='grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-3'>
                        {mediaStats.map((stat, index) => {
                            const IconComponent = stat.icon;
                            return (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.1 }}
                                    whileHover={{ y: -8, scale: 1.02 }}
                                    className='group relative overflow-hidden rounded-2xl bg-white p-6 shadow-xl ring-1 ring-gray-200/50 transition-all hover:shadow-2xl'
                                >
                                    <div className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-0 transition-opacity group-hover:opacity-5`} />
                                    <div className='relative z-10 text-center'>
                                        <motion.div
                                            whileHover={{ rotate: 360 }}
                                            transition={{ duration: 0.6 }}
                                            className={`mb-3 inline-flex items-center justify-center rounded-xl bg-gradient-to-br ${stat.color} p-3 shadow-lg`}
                                        >
                                            <IconComponent className='h-6 w-6 text-white' />
                                        </motion.div>
                                        <div className='mb-1 text-3xl font-black text-gray-900 md:text-4xl'>
                                            {stat.content}
                                        </div>
                                        <div className='text-xs font-semibold text-gray-600 md:text-sm'>
                                            {stat.title}
                                        </div>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </div>
                </div>
            </section>

            <main className='relative bg-white py-20 md:py-28'>
                <div className='container mx-auto px-4'>
                    <ViewSwitcher view={view} setView={setView} />
                    {renderContent()}
                </div>
            </main>

            {/* Lightbox and Video Player for the main page (Images and Videos tabs) */}
            <ImageLightbox 
                slides={allImageSlides}
                open={imageIndex > -1}
                close={() => setImageIndex(-1)}
                index={imageIndex}
            />
            <VideoPlayer playlist={activePlaylist} onClose={() => setActivePlaylist(null)} />

            {/* The new modal for displaying the contents of a single album */}
            <AlbumDetailModal album={selectedAlbum} onClose={() => setSelectedAlbum(null)} />
        </div>
    )
}

export default LibraryPage;