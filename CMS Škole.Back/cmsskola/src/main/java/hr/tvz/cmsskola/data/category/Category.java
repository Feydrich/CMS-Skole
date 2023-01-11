package hr.tvz.cmsskola.data.category;

import com.fasterxml.jackson.annotation.JsonIgnore;
import hr.tvz.cmsskola.data.article.Article;
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
@Table(name = "category")
public class Category {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name = "id")
  private Long id;

  private String name;

  @ManyToOne
  @JoinColumn(name = "supercategory")
  private Category superCategory;

  @Transient private Collection<Category> subCategories;

  @OneToMany
  @JoinColumn(name = "category")
  @JsonIgnore
  @Exclude
  private Collection<Article> categoryArticles;
}
