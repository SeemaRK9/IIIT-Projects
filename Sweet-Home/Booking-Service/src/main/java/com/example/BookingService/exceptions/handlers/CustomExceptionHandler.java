package com.example.BookingService.exceptions.handlers;

import com.example.BookingService.dtos.ExceptionErrorResponseDTO;
import com.example.BookingService.exceptions.InvalidBookingIdException;
import com.example.BookingService.exceptions.InvalidPaymentModeException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

//Custom exception handler to check the invalid booking ID and invalid payment mode
@ControllerAdvice
public class CustomExceptionHandler extends ResponseEntityExceptionHandler {

        private final String BAD_REQUEST = "400";

        @ExceptionHandler(InvalidBookingIdException.class)
        public final ResponseEntity<ExceptionErrorResponseDTO> invalidBookingIdExceptionHandler(InvalidBookingIdException e, WebRequest webRequest){
            ExceptionErrorResponseDTO errorResponse = new ExceptionErrorResponseDTO();
            errorResponse.setMessage(e.getLocalizedMessage());
            errorResponse.setStatusCode(BAD_REQUEST);
            return new ResponseEntity(errorResponse, HttpStatus.BAD_REQUEST);
        }

        @ExceptionHandler(InvalidPaymentModeException.class)
        public final ResponseEntity<ExceptionErrorResponseDTO>invalidPaymentModeExceptionHandler(InvalidPaymentModeException e, WebRequest webRequest){
            ExceptionErrorResponseDTO errorResponse = new ExceptionErrorResponseDTO();
            errorResponse.setMessage(e.getLocalizedMessage());
            errorResponse.setStatusCode(BAD_REQUEST);
            return new ResponseEntity(errorResponse, HttpStatus.BAD_REQUEST);
        }
    }

