# CNPJ Insights Dashboard

A modern and professional web application to consult and process company data in bulk using the public ReceitaWS API. This tool was designed to optimize the routine of analyzing multiple companies, providing a rich and interactive interface.

<img width="1014" height="883" alt="image" src="https://github.com/user-attachments/assets/ca975ac1-23c0-49bd-9b6f-9febc4b65fbe" />
Check it out: https://cnpj-insights-dashboard.vercel.app/
---

## 🚀 Case Study: From Manual Labor to Insightful Dashboards

### The Challenge

In many back-office and financial departments, there's a recurring need to consult information for a large number of companies (identified by their CNPJ). This process, when done manually, is slow, error-prone, and consumes valuable hours that could be used for more strategic analysis. The challenge was to automate this task in a way that was fast, reliable, and user-friendly for non-technical users.

### The Solution

The CNPJ Insights Dashboard was developed to tackle this challenge head-on. It's a web application that allows users to upload a spreadsheet with a list of CNPJs and automatically enriches it with public data obtained from the ReceitaWS API.

The application was built with a focus on user experience and resilience, incorporating advanced features such as:

*   **Checkpoint System:** The application automatically saves the progress, allowing the user to resume from where they left off in case of a browser crash or network interruption.
*   **Real-time Logs:** A detailed log provides full visibility into the process, showing the status of each query.
*   **Rate Limiting Handling:** The interface intelligently handles the API's rate limits (3 requests per minute), providing clear feedback to the user about the waiting time.

### The Impact

*   **Efficiency:** Reduced the time spent on consulting hundreds of CNPJs from hours to minutes.
*   **Accuracy:** Eliminated manual data entry errors.
*   **User Empowerment:** Provided a tool that can be used by anyone in the team, without needing technical knowledge.

---

## ✨ Key Features

*   **File Upload:** Supports Excel (.xlsx, .xls) and CSV files.
*   **Automatic CNPJ Formatting:** Handles CNPJs with or without special characters.
*   **Resilient Processing:** Automatically handles API rate limits and network errors.
*   **Partial and Complete Download:** Download the results at any time during the process.
*   **Modern and Responsive UI:** Built with React and Tailwind CSS for a great experience on any device.

---

## 🛠️ Technologies Used

*   **Frontend:** React, Vite, TypeScript, Tailwind CSS
*   **Libraries:** `xlsx` for spreadsheet manipulation.
*   **API:** [ReceitaWS](https://receitaws.com.br/)

---

## 📦 How to Run Locally

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/AdrianHaelisson/cnpj-insights-dashboard.git
    cd cnpj-insights-dashboard
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Run the development server:**
    ```bash
    npm run dev
    ```

4.  Open your browser and navigate to `http://localhost:5173`.

---

## 🚀 How to Deploy

This project can be easily deployed for free on [Vercel](https://vercel.com/).

1.  **Fork this repository.**
2.  Go to your Vercel dashboard and click "Add New... > Project".
3.  Import the forked repository.
4.  Vercel will automatically detect that it's a Vite project and configure the build settings.
5.  Click "Deploy" and you're done!

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).
