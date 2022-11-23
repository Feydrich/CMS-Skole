package hr.tvz.cmsskola.data.image;

import hr.tvz.cmsskola.data.logging.LoggingService;
import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.net.URLConnection;
import java.nio.file.Path;
import lombok.RequiredArgsConstructor;
import net.bytebuddy.utility.RandomString;
import org.modelmapper.ModelMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
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
  private final ModelMapper modelMapper;

  private static final String PATH = "public/images";

  public ResponseEntity<byte[]> getById(Long id) {
    var image = imageRepository.findById(id).orElse(null);
    if (image == null) return ResponseEntity.notFound().build();

    try (InputStream in = getClass().getResourceAsStream(image.getImageUri())) {
      if (in == null) return null;
      var mediaType = URLConnection.guessContentTypeFromName(image.getImageUri());
      return ResponseEntity.ok()
          .contentType(MediaType.parseMediaType(mediaType))
          .body(in.readAllBytes());
    } catch (IOException e) {
      return ResponseEntity.internalServerError().build();
    }
  }

  public ResponseEntity<Image> save(Image image, MultipartFile file) {
    if (image.getId() != null) {
      image = fillWithPrev(image);
    }

    logger.info("Trying to save image {}", image.getImageUri());

    String url;
    try {
      url = saveFile(file);
    } catch (IOException e) {
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
      if (!file.delete()) {
        throw new IOException("unable to delete file");
      }

      imageRepository.deleteById(image.getId());
      String logText = "deleted image " + image.getImageUri() + " id= " + image.getId();
      loggingService.log(logger, logText);
    }
  }

  private Image fillWithPrev(Image entity) {
    var optPrev = imageRepository.findById(entity.getId());
    if (optPrev.isPresent()) {
      var prev = optPrev.get();
      modelMapper.map(entity, prev);
      entity = prev;
    }
    return entity;
  }

  private String saveFile(MultipartFile image) throws IOException {
    String name = image.getOriginalFilename() + RandomString.make(8) + "." + image.getContentType();
    Path path = Path.of(PATH, name);

    makeDir();
    if (!path.toFile().createNewFile()) {
      throw new IOException("unable to create file");
    }
    File newFile = path.toFile();
    image.transferTo(newFile);

    if (!newFile.createNewFile()) {
      throw new IOException("unable to create file");
    }

    return path.toString();
  }

  private void makeDir() {
    File rootDir = new File(PATH);
    if (!rootDir.isDirectory()) {
      logger.info("making directory {}", PATH);
      rootDir.mkdirs();
    }
  }
}
