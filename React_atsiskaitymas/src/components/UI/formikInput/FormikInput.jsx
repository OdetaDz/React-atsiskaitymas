const FormikInput = ({ type, name, formik, placeholder }) => {
    return (
      <div>
        <div>
          <label htmlFor={name}>{name.charAt(0).toUpperCase() + name.slice(1)}:</label>
          <input
          type={type}
          name={name} id={name}
          value={formik.values[name]} // values['hihi'] === values.hihi 
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          placeholder={placeholder? placeholder:''}
          />
        </div>
        {
          formik.touched[name] && formik.errors[name] &&
          <div>
              <p style={{ color:"red" }}>{formik.errors[name]}</p>
          </div>
        }
      </div>
    );
  }
   
  export default FormikInput;