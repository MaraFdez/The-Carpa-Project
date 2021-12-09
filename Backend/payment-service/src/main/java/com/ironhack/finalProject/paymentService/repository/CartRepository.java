package com.ironhack.finalProject.paymentService.repository;

import com.ironhack.finalProject.paymentService.dao.Cart;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CartRepository extends JpaRepository<Cart, Long> {
}
