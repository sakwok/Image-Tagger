import React from 'react'
import dynamic from 'next/dynamic'
import { useSelector } from 'react-redux'

import { currSetIdSelector, currDataSetSelector } from '@/redux/selector/images/index'

const ImageContainer = dynamic(
    () => import('@/components/ImageContainer/index'),
    { ssr: false }
)

import './style.less'

const HomePage: React.FC<any> = () => {
    const currSetIdSet = useSelector(currSetIdSelector)
    const currDataSet = useSelector(currDataSetSelector)
    return (
        <section className='homePage'>
            {
                currSetIdSet ?
                    <ImageContainer currDataSet={currDataSet} currSetIdSet={currSetIdSet} />
                    :
                    <div className="select-a-set">Please select a data set</div>
            }
        </section>
    )

}

export default HomePage
