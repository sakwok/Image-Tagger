import React from 'react'

interface Props {
    /**
     * Header title
     */
    title: string
    /**
     * Header style
     */
    style?: object
}

export default (props: Props) => (
    <div style={props.style}>{ props.title }</div>
)
