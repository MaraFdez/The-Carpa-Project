package com.ironhack.finalProject.paymentService.repository;

import com.ironhack.finalProject.paymentService.dao.Item;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ItemRepository extends JpaRepository<Item, Long> {

    Optional<Item> findByProjectName(String projectName);

}
