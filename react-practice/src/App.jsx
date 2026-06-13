import React, { useState } from "react";

const App = () => {

  const [formData,setFormData] = useState({
    email:"",
    password:""
  });

  const [submittedForm,setSubmittedForm] = useState(null)
  
  function handleChange(event){
    
    setFormData({
      ...formData,
      [event.target.name] : event.target.value
    })

  };
  
  function handleForm(event) {
    event.preventDefault();
    setSubmittedForm(formData)

    setFormData(
      {
    name:"",
    email:"",
    password:""
  }
    );
  }



  return (
    <div>
     <form onSubmit={handleForm}>
        <input type="text" placeholder="email@gmail.com" name="name" value={formData.name} onChange={handleChange} required/>

       <input type="email" placeholder="email@gmail.com" name="email" value={formData.email} onChange={handleChange} required/>
      <input type="password" placeholder="Enter your password..." name="password" value = {formData.password} onChange={handleChange} required/>
      <button type="submit">Submit</button>
     </form>
     <div>
      {
        submittedForm && (
          <div>
            <h2>Form Submitted</h2>
            <p>Name:{submittedForm.name}</p>
            <p>Email: {submittedForm.email}</p>
            <p>Password: {submittedForm.password}</p>
          </div>
        )
      }
     </div>
    </div>
  );
};

export default App;
