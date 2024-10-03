package pru.nhabt.backendapi.controller;

import lombok.AllArgsConstructor;
import pru.nhabt.backendapi.dto.PatchingDto;
import pru.nhabt.backendapi.service.PatchingService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin("*")
@RestController
@RequestMapping("api/patching")
@AllArgsConstructor
public class PatchingController {

    private PatchingService patchingService;

    // Build Add Patching REST API
    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping
    public ResponseEntity<PatchingDto> addPatching(@RequestBody PatchingDto patchingDto) {

        PatchingDto savedPatching = patchingService.addPatching(patchingDto);

        return new ResponseEntity<>(savedPatching, HttpStatus.CREATED);
    }

    // Build Get Patching REST API
    @PreAuthorize("hasAnyRole('ADMIN','USER')")
    @GetMapping("{id}")
    public ResponseEntity<PatchingDto> getTodo(@PathVariable("id") Long patchingId) {
        PatchingDto patchingDto = patchingService.getPatching(patchingId);
        return new ResponseEntity<>(patchingDto, HttpStatus.OK);
    }

    // Build Get All Todos REST API
    @PreAuthorize("hasAnyRole('ADMIN','USER')")
    @GetMapping
    public ResponseEntity<List<PatchingDto>> getAllPatchings() {
        List<PatchingDto> patchings = patchingService.getAllPatching();
        //return new ResponseEntity<>(todos, HttpStatus.OK);
        return ResponseEntity.ok(patchings);
    }

    // Build Update Patching REST API
    @PreAuthorize("hasRole('ADMIN')")
    @PutMapping("{id}")
    public ResponseEntity<PatchingDto> updatePatching(@RequestBody PatchingDto patchingDto, @PathVariable("id") Long patchingId) {
        PatchingDto updatedPatching = patchingService.updatePatching(patchingDto, patchingId);
        return ResponseEntity.ok(updatedPatching);
    }

    // Build Delete Patching REST API
    @PreAuthorize("hasRole('ADMIN')")
    @DeleteMapping("{id}")
    public ResponseEntity<String> deletePatching(@PathVariable("id") Long patchingId) {
        patchingService.deletePatching(patchingId);
        return ResponseEntity.ok("Patching deleted successfully!.");
    }

    // Build Complete Patching REST API
    @PreAuthorize("hasAnyRole('ADMIN','USER')")
    @PatchMapping("{id}/complete")
    public ResponseEntity<PatchingDto> completePatching(@PathVariable("id") Long patchingId) {
        PatchingDto updatedPatching = patchingService.completePatching(patchingId);
        return ResponseEntity.ok(updatedPatching);
    }

    // Build In Complete Patching REST API
    @PreAuthorize("hasAnyRole('ADMIN','USER')")
    @PatchMapping("{id}/in-complete")
    public ResponseEntity<PatchingDto> inCompletePatching(@PathVariable("id") Long patchingId) {
        PatchingDto updatedPatching = patchingService.inCompletePatching(patchingId);
        return ResponseEntity.ok(updatedPatching);
    }
}