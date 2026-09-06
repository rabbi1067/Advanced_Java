package com.example.demo;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class StudentForm {
    private String name;
    private int age;
    private double cgpa;
}
