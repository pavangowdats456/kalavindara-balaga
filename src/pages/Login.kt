package com.example.kalavidarabalaga

import androidx.compose.foundation.background
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.*
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.*
import androidx.compose.ui.graphics.Brush
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.input.KeyboardType
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import androidx.compose.foundation.text.KeyboardOptions
import kotlinx.coroutines.delay
import kotlinx.coroutines.launch

enum class Role {
    ARTIST,
    CLIENT
}

enum class Step {
    ROLE,
    PHONE,
    OTP
}

@Composable
fun LoginScreen(
    onLoginSuccess: (Role) -> Unit
) {

    var role by remember {
        mutableStateOf<Role?>(null)
    }

    var step by remember {
        mutableStateOf(Step.ROLE)
    }

    var phone by remember {
        mutableStateOf("")
    }

    var otp by remember {
        mutableStateOf("")
    }

    var loading by remember {
        mutableStateOf(false)
    }

    val snackbarHostState = remember {
        SnackbarHostState()
    }

    val scope = rememberCoroutineScope()

    fun pickRole(selectedRole: Role) {
        role = selectedRole
        step = Step.PHONE
    }

    suspend fun showMessage(message: String) {
        snackbarHostState.showSnackbar(message)
    }

    fun sendOtp() {

        if (phone.length != 10) {

            scope.launch {
                showMessage("Enter valid 10-digit mobile number")
            }

            return
        }

        scope.launch {

            loading = true

            delay(1500)

            loading = false

            showMessage("OTP sent to +91 $phone")

            step = Step.OTP
        }
    }

    fun verifyOtp() {

        if (otp.length != 6) {

            scope.launch {
                showMessage("Enter 6-digit OTP")
            }

            return
        }

        scope.launch {

            loading = true

            delay(1500)

            loading = false

            showMessage("Welcome to Kalavidara-Balaga!")

            onLoginSuccess(role ?: Role.CLIENT)
        }
    }

    Scaffold(
        snackbarHost = {
            SnackbarHost(snackbarHostState)
        }
    ) { padding ->

        Column(
            modifier = Modifier
                .fillMaxSize()
                .padding(padding)
        ) {

            // TOP HEADER
            Box(
                modifier = Modifier
                    .fillMaxWidth()
                    .background(
                        brush = Brush.verticalGradient(
                            listOf(
                                Color(0xFFFF9800),
                                Color(0xFFFF5722)
                            )
                        ),
                        shape = RoundedCornerShape(
                            bottomStart = 40.dp,
                            bottomEnd = 40.dp
                        )
                    )
                    .padding(
                        start = 24.dp,
                        end = 24.dp,
                        top = 48.dp,
                        bottom = 42.dp
                    )
            ) {

                Column {

                    Row(
                        verticalAlignment = Alignment.CenterVertically
                    ) {

                        Box(
                            modifier = Modifier
                                .size(54.dp)
                                .background(
                                    Color.White.copy(alpha = 0.2f),
                                    RoundedCornerShape(50)
                                ),
                            contentAlignment = Alignment.Center
                        ) {

                            Icon(
                                imageVector = Icons.Default.MusicNote,
                                contentDescription = null,
                                tint = Color.White,
                                modifier = Modifier.size(28.dp)
                            )
                        }

                        Spacer(modifier = Modifier.width(14.dp))

                        Column {

                            Text(
                                text = "Kalavidara",
                                color = Color.White,
                                fontSize = 28.sp,
                                fontWeight = FontWeight.Bold
                            )

                            Text(
                                text = "ಬಳಗ · Balaga",
                                color = Color.White.copy(alpha = 0.9f),
                                fontSize = 13.sp
                            )
                        }
                    }

                    Spacer(modifier = Modifier.height(28.dp))

                    Text(
                        text = when (step) {
                            Step.ROLE -> "Welcome"
                            Step.PHONE -> "Enter your phone"
                            Step.OTP -> "Verify OTP"
                        },
                        color = Color.White,
                        fontSize = 34.sp,
                        fontWeight = FontWeight.Bold
                    )

                    Spacer(modifier = Modifier.height(8.dp))

                    Text(
                        text = when (step) {
                            Step.ROLE ->
                                "Choose how you want to use the app."

                            Step.PHONE ->
                                "We'll send a one-time code via SMS."

                            Step.OTP ->
                                "Code sent to +91 $phone"
                        },
                        color = Color.White.copy(alpha = 0.9f),
                        fontSize = 15.sp,
                        lineHeight = 22.sp
                    )
                }
            }

            Column(
                modifier = Modifier
                    .fillMaxSize()
                    .padding(20.dp)
            ) {

                // ROLE STEP
                if (step == Step.ROLE) {

                    RoleCard(
                        icon = Icons.Default.Search,
                        title = "Find an Artist",
                        subtitle = "Book folk troupes for events & weddings",
                        color = Color(0xFFFF9800)
                    ) {
                        pickRole(Role.CLIENT)
                    }

                    Spacer(modifier = Modifier.height(16.dp))

                    RoleCard(
                        icon = Icons.Default.Palette,
                        title = "Join as Artist",
                        subtitle = "Showcase your troupe & receive bookings",
                        color = Color(0xFFE91E63)
                    ) {
                        pickRole(Role.ARTIST)
                    }

                    Spacer(modifier = Modifier.height(26.dp))

                    Text(
                        text = "By continuing you agree to our Terms & Privacy Policy.",
                        color = Color.Gray,
                        fontSize = 12.sp
                    )
                }

                // PHONE STEP
                if (step == Step.PHONE) {

                    Card(
                        shape = RoundedCornerShape(24.dp)
                    ) {

                        Column(
                            modifier = Modifier.padding(20.dp)
                        ) {

                            Text(
                                text = "MOBILE NUMBER",
                                fontSize = 12.sp,
                                color = Color.Gray,
                                fontWeight = FontWeight.SemiBold
                            )

                            Spacer(modifier = Modifier.height(14.dp))

                            OutlinedTextField(
                                value = phone,
                                onValueChange = {
                                    phone = it.filter { c -> c.isDigit() }
                                        .take(10)
                                },
                                modifier = Modifier.fillMaxWidth(),
                                leadingIcon = {
                                    Text("+91")
                                },
                                placeholder = {
                                    Text("98XXXXXXXX")
                                },
                                keyboardOptions = KeyboardOptions(
                                    keyboardType = KeyboardType.Number
                                ),
                                singleLine = true
                            )

                            Spacer(modifier = Modifier.height(14.dp))

                            Row(
                                verticalAlignment = Alignment.CenterVertically
                            ) {

                                Icon(
                                    imageVector = Icons.Default.Shield,
                                    contentDescription = null,
                                    tint = Color.Gray,
                                    modifier = Modifier.size(16.dp)
                                )

                                Spacer(modifier = Modifier.width(6.dp))

                                Text(
                                    text = "Your number stays private.",
                                    color = Color.Gray,
                                    fontSize = 12.sp
                                )
                            }
                        }
                    }

                    Spacer(modifier = Modifier.height(20.dp))

                    Button(
                        onClick = {
                            sendOtp()
                        },
                        modifier = Modifier
                            .fillMaxWidth()
                            .height(56.dp),
                        shape = RoundedCornerShape(18.dp)
                    ) {

                        if (loading) {

                            CircularProgressIndicator(
                                color = Color.White,
                                modifier = Modifier.size(22.dp),
                                strokeWidth = 2.dp
                            )

                        } else {

                            Row(
                                verticalAlignment = Alignment.CenterVertically
                            ) {

                                Text("Send OTP")

                                Spacer(modifier = Modifier.width(8.dp))

                                Icon(
                                    imageVector = Icons.Default.ArrowForward,
                                    contentDescription = null
                                )
                            }
                        }
                    }

                    Spacer(modifier = Modifier.height(14.dp))

                    Text(
                        text = "Change account type",
                        modifier = Modifier.clickable {
                            step = Step.ROLE
                        },
                        color = Color.Gray,
                        fontSize = 14.sp
                    )
                }

                // OTP STEP
                if (step == Step.OTP) {

                    Card(
                        shape = RoundedCornerShape(24.dp)
                    ) {

                        Column(
                            modifier = Modifier.padding(20.dp)
                        ) {

                            Text(
                                text = "ENTER OTP",
                                fontSize = 12.sp,
                                color = Color.Gray,
                                fontWeight = FontWeight.SemiBold
                            )

                            Spacer(modifier = Modifier.height(14.dp))

                            OutlinedTextField(
                                value = otp,
                                onValueChange = {
                                    otp = it.filter { c -> c.isDigit() }
                                        .take(6)
                                },
                                modifier = Modifier.fillMaxWidth(),
                                placeholder = {
                                    Text("123456")
                                },
                                keyboardOptions = KeyboardOptions(
                                    keyboardType = KeyboardType.Number
                                ),
                                singleLine = true
                            )

                            Spacer(modifier = Modifier.height(12.dp))

                            Text(
                                text = "Resend code",
                                color = MaterialTheme.colorScheme.primary,
                                fontWeight = FontWeight.SemiBold,
                                modifier = Modifier.clickable {
                                    sendOtp()
                                }
                            )
                        }
                    }

                    Spacer(modifier = Modifier.height(20.dp))

                    Button(
                        onClick = {
                            verifyOtp()
                        },
                        modifier = Modifier
                            .fillMaxWidth()
                            .height(56.dp),
                        shape = RoundedCornerShape(18.dp)
                    ) {

                        if (loading) {

                            CircularProgressIndicator(
                                color = Color.White,
                                modifier = Modifier.size(22.dp),
                                strokeWidth = 2.dp
                            )

                        } else {

                            Row(
                                verticalAlignment = Alignment.CenterVertically
                            ) {

                                Text("Verify & Continue")

                                Spacer(modifier = Modifier.width(8.dp))

                                Icon(
                                    imageVector = Icons.Default.ArrowForward,
                                    contentDescription = null
                                )
                            }
                        }
                    }

                    Spacer(modifier = Modifier.height(14.dp))

                    Text(
                        text = "Edit phone number",
                        modifier = Modifier.clickable {
                            step = Step.PHONE
                        },
                        color = Color.Gray,
                        fontSize = 14.sp
                    )
                }

                Spacer(modifier = Modifier.weight(1f))

                Text(
                    text = "Empowering Karnataka's folk artists 🎭",
                    color = Color.Gray,
                    fontSize = 12.sp,
                    modifier = Modifier.align(Alignment.CenterHorizontally)
                )

                Spacer(modifier = Modifier.height(14.dp))
            }
        }
    }
}

@Composable
fun RoleCard(
    icon: androidx.compose.ui.graphics.vector.ImageVector,
    title: String,
    subtitle: String,
    color: Color,
    onClick: () -> Unit
) {

    Card(
        modifier = Modifier
            .fillMaxWidth()
            .clickable {
                onClick()
            },
        shape = RoundedCornerShape(24.dp)
    ) {

        Row(
            modifier = Modifier.padding(20.dp),
            verticalAlignment = Alignment.CenterVertically
        ) {

            Box(
                modifier = Modifier
                    .size(56.dp)
                    .background(
                        color.copy(alpha = 0.15f),
                        RoundedCornerShape(16.dp)
                    ),
                contentAlignment = Alignment.Center
            ) {

                Icon(
                    imageVector = icon,
                    contentDescription = null,
                    tint = color,
                    modifier = Modifier.size(28.dp)
                )
            }

            Spacer(modifier = Modifier.width(16.dp))

            Column(
                modifier = Modifier.weight(1f)
            ) {

                Text(
                    text = title,
                    fontSize = 20.sp,
                    fontWeight = FontWeight.Bold
                )

                Spacer(modifier = Modifier.height(4.dp))

                Text(
                    text = subtitle,
                    color = Color.Gray,
                    fontSize = 13.sp
                )
            }

            Icon(
                imageVector = Icons.Default.ArrowForward,
                contentDescription = null,
                tint = Color.Gray
            )
        }
    }
}
