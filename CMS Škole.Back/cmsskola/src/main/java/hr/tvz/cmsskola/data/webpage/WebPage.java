package hr.tvz.cmsskola.data.webpage;

import com.fasterxml.jackson.annotation.JsonIgnore;
import hr.tvz.cmsskola.data.article.Article;
import hr.tvz.cmsskola.data.category.Category;
import hr.tvz.cmsskola.data.claim.Claim;
import hr.tvz.cmsskola.data.image.Image;
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
@Table(name = "web_page")
public class WebPage {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name = "id")
  private Long id;

  @Column(name = "html_uri")
  @JsonIgnore
  private String htmlUri;
  private String url;

  @Transient @Exclude private String html;

  @ManyToOne
  @JoinColumn(name = "category")
  private Category category;

  @OneToMany
  @JoinColumn(name = "web_page")
  @JsonIgnore
  @Exclude
  private Collection<Claim> claims;

  @OneToMany
  @JoinColumn(name = "web_page")
  private Collection<Image> images;

  @OneToMany
  @JoinColumn(name = "web_page")
  private Collection<Article> articles;
}
