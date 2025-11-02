package com.greenroots.repository;

import com.greenroots.model.TreeRecord;
import com.greenroots.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface TreeRepository extends JpaRepository<TreeRecord, Long> {
    List<TreeRecord> findByUser(User user);
}
