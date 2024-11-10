package com.ferick.testerstraining.model.dto

interface TestCaseRequest

data class LoginFormTestCaseRequest(
    val userId: String,
    val username: String,
    val password: String
) : TestCaseRequest
