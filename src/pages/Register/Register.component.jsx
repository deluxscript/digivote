import { Formik, Form, Field, ErrorMessage } from 'formik';
import "./register.css";

function validateEmail(value) {
   let error;
   if (!value) {
      error = 'Required Field';
   }
   else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
      error = 'Invalid email address';
   }
   return error;
}

function validateOfficialsName(value) {
   let error;
   if (!value) {
      error = 'Required Field';
   }
   if (value === 'admin') {
     error = 'Nice try!';
   }
   return error;
}

const Register = () => (
   <div className="flex md:py-4 section">
      <div className="firstSection w-1/2 md:px-4"></div>
      <div className="w-2/5 md:px-4 md:self-center m-0-auto">
         <h2 className="text-3xl font-medium">Register to create election.</h2>
         <p className="subTxtColor">Have an account? Log in</p>
         <Formik
            initialValues={{ email: '', password: '', officialsName: '', orgName: '' }}
            onSubmit={(values, { setSubmitting }) => {
               setTimeout(() => {
                  alert(JSON.stringify(values, null, 2));
                  setSubmitting(false);
               }, 400);
            }}
         >
            {({ errors, touched, isValidating, isSubmitting }) => (
               <Form>
                  <div className="py-2">
                     <p className="formTextColor mb-2">Name</p>
                     <Field type="text" name="officialsName" validate={validateOfficialsName}  className="inputField" />
                     {errors.officialsName && touched.officialsName && <div>{errors.officialsName}</div>}
                  </div>
                  <div className="py-2">
                     <p className="formTextColor mb-2">Email</p>
                     <Field type="email" name="email" validate={validateEmail} className="inputField" />
                     {errors.email && touched.email && <div>{errors.email}</div>}
                  </div>
                  <div className="py-2">
                     <p className="formTextColor mb-2">Password</p>
                     <Field type="password" name="password" className="inputField" />
                     <ErrorMessage name="password" component="div" />
                  </div>
                  <div className="py-2">
                     <p className="formTextColor mb-2">Organization Name</p>
                     <Field type="text" name="orgName" className="inputField" />
                     <ErrorMessage name="orgName" component="div" />
                  </div>
                  <button type="submit" className="submitBtn" disabled={isSubmitting}>Submit</button>
               </Form>
            )}
         </Formik>
      </div>
   </div>
);

export default Register;