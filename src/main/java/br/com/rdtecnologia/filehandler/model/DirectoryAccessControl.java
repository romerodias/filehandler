package br.com.rdtecnologia.filehandler.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.GenericGenerator;

@Data
@Entity
@Table(name = "direcitory_access_control")
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class DirectoryAccessControl {

  @Id
  @GeneratedValue(generator="system-uuid")
  @GenericGenerator(name="system-uuid", strategy = "uuid")
  private String id;

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "profile_id")
  @JsonIgnore
  private Perfil profile;

  @ManyToOne
  @JoinColumn(name = "directory_id")
  private Directory directory;

  @Column(name = "can_read")
  private Boolean canRead;

  @Column(name = "can_write")
  private Boolean canWrite;

  @Column(name = "can_delete")
  private Boolean canDelete;

  @Override
  public String toString() {
    return "DirectoryAccessControl{" +
            "id='" + id + '\'' +
            ", directory=" + directory +
            ", canRead=" + canRead +
            ", canWrite=" + canWrite +
            ", canDelete=" + canDelete +
            '}';
  }
}