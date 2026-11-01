
package com.klef.soa.docker.service;

import com.klef.soa.docker.dto.ArtGalleryRequestDTO;
import com.klef.soa.docker.dto.ArtGalleryResponseDTO;
import com.klef.soa.docker.entity.ArtGallery;
import com.klef.soa.docker.repository.ArtGalleryRepository;
import com.klef.soa.docker.service.ArtGalleryService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ArtGalleryServiceImpl implements ArtGalleryService {

    private final ArtGalleryRepository repo;

    private ArtGallery toEntity(ArtGalleryRequestDTO dto) {
        ArtGallery a = new ArtGallery();
        a.setGalleryName(dto.getGalleryName());
        a.setCity(dto.getCity());
        a.setArtStyle(dto.getArtStyle());
        a.setEntryFee(dto.getEntryFee());
        return a;
    }

    private ArtGalleryResponseDTO toDTO(ArtGallery a) {
        ArtGalleryResponseDTO dto = new ArtGalleryResponseDTO();
        dto.setId(a.getId());
        dto.setGalleryName(a.getGalleryName());
        dto.setCity(a.getCity());
        dto.setArtStyle(a.getArtStyle());
        dto.setEntryFee(a.getEntryFee());
        return dto;
    }

    @Override
    public ArtGalleryResponseDTO add(ArtGalleryRequestDTO dto) {
        return toDTO(repo.save(toEntity(dto)));
    }

    @Override
    public List<ArtGalleryResponseDTO> getAll() {
        return repo.findAll().stream()
                .map(this::toDTO)
                .toList();
    }

    @Override
    public ArtGalleryResponseDTO getById(Long id) {
        return repo.findById(id)
                .map(this::toDTO)
                .orElse(null);
    }

    @Override
    public ArtGalleryResponseDTO update(Long id, ArtGalleryRequestDTO dto) {
        ArtGallery a = repo.findById(id).orElse(null);

        if (a == null) {
            return null;
        }

        a.setGalleryName(dto.getGalleryName());
        a.setCity(dto.getCity());
        a.setArtStyle(dto.getArtStyle());
        a.setEntryFee(dto.getEntryFee());

        return toDTO(repo.save(a));
    }

    @Override
    public void delete(Long id) {
        repo.deleteById(id);
    }
}
