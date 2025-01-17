package br.com.rdtecnologia.filehandler.model;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "LOGIN_PAPEL")
public class Papel {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name = "ID")
  private Integer id;

  @Column(name = "NOME")
  private String nome;

  @Column(name = "CODIGO")
  private String codigo;

  @Transient
  private Boolean ativo;

}