package com.folkconnect.ui

import android.content.Intent
import android.os.Bundle
import android.view.Menu
import android.view.MenuItem
import android.widget.Toast
import androidx.appcompat.app.AppCompatActivity
import androidx.lifecycle.lifecycleScope
import androidx.recyclerview.widget.StaggeredGridLayoutManager
import com.folkconnect.R
import com.folkconnect.adapter.ArtistAdapter
import com.folkconnect.databinding.ActivityMainBinding
import com.folkconnect.repository.ArtistRepository
import kotlinx.coroutines.launch

class MainActivity : AppCompatActivity() {
    
    private lateinit var binding: ActivityMainBinding
    private lateinit var artistAdapter: ArtistAdapter
    private val repository = ArtistRepository()
    
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        binding = ActivityMainBinding.inflate(layoutInflater)
        setContentView(binding.root)
        
        setSupportActionBar(binding.toolbar)
        setupRecyclerView()
        loadFeaturedArtists()
        setupClickListeners()
    }
    
    private fun setupRecyclerView() {
        artistAdapter = ArtistAdapter(this)
        binding.artistsRecyclerView.apply {
            adapter = artistAdapter
            layoutManager = StaggeredGridLayoutManager(2, StaggeredGridLayoutManager.VERTICAL)
        }
    }
    
    private fun loadFeaturedArtists() {
        lifecycleScope.launch {
            try {
                val artists = repository.getVerifiedArtists().take(6)
                artistAdapter.updateData(artists)
            } catch (e: Exception) {
                Toast.makeText(this@MainActivity, "Error: ${e.message}", Toast.LENGTH_SHORT).show()
            }
        }
    }
    
    private fun setupClickListeners() {
        binding.searchButton.setOnClickListener {
            startActivity(Intent(this@MainActivity, ArtistDirectoryActivity::class.java))
        }
    }
    
    override fun onCreateOptionsMenu(menu: Menu?): Boolean {
        menuInflater.inflate(R.menu.menu_main, menu)
        return true
    }
}
