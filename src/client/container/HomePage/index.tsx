import React from 'react'
import dynamic from 'next/dynamic'

const ImageContainer = dynamic(
    () => import('@/components/ImageContainer/index'),
    { ssr: false }
)

import './style.less'

const HomePage: React.FC<any> = () => {

    return (
        <section className='homePage'>
            <ImageContainer />
        </section>
    )

}

export default HomePage
