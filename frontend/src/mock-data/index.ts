export const performanceData = [
  { month: "Jan", score: 72, predicted: 75 },
  { month: "Feb", score: 75, predicted: 78 },
  { month: "Mar", score: 78, predicted: 80 },
  { month: "Apr", score: 82, predicted: 84 },
  { month: "May", score: 85, predicted: 87 },
  { month: "Jun", score: 88, predicted: 91 },
  { month: "Jul", score: 91, predicted: 93 },
];

export const subjectData = [
  { subject: "Math", score: 92 },
  { subject: "Science", score: 88 },
  { subject: "English", score: 84 },
  { subject: "History", score: 78 },
  { subject: "Art", score: 95 },
];

export const attendance = [
  { date: "2026-04-21", subject: "Mathematics", status: "Present" },
  { date: "2026-04-22", subject: "Science", status: "Present" },
  { date: "2026-04-23", subject: "English", status: "Late" },
  { date: "2026-04-24", subject: "History", status: "Present" },
  { date: "2026-04-25", subject: "Art", status: "Absent" },
];

export const assignments = [
  { id: 1, title: "Algebra Worksheet 12", subject: "Math", due: "Apr 28", status: "Pending" },
  { id: 2, title: "Photosynthesis Essay", subject: "Science", due: "Apr 30", status: "Submitted" },
  { id: 3, title: "Shakespeare Analysis", subject: "English", due: "May 02", status: "Pending" },
];

export const students = [
  { id: 1, name: "Aarav Sharma", grade: "10A", avg: 92, attendance: 96 },
  { id: 2, name: "Mia Patel", grade: "10A", avg: 88, attendance: 94 },
  { id: 3, name: "Liam Chen", grade: "10A", avg: 76, attendance: 88 },
  { id: 4, name: "Sofia Rossi", grade: "10A", avg: 95, attendance: 99 },
  { id: 5, name: "Noah Kim", grade: "10A", avg: 71, attendance: 82 },
];

export const users = [
  { id: 1, name: "Emma Stone", email: "emma@school.edu", role: "Student", status: "Active" },
  { id: 2, name: "John Doe", email: "john@school.edu", role: "Parent", status: "Active" },
  { id: 3, name: "Sara Ali", email: "sara@school.edu", role: "Teacher", status: "Active" },
  { id: 4, name: "Mark Lee", email: "mark@school.edu", role: "Admin", status: "Active" },
  { id: 5, name: "Priya Rao", email: "priya@school.edu", role: "Student", status: "Inactive" },
];

export const quiz = [
  {
    q: "What is the value of π (pi) to two decimal places?",
    options: ["3.12", "3.14", "3.16", "3.18"],
    answer: 1,
  },
  {
    q: "Which planet is known as the Red Planet?",
    options: ["Venus", "Jupiter", "Mars", "Saturn"],
    answer: 2,
  },
  {
    q: "Who wrote 'Romeo and Juliet'?",
    options: ["Dickens", "Shakespeare", "Hemingway", "Austen"],
    answer: 1,
  },
];

export const alerts = [
  { id: 1, type: "warning", title: "Attendance dropped to 82%", time: "2h ago" },
  { id: 2, type: "info", title: "Math quiz scheduled tomorrow", time: "5h ago" },
  { id: 3, type: "success", title: "Science assignment submitted", time: "1d ago" },
];

export const weeklyProgress = [
  { day: "Mon", hours: 2.5 },
  { day: "Tue", hours: 3.1 },
  { day: "Wed", hours: 1.8 },
  { day: "Thu", hours: 4.0 },
  { day: "Fri", hours: 3.4 },
  { day: "Sat", hours: 2.0 },
  { day: "Sun", hours: 1.2 },
];
