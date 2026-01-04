import React from 'react'
import Link from 'next/link'
import { ChevronRight } from 'lucide-react'

const Breadcrumb = () => {
  return (
    <nav className='container mx-auto bg-white px-4 py-5'>
      <ol className='flex items-center space-x-2 text-sm text-gray-500'>
        <li>
          <Link href='/' className='transition-colors hover:text-primary'>
            Trang chủ
          </Link>
        </li>
        <li>
          <ChevronRight className='size-4' />
        </li>
        <li>
          {/* Assuming a parent page exists, otherwise this can be text */}
          <span className='font-medium text-gray-500'>Giới thiệu</span>
        </li>
        <li>
          <ChevronRight className='size-4' />
        </li>
        <li className='font-medium text-primary'>Sứ mệnh & Tầm nhìn</li>
      </ol>
    </nav>
  )
}

const MissionAndVisonPage = () => {
  return (
    <div className='bg-white text-gray-800'>
      <Breadcrumb />
      {/* Hero Section */}
      <section className='flex-1 bg-green-50 pb-20 pt-12'>
        <div className='container mx-auto px-4'>
          <h1 className='mb-4 text-center text-4xl font-bold text-green-800 md:text-3xl'>
            Sứ mệnh
          </h1>
          <p className='text-black-700 max-w-8xl mx-auto text-justify text-lg leading-relaxed md:text-base'>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quidem quasi velit voluptatibus
            earum tenetur tempora, sunt cupiditate nobis, eveniet non voluptas in perferendis optio
            laudantium sequi, magni eos quae nesciunt!
          </p>
        </div>
      </section>
      <section className='flex-1 bg-green-50 pb-20 pt-12'>
        <div className='container mx-auto px-4'>
          <h1 className='mb-4 text-center text-4xl font-bold text-green-800 md:text-3xl'>
            Tầm Nhìn
          </h1>
          <p className='text-black-700 max-w-8xl mx-auto text-justify text-lg leading-relaxed md:text-base'>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Error at autem labore pariatur
            dolorum quidem laborum ex iure minus incidunt neque, deserunt mollitia, aut distinctio
            porro beatae praesentium dignissimos cum?e
          </p>
        </div>
      </section>
      <section className='flex-1 bg-green-50 pb-20 pt-12'>
        <div className='container mx-auto px-4'>
          <h1 className='mb-4 text-center text-4xl font-bold text-green-800 md:text-3xl'>
            Triết Lý
          </h1>
          <p className='text-black-700 max-w-8xl mx-auto text-justify text-lg leading-relaxed md:text-base'>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempora dignissimos optio fuga
            ipsum vel quos similique explicabo tenetur odio modi, a aspernatur harum, reprehenderit
            deleniti suscipit magnam rerum perferendis non.
          </p>
        </div>
      </section>
    </div>
  )
}

export default MissionAndVisonPage
