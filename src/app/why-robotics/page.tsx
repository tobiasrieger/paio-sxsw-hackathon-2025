import Image from 'next/image';

export default function WhyRoboticsPage() {
  return (
    <div className="bg-white min-h-screen">
      <div className="max-w-screen-2xl mx-auto px-8 pt-6">
        <div className="flex items-baseline gap-4 pb-4 border-b border-gray-200">
          <h1 className="text-3xl font-light tracking-tight text-black">
            Why robotics?
          </h1>
        </div>
      </div>

      <div className="grid">
        {/* Section 01 */}
        <div className="pt-6 pb-6 bg-white">
          <div className="max-w-screen-2xl mx-auto px-8">
            <div className="text-xs text-gray-500 mb-4 font-mono">Section 01</div>
            <div className="min-h-[200px] flex items-center justify-center">
              <h2 className="text-4xl font-light tracking-tight text-center max-w-4xl">
                Within four years, robots will stock the shelves at Woolies
              </h2>
            </div>
          </div>
        </div>

        {/* Section 02 */}
        <div className="py-6 bg-gray-50">
          <div className="max-w-screen-2xl mx-auto px-8">
            <div className="text-xs text-gray-500 mb-4 font-mono">Section 02</div>
            <div className="min-h-[200px]">
              <h2 className="text-2xl font-light tracking-tight mb-6 text-center">Core Beliefs</h2>
              <div className="flex justify-center">
                <div className="grid grid-cols-3 gap-4 max-w-2xl">
                  <div className="border border-gray-200 bg-white w-32 h-32 flex items-center justify-center p-4">
                    <p className="text-center text-xs">The world is anthropocentric</p>
                  </div>
                  <div className="border border-gray-200 bg-white w-32 h-32 flex items-center justify-center p-4">
                    <p className="text-center text-xs">General solutions bring cost down</p>
                  </div>
                  <div className="border border-gray-200 bg-white w-32 h-32 flex items-center justify-center p-4">
                    <p className="text-center text-xs">Intelligence fixes all shortcomings</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Section 03 */}
        <div className="py-6 bg-white relative overflow-hidden">
          <div className="absolute right-0 bottom-0 w-64 h-96">
            <Image
              src="/images/Figure-03.png"
              alt="Figure 03 Robot"
              fill
              style={{ objectFit: 'contain', objectPosition: 'bottom right' }}
            />
          </div>
          <div className="max-w-screen-2xl mx-auto px-8 relative z-10">
            <div className="text-xs text-gray-500 mb-4 font-mono">Section 03</div>
            <div className="min-h-[200px]">
              <h2 className="text-2xl font-light tracking-tight mb-8 text-center">
                Hardware is here and software is progressing incredibly rapidly
              </h2>
              <div className="grid grid-cols-2 gap-8 max-w-4xl mx-auto">
                {/* Left Column - Hardware */}
                <div>
                  <h3 className="text-lg font-light mb-4">Hardware</h3>
                  <div className="space-y-3">
                    <div className="border border-gray-200 bg-white p-4">
                      <p className="text-sm font-medium">Figure 03</p>
                      <p className="text-xs text-gray-500 mt-1">October 2025</p>
                    </div>
                    <div className="border border-gray-200 bg-white p-4">
                      <p className="text-sm font-medium">Unitree G1</p>
                      <p className="text-xs text-gray-500 mt-1">Late 2024</p>
                    </div>
                    <div className="border border-gray-200 bg-white p-4">
                      <p className="text-sm font-medium">Agility Digit</p>
                      <p className="text-xs text-gray-500 mt-1">Late 2023</p>
                    </div>
                  </div>
                </div>

                {/* Right Column - Policy Models */}
                <div>
                  <h3 className="text-lg font-light mb-4">Policy Models</h3>
                  <div className="space-y-3">
                    <div className="border border-gray-200 bg-white p-4">
                      <p className="text-sm font-medium">Gemini Robotics 1.5</p>
                      <p className="text-xs text-gray-500 mt-1">September 2025</p>
                    </div>
                    <div className="border border-gray-200 bg-white p-4">
                      <p className="text-sm font-medium">NVIDIA GR00T N1.5</p>
                      <p className="text-xs text-gray-500 mt-1">May 2025</p>
                    </div>
                    <div className="border border-gray-200 bg-white p-4">
                      <p className="text-sm font-medium">Physical Intelligence 0.5</p>
                      <p className="text-xs text-gray-500 mt-1">April 2025</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Section 04 */}
        <div className="py-6 bg-gray-50">
          <div className="max-w-screen-2xl mx-auto px-8">
            <div className="text-xs text-gray-500 mb-4 font-mono">Section 04</div>
            <div className="min-h-[200px]">
              {/* Content will be added here */}
            </div>
          </div>
        </div>

        {/* Section 05 */}
        <div className="py-6 bg-white">
          <div className="max-w-screen-2xl mx-auto px-8">
            <div className="text-xs text-gray-500 mb-4 font-mono">Section 05</div>
            <div className="min-h-[200px]">
              {/* Content will be added here */}
            </div>
          </div>
        </div>

        {/* Section 06 */}
        <div className="py-6 bg-gray-50">
          <div className="max-w-screen-2xl mx-auto px-8">
            <div className="text-xs text-gray-500 mb-4 font-mono">Section 06</div>
            <div className="min-h-[200px]">
              {/* Content will be added here */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
