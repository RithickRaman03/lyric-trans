import React,{useState} from 'react';
import axios from 'axios';

function Adduser() {
    const [ckpwd, setckpwd] = useState(false);
    const [data,setData] = useState({
        Username: "",
        Email:"",
        Phone:'',
        Password:'',
        Reenter:'',
        Language:'',
        Role:'',
      })
      
      const handleSubmit=(e)=>{
        e.preventDefault();
        alert("Account Created")
        console.log(data);
        console.log(data);
        axios({
          method: 'POST',
          url: 'http://localhost:3008/userdata',
          data: data
        });
      };
    
      const handleChange = (e)=>{
        const {name, value} = e.target
        setData(data =>({
          ...data,
          [name]: value
        }))

        if(name == 'Reenter'){
          if(value != data.Password)
          {
            setckpwd(true);
          }
          else
            setckpwd(false);
        }
      }
     
     

  return (
    <div className='App'>
        <h1 className='userheading'>Create New user</h1>
    <form >
      <div className='wholecontent'>
       <div className="Name">
         <label htmlFor='name'>Name:</label>
         <input type='text'
         id='name'
         value={data.Username}
         name='Username'
         onChange={handleChange}
         required/>
       </div>
   <br/>
       
       
       <div className ="Email">
         <label htmlFor='name'>Email:</label>
         <input type='email'
         id='email'
         value={data.Email}
         name='Email'
         onChange={handleChange}
         required/>
       </div>
 <br/>
       
     <div className='firstrow'>
   
     <div className ="Phone">
       <label htmlFor='Phone'>Phone:</label>
         <input type='tel'
         id='Phone'
         value={data.Phone}
         name='Phone'
         onChange={handleChange}
         pattern='[789][0-9]{9}'
         required/>
   </div>
       
 <br/>
 
 
    <div className='passrenter'>
          <div className='Password'> 
          <label htmlFor='Password'>Password:</label> 
          <input type = "password" value = {data.Password} name= "Password"onChange = {handleChange} />
         <br></br> </div>
         <br></br>
         <div className='Reenterpassword'>
         <label htmlFor='Password'>Re Enter:</label> 
        
          <input
             type = "password"
             name='Reenter'
             value = {data.Reenter}
             onChange = {handleChange}
          />
          {ckpwd && <p>Password doesn't match</p>}
          </div> 
          </div> 
       </div>
 <br/>
   
   
   <div className="Language">
  
       <label htmlFor='Language'>Language:</label>
         <input type='text'
         id='Language'
         value={data.Language}
         name='Language'
         onChange={handleChange}
         required/>
 <br/>
     </div>
     <br/>
 
     
     
     <br/>
       
       
       <div className='Submit'>
           <button type="submit" className='btn btn-primary' onClick={handleSubmit} >Create Account</button>
       </div>
       </div>
     </form>
    </div>
  )
}

export default Adduser