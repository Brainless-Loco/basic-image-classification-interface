'use client'

import React, { useEffect, useState } from 'react'
import '../../styles/ClassificationSection.css'
import Box  from '@mui/material/Box'

import Button from '@mui/material/Button'
import Image from 'next/image'

import axios from 'axios';


import { CircularProgress, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField, Typography } from '@mui/material'


export default function ClassificationSection() {
    const [image, setImage] = useState("/assets/simple.png");

    const [preditionResult, setpreditionResult] = useState('')
    
    const [loading, setloading] = useState(false)
    const [modalVisible, setmodalVisible] = useState(false)

    const [imageLink, setimageLink] = useState('')

    
    const handleImageUpload = async (event) => {
        setpreditionResult('')
        const uploadedImage = event.target.files[0];
        setImage(URL.createObjectURL(uploadedImage));
    };

    // 0d83d1de24f75ad4f0483a0dbd3e901a

    const uploadImgToFirebase= async () =>{

        if(image== '/assets/simple.png') return;
        const storageUrl = 'sudokuforever-b9936.appspot.com';
        
        const fileName = `classify.jpg`;
        try {
            const response = await fetch(
              'https://firebasestorage.googleapis.com/v0/b/'+storageUrl+'/o?name='+fileName,
              {
                method: 'POST',
                headers: {
                  'Content-Type': 'image/jpeg' || 'image/png' || 'image/jpg',
                },
                body: await fetch(image).then((response) => response.blob()),
              }
             );
             setimageLink('https://firebasestorage.googleapis.com/v0/b/sudokuforever-b9936.appspot.com/o/classify.jpg?alt=media&token=6eeb4abc-fac5-4852-8fee-e3519c0dbd82')

            } 
            catch (error) {
                console.error('Error uploading image:', error);
            }
            
            
        }
        // console.log(imageLink)

    const classify = async ()=>{
        if(imageLink=='' && image=='/assets/simple.png') return;
        setloading(true);
        setpreditionResult('');
        setmodalVisible(true);
        const imgData = {
            url: imageLink
        }

        // console.log(imgData.url)

        // 'https://loco-teachable-server-pkj7.vercel.app/classification'

        const apiEndpoint = 'https://loco-teachable-server-pkj7.vercel.app/classification'

        await fetch(apiEndpoint ,{
                method:"POST",
                headers:{
                    'content-Type': 'application/json',
                    'accept': 'application/json'
                },
                body:JSON.stringify(imgData)
            })
            .then((res)=>
                res.json()
            )
            .then((data)=>{
            // console.log(data[0].class)
            setpreditionResult(data[0].class)
        })
        setloading(false)
    }

    useEffect(() => {
        if(image!= '/assets/simple.png'){
            uploadImgToFirebase()
        }
    }, [image])
    
    



    return (
        <Box className='section center'>
            <Box sx={{height:'auto',width:'400px',position:'relative',textAlign:'center'}}>
                <Button disabled className='uploadBtn' component="label">
                    <input onChange={handleImageUpload} hidden accept="image/*" multiple type="file" />
                    {/* **Click on the Image for new selection** */}
                </Button>
                <Image
                    className='image'
                    src={imageLink!=''?imageLink:image}
                    width={0}
                    height={0}
                    sizes="50vw"
                    alt='Image to be classified'
                />
                <Box>

                <TextField
                        label="Or Paste an Image Link"
                        variant="outlined"
                        value={imageLink}
                        onChange={(e) => {setimageLink(e.target.value); setpreditionResult('');}}
                        fullWidth
                        autoComplete="off"
                        sx={{marginTop:'20px'}}
                        inputProps={{ style: { fontSize: 15 } }}
                        InputLabelProps={{ style: { fontSize: 15, color: "GrayText" } }}
                    />
                </Box>
                <Button onClick={classify} className='classifyBtn'> Classify </Button>
            </Box>

            <Dialog
                open={modalVisible}
                onClose={()=>{setmodalVisible(false)}}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                fullWidth={'xl'}
            >
                    <DialogTitle sx={{color:'#1d274f',fontWeight:'600'}} id="alert-dialog-title">
                            {"Classification Result"}
                    </DialogTitle>
                    {
                        preditionResult!='potato' && preditionResult!='tomato'&& loading &&
                        <DialogContent sx={{display:'flex',flexDirection:'column',justifyContent:'center',alignItems:'center'}}>
                            <Box sx={{width:'100%',textAlign:'center'}}>
                                <CircularProgress size={70} sx={{color:'#1d274f',width:'100%',}}/>

                            </Box>
                            <Box sx={{width:'100%',textAlign:'center',marginTop:'10px'}}>
                                <Typography sx={{color:'#1d274f',fontWeight:'bold'}}>
                                    Classifying
                                </Typography>
                            </Box>
                        </DialogContent>
                        }
                        <DialogContent hidden={preditionResult==''}>
                            <DialogContentText id="alert-dialog-description" sx={{fontSize:'25px',color:'grey',textAlign:'center'}}>
                                This is a
                                {preditionResult =='potato'?
                                    <Typography sx={{color:'#cf4c00',fontWeight:'bold',display:'inline-block',fontSize:'25px'}}>&nbsp;Potato&nbsp;</Typography>
                                    :
                                    <Typography sx={{color:'#fc1100',fontWeight:'bold',display:'inline-block',fontSize:'25px'}}>&nbsp;Tomato&nbsp;</Typography>
                                }.
                            </DialogContentText>
                        </DialogContent>
                        
                        <DialogActions>
                            <Button sx={{fontWeight:'bold',border:'1px solid #1d274f',color:'#1d274f'}} onClick={()=>{setmodalVisible(false)}}>Close</Button>
                        </DialogActions>
            </Dialog>
        </Box>
  )
}
