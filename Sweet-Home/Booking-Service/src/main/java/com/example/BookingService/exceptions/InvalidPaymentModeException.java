package com.example.BookingService.exceptions;

public class InvalidPaymentModeException extends RuntimeException {
    public InvalidPaymentModeException(String message){super(message);}
}
