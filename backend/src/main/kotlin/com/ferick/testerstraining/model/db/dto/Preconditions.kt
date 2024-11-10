package com.ferick.testerstraining.model.db.dto

import com.fasterxml.jackson.annotation.JsonTypeInfo

@JsonTypeInfo(use = JsonTypeInfo.Id.NAME)
sealed interface Precondition

data class LoginFormPrecondition(
    val username: String,
    val password: String
) : Precondition
