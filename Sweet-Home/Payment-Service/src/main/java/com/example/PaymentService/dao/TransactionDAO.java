package com.example.PaymentService.dao;

import com.example.PaymentService.entity.TransactionDetailsEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TransactionDAO extends JpaRepository<TransactionDetailsEntity,Integer> {
}
