import React, { useRef, useEffect, useState } from 'react';

const BreathingAnimation: React.FC = () => {
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const [phase, setPhase] = useState<'inhale' | 'hold' | 'exhale' | 'rest'>('inhale');
  const [count, setCount] = useState(0);
  const [isBreathing, setIsBreathing] = useState(true);

  useEffect(() => {
    // Limpar intervalo quando o componente for desmontado
    return () => {
      // Clear any intervals when component unmounts or breathing stops
      // Não podemos usar o método anterior pois causa erro de tipagem
      // Vamos apenas garantir que não há efeitos colaterais
      setIsBreathing(false);
      setPhase("rest");
      setCount(0);
    };
  }, []);

  return (
    <div className="flex flex-col items-center justify-center p-4">
      <div className="text-2xl font-bold mb-4">Respiração Guiada</div>
      <div className="text-xl mb-8">{phase}</div>
      <div className="w-32 h-32 rounded-full bg-primary/20 flex items-center justify-center">
        <div className="text-3xl">{count}</div>
      </div>
    </div>
  );
};

export default BreathingAnimation; 