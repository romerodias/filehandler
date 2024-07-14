package br.com.rdtecnologia.filehandler.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;
import org.hibernate.annotations.GenericGenerator;


@Entity
@Table(name = "system_contract")
@Data
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class SystemContract {
    @Id
    @GeneratedValue(generator = "UUID")
    @GenericGenerator(
        name = "UUID",
        strategy = "org.hibernate.id.UUIDGenerator"
    )
    private String id;
    private String name;
    private String document;

}
