import React, { useEffect } from 'react';
import  {  useState } from 'react';
import {useParams} from 'react-router-dom'
import { useNavigate } from 'react-router-dom';

const UpdateProduct = () => {

    const [name, setname] = useState('');
    const [content, setcontent] = useState('');
    const[image,setimage]=useState('')
    const param=useParams();
const navigate=useNavigate();

useEffect(()=>{
getProductDetail();
},[])

const getProductDetail=async()=>{
  console.log(param)
  let result=await fetch(`http://localhost:5000/product/${param.id}`,
  {
    headers:{
      authorization:`bearer ${JSON.parse(localStorage.getItem('token'))}`
    }
  });
  result=await result.json();
  console.log(result.name)
  setname(result.name)
  setcontent(result.content)
  setimage(result.image)
}

    const UpdateProduct=async()=>{
        console.log(name,content)
        let result=await fetch(`http://localhost:5000/products/${param.id}`,{
          method:'Put',
          body:JSON.stringify({name,content,image}),
          headers:{
            'Content-Type':"application/json",
            authorization:`bearer ${JSON.parse(localStorage.getItem('token'))}`
          }
        })
        result=await result.json()
         console.log(result)
         navigate('/')

    }

  return (
    <div className='signup'>
        <h1>update Blog</h1>
        <input type="text" className="input-box" placeholder='Enter Image Url'  value={image} onChange={(e)=>setimage(e.target.value)} />
        <input type="text" className="input-box" placeholder='Enter Blog Name'  value={name} onChange={(e)=>setname(e.target.value)} />
        <input type="text" className="input-box" placeholder='Enter Content '  value={content} onChange={(e)=>setcontent(e.target.value)} />

        

        <button className='btn' onClick={UpdateProduct}>update Note</button>
    </div>
  )
}

export default UpdateProduct