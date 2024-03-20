import { useState } from "react";
import "./FormPage.css";


export const FormPage = () => {
  const [formData, setformData] = useState({});
  const [saveData, setSaveData] = useState([]);
  const [errors, setErrors] = useState({});
  function Debouce(callback, delay) {
    let timmer;
    return (...args) => {
      clearTimeout(timmer);
      timmer = setTimeout(() => {
        callback(...args);
      }, delay);
    };
  }

  const handleChange = (e) => {
    setformData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validateForm(formData)
    console.log(validationErrors)
    if(Object.keys(validationErrors).length===0){
      setSaveData([...saveData, formData]);
      setErrors({})
      
    }
    else{
      setErrors(validationErrors)
    }
     
  };

  const validateForm = (data) =>{
    const errors = {};
    if(!data.Username){
      errors.Username = "Username required"
    }
    if(!data.Password){
      errors.Password ="Password required"
    }
    return errors
  }


  return (
    <div className="mainFormCont">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="Username"
          value={formData.username}
          onChange={Debouce(handleChange, 1000)}
        />
        {errors.Username && <span className="error">{errors.Username}</span>}
        <input
          type="password"
          name="Password"
          value={formData.password}
          onChange={Debouce(handleChange, 1000)}
        />
       {errors.Password && <span className="error">{errors.Password}</span>}
        <button type="submit">Submit</button>
      </form>
      {saveData.map((data, index) => (
        <div key={index}>
          <p>Username: {data.Username}</p>
          <p>Password: {data.Password}</p>
        </div>
      ))}
    </div>
  );
};
