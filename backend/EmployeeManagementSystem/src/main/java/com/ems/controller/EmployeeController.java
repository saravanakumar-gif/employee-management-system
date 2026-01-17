package com.ems.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ems.dto.EmployeeDto;
import com.ems.entity.Employee;
import com.ems.service.EmployeeService;

@CrossOrigin(origins = {"http://localhost:3000", "http://192.168.31.131:3000"})
@RestController
@RequestMapping("/api/employee")

public class EmployeeController {
	
	@Autowired
	private EmployeeService employeeService;
	
	
	public EmployeeController(EmployeeService employeeService) {
        this.employeeService = employeeService;
    }
	
	//Build add employee
	
	@PostMapping
	
	public ResponseEntity<EmployeeDto> createEmployee(@RequestBody EmployeeDto employeeDto){
		EmployeeDto savedEmployee=employeeService.createEmployee(employeeDto);
		return new ResponseEntity<>(savedEmployee,HttpStatus.CREATED);
	}
	
	//Build  get employee
	@GetMapping("{id}")
	public ResponseEntity<EmployeeDto> getEmployeeById(@PathVariable("id")Long employeeId){
		EmployeeDto employDto=employeeService.getEmployeeById(employeeId);
		return new ResponseEntity<>(employDto,HttpStatus.OK);
		
	}
	
	
	//Build get all employee
	@GetMapping
	public ResponseEntity<List<EmployeeDto>> getAllEmployee(){
		List<EmployeeDto> employees= employeeService. getAllEmployees();
		return new ResponseEntity<>(employees,HttpStatus.OK);
		
	}
	
	
	
	// Build update
	
	@PutMapping("{id}")
	public  ResponseEntity<EmployeeDto>updateEmployee(@PathVariable("id")Long employeeId, @RequestBody EmployeeDto updatedEmployee){
		EmployeeDto employeeDto=employeeService.updateEmployee(employeeId,updatedEmployee);
		return new ResponseEntity<>(employeeDto,HttpStatus.OK);
		
	}
	
	//Build delete
	
	@DeleteMapping("{id}")
	
	public ResponseEntity<String>deleteEmployee(@PathVariable("id") Long employeeId){
		employeeService.deleteEmployee(employeeId);
		return ResponseEntity.ok("Employee Deleted Successfully!") ;
		
	}

}
