package com.example.PaymentService.controllers;

import com.example.PaymentService.dtos.TransactionDetailsDTO;
import com.example.PaymentService.services.interfaces.TransactionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

//Controller for the payment service of Sweet Home
@RestController
public class TransactionsController {

    @Autowired
    TransactionService transactionService;

    @PostMapping(value = "/transaction")
    public ResponseEntity<Integer> postPaymentTransaction(@RequestBody TransactionDetailsDTO transactionDetailsDTO){
        int transactionId = transactionService.postTransaction(transactionDetailsDTO);
        return new ResponseEntity<>(transactionId,HttpStatus.CREATED);
    }
    @GetMapping(value = "/transaction/{transactionId}")
    public ResponseEntity<TransactionDetailsDTO> getPaymentTransaction(@PathVariable(name = "transactionId") int transactionId) {
        TransactionDetailsDTO transactionDetailsDTO = transactionService.getTransaction(transactionId);
        return new ResponseEntity<>(transactionDetailsDTO, HttpStatus.OK);
    }
}
