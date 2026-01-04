'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import { newsData } from '@/app/news/mock';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import type { News } from '@/types/news';

const Breadcrumb = ({newsTitle} : {newsTitle : string}) => {
    return (
      <nav className="container mx-auto px-4 py-5">
        <ol className="flex items-center space-x-2 text-sm text-gray-500">
          <li>
            <Link href="/" className="hover:text-primary transition-colors">
              Trang chủ
            </Link>
          </li>
          <li>
            <ChevronRight className="w-4 h-4" />
          </li>
          <li>
            <Link href="/news" className="hover:text-primary transition-colors">
              Tin tức
            </Link>
          </li>
          <li>
            <ChevronRight className="w-4 h-4" />
          </li>
          <li className="font-medium text-gray-500 truncate" style={{maxWidth: '200px'}}>
            {newsTitle}
          </li>
        </ol>
      </nav>
    );
};

const NewsDetailPage = () => {
    const params = useParams();
    const { slug } = params;

    const newsItem: News | undefined = newsData.find((item) => item.slug === slug);

    if (!newsItem) {
        return (
            <div className="container mx-auto px-4 py-8 text-center">
                <p className="text-red-500 text-lg">Tin tức không tồn tại.</p>
                <Link href="/news" className="text-blue-500 hover:underline mt-4 inline-block">
                    <ChevronLeft className="w-4 h-4 inline-block" />
                     Quay lại trang tin tức
                </Link>
            </div>
        );
    }

    const { title, date, author, content, thumbnail } = newsItem;

    // Get 5 latest news excluding the current one
    const latestNews = newsData
        .filter(item => item.slug !== slug)
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
        .slice(0, 5);

    return (
        <div className="bg-white">
            <Breadcrumb newsTitle={title} />
            <div className="container mx-auto px-4 py-8">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                    <div className="lg:col-span-2">
                        <article>
                            <header className="mb-8">
                                <h1 className="text-3xl lg:text-4xl font-bold text-gray-800 mb-2">{title}</h1>
                                <div className="flex items-center text-sm text-gray-500">
                                    <span>Đăng bởi {author}</span>
                                    <span className="mx-2">|</span>
                                    <span>{date}</span>
                                </div>
                            </header>

                            <div className="flex justify-center mb-8">
                                <Image src={thumbnail} alt={title} width={1200} height={600} className="rounded-lg object-cover" />
                            </div>

                            <div 
                                className="prose lg:prose-xl max-w-none"
                                dangerouslySetInnerHTML={{ __html: content }} 
                            />
                        </article>
                    </div>

                    <aside>
                        <div className="sticky top-24">
                            <h3 className="text-2xl font-bold text-gray-800 mb-6">Tin tức mới nhất</h3>
                            <ul className="space-y-6">
                                {latestNews.map(item => (
                                    <li key={item.id}>
                                        <Link href={`/news/detail/${item.slug}`}>
                                            <div className="flex items-start space-x-4 group">
                                                <div className="flex-shrink-0">
                                                    <Image src={item.thumbnail} alt={item.title} width={80} height={80} className="rounded-lg object-cover" />
                                                </div>
                                                <div className="flex-1">
                                                    <h4 className="text-base font-semibold text-gray-800 group-hover:text-primary transition-colors line-clamp-2">
                                                        {item.title}
                                                    </h4>
                                                    <p className="text-sm text-gray-500 mt-1">{item.date}</p>
                                                </div>
                                            </div>
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
            </aside>
                </div>
            </div>
        </div>
    );
};

export default NewsDetailPage;