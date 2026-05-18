package com.example.kalavidarabalaga.ui.components

import android.content.Intent
import android.net.Uri
import androidx.compose.foundation.background
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.grid.*
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.*
import androidx.compose.material3.*
import androidx.compose.runtime.Composable
import androidx.compose.ui.*
import androidx.compose.ui.draw.clip
import androidx.compose.ui.graphics.*
import androidx.compose.ui.layout.ContentScale
import androidx.compose.ui.platform.LocalContext
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import coil.compose.AsyncImage
import java.text.NumberFormat
import java.util.Locale

@Composable
fun ArtistDetailDialog(
    artist: Artist?,
    onClose: () -> Unit
) {

    if (artist == null) return

    val context = LocalContext.current

    Dialog(
        onDismissRequest = onClose
    ) {

        Surface(
            modifier = Modifier
                .fillMaxWidth()
                .fillMaxHeight(0.92f),
            shape = RoundedCornerShape(24.dp),
            color = MaterialTheme.colorScheme.surface
        ) {

            Column {

                // HERO IMAGE
                Box(
                    modifier = Modifier
                        .fillMaxWidth()
                        .height(300.dp)
                ) {

                    AsyncImage(
                        model = artist.image,
                        contentDescription = artist.groupName,
                        contentScale = ContentScale.Crop,
                        modifier = Modifier.fillMaxSize()
                    )

                    Box(
                        modifier = Modifier
                            .fillMaxSize()
                            .background(
                                Brush.verticalGradient(
                                    colors = listOf(
                                        Color.Transparent,
                                        Color.Black.copy(alpha = 0.85f)
                                    )
                                )
                            )
                    )

                    Column(
                        modifier = Modifier
                            .align(Alignment.BottomStart)
                            .padding(24.dp)
                    ) {

                        AssistChip(
                            onClick = {},
                            label = {
                                Text(artist.artForm)
                            }
                        )

                        Spacer(modifier = Modifier.height(10.dp))

                        Text(
                            text = artist.groupName,
                            style = MaterialTheme.typography.headlineMedium,
                            color = Color.White,
                            fontWeight = FontWeight.Bold
                        )

                        Spacer(modifier = Modifier.height(10.dp))

                        Row(
                            horizontalArrangement = Arrangement.spacedBy(14.dp)
                        ) {

                            DetailInfo(
                                icon = Icons.Default.Place,
                                text = "${artist.district}, Karnataka"
                            )

                            DetailInfo(
                                icon = Icons.Default.Group,
                                text = "${artist.members} members"
                            )
                        }

                        Spacer(modifier = Modifier.height(6.dp))

                        Row(
                            horizontalArrangement = Arrangement.spacedBy(14.dp)
                        ) {

                            DetailInfo(
                                icon = Icons.Default.DateRange,
                                text = "${artist.experienceYears} years"
                            )

                            DetailInfo(
                                icon = Icons.Default.Star,
                                text = "${artist.rating} · ${artist.bookings} bookings"
                            )
                        }
                    }
                }

                // CONTENT
                Column(
                    modifier = Modifier
                        .fillMaxWidth()
                        .padding(20.dp)
                ) {

                    // Leader
                    Text(
                        text = "LED BY",
                        style = MaterialTheme.typography.labelSmall,
                        color = MaterialTheme.colorScheme.onSurfaceVariant
                    )

                    Spacer(modifier = Modifier.height(4.dp))

                    Text(
                        text = artist.leader,
                        style = MaterialTheme.typography.titleLarge,
                        color = MaterialTheme.colorScheme.primary,
                        fontWeight = FontWeight.Bold
                    )

                    Spacer(modifier = Modifier.height(18.dp))

                    // BIO
                    Text(
                        text = artist.bio,
                        style = MaterialTheme.typography.bodyMedium,
                        color = MaterialTheme.colorScheme.onSurfaceVariant
                    )

                    Spacer(modifier = Modifier.height(24.dp))

                    // PORTFOLIO
                    Text(
                        text = "Portfolio",
                        style = MaterialTheme.typography.titleLarge,
                        fontWeight = FontWeight.Bold
                    )

                    Spacer(modifier = Modifier.height(14.dp))

                    LazyVerticalGrid(
                        columns = GridCells.Fixed(2),
                        modifier = Modifier.height(260.dp),
                        horizontalArrangement = Arrangement.spacedBy(10.dp),
                        verticalArrangement = Arrangement.spacedBy(10.dp)
                    ) {

                        items(artist.gallery.size) { i ->

                            AsyncImage(
                                model = artist.gallery[i],
                                contentDescription = null,
                                contentScale = ContentScale.Crop,
                                modifier = Modifier
                                    .fillMaxWidth()
                                    .height(
                                        if (i == 0) 180.dp else 120.dp
                                    )
                                    .clip(RoundedCornerShape(18.dp))
                            )
                        }
                    }

                    Spacer(modifier = Modifier.height(24.dp))

                    // EQUIPMENT
                    Card(
                        shape = RoundedCornerShape(18.dp)
                    ) {

                        Column(
                            modifier = Modifier.padding(18.dp)
                        ) {

                            Row(
                                verticalAlignment = Alignment.CenterVertically
                            ) {

                                Icon(
                                    imageVector = Icons.Default.Build,
                                    contentDescription = null,
                                    tint = MaterialTheme.colorScheme.primary
                                )

                                Spacer(modifier = Modifier.width(8.dp))

                                Text(
                                    text = "Equipment & arrangements",
                                    style = MaterialTheme.typography.titleMedium,
                                    fontWeight = FontWeight.Bold
                                )
                            }

                            Spacer(modifier = Modifier.height(14.dp))

                            artist.equipment.forEach {

                                Row(
                                    modifier = Modifier.padding(vertical = 4.dp)
                                ) {

                                    Box(
                                        modifier = Modifier
                                            .padding(top = 8.dp)
                                            .size(6.dp)
                                            .clip(RoundedCornerShape(50))
                                            .background(
                                                MaterialTheme.colorScheme.secondary
                                            )
                                    )

                                    Spacer(modifier = Modifier.width(10.dp))

                                    Text(
                                        text = it,
                                        style = MaterialTheme.typography.bodySmall
                                    )
                                }
                            }
                        }
                    }

                    Spacer(modifier = Modifier.height(24.dp))

                    // PRICE + CALL
                    Card(
                        shape = RoundedCornerShape(22.dp),
                        colors = CardDefaults.cardColors(
                            containerColor = MaterialTheme.colorScheme.primary
                        )
                    ) {

                        Row(
                            modifier = Modifier
                                .fillMaxWidth()
                                .padding(20.dp),
                            horizontalArrangement = Arrangement.SpaceBetween,
                            verticalAlignment = Alignment.CenterVertically
                        ) {

                            Column {

                                Text(
                                    text = "STARTING FROM",
                                    style = MaterialTheme.typography.labelSmall,
                                    color = Color.White.copy(alpha = 0.8f)
                                )

                                Spacer(modifier = Modifier.height(4.dp))

                                Text(
                                    text = "₹${
                                        NumberFormat.getNumberInstance(
                                            Locale("en", "IN")
                                        ).format(artist.startingPrice)
                                    }",
                                    style = MaterialTheme.typography.headlineMedium,
                                    color = Color.White,
                                    fontWeight = FontWeight.Bold
                                )

                                Spacer(modifier = Modifier.height(4.dp))

                                Text(
                                    text = "Per performance · negotiable",
                                    style = MaterialTheme.typography.bodySmall,
                                    color = Color.White.copy(alpha = 0.8f)
                                )
                            }

                            Button(
                                onClick = {

                                    val intent = Intent(
                                        Intent.ACTION_DIAL,
                                        Uri.parse("tel:${artist.phone}")
                                    )

                                    context.startActivity(intent)
                                }
                            ) {

                                Icon(
                                    imageVector = Icons.Default.Call,
                                    contentDescription = null
                                )

                                Spacer(modifier = Modifier.width(6.dp))

                                Text("Call ${artist.leader}")
                            }
                        }
                    }
                }
            }
        }
    }
}

@Composable
fun DetailInfo(
    icon: ImageVector,
    text: String
) {

    Row(
        verticalAlignment = Alignment.CenterVertically
    ) {

        Icon(
            imageVector = icon,
            contentDescription = null,
            tint = Color.White.copy(alpha = 0.9f),
            modifier = Modifier.size(16.dp)
        )

        Spacer(modifier = Modifier.width(4.dp))

        Text(
            text = text,
            color = Color.White.copy(alpha = 0.9f),
            style = MaterialTheme.typography.bodySmall
        )
    }
}
