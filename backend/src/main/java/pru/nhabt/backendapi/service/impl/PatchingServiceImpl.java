package pru.nhabt.backendapi.service.impl;

import lombok.AllArgsConstructor;
import pru.nhabt.backendapi.dto.PatchingDto;
import pru.nhabt.backendapi.entity.Patching;
import pru.nhabt.backendapi.exception.ResourceNotFoundException;
import pru.nhabt.backendapi.repository.PatchingRepository;
import pru.nhabt.backendapi.service.PatchingService;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class PatchingServiceImpl implements PatchingService {

    private PatchingRepository patchingRepository;

    private ModelMapper modelMapper;

    @Override
    public PatchingDto addPatching(PatchingDto patchingDto) {

        // convert PatchingDto into Patching Jpa entity
        Patching patching = modelMapper.map(patchingDto, Patching.class);

        // Patching Jpa entity
        Patching savedPatching = patchingRepository.save(patching);

        // Convert saved Patching Jpa entity object into PatchingDto object

        PatchingDto savedPatchingDto = modelMapper.map(savedPatching, PatchingDto.class);

        return savedPatchingDto;
    }

    @Override
    public PatchingDto getPatching(Long id) {

        Patching patching = patchingRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Patching not found with id:" + id));

        return modelMapper.map(patching, PatchingDto.class);
    }

    @Override
    public List<PatchingDto> getAllPatching() {

        List<Patching> patchings = patchingRepository.findAll();

        return patchings.stream().map((patching) -> modelMapper.map(patching, PatchingDto.class))
                .collect(Collectors.toList());
    }

    @Override
    public PatchingDto updatePatching(PatchingDto pachingDto, Long id) {

         Patching patching = patchingRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Patching not found with id : " + id));
         patching.setTitle(pachingDto.getTitle());
         patching.setDescription(pachingDto.getDescription());
         patching.setCompleted(pachingDto.isCompleted());

         Patching updatedPatching = patchingRepository.save(patching);

        return modelMapper.map(updatedPatching, PatchingDto.class);
    }

    @Override
    public void deletePatching(Long id) {

        Patching patching = patchingRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Patching not found with id : " + id));

        patchingRepository.deleteById(id);
    }

    @Override
    public PatchingDto completePatching(Long id) {

        Patching patching = patchingRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Patching not found with id : " + id));

        patching.setCompleted(Boolean.TRUE);

        Patching updatedPatching = patchingRepository.save(patching);

        return modelMapper.map(updatedPatching, PatchingDto.class);
    }

    @Override
    public PatchingDto inCompletePatching(Long id) {

        Patching patching = patchingRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Patching not found with id : " + id));

        patching.setCompleted(Boolean.FALSE);

        Patching updatedPatching = patchingRepository.save(patching);

        return modelMapper.map(updatedPatching, PatchingDto.class);
    }
}