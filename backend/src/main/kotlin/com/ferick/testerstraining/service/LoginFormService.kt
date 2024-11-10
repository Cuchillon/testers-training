package com.ferick.testerstraining.service

import com.ferick.testerstraining.model.dto.LoginFormInitResponse
import com.ferick.testerstraining.model.dto.UserIdInitRequest

interface LoginFormService {
    fun initLoginFormTraining(request: UserIdInitRequest): LoginFormInitResponse
}
