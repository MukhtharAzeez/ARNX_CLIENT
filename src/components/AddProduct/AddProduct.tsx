import React, { useEffect, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AWS from 'aws-sdk'
import { useNavigate } from 'react-router-dom';


function AddProduct() {
  const INR = <svg className="text-gray-500" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 320 512"><path d="M.0022 64C.0022 46.33 14.33 32 32 32H288C305.7 32 320 46.33 320 64C320 81.67 305.7 96 288 96H231.8C241.4 110.4 248.5 126.6 252.4 144H288C305.7 144 320 158.3 320 176C320 193.7 305.7 208 288 208H252.4C239.2 266.3 190.5 311.2 130.3 318.9L274.6 421.1C288.1 432.2 292.3 452.2 282 466.6C271.8 480.1 251.8 484.3 237.4 474L13.4 314C2.083 305.1-2.716 291.5 1.529 278.2C5.774 264.1 18.09 256 32 256H112C144.8 256 173 236.3 185.3 208H32C14.33 208 .0022 193.7 .0022 176C.0022 158.3 14.33 144 32 144H185.3C173 115.7 144.8 96 112 96H32C14.33 96 .0022 81.67 .0022 64V64z" /></svg>
  const USD = <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="feather feather-dollar-sign"><line x1="12" y1="1" x2="12" y2="23"></line><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path></svg>
  const EUR = <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 384 512"><path d="M64 240C46.33 240 32 225.7 32 208C32 190.3 46.33 176 64 176H92.29C121.9 92.11 201.1 32 296 32H320C337.7 32 352 46.33 352 64C352 81.67 337.7 96 320 96H296C238.1 96 187.8 128.4 162.1 176H288C305.7 176 320 190.3 320 208C320 225.7 305.7 240 288 240H144.2C144.1 242.6 144 245.3 144 248V264C144 266.7 144.1 269.4 144.2 272H288C305.7 272 320 286.3 320 304C320 321.7 305.7 336 288 336H162.1C187.8 383.6 238.1 416 296 416H320C337.7 416 352 430.3 352 448C352 465.7 337.7 480 320 480H296C201.1 480 121.9 419.9 92.29 336H64C46.33 336 32 321.7 32 304C32 286.3 46.33 272 64 272H80.15C80.05 269.3 80 266.7 80 264V248C80 245.3 80.05 242.7 80.15 240H64z" /></svg>
  const Remove = <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="currentColor" className="bi bi-x" viewBox="0 0 16 16"> <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" /> </svg>

  const navigate = useNavigate();
  const [currencySymbol, setCurrencySymbol] = useState(INR)
  const [name, setName] = useState<string>('')
  const [price, setPrice] = useState<number>(0)
  const [progress, setProgress] = useState(0);
  const [image, setImage] = useState<Array<string>>([]);
  const [fileLength, setFileLength] = useState(0)

  useEffect(()=>{
    if(image.length > 0 && image.length ===  fileLength){
      fetch("http://localhost:4000/add-a-product", {
        method: "POST",
        body: JSON.stringify({
          name,
          price,
          description,
          image,
          currency: currencySymbol === INR ? "INR" : currencySymbol === USD ? "USD" : "EUR",
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8"
        }
      })

      navigate('/')
    }
  },[image])

  const [description, setDescription] = useState<string>('')
  const [file, setFile] = useState<Array<any>>([])
  const notify = (message: string) => toast.error(message, {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "dark",
  });;

  const S3_BUCKET = process.env.REACT_APP_S3_BUCKET_NAME;
  const ACCESS_KEY_ID = process.env.REACT_APP_S3__ACCESS_KEY_ID;
  const REGION = process.env.REACT_APP_S3_REGION;
  const SECRET_ACCESS_KEY = process.env.REACT_APP_S3_SECRET_ACCESS_KEY;

  AWS.config.update({
    accessKeyId: ACCESS_KEY_ID,
    secretAccessKey: SECRET_ACCESS_KEY,
    region: REGION,
    signatureVersion: 'v4',
  })

  const s3 = new AWS.S3({
    params: { Bucket: S3_BUCKET },
    region: REGION,
  })

  const handleCurrencyChange = (value: string) => {
    if (value === 'inr') {
      setCurrencySymbol(INR)
    } else if (value === 'usd') {
      setCurrencySymbol(USD)
    } else {
      setCurrencySymbol(EUR)
    }
  }

  const validatePrice = (e: React.ChangeEvent<HTMLInputElement>) => {
    const isNaN = Number.isNaN(parseInt(e.target.value))
    const price = parseInt(e.target.value)



    if (!isNaN) {
      setPrice(price)
    } else {
      setPrice(0)
    }
  }

  const handleFile = (e: any) => {
    const files = e.target.files;
    const totalFiles = [];
    if (files.length + file.length > 6) return notify("maximum 6 images can be uploaded");
    for (let i = 0; i < files.length; i++) {
      const fileType = files[i]["type"];
      const validImageTypes = ["image/gif", "image/jpeg", "image/png","image/webp"];
      if (validImageTypes.includes(fileType)) {
        totalFiles.push(files[i])
      } else {
        notify("Only images are allowed");
      }
    }
    setFile([...file,...totalFiles])
  };

  const handleRemove = (name: string) => {
    setFile(file.filter((each)=>{
      return each.name !== name
    }))
  }

  const handleSubmit = async() => {
    if (name.length === 0 || description.length === 0 ) return notify("Fill all the required fields");
    if (price < 0 ) return notify("Product Price should be positive");
    // if (file.length === 0 || file.length > 6) return notify("Product image is required");
    setFileLength(file.length)
    if (file.length > 0) {
      file.forEach((file: any, index: number) => {
        const reader = new FileReader();
        reader.readAsArrayBuffer(file);
        reader.onload = async (e) => {
          if (e.target && e.target.result) {
            const result = e.target.result;
            const uploadParams = {
              Bucket: S3_BUCKET || 'myawsbucketforaddpost',
              Key: Date.now() + file.name,
              Body: result,
            };
            try {
              const res = await s3.upload(uploadParams).promise();              
              setImage((image: any) => [...image, res.Location]);
              setProgress((index/fileLength)*100)
            } catch (error) {
              console.log(error);
            }
          }
        };
      });
    }
  }


  return (
    <div className='min-h-[100vh]'>
      <div className="sm:px-8 md:px-16 py-14">
        <main className="container mx-auto max-w-screen-2xl h-full">
          <div className="relative h-full flex flex-col bg-white shadow-xl rounded-md">

            <div className='p-8'>
              <div className="grid grid-cols-1 space-y-2 mb-4">
                <label className="text-sm font-bold text-gray-500 tracking-wide">Name</label>
                <input value={name} onChange={(e) => { setName(e.target.value) }} className="text-base p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500" type="text" placeholder="Product Name...." />
              </div>
              <div className="grid grid-cols-1 space-y-2 mb-4">
                <label className="text-sm font-bold text-gray-500 tracking-wide">Description</label>
                <input value={description} onChange={(e) => { setDescription(e.target.value) }} className="text-base p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500" type="text" placeholder="Product Price...." />
              </div>

              <div className="grid grid-cols-1 space-y-2 mb-4">
                <label className="text-sm font-bold text-gray-500 tracking-wide">Price</label>
                <div className='relative '>
                  <span className="absolute inset-y-0 left-0 flex items-center pl-2">
                    <button type="submit" className="p-1 focus:outline-none focus:shadow-outline">
                      {currencySymbol}
                    </button>
                  </span>
                  <input onChange={validatePrice} value={price} className="w-full text-base p-2 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500" type="text" placeholder="About Product...." />
                </div>
              </div>

              <div className=" flex gap-4">
                <label className="text-sm font-bold text-gray-500 tracking-wide">Change Currency Type</label>
                <select
                  className="px-8 py-2 outline-none border border-gray-300 rounded-lg"
                  aria-label="Currency"
                  onChange={(e) => { handleCurrencyChange(e.target.value) }}
                >
                  <option value="inr">INR</option>
                  <option value="usd">USD</option>
                  <option value="eur">EUR</option>
                </select>
              </div>
            </div>

            <section className="h-full overflow-auto p-8 w-full flex flex-col">
              <header className="border-dashed border-2 border-gray-400 py-12 flex flex-col justify-center items-center">
                <label htmlFor="file-upload" className="bg-gray-500 px-8 py-2 rounded-md cursor-pointer text-white ">
                  <input id="file-upload" type="file" className='hidden' onChange={handleFile} multiple />
                  Choose a file
                </label>
              </header>

              {file.length === 0 &&
                <ul id="gallery" className="flex flex-wrap -m-1 mt-10">
                  <li id="empty" className="h-full w-full text-center flex flex-col justify-center items-center">
                    <img className="mx-auto w-32 h-32" src="https://user-images.githubusercontent.com/507615/54591670-ac0a0180-4a65-11e9-846c-e55ffce0fe7b.png" alt="no data" />
                    <span className="text-small text-gray-500">No files selected</span>
                  </li>
                </ul>
              }
            </section>

            <div className='flex flex-wrap gap-4 justify-center '>
              {
                file.map((file: any, index: number) => {
                  return (
                    <div className='group w-1/4 relative border-2 border-gray-300 flex justify-center'>
                      <img key={index} src={URL.createObjectURL(file)} alt="" />
                      <div className='group-hover:block hidden absolute top-0 right-0 bg-black text-white cursor-pointer' onClick={()=>handleRemove(file.name)}>{Remove}</div>
                    </div>
                  )
                })
              }
            </div>

            <footer className="flex justify-end px-8 pb-8 pt-4">
              {
                progress === 0 ? 
              <button onClick={handleSubmit} id="submit" className="px-3 py-1 bg-gray-500 rounded-md hover:bg-gray-400 text-white focus:shadow-outline focus:outline-none">
                Add Product
              </button> :
              <button id="submit" className="px-3 py-1 bg-gray-500 rounded-md hover:bg-gray-400 text-white focus:shadow-outline focus:outline-none">
                {progress} %
              </button>

              }


              <button id="cancel" className="ml-3 rounded-sm px-3 py-1 hover:bg-gray-300 focus:shadow-outline focus:outline-none">
                Cancel
              </button>
            </footer>
          </div>
        </main>
      </div>

      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </div>
  )
}

export default AddProduct
