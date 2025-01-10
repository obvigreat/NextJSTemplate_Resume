import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import DealsLayout from './layout';
import { analyzeDocument } from '../../lib/analyzeDocuments';

interface AnalysisResult {
  documentId: string;
  jsonId: string;
  status: 'pending' | 'completed' | 'error';
  error?: string;
}

export default function AnalyzePage() {
  const router = useRouter();
  const [isAnalyzing, setIsAnalyzing] = useState(true);
  const [results, setResults] = useState<AnalysisResult[]>([]);
  const { documentIds } = router.query;

  useEffect(() => {
    async function processDocuments() {
      if (!documentIds) return;

      const ids = typeof documentIds === 'string' 
        ? documentIds.split(',')
        : Array.isArray(documentIds) 
          ? documentIds 
          : [];

      const initialResults = ids.map(id => ({
        documentId: id,
        jsonId: '',
        status: 'pending' as const
      }));
      setResults(initialResults);

      for (const id of ids) {
        try {
          const { jsonId } = await analyzeDocument(id);
          setResults(prev => prev.map(r => 
            r.documentId === id 
              ? { ...r, jsonId, status: 'completed' as const }
              : r
          ));
        } catch (error: any) {
          setResults(prev => prev.map(r => 
            r.documentId === id 
              ? { ...r, status: 'error' as const, error: error.message || 'Unknown error' }
              : r
          ));
        }
      }

      setIsAnalyzing(false);
    }

    processDocuments();
  }, [documentIds]);

  const handleCreateProfile = () => {
    // To be implemented
    console.log('Creating profile with JSON IDs:', results.map(r => r.jsonId));
  };

  return (
    <DealsLayout>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="md:flex md:items-center md:justify-between">
          <div className="min-w-0 flex-1">
            <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
              Analyzing Documents
            </h2>
          </div>
        </div>

        <div className="mt-8 bg-white shadow sm:rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            {isAnalyzing ? (
              <div className="flex flex-col items-center justify-center py-12">
                <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-indigo-600"></div>
                <p className="mt-4 text-sm text-gray-500">Analyzing documents...</p>
              </div>
            ) : (
              <div>
                <h3 className="text-lg font-medium text-gray-900">Analysis Results</h3>
                <ul className="mt-3 divide-y divide-gray-200">
                  {results.map((result) => (
                    <li key={result.documentId} className="py-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-gray-900">
                            Document ID: {result.documentId}
                          </p>
                          {result.status === 'completed' && (
                            <p className="text-xs text-gray-500">
                              JSON ID: {result.jsonId}
                            </p>
                          )}
                        </div>
                        <span
                          className={`px-2 py-1 text-xs font-medium rounded-full ${
                            result.status === 'completed'
                              ? 'bg-green-100 text-green-800'
                              : result.status === 'error'
                              ? 'bg-red-100 text-red-800'
                              : 'bg-yellow-100 text-yellow-800'
                          }`}
                        >
                          {result.status}
                        </span>
                      </div>
                      {result.error && (
                        <p className="mt-1 text-sm text-red-600">{result.error}</p>
                      )}
                    </li>
                  ))}
                </ul>

                {results.some(r => r.status === 'completed') && (
                  <div className="mt-6">
                    <button
                      onClick={handleCreateProfile}
                      className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      Create Profile
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </DealsLayout>
  );
} 