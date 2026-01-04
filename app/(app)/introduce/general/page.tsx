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
        <li className='font-medium text-primary'>Giới thiệu chung</li>
      </ol>
    </nav>
  )
}

const GeneralPage = () => {
  return (
    <div className='bg-white text-gray-800'>
      <Breadcrumb />
      {/* Hero Section */}
      <section className='flex-1 bg-green-50 pb-20 pt-12'>
        <div className='container mx-auto px-4'>
          <h1 className='mb-4 text-center text-4xl font-bold text-green-800 md:text-5xl'>
            Chào mừng đến với Trúc Xinh
          </h1>
          <p className='text-black-700 mx-auto max-w-5xl text-justify text-lg leading-relaxed md:text-xl'>
            25 năm là mốc thời gian của sự hình thành và phát triển của trường Mầm non Hồng Nhung.
            Thành lập ngày 1/6/1997 trường đã tìm cho mình hướng đi thích hợp và phát triển với
            những bước tiến vững chắc, theo phương châm “Đa dạng hóa, chuẩn hóa, hiện đại hóa, xã
            hội hóa” đã góp phần đắc lực thực hiện các mục tiêu, chiến lược phát triển kinh tế-xã
            hội tại địa phương và của Thành phố Đà Nẵng nói chung.
            <br />
            Đến với trường Hồng Nhung chúng ta thật sự bị cuốn hút bởi khuôn viên trường lớp thật
            vui tươi, đẹp mắt, được sắp xếp một cách khoa học. Với khuôn viên 3.100m2, tổng diện
            tích sử dụng 8.850m2, gồm có 20 phòng học và 20 phòng chức năng, cơ sở vật chất được
            trang bị đồng bộ hiện đại, đáp ứng thật hữu hiệu nhu cầu chăm sóc giáo dục trẻ toàn
            diện.
            <br />
            Với mô hình trường mầm non chất lượng cao trong thời kỳ đổi mới, một trong những thành
            công mà trường đạt được là đã xây dựng được một đội ngũ CB-GV-NV có phẩm chất đạo đức
            tốt, yêu nghề mến trẻ, tất cả đều đạt trình độ trên chuẩn, ngoài nghiệp vụ chuyên môn sư
            phạm mầm non toàn bộ giáo viên đều có trình độ cơ bản âm nhạc, ngoại ngữ, tin học, thành
            thạo trong việc ứng dụng CNTT vào dạy và học, quản lý trường học, đủ năng lực để tổ chức
            tốt hoạt động một ngày của bé tại trường. Trong những năm qua tỉ lệ chuyên cần của nhà
            trường đạt 99,2% trở lên, chất lượng chăm sóc giáo dục trẻ toàn diện đạt 98,62% trở lên,
            100% trẻ phát triển tốt, hài hòa về thể chất lẫn tinh thần, về kiến thức và kỹ năng.
            100% trẻ đạt kênh A, đặc biệt 100% trẻ khối mẫu giáo lớn phát triển toàn diện, tự tin
            vững bước vào môi trường tiểu học trong nước cũng như môi trường tiểu học Quốc tế.
            <br />
            Những kết quả đạt được của trường Mầm non Hồng Nhung cùng với truyền thống đoàn kết, nỗ
            lực vượt khó đi lên của toàn bộ đội ngũ sẽ là động lực quan trọng giúp trường tiến đến
            một tầm cao mới, chắc chắn sẽ củng cố thêm niềm tin của các bậc phụ huynh về một trường
            mầm non chất lượng cao của Thành phố Đà Nẵng, thành phố đô thị loại I.
            <br />
            Qua 25 năm phấn đấu và trưởng thành trường Mầm non Hồng Nhung đã nhận được nhiều khen
            thưởng cao quí, thật đáng trân trọng của các cấp lãnh đạo:
            <br />
            20 năm liền trường vinh dự được Bộ Giáo dục-Đào tạo, UBND Thành phố Đà nẵng tặng bằng
            khen đạt danh hiệu "Trường tiên tiến xuất sắc cấp thành phố".
            <br />
            Năm học 2004-2005 trường vinh dự được Bộ Giáo dục-Đào tạo công nhận trường mầm non thành
            thị "Đạt chuẩn Quốc gia".
            <br />
            Năm học 2006-2007 trường vinh dự được UBND Thành phố Đà Nẵng tặng "Cờ thi đua xuất sắc
            dẫn đầu bậc học mầm non".
            <br />
            Năm học 2009-2010 trường vinh dự được Thủ tướng Chính phủ tặng Bằng khen "Đã có nhiều
            thành tích trong công tác Giáo dục và Đào tạo góp phần vào sự nghiệp xây dựng Chủ nghĩa
            xã hội và Bảo vệ Tổ Quốc". Cùng trong năm học 2009-2010 trường được UBND Thành phố Đà
            Nẵng thẩm định và công nhận "Trường Mầm non Đạt chuẩn Quốc gia mức độ II".
            <br />
            Năm học 2010-2011 trường vinh dự được Chủ tịch nước tặng thưởng "Huân chương Lao động
            Hạng Ba".
            <br />
            Năm học 2012-2013 trường vinh dự được Chính phủ nước Cộng hòa xã hội chủ nghĩa Việt Nam
            tặng thưởng cờ thi đua xuất sắc "Đơn vị dẫn đầu phong trào thi đua".
            <br />
            Năm học 2012-2013 trường vinh dự được Bộ GD-ĐT tặng cờ thi đua "Đơn vị tiêu biểu xuất
            sắc trong công tác giáo dục-đào tạo".
            <br />
            Năm học 2014-2015 trường vinh dự được UBND Thành phố Đà Nẵng tặng "Cờ thi đua xuất sắc
            dẫn đầu bậc mầm non".
            <br />
            Năm học 2015-2016 trường vinh dự được UBND Thành phố Đà Nẵng tặng "Cờ thi đua xuất sắc
            dẫn đầu bậc mầm non".
            <br />
            Năm học 2016-2017 trường vinh dự được Chủ tịch nước tặng thưởng "Huân chương Lao động
            Hạng Nhì".
            <br />
            Năm học 2017-2018 trường được UBND Thành phố Đà Nẵng tặng "Cờ thi đua xuất sắc dẫn đầu
            bậc học mầm non".
            <br />
            Năm học 2018-2019 trường được UBND Thành phố Đà Nẵng tặng "Cờ thi đua xuất sắc dẫn đầu
            bậc học mầm non".
            <br />
            Năm học 2019-2020 trường vinh dự được Chính phủ nước Cộng hòa xã hội chủ nghĩa Việt Nam
            tặng thưởng cờ thi đua xuất sắc "Đơn vị dẫn đầu phong trào thi đua"..
            <br />
            Năm học 2022-2023 trường vinh dự được Chủ tịch nước tặng thưởng "Huân chương Lao động
            Hạng Nhất".
            <br />
            Qua 29 năm phấn đấu và trưởng thành trường Mầm non Hồng Nhung đã nhận được nhiều khen
            thưởng cao quí, thật đáng trân trọng của các cấp lãnh đạo:
            <br />
            Để phát huy những thành tích đạt được, trường mầm non Hồng Nhung sẽ tiếp tục phấn đấu
            hoàn thành xuất sắc nhiệm vụ của một trường trọng điểm, đưa trường tiên tiến đến một tầm
            cao mới, đáp ứng yêu cầu ngày càng cao của ngành học trong thời kỳ đổi mới và hội nhập
            cũng như phù hợp với sự phát triển nhanh của xã hội và luôn xứng đáng là “Lá cờ đầu” của
            bậc học mầm non Thành phố Đà Nẵng.
            <br />
          </p>
        </div>
      </section>
    </div>
  )
}

export default GeneralPage
