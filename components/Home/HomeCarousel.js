import { Carousel } from 'antd'
import Image from 'next/image'
import React from 'react'

const HomeCarousel = () => {
    return (
        <Carousel autoplay autoplaySpeed={3000}>
            <div>
                <Image alt="carousel" src="https://www.themoviedb.org/t/p/w1920_and_h800_multi_faces/Aa9TLpNpBMyRkD8sPJ7ACKLjt0l.jpg" layout="responsive" width={1920} height={800} />
            </div>
            <div>
                <Image alt="carousel" src="https://www.themoviedb.org/t/p/w1920_and_h800_multi_faces/pdfCr8W0wBCpdjbZXSxnKhZtosP.jpg" layout="responsive" width={1920} height={800} />
            </div>
            <div>
                <Image alt="carousel" src="https://www.themoviedb.org/t/p/w1920_and_h800_multi_faces/14QbnygCuTO0vl7CAFmPf1fgZfV.jpg" layout="responsive" width={1920} height={800} />
            </div>
        </Carousel>
    )
}

export default HomeCarousel