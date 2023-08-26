'use client'

import React, { useState } from 'react'
import '../../styles/ClassificationSection.css'
import Box  from '@mui/material/Box'

import Button from '@mui/material/Button'
import Image from 'next/image'

import axios from 'axios';

import * as tmImage from '@teachablemachine/image'


export default function ClassificationSection() {
    const [image, setImage] = useState("/assets/simple.png");

    const [preditionResult, setpreditionResult] = useState('')

    
    const baseURL = "https://teachablemachine.withgoogle.com/models/ZqbOTYYBL/";
    const modelUrl = baseURL + "model.json"
    const metaDataUrl = baseURL + "metadata.json"

    
    const handleImageUpload = (event) => {
        const uploadedImage = event.target.files[0];
        setImage(URL.createObjectURL(uploadedImage));
    };


    const classify = async ()=>{
//         const apiBaseUrl = '/api';

// // ...

//         const apiEndpoint = `${apiBaseUrl}/predict?imageUrl=${encodeURIComponent(image)}`;

//         // Make a request to the API endpoint
//         axios.get(apiEndpoint)
//         .then((response) => {
//             // Process the prediction response
//             const { prediction } = response.data;
//             console.log(response)
//             // ...
//         })
//         .catch((error) => {
//             console.error('Error:', error);
//         });

    const url = "https://teachablemachine.withgoogle.com/models/IerQIOPqD/";
    const modelUrl = url + "model.json"
    const metaDataUrl = url + "metadata.json"
    try {
        const model = await tmImage.load(modelUrl, metaDataUrl);
        const classCount = model.getTotalClasses();

        console.log(classCount)
        // ...rest of your code
      } catch (error) {
        console.error('Error:', error);
      }
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
                    alt='Image to be classified'
                />
                <Button onClick={classify} className='classifyBtn'> Classify </Button>
            </Box>
        </Box>
  )
}
