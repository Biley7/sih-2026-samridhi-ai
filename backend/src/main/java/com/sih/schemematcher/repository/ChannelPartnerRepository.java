package com.sih.schemematcher.repository;

import com.sih.schemematcher.entity.ChannelPartner;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ChannelPartnerRepository extends JpaRepository<ChannelPartner, Long> {

    @Query(value = "SELECT cp.id, cp.name, cp.type, cp.district, cp.state, cp.latitude, cp.longitude, " +
                   "cp.active_fund_status, cp.npa_rating, " +
                   "(ST_DistanceSphere(cp.location::geometry, ST_MakePoint(:lng, :lat)::geometry) / 1000) AS distance_km " +
                   "FROM channel_partners cp " +
                   "WHERE cp.active_fund_status = true " +
                   "AND (ST_DistanceSphere(cp.location::geometry, ST_MakePoint(:lng, :lat)::geometry) / 1000) <= :radiusKm " +
                   "ORDER BY distance_km ASC", nativeQuery = true)
    List<Object[]> findNearbyPartnersNative(
        @Param("lat") double lat, 
        @Param("lng") double lng, 
        @Param("radiusKm") double radiusKm
    );
}