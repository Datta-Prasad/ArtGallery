
package com.klef.soa.docker.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "art_gallery")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class ArtGallery {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String galleryName;
    private String city;
    private String artStyle;
    private Double entryFee;
}
