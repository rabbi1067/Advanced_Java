package bd.paperpilot;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository  // optional
public interface PaperInterface extends JpaRepository<Paper,Integer> {

}
