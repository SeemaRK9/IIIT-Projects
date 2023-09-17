package com.example.BookingService.controllers;

import com.example.BookingService.dtos.BookingRequestDTO;
import com.example.BookingService.dtos.PaymentRequestDTO;
import com.example.BookingService.services.BookingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

//Controller Layer for the Booking Service of Sweet Home
@RestController
public class BookingController {

    @Autowired
    BookingService bookingService;

    @PostMapping(value = "/booking",
                 consumes = MediaType.APPLICATION_JSON_VALUE,
                 produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity postBookingInfo(@RequestBody BookingRequestDTO bookingRequestDTO) {
        return new ResponseEntity(bookingService.postBookingInfo(bookingRequestDTO), HttpStatus.CREATED);
    }
    @PostMapping(value = "/booking/{bookingId}/transaction"
               , produces = MediaType.APPLICATION_JSON_VALUE
               , consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity postPaymentInfo(@PathVariable(name = "bookingId") int bookingId
                                        , @RequestBody PaymentRequestDTO transaction) {
        return new ResponseEntity(bookingService.postPaymentInfo(bookingId, transaction), HttpStatus.CREATED);
    }
}
