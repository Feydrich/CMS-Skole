package hr.tvz.cmsskola.data.article;

import com.fasterxml.jackson.annotation.JsonIgnore;
import hr.tvz.cmsskola.data.category.Category;
import hr.tvz.cmsskola.data.image.Image;
import hr.tvz.cmsskola.data.user.User;
import java.time.LocalDateTime;
import java.util.Collection;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.persistence.Transient;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;
import lombok.ToString.Exclude;

@Getter
@Setter
@ToString
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Entity
@Table(name = "article")
public class Article {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name = "id")
  private Long id;

  @ManyToOne
  @JoinColumn(name = "web_page")
  private Category category;

  @ManyToOne
  @JoinColumn(name = "author")
  private User author;

  @OneToMany
  @JoinColumn(name = "article")
  private Collection<Image> images;

  @Transient @Exclude private String html;

  private String title;
  private String description;

  @Column(name = "html_uri")
  @JsonIgnore
  private String htmlUri;
  private LocalDateTime created;
  private LocalDateTime updated;

  @Column(name = "lasts_until")
  private LocalDateTime lastsUnitl;
  private boolean archived;
  private boolean priority;
}
