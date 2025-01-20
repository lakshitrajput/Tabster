import React from 'react'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

export default function JoinGroupModal({ setShowJoinGroup }) {

    const [groupID, setGroupID] = React.useState('');
    const navigate=useNavigate();

  const handleSubmit=async(e)=>{
      e.preventDefault();
      const authToken = localStorage.getItem('authToken');
      const res = await fetch(`https://deplo2.onrender.com/api/group/add`, {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${authToken}`
          },
          body: JSON.stringify({
              groupCode: groupID
          }),
      });
      const response = await res.json();      
      if(response.success){
          toast.success(response.msg);
          navigate("/");
          setShowJoinGroup(false);
      }else{
          toast.error("Invalid");
      }
  }

  return (
      <div className='home'>
          <div className='home-content'>
          <div style={{position:"absolute",top:"10px",right:"10px"}}>
                  <button onClick={() => setShowJoinGroup(false)}><i className="fa-solid fa-square-xmark text-danger"></i></button>
          </div>
              <div className="d-flex flex-column align-items-center justify-content-center">
                  <h1 className='text-warning'>Tabster</h1>
                  <p className="lead fw-normal mb-0 me-3 text-secondary">Where Tabs Meet Innovation</p>
                  <form>
                      <div className="form-group mt-5">
                          <label htmlFor="exampleInputEmail1">Join Group</label>
                          <input type="email" className="form-control mt-3" id="exampleInputEmail1" value={groupID} onChange={(e) => setGroupID(e.target.value)} aria-describedby="emailHelp" placeholder="Enter 6 character group ID" />

                      </div>
                      <button type="submit" className="btn btn-primary mt-3" onClick={handleSubmit}>Submit</button>
                  </form>
              </div>
          </div>
      </div>
  )
}
