package com.nykaa.exception;

//InvalidMobileNumberException.java
public class InvalidMobileNumberException extends RuntimeException {
	public InvalidMobileNumberException(String message) {
		super(message);
	}

	public InvalidMobileNumberException(String message, Throwable cause) {
		super(message, cause);
	}
}
