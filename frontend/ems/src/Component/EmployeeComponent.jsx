import React, { useEffect, useReducer } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { createEmployee, getEmployee, updateEmployee } from '../Services/EmployeeService';

const EmployeeComponent = () => {

  const { id } = useParams();
  const navigator = useNavigate();

  const initialState = {
    firstname: '',
    lastname: '',
    email: '',
    phoneNumber: '',
    department: '',
    position: '',
    status: '',
    submitted: false,
    errors: {}

  };

  const formReducer = (state, action) => {
    switch (action.type) {
      case 'firstname':
        return {
          ...state, firstname: action.payload,
          errors: { ...state.errors, firstname: '' }
        };

      case 'lastname':
        return {
          ...state, lastname: action.payload,
          errors: { ...state.errors, lastname: '' }
        };

      case 'email':
        return {
          ...state, email: action.payload,
          errors: { ...state.errors, email: '' }
        };

      case 'phoneNumber':
        return {
          ...state, phoneNumber: action.payload,
          errors: { ...state.errors, phoneNumber: '' }
        };

      case 'department':
        return {
          ...state, department: action.payload,
          errors: { ...state.errors, department: '' }
        };

      case 'position':
        return {
          ...state, position: action.payload,
          errors: { ...state.errors, position: '' }
        };

      case 'status':
        return {
          ...state, status: action.payload,
          errors: { ...state.errors, status: '' }
        };

      case 'Submit':
        console.log('Form Data:', state);
        return { ...state, submitted: true };

      case 'setErrors':
        return { ...state, errors: action.payload };

      case 'update':
        return {
          ...state,
          firstname: action.payload.firstName || '',
          lastname: action.payload.lastName || '',
          email: action.payload.email || '',
          phoneNumber: action.payload.phoneNumber || '',
          department: action.payload.department || '',
          position: action.payload.position || '',
          status: action.payload.status || ''
        };

      default:
        return state;
    }
  }
  const [state, dispatch] = useReducer(formReducer, initialState);



  useEffect(() => {
    if (id) {
      getEmployee(id).then((response) => {
        console.log('Loaded employee:', response.data);
        dispatch({ type: 'update', payload: response.data })
      })
        .catch((error) => {
          console.error('Error loading employee:', error);
          dispatch({
            type: 'setErrors',
            payload: { submit: 'Failed to load employee data' }
          });
        })
    }
  }, [id]);



  function validateForm() {
    let valid = true;
    const errorsCopy = {};

    if (state.firstname.trim()) {
      errorsCopy.firstname = '';
    }
    else {
      errorsCopy.firstname = 'First Name is required';
      valid = false;
    }


    if (state.lastname.trim()) {
      errorsCopy.lastname = '';
    }
    else {
      errorsCopy.lastname = 'Last Name is required';
      valid = false;
    }


    if (state.email.trim()) {
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(state.email)) {
        errorsCopy.email = 'Please enter a valid email';
        valid = false;
      }
      else {
        errorsCopy.email = '';
      }
    }
    else {
      errorsCopy.email = 'Email is required';
      valid = false;
    }

    if (state.phoneNumber.trim()) {

      if (!/^\d{10}$/.test(state.phoneNumber.replace(/\D/g, ''))) {
        errorsCopy.phoneNumber = 'Please enter a valid 10-digit phone number';
        valid = false;
      } else {
        errorsCopy.phoneNumber = '';
      }
    } else {
      errorsCopy.phoneNumber = 'Phone Number is required';
      valid = false;
    }

    if (state.department.trim()) {
      errorsCopy.department = '';
    }
    else {
      errorsCopy.department = 'Department is required';
      valid = false;
    }

    if (state.position.trim()) {
      errorsCopy.position = '';
    }
    else {
      errorsCopy.position = 'Position is required';
      valid = false;
    }

    if (state.status.trim()) {
      errorsCopy.status = '';
    }
    else {
      errorsCopy.status = 'Status is required';
      valid = false;
    }
    dispatch({ type: 'setErrors', payload: errorsCopy });
    return valid;

  }

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }
    const employees = {
      firstName: state.firstname,
      lastName: state.lastname,
      email: state.email,
      phoneNumber: state.phoneNumber,
      department: state.department,
      position: state.position,
      status: state.status
    }



    if (id) {
      updateEmployee(id, employees).then((response) => {
        dispatch({ type: 'Submit' });
        console.log('✅ Update successful:', response.data);
        console.log(' Navigating with message...');
        navigator('/employees', {
          state: { message: 'Employee Updated Successfully!' }
        });
      })
        .catch((error) => {
          console.error('Error:', error);
          dispatch({
            type: 'setErrors',
            payload: { submit: 'Failed to update employee' }
          });
        });

    }
    else {
      createEmployee(employees).then((response) => {
        dispatch({ type: 'Submit' });
        console.log('✅ Create successful:', response.data);
        console.log('Navigating with message...');
        navigator('/employees', {
          state: { message: 'Employee Added Successfully!' }
        });

      }).catch((error) => {
        console.error('Error:', error);
        dispatch({
          type: 'setErrors',
          payload: { submit: 'Failed to create employee' }
        });
      });

    }

  };



  function pageTitle() {
    if (id) {
      return <h2 className='text-center'>Update Employee</h2>
    }
    else {
      return <h2 className='text-center'>Add Employee</h2>
    }
  }



  return (
    <div>
      <div className='container'>
        <br />
        <div className='row'>
          <div className='card col-md-6 offset-md-3'>
            {
              pageTitle()
            }
            <div className='card-body'>
              <form onSubmit={handleSubmit}>

                <div className='form-group mb-2'>
                  <label htmlFor="firstname" className='form-label'>First Name</label>
                  <input
                    type="text"
                    id='firstname'
                    className={`form-control ${state.errors.firstname ? 'is-invalid' : ''}`}
                    placeholder='Enter First Name'
                    name='firstname'
                    value={state.firstname}
                    onChange={(e) => dispatch({ type: 'firstname', payload: e.target.value })}
                  />
                  {state.errors.firstname && (
                    <div className='invalid-feedback d-block'>
                      {state.errors.firstname}
                    </div>
                  )}
                </div>

                <div className='form-group mb-2'>
                  <label htmlFor="lastname" className='form-label'>Last Name</label>
                  <input
                    type="text"
                    id='lastname'
                    className={`form-control ${state.errors.lastname ? 'is-invalid' : ''}`}
                    placeholder='Enter Last Name'
                    name='lastname'
                    value={state.lastname}
                    onChange={(e) => dispatch({ type: 'lastname', payload: e.target.value })}
                  />
                  {state.errors.lastname && (
                    <div className='invalid-feedback d-block'>
                      {state.errors.lastname}
                    </div>
                  )}
                </div>

                <div className='form-group mb-2'>
                  <label htmlFor="email" className='form-label'>Email</label>
                  <input
                    type="email"
                    id='email'
                    className={`form-control ${state.errors.email ? 'is-invalid' : ''}`}
                    placeholder='Enter Email'
                    name='email'
                    value={state.email}
                    onChange={(e) => dispatch({ type: 'email', payload: e.target.value })}
                  />
                  {state.errors.email && (
                    <div className='invalid-feedback d-block'>
                      {state.errors.email}
                    </div>
                  )}
                </div>

                <div className='form-group mb-2'>
                  <label htmlFor="phoneNumber" className='form-label'>Phone Number</label>
                  <input
                    type="tel"
                    id='phoneNumber'
                    className={`form-control ${state.errors.phoneNumber ? 'is-invalid' : ''}`}
                    placeholder='Enter Phone Number'
                    value={state.phoneNumber}
                    onChange={(e) => dispatch({ type: 'phoneNumber', payload: e.target.value })}
                  />
                  {state.errors.phoneNumber && (
                    <div className='invalid-feedback d-block'>
                      {state.errors.phoneNumber}
                    </div>
                  )}
                </div>

                <div className='form-group mb-2'>
                  <label htmlFor="department" className='form-label'>Department</label>
                  <select
                    id='department'
                    className={`form-control ${state.errors.department ? 'is-invalid' : ''}`}
                    value={state.department}
                    onChange={(e) => dispatch({ type: 'department', payload: e.target.value })}
                  >
                    <option value="">Select Department</option>
                    <option value="HR">HR</option>
                    <option value="IT">IT</option>
                    <option value="Sales">Sales</option>
                    <option value="Marketing">Marketing</option>
                    <option value="Finance">Finance</option>
                  </select>
                  {state.errors.department && (
                    <div className='invalid-feedback d-block'>
                      {state.errors.department}
                    </div>
                  )}
                </div>

                <div className='form-group mb-2'>
                  <label htmlFor="position" className='form-label'>Position</label>
                  <input
                    type="text"
                    id='position'
                    className={`form-control ${state.errors.position ? 'is-invalid' : ''}`}
                    placeholder='Enter Position'
                    value={state.position}
                    onChange={(e) => dispatch({ type: 'position', payload: e.target.value })}
                  />
                  {state.errors.position && (
                    <div className='invalid-feedback d-block'>
                      {state.errors.position}
                    </div>
                  )}
                </div>

                <div className='form-group mb-2'>
                  <label htmlFor="status" className='form-label'>Status</label>
                  <select
                    id='status'
                    className={`form-control ${state.errors.status ? 'is-invalid' : ''}`}
                    value={state.status}
                    onChange={(e) => dispatch({ type: 'status', payload: e.target.value })}
                  >
                    <option value="">Select Status</option>
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                    <option value="On Leave">On Leave</option>
                  </select>
                  {state.errors.status && (
                    <div className='invalid-feedback d-block'>
                      {state.errors.status}
                    </div>
                  )}
                </div>

                <button type='submit' className='btn btn-success'>{id ? 'Update' : 'Save'}</button>
              </form>

              {state.submitted && (
                <div className='alert alert-success mt-3'>
                  {id ? 'Employee Updated Successfully!' : 'Employee Added Successfully!'}
                </div>
              )}


              {state.errors.submit && (
                <div className='alert alert-danger mt-3'>
                  {state.errors.submit}
                </div>
              )}

            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default EmployeeComponent;