import React, { useState,useEffect} from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/js/dist/modal.js';

const Dashboard =()=>{  
    const [data, setData] = useState([]);
    const [titles,setTitles] = useState([]);
    const [isDeleted, setisDeleted] = useState(0);
    
    const [changedData,setChangedData] = useState({
        id :"",
        name: "",
        email:"",
        phone:'',
        language:'',
        role:'',
      })

    const navigate = useNavigate();
      
    useEffect(()=>{
        const getdata =async()=>{
            await axios.get("http://localhost:3008/getuserdata")
                .then(response =>{
                    console.log(data);
                    setData(response.data);
                    setTitles(Object.keys(response.data[0]));
                })
                .catch(error=>{
                    console.log(error)
                })
          };
          getdata();
      },[isDeleted])

      console.log(data)
      
      const handleDelete = async(id)=>{
    
        var result= window.confirm("Are you Sure")
        if(result){    
        const data = {"id": id}
        try{
            

            await axios.delete(`http://localhost:3008/deletedata`,{data});
            console.log("data deleted");
            }
            catch(error){
                console.log(error); 
            }
        console.log(id)
        setisDeleted(!isDeleted);
    }
    }

    const handleEdit =(e)=>{
       
        setChangedData({
            id:e.id,
            name: e.name,
            email: e.email,
            phone: e.phone,
            language: e.language,
            role: e.role
        })
        
    }


    const handleChanges = (e)=>{
        const {name, value} = e.target
        setChangedData(changedData=>({
            ...changedData,
            [name]: value
            
        }))
      }
    
    const handleSubmit= async()=>{
        console.log(changedData)
            //  const changedData= {"id": id}
            try{
                await axios.put(`http://localhost:3008/editdata`,changedData);
                console.log("data edited");
                }
                catch(error){
                    console.log(error);
                }  
                setisDeleted(!isDeleted); 
               
            
            }

    const handleDetails = (id) =>{
        console.log(id);
        navigate('/userdetails',{state: {"id": id}});
    }

               
    return (  

    <div  className='full'>
        
       <div className='dashboardtopbar'>

        <img src="/lyriclogo.png" className='logo'/>

        <input  className="search" type="text" placeholder="Search.."></input>

        <button className='lens'> 🔍 </button>

        <div className='profile'>

        <button className='notification'><span class="material-symbols-outlined">notifications</span></button>

        <button className='account'><span class="material-symbols-outlined">account_circle</span></button>

        </div>


        </div>
        <div className='downcontent'>
           
    <button className='userbackbutton'><span class="material-symbols-outlined">arrow_back <b>User</b></span></button>

    <div className="searchbutton2"><input type="text" placeholder="filter with name or role"></input>
    <button><span class="material-symbols-outlined "size={100}>manage_search
</span></button>
</div>

    <div className='table' id='table'>
          <table class="table  table-striped">

                <thead>
                <tr>
                    {
                    titles.map((key)=>(
                        <th key={key}>{key}</th>
                       
                    ))   
                    }
                        </tr> 
                </thead>

            <tbody>
                    {data.map((indidata,index)=>(
                        <tr key={index}> 
                            {Object.keys(indidata).map((key)=> (    
                            <td key={key}>
                                {indidata[key]}

                            </td>   
                            ))}
                             <td>
                            <button type='submit' onClick={()=>{
                             handleEdit(indidata)}}  id='editbutton'>Update</button>

                            </td>

                            <td>
                             <button type="button" onClick={()=>handleDetails(indidata.id)} id={"detailbutton"}>Details</button>
                             </td>

                            <td>
                            <button type="button"onClick={()=>{handleDelete(indidata.id)}}id={"deletebutton"} >Delete</button>
                            </td>
                        </tr>
                    ))
                    }
                
                </tbody>
               
            </table> 
            </div>

           
                     
      </div> 

</div>
    );
};





export default Dashboard;