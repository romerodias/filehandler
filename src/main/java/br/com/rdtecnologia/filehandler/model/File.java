package br.com.rdtecnologia.filehandler.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.GenericGenerator;

@Data
@Entity
@Table(name = "files")
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class File {

  @Id
  @GeneratedValue(generator="system-uuid")
  @GenericGenerator(name="system-uuid", strategy = "uuid")
  private String id;
  private String name;
  private Long size;

}