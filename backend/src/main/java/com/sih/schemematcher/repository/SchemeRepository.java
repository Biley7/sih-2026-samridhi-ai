package com.sih.schemematcher.repository;

import com.sih.schemematcher.entity.Scheme;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.math.BigDecimal;
import java.util.List;

@Repository
public interface SchemeRepository extends JpaRepository<Scheme, Long> {

    @Query("SELECT s FROM Scheme s WHERE " +
           ":income <= s.maxIncome AND " +
           ":cost >= s.minCost AND :cost <= s.maxCost")
    List<Scheme> findEligibleSchemes(
        @Param("income") BigDecimal income, 
        @Param("cost") BigDecimal cost
    );
}