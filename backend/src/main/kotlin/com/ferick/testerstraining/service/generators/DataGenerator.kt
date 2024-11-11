package com.ferick.testerstraining.service.generators

import org.apache.commons.lang3.RandomStringUtils
import org.springframework.stereotype.Component
import kotlin.random.Random

@Component
class DataGenerator {

    fun generateUsername(): String {
        val result = StringBuilder()
        val nameLength = Random.Default.nextInt(6, 9)
        (0 until nameLength).map {
            if (it % 2 == 0) CONSONANTS[Random.Default.nextInt(20)] else VOWELS[Random.Default.nextInt(6)]
        }.forEach {
            result.append(it)
        }
        return result.toString()
    }

    fun generatePassword(): String = RandomStringUtils.randomAlphanumeric(8)

    companion object {
        const val CONSONANTS = "bcdfghjklmnpqrstvwxz"
        const val VOWELS = "aeiouy"
    }
}
