package com.example.PaymentService.dtos;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class TransactionDetailsDTO {
    private int id;
    private String paymentMode;
    private int bookingId;
    private String upiId;
    private String cardNumber;

    @Override
    public String toString() {
        return "TransactionDetailsDTO{" +
                "id=" + id +
                ", paymentMode='" + paymentMode + '\'' +
                ", bookingId=" + bookingId +
                ", upiId='" + upiId + '\'' +
                ", cardNumber='" + cardNumber + '\'' +
                '}';
    }
}
