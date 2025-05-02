import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import * as math from 'mathjs';

interface DashboardProps {
  onBack: () => void;
}

const Dashboard: React.FC<DashboardProps> = ({ onBack }) => {
  const [numCurves, setNumCurves] = useState(80);
  const [noiseLevel, setNoiseLevel] = useState(0.5);
  const [nbasis, setNbasis] = useState(20);
  const [showNoisy, setShowNoisy] = useState(true);
  const [showSmooth, setShowSmooth] = useState(true);
  const [data, setData] = useState<any[]>([]);
  const [smoothData, setSmoothData] = useState<any[]>([]);

  const generateData = () => {
    // Generate time points
    const n = 500;
    const time = Array.from({ length: n }, (_, i) => (i / n) * 2 * Math.PI);
    
    // Generate base sine wave
    const baseSine = time.map(t => Math.sin(t));
    
    // Generate noisy curves
    const noisyCurves = Array.from({ length: numCurves }, () => 
      baseSine.map(y => y + (Math.random() - 0.5) * noiseLevel)
    );
    
    // Generate smoothed curves using moving average
    const smoothCurves = noisyCurves.map(curve => {
      const windowSize = Math.floor(nbasis / 2);
      return curve.map((_, i) => {
        const start = Math.max(0, i - windowSize);
        const end = Math.min(n, i + windowSize + 1);
        const window = curve.slice(start, end);
        return window.reduce((a, b) => a + b, 0) / window.length;
      });
    });

    // Prepare data for charts
    const chartData = time.map((t, i) => ({
      time: t,
      ...Object.fromEntries(
        noisyCurves.map((curve, j) => [`noisy${j}`, curve[i]])
      )
    }));

    const smoothChartData = time.map((t, i) => ({
      time: t,
      ...Object.fromEntries(
        smoothCurves.map((curve, j) => [`smooth${j}`, curve[i]])
      )
    }));

    setData(chartData);
    setSmoothData(smoothChartData);
  };

  useEffect(() => {
    generateData();
  }, [numCurves, noiseLevel, nbasis]);

  return (
    <div className="min-h-screen bg-data-deep-blue p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-data-blue">Time Series Analysis</h1>
          <button
            onClick={onBack}
            className="px-4 py-2 bg-data-navy text-white rounded-lg hover:bg-data-navy/80 transition-colors"
          >
            Back to Welcome
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* Controls */}
          <div className="md:col-span-1 bg-data-navy p-6 rounded-lg">
            <h2 className="text-xl font-semibold text-data-green mb-4">Parameters</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-white mb-2">Number of Curves</label>
                <input
                  type="range"
                  min="10"
                  max="200"
                  value={numCurves}
                  onChange={(e) => setNumCurves(Number(e.target.value))}
                  className="w-full"
                />
                <span className="text-white">{numCurves}</span>
              </div>

              <div>
                <label className="block text-white mb-2">Noise Level</label>
                <input
                  type="range"
                  min="0.1"
                  max="1.0"
                  step="0.1"
                  value={noiseLevel}
                  onChange={(e) => setNoiseLevel(Number(e.target.value))}
                  className="w-full"
                />
                <span className="text-white">{noiseLevel.toFixed(1)}</span>
              </div>

              <div>
                <label className="block text-white mb-2">Smoothing Window</label>
                <input
                  type="range"
                  min="10"
                  max="50"
                  value={nbasis}
                  onChange={(e) => setNbasis(Number(e.target.value))}
                  className="w-full"
                />
                <span className="text-white">{nbasis}</span>
              </div>

              <div className="space-y-2">
                <label className="flex items-center text-white">
                  <input
                    type="checkbox"
                    checked={showNoisy}
                    onChange={(e) => setShowNoisy(e.target.checked)}
                    className="mr-2"
                  />
                  Show Noisy Data
                </label>
                <label className="flex items-center text-white">
                  <input
                    type="checkbox"
                    checked={showSmooth}
                    onChange={(e) => setShowSmooth(e.target.checked)}
                    className="mr-2"
                  />
                  Show Smoothed Data
                </label>
              </div>

              <button
                onClick={generateData}
                className="w-full px-4 py-2 bg-data-blue text-white rounded-lg hover:bg-data-blue/80 transition-colors"
              >
                Generate New Data
              </button>
            </div>
          </div>

          {/* Charts */}
          <div className="md:col-span-3 space-y-6">
            {showNoisy && (
              <div className="bg-data-navy p-6 rounded-lg">
                <h2 className="text-xl font-semibold text-data-green mb-4">Noisy Functional Data</h2>
                <div className="h-[400px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={data}>
                      <CartesianGrid stroke="#333333" />
                      <XAxis dataKey="time" stroke="#FFFFFF" />
                      <YAxis stroke="#FFFFFF" />
                      <Tooltip
                        contentStyle={{ backgroundColor: '#0d1c3f', border: '1px solid #3aa5ff' }}
                        labelStyle={{ color: '#FFFFFF' }}
                      />
                      {Array.from({ length: Math.min(5, numCurves) }, (_, i) => (
                        <Line
                          key={`noisy${i}`}
                          type="monotone"
                          dataKey={`noisy${i}`}
                          stroke="#3aa5ff"
                          strokeWidth={1}
                          dot={false}
                          opacity={0.3}
                        />
                      ))}
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>
            )}

            {showSmooth && (
              <div className="bg-data-navy p-6 rounded-lg">
                <h2 className="text-xl font-semibold text-data-green mb-4">Smoothed Functional Data</h2>
                <div className="h-[400px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={smoothData}>
                      <CartesianGrid stroke="#333333" />
                      <XAxis dataKey="time" stroke="#FFFFFF" />
                      <YAxis stroke="#FFFFFF" />
                      <Tooltip
                        contentStyle={{ backgroundColor: '#0d1c3f', border: '1px solid #3aa5ff' }}
                        labelStyle={{ color: '#FFFFFF' }}
                      />
                      {Array.from({ length: Math.min(5, numCurves) }, (_, i) => (
                        <Line
                          key={`smooth${i}`}
                          type="monotone"
                          dataKey={`smooth${i}`}
                          stroke="#46e991"
                          strokeWidth={1}
                          dot={false}
                          opacity={0.3}
                        />
                      ))}
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard; 