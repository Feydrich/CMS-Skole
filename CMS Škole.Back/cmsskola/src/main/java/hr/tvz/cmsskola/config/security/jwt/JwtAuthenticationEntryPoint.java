package hr.tvz.cmsskola.config.security.jwt;

import static org.springframework.http.HttpStatus.UNAUTHORIZED;

import com.fasterxml.jackson.databind.ObjectMapper;
import hr.tvz.cmsskola.config.security.error.ApiError;
import java.io.IOException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.converter.HttpMessageConverter;
import org.springframework.http.server.ServerHttpResponse;
import org.springframework.http.server.ServletServerHttpResponse;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class JwtAuthenticationEntryPoint implements AuthenticationEntryPoint {

  private final HttpMessageConverter<String> messageConverter;
  private final ObjectMapper mapper;

  @Override
  public void commence(
      HttpServletRequest httpServletRequest,
      HttpServletResponse httpServletResponse,
      AuthenticationException e)
      throws IOException {
    ApiError apiError = new ApiError(UNAUTHORIZED);
    apiError.setMessage(e.getMessage());
    apiError.setDebugMessage(e.getMessage());

    ServerHttpResponse outputMessage = new ServletServerHttpResponse(httpServletResponse);
    outputMessage.setStatusCode(HttpStatus.UNAUTHORIZED);

    messageConverter.write(
        mapper.writeValueAsString(apiError), MediaType.APPLICATION_JSON, outputMessage);
  }
}
