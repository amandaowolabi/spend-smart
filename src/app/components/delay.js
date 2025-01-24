import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function Delay() {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push('/dashboard');  
    }, 2000); 

    return () => clearTimeout(timer); 
  }, [router]);

  return null; 
};
