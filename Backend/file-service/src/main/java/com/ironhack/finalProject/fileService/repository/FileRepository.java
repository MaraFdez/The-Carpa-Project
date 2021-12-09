package com.ironhack.finalProject.fileService.repository;

import com.ironhack.finalProject.fileService.dao.File;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface FileRepository extends JpaRepository<File, Long> {
}
