package com.ems.dto;




public class EmployeeDto {
	
private long id;

private  String firstName;

private String lastName;

private String email;

private String phoneNumber;
 
private String department;

private String position;

private String status;


public EmployeeDto() {
	
}


public EmployeeDto(long id, String firstName, String lastName, String email, String phoneNumber, String department,
		String position, String status) {
	super();
	this.id = id;
	this.firstName = firstName;
	this.lastName = lastName;
	this.email = email;
	this.phoneNumber = phoneNumber;
	this.department = department;
	this.position = position;
	this.status = status;
}


public long getId() {
    return id;
}

public void setId(long id) {
    this.id = id;
}

public String getFirstName() {
    return firstName;
}

public void setFirstName(String firstName) {
    this.firstName = firstName;
}

public String getLastName() {
    return lastName;
}

public void setLastName(String lastName) {
    this.lastName = lastName;
}

public String getEmail() {
    return email;
}

public void setEmail(String email) {
    this.email = email;
}

public String getPhoneNumber() {
	return phoneNumber;
}





public void setPhoneNumber(String phoneNumber) {
	this.phoneNumber = phoneNumber;
}





public String getDepartment() {
	return department;
}





public void setDepartment(String department) {
	this.department = department;
}





public String getPosition() {
	return position;
}





public void setPosition(String position) {
	this.position = position;
}



public String getStatus() {
	return status;
}


public void setStatus(String status) {
	this.status = status;
}
}
