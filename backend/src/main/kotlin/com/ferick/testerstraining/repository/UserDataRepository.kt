package com.ferick.testerstraining.repository

import com.ferick.testerstraining.model.db.entity.UserData
import org.springframework.data.jpa.repository.JpaRepository

interface UserDataRepository : JpaRepository<UserData, Long> {
    fun existsByUserId(userId: String): Boolean
    fun findByUserId(userId: String): UserData?
}
