import axios from "axios"
import { PINATA_FILE_URI } from "./constants"

export const pinataSaveImage = async (img) => {
    if (!img)
        return
    try {
        const formData = new FormData();
        formData.append('file', img);

        const resFile = await axios({
            method: 'post',
            url: 'https://api.pinata.cloud/pinning/pinFileToIPFS',
            data: formData,
            headers: {
                'pinata_api_key': process.env.REACT_APP_PINATA_KEY,
                'pinata_secret_api_key': process.env.REACT_APP_PINATA_SECRET_KEY,
                'content-Type': "multipart/form-data"
            }
        })
        return `${PINATA_FILE_URI}${resFile.data.IpfsHash}`;
    } catch (err) {
        console.warn("err in saving image")
    }
}