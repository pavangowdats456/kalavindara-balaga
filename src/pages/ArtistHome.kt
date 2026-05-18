package com.example.kalavidarabalaga

import androidx.compose.foundation.*
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.items
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.*
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.*
import androidx.compose.ui.draw.clip
import androidx.compose.ui.graphics.Brush
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.layout.ContentScale
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import coil.compose.AsyncImage

data class ArtistProfile(
    val photo: String? = null,
    val name: String = "",
    val ledBy: String = "",
    val category: String = "",
    val city: String = "",
    val state: String = "",
    val phone: String = "",
    val bio: String = "",
    val media: List<String> = emptyList(),
    val performanceTypes: List<String> = emptyList(),
    val teamSize: String = "",
    val groupCount: String = "",
    val experience: String = "",
    val pricing: String = "",
    val availability: String = ""
)

data class Insight(
    val label: String,
    val value: String,
    val delta: String,
    val icon: androidx.compose.ui.graphics.vector.ImageVector
)

data class Inquiry(
    val id: Int,
    val name: String,
    val event: String,
    val date: String,
    val location: String,
    val status: String
)

@Composable
fun ArtistHomeScreen(
    profile: ArtistProfile,
    onEditProfile: () -> Unit,
    onLogout: () -> Unit
) {

    var eventPhotos by remember {
        mutableStateOf(listOf<String>())
    }

    val insights = listOf(
        Insight("Profile views", "248", "+18%", Icons.Default.Visibility),
        Insight("Inquiries", "12", "+4 this week", Icons.Default.Message),
        Insight("Bookings", "3", "2 confirmed", Icons.Default.CalendarMonth),
        Insight("Earnings", "₹45k", "this month", Icons.Default.CurrencyRupee)
    )

    val inquiries = listOf(
        Inquiry(
            1,
            "Ananya Rao",
            "Wedding Sangeet",
            "12 Dec 2025",
            "Mysuru",
            "new"
        ),
        Inquiry(
            2,
            "Dasara Committee",
            "Festival Performance",
            "20 Oct 2025",
            "Bengaluru",
            "replied"
        ),
        Inquiry(
            3,
            "Suresh Patil",
            "Temple Event",
            "5 Nov 2025",
            "Hubli",
            "new"
        )
    )

    val weekly = listOf(22, 35, 28, 48, 41, 60, 52)

    Column(
        modifier = Modifier
            .fillMaxSize()
            .background(Color(0xFFF5F5F5))
    ) {

        // Top Bar
        Row(
            modifier = Modifier
                .fillMaxWidth()
                .background(Color.White)
                .padding(16.dp),
            verticalAlignment = Alignment.CenterVertically,
            horizontalArrangement = Arrangement.SpaceBetween
        ) {

            Row(
                verticalAlignment = Alignment.CenterVertically
            ) {

                Box(
                    modifier = Modifier
                        .size(40.dp)
                        .background(
                            brush = Brush.linearGradient(
                                listOf(
                                    Color(0xFFFF9800),
                                    Color(0xFFFF5722)
                                )
                            ),
                            shape = CircleShape
                        ),
                    contentAlignment = Alignment.Center
                ) {

                    Icon(
                        imageVector = Icons.Default.MusicNote,
                        contentDescription = null,
                        tint = Color.White
                    )
                }

                Spacer(modifier = Modifier.width(10.dp))

                Column {

                    Text(
                        text = "Artist Studio",
                        fontWeight = FontWeight.Bold
                    )

                    Text(
                        text = "Dashboard",
                        fontSize = 12.sp,
                        color = Color.Gray
                    )
                }
            }

            Row {

                IconButton(onClick = {}) {

                    BadgedBox(
                        badge = {
                            Badge {
                                Text("")
                            }
                        }
                    ) {

                        Icon(
                            imageVector = Icons.Default.Notifications,
                            contentDescription = null
                        )
                    }
                }

                IconButton(
                    onClick = onLogout
                ) {

                    Icon(
                        imageVector = Icons.Default.Logout,
                        contentDescription = null
                    )
                }
            }
        }

        LazyColumn(
            modifier = Modifier.fillMaxSize(),
            contentPadding = PaddingValues(16.dp),
            verticalArrangement = Arrangement.spacedBy(16.dp)
        ) {

            // Greeting Card
            item {

                Card(
                    shape = RoundedCornerShape(24.dp)
                ) {

                    Box(
                        modifier = Modifier
                            .fillMaxWidth()
                            .background(
                                Brush.verticalGradient(
                                    listOf(
                                        Color(0xFFFF9800),
                                        Color(0xFFFF5722)
                                    )
                                )
                            )
                    ) {

                        Column(
                            modifier = Modifier.padding(20.dp)
                        ) {

                            Row(
                                verticalAlignment = Alignment.CenterVertically
                            ) {

                                Box(
                                    modifier = Modifier
                                        .size(60.dp)
                                        .clip(CircleShape)
                                        .background(
                                            Color.White.copy(alpha = 0.2f)
                                        ),
                                    contentAlignment = Alignment.Center
                                ) {

                                    if (profile.photo != null) {

                                        AsyncImage(
                                            model = profile.photo,
                                            contentDescription = null,
                                            modifier = Modifier.fillMaxSize(),
                                            contentScale = ContentScale.Crop
                                        )

                                    } else {

                                        Icon(
                                            imageVector = Icons.Default.Person,
                                            contentDescription = null,
                                            tint = Color.White
                                        )
                                    }
                                }

                                Spacer(modifier = Modifier.width(14.dp))

                                Column {

                                    Text(
                                        text = "Namaskara 🙏",
                                        color = Color.White.copy(alpha = 0.9f)
                                    )

                                    Spacer(modifier = Modifier.height(4.dp))

                                    Row(
                                        verticalAlignment = Alignment.CenterVertically
                                    ) {

                                        Text(
                                            text = profile.ledBy,
                                            color = Color.White,
                                            fontWeight = FontWeight.Bold,
                                            fontSize = 20.sp
                                        )

                                        Spacer(modifier = Modifier.width(6.dp))

                                        Icon(
                                            imageVector = Icons.Default.Verified,
                                            contentDescription = null,
                                            tint = Color.White,
                                            modifier = Modifier.size(18.dp)
                                        )
                                    }

                                    Text(
                                        text = "${profile.name} · ${profile.category}",
                                        color = Color.White.copy(alpha = 0.9f),
                                        fontSize = 13.sp
                                    )
                                }
                            }

                            Spacer(modifier = Modifier.height(20.dp))

                            Row {

                                Button(
                                    onClick = onEditProfile,
                                    modifier = Modifier.weight(1f)
                                ) {

                                    Icon(
                                        imageVector = Icons.Default.Edit,
                                        contentDescription = null
                                    )

                                    Spacer(modifier = Modifier.width(6.dp))

                                    Text("Edit Profile")
                                }

                                Spacer(modifier = Modifier.width(10.dp))

                                OutlinedButton(
                                    onClick = {},
                                    modifier = Modifier.weight(1f)
                                ) {

                                    Icon(
                                        imageVector = Icons.Default.Share,
                                        contentDescription = null
                                    )

                                    Spacer(modifier = Modifier.width(6.dp))

                                    Text("Share")
                                }
                            }
                        }
                    }
                }
            }

            // Event Photos
            item {

                SectionTitle(
                    title = "Event Photos",
                    icon = Icons.Default.CameraAlt,
                    hint = "${eventPhotos.size} photos"
                )

                Spacer(modifier = Modifier.height(10.dp))

                Row(
                    horizontalArrangement = Arrangement.spacedBy(10.dp)
                ) {

                    Box(
                        modifier = Modifier
                            .size(100.dp)
                            .border(
                                2.dp,
                                Color.LightGray,
                                RoundedCornerShape(16.dp)
                            ),
                        contentAlignment = Alignment.Center
                    ) {

                        Column(
                            horizontalAlignment = Alignment.CenterHorizontally
                        ) {

                            Icon(
                                imageVector = Icons.Default.AddPhotoAlternate,
                                contentDescription = null
                            )

                            Text(
                                text = "Add",
                                fontSize = 12.sp
                            )
                        }
                    }

                    eventPhotos.forEach {

                        AsyncImage(
                            model = it,
                            contentDescription = null,
                            modifier = Modifier
                                .size(100.dp)
                                .clip(RoundedCornerShape(16.dp)),
                            contentScale = ContentScale.Crop
                        )
                    }
                }
            }

            // Insights
            item {

                SectionTitle(
                    title = "Insights",
                    icon = Icons.Default.TrendingUp,
                    hint = "Last 30 days"
                )
            }

            item {

                Column(
                    verticalArrangement = Arrangement.spacedBy(10.dp)
                ) {

                    insights.chunked(2).forEach { row ->

                        Row(
                            horizontalArrangement = Arrangement.spacedBy(10.dp)
                        ) {

                            row.forEach { insight ->

                                Card(
                                    modifier = Modifier.weight(1f)
                                ) {

                                    Column(
                                        modifier = Modifier.padding(16.dp)
                                    ) {

                                        Icon(
                                            imageVector = insight.icon,
                                            contentDescription = null,
                                            tint = Color(0xFFFF5722)
                                        )

                                        Spacer(modifier = Modifier.height(12.dp))

                                        Text(
                                            text = insight.value,
                                            fontWeight = FontWeight.Bold,
                                            fontSize = 24.sp
                                        )

                                        Text(
                                            text = insight.label,
                                            color = Color.Gray,
                                            fontSize = 12.sp
                                        )

                                        Spacer(modifier = Modifier.height(4.dp))

                                        Text(
                                            text = insight.delta,
                                            color = Color(0xFF4CAF50),
                                            fontSize = 11.sp
                                        )
                                    }
                                }
                            }
                        }
                    }
                }
            }

            // Weekly Chart
            item {

                Card {

                    Column(
                        modifier = Modifier.padding(16.dp)
                    ) {

                        Text(
                            text = "Profile views this week",
                            fontWeight = FontWeight.Bold
                        )

                        Spacer(modifier = Modifier.height(20.dp))

                        Row(
                            modifier = Modifier
                                .fillMaxWidth()
                                .height(140.dp),
                            horizontalArrangement = Arrangement.SpaceEvenly,
                            verticalAlignment = Alignment.Bottom
                        ) {

                            weekly.forEach {

                                Box(
                                    modifier = Modifier
                                        .width(24.dp)
                                        .height((it * 2).dp)
                                        .background(
                                            Brush.verticalGradient(
                                                listOf(
                                                    Color(0xFFFF9800),
                                                    Color(0xFFFF5722)
                                                )
                                            ),
                                            RoundedCornerShape(
                                                topStart = 8.dp,
                                                topEnd = 8.dp
                                            )
                                        )
                                )
                            }
                        }
                    }
                }
            }

            // Inquiries
            item {

                SectionTitle(
                    title = "Recent inquiries",
                    icon = Icons.Default.Message,
                    hint = "${inquiries.size} new"
                )
            }

            items(inquiries) { inquiry ->

                Card {

                    Row(
                        modifier = Modifier.padding(16.dp),
                        verticalAlignment = Alignment.CenterVertically
                    ) {

                        Box(
                            modifier = Modifier
                                .size(44.dp)
                                .background(
                                    Color(0xFFFFE0B2),
                                    CircleShape
                                ),
                            contentAlignment = Alignment.Center
                        ) {

                            Text(
                                text = inquiry.name.first().toString(),
                                fontWeight = FontWeight.Bold
                            )
                        }

                        Spacer(modifier = Modifier.width(12.dp))

                        Column(
                            modifier = Modifier.weight(1f)
                        ) {

                            Row(
                                verticalAlignment = Alignment.CenterVertically
                            ) {

                                Text(
                                    text = inquiry.name,
                                    fontWeight = FontWeight.Bold
                                )

                                Spacer(modifier = Modifier.width(6.dp))

                                if (inquiry.status == "new") {

                                    Text(
                                        text = "NEW",
                                        color = Color(0xFFFF5722),
                                        fontSize = 10.sp
                                    )
                                }
                            }

                            Text(
                                text = inquiry.event,
                                color = Color.Gray,
                                fontSize = 13.sp
                            )

                            Text(
                                text = "${inquiry.date} · ${inquiry.location}",
                                color = Color.Gray,
                                fontSize = 11.sp
                            )
                        }

                        IconButton(onClick = {}) {

                            Icon(
                                imageVector = Icons.Default.Call,
                                contentDescription = null
                            )
                        }
                    }
                }
            }

            // Profession
            item {

                SectionTitle(
                    title = "Profession",
                    icon = Icons.Default.Work
                )

                Spacer(modifier = Modifier.height(10.dp))

                Card {

                    Column(
                        modifier = Modifier.padding(16.dp),
                        verticalArrangement = Arrangement.spacedBy(14.dp)
                    ) {

                        InfoRow(
                            label = "Category",
                            value = profile.category,
                            icon = Icons.Default.Star
                        )

                        InfoRow(
                            label = "Team",
                            value = if (profile.teamSize == "Group")
                                "Group · ${profile.groupCount} members"
                            else
                                profile.teamSize,
                            icon = Icons.Default.Group
                        )

                        InfoRow(
                            label = "Experience",
                            value = "${profile.experience} years",
                            icon = Icons.Default.WorkHistory
                        )

                        InfoRow(
                            label = "Starting Price",
                            value = "₹${profile.pricing}",
                            icon = Icons.Default.CurrencyRupee
                        )

                        InfoRow(
                            label = "Location",
                            value = "${profile.city}, ${profile.state}",
                            icon = Icons.Default.LocationOn
                        )

                        InfoRow(
                            label = "Availability",
                            value = profile.availability,
                            icon = Icons.Default.DateRange
                        )
                    }
                }
            }
        }
    }
}

@Composable
fun SectionTitle(
    title: String,
    icon: androidx.compose.ui.graphics.vector.ImageVector,
    hint: String? = null
) {

    Row(
        modifier = Modifier.fillMaxWidth(),
        horizontalArrangement = Arrangement.SpaceBetween,
        verticalAlignment = Alignment.CenterVertically
    ) {

        Row(
            verticalAlignment = Alignment.CenterVertically
        ) {

            Icon(
                imageVector = icon,
                contentDescription = null,
                tint = Color(0xFFFF5722)
            )

            Spacer(modifier = Modifier.width(8.dp))

            Text(
                text = title,
                fontWeight = FontWeight.Bold
            )
        }

        if (hint != null) {

            Text(
                text = hint,
                fontSize = 12.sp,
                color = Color.Gray
            )
        }
    }
}

@Composable
fun InfoRow(
    label: String,
    value: String,
    icon: androidx.compose.ui.graphics.vector.ImageVector
) {

    Row(
        verticalAlignment = Alignment.Top
    ) {

        Box(
            modifier = Modifier
                .size(36.dp)
                .background(
                    Color(0xFFF0F0F0),
                    RoundedCornerShape(12.dp)
                ),
            contentAlignment = Alignment.Center
        ) {

            Icon(
                imageVector = icon,
                contentDescription = null,
                tint = Color.Gray
            )
        }

        Spacer(modifier = Modifier.width(12.dp))

        Column {

            Text(
                text = label.uppercase(),
                fontSize = 11.sp,
                color = Color.Gray
            )

            Spacer(modifier = Modifier.height(2.dp))

            Text(
                text = value,
                fontWeight = FontWeight.Medium
            )
        }
    }
}
