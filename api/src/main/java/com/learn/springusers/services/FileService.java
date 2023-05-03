package com.learn.springusers.services;

import java.io.IOException;
import java.io.InputStream;
import java.net.MalformedURLException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@Service
public class FileService {
    private final Path uploadPath;

    @Autowired
    public FileService() {
        this.uploadPath = Paths.get("upload-dir");
    }

    public String saveFile(MultipartFile file, String filename) throws IOException {
        Path absolutePath = uploadPath.resolve(filename);
        InputStream inputStream = file.getInputStream();
        try {
            Files.createDirectories(absolutePath.getParent());
            Files.copy(inputStream, absolutePath, StandardCopyOption.REPLACE_EXISTING);
        } catch (IOException e) {
        }
        return uploadPath.resolve(filename).toString();
    }

    public Resource loadFile(String filename) {
        Path file = uploadPath.resolve(filename);
        Resource resource = null;
        try {
            resource = new UrlResource(file.toUri());
        } catch (MalformedURLException e) {
            System.out.println("Could not read file: " + filename);
        }
        return resource;

    }
}
