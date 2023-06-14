package br.com.rdtecnologia.filehandler.model;


import jakarta.persistence.*;
import lombok.Data;
import java.util.List;

@Data
@Entity
@Table(name = "LOGIN_PERFIL")
public class Perfil {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name = "ID")
  private Integer id;

  @Column(name = "NOME")
   private String nome;

  @ManyToMany
  @JoinTable(
    name = "LOGIN_PERFIL_PAPEL",
    joinColumns = { @JoinColumn(name = "IDPERFIL") },
    inverseJoinColumns = {@JoinColumn(name = "IDPAPEL") }
  )
  private List<Papel> papeis;

  @Column(name = "contract_id")
  private String contractId;

}