package com.nykaa.exception;

//DuplicateEmailException.java
public class DuplicateEmailException extends RuntimeException {
 public DuplicateEmailException(String message) {
     super(message);
 }
 public DuplicateEmailException(String message,Throwable cause) {
		super(message,cause);
	}
}
