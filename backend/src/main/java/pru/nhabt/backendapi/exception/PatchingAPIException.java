package pru.nhabt.backendapi.exception;

import lombok.AllArgsConstructor;
import lombok.Getter;
import org.springframework.http.HttpStatus;

@Getter
@AllArgsConstructor
public class PatchingAPIException extends RuntimeException{
    private HttpStatus status;
    private String message;
}
