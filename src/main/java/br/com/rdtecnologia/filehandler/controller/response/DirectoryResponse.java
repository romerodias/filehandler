package br.com.rdtecnologia.filehandler.controller.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@Builder
@NoArgsConstructor
public class DirectoryResponse {
    private String text;
    private String cls = "folder";
    private String id;
    private Boolean leaf;
    private String iconCls;
}
