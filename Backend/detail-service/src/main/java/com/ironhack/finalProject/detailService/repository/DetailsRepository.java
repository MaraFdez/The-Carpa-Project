package com.ironhack.finalProject.detailService.repository;

import com.ironhack.finalProject.detailService.dao.Details;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface DetailsRepository extends JpaRepository<Details, Long> {
}
