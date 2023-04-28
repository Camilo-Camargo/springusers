package com.learn.springusers.services;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;

import org.springframework.stereotype.Service;

@Service
public class FileService {
    public void saveFile(byte[] bytes, String path) throws IOException{
        String relativePath  = "src/main/resources/static/"+path;
        File file = new File(relativePath);
        Files.createDirectory(file.getParentFile().toPath());
        Files.write(file.toPath(), bytes);
    }
}
