package com.ferick.testerstraining.common.extensions

import com.ferick.testerstraining.service.cases.TestCase
import kotlin.reflect.KClass

fun <T> MutableSet<String>.append(case: T) where T : TestCase, T : Enum<*> {
    this.add(case.name)
}

fun <T> MutableSet<String>.delete(case: T) where T : TestCase, T : Enum<*> {
    this.remove(case.name)
}

fun KClass<out TestCase>.key(): String = this.qualifiedName
    ?: throw IllegalArgumentException("There is no name for TestCase class")
