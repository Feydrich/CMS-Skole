package hr.tvz.cmsskola.data.common;

import hr.tvz.cmsskola.data.article.Article;
import hr.tvz.cmsskola.data.article.ArticleRepository;
import hr.tvz.cmsskola.data.image.Image;
import hr.tvz.cmsskola.data.image.ImageRepository;
import hr.tvz.cmsskola.data.user.User;
import hr.tvz.cmsskola.data.user.UserRepository;
import java.util.List;
import java.util.Optional;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthenticationService {

  private final UserRepository userRepository;
  private final ArticleRepository articleRepository;
  private final ImageRepository imageRepository;

  private final List<AuthType> ADMIN_AUTH_TYPES = List.of(
      AuthType.ARTICLE,
      AuthType.IMAGE,
      AuthType.BANNER,
      AuthType.CATEGORY,
      AuthType.FILE
  );

  private enum Role {
    SUPERADMIN,
    ADMIN,
    PROFESOR
  }

  public boolean checkAuthorize(AuthType authType, Long id) {
    SecurityContext securityContext = SecurityContextHolder.getContext();
    Authentication authentication = securityContext.getAuthentication();
    if (authentication == null || !authentication.isAuthenticated()) return false;

    GrantedAuthority authority = authentication.getAuthorities().stream().toList().get(0);
    if (Role.SUPERADMIN.name().equalsIgnoreCase(authority.getAuthority())) {
      return true;
    }

    if (Role.ADMIN.name().equalsIgnoreCase(authority.getAuthority())) {
      if (authType == null) return false;
      return ADMIN_AUTH_TYPES.contains(authType);
    }

    if (Role.PROFESOR.name().equalsIgnoreCase(authority.getAuthority())) {
      try {
        String username = ((org.springframework.security.core.userdetails.User) authentication.getPrincipal()).getUsername();
        return checkSelfEdit(username, authType, id);
      } catch (ClassCastException ignored) {}
    }
    return false;
  }

  private boolean checkSelfEdit(String username, AuthType authType, Long id) {
    User user = userRepository.findByUsername(username).orElse(null);
    if (user == null) return false;

    switch(authType) {
      case USER -> {
        return user.getId().equals(id);
      }
      case ARTICLE -> {
        return isArticleAuthor(id, user);
      }
      case IMAGE -> {
        if (id == null) return true;

        Optional<Image> optionalImage = imageRepository.findById(id);
        if (optionalImage.isPresent()) {
          Article imageArticle = optionalImage.get().getArticle();
          if (imageArticle == null) return true;

          isArticleAuthor(imageArticle.getId(), user);
        }
        return false;
      }
      default -> {
        return false;
      }
    }
  }

  private boolean isArticleAuthor(Long id, User user) {
    if (id == null) return true;

    Optional<Article> optionalArticle = articleRepository.findById(id);
    return optionalArticle.map(article -> article.getAuthor().getId().equals(user.getId()))
        .orElse(false);
  }
}

