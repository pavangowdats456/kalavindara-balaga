package com.folkconnect.data

import com.google.firebase.firestore.DocumentId
import java.io.Serializable

data class Artist(
    @DocumentId
    val id: String = "",
    val name: String = "",
    val troopeName: String = "",
    val artType: String = "",
    val district: String = "",
    val experience: Int = 0,
    val phoneNumber: String = "",
    val email: String = "",
    val bio: String = "",
    val priceRange: String = "",
    val equipmentNeeded: List<String> = emptyList(),
    val serviceAreas: List<String> = emptyList(),
    val galleryUrls: List<String> = emptyList(),
    val profileImageUrl: String = "",
    val isVerified: Boolean = false,
    val rating: Double = 0.0,
    val reviews: Int = 0,
    val createdAt: Long = System.currentTimeMillis(),
    val updatedAt: Long = System.currentTimeMillis(),
    val availability: Map<String, Boolean> = emptyMap()
) : Serializable
