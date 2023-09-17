package com.example.BookingService.services;

import com.example.BookingService.dao.BookingDAO;
import com.example.BookingService.dtos.BookingRequestDTO;
import com.example.BookingService.dtos.BookingResponseDTO;
import com.example.BookingService.dtos.PaymentRequestDTO;
import com.example.BookingService.entities.BookingInfoEntity;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import java.util.ArrayList;
import java.util.Date;
import java.util.Random;
import java.util.concurrent.TimeUnit;

@Service
public class BookingServiceImple implements BookingService {

    @Autowired
    ModelMapper modelMapper;

    @Autowired
    private BookingDAO bookingDAO;

    @Autowired
    private RestTemplate restTemplate;

    @Value("${apiGateway.baseUrl}")
    String apiGatewayBaseUrl;

    @Override
    public BookingResponseDTO postBookingInfo(BookingRequestDTO bookingRequestDTO) {
        // Getting the number of rooms
        int numOfRooms = bookingRequestDTO.getNumOfRooms();

        //Getting the number of days of stay
        Date toDate = bookingRequestDTO.getToDate();
        Date fromDate = bookingRequestDTO.getFromDate();
        long diffInMilliSeconds = Math.abs(toDate.getTime() - fromDate.getTime());
        long numOfDays = TimeUnit.DAYS.convert(diffInMilliSeconds, TimeUnit.MILLISECONDS);

        // Dealing with edge cases during booking rooms and selecting the dates for the stay
        if (numOfRooms <= 0)  throw new RuntimeException("Number of rooms requested must be greater than 0.");
        if (numOfDays<=0) throw  new RuntimeException("To-date must be greater than From-date");

        // Constructing string of room numbers from list of room numbers
        String roomNumbers = "";
        ArrayList<String> bookedRooms = getRandomNumbers(numOfRooms);
        for(int i = 1; i <= bookedRooms.size();i++) {
            roomNumbers += bookedRooms.get(i-1);
            if(i!=bookedRooms.size())
                roomNumbers+=",";
        }
        // Computing the room price based on the input
        double roomPrice = (double)(1000 * numOfRooms * numOfDays);

        // Setting DTO value responses
        BookingResponseDTO bookingResponseDTO = new BookingResponseDTO();
        bookingResponseDTO.setFromDate(fromDate);
        bookingResponseDTO.setToDate(toDate);
        bookingResponseDTO.setAadharNumber(bookingRequestDTO.getAadharNumber());
        bookingResponseDTO.setNumOfRooms(numOfRooms);
        bookingResponseDTO.setRoomNumbers(roomNumbers);
        bookingResponseDTO.setRoomPrice(roomPrice);
        bookingResponseDTO.setBookedOn(new Date());

        // Mapping DTO response to the booking entity, saving it in the database, and returning the DTO response
        BookingInfoEntity bookingInfoEntity = modelMapper.map(bookingResponseDTO,BookingInfoEntity.class);
        BookingInfoEntity savedBookingInfoEntity = bookingDAO.save(bookingInfoEntity);
        return modelMapper.map(savedBookingInfoEntity, BookingResponseDTO.class);
    }

    private ArrayList<String> getRandomNumbers(int count){
        Random rand = new Random();
        int upperBound = 100;
        ArrayList<String>numberList = new ArrayList<>();

        for (int i=0; i<count; i++) numberList.add(String.valueOf(rand.nextInt(upperBound)));
        return numberList;
    }
    @Override
    public BookingResponseDTO postPaymentInfo(int bookingId, PaymentRequestDTO paymentRequestDTO) {
        //AOP approach to handle the invalid booking ID and payment mode type done before rest of the logic

        //Retrieving transaction id by calling payment service:
        String paymentServiceUrl = apiGatewayBaseUrl + "/payment/transaction";
        int transactionId = restTemplate.postForObject(paymentServiceUrl, paymentRequestDTO, Integer.class);

        //updating transaction ID on the booking
        BookingInfoEntity bookingInfoEntity = bookingDAO.getById(bookingId);
        bookingInfoEntity.setTransactionId(transactionId);
        BookingInfoEntity savedBookingInfoEntity = bookingDAO.save(bookingInfoEntity);

        // Printing the confirmation message on successful booking
        String message = "Booking confirmed for user with aadhaar number: "
                + savedBookingInfoEntity.getAadharNumber()
                +    "    |    "
                + "Here are the booking details:    " + savedBookingInfoEntity.toString();
        System.out.println(message);


        BookingResponseDTO bookingResponseDTO = modelMapper.map(savedBookingInfoEntity, BookingResponseDTO.class);
        return bookingResponseDTO;
    }

}
