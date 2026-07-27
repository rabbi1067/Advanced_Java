package bd.paperpilot;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@RequiredArgsConstructor
@Service
public class PaperService {

    private final PaperInterface paperInterface;

    public Paper save(Paper paper) {
        if (paper.getPaperTitle() == null || paper.getPaperTitle().isEmpty()) {
            System.out.println("Paper title is required");
            return null;
        }
        return paperInterface.save(paper);
    }

    public List<Paper> findAll() {
        return paperInterface.findAll();
    }

    public Optional<Paper> findById(Integer id) {
        return paperInterface.findById(id);
    }

    public void deleteById(Integer id) {
        paperInterface.deleteById(id);
    }
}