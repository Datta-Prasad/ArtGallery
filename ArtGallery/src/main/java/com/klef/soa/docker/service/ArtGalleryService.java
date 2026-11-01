
package com.klef.soa.docker.service;

import com.klef.soa.docker.dto.ArtGalleryRequestDTO;
import com.klef.soa.docker.dto.ArtGalleryResponseDTO;
import java.util.List;

public interface ArtGalleryService {

    ArtGalleryResponseDTO add(ArtGalleryRequestDTO dto);

    List<ArtGalleryResponseDTO> getAll();

    ArtGalleryResponseDTO getById(Long id);

    ArtGalleryResponseDTO update(Long id, ArtGalleryRequestDTO dto);

    void delete(Long id);
}
