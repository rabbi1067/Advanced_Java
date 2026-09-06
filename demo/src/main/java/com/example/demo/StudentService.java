package com.example.demo;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class StudentService {
    private final  StudentRepository studentRepository;
    public Student save(StudentSaveDto dto) {
       Student student = Student.builder()
               .name(dto.name())
               .age(dto.age())
               .cgpa(dto.cgpa())
               .build();

               return studentRepository.save(student);
             }

}
