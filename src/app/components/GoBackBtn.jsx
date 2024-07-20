'use client';
import { useRouter } from 'next/navigation';
import { FaArrowLeft } from 'react-icons/fa';

export default function GoBackBtn() {
  const router = useRouter();
  return (
    <div className="flex">
      <button
        onClick={() => router.back()}
        className="flex items-center gap-4 border p-2 rounded-md">
        <FaArrowLeft /> Go back
      </button>
    </div>
  );
}
