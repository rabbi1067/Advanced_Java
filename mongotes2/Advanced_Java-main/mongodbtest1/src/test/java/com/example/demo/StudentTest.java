package com.example.demo;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
public class StudentTest {
    @Autowired
    private StudentService studentService;

    @Test
    public  void save(){
        StudentSaveDto dto = new StudentSaveDto("Mr Java ",48,3.35);
        Student student = studentService.save(dto);
        Assertions.assertEquals(dto.name(),student.getName());

    }
}
