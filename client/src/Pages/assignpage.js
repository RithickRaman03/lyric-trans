import React, { useEffect,useState } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from "axios"

export default function Assignpage() {
        const [assigndata, setassignData] = useState([]);
        const [titles,setTitles] = useState([]);
        useEffect(()=>{
            const getdata =async()=>{
                await axios.get("http://localhost:3008/assigntask")
                    .then(response =>{
                        setassignData(response.data.rows);
                        setTitles(Object.keys(response.data.rows[0]));
                    })
                    .catch(error=>{
                        console.log(error)
                    })
              };
              getdata();
          },[]) 

          console.log(assigndata);
          console.log(titles);

          return (
            <div className='assigntask'>
            <h1>Assign Tasks</h1>
                <table class="table table-striped">
                    <thead>
                    <tr>
                        {
                        titles.map((key)=>(
                            <th key={key}>{key} </th> 
                        ))   
                        }
                        <th>Assigment </th>
                            </tr> 
                    </thead>
                    <tbody>
                    {assigndata.map((indidata,index)=>(
                        <tr key={index}> 
                            {Object.keys(indidata).map((key)=> (    
                            <td key={key}>
                                {indidata[key]}
                            </td>   
                            ))}
                             <button type="button"  id={"assignbutton"}>ASSIGN</button>
                           
                        </tr>
                    ))
                    }
                
                </tbody>
                </table>
            </div>
           
          )
          
}