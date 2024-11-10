package com.ferick.testerstraining.controllers

import com.ferick.testerstraining.model.dto.LoginFormInitResponse
import com.ferick.testerstraining.model.dto.UserIdInitRequest
import com.ferick.testerstraining.service.LoginFormService
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

@RestController
@RequestMapping("/api/v1")
class LoginFormController(
    private val loginFormService: LoginFormService
) {

    @PostMapping("/login-form")
    fun initLoginFormTraining(
        @RequestBody request: UserIdInitRequest
    ): LoginFormInitResponse = loginFormService.initLoginFormTraining(request)
}
