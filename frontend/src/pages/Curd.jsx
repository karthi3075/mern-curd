import React, { useEffect,useState } from 'react'
import axios from "axios";

const Curd = () => {

    const [details,setDetails] = useState([])
    const [data,setData]=useState({name:"",mobile:"",email:""})
    const [editData,setEditData]=useState({name:"",mobile:"",email:""})
    const [editId,setEditId]=useState(null)
    const [name,setName]=useState("")
    const [notification,setNotification]=useState({message:"",status:""})
    const [show,setShow]=useState(false)

    const baseUrl=import.meta.env.VITE_BASE_URL;
    
    const [loading,setLoading]=useState(false)

    useEffect(()=>{
       get_datails();
    },[])

    const handleChange=(event)=>{
        const name=event.target.name;
        const value=event.target.value;
        setData((prev)=>({...prev,[name]:value}))
    }

    const handleChangeEdit=(event)=>{
        const name=event.target.name;
        const value=event.target.value;
        setEditData((prev)=>({...prev,[name]:value}))
    }
    
    const get_datails=async()=>{
        setLoading(true)
       const response=await axios.get(`${baseUrl}/details/get`)
        setDetails(response.data)
        setLoading(false)
    }

    const handleAdd=async(event)=>{
        event.preventDefault();
        const response=await axios.post(`${baseUrl}/details/create`,data)
        if(response.data.status){
            setNotification({message:"added",status:true})
            setShow(true)
        }else{
            setNotification({message:"not added",status:false})
            setShow(true)
        }
        setData({name:"",mobile:"",email:""})
        get_datails();
    }

    const editClick=(id)=>{
        setEditId(id)
        const edit=details.filter((detail)=>(detail._id==id))
        setEditData(edit[0])
    }

    const handleEdit=async(id)=>{

        editData.id=id
        const response=await axios.put(`${baseUrl}/details/edit`,editData)
        if(response.data.status){
            setNotification({message:"edited",status:true})
            setShow(true)
        }else{
            setNotification({message:"not edited",status:false})
            setShow(true)
        }
        setEditId(null)
        get_datails();
    }

    const handleDelete=async(id)=>{
        const response=await axios.delete(`${baseUrl}/details/delete/${id}`)
        if(response.data.status){
            setNotification({message:"deleted",status:true})
            setShow(true)
        }else{
            setNotification({message:"not deleted",status:false})
            setShow(true)
        }
        get_datails();
    }

    const handleSearch=async(event)=>{
        event.preventDefault()
        setLoading(true)
        const response=await axios.get(`${baseUrl}/details/search?name=${name}`)
        if(response.data){
            setDetails(response.data)
        }else{
            setNotification({message:"search failed",status:false})
            setShow(true)
        }
        setLoading(false)
    }

    useEffect(()=>{
        setTimeout(()=>{
            setShow(false)
        },2000)
    },[show])
    
  return (
    <div className="flex flex-col md:items-center max-w-screen py-20">
        {show && 
            <div className={`px-5 py-2 w-100 ${notification.status ? "bg-green-400" : "bg-red-400"} rounded absolute top-10 fixed`}>
                <p className=''>{notification.message}</p>
                <button className='absolute top-0 right-0 bottom-0 px-3 py-1 text-red-900 cursor-pointer ' onClick={()=>{setShow(false)}}>x</button>
            </div>
        }
        <form className='w-100 relative mb-5 mt-5'>
            <input type='text' placeholder='Enter Name' className='px-2 py-1 border outline-none rounded-md w-100' onChange={(event)=>setName(event.target.value)}/>
            <button className='px-2 py-1 bg-blue-300 rounded-r-md absolute top-0 right-0 bottom-0' onClick={handleSearch}>Search</button>
        </form>
        <table className="bg-blue-300 rounded ">
            <thead>
                <tr className="border-b">
                    <th className="px-2 py-1">Name</th>
                    <th className="px-2 py-1">Mobile</th>
                    <th className="px-2 py-1">Email</th>
                    <th className="px-2 py-1" colSpan="2">Operations</th>
                </tr>
            </thead>
            <tbody>
                <tr className='border-b-1'>
                    {/* <form> */}
                        <td className="px-2 py-1"><input type="text" value={data.name} name="name" onChange={handleChange} className="border-1 m-1 rounded outline-none px-2 py-1"  required/></td>
                        <td className="px-2 py-1"><input type="number" value={data.mobile} name="mobile" onChange={handleChange} className="border-1 m-1 rounded outline-none px-2 py-1" min={1111111111} max={9999999999} required/></td>
                        <td className="px-2 py-1"><input type="email" value={data.email} name="email" onChange={handleChange} className="border-1 m-1 rounded outline-none px-2 py-1" required/></td>
                        <td colSpan="2" className="px-2 py-1"><button className="p-1 bg-green-500 rounded cursor-pointer w-full" onClick={handleAdd}>Add</button></td>
                    {/* </form> */}
                </tr>
                {loading && 
                    <tr className="border-b-1 hover:bg-blue-400">
                        <td colSpan={5} className="px-2 py-1">
                            <p className='text-center'>Loading...</p>
                        </td>
                    </tr>
                }
                {(!loading && details.length==0) && 
                    <tr className="border-b-1 hover:bg-blue-900">
                        <td colSpan={5} className="px-2 py-1">
                            <p className='text-center text-red-400'>Record not found</p>
                        </td>
                    </tr>
                }
                {!loading && details.map((detail,index)=>(
                    <tr key={index} className="border-b-1 hover:bg-blue-400">
                        {detail._id==editId?
                        <>
                            <td className="px-2 py-1"><input type="text" value={editData.name} name="name" onChange={handleChangeEdit} className="border-1 m-1 rounded outline-none px-2 py-1" required/></td>
                            <td className="px-2 py-1"><input type="number" value={editData.mobile} name="mobile" min={1111111111} max={9999999999} onChange={handleChangeEdit} className="border-1 m-1 rounded outline-none px-2 py-1" required/></td>
                            <td className="px-2 py-1"><input type="email" value={editData.email} name="email" onChange={handleChangeEdit} className="border-1 m-1 rounded outline-none px-2 py-1" required/></td>
                            <td className="px-2 py-1" colSpan={2}>
                                <button className="p-1 w-full bg-blue-500 rounded cursor-pointer" onClick={()=>{handleEdit(detail._id)}}>Update</button>
                            </td>
                        </>:
                        <>
                            <td className="px-2 py-1">{detail.name}</td>
                            <td className="px-2 py-1">{detail.mobile}</td>
                            <td className="px-2 py-1">{detail.email}</td>
                            <td className="px-2 py-1">
                                <button className="p-1 bg-blue-500 rounded cursor-pointer" onClick={()=>{editClick(detail._id)}}>Edit</button>
                            </td>
                            <td className="px-2 py-1">
                                <button className="p-1 bg-red-500 rounded cursor-pointer" onClick={()=>handleDelete(detail._id)}>Delete</button>
                            </td>
                        </>
                    }
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
  )
}

export default Curd