package hr.tvz.cmsskola.data.file;

import hr.tvz.cmsskola.data.logging.LoggingService;
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
public class FileService {
  private static final Logger logger = LoggerFactory.getLogger(FileService.class);

  private final FileRepository fileRepository;
  private final LoggingService loggingService;

  private static final String PATH = "public/files";

  public ResponseEntity<Resource> getById(Long id) {
    var file = fileRepository.findById(id).orElse(null);
    if (file == null) return ResponseEntity.notFound().build();

    try {
      Path filePath = Path.of(file.getUri());
      Resource resource = new UrlResource(filePath.toUri());

      if (resource.exists() || resource.isReadable()) {
        var mediaType = URLConnection.guessContentTypeFromName(file.getUri());
        return ResponseEntity.ok().contentType(MediaType.parseMediaType(mediaType)).body(resource);
      } else {
        throw new RuntimeException("Could not read the file!");
      }
    } catch (MalformedURLException e) {
      throw new RuntimeException("Error: " + e.getMessage());
    }
  }

  public Page<File> getAll(Pageable pageable) {
    return fileRepository.findAll(pageable);
  }

  public ResponseEntity<File> save(String name, MultipartFile file) {
    File entity = new File();

    entity.setUploaded(LocalDateTime.now());
    if (name == null) name = getRootName(file);
    entity.setName(name);

    logger.info("Trying to save file {}", name);

    String url;
    try {
      url = saveFile(file);
    } catch (IOException e) {
      logger.error(e.getMessage());
      return ResponseEntity.internalServerError().build();
    }
    entity.setUri(url);

    entity = fileRepository.save(entity);

    String logText;
    HttpStatus httpStatus;
    if (entity.getId() == null) {
      logText = "created file " + entity.getUri() + " id = " + entity.getId();
      httpStatus = HttpStatus.CREATED;
    } else {
      logText = "updated file " + entity.getUri() + " id = " + entity.getId();
      httpStatus = HttpStatus.OK;
    }
    loggingService.log(logger, logText);

    return new ResponseEntity<>(entity, httpStatus);
  }

  public void delete(Long id) throws IOException {
    logger.info("Trying to delete file id {}", id);

    var optionalImage = fileRepository.findById(id);
    if (optionalImage.isPresent()) {
      File entity = optionalImage.get();
      java.io.File file = new java.io.File(entity.getUri());
      file.delete();

      fileRepository.deleteById(entity.getId());
      String logText = "deleted file " + entity.getUri() + " id= " + entity.getId();
      loggingService.log(logger, logText);
    }
  }

  private String saveFile(MultipartFile file) throws IOException {
    makeDir();
    String extention = getExtention(file);
    String rootName = getRootName(file);

    Path path = createNewFile(extention, rootName);
    file.transferTo(path);

    return path.toString();
  }

  private Path createNewFile(String extention, String rootName) throws IOException {
    java.io.File newFile;
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
    String extention = null;
    if (image.getOriginalFilename() != null) {
      String[] stringParts = image.getOriginalFilename().split("\\.");
      extention = stringParts[stringParts.length - 1];
    }
    return extention;
  }

  private void makeDir() {
    java.io.File rootDir = new java.io.File(PATH);
    if (!rootDir.isDirectory()) {
      logger.info("making directory {}", PATH);
      rootDir.mkdirs();
    }
  }
}
