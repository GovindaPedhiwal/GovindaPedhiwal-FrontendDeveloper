import React, { useState } from 'react'
import response from '../../data.json'
import './searchform.css'
const SearchForm = (props) => {
  const [rocketForm, setRocketForm] = useState({
    name: '',
    type: 'Merlin',
    status: 'true'
  })

  function handleValidation() {
    if(!rocketForm?.name || !rocketForm?.type || !(rocketForm?.status !== '')) {
      alert('Please Fill the complete form')
      return false;
    }
  }
  function handleSubmit(e) {
    e.preventDefault();
    if(handleValidation() === false)
      return;
    let allRockets = response.data
    let {totalRockets} = response
    console.log(rocketForm)
    let rockets = []
    if(rocketForm?.name || rocketForm?.type || (rocketForm?.status !== '')) {
      rockets = allRockets.filter((rocketDetails) => {
        return rocketDetails?.name !== rocketForm?.name && rocketDetails?.type !== rocketForm?.type && rocketDetails?.active !== rocketForm?.status;
      })
    }
    props.updateData(rockets,totalRockets);
  }
  return (
    <div className="formWrapper">
      <h1 className="text-center text-white font-monospace mb-3">Search Rockets</h1>
      <form className="form">
        <div className="row mb-1">
          <div className="col-sm-5 col-6">
            <p>Enter Rocket Name</p>
          </div>
          <div className="col-sm-5 col-6">
            <input type="text" className="w-100 p-1" placeholder="Enter Rocket name" id="rocket_name" onChange={(e) => setRocketForm({...rocketForm, name: e.target.value})}/>
          </div>
        </div>
        <div className="row mb-1">
          <div className="col-sm-5 col-6">
            <p>Select Type:</p>
          </div>
          <div className="col-sm-5 col-6">
            <select name="rocket_types" className="mt-1 p-1 w-100" id="rocket_types" onChange={(e) => setRocketForm({...rocketForm, type: e.target.value})}>
              <option value="merlin">Merlin</option>
              <option value="rocket">Rocket</option>
              <option value="raptor">Raptor</option>
            </select>
          </div>
        </div>
        <div className="row mb-1">
          <div className="col-sm-5 col-6">
            <p>Select Status:</p>
          </div>
          <div className="col-sm-5 col-6">
            <select name="rocket_status" id="rocket_status" className="mt-1 p-1 w-100" onChange={(e) => {
              setRocketForm({...rocketForm, status: e.target.value === '' ? '' : e.target.value === 'true'})
              }}>
              <option value="true">True</option>
              <option value="false">False</option>
            </select>
          </div>
        </div>
        <div className="row">
          <div className="col-4">
            <button value="Search" className="searchBtn" onClick={(e) => {
              handleSubmit(e)
            }}>Search</button>
          </div>
        </div>
      </form>
    </div>
  )
}

export default SearchForm