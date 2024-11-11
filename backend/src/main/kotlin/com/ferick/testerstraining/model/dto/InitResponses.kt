package com.ferick.testerstraining.model.dto

interface InitResponse {
    val userId: String
    val testCasesCheckedCount: Int
}

data class LoginFormInitResponse(
    override val userId: String,
    override val testCasesCheckedCount: Int,
    val username: String,
    val password: String,
) : InitResponse
