package com.example.kalavidarabalaga.utils

import androidx.compose.ui.Modifier

/**
 * Kotlin equivalent for Tailwind cn() utility.
 * Used to conditionally apply modifiers.
 */

fun Modifier.thenIf(
    condition: Boolean,
    modifier: Modifier
): Modifier {

    return if (condition) {
        this.then(modifier)
    } else {
        this
    }
}
