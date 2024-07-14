package br.com.rdtecnologia.filehandler.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "LOGIN_USUARIO")
public class Usuario {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name = "ID")
  @JsonProperty("ID")
  private Integer id;

  @Column(name = "NOME")
  @JsonProperty("NOME")
  private String name;

  @Column(name = "SENHA")
  @JsonProperty("SENHA")
  private String password;

  @Column(name = "active")
  private int active = 1;

  @OneToOne(fetch = FetchType.EAGER)
  @JoinColumn(name = "IDPERFIL")
  private Perfil perfil;

  @ManyToOne
  @JoinColumn(name = "contract_id")
  private SystemContract contract;

}