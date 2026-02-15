import { ReactNode } from 'react';

interface ResultsLayoutProps {
  imageUrl: string;
  children: ReactNode;
}

export function ResultsLayout({ imageUrl, children }: ResultsLayoutProps) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 animate-slideIn">
      {/* Left side - Photo */}
      <div className="animate-slideFromLeft">
        <div className="sticky top-8">
          <div className="bg-white rounded-2xl border-2 border-green-200 p-4 shadow-lg overflow-hidden">
            <img 
              src={imageUrl} 
              alt="Plant identification" 
              className="w-full h-auto rounded-xl object-cover max-h-[600px]"
            />
          </div>
          <div className="mt-4 text-center">
            <p className="text-sm text-green-600 font-sans">Uploaded Plant Image</p>
          </div>
        </div>
      </div>

      {/* Right side - Information */}
      <div className="animate-slideFromRight space-y-6">
        {children}
      </div>

      <style jsx>{`
        @keyframes slideIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes slideFromLeft {
          from {
            opacity: 0;
            transform: translateX(-50px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes slideFromRight {
          from {
            opacity: 0;
            transform: translateX(50px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        .animate-slideIn {
          animation: slideIn 0.4s ease-out;
        }

        .animate-slideFromLeft {
          animation: slideFromLeft 0.6s ease-out;
        }

        .animate-slideFromRight {
          animation: slideFromRight 0.6s ease-out 0.2s backwards;
        }
      `}</style>
    </div>
  );
}

// Example usage in your IdentifyClientPage:
// 
// const [result, setResult] = useState(null);
// const [uploadedImage, setUploadedImage] = useState('');
//
// if (result && uploadedImage) {
//   return (
//     <ResultsLayout imageUrl={uploadedImage}>
//       <InfoCard title="Basic Information">
//         <p>Common Name: {result.commonName}</p>
//         <p>Scientific Name: {result.scientificName}</p>
//         {/* ... more info */}
//       </InfoCard>
//       {/* ... more cards */}
//     </ResultsLayout>
//   );
// }