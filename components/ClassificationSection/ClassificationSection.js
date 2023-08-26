'use client'

import React, { useState } from 'react'
import '../../styles/ClassificationSection.css'
import { Box, Button, Typography } from '@mui/material'
import Image from 'next/image'

export default function ClassificationSection() {
    const [image, setImage] = useState("/assets/simple.png");

    const handleImageUpload = (event) => {
        const uploadedImage = event.target.files[0];
        setImage(URL.createObjectURL(uploadedImage));
    };


    const classify = ()=>{
        
    }











    return (
        <Box className='section center'>
            <Box sx={{height:'auto',width:'400px',position:'relative',textAlign:'center'}}>
                <Button className='uploadBtn' component="label">
                    <input onChange={handleImageUpload} hidden accept="image/*" multiple type="file" />
                    **Click on the Image for new selection**
                </Button>
                <Image
                    className='image'
                    src={image}
                    width={0}
                    height={0}
                    sizes="50vw"
                />
                <Button className='classifyBtn'> Classify </Button>
            </Box>
        </Box>
  )
}
