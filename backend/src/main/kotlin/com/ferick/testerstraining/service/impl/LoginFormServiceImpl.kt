package com.ferick.testerstraining.service.impl

import com.ferick.testerstraining.common.extensions.append
import com.ferick.testerstraining.common.extensions.key
import com.ferick.testerstraining.model.db.dto.LoginFormPrecondition
import com.ferick.testerstraining.model.db.dto.TestCaseStat
import com.ferick.testerstraining.model.db.entity.UserData
import com.ferick.testerstraining.model.dto.LoginFormInitResponse
import com.ferick.testerstraining.model.dto.LoginFormTestCaseData
import com.ferick.testerstraining.model.dto.LoginFormTestCaseRequest
import com.ferick.testerstraining.model.dto.LoginFormTestCaseResponse
import com.ferick.testerstraining.model.dto.UserIdInitRequest
import com.ferick.testerstraining.repository.UserDataRepository
import com.ferick.testerstraining.service.LoginFormService
import com.ferick.testerstraining.service.cases.LoginFormTestCase
import com.ferick.testerstraining.service.cases.TestCaseType
import com.ferick.testerstraining.service.generators.DataGenerator
import org.springframework.stereotype.Service

@Service
class LoginFormServiceImpl(
    private val userDataRepository: UserDataRepository,
    private val generator: DataGenerator
) : LoginFormService {

    override fun initLoginFormTraining(request: UserIdInitRequest): LoginFormInitResponse {
        return userDataRepository.findByUserId(request.userId)?.let { userData ->
            val stat = getLoginFormStat(userData)
            val precondition = stat.precondition?.let {
                it as LoginFormPrecondition
            }
            LoginFormInitResponse(
                userId = userData.userId,
                testCasesCheckedCount = stat.cases.size,
                username = precondition?.expectedTestData?.username ?: generator.generateUsername(),
                password = precondition?.expectedTestData?.password ?: generator.generatePassword()
            )
        } ?: run {
            val precondition = LoginFormPrecondition(
                LoginFormTestCaseData(generator.generateUsername(), generator.generatePassword())
            )
            val userData = UserData(
                userId = request.userId
            ).apply {
                stats[LoginFormTestCase::class.key()] = TestCaseStat(precondition)
            }
            userDataRepository.save(userData).let {
                LoginFormInitResponse(
                    userId = it.userId,
                    testCasesCheckedCount = 0,
                    username = precondition.expectedTestData.username,
                    password = precondition.expectedTestData.password
                )
            }
        }
    }

    override fun checkTestCaseMatching(request: LoginFormTestCaseRequest): LoginFormTestCaseResponse {
        return userDataRepository.findByUserId(request.userId)?.let { userData ->
            val stat = getLoginFormStat(userData)
            val precondition = (stat.precondition!!) as LoginFormPrecondition
            val matched = LoginFormTestCase.checkTestCase(precondition.expectedTestData, request.testCaseData)
            stat.cases.append(matched)
            userDataRepository.save(userData)
            LoginFormTestCaseResponse(
                userId = request.userId,
                testCasesCheckedCount = stat.cases.size,
                testCaseType = matched.type,
                errorMessage = if (matched.type == TestCaseType.NEGATIVE) ERROR_MESSAGE else null
            )
        } ?: throw IllegalStateException("There is no user with user ID ${request.userId}")
    }

    private fun getLoginFormStat(userData: UserData): TestCaseStat =
        userData.stats[LoginFormTestCase::class.key()]
            ?: throw IllegalStateException("There is no precondition for login form test case")

    companion object {
        private const val ERROR_MESSAGE = "Введены неверные имя пользователя или пароль"
    }
}
