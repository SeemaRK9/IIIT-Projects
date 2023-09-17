package com.example.BookingService.dtos;

import java.util.Date;

public class BookingRequestDTO {
    private Date fromDate;
    private Date toDate;
    private String aadharNumber;
    private int numOfRooms;

    public Date getFromDate() {
        return fromDate;
    }

    public void setFromDate(Date fromDate) {
        this.fromDate = fromDate;
    }

    public Date getToDate() {
        return toDate;
    }

    public void setToDate(Date toDate) {
        this.toDate = toDate;
    }

    public String getAadharNumber() {
        return aadharNumber;
    }

    public void setAadharNumber(String aadharNumber) {
        this.aadharNumber = aadharNumber;
    }

    public int getNumOfRooms() {
        return numOfRooms;
    }

    public void setNumOfRooms(int numberOfRooms) {
        this.numOfRooms = numberOfRooms;
    }
}
