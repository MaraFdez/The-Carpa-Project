package com.ironhack.finalProject.fileService.dao;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor

@Entity
@Table(name = "files")
public class File {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    private String type;

    @Lob // LOB is datatype for storing large object data
    private byte[] data;

    public File(String name, String type, byte[] data) {
        setName(name);
        setType(type);
        setData(data);
    }
}
