package com.ferick.testerstraining.model.db.dto

import com.fasterxml.jackson.annotation.JsonInclude

@JsonInclude(JsonInclude.Include.NON_NULL)
data class TestCaseStat(
    val precondition: Precondition? = null,
    val cases: MutableSet<String> = mutableSetOf()
)
