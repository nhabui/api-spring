package pru.nhabt.backendapi.service;

import pru.nhabt.backendapi.dto.PatchingDto;

import java.util.List;

public interface PatchingService {

    PatchingDto addPatching(PatchingDto patchingDto);

    PatchingDto getPatching(Long id);

    List<PatchingDto> getAllPatching();

    PatchingDto updatePatching(PatchingDto patchingDto, Long id);

    void deletePatching(Long id);

    PatchingDto completePatching(Long id);

    PatchingDto inCompletePatching(Long id);
}
