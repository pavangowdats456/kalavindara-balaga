package com.example.kalavidarabalaga.ui.components

import androidx.compose.animation.core.tween
import androidx.compose.foundation.Image
import androidx.compose.foundation.clickable
import androidx.compose.foundation.horizontalScroll
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.rememberScrollState
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.graphics.Brush
import androidx.compose.ui.layout.ContentScale
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import coil.compose.AsyncImage
import androidx.compose.foundation.background
import androidx.compose.ui.graphics.Color

data class ArtFormItem(
    val name: String,
    val img: String,
    val note: String
)

private val items = listOf(
    ArtFormItem(
        "Dollu Kunitha",
        "file:///android_asset/hero_dollu.jpg",
        "Thunder of the drums"
    ),
    ArtFormItem(
        "Yakshagana",
        "file:///android_asset/art_yakshagana.jpg",
        "All-night theatre"
    ),
    ArtFormItem(
        "Pooja Kunitha",
        "file:///android_asset/art_pooja.jpg",
        "Sacred procession"
    ),
    ArtFormItem(
        "Veeragase",
        "file:///android_asset/art_veeragase.jpg",
        "Warrior trance"
    ),
    ArtFormItem(
        "Kamsale",
        "file:///android_asset/art_kamsale.jpg",
        "Brass cymbal devotion"
    ),
    ArtFormItem(
        "Nagari",
        "file:///android_asset/art_nagari.jpg",
        "Festive baraat"
    ),
    ArtFormItem(
        "Suggi",
        "file:///android_asset/art_suggi.jpg",
        "Harvest joy"
    )
)

@Composable
fun ArtFormsStrip(
    onPick: (String) -> Unit
) {

    Column(
        modifier = Modifier
            .fillMaxWidth()
            .padding(vertical = 24.dp)
    ) {

        // Header
        Row(
            modifier = Modifier
                .fillMaxWidth()
                .padding(horizontal = 16.dp),
            horizontalArrangement = Arrangement.SpaceBetween,
            verticalAlignment = Alignment.Bottom
        ) {

            Column {

                Text(
                    text = "HERITAGE",
                    style = MaterialTheme.typography.labelSmall,
                    color = MaterialTheme.colorScheme.secondary
                )

                Spacer(modifier = Modifier.height(6.dp))

                Text(
                    text = "Living folk traditions",
                    style = MaterialTheme.typography.headlineMedium,
                    fontWeight = FontWeight.Bold
                )
            }

            Text(
                text = "Tap an art form to discover its troupes.",
                style = MaterialTheme.typography.bodySmall,
                color = MaterialTheme.colorScheme.onSurfaceVariant,
                modifier = Modifier.width(140.dp)
            )
        }

        Spacer(modifier = Modifier.height(20.dp))

        // Horizontal Cards
        Row(
            modifier = Modifier
                .horizontalScroll(rememberScrollState())
                .padding(horizontal = 16.dp),
            horizontalArrangement = Arrangement.spacedBy(12.dp)
        ) {

            items.forEach { item ->

                Box(
                    modifier = Modifier
                        .width(170.dp)
                        .height(240.dp)
                        .clip(RoundedCornerShape(24.dp))
                        .clickable {
                            onPick(item.name)
                        }
                ) {

                    AsyncImage(
                        model = item.img,
                        contentDescription = item.name,
                        contentScale = ContentScale.Crop,
                        modifier = Modifier.fillMaxSize()
                    )

                    // Gradient overlay
                    Box(
                        modifier = Modifier
                            .fillMaxSize()
                            .background(
                                Brush.verticalGradient(
                                    colors = listOf(
                                        Color.Transparent,
                                        Color.Black.copy(alpha = 0.75f)
                                    )
                                )
                            )
                    )

                    // Text
                    Column(
                        modifier = Modifier
                            .align(Alignment.BottomStart)
                            .padding(14.dp)
                    ) {

                        Text(
                            text = item.name,
                            style = MaterialTheme.typography.titleMedium,
                            color = Color.White,
                            fontWeight = FontWeight.Bold
                        )

                        Spacer(modifier = Modifier.height(2.dp))

                        Text(
                            text = item.note,
                            style = MaterialTheme.typography.bodySmall,
                            color = Color.White.copy(alpha = 0.8f)
                        )
                    }
                }
            }
        }
    }
}
