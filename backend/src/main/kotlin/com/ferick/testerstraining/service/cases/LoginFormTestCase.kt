package com.ferick.testerstraining.service.cases

import com.ferick.testerstraining.model.dto.LoginFormTestCaseData
import com.ferick.testerstraining.model.dto.TestCaseData

enum class LoginFormTestCase(override val type: TestCaseType) : TestCase {
    CORRECT_CORRECT(TestCaseType.POSITIVE) {
        override fun match(expected: TestCaseData, actual: TestCaseData): Boolean =
            castData(expected, actual).let { (e, a) ->
                a.username == e.username && a.password == e.password
            }
    },
    EMPTY_EMPTY(TestCaseType.NEGATIVE) {
        override fun match(expected: TestCaseData, actual: TestCaseData): Boolean =
            castData(expected, actual).let { (_, a) ->
                a.username.isEmpty() && a.password.isEmpty()
            }
    },
    EMPTY_CORRECT(TestCaseType.NEGATIVE) {
        override fun match(expected: TestCaseData, actual: TestCaseData): Boolean =
            castData(expected, actual).let { (e, a) ->
                a.username.isEmpty() && a.password == e.password
            }
    },
    EMPTY_WRONG(TestCaseType.NEGATIVE) {
        override fun match(expected: TestCaseData, actual: TestCaseData): Boolean =
            castData(expected, actual).let { (e, a) ->
                a.username.isEmpty() && a.password != e.password
            }
    },
    CORRECT_EMPTY(TestCaseType.NEGATIVE) {
        override fun match(expected: TestCaseData, actual: TestCaseData): Boolean =
            castData(expected, actual).let { (e, a) ->
                a.username == e.username && a.password.isEmpty()
            }
    },
    WRONG_EMPTY(TestCaseType.NEGATIVE) {
        override fun match(expected: TestCaseData, actual: TestCaseData): Boolean =
            castData(expected, actual).let { (e, a) ->
                a.username != e.username && a.password.isEmpty()
            }
    },
    WRONG_WRONG(TestCaseType.NEGATIVE) {
        override fun match(expected: TestCaseData, actual: TestCaseData): Boolean =
            castData(expected, actual).let { (e, a) ->
                a.username != e.username && a.password != e.password
            }
    },
    WRONG_CORRECT(TestCaseType.NEGATIVE) {
        override fun match(expected: TestCaseData, actual: TestCaseData): Boolean =
            castData(expected, actual).let { (e, a) ->
                a.username != e.username && a.password == e.password
            }
    },
    CORRECT_WRONG(TestCaseType.NEGATIVE) {
        override fun match(expected: TestCaseData, actual: TestCaseData): Boolean =
            castData(expected, actual).let { (e, a) ->
                a.username == e.username && a.password != e.password
            }
    };

    companion object {
        fun checkTestCase(expected: TestCaseData, actual: TestCaseData): LoginFormTestCase =
            entries.find { it.match(expected, actual) }
                ?: throw IllegalStateException("There is no test case matching request")

        private fun castData(
            expected: TestCaseData,
            actual: TestCaseData
        ) = expected as LoginFormTestCaseData to actual as LoginFormTestCaseData
    }
}
