
package com.klef.soa.docker.controller;

import com.klef.soa.docker.dto.ArtGalleryRequestDTO;
import com.klef.soa.docker.dto.ArtGalleryResponseDTO;
import com.klef.soa.docker.service.ArtGalleryService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/galleries")
@RequiredArgsConstructor
public class ArtGalleryController {

    private final ArtGalleryService service;

    @PostMapping
    public ResponseEntity<ArtGalleryResponseDTO> add(
            @Valid @RequestBody ArtGalleryRequestDTO dto) {
        return ResponseEntity.status(201).body(service.add(dto));
    }

    @GetMapping
    public List<ArtGalleryResponseDTO> getAll() {
        return service.getAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<ArtGalleryResponseDTO> getById(
            @PathVariable Long id) {
        ArtGalleryResponseDTO dto = service.getById(id);

        if (dto == null) {
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.ok(dto);
    }

    @PutMapping("/{id}")
    public ResponseEntity<ArtGalleryResponseDTO> update(
            @PathVariable Long id,
            @Valid @RequestBody ArtGalleryRequestDTO dto) {
        ArtGalleryResponseDTO result = service.update(id, dto);

        if (result == null) {
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.ok(result);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        if (service.getById(id) == null) {
            return ResponseEntity.notFound().build();
        }

        service.delete(id);
        return ResponseEntity.noContent().build();
    }
}
