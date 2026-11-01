
package com.klef.soa.docker.dto;

import lombok.Data;
import jakarta.validation.constraints.*;

@Data
public class ArtGalleryRequestDTO {

    @NotBlank(message = "Gallery name is required")
    private String galleryName;

    @NotBlank(message = "City is required")
    private String city;

    @NotBlank(message = "Art style is required")
    private String artStyle;

    @NotNull(message = "Entry fee is required")
    @DecimalMin(value = "0.0", message = "Entry fee cannot be negative")
    private Double entryFee;
}
