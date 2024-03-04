package com.nykaa.exception;

public class BeautyAdviceException extends RuntimeException{


	public BeautyAdviceException(String message) {
		super(message);
	}
	
	public BeautyAdviceException(String message , Throwable cause) {
		super(message,cause);
	}

}
