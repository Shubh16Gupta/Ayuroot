import sys
import json
import joblib
import numpy as np
import os

# Correct path to the model file
model_path = os.path.join(os.path.dirname(__file__), "ai_models", "lifestyle_model.pkl")
model = joblib.load(model_path)  # Load model only once

# Determine lifestyle status based on score
def get_status(score):
    if score < 2.5:
        return "Needs improvement"
    elif score < 3.5:
        return "Moderately balanced"
    else:
        return "Balanced lifestyle"

# Generate suggestions based on weakest areas and overall score
def get_suggestions(sleep, food, exercise, stress, energy, water, score):
    suggestions = []

    values = {
        "sleep": sleep,
        "food": food,
        "exercise": exercise,
        "energy": energy,
        "water": water,
        "stress": 6 - stress  # Lower stress is better
    }

    weakest = min(values, key=values.get)

    if score < 2.5:
        suggestions.append(
            "Your routine shows overall imbalance. Focus on sleep, diet, and movement consistency."
        )

    if weakest == "sleep":
        suggestions.append("Improving sleep timing may significantly boost recovery and energy.")
    elif weakest == "food":
        suggestions.append("Your diet pattern needs consistency. Prefer warm, freshly cooked meals.")
    elif weakest == "exercise":
        suggestions.append("Low activity is affecting lifestyle balance. Add walking or yoga daily.")
    elif weakest == "stress":
        suggestions.append("Stress seems to be the dominant factor. Try pranayama or meditation.")
    elif weakest == "energy":
        suggestions.append("Energy fluctuations suggest irregular routine or sleep cycle.")
    elif weakest == "water":
        suggestions.append("Hydration levels are low. Increase warm water intake.")

    if score > 3.8:
        suggestions.append("Your lifestyle pattern looks stable. Maintain this routine.")

    return suggestions

# Predict lifestyle score and return results including metrics for frontend
def predict_lifestyle(input_data):
    features = np.array([[
        input_data["age"],
        input_data["sleep_avg"],
        input_data["food_avg"],
        input_data["exercise_avg"],
        input_data["stress_avg"],
        input_data["energy_avg"],
        input_data["water_avg"]
    ]])

    score = model.predict(features)[0]
    score = round(float(score), 2)

    # Include metrics for frontend charts
    metrics = {
        "sleep": input_data["sleep_avg"],
        "food": input_data["food_avg"],
        "exercise": input_data["exercise_avg"],
        "stress": input_data["stress_avg"],
        "energy": input_data["energy_avg"],
        "water": input_data["water_avg"]
    }

    return {
        "score": score,
        "status": get_status(score),
        "suggestions": get_suggestions(
            input_data["sleep_avg"],
            input_data["food_avg"],
            input_data["exercise_avg"],
            input_data["stress_avg"],
            input_data["energy_avg"],
            input_data["water_avg"],
            score
        ),
        "metrics": metrics  # ✅ Added for frontend
    }

if __name__ == "__main__":
    # Read JSON input from stdin
    input_json = sys.stdin.read()
    input_data = json.loads(input_json)

    result = predict_lifestyle(input_data)
    print(json.dumps(result))