package com.example.kalavidarabalaga.ui.layout

import android.content.Context
import androidx.compose.foundation.layout.*
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Modifier
import androidx.compose.ui.platform.LocalContext
import androidx.navigation.NavHostController
import androidx.navigation.compose.currentBackStackEntryAsState

@Composable
fun AppLayout(
    navController: NavHostController,
    content: @Composable () -> Unit
) {

    val context = LocalContext.current
    val sharedPref = context.getSharedPreferences("kb_prefs", Context.MODE_PRIVATE)

    val navBackStackEntry by navController.currentBackStackEntryAsState()
    val currentRoute = navBackStackEntry?.destination?.route

    LaunchedEffect(currentRoute) {

        // Splash screen logic
        val splashSeen = sharedPref.getBoolean("kb_splash_seen", false)

        if (!splashSeen) {
            sharedPref.edit().putBoolean("kb_splash_seen", true).apply()

            navController.navigate("splash") {
                popUpTo(0)
            }
            return@LaunchedEffect
        }

        // Redirect artist from home
        if (currentRoute == "home") {

            val role = sharedPref.getString("kb_role", null)

            if (role == "artist") {

                val hasProfile =
                    sharedPref.contains("kb_artist_profile")

                navController.navigate(
                    if (hasProfile) "artist_home"
                    else "artist_app"
                ) {
                    popUpTo("home") {
                        inclusive = true
                    }
                }
            }
        }
    }

    Scaffold(
        topBar = {
            Header()
        },

        bottomBar = {
            BottomNav(navController)
        }

    ) { paddingValues ->

        Column(
            modifier = Modifier
                .fillMaxSize()
                .padding(paddingValues)
        ) {

            Box(
                modifier = Modifier.weight(1f)
            ) {
                content()
            }

            Footer()
        }
    }
}

/*
-----------------------------------
Placeholder Composables
-----------------------------------
Replace these with your actual UI
*/

@Composable
fun Header() {
    TopAppBar(
        title = {
            Text("Kalavidara-Balaga")
        }
    )
}

@Composable
fun Footer() {
    Box(
        modifier = Modifier
            .fillMaxWidth()
            .padding(16.dp)
    ) {
        Text(
            text = "© Kalavidara-Balaga"
        )
    }
}

@Composable
fun BottomNav(
    navController: NavHostController
) {
    NavigationBar {

        NavigationBarItem(
            selected = false,
            onClick = {
                navController.navigate("home")
            },
            icon = {}
        )

        NavigationBarItem(
            selected = false,
            onClick = {
                navController.navigate("explore")
            },
            icon = {}
        )
    }
}
