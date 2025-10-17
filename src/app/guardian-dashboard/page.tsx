import RobotCard from '../components/RobotCard';

export default function GuardianDashboardPage() {
  return (
    <div className="px-8 py-6">
      <div className="flex items-baseline gap-4 pb-6 border-b border-gray-200 mb-6">
        <h1 className="text-3xl font-light tracking-tight">
          Guardian Dashboard
        </h1>
        <p className="text-sm text-gray-600">Dashboard monitoring safety and efficiency of robotics deployments</p>
      </div>
      <div className="max-w-screen-2xl">
        <div className="grid grid-cols-2 gap-6">
          <RobotCard
            name="G-465"
            hardware="Unitree G1"
            policyModel="Physical Intelligence 0.5"
            uptime="8h 45m"
            batteryLevel={87}
            taskProgress="Restocking aisle 3 (72%)"
            status="active"
            enableWebcam={true}
          />
          <RobotCard
            name="G-782"
            hardware="Unitree G1"
            policyModel="Google Gemini Robotics"
            uptime="12h 17m"
            batteryLevel={30}
            taskProgress="Inventory scan (45%)"
            status="charging"
          />
        </div>
      </div>
    </div>
  );
}
