package com.example.BookingService.aspect;

import com.example.BookingService.dao.BookingDAO;
import com.example.BookingService.dtos.PaymentRequestDTO;
import com.example.BookingService.entities.BookingInfoEntity;
import com.example.BookingService.exceptions.InvalidBookingIdException;
import com.example.BookingService.exceptions.InvalidPaymentModeException;
import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Before;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import java.util.Optional;

@Aspect
@Component
public class PostPaymentAspect {

    @Autowired
    BookingDAO bookingDAO;

    @Before(value = "execution(* com.example.BookingService.services.BookingServiceImple.postPaymentInfo(..)) && args(bookingId, paymentRequestDTO)")
    public void beforeAdvice(JoinPoint joinPoint, int bookingId, PaymentRequestDTO paymentRequestDTO){
        //Checking the validity of mode of payment:
        if (!(paymentRequestDTO.getPaymentMode().equals("CARD")||
                paymentRequestDTO.getPaymentMode().equals("UPI"))) {
            throw new InvalidPaymentModeException("Invalid Mode Of Payment");
        }
        //Checking the validity of the booking ID:
        Optional<BookingInfoEntity> bookingInfoEntity = bookingDAO.findById(bookingId);
        if (!bookingInfoEntity.isPresent()) throw new InvalidBookingIdException("Invalid Booking Id");
    }
}
