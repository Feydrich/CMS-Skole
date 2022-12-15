package hr.tvz.cmsskola.data.logging;

import com.fasterxml.jackson.annotation.JsonFormat;
import hr.tvz.cmsskola.data.user.User;
import java.io.Serializable;
import java.time.LocalDateTime;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Entity
@Table(name = "log")
public class Log implements Serializable {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name = "id")
  private Long id;

  private String text;

  @JsonFormat(pattern="yyyy-MM-dd'T'HH:mm:ss.SSS'Z'")
  private LocalDateTime tstamp;


  @ManyToOne
  @JoinColumn(name = "user")
  private User user;
}
