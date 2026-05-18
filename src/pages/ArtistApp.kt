package com.example.kalavidarabalaga

import android.net.Uri
import android.widget.Toast
import androidx.compose.foundation.*
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.GridCells
import androidx.compose.foundation.lazy.LazyVerticalGrid
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

enum class Step {
    STEP1,
    STEP2,
    SUCCESS
}

data class FormState(
    var photo: Uri? = null,
    var name: String = "",
    var ledBy: String = "",
    var category: String = "",
    var city: String = "",
    var state: String = "",
    var phone: String = "",
    var bio: String = "",
    var media: MutableList<Uri> = mutableListOf(),
    var performanceTypes: MutableList<String> = mutableListOf(),
    var teamSize: String = "",
    var groupCount: String = "",
    var experience: String = "",
    var pricing: String = "",
    var availability: String = ""
)

@Composable
fun ArtistAppScreen() {

    val context = LocalContext.current

    var step by remember { mutableStateOf(Step.STEP1) }

    var form by remember {
        mutableStateOf(FormState())
    }

    val categories = listOf(
        "Singer",
        "Band",
        "Folk Troupe",
        "Dance Troupe",
        "Instrumental",
        "Drama / Theatre",
        "Devotional",
        "Other"
    )

    val performanceTypes = listOf(
        "Wedding",
        "Festival",
        "Corporate Event",
        "Temple / Religious",
        "Private Party"
    )

    Column(
        modifier = Modifier
            .fillMaxSize()
            .verticalScroll(rememberScrollState())
            .background(Color(0xFFF7F7F7))
    ) {

        // Header
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
                .padding(20.dp)
        ) {

            Column {

                Row(
                    verticalAlignment = Alignment.CenterVertically
                ) {

                    IconButton(onClick = {}) {
                        Icon(
                            imageVector = Icons.Default.ArrowBack,
                            contentDescription = null,
                            tint = Color.White
                        )
                    }

                    Spacer(modifier = Modifier.width(10.dp))

                    Icon(
                        imageVector = Icons.Default.MusicNote,
                        contentDescription = null,
                        tint = Color.White
                    )

                    Spacer(modifier = Modifier.width(6.dp))

                    Text(
                        text = "Artist Studio",
                        color = Color.White,
                        fontWeight = FontWeight.Bold
                    )
                }

                Spacer(modifier = Modifier.height(20.dp))

                if (step != Step.SUCCESS) {

                    Text(
                        text = if (step == Step.STEP1)
                            "Tell us about yourself"
                        else
                            "Showcase your work",
                        color = Color.White,
                        fontSize = 28.sp,
                        fontWeight = FontWeight.Bold
                    )

                    Spacer(modifier = Modifier.height(6.dp))

                    Text(
                        text = if (step == Step.STEP1)
                            "Step 1 of 2 · Basic details"
                        else
                            "Step 2 of 2 · Portfolio & booking",
                        color = Color.White.copy(alpha = 0.9f)
                    )
                }
            }
        }

        Column(
            modifier = Modifier.padding(16.dp)
        ) {

            // STEP 1
            if (step == Step.STEP1) {

                Card(
                    shape = RoundedCornerShape(24.dp)
                ) {

                    Column(
                        modifier = Modifier.padding(20.dp)
                    ) {

                        // Profile Photo
                        Box(
                            modifier = Modifier
                                .size(100.dp)
                                .clip(CircleShape)
                                .background(Color.LightGray)
                                .align(Alignment.CenterHorizontally),
                            contentAlignment = Alignment.Center
                        ) {

                            if (form.photo != null) {

                                AsyncImage(
                                    model = form.photo,
                                    contentDescription = null,
                                    modifier = Modifier.fillMaxSize(),
                                    contentScale = ContentScale.Crop
                                )

                            } else {

                                Icon(
                                    imageVector = Icons.Default.CameraAlt,
                                    contentDescription = null,
                                    tint = Color.DarkGray,
                                    modifier = Modifier.size(30.dp)
                                )
                            }
                        }

                        Spacer(modifier = Modifier.height(20.dp))

                        CustomField("Artist / Troupe Name") {

                            OutlinedTextField(
                                value = form.name,
                                onValueChange = {
                                    form = form.copy(name = it)
                                },
                                modifier = Modifier.fillMaxWidth(),
                                placeholder = {
                                    Text("Karnataka Janapada Troupe")
                                }
                            )
                        }

                        Spacer(modifier = Modifier.height(12.dp))

                        CustomField("Led By") {

                            OutlinedTextField(
                                value = form.ledBy,
                                onValueChange = {
                                    form = form.copy(ledBy = it)
                                },
                                modifier = Modifier.fillMaxWidth()
                            )
                        }

                        Spacer(modifier = Modifier.height(12.dp))

                        Text(
                            text = "Category",
                            fontWeight = FontWeight.SemiBold
                        )

                        Spacer(modifier = Modifier.height(8.dp))

                        var expanded by remember { mutableStateOf(false) }

                        ExposedDropdownMenuBox(
                            expanded = expanded,
                            onExpandedChange = {
                                expanded = !expanded
                            }
                        ) {

                            OutlinedTextField(
                                value = form.category,
                                onValueChange = {},
                                readOnly = true,
                                modifier = Modifier.fillMaxWidth(),
                                trailingIcon = {
                                    ExposedDropdownMenuDefaults.TrailingIcon(expanded)
                                }
                            )

                            ExposedDropdownMenu(
                                expanded = expanded,
                                onDismissRequest = {
                                    expanded = false
                                }
                            ) {

                                categories.forEach {

                                    DropdownMenuItem(
                                        text = {
                                            Text(it)
                                        },
                                        onClick = {
                                            form = form.copy(category = it)
                                            expanded = false
                                        }
                                    )
                                }
                            }
                        }

                        Spacer(modifier = Modifier.height(12.dp))

                        Row {

                            OutlinedTextField(
                                value = form.city,
                                onValueChange = {
                                    form = form.copy(city = it)
                                },
                                label = {
                                    Text("City")
                                },
                                modifier = Modifier.weight(1f)
                            )

                            Spacer(modifier = Modifier.width(8.dp))

                            OutlinedTextField(
                                value = form.state,
                                onValueChange = {
                                    form = form.copy(state = it)
                                },
                                label = {
                                    Text("State")
                                },
                                modifier = Modifier.weight(1f)
                            )
                        }

                        Spacer(modifier = Modifier.height(12.dp))

                        OutlinedTextField(
                            value = form.phone,
                            onValueChange = {
                                form = form.copy(phone = it.take(10))
                            },
                            label = {
                                Text("Phone")
                            },
                            leadingIcon = {
                                Text("+91")
                            },
                            modifier = Modifier.fillMaxWidth()
                        )

                        Spacer(modifier = Modifier.height(12.dp))

                        OutlinedTextField(
                            value = form.bio,
                            onValueChange = {
                                form = form.copy(bio = it)
                            },
                            label = {
                                Text("Short Bio")
                            },
                            modifier = Modifier.fillMaxWidth(),
                            minLines = 3
                        )

                        Spacer(modifier = Modifier.height(20.dp))

                        Button(
                            onClick = {

                                if (form.name.isEmpty()) {

                                    Toast.makeText(
                                        context,
                                        "Enter artist name",
                                        Toast.LENGTH_SHORT
                                    ).show()

                                } else {

                                    step = Step.STEP2
                                }
                            },
                            modifier = Modifier.fillMaxWidth()
                        ) {

                            Text("Next ➡️")
                        }
                    }
                }
            }

            // STEP 2
            if (step == Step.STEP2) {

                Card(
                    shape = RoundedCornerShape(24.dp)
                ) {

                    Column(
                        modifier = Modifier.padding(20.dp)
                    ) {

                        Text(
                            text = "Performance Types",
                            fontWeight = FontWeight.Bold
                        )

                        Spacer(modifier = Modifier.height(10.dp))

                        performanceTypes.forEach { type ->

                            Row(
                                verticalAlignment = Alignment.CenterVertically
                            ) {

                                Checkbox(
                                    checked = form.performanceTypes.contains(type),
                                    onCheckedChange = {

                                        val updated =
                                            form.performanceTypes.toMutableList()

                                        if (updated.contains(type))
                                            updated.remove(type)
                                        else
                                            updated.add(type)

                                        form = form.copy(
                                            performanceTypes = updated
                                        )
                                    }
                                )

                                Text(type)
                            }
                        }

                        Spacer(modifier = Modifier.height(12.dp))

                        Text(
                            text = "Team Size",
                            fontWeight = FontWeight.Bold
                        )

                        Spacer(modifier = Modifier.height(8.dp))

                        Row {

                            listOf("Solo", "Group").forEach { size ->

                                Button(
                                    onClick = {
                                        form = form.copy(teamSize = size)
                                    },
                                    modifier = Modifier.weight(1f)
                                ) {

                                    Text(size)
                                }

                                Spacer(modifier = Modifier.width(8.dp))
                            }
                        }

                        if (form.teamSize == "Group") {

                            Spacer(modifier = Modifier.height(10.dp))

                            OutlinedTextField(
                                value = form.groupCount,
                                onValueChange = {
                                    form = form.copy(groupCount = it)
                                },
                                label = {
                                    Text("Number of members")
                                },
                                modifier = Modifier.fillMaxWidth()
                            )
                        }

                        Spacer(modifier = Modifier.height(12.dp))

                        OutlinedTextField(
                            value = form.experience,
                            onValueChange = {
                                form = form.copy(experience = it)
                            },
                            label = {
                                Text("Experience")
                            },
                            modifier = Modifier.fillMaxWidth()
                        )

                        Spacer(modifier = Modifier.height(12.dp))

                        OutlinedTextField(
                            value = form.pricing,
                            onValueChange = {
                                form = form.copy(pricing = it)
                            },
                            label = {
                                Text("Pricing")
                            },
                            leadingIcon = {
                                Text("₹")
                            },
                            modifier = Modifier.fillMaxWidth()
                        )

                        Spacer(modifier = Modifier.height(12.dp))

                        OutlinedTextField(
                            value = form.availability,
                            onValueChange = {
                                form = form.copy(availability = it)
                            },
                            label = {
                                Text("Availability")
                            },
                            modifier = Modifier.fillMaxWidth(),
                            minLines = 2
                        )

                        Spacer(modifier = Modifier.height(20.dp))

                        Button(
                            onClick = {

                                Toast.makeText(
                                    context,
                                    "Profile Created Successfully 🎉",
                                    Toast.LENGTH_LONG
                                ).show()

                                step = Step.SUCCESS
                            },
                            modifier = Modifier.fillMaxWidth()
                        ) {

                            Text("Submit / Create Profile")
                        }
                    }
                }
            }

            // SUCCESS
            if (step == Step.SUCCESS) {

                Card(
                    shape = RoundedCornerShape(24.dp)
                ) {

                    Column(
                        modifier = Modifier
                            .padding(30.dp)
                            .fillMaxWidth(),
                        horizontalAlignment = Alignment.CenterHorizontally
                    ) {

                        Icon(
                            imageVector = Icons.Default.CheckCircle,
                            contentDescription = null,
                            tint = Color(0xFF4CAF50),
                            modifier = Modifier.size(80.dp)
                        )

                        Spacer(modifier = Modifier.height(16.dp))

                        Text(
                            text = "Profile Created 🎉",
                            fontSize = 26.sp,
                            fontWeight = FontWeight.Bold
                        )

                        Spacer(modifier = Modifier.height(10.dp))

                        Text(
                            text = "Your artist profile has been saved successfully.",
                            color = Color.Gray
                        )

                        Spacer(modifier = Modifier.height(24.dp))

                        Button(
                            onClick = {},
                            modifier = Modifier.fillMaxWidth()
                        ) {

                            Text("Go To My Profile")
                        }
                    }
                }
            }
        }
    }
}

@Composable
fun CustomField(
    label: String,
    content: @Composable () -> Unit
) {

    Column {

        Text(
            text = label,
            fontWeight = FontWeight.SemiBold
        )

        Spacer(modifier = Modifier.height(6.dp))

        content()
    }
}
