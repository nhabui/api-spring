package pru.nhabt.backendapi.repository;

import pru.nhabt.backendapi.entity.Patching;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PatchingRepository extends JpaRepository<Patching, Long> {

}
