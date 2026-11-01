
package com.klef.soa.docker.dto;

import lombok.Data;

@Data
public class ArtGalleryResponseDTO {

    private Long id;
    private String galleryName;
    private String city;
    private String artStyle;
    private Double entryFee;
}
