package com.ems.service;

import java.util.List;
import java.util.stream.Collector;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.ems.dto.EmployeeDto;
import com.ems.entity.Employee;
import com.ems.exception.ResourceNotFoundException;
import com.ems.mapper.EmployeeMapper;
import com.ems.repository.EmployeeRepository;

@Service
public class EmployeeServiceImpl implements EmployeeService {
	
private EmployeeRepository employeeRepository;


public EmployeeServiceImpl(EmployeeRepository employeeRepository) {
    this.employeeRepository = employeeRepository;
}

@Override
public EmployeeDto createEmployee(EmployeeDto employeeDto) {
	Employee employee=EmployeeMapper.mapToEmployee(employeeDto);
	Employee createEmployee=employeeRepository.save(employee);
	
	return EmployeeMapper.mapToEmployeeDto(createEmployee);
	
}
@Override
public EmployeeDto getEmployeeById(Long employeeId) {
	Employee employee=employeeRepository.findById(employeeId).orElseThrow(()->new ResourceNotFoundException("Employee is not exists with given Id:"+ employeeId));
	return  EmployeeMapper.mapToEmployeeDto(employee);
	
}
@Override
public List<EmployeeDto> getAllEmployees() {
	List<Employee> employees=employeeRepository.findAll();
	return employees.stream().map((employee) ->EmployeeMapper.mapToEmployeeDto(employee)).collect(Collectors.toList());
}

@Override
public EmployeeDto updateEmployee(Long employeeId, EmployeeDto updateEmployee) {
	Employee employee=employeeRepository.findById(employeeId).orElseThrow(()->new ResourceNotFoundException("Employee in not exists with given Id:"+ employeeId));
	
	employee.setFirstName(updateEmployee.getFirstName());
	employee.setLastName(updateEmployee.getLastName());
	employee.setEmail(updateEmployee.getEmail());
	employee.setPhoneNumber(updateEmployee.getPhoneNumber());
	employee.setDepartment(updateEmployee.getDepartment());
	employee.setPosition(updateEmployee.getPosition());
	employee.setStatus(updateEmployee.getStatus());
	
	Employee updatedEmployee=employeeRepository.save(employee);
	return EmployeeMapper.mapToEmployeeDto(updatedEmployee);
}

@Override
public void deleteEmployee(Long employeeId) {
	Employee employee=employeeRepository.findById(employeeId).orElseThrow(()->new ResourceNotFoundException("Employee in not exists with given Id:"+ employeeId));
	
	employeeRepository.deleteById(employeeId);
}



}
