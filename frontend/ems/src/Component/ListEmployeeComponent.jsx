import React, { useEffect, useState } from 'react'
import { deleteEmployee, listEmployees } from '../Services/EmployeeService'
import { useLocation, useNavigate } from 'react-router-dom';
const ListEmployeeComponent = () => {

    const [employees, SetEmployees] = useState([]);
    const navigator = useNavigate();
    const location = useLocation();
    const [successMessage, setSuccessMessage] = useState('');

    useEffect(() => {
        getAllEmployees();
    }, [])

    useEffect(() => {
        if (location.state?.message) {
            setSuccessMessage(location.state.message);
            navigator(location.pathname, { replace: true, state: {} });
            const timer = setTimeout(() => {
                setSuccessMessage('');
            }, 2000);
            return () => clearTimeout(timer);
        }
    }, [location.state?.message,location.pathname,navigator]);




    function getAllEmployees() {
        listEmployees().then((response) => {
            SetEmployees(response.data);
        }).catch(error => {
            console.error(error);
        })
    }



    //function
    const addNewEmployee = () => {
        navigator('/add-employee')
    }

    const updateEmployee = (id) => {
        navigator(`/update-employee/${id}`)
    }

    const removeEmployee = (id) => {
        if (window.confirm('Are you sure you want to delete this employee?')) {
            console.log(id);
            deleteEmployee(id)
                .then((response) => {
                    getAllEmployees();
                })
                .catch(error => {
                    console.log(error);
                })
        }
    }



    return (

  <div className='container mt-4 pb-6'>
    <div className='row justify-content-center'>
      <div className='col-md-12'>  
        <h2 className='text-center mb-4'>List Of Employees</h2>
        
        {successMessage && (
          <div className='alert alert-success alert-dismissible fade show' role='alert'>
            {successMessage}
            <button
              type='button'
              className='btn-close'
              onClick={() => setSuccessMessage('')}
            ></button>
          </div>
        )}
        
        <div className='d-flex justify-content-between mb-3'>
          <h4>Employee Records</h4>
          <button className='btn btn-primary' onClick={addNewEmployee}>
            Add Employee
          </button>
        </div>
        
        
        <div className='table-container'>
          <table className='table table-striped table-bordered'>
            <thead>
              <tr>
                <th>ID</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Department</th>
                <th>Position</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {employees.length === 0 ? (
                <tr>
                  <td colSpan="9" className='text-center'>No employees found</td>
                </tr>
              ) : (
                employees.map(employee =>
                  <tr key={employee.id}>
                    <td>{employee.id}</td>
                    <td>{employee.firstName}</td>
                    <td>{employee.lastName}</td>
                    <td>{employee.email}</td>
                    <td>{employee.phoneNumber}</td>
                    <td>{employee.department}</td>
                    <td>{employee.position}</td>
                    <td>
                      <span className={`badge ${
                        employee.status === 'Active' ? 'bg-success' :
                        employee.status === 'On Leave' ? 'bg-warning text-dark' : 
                        'bg-danger'
                      }`}>
                        {employee.status}
                      </span>
                    </td>
                    <td>
                      
                      <div className='action-buttons'>
                        <button 
                          className='btn btn-info btn-sm' 
                          onClick={() => updateEmployee(employee.id)}
                        >
                          Update
                        </button>
                        <button 
                          className='btn btn-danger btn-sm' 
                          onClick={() => removeEmployee(employee.id)}
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                )
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
);

}

export default ListEmployeeComponent