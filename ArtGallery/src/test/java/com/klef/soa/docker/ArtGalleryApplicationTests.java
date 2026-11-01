package com.klef.soa.docker;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertTrue;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
class ArtGalleryApplicationTests {

	@Autowired
	private TestRestTemplate restTemplate;

	@Test
	void contextLoads() {
	}

	@Test
	void servesGalleryPageAtRoot() {
		ResponseEntity<String> response = restTemplate.getForEntity("/", String.class);

		assertEquals(200, response.getStatusCode().value());
		assertTrue(response.getHeaders().getContentType().isCompatibleWith(MediaType.TEXT_HTML));
		assertNotNull(response.getBody());
		assertTrue(response.getBody().contains("<title>ArtGallery"));
	}

}
