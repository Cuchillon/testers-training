package com.ferick.testerstraining.service.cases

import com.ferick.testerstraining.model.dto.TestCaseData

interface TestCase {
    val type: TestCaseType
    fun match(expected: TestCaseData, actual: TestCaseData): Boolean
}

enum class TestCaseType {
    POSITIVE, NEGATIVE
}
