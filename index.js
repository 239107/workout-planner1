function showSignUp() {
  document.getElementById("forms").style.display = "block";
  document.getElementById("signUpForm").style.display = "block";
  document.getElementById("logInForm").style.display = "none";
}

function showLogIn() {
  document.getElementById("forms").style.display = "block";
  document.getElementById("logInForm").style.display = "block";
  document.getElementById("signUpForm").style.display = "none";
}

function signUp() {
  const email = document.getElementById("suEmail").value;
  const phone = document.getElementById("suPhone").value;
  const pass = document.getElementById("suPass").value;

  if (!email || !pass) return alert("Email and Password required");

  localStorage.setItem("user", JSON.stringify({ email, phone, pass }));
  alert("Sign up successful!");
  document.getElementById("forms").style.display = "none";
}

function logIn() {
  const email = document.getElementById("liEmail").value;
  const pass = document.getElementById("liPass").value;
  const stored = JSON.parse(localStorage.getItem("user"));

  if (!stored || stored.email !== email || stored.pass !== pass) {
    alert("Invalid credentials");
    return;
  }

  document.getElementById("authSection").style.display = "none";
  document.getElementById("userSection").style.display = "block";
  document.getElementById("userEmail").textContent = email;
  document.getElementById("forms").style.display = "none";
}

function logOut() {
  document.getElementById("authSection").style.display = "block";
  document.getElementById("userSection").style.display = "none";
  document.getElementById("userEmail").textContent = "";
  document.getElementById("workoutPlan").innerHTML = "";
}

// Workouts data
const workouts = {
  beginner: {
    title: "💪 Beginner Plan (Fun & Easy)",
    exercises: [
      "10 Jumping Jacks",
      "5 Push-ups (on knees if needed)",
      "10 Bodyweight Squats",
      "20-Second Plank",
      "10 Arm Circles"
    ]
  },
  intermediate: {
    title: "💥 Intermediate Plan (Let’s Get Stronger!)",
    exercises: [
      "20 Jumping Jacks",
      "10 Regular Push-ups",
      "15 Squats",
      "30-Second Plank",
      "15 Sit-ups"
    ]
  },
  hard: {
    title: "🔥 Hard Plan (Muscle Builder!)",
    exercises: [
      "30 Jumping Jacks",
      "15 Push-ups",
      "20 Squats",
      "1-Minute Plank",
      "20 Mountain Climbers"
    ]
  }
};

// Diet plans
const diets = {
  beginner: {
    veg: [
      "🥣 Breakfast: Oats with milk + 2 boiled eggs (optional veg protein shake)",
      "🥪 Snack: Peanut butter sandwich + banana",
      "🍛 Lunch: Lentils (dal), brown rice, mixed veggies, tofu",
      "🥛 Snack: Greek yogurt + almonds",
      "🍽️ Dinner: Quinoa with chickpeas and steamed spinach"
    ],
    nonveg: [
      "🥣 Breakfast: Scrambled eggs (3) + toast + milk",
      "🥪 Snack: Chicken sandwich + apple",
      "🍛 Lunch: Grilled chicken, rice, steamed broccoli",
      "🥛 Snack: Boiled egg + yogurt",
      "🍽️ Dinner: Fish curry with roti and salad"
    ]
  },
  intermediate: {
    veg: [
      "🥣 Breakfast: Protein smoothie with oats, banana, milk, chia seeds",
      "🥪 Snack: Cottage cheese (paneer) wrap + nuts",
      "🍛 Lunch: Rajma with brown rice, salad, tofu",
      "🥛 Snack: Boiled corn + curd",
      "🍽️ Dinner: Lentil soup + roti + sautéed veggies"
    ],
    nonveg: [
      "🥣 Breakfast: Omelette (3 eggs) + toast + milk",
      "🥪 Snack: Tuna sandwich + orange",
      "🍛 Lunch: Chicken breast, rice, green beans",
      "🥛 Snack: Yogurt + boiled egg",
      "🍽️ Dinner: Egg curry with roti and cucumbers"
    ]
  },
  hard: {
    veg: [
      "🥣 Breakfast: High-protein smoothie + peanut butter toast",
      "🥪 Snack: Boiled soybeans + dry fruits",
      "🍛 Lunch: Chickpea salad + tofu + quinoa",
      "🥛 Snack: Paneer + fruit bowl",
      "🍽️ Dinner: Dal + brown rice + spinach curry"
    ],
    nonveg: [
      "🥣 Breakfast: Protein shake + 3 egg whites + toast",
      "🥪 Snack: Chicken tikka + boiled egg",
      "🍛 Lunch: Fish fillet + rice + vegetables",
      "🥛 Snack: Greek yogurt + almonds",
      "🍽️ Dinner: Grilled chicken with mixed veggies + chapati"
    ]
  }
};

// Show workout by level
function showWorkout(level) {
  const plan = workouts[level];
  const listItems = plan.exercises.map(item => `<li>${item}</li>`).join('');
  document.getElementById("workoutPlan").innerHTML = `
    <h2>${plan.title}</h2>
    <ul>${listItems}</ul>
    <p>🎉 Don’t forget to warm up before and stretch after!</p>
  `;
}

// Diet selection UI
function chooseDietLevel() {
  document.getElementById("workoutPlan").innerHTML = `
    <h2>🍽️ Select Your Diet Plan Level</h2>
    <button class="beginner" onclick="showDiet('beginner')">Beginner</button>
    <button class="intermediate" onclick="showDiet('intermediate')">Intermediate</button>
    <button class="hard" onclick="showDiet('hard')">Hard</button>
  `;
}

// Show diet plan and toggle veg/nonveg
function showDiet(level, type = 'veg') {
  const content = diets[level][type].map(item => `<li>${item}</li>`).join('');
  document.getElementById("workoutPlan").innerHTML = `
    <h2>🍎 ${level.charAt(0).toUpperCase() + level.slice(1)} Diet Plan (100g Protein)</h2>
    <div class="diet-type">
      <button onclick="toggleDiet('${level}', 'veg')" id="vegBtn" class="${type === 'veg' ? 'active' : ''}">🥦 Veg Plan</button>
      <button onclick="toggleDiet('${level}', 'nonveg')" id="nonvegBtn" class="${type === 'nonveg' ? 'active' : ''}">🍗 Non-Veg Plan</button>
    </div>
    <ul id="dietContent">${content}</ul>
  `;
}

function toggleDiet(level, type) {
  showDiet(level, type);
}

// Personalized plans based on gain/lose, range and age group
const plans = {
  "gain_0-10_kids": {
    title: "🏋️ Kids Muscle Gain (0-10 lbs)",
    days: {
      Monday: ["Push-ups (knee)", "Wall Squats", "Arm Circles"],
      Tuesday: ["Plank (20s)", "Bodyweight Lunges", "Jumping Jacks"],
      Wednesday: ["Stretch or Rest"],
      Thursday: ["Bicycle Crunches", "Mountain Climbers"],
      Friday: ["Burpees", "High Knees", "Stretch"]
    }
  },
  "gain_11-20_kids": {
    title: "🏋️ Kids Muscle Gain (11-20 lbs)",
    days: {
      Monday: ["Push-ups", "Bodyweight Squats", "Jump Rope"],
      Tuesday: ["Chair Dips", "Sit-ups", "Wall Sit"],
      Wednesday: ["Stretch or Active Yoga"],
      Thursday: ["Plank (30s)", "Jumping Jacks", "Crunches"],
      Friday: ["Mountain Climbers", "Squat Jumps", "Rest"]
    }
  },
  "gain_21+_kids": {
    title: "🏋️ Kids Muscle Gain (21+ lbs)",
    days: {
      Monday: ["Push-ups", "Lunges", "Burpees"],
      Tuesday: ["Sit-ups", "Wall Squats", "Jump Rope"],
      Wednesday: ["Yoga & Mobility"],
      Thursday: ["Jump Squats", "Chair Dips", "Core Circuit"],
      Friday: ["Mountain Climbers", "Stretch"]
    }
  },
  "gain_0-10_adult": {
    title: "💪 Adult Muscle Gain (0-10 lbs)",
    days: {
      Monday: ["Bench Press", "Push-ups", "Chest Flys"],
      Tuesday: ["Squats", "Leg Press", "Calf Raises"],
      Wednesday: ["Yoga or Rest"],
      Thursday: ["Deadlifts", "Barbell Rows", "Back Extensions"],
      Friday: ["Overhead Press", "Dumbbell Raises", "Plank"]
    }
  },
  "gain_11-20_adult": {
    title: "💪 Adult Muscle Gain (11-20 lbs)",
    days: {
      Monday: ["Heavy Bench", "Incline Press", "Chest Flys"],
      Tuesday: ["Heavy Squats", "Lunges", "Leg Curls"],
      Wednesday: ["Rest or Walk"],
      Thursday: ["Rows", "Deadlifts", "Hammer Curls"],
      Friday: ["Shoulder Press", "Shrugs", "Lateral Raises"]
    }
  },
  "gain_21+_adult": {
    title: "💪 Advanced Adult Muscle Gain (21+ lbs)",
    days: {
      Monday: ["Bench Press (5x5)", "Incline Dumbbells", "Dips"],
      Tuesday: ["Deadlift (5x5)", "Leg Press", "Jump Squats"],
      Wednesday: ["Mobility and Core"],
      Thursday: ["Barbell Row", "T-bar Row", "Pull-ups"],
      Friday: ["Overhead Press", "Front Raise", "Arnold Press"]
    }
  },
  "lose_0-10_kids": {
    title: "🔥 Kids Fat Loss (0-10 lbs)",
    days: {
      Monday: ["Jump Rope", "Squats", "Push-ups"],
      Tuesday: ["Jog in place", "Mountain Climbers", "Plank (20s)"],
      Wednesday: ["Stretch or Yoga"],
      Thursday: ["Sit-ups", "Jumping Jacks", "Wall Sit"],
      Friday: ["Burpees", "High Knees"]
    }
  },
  "lose_11-20_kids": {
    title: "🔥 Kids Fat Loss (11-20 lbs)",
    days: {
      Monday: ["HIIT", "Squat Jumps", "Chair Dips"],
      Tuesday: ["Plank", "Sit-ups", "Jump Rope"],
      Wednesday: ["Active Yoga"],
      Thursday: ["Lunges", "Wall Sit", "Crunches"],
      Friday: ["Mountain Climbers", "High Knees"]
    }
  },
  "lose_21+_kids": {
    title: "🔥 Advanced Kids Fat Loss (21+ lbs)",
    days: {
      Monday: ["HIIT", "Jump Rope (10min)", "Burpees"],
      Tuesday: ["Push-ups", "Plank", "Squats"],
      Wednesday: ["Yoga & Core"],
      Thursday: ["Jump Lunges", "Wall Sits"],
      Friday: ["Mountain Climbers", "Jump Squats"]
    }
  },
  "lose_0-10_adult": {
    title: "🔥 Adult Fat Loss (0-10 lbs)",
    days: {
      Monday: ["Cardio (30 min)", "Burpees", "Push-ups"],
      Tuesday: ["Plank", "Mountain Climbers", "Jump Squats"],
      Wednesday: ["Walk or Light Jog"],
      Thursday: ["Sit-ups", "Box Jumps", "Treadmill"],
      Friday: ["Air Bike", "Stretch"]
    }
  },
  "lose_11-20_adult": {
    title: "🔥 Adult Fat Loss (11-20 lbs)",
    days: {
      Monday: ["HIIT Sprints", "Jump Rope", "Burpees"],
      Tuesday: ["Box Jumps", "Core Circuit", "Push Press"],
      Wednesday: ["Mobility Day"],
      Thursday: ["Stair Runs", "Mountain Climbers"],
      Friday: ["Treadmill (Incline)", "Dead Bug"]
    }
  },
  "lose_21+_adult": {
    title: "🔥 Advanced Adult Fat Loss (21+ lbs)",
    days: {
      Monday: ["Intense Cardio", "Dumbbell Snatch", "Rowing"],
      Tuesday: ["Boxing/Kickboxing", "Plank Jacks", "Air Bike"],
      Wednesday: ["Recovery Yoga"],
      Thursday: ["Battle Ropes", "Burpees", "Mountain Climbers"],
      Friday: ["Treadmill Run", "Stretch"]
    }
  }
};

// Generate plan based on inputs
function generatePlan() {
  const currentWeight = parseInt(document.getElementById("currentWeight").value);
  const targetWeight = parseInt(document.getElementById("targetWeight").value);
  const goalType = document.getElementById("goalType").value;
  const ageGroup = document.querySelector("input[name='ageGroup']:checked")?.value;

  if (!currentWeight || !targetWeight || !goalType || !ageGroup) {
    alert("Please fill all fields including age group.");
    return;
  }

  const delta = Math.abs(currentWeight - targetWeight);
  let range = "0-10";
  if (delta > 10 && delta <= 20) range = "11-20";
  else if (delta > 20) range = "21+";

  const planKey = `${goalType}_${range}_${ageGroup}`;
  const plan = plans[planKey];
  if (!plan) {
    document.getElementById("workoutPlan").innerHTML = `<p>No plan available for this goal.</p>`;
    return;
  }

  let content = `<h2>${plan.title}</h2>`;
  for (let [day, list] of Object.entries(plan.days)) {
    content += `<h3>${day}</h3><ul>${list.map(item => `<li>${item}</li>`).join("")}</ul>`;
  }

  document.getElementById("workoutPlan").innerHTML = content;
}
// JavaScript for Workout Planner Enhancements

// Dark mode toggle
const toggleBtn = document.createElement('button');
toggleBtn.innerText = 'Toggle Dark Mode';
toggleBtn.className = 'toggle-dark-mode';
document.body.appendChild(toggleBtn);
toggleBtn.addEventListener('click', () => {
  document.body.classList.toggle('dark-mode');
});

// Gamification - points system
let points = 0;
function addPoints(p) {
  points += p;
  document.getElementById('pointDisplay').innerText = `Points: ${points}`;
}

function calculateBMI() {
  const weight = parseFloat(document.getElementById('weightInput').value);
  const height = parseFloat(document.getElementById('heightInput').value);
  if (!weight || !height) return;
  const bmi = (weight / ((height / 100) ** 2)).toFixed(2);
  document.getElementById('bmiResult').innerText = `Your BMI: ${bmi}`;
}

// Water tracker
function updateWaterLevel(val) {
  document.getElementById('waterValue').innerText = `${val} cups`;
}

// Sleep tracker emoji feedback
function updateSleepEmoji(val) {
  let emoji = '😴';
  if (val >= 8) emoji = '😊';
  else if (val >= 6) emoji = '😌';
  else emoji = '😟';
  document.getElementById('sleepEmoji').innerText = emoji;
}

// Meal emoji
function updateMealEmoji(val) {
  let emoji = '🍽️';
  if (val >= 3) emoji = '🟢';
  else if (val === 2) emoji = '🟡';
  else emoji = '🔴';
  document.getElementById('mealEmoji').innerText = emoji;
}

// Notes saving (localStorage optional)
document.getElementById('saveNote').addEventListener('click', () => {
  const note = document.getElementById('dailyNote').value;
  localStorage.setItem('dailyNote', note);
  alert('Note Saved!');
});

// Load saved note
window.addEventListener('DOMContentLoaded', () => {
  const savedNote = localStorage.getItem('dailyNote');
  if (savedNote) document.getElementById('dailyNote').value = savedNote;
});

// Buddy message
function sendBuddyMessage() {
  const msg = document.getElementById('buddyMessage').value;
  alert(`Sent to buddy: ${msg}`);
}

// Sample streak counter
let streak = 0;
function updateStreak(success) {
  if (success) streak++;
  else streak = 0;
  document.getElementById('streakCounter').innerText = `🔥 Streak: ${streak}`;
}

// On load defaults
window.onload = () => {
  document.getElementById('pointDisplay').innerText = `Points: ${points}`;
  updateWaterLevel(0);
  updateSleepEmoji(0);
  updateMealEmoji(0);
  updateStreak(true);
};
