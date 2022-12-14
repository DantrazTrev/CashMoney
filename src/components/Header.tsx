import React from 'react'
import './Header.css'
interface Props {
    text: string
}
function Header(props: Props) {
    return (
        <div className='header' >{props.text}</div>
    )
}

export default Header