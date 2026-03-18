// data/homepageData.js
import {
  UserCog, UserCheck, FileInput, Workflow, Clock3,
  ChartLine, Sparkles, Lock, ShieldCheck, Zap, Brain,
} from "lucide-react";

const homeData = {
  hero: {
    badge: "Smart workflow for digitization hubs",
    title: "DocuTracker",
    subtitle:
      "A document workflow platform for assigning, tracking, and reporting on digitization hub tasks with clarity, speed, and accountability.",
    primaryAction: "Login to Dashboard",
    secondaryAction: "Learn How It Works",
    stats: [
      { label: "Documents Processed", value: "2,400+" },
      { label: "Tasks Tracked", value: "580+" },
      { label: "Workflow Accuracy", value: "99.2%" },
    ],
  },

  systemStatus: [
    "Digitization Hub Online",
    "Task Tracking Active",
   // "Secure Access Enabled",
  ],

  about: {
    title: "What is DocuTracker?",
    description:
      "DocuTracker is a smart task management and document digitization platform designed for dha digitization hub. It helps managers assign work, monitor progress, and maintain workflow visibility across the full document lifecycle.",
    whyTitle: "Why Use DocuTracker?",
    whyDescription:
      "The platform supports informed task allocation by considering user roles, availability, and workflow history. This helps teams reduce idle time, improve coordination, and maintain operational consistency.",
  },

  features: [
    {
      title: "Manager Tools",
      icon: UserCog,
      items: [
        "Assign tasks by role or availability",
        "View performance insights and history",
        "Monitor workflow and efficiency in real time",
        "Generate and export activity reports",
      ],
    },
    {
      title: "Worker Dashboard",
      icon: UserCheck,
      items: [
        "View assigned tasks and due dates",
        "Update task progress with ease",
        "Mark completion and add comments",
        "Track personal performance trends",
      ],
    },
  ],

  workflow: [
    {
      step: "Step 1",
      title: "Receive Physical Documents",
      description:
        "Drivers deliver batches of physical documents to the digitization hub.",
      icon: FileInput,
    },
    {
      step: "Step 2",
      title: "Assign Tasks",
      description:
        "Managers assign roles such as indexing, scanning, quality control, and assembly to staff.",
      icon: Workflow,
    },
    {
      step: "Step 3",
      title: "Perform & Track Work",
      description:
        "Staff complete assigned tasks while the system tracks time, status, and performance.",
      icon: Clock3,
    },
    {
      step: "Step 4",
      title: "Monitor & Report",
      description:
        "Managers monitor progress, detect bottlenecks, and generate operational reports.",
      icon: ChartLine,
    },
  ],

  faqs: [
    {
      question: "What is DocuTracker?",
      answer:
        "DocuTracker is a task and workflow manager for dha digitization hub which handles sensitive documents. It helps managers assign and monitor tasks while staff execute them efficiently.",
      icon: Sparkles,
    },
    {
      question: "Who can access the system?",
      answer:
        "Only authorized personnel with valid login credentials, including managers and document-processing staff.",
      icon: Lock,
    },
    {
      question: "Is my data secure?",
      answer:
        "Yes. DocuTracker uses secure server communication and validates access throughout the workflow to support document integrity and privacy.",
      icon: ShieldCheck,
    },
    {
      question: "How fast is task tracking?",
      answer:
        "Task updates are reflected in real time, helping teams respond quickly to progress changes, delays, or bottlenecks.",
      icon: Zap,
    },
  ],

  aiUsage: [
    {
      title: "Smart Task Assignment",
      description:
        "AI analyzes roles, assignment history, and availability to recommend the most suitable person for each task.",
      icon: UserCheck,
    },
    {
      title: "Anomaly Detection",
      description:
        "The system flags unusual workflow patterns such as skipped steps, repeated delays, or abnormal completion times.",
      icon: ShieldCheck,
    },
    {
      title: "Time Estimation & Planning",
      description:
        "Predicted completion times help managers plan workloads, reduce bottlenecks, and improve deadline awareness.",
      icon: Clock3,
    },
    {
      title: "AI Assistant",
      description:
        "A built-in assistant can guide users through the platform, answer common questions, and support decision-making.",
      icon: Brain,
    },
  ],
};

export default homeData;