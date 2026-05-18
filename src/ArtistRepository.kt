package com.folkconnect.repository

import android.util.Log
import com.folkconnect.data.Artist
import com.folkconnect.data.BookingInquiry
import com.folkconnect.data.GalleryImage
import com.google.firebase.firestore.FirebaseFirestore
import com.google.firebase.firestore.Query
import kotlinx.coroutines.tasks.await

class ArtistRepository {
    private val firestore = FirebaseFirestore.getInstance()
    private val artistsCollection = firestore.collection("artists")
    private val bookingsCollection = firestore.collection("bookings")
    private val galleryCollection = firestore.collection("gallery")
    
    suspend fun getAllArtists(): List<Artist> = try {
        artistsCollection.orderBy("createdAt", Query.Direction.DESCENDING)
            .get().await().toObjects(Artist::class.java)
    } catch (e: Exception) {
        Log.e("ArtistRepository", "Error", e)
        emptyList()
    }
    
    suspend fun searchArtistsByType(artType: String): List<Artist> = try {
        artistsCollection.whereEqualTo("artType", artType)
            .get().await().toObjects(Artist::class.java)
    } catch (e: Exception) {
        emptyList()
    }
    
    suspend fun searchArtistsByDistrict(district: String): List<Artist> = try {
        artistsCollection.whereEqualTo("district", district)
            .get().await().toObjects(Artist::class.java)
    } catch (e: Exception) {
        emptyList()
    }
    
    suspend fun searchArtistsByName(name: String): List<Artist> = try {
        artistsCollection.whereGreaterThanOrEqualTo("name", name)
            .whereLessThan("name", name + "z")
            .get().await().toObjects(Artist::class.java)
    } catch (e: Exception) {
        emptyList()
    }
    
    suspend fun getVerifiedArtists(): List<Artist> = try {
        artistsCollection.whereEqualTo("isVerified", true)
            .get().await().toObjects(Artist::class.java)
    } catch (e: Exception) {
        emptyList()
    }
    
    suspend fun addBookingInquiry(booking: BookingInquiry): Boolean = try {
        val newDoc = bookingsCollection.document()
        newDoc.set(booking.copy(id = newDoc.id)).await()
        true
    } catch (e: Exception) {
        false
    }
}
