package com.ferick.testerstraining.model.dto

interface TestCaseData

data class LoginFormTestCaseData(
    val username: String,
    val password: String
) : TestCaseData
