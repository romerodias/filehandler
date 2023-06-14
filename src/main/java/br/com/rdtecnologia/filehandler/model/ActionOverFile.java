package br.com.rdtecnologia.filehandler.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@Table(name = "actions_over_files")
@Data
@AllArgsConstructor
@Builder
@NoArgsConstructor
public class ActionOverFile {
    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    private Long id;
    private String user;
    private String action;
    private String file;
    @Column(name = "absolute_path")
    private String absolutePath;
    private LocalDateTime date;
}