package com.example.PaymentService.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import javax.persistence.*;

//Implementing the model class of the payment service of Sweet Home as per the given schema
@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "transaction")
public class TransactionDetailsEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "transactionId")
    private int id;
    @Column(name = "paymentMode")
    private String paymentMode;
    @Column(name = "bookingId", nullable = false)
    private int bookingId;
    @Column(name = "upiId")
    private String upiId;
    @Column(name = "cardNumber")
    private String cardNumber;

    @Override
    public String toString() {
        return "TransactionDetailsEntity{" +
                "id=" + id +
                ", paymentMode='" + paymentMode + '\'' +
                ", bookingId=" + bookingId +
                ", upiId='" + upiId + '\'' +
                ", cardNumber='" + cardNumber + '\'' +
                '}';
    }
}
