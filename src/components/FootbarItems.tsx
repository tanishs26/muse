import Link  from 'next/link';
import React from 'react';
import { IconType } from 'react-icons';
interface FootBarProps{
        icon:IconType,
        href:string,
        label?:string,
        active?:boolean
    }
const FootbarItems:React.FC<FootBarProps> = ({icon:Icon,href,active,label}) => {
    

    return (
       <Link href={href} className={` flex justify-center items-center w-[50px] h-[50px] ${active && '  bg-orange-600 rounded-full '}`} >

        <Icon size={26} className='text-white'/>

       </Link>
    );
}

export default FootbarItems;
