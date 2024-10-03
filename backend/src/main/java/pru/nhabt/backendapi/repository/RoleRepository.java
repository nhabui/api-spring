package pru.nhabt.backendapi.repository;

import pru.nhabt.backendapi.entity.Role;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RoleRepository extends JpaRepository<Role, Long> {

    Role findByName(String name);
}
