export default async (req, res) => {
  // console.log(req.searchParams)
  // const { imageUrl } = req.searchParams; // Assuming the image URL is provided as a searchParams parameter

  const imgData = {
    url:'https://i.ibb.co/fSgQVTN/IMG-20230825-WA0005.jpg'
  }

  const apiEndpoint = 'https://loco-teachable-server-pkj7.vercel.app/classification'

  fetch(apiEndpoint
    ,{
    method:"POST",
    headers:{
        "content-type":"application/json",
    },
    body:JSON.stringify(imgData)
    }
    )
    .then((res)=>res.json())
    .then((data)=>{
      console.log("something: "+data)
    })
      
      
    // res.status(200).json({bolbo:'bolbo'});
};
