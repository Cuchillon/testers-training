package com.ferick.testerstraining.service.cases

import com.ferick.testerstraining.model.dto.TestCaseRequest

enum class LoginFormTestCase(override val type: TestCaseType) : TestCase {
    CORRECT_CORRECT(TestCaseType.POSITIVE) {
        override fun match(request: TestCaseRequest): Boolean {
            TODO("Not yet implemented")
        }
    },
    EMPTY_EMPTY(TestCaseType.NEGATIVE) {
        override fun match(request: TestCaseRequest): Boolean {
            TODO("Not yet implemented")
        }
    },
    EMPTY_CORRECT(TestCaseType.NEGATIVE) {
        override fun match(request: TestCaseRequest): Boolean {
            TODO("Not yet implemented")
        }
    },
    EMPTY_WRONG(TestCaseType.NEGATIVE) {
        override fun match(request: TestCaseRequest): Boolean {
            TODO("Not yet implemented")
        }
    },
    CORRECT_EMPTY(TestCaseType.NEGATIVE) {
        override fun match(request: TestCaseRequest): Boolean {
            TODO("Not yet implemented")
        }
    },
    WRONG_EMPTY(TestCaseType.NEGATIVE) {
        override fun match(request: TestCaseRequest): Boolean {
            TODO("Not yet implemented")
        }
    },
    WRONG_WRONG(TestCaseType.NEGATIVE) {
        override fun match(request: TestCaseRequest): Boolean {
            TODO("Not yet implemented")
        }
    },
    WRONG_CORRECT(TestCaseType.NEGATIVE) {
        override fun match(request: TestCaseRequest): Boolean {
            TODO("Not yet implemented")
        }
    },
    CORRECT_WRONG(TestCaseType.NEGATIVE) {
        override fun match(request: TestCaseRequest): Boolean {
            TODO("Not yet implemented")
        }
    }
}
