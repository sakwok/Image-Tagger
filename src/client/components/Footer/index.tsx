import React from 'react'

interface Props {
    /**
     * Footer title
     */
    title: string
    /**
     * Footer style
     */
    style?: object
}

export default (props: Props) => (
    <div style={props.style}></div>
)
