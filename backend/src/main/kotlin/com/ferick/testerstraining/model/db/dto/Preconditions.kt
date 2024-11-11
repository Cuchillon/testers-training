package com.ferick.testerstraining.model.db.dto

import com.fasterxml.jackson.annotation.JsonTypeInfo
import com.ferick.testerstraining.model.dto.LoginFormTestCaseData

@JsonTypeInfo(use = JsonTypeInfo.Id.NAME)
sealed interface Precondition

data class LoginFormPrecondition(
    val expectedTestData: LoginFormTestCaseData
) : Precondition
