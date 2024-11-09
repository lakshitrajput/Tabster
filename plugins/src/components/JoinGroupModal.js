import React from 'react'

export default function JoinGroupModal({ setShowJoinGroup }) {
  return (
      <div className='home'>
          <div className='home-content'>
          <div style={{position:"absolute",top:"10px",right:"10px"}}>
                  <button onClick={() => setShowJoinGroup(false)}><i class="fa-solid fa-square-xmark text-danger"></i></button>
          </div>
              <div className="d-flex flex-column align-items-center justify-content-center">
                  <h1 className='text-warning'>Tabster</h1>
                  <p className="lead fw-normal mb-0 me-3 text-secondary">Where Tabs Meet Innovation</p>
                  <form>
                      <div class="form-group mt-5">
                          <label for="exampleInputEmail1">Join Group</label>
                          <input type="email" class="form-control mt-3" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter 6 character group ID" />

                      </div>
                      <button type="submit" class="btn btn-primary mt-3">Submit</button>
                  </form>
              </div>
          </div>
      </div>
  )
}
