package com.example.BookingService.services;

import com.example.BookingService.dtos.BookingRequestDTO;
import com.example.BookingService.dtos.BookingResponseDTO;
import com.example.BookingService.dtos.PaymentRequestDTO;


public interface BookingService  {
    public BookingResponseDTO postBookingInfo(BookingRequestDTO bookingRequestDTO);

    public BookingResponseDTO postPaymentInfo(int bookingId, PaymentRequestDTO paymentRequestDTO);

}
