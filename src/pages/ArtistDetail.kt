package com.example.kalavidarabalaga

import androidx.compose.foundation.*
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.grid.*
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.*
import androidx.compose.material3.*
import androidx.compose.runtime.Composable
import androidx.compose.ui.*
import androidx.compose.ui.draw.clip
import androidx.compose.ui.graphics.Brush
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.layout.ContentScale
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import coil.compose.AsyncImage

data class Artist(
    val id: String,
    val groupName: String,
    val artForm: String,
    val district: String,
    val members: Int,
    val experienceYears: Int,
    val rating: Double,
    val bookings: Int,
    val leader: String,
    val bio: String,
    val image: String,
    val gallery: List<String>,
    val equipment: List<String>,
    val startingPrice: Int,
    val phone: String
)

@Composable
fun ArtistDetailScreen(
    artist: Artist?,
    onBack: () -> Unit,
    onCallClick: (String) -> Unit
) {

    if (artist == null) {

        Column(
            modifier = Modifier
                .fillMaxSize()
                .padding(30.dp),
            horizontalAlignment = Alignment.CenterHorizontally,
            verticalArrangement = Arrangement.Center
        ) {

            Text(
                text = "Troupe not found",
                fontSize = 28.sp,
                fontWeight = FontWeight.Bold
            )

            Spacer(modifier = Modifier.height(10.dp))

            Text(
                text = "This artist may no longer be listed.",
                color = Color.Gray
            )

            Spacer(modifier = Modifier.height(20.dp))

            Button(onClick = onBack) {
                Text("Back to Explore")
            }
        }

        return
    }

    Box(
        modifier = Modifier.fillMaxSize()
    ) {

        Column(
            modifier = Modifier
                .fillMaxSize()
                .verticalScroll(rememberScrollState())
        ) {

            // Hero Image
            Box(
                modifier = Modifier
                    .fillMaxWidth()
                    .height(360.dp)
            ) {

                AsyncImage(
                    model = artist.image,
                    contentDescription = artist.groupName,
                    modifier = Modifier.fillMaxSize(),
                    contentScale = ContentScale.Crop
                )

                Box(
                    modifier = Modifier
                        .matchParentSize()
                        .background(
                            Brush.verticalGradient(
                                colors = listOf(
                                    Color.Transparent,
                                    Color.Black.copy(alpha = 0.8f)
                                )
                            )
                        )
                )

                // Back Button
                IconButton(
                    onClick = onBack,
                    modifier = Modifier
                        .padding(16.dp)
                        .background(
                            Color.White.copy(alpha = 0.9f),
                            shape = RoundedCornerShape(50)
                        )
                ) {

                    Icon(
                        imageVector = Icons.Default.ArrowBack,
                        contentDescription = null
                    )
                }

                // Artist Info
                Column(
                    modifier = Modifier
                        .align(Alignment.BottomStart)
                        .padding(20.dp)
                ) {

                    Surface(
                        color = Color(0xFFFFC107),
                        shape = RoundedCornerShape(20.dp)
                    ) {

                        Text(
                            text = artist.artForm,
                            modifier = Modifier.padding(
                                horizontal = 14.dp,
                                vertical = 6.dp
                            ),
                            color = Color.Black,
                            fontWeight = FontWeight.Bold,
                            fontSize = 12.sp
                        )
                    }

                    Spacer(modifier = Modifier.height(12.dp))

                    Text(
                        text = artist.groupName,
                        color = Color.White,
                        fontSize = 30.sp,
                        fontWeight = FontWeight.Bold
                    )

                    Spacer(modifier = Modifier.height(12.dp))

                    Row(
                        horizontalArrangement = Arrangement.spacedBy(14.dp)
                    ) {

                        InfoItem(
                            icon = Icons.Default.LocationOn,
                            text = "${artist.district}, Karnataka"
                        )

                        InfoItem(
                            icon = Icons.Default.Group,
                            text = "${artist.members} members"
                        )
                    }

                    Spacer(modifier = Modifier.height(8.dp))

                    Row(
                        horizontalArrangement = Arrangement.spacedBy(14.dp)
                    ) {

                        InfoItem(
                            icon = Icons.Default.DateRange,
                            text = "${artist.experienceYears} years"
                        )

                        InfoItem(
                            icon = Icons.Default.Star,
                            text = "${artist.rating} · ${artist.bookings} bookings"
                        )
                    }
                }
            }

            Column(
                modifier = Modifier.padding(20.dp)
            ) {

                // Leader
                Text(
                    text = "Led by",
                    color = Color.Gray,
                    fontSize = 12.sp
                )

                Spacer(modifier = Modifier.height(4.dp))

                Text(
                    text = artist.leader,
                    fontSize = 24.sp,
                    fontWeight = FontWeight.Bold,
                    color = Color(0xFFFF5722)
                )

                Spacer(modifier = Modifier.height(16.dp))

                // Bio
                Text(
                    text = artist.bio,
                    color = Color.DarkGray,
                    lineHeight = 24.sp
                )

                Spacer(modifier = Modifier.height(24.dp))

                // Portfolio
                Text(
                    text = "Portfolio",
                    fontSize = 24.sp,
                    fontWeight = FontWeight.Bold
                )

                Spacer(modifier = Modifier.height(14.dp))

                LazyVerticalGrid(
                    columns = GridCells.Fixed(2),
                    modifier = Modifier.height(420.dp),
                    verticalArrangement = Arrangement.spacedBy(8.dp),
                    horizontalArrangement = Arrangement.spacedBy(8.dp)
                ) {

                    items(artist.gallery) { image ->

                        AsyncImage(
                            model = image,
                            contentDescription = null,
                            modifier = Modifier
                                .fillMaxWidth()
                                .height(180.dp)
                                .clip(RoundedCornerShape(16.dp)),
                            contentScale = ContentScale.Crop
                        )
                    }
                }

                Spacer(modifier = Modifier.height(24.dp))

                // Equipment
                Card(
                    shape = RoundedCornerShape(24.dp),
                    colors = CardDefaults.cardColors(
                        containerColor = Color(0xFFF5F5F5)
                    )
                ) {

                    Column(
                        modifier = Modifier.padding(20.dp)
                    ) {

                        Row(
                            verticalAlignment = Alignment.CenterVertically
                        ) {

                            Icon(
                                imageVector = Icons.Default.Build,
                                contentDescription = null,
                                tint = Color(0xFFFF5722)
                            )

                            Spacer(modifier = Modifier.width(8.dp))

                            Text(
                                text = "Equipment & arrangements",
                                fontSize = 20.sp,
                                fontWeight = FontWeight.Bold
                            )
                        }

                        Spacer(modifier = Modifier.height(16.dp))

                        artist.equipment.forEach {

                            Row(
                                verticalAlignment = Alignment.Top
                            ) {

                                Box(
                                    modifier = Modifier
                                        .padding(top = 8.dp)
                                        .size(8.dp)
                                        .background(
                                            Color(0xFFFFC107),
                                            shape = RoundedCornerShape(50)
                                        )
                                )

                                Spacer(modifier = Modifier.width(10.dp))

                                Text(
                                    text = it,
                                    color = Color.DarkGray
                                )
                            }

                            Spacer(modifier = Modifier.height(10.dp))
                        }
                    }
                }

                Spacer(modifier = Modifier.height(100.dp))
            }
        }

        // Bottom Sticky CTA
        Card(
            modifier = Modifier
                .align(Alignment.BottomCenter)
                .fillMaxWidth(),
            shape = RoundedCornerShape(
                topStart = 24.dp,
                topEnd = 24.dp
            )
        ) {

            Row(
                modifier = Modifier
                    .fillMaxWidth()
                    .padding(18.dp),
                verticalAlignment = Alignment.CenterVertically,
                horizontalArrangement = Arrangement.SpaceBetween
            ) {

                Column {

                    Text(
                        text = "Starting From",
                        color = Color.Gray,
                        fontSize = 12.sp
                    )

                    Spacer(modifier = Modifier.height(2.dp))

                    Text(
                        text = "₹${artist.startingPrice}",
                        fontSize = 28.sp,
                        fontWeight = FontWeight.Bold,
                        color = Color(0xFFFF5722)
                    )
                }

                Button(
                    onClick = {
                        onCallClick(artist.phone)
                    },
                    shape = RoundedCornerShape(50)
                ) {

                    Icon(
                        imageVector = Icons.Default.Call,
                        contentDescription = null
                    )

                    Spacer(modifier = Modifier.width(8.dp))

                    Text("Call ${artist.leader.split(" ")[0]}")
                }
            }
        }
    }
}

@Composable
fun InfoItem(
    icon: androidx.compose.ui.graphics.vector.ImageVector,
    text: String
) {

    Row(
        verticalAlignment = Alignment.CenterVertically
    ) {

        Icon(
            imageVector = icon,
            contentDescription = null,
            tint = Color.White,
            modifier = Modifier.size(16.dp)
        )

        Spacer(modifier = Modifier.width(4.dp))

        Text(
            text = text,
            color = Color.White,
            fontSize = 13.sp
        )
    }
}
