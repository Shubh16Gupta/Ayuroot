const { spawn } = require("child_process");
const path = require("path");

function runLifestyleModel(inputData) {
  return new Promise((resolve, reject) => {
    const pythonPath = "python3"; // or "python" depending on your system
    const scriptPath = path.join(__dirname, "predict.py");

    // Spawn Python process
    const pyProcess = spawn(pythonPath, [scriptPath], { stdio: ["pipe", "pipe", "pipe"] });

    let output = "";
    let error = "";

    // Capture stdout
    pyProcess.stdout.on("data", (data) => {
      output += data.toString();
    });

    // Capture stderr
    pyProcess.stderr.on("data", (data) => {
      error += data.toString();
    });

    // When process ends
    pyProcess.on("close", (code) => {
      if (code !== 0) {
        reject(new Error(error));
      } else {
        try {
          resolve(JSON.parse(output));
        } catch (e) {
          reject(e);
        }
      }
    });

    // Send JSON input to Python via stdin
    pyProcess.stdin.write(JSON.stringify(inputData));
    pyProcess.stdin.end();
  });
}

module.exports = runLifestyleModel;