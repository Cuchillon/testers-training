package com.ferick.testerstraining.model.dto

import com.ferick.testerstraining.service.cases.TestCaseType

interface TestCaseResponse {
    val userId: String
    val testCasesCheckedCount: Int
    val testCaseType: TestCaseType
}

data class LoginFormTestCaseResponse(
    override val userId: String,
    override val testCasesCheckedCount: Int,
    override val testCaseType: TestCaseType,
    val errorMessage: String? = null
) : TestCaseResponse
