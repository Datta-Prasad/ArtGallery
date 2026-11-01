
package com.klef.soa.docker.repository;

import com.klef.soa.docker.entity.ArtGallery;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ArtGalleryRepository
        extends JpaRepository<ArtGallery, Long> {
}
