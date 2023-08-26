import axios from 'axios';
import * as tmImage from '@teachablemachine/image'

export default async (req, res) => {
  // console.log(req.searchParams)
  const { imageUrl } = req.searchParams; // Assuming the image URL is provided as a query parameter

  try {
    const modelUrl = 'https://teachablemachine.withgoogle.com/models/ZqbOTYYBL/model.json';
    const metaDataUrl = 'https://teachablemachine.withgoogle.com/models/ZqbOTYYBL/metadata.json';

    const model = await tmImage.load(modelUrl, metaDataUrl);
    console.log(imageUrl)
    const classCount = model.getTotalClasses();

    // Fetch the image
    const imageResponse = await axios.get(imageUrl, { responseType: 'arraybuffer' });
    const imageData = new Uint8Array(imageResponse.data);

    // Predict using the model
    const prediction = await model.predict(imageData);

    res.status(200).json({ prediction });
  } catch (error) {
    // console.error('Error:', error);
    // res.status(500).json({ error: 'An error occurred while processing the request.' });
  }
};
