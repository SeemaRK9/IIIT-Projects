package com.example.PaymentService.services.interfaces;

import com.example.PaymentService.dtos.TransactionDetailsDTO;
import com.example.PaymentService.entity.TransactionDetailsEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TransactionService  {
    public int postTransaction(TransactionDetailsDTO transactionDetailsEntity);

    public TransactionDetailsDTO getTransaction(int transactionId);
}
