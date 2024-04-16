import Image from 'react-bootstrap/Image'




const ProfilePicture = ({image,size})=>{
    return(
        <div 
            style={{width:size,height:size}}
        className='d-flex align-items-center justify-content-center'>
            <Image 
                roundedCircle
                className="rounded-circle h-100 w-100" 
                src={image}
                style={{objectFit:'cover'}} />
        </div>)
}

export default ProfilePicture