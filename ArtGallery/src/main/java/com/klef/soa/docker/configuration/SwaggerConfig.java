
package com.klef.soa.docker.configuration;

import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class SwaggerConfig {

    @Bean
    public OpenAPI artGalleryAPI() {
        return new OpenAPI()
                .info(new Info()
                        .title("ArtGallery API")
                        .version("1.0")
                        .description("ArtGallery Management System"));
    }
}
