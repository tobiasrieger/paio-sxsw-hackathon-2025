# PAIO

**Physical AI Monitoring and Operations Platform**

A comprehensive dashboard for monitoring and managing deployed physical AI robots, built for SXSW 2025 hackathon.

## The Problem

Physical AI robots are rapidly advancing. Hardware platforms like **Figure 03**, **Unitree G1**, and **Agility Digit** are production-ready, while policy models from **Gemini Robotics**, **NVIDIA GR00T**, and **Physical Intelligence** are enabling increasingly capable autonomous behaviors.

As companies begin deploying these physical AI agents in real-world environments, they face critical challenges:

- **Deployment and integration are difficult** - Getting robots operational across different facilities and workflows is complex
- **Safety is a major concern** - Working among humans requires rigorous oversight and intervention capabilities
- **Lack of visibility** - Teams have no unified view of how their physical AI agents behave across systems
- **Performance tracking is hard** - Monitoring uptime, reliability, and ROI across robot fleets is a challenge
- **No centralized monitoring** - Unlike software agents, physical AI lacks comprehensive observability platforms

Companies need a way to track their physical AI agents' performance, ensure safety, and maximize their return on investment.

## The Solution

PAIO is a monitoring and operations platform specifically designed for physical AI agents. It provides the visibility, safety oversight, and operational intelligence that companies need to successfully deploy robot fleets at scale.

**Key capabilities:**

- **Unified Monitoring Dashboard** - Track all deployed robots in one place with real-time status, uptime, usage metrics, and productivity impact
- **Guardian Safety System** - Critical safety oversight with human-in-the-loop intervention controls, emergency stop capabilities, and behavior monitoring
- **Analytics & Health Scores** - Comprehensive performance analytics, agent health scores, and ROI tracking
- **Real-time Alerts** - Proactive notifications for safety concerns, performance degradation, and operational issues
- **Multi-Provider Integration** - Support for different policy model providers (Physical Intelligence, NVIDIA GR00T, Gemini Robotics) and foundation model backends (Anthropic, OpenAI, Groq)
- **Deployment Tracking** - Manage robot deployments across multiple facilities, environments, and use cases

PAIO gives operations teams the visibility and control they need to deploy physical AI safely and effectively.

## Core Features

### Robot Monitoring Dashboard
Real-time monitoring of deployed physical AI robots with status tracking, telemetry, performance metrics, and fleet-wide analytics.

### Guardian Safety System
Critical safety and oversight features for robot operations, including emergency intervention controls, behavior boundaries, and human-robot interaction monitoring.

### Ops Platform
Operational management tools for robot fleets with deployment tracking, performance analytics, and productivity measurement.

## Tech Stack

- **Framework**: Next.js 15.5.5 with App Router
- **UI**: React 19, TypeScript, Tailwind CSS 4
- **Build Tool**: Turbopack for fast development and production builds
- **Fonts**: Geist Sans and Geist Mono

## Getting Started

### Prerequisites

- Node.js (v18 or higher recommended)
- npm, yarn, pnpm, or bun

### Installation

```bash
npm install
```

### Configuration

Create a `.env.local` file in the root directory and add your Gemini API key:

```bash
GEMINI_API_KEY=your_gemini_api_key_here
```

**Important:** This API key is required for the application to function properly. You can obtain a Gemini API key from [Google AI Studio](https://makersuite.google.com/app/apikey).

### Development

Run the development server with Turbopack:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the dashboard.

The page auto-updates as you edit files. Start by modifying `src/app/page.tsx`.

### Building for Production

```bash
npm run build
```

### Running Production Build

```bash
npm start
```

Note: You must run `npm run build` before starting the production server.

### Linting

```bash
npm run lint
```

## Hackathon Context

PAIO was built for the **SXSW 2025 hackathon** in response to the challenge of monitoring AI agents at scale. While the challenge focused on software agents, we identified physical AI/robotics as an emerging domain with even greater monitoring needs due to safety-critical operations and real-world deployment complexity.

Our platform addresses the core challenge requirements:
- ✅ Monitors all deployed AI agents (physical robots) with uptime, usage, and productivity tracking
- ✅ Provides visibility into how agents behave across systems
- ✅ Delivers alerts, analytics, and agent health scores
- ✅ Supports integration with multiple AI providers and policy models
- ✅ Enables teams to track performance, reliability, and ROI

## Project Structure

```
src/
  app/                  # Next.js App Router pages and layouts
    layout.tsx          # Root layout with fonts and metadata
    page.tsx            # Homepage/main dashboard
    why-robotics/       # Problem statement and context page
    globals.css         # Global styles and Tailwind configuration
```

## Design System

This project follows a minimalist, professional design system with:

- Clean typography using Geist Sans and Geist Mono
- Minimalist gray-scale color palette with semantic status colors
- Consistent spacing and layout patterns
- Smooth transitions and interactive states

See `DESIGN_SYSTEM.md` for complete design guidelines.

## Development Notes

- Uses Next.js 15 App Router architecture (not Pages Router)
- TypeScript strict mode enabled
- Path alias `@/*` maps to `./src/*`
- Turbopack enabled for both dev and production builds
- Image optimization via `next/image` component

## Contributing

This is a hackathon project for SXSW 2025. For questions or contributions, please contact the project maintainers.

## License

[Add your license here]
