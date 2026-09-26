// Daghlus Car Sales
// Front-end account, login, dashboard and logout functionality

document.addEventListener("DOMContentLoaded", function () {
    const registerForm = document.getElementById("registerForm");
    const loginForm = document.getElementById("loginForm");
    const logoutButton = document.getElementById("logoutButton");

    const dashboard = document.getElementById("dashboard");

    const dashboardName = document.getElementById("dashboardName");
    const profileName = document.getElementById("profileName");
    const profileEmail = document.getElementById("profileEmail");
    const dashboardAvatar = document.getElementById("dashboardAvatar");

    const authSections = document.querySelectorAll(".auth-section");

    // Storage keys
    const USER_KEY = "daghlusUser";
    const SESSION_KEY = "daghlusSession";

    // Get saved user
    function getSavedUser() {
        const savedUser = localStorage.getItem(USER_KEY);

        if (!savedUser) {
            return null;
        }

        try {
            return JSON.parse(savedUser);
        } catch (error) {
            return null;
        }
    }

    // Show dashboard
    function showDashboard(user) {
        if (!user || !dashboard) {
            return;
        }

        // Update dashboard information
        if (dashboardName) {
            dashboardName.textContent = user.name;
        }

        if (profileName) {
            profileName.textContent = user.name;
        }

        if (profileEmail) {
            profileEmail.textContent = user.email;
        }

        if (dashboardAvatar) {
            dashboardAvatar.textContent = user.name
                .charAt(0)
                .toUpperCase();
        }

        // Hide registration and login sections
        authSections.forEach(function (section) {
            section.style.display = "none";
        });

        // Show dashboard
        dashboard.style.display = "block";

        // Update URL
        window.history.replaceState(null, "", "#dashboard");

        // Move to dashboard
        setTimeout(function () {
            dashboard.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });
        }, 100);
    }

    // Show login and registration sections
    function showAuthSections() {
        authSections.forEach(function (section) {
            section.style.display = "";
        });

        if (dashboard) {
            dashboard.style.display = "none";
        }
    }

    // REGISTER
    if (registerForm) {
        registerForm.addEventListener("submit", function (event) {
            event.preventDefault();

            const nameInput = document.getElementById("registerName");
            const emailInput = document.getElementById("registerEmail");
            const passwordInput = document.getElementById("registerPassword");

            if (!nameInput || !emailInput || !passwordInput) {
                alert("Registration form fields could not be found.");
                return;
            }

            const name = nameInput.value.trim();
            const email = emailInput.value.trim().toLowerCase();
            const password = passwordInput.value;

            // Basic validation
            if (!name || !email || !password) {
                alert("Please complete all registration fields.");
                return;
            }

            if (password.length < 6) {
                alert("Password must contain at least 6 characters.");
                return;
            }

            // Check if an account already exists
            const existingUser = getSavedUser();

            if (existingUser && existingUser.email === email) {
                alert(
                    "An account with this email already exists. Please log in."
                );
                return;
            }

            // Create demo account
            const newUser = {
                name: name,
                email: email,
                password: password
            };

            // Save account
            localStorage.setItem(USER_KEY, JSON.stringify(newUser));

            // Create login session
            localStorage.setItem(SESSION_KEY, "true");

            // Clear form
            registerForm.reset();

            alert("Account created successfully!");

            // Show dashboard
            showDashboard(newUser);
        });
    }

    // LOGIN
    if (loginForm) {
        loginForm.addEventListener("submit", function (event) {
            event.preventDefault();

            const emailInput = document.getElementById("loginEmail");
            const passwordInput = document.getElementById("loginPassword");

            if (!emailInput || !passwordInput) {
                alert("Login form fields could not be found.");
                return;
            }

            const email = emailInput.value.trim().toLowerCase();
            const password = passwordInput.value;

            // Get saved account
            const savedUser = getSavedUser();

            if (!savedUser) {
                alert("No account found. Please create an account first.");
                return;
            }

            // Check login details
            if (
                email === savedUser.email &&
                password === savedUser.password
            ) {
                // Create session
                localStorage.setItem(SESSION_KEY, "true");

                // Clear login form
                loginForm.reset();

                alert("Login successful!");

                // Show dashboard
                showDashboard(savedUser);
            } else {
                alert("Incorrect email or password. Please try again.");
            }
        });
    }

    // LOGOUT
    if (logoutButton) {
        logoutButton.addEventListener("click", function () {
            // Remove active session
            localStorage.removeItem(SESSION_KEY);

            // Keep the account saved so the user can log in again
            showAuthSections();

            alert("You have been logged out.");

            // Move to login section
            window.history.replaceState(null, "", "#login");

            const loginSection = document.getElementById("login");

            if (loginSection) {
                setTimeout(function () {
                    loginSection.scrollIntoView({
                        behavior: "smooth",
                        block: "start"
                    });
                }, 100);
            }
        });
    }

    // CHECK LOGIN SESSION WHEN PAGE LOADS
    const session = localStorage.getItem(SESSION_KEY);
    const savedUser = getSavedUser();

    if (session === "true" && savedUser) {
        showDashboard(savedUser);
    } else {
        showAuthSections();
    }
});
