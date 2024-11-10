package com.ferick.testerstraining.service.cases

import com.ferick.testerstraining.model.dto.TestCaseRequest

interface TestCase {
    val type: TestCaseType
    fun match(request: TestCaseRequest): Boolean
}

enum class TestCaseType {
    POSITIVE, NEGATIVE
}
