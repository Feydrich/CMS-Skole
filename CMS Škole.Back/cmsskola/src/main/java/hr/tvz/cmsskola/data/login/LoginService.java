package hr.tvz.cmsskola.data.login;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class LoginService {

  @Autowired public UserRepository userRepository;
}
