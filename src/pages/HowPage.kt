package com.example.kalavidarabalaga

import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.grid.GridCells
import androidx.compose.foundation.lazy.grid.LazyVerticalGrid
import androidx.compose.foundation.lazy.grid.items
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.ArrowForward
import androidx.compose.material3.*
import androidx.compose.runtime.Composable
import androidx.compose.ui.*
import androidx.compose.ui.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp

@Composable
fun HomeScreen(
    artists: List<Artist>,
    onExploreClick: () -> Unit,
    onArtistClick: (Artist) -> Unit,
    onArtFormClick: (String) -> Unit
) {

    val featured = artists.take(4)

    Column(
        modifier = Modifier.fillMaxSize()
    ) {

        // HERO SECTION
        HeroSection()

        // FEATURED SECTION
        Column(
            modifier = Modifier.padding(
                horizontal = 16.dp,
                vertical = 20.dp
            )
        ) {

            Row(
                modifier = Modifier.fillMaxWidth(),
                horizontalArrangement = Arrangement.SpaceBetween,
                verticalAlignment = Alignment.Bottom
            ) {

                Column {

                    Text(
                        text = "FEATURED",
                        fontSize = 10.sp,
                        letterSpacing = 2.sp,
                        color = MaterialTheme.colorScheme.secondary,
                        fontWeight = FontWeight.SemiBold
                    )

                    Spacer(modifier = Modifier.height(6.dp))

                    Text(
                        text = "Top troupes this season",
                        fontSize = 28.sp,
                        fontWeight = FontWeight.Bold
                    )
                }

                TextButton(
                    onClick = onExploreClick
                ) {

                    Text("See all")

                    Icon(
                        imageVector = Icons.Default.ArrowForward,
                        contentDescription = null,
                        modifier = Modifier.size(18.dp)
                    )
                }
            }

            Spacer(modifier = Modifier.height(18.dp))

            LazyVerticalGrid(
                columns = GridCells.Fixed(2),
                modifier = Modifier.height(500.dp),
                horizontalArrangement = Arrangement.spacedBy(12.dp),
                verticalArrangement = Arrangement.spacedBy(12.dp)
            ) {

                items(featured) { artist ->

                    ArtistCard(
                        artist = artist,
                        onClick = {
                            onArtistClick(artist)
                        }
                    )
                }
            }
        }

        // ART FORMS SECTION
        ArtFormsStrip(
            onPick = onArtFormClick
        )
    }
}

@Composable
fun HeroSection() {

    Card(
        modifier = Modifier
            .fillMaxWidth()
            .padding(16.dp),
        shape = MaterialTheme.shapes.large
    ) {

        Column(
            modifier = Modifier.padding(24.dp)
        ) {

            Text(
                text = "Kalavidara-Balaga",
                fontSize = 34.sp,
                fontWeight = FontWeight.Bold
            )

            Spacer(modifier = Modifier.height(10.dp))

            Text(
                text = "Book traditional Karnataka folk troupes — Dollu Kunitha, Yakshagana, Veeragase — directly from rural artists.",
                fontSize = 15.sp,
                lineHeight = 24.sp
            )

            Spacer(modifier = Modifier.height(18.dp))

            Button(
                onClick = {}
            ) {

                Text("Explore Artists")
            }
        }
    }
}

@Composable
fun ArtFormsStrip(
    onPick: (String) -> Unit
) {

    val artForms = listOf(
        "Yakshagana",
        "Dollu Kunitha",
        "Veeragase",
        "Bharatanatyam",
        "Folk Dance",
        "Drama"
    )

    Column(
        modifier = Modifier.padding(16.dp)
    ) {

        Text(
            text = "Popular Art Forms",
            fontSize = 22.sp,
            fontWeight = FontWeight.Bold
        )

        Spacer(modifier = Modifier.height(14.dp))

        FlowRow(
            horizontalArrangement = Arrangement.spacedBy(10.dp),
            verticalArrangement = Arrangement.spacedBy(10.dp)
        ) {

            artForms.forEach { form ->

                AssistChip(
                    onClick = {
                        onPick(form)
                    },
                    label = {
                        Text(form)
                    }
                )
            }
        }
    }
}
