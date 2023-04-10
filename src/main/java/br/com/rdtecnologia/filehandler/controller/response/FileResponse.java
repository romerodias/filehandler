package br.com.rdtecnologia.filehandler.controller.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@Builder
@NoArgsConstructor
public class FileResponse {
    private String text;
    private String cls = "folder";
    private String id;
    private Boolean leaf;
    private String iconCls;
    private Boolean canWrite;
    private Boolean canRead;
    private Boolean canExecute;
    private String extension;
}
