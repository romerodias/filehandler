package br.com.rdtecnologia.filehandler.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.GenericGenerator;

import java.time.LocalDateTime;

@Data
@Entity
@Table(name = "directories")
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Directory {

  @Id
  @GeneratedValue(generator="system-uuid")
  @GenericGenerator(name="system-uuid", strategy = "uuid")
  private String id;
  private String parent;
  @Column(name = "tenant_id")
  private String tenantId;
  private String name;
  private String path;
  @Column(name = "created_at")
  private LocalDateTime createdAt;

}