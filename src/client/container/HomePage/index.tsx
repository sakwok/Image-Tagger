import React from 'react'
import dynamic from 'next/dynamic'
import { useSelector } from 'react-redux'

import { currSetIdSelector } from '@/redux/selector/images/index'

const ImageContainer = dynamic(
    () => import('@/components/ImageContainer/index'),
    { ssr: false }
)

import './style.less'

const HomePage: React.FC<any> = () => {
    const currentDataSet = useSelector(currSetIdSelector)
    return (
        <section className='homePage'>
            {
                currentDataSet ?
                    <ImageContainer />
                    :
                    <div className="select-a-set">Please select a data set</div>
            }
        </section>
    )

}

export default HomePage
