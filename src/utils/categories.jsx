import { LiaKeySolid } from "react-icons/lia";
import { IoPhonePortraitOutline } from "react-icons/io5";
import { RiPassportLine } from "react-icons/ri";
import { FaHeadphones } from "react-icons/fa6";
import { MdLaptopMac } from "react-icons/md";
import { FaPills } from "react-icons/fa";
import { IoBag } from "react-icons/io5";
import { LuGlasses } from "react-icons/lu";
import { FaHatCowboy } from "react-icons/fa6";
import { IoMdUmbrella } from "react-icons/io";
import { PiDotsThreeCircle } from "react-icons/pi";

import cities from './ua.json'


export const cityOptions = cities.map(city => {
    return {
        value: city.city,
        label: city.city
    }
 })

export const categoryOptions = [
    { value: 'keys', label: <div style={{display:"flex", alignItems:"center", justifyContent:"space-between"}}>Keys <LiaKeySolid/></div> },
    { value: 'phone', label: <div style={{display:"flex", alignItems:"center", justifyContent:"space-between"}}>Phone <IoPhonePortraitOutline/></div> },
    { value: 'document', label: <div style={{display:"flex", alignItems:"center", justifyContent:"space-between"}}>Document <RiPassportLine/></div> },
    { value: 'headphones', label: <div style={{display:"flex", alignItems:"center", justifyContent:"space-between"}}>Headphones <FaHeadphones/></div> },
    { value: 'laptop', label: <div style={{display:"flex", alignItems:"center", justifyContent:"space-between"}}>Laptop <MdLaptopMac/></div> },
    { value: 'meds', label: <div style={{display:"flex", alignItems:"center", justifyContent:"space-between"}}>Meds <FaPills/></div> },
    { value: 'bag', label: <div style={{display:"flex", alignItems:"center", justifyContent:"space-between"}}>Bag <IoBag/></div> },
    { value: 'glasses', label: <div style={{display:"flex", alignItems:"center", justifyContent:"space-between"}}>Glasses <LuGlasses/></div> },
    { value: 'hat', label: <div style={{display:"flex", alignItems:"center", justifyContent:"space-between"}}>Hat <FaHatCowboy/></div> },
    { value: 'umbrella', label: <div style={{display:"flex", alignItems:"center", justifyContent:"space-between"}}>Umbrella <IoMdUmbrella/></div> },
    { value: 'others', label: <div style={{display:"flex", alignItems:"center", justifyContent:"space-between"}}>Others <PiDotsThreeCircle/></div> },
  ];