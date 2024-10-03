package pru.nhabt.backendapi.service;

import pru.nhabt.backendapi.dto.JwtAuthResponse;
import pru.nhabt.backendapi.dto.LoginDto;
import pru.nhabt.backendapi.dto.RegisterDto;

public interface AuthService {
    String register(RegisterDto registerDto);

    JwtAuthResponse login(LoginDto loginDto);
}
