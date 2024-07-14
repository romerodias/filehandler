package br.com.rdtecnologia.filehandler.controller;

import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;
import org.apache.tomcat.util.http.fileupload.IOUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;

import java.io.File;
import java.io.FileInputStream;
import java.io.InputStream;


public abstract class BaseController {
    @Autowired private HttpSession session;

    protected String getUserContractId() {
        return session.getAttribute("contractId").toString();
    }

    public UserDetails getUserSessionDetails() {
        return (UserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
    }

    protected void makeDownload(HttpServletResponse response, File fileToDownload) {
        try {
            InputStream inputStream = new FileInputStream(fileToDownload);
            response.setContentType("application/force-download");
            response.setHeader("Content-Transfer-Encoding", "binary");
            response.setHeader("Content-Length", String.valueOf(fileToDownload.length()));
            response.setHeader("Content-Disposition", "attachment; filename=" + fileToDownload.getName());
            IOUtils.copy(inputStream, response.getOutputStream());
            response.flushBuffer();
            inputStream.close();
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
