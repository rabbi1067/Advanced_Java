package com.example.demo;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;

@Controller
@RequiredArgsConstructor
public class StudentController {

    private final StudentRepository studentRepository;
    private final StudentService studentService;

    // Single page: form (left) + list (right)
    @GetMapping("/")
    public String home(Model model) {
        model.addAttribute("students", studentRepository.findAll());
        model.addAttribute("studentDto", new StudentForm());
        return "index"; // -> templates/index.html
    }

    @PostMapping("/save")
    public String save(@ModelAttribute StudentForm studentDto) {
        studentService.save(new StudentSaveDto(
                studentDto.getName(),
                studentDto.getAge(),
                studentDto.getCgpa()
        ));
        return "redirect:/";
    }
}
