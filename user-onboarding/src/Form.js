import React, {useState, useEffect, useReducer} from "react";  // import react and needed hooks
import {withFormik, Form, Field} from "formik"; //import formik for use
import * as Yup from "yup"; // import yup
import axios from "axios"; // axios import 
import styled from 'styled-components'

const Wrapper = styled.div`
padding:0
display:inline-block;`

const Inputs = styled.div`
margin-right:50px;
;`
;
const MyForm = ({errors, status,touched, values}) => { //creating components 
    const[users, setUsers] = useState([]);
    useEffect(() => {
        console.log("status has changed", status);
        status && setUsers(users => [...users, status])

    }, [status]);
    return (
        <div className ="formcont">

<Form>
<Wrapper> 

    <label htmlFor = "name">
        
        <Field
        id = "name"
        type = "text"
        name = "name"
        placeholder =  "First name"
        
        />
        {touched.name && errors.name && (
            <p> {errors.name}</p>
        )}
    </label>
    

    <label htmlFor = "email">

        <Field
        id = "email"
        type = "email"
        name = "email"
        placeholder = "Email"
        
        />
    

    {touched.email && errors.email &&(
        <p>{errors.email}</p>
    )}
    </label>

    
    <label htmlFor = "password">
        
        <Field
        id = "password"
        type = "password"
        name = "password"
        placeholder = "Password"
        
        />
    
    {touched.password && errors.password &&(
            <p> {errors.password}</p>
        )}
</label>
<br/>

<label className="checkbox-container">
<Inputs>
        Terms of Service
        </Inputs>
        <Field
        id="box"
          type="checkbox"
          name="tos"
          checked={values.tos} 
          id="checkbox"
        />
        <span className="checkmark" />
      </label>  
      
   
        <button  className="buttonStyles" type = "submit">Submit</button>
        </Wrapper>
</Form>

{users.map(user =>{
    return(
    <ul key = {user.id}>
        <li> name:{user.name}</li>
        <li> email:{user.email}</li>
         <li> {user.password}     </li>
         <li>{user.checked} </li>
    
    </ul>
    );
})}
</div>
    );
};


const FormikMyForm = withFormik({
    mapPropsToValues(props){

        return{
            name:props.name || "",
            email:props.email || "",
            password:props.password || "",
            tos:props.tos || true,

        }
    },
   

validationSchema: Yup.object().shape({
    name: Yup.string().required(),
    email: Yup.string().required(),
    password: Yup.string().required(),
  }),
  handleSubmit(values, { setStatus, resetForm }) {
    console.log("submitting", values);
    axios
      .post("https://reqres.in/api/users/", values)
      .then(res => {
        console.log("success", res);
        setStatus(res.data);
        resetForm();
      })
      .catch(err => console.log(err.response));
  }
})(MyForm);

export default FormikMyForm;  
