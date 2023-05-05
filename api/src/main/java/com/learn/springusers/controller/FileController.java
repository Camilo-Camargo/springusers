package com.learn.springusers.controller;

import java.io.IOException;
import java.net.URLConnection;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.util.AntPathMatcher;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.bind.annotation.ResponseBody;

import com.learn.springusers.services.FileService;

import jakarta.servlet.http.HttpServletRequest;

@RestController
public class FileController {
    @Autowired
    private FileService fileService;

    @GetMapping("/upload-dir/**/{filename:.+}")
    @ResponseBody
    public ResponseEntity<Resource> serveFile(
            @PathVariable String filename,
            HttpServletRequest request) {
        String directoryPath = new AntPathMatcher().extractPathWithinPattern("/files/**/{filename:.+}",
                request.getRequestURI());
        Resource file = fileService.loadFile(directoryPath);
        String contentType = URLConnection.guessContentTypeFromName(file.getFilename());

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.parseMediaType(contentType));
        return ResponseEntity.ok().headers(headers).body(file);
    }

    @PostMapping("/upload-dir/**/{file:.+}")
    public void saveFile(
            @PathVariable MultipartFile file,
            HttpServletRequest request) {
        // TODO: fix extract pathWithPattern
        String directoryPath = new AntPathMatcher().extractPathWithinPattern("/shared/**/{file:.+}",
                request.getRequestURI());

        try {
            fileService.saveFile(file, directoryPath);
        } catch (IOException e) {
            System.out.println(e);

        }
    }

}
