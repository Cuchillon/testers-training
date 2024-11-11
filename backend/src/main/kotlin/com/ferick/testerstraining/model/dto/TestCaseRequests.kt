package com.ferick.testerstraining.model.dto

interface TestCaseRequest {
    val userId: String
    val testCaseData: TestCaseData
}

data class LoginFormTestCaseRequest(
    override val userId: String,
    override val testCaseData: LoginFormTestCaseData
) : TestCaseRequest
