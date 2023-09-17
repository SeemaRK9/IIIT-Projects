package com.example.BookingService.exceptions;

public class InvalidBookingIdException extends IllegalArgumentException{
    public InvalidBookingIdException(String message){super(message);}
}
