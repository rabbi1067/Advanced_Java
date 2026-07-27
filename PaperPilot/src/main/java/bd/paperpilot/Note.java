package bd.paperpilot;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "notes")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Note {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    @Column(name = "content", columnDefinition = "TEXT")
    private String content;
    @Column(name = "created_at")
    private LocalDateTime createdAt = LocalDateTime.now();
    @ElementCollection
    @CollectionTable(
            name = "note_tags",
            joinColumns = @JoinColumn(name = "note_id")
    )
    @Column(name = "tag")
    private List<String> tags = new ArrayList<>();




}
