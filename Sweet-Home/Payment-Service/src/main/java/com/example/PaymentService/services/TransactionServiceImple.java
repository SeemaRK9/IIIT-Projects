package com.example.PaymentService.services;

import com.example.PaymentService.dao.TransactionDAO;
import com.example.PaymentService.dtos.TransactionDetailsDTO;
import com.example.PaymentService.entity.TransactionDetailsEntity;
import com.example.PaymentService.services.interfaces.TransactionService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class TransactionServiceImple implements TransactionService {
    @Autowired
    private ModelMapper modelMapper;

    @Autowired
    private TransactionDAO transactionDAO;

    @Override
    public int postTransaction(TransactionDetailsDTO transactionDetailsDTO) {
        TransactionDetailsEntity transactionDetails = modelMapper.map(transactionDetailsDTO, TransactionDetailsEntity.class);
        TransactionDetailsEntity savedTransactionDetailsEntity = transactionDAO.save(transactionDetails);
        return savedTransactionDetailsEntity.getId();
    }

    @Override
    public TransactionDetailsDTO getTransaction(int transactionId) {
        Optional<TransactionDetailsEntity> transactionDetailsEntity = transactionDAO.findById(transactionId);
        if (!transactionDetailsEntity.isPresent()) throw new RuntimeException('\n' + "Booking details for payment with Transaction ID " + transactionId + " not found" + '\n');
        TransactionDetailsDTO responseTransaction = modelMapper.map(transactionDetailsEntity,TransactionDetailsDTO.class);
        return modelMapper.map(transactionDetailsEntity.get(), TransactionDetailsDTO.class);
    }
}
