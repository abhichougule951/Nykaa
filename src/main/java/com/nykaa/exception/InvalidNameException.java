package com.nykaa.exception;

//InvalidNameException.java
public class InvalidNameException extends RuntimeException {
	public InvalidNameException(String message) {
		super(message);
	}

	public InvalidNameException(String message, Throwable cause) {
		super(message, cause);
	}
}
