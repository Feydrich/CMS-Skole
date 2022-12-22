package hr.tvz.cmsskola.data.image;

import hr.tvz.cmsskola.data.article.Article;
import hr.tvz.cmsskola.data.logging.LoggingService;
import java.io.File;
import java.io.IOException;
import java.net.MalformedURLException;
import java.net.URLConnection;
import java.nio.file.Path;
import java.time.LocalDateTime;
import lombok.RequiredArgsConstructor;
import net.bytebuddy.utility.RandomString;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@Service
@RequiredArgsConstructor
public class ImageService {
  private static final Logger logger = LoggerFactory.getLogger(ImageService.class);

  private final ImageRepository imageRepository;
  private final LoggingService loggingService;

  private static final String PATH = "public/images";
  private static final String JPG = ".jpg";

  public ResponseEntity<Resource> getById(Long id) {
    var image = imageRepository.findById(id).orElse(null);
    if (image == null) return ResponseEntity.notFound().build();

    try {
      Path file = Path.of(image.getImageUri());
      Resource resource = new UrlResource(file.toUri());

      if (resource.exists() || resource.isReadable()) {
        var mediaType = URLConnection.guessContentTypeFromName(image.getImageUri());
        return ResponseEntity.ok().contentType(MediaType.parseMediaType(mediaType)).body(resource);
      } else {
        throw new RuntimeException("Could not read the file!");
      }
    } catch (MalformedURLException e) {
      throw new RuntimeException("Error: " + e.getMessage());
    }
  }

  public ResponseEntity<Image> save(Long article, Boolean gallery, MultipartFile file) {
    Image image = new Image();

    if (article != null) {
      image.setArticle(Article.builder().id(article).build());
    }

    image.setGallery(gallery != null ? gallery : false);
    image.setUploaded(LocalDateTime.now());

    logger.info("Trying to save image {}", file.getOriginalFilename());

    String url;
    try {
      url = saveFile(file);
    } catch (IOException e) {
      logger.error(e.getMessage());
      return ResponseEntity.internalServerError().build();
    }
    image.setImageUri(url);

    image = imageRepository.save(image);

    String logText;
    HttpStatus httpStatus;
    if (image.getId() == null) {
      logText = "created image " + image.getImageUri() + " id = " + image.getId();
      httpStatus = HttpStatus.CREATED;
    } else {
      logText = "updated image " + image.getImageUri() + " id = " + image.getId();
      httpStatus = HttpStatus.OK;
    }
    loggingService.log(logger, logText);

    return new ResponseEntity<>(image, httpStatus);
  }

  public void delete(Long id) throws IOException {
    logger.info("Trying to delete image id {}", id);

    var optionalImage = imageRepository.findById(id);
    if (optionalImage.isPresent()) {
      Image image = optionalImage.get();
      File file = new File(image.getImageUri());
      file.delete();

      imageRepository.deleteById(image.getId());
      String logText = "deleted image " + image.getImageUri() + " id= " + image.getId();
      loggingService.log(logger, logText);
    }
  }

  private String saveFile(MultipartFile image) throws IOException {
    makeDir();
    String extention = getExtention(image);
    String rootName = getRootName(image);

    Path path = createNewFile(extention, rootName);
    image.transferTo(path);

    return path.toString();
  }

  private Path createNewFile(String extention, String rootName) throws IOException {
    File newFile;
    Path path;
    do {
      String name = rootName + RandomString.make(8) + "." + extention;
      path = Path.of(PATH, name);

      newFile = path.toFile();
    } while (!newFile.createNewFile());
    return path;
  }

  private String getRootName(MultipartFile image) {
    String rootName;
    if (image.getOriginalFilename() != null) {
      String[] stringParts = image.getOriginalFilename().split("\\.");
      rootName = stringParts[0];
    } else {
      rootName = image.getName();
    }
    return rootName;
  }

  private String getExtention(MultipartFile image) {
    String extention;
    if (image.getOriginalFilename() != null) {
      String[] stringParts = image.getOriginalFilename().split("\\.");
      extention = stringParts[stringParts.length - 1];
    } else {
      extention = JPG;
    }
    return extention;
  }

  private void makeDir() {
    File rootDir = new File(PATH);
    if (!rootDir.isDirectory()) {
      logger.info("making directory {}", PATH);
      rootDir.mkdirs();
    }
  }

  public Page<Image> getGalleyr(Pageable pageable) {
    return imageRepository.findForGallery(pageable);
  }
}
