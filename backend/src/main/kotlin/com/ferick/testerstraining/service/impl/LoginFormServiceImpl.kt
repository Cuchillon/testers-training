package com.ferick.testerstraining.service.impl

import com.ferick.testerstraining.common.extensions.key
import com.ferick.testerstraining.model.db.dto.LoginFormPrecondition
import com.ferick.testerstraining.model.db.dto.TestCaseStat
import com.ferick.testerstraining.model.db.entity.UserData
import com.ferick.testerstraining.model.dto.LoginFormInitResponse
import com.ferick.testerstraining.model.dto.UserIdInitRequest
import com.ferick.testerstraining.repository.UserDataRepository
import com.ferick.testerstraining.service.LoginFormService
import com.ferick.testerstraining.service.cases.LoginFormTestCase
import org.springframework.stereotype.Service

@Service
class LoginFormServiceImpl(
    private val userDataRepository: UserDataRepository
) : LoginFormService {

    override fun initLoginFormTraining(request: UserIdInitRequest): LoginFormInitResponse {
        return userDataRepository.findByUserId(request.userId)?.let { userData ->
            val precondition = userData.stats[LoginFormTestCase::class.key()]?.let { stat ->
                stat.precondition.let {
                    it as LoginFormPrecondition
                }
            }
            LoginFormInitResponse(
                userId = userData.userId,
                username = precondition?.username ?: "",
                password = precondition?.password ?: ""
            )
        } ?: run {
            val precondition = LoginFormPrecondition("", "")
            val userData = UserData(
                userId = request.userId
            ).apply {
                stats[LoginFormTestCase::class.key()] = TestCaseStat(precondition)
            }
            userDataRepository.save(userData).let {
                LoginFormInitResponse(
                    userId = it.userId,
                    username = precondition.username,
                    password = precondition.password
                )
            }
        }
    }
}
