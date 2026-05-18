package com.example.kalavidarabalaga

import androidx.compose.foundation.background
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.grid.*
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.Search
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.*
import androidx.compose.ui.graphics.Brush
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp

data class Artist(
    val id: String,
    val groupName: String,
    val leader: String,
    val artForm: String,
    val district: String
)

@Composable
fun ExploreScreen(
    artists: List<Artist>,
    onArtistClick: (Artist) -> Unit
) {

    var query by remember {
        mutableStateOf("")
    }

    var artForm by remember {
        mutableStateOf("all")
    }

    var district by remember {
        mutableStateOf("all")
    }

    val filtered = remember(query, artForm, district) {

        artists.filter { artist ->

            val q = query.trim().lowercase()

            val matchQuery =
                q.isEmpty() ||
                        artist.groupName.lowercase().contains(q) ||
                        artist.leader.lowercase().contains(q)

            val matchArt =
                artForm == "all" || artist.artForm == artForm

            val matchDistrict =
                district == "all" || artist.district == district

            matchQuery && matchArt && matchDistrict
        }
    }

    Column(
        modifier = Modifier.fillMaxSize()
    ) {

        // Header Section
        Box(
            modifier = Modifier
                .fillMaxWidth()
                .background(
                    brush = Brush.verticalGradient(
                        listOf(
                            Color(0xFFFF9800),
                            Color(0xFFFF5722)
                        )
                    )
                )
                .padding(
                    start = 20.dp,
                    end = 20.dp,
                    top = 40.dp,
                    bottom = 50.dp
                )
        ) {

            Column {

                Text(
                    text = "EXPLORE",
                    color = Color.White.copy(alpha = 0.85f),
                    fontSize = 11.sp,
                    letterSpacing = 2.sp,
                    fontWeight = FontWeight.SemiBold
                )

                Spacer(modifier = Modifier.height(10.dp))

                Text(
                    text = "Find your perfect troupe",
                    color = Color.White,
                    fontSize = 32.sp,
                    fontWeight = FontWeight.Bold
                )

                Spacer(modifier = Modifier.height(10.dp))

                Text(
                    text = "Filter by art form and district. One tap connects you straight to the leader.",
                    color = Color.White.copy(alpha = 0.9f),
                    fontSize = 15.sp,
                    lineHeight = 22.sp
                )
            }
        }

        Column(
            modifier = Modifier.padding(16.dp)
        ) {

            // Search
            OutlinedTextField(
                value = query,
                onValueChange = {
                    query = it
                },
                modifier = Modifier.fillMaxWidth(),
                leadingIcon = {
                    Icon(
                        imageVector = Icons.Default.Search,
                        contentDescription = null
                    )
                },
                placeholder = {
                    Text("Search troupe or leader")
                },
                shape = RoundedCornerShape(16.dp)
            )

            Spacer(modifier = Modifier.height(14.dp))

            // Filters Row
            Row(
                horizontalArrangement = Arrangement.spacedBy(10.dp)
            ) {

                // Art Form Dropdown
                FilterDropdown(
                    label = "Art Form",
                    selected = artForm,
                    options = listOf(
                        "all",
                        "Singer",
                        "Band",
                        "Folk",
                        "Dance",
                        "Drama"
                    ),
                    modifier = Modifier.weight(1f)
                ) {
                    artForm = it
                }

                // District Dropdown
                FilterDropdown(
                    label = "District",
                    selected = district,
                    options = listOf(
                        "all",
                        "Bengaluru",
                        "Mysuru",
                        "Hubli",
                        "Mandya"
                    ),
                    modifier = Modifier.weight(1f)
                ) {
                    district = it
                }
            }

            Spacer(modifier = Modifier.height(18.dp))

            // Result Count
            Text(
                text = "${filtered.size} ${
                    if (filtered.size == 1) "troupe" else "troupes"
                } found",
                color = Color.Gray,
                fontSize = 14.sp
            )

            Spacer(modifier = Modifier.height(18.dp))

            // Empty State
            if (filtered.isEmpty()) {

                Box(
                    modifier = Modifier
                        .fillMaxWidth()
                        .padding(top = 40.dp)
                        .background(
                            Color(0xFFF5F5F5),
                            RoundedCornerShape(24.dp)
                        )
                        .padding(40.dp),
                    contentAlignment = Alignment.Center
                ) {

                    Text(
                        text = "No troupes match your filters.\nTry a different district or art form.",
                        color = Color.Gray,
                        lineHeight = 24.sp
                    )
                }

            } else {

                LazyVerticalGrid(
                    columns = GridCells.Fixed(2),
                    modifier = Modifier.fillMaxSize(),
                    horizontalArrangement = Arrangement.spacedBy(12.dp),
                    verticalArrangement = Arrangement.spacedBy(12.dp)
                ) {

                    items(filtered) { artist ->

                        ArtistCard(
                            artist = artist,
                            onClick = {
                                onArtistClick(artist)
                            }
                        )
                    }
                }
            }
        }
    }
}

@Composable
fun FilterDropdown(
    label: String,
    selected: String,
    options: List<String>,
    modifier: Modifier = Modifier,
    onSelected: (String) -> Unit
) {

    var expanded by remember {
        mutableStateOf(false)
    }

    Column(modifier = modifier) {

        Text(
            text = label,
            fontSize = 12.sp,
            color = Color.Gray
        )

        Spacer(modifier = Modifier.height(4.dp))

        ExposedDropdownMenuBox(
            expanded = expanded,
            onExpandedChange = {
                expanded = !expanded
            }
        ) {

            OutlinedTextField(
                value = selected.replaceFirstChar { it.uppercase() },
                onValueChange = {},
                readOnly = true,
                modifier = Modifier.fillMaxWidth(),
                trailingIcon = {
                    ExposedDropdownMenuDefaults.TrailingIcon(expanded)
                },
                shape = RoundedCornerShape(14.dp)
            )

            ExposedDropdownMenu(
                expanded = expanded,
                onDismissRequest = {
                    expanded = false
                }
            ) {

                options.forEach {

                    DropdownMenuItem(
                        text = {
                            Text(it.replaceFirstChar { c -> c.uppercase() })
                        },
                        onClick = {
                            onSelected(it)
                            expanded = false
                        }
                    )
                }
            }
        }
    }
}

@Composable
fun ArtistCard(
    artist: Artist,
    onClick: () -> Unit
) {

    Card(
        onClick = onClick,
        shape = RoundedCornerShape(20.dp)
    ) {

        Column(
            modifier = Modifier.padding(16.dp)
        ) {

            Box(
                modifier = Modifier
                    .fillMaxWidth()
                    .height(120.dp)
                    .background(
                        Brush.verticalGradient(
                            listOf(
                                Color(0xFFFFCC80),
                                Color(0xFFFF9800)
                            )
                        ),
                        RoundedCornerShape(16.dp)
                    )
            )

            Spacer(modifier = Modifier.height(12.dp))

            Text(
                text = artist.groupName,
                fontWeight = FontWeight.Bold,
                fontSize = 16.sp,
                maxLines = 1
            )

            Spacer(modifier = Modifier.height(4.dp))

            Text(
                text = artist.leader,
                color = Color.Gray,
                fontSize = 13.sp
            )

            Spacer(modifier = Modifier.height(8.dp))

            Text(
                text = artist.artForm,
                color = Color(0xFFFF5722),
                fontWeight = FontWeight.SemiBold,
                fontSize = 12.sp
            )

            Spacer(modifier = Modifier.height(4.dp))

            Text(
                text = artist.district,
                color = Color.Gray,
                fontSize = 12.sp
            )
        }
    }
}
