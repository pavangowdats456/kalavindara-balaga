package com.example.kalavidarabalaaga

import androidx.compose.foundation.background
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.Call
import androidx.compose.material.icons.filled.Favorite
import androidx.compose.material3.*
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Brush
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp

@Composable
fun AboutScreen(
    onBrowseClick: () -> Unit,
    onRegisterClick: () -> Unit
) {
    Column(
        modifier = Modifier
            .fillMaxSize()
    ) {

        // Header Section
        Box(
            modifier = Modifier
                .fillMaxWidth()
                .background(
                    brush = Brush.verticalGradient(
                        colors = listOf(
                            Color(0xFFFF9800),
                            Color(0xFFFF5722)
                        )
                    )
                )
                .padding(top = 32.dp, bottom = 48.dp, start = 20.dp, end = 20.dp)
        ) {

            Column {

                Row(
                    verticalAlignment = Alignment.CenterVertically
                ) {
                    Icon(
                        imageVector = Icons.Default.Favorite,
                        contentDescription = "Heart",
                        tint = Color.White,
                        modifier = Modifier.size(16.dp)
                    )

                    Spacer(modifier = Modifier.width(6.dp))

                    Text(
                        text = "OUR STORY",
                        color = Color.White,
                        fontSize = 10.sp,
                        fontWeight = FontWeight.SemiBold,
                        letterSpacing = 2.sp
                    )
                }

                Spacer(modifier = Modifier.height(12.dp))

                Text(
                    text = "A movement, not just an app.",
                    color = Color.White,
                    fontSize = 32.sp,
                    fontWeight = FontWeight.Bold
                )

                Spacer(modifier = Modifier.height(12.dp))

                Text(
                    text = "Kalavidara-Balaga (ಕಲಾವಿದರ ಬಳಗ) connects rural folk troupes of Karnataka with event organisers across India — turning seasonal performances into a sustainable profession.",
                    color = Color.White.copy(alpha = 0.9f),
                    fontSize = 15.sp,
                    lineHeight = 22.sp
                )
            }
        }

        Spacer(modifier = Modifier.height(20.dp))

        // Artists Card
        InfoCard(
            title = "For artists",
            description = "Free profile. No commission. Direct calls from event planners. Get discovered beyond your village.",
            buttonText = "Register your troupe",
            isPrimary = false,
            onClick = onRegisterClick,
            icon = {
                Icon(
                    imageVector = Icons.Default.Call,
                    contentDescription = "Phone"
                )
            }
        )

        Spacer(modifier = Modifier.height(16.dp))

        // Organisers Card
        InfoCard(
            title = "For organisers",
            description = "Authentic, vetted troupes for weddings, festivals, corporate events. Transparent pricing, direct contact.",
            buttonText = "Browse troupes",
            isPrimary = true,
            onClick = onBrowseClick
        )
    }
}

@Composable
fun InfoCard(
    title: String,
    description: String,
    buttonText: String,
    isPrimary: Boolean,
    onClick: () -> Unit,
    icon: @Composable (() -> Unit)? = null
) {

    Card(
        modifier = Modifier
            .fillMaxWidth()
            .padding(horizontal = 16.dp),
        shape = RoundedCornerShape(20.dp),
        elevation = CardDefaults.cardElevation(defaultElevation = 4.dp)
    ) {

        Column(
            modifier = Modifier.padding(20.dp)
        ) {

            Text(
                text = title,
                fontSize = 22.sp,
                fontWeight = FontWeight.Bold
            )

            Spacer(modifier = Modifier.height(10.dp))

            Text(
                text = description,
                color = Color.Gray,
                fontSize = 14.sp,
                lineHeight = 20.sp
            )

            Spacer(modifier = Modifier.height(18.dp))

            Button(
                onClick = onClick,
                shape = RoundedCornerShape(50),
                colors = if (isPrimary)
                    ButtonDefaults.buttonColors(
                        containerColor = Color(0xFFFF9800)
                    )
                else
                    ButtonDefaults.outlinedButtonColors()
            ) {

                if (icon != null) {
                    icon()
                    Spacer(modifier = Modifier.width(8.dp))
                }

                Text(text = buttonText)
            }
        }
    }
}
