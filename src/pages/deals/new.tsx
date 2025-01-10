import { useState } from 'react';
import { useRouter } from 'next/router';
import { 
  ArrowUpTrayIcon, 
  DocumentTextIcon, 
  XCircleIcon,
} from '@heroicons/react/24/outline';
import DealsLayout from './layout';

interface UploadedFile {
  name: string;
  type: string;
  id?: string;
}

const ACCEPTED_FILE_TYPES = {
  'application/pdf': '.pdf',
  'application/msword': '.doc',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document': '.docx',
  'application/vnd.ms-excel': '.xls',
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': '.xlsx',
  'text/csv': '.csv',
  'application/csv': '.csv'
};

const FILE_TYPE_NAMES: {[key: string]: string} = {
  '.pdf': 'PDF',
  '.doc': 'Word',
  '.docx': 'Word',
  '.xls': 'Excel',
  '.xlsx': 'Excel',
  '.csv': 'CSV'
};

export default function NewDeal() {
  const router = useRouter();
  const [files, setFiles] = useState<UploadedFile[]>([]);
  const [error, setError] = useState<string | null>(null);

  const validateFile = (file: File) => {
    // Check if file type is accepted
    const isValidType = Object.keys(ACCEPTED_FILE_TYPES).includes(file.type);
    if (!isValidType) {
      throw new Error(`Invalid file type for ${file.name}. Accepted types are: PDF, Word, Excel, and CSV files.`);
    }

    // Check file size (10MB limit)
    const maxSize = 10 * 1024 * 1024; // 10MB in bytes
    if (file.size > maxSize) {
      throw new Error(`File size exceeds 10MB limit: ${file.name}`);
    }

    return true;
  };

  const getFileExtension = (file: File): string => {
    const extension = Object.entries(ACCEPTED_FILE_TYPES).find(([mimeType]) => mimeType === file.type);
    return extension ? extension[1] : '';
  };

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const uploadedFile = event.target.files?.[0];
    if (!uploadedFile) return;

    try {
      validateFile(uploadedFile);

      // Check if file already exists in the list
      const existingFile = files.find(f => f.name === uploadedFile.name);
      if (existingFile) {
        setError(`File "${uploadedFile.name}" has already been uploaded.`);
        return;
      }
      
      const formData = new FormData();
      formData.append('file', uploadedFile);

      const response = await fetch('/api/analyze-document', {
        method: 'POST',
        body: formData
      });

      const result = await response.json();
      
      if (result.success && result.document) {
        if (result.exists) {
          setError(`File "${uploadedFile.name}" already exists in the system.`);
        } else {
          setFiles(prev => [...prev, {
            name: uploadedFile.name,
            type: getFileExtension(uploadedFile),
            id: result.document.id
          }]);
        }
      }
    } catch (err: any) {
      setError(err.message);
    }
  };

  const removeFile = (fileName: string) => {
    setFiles(prev => prev.filter(f => f.name !== fileName));
  };

  const handleAnalyze = () => {
    const documentIds = files.map(f => f.id).filter(Boolean);
    if (documentIds.length === 0) {
      setError('No files to analyze');
      return;
    }
    router.push({
      pathname: '/deals/analyze',
      query: { documentIds: documentIds.join(',') }
    });
  };

  return (
    <DealsLayout>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="md:flex md:items-center md:justify-between">
          <div className="min-w-0 flex-1">
            <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
              Upload Financial Documents
            </h2>
          </div>
        </div>

        {error && (
          <div className="mt-4 p-4 bg-red-50 text-red-700 rounded-md">
            {error}
          </div>
        )}

        <div className="mt-8 bg-white shadow sm:rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <div className="max-w-xl">
              <label className="block text-sm font-medium text-gray-700">
                Upload Document
              </label>
              <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                <div className="space-y-1 text-center">
                  <ArrowUpTrayIcon className="mx-auto h-12 w-12 text-gray-400" />
                  <div className="flex text-sm text-gray-600">
                    <label htmlFor="file-upload" className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500">
                      <span>Upload file</span>
                      <input
                        id="file-upload"
                        name="file-upload"
                        type="file"
                        className="sr-only"
                        onChange={handleFileUpload}
                        accept=".pdf,.doc,.docx,.xls,.xlsx,.csv"
                      />
                    </label>
                    <p className="pl-1">or drag and drop</p>
                  </div>
                  <p className="text-xs text-gray-500">
                    PDF, Word, Excel, or CSV files up to 10MB each
                  </p>
                </div>
              </div>
            </div>

            {files.length > 0 && (
              <div className="mt-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-medium text-gray-900">Uploaded Documents</h3>
                  <button
                    onClick={handleAnalyze}
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    Analyze Documents
                  </button>
                </div>
                <ul className="mt-3 divide-y divide-gray-200">
                  {files.map((file, index) => (
                    <li key={index} className="py-4">
                      <div className="flex items-center space-x-4">
                        <DocumentTextIcon className="h-6 w-6 text-gray-400" />
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="text-sm font-medium text-gray-900 truncate">
                                {file.name}
                              </p>
                              <p className="text-xs text-gray-500">
                                ID: {file.id} | Type: {FILE_TYPE_NAMES[file.type] || 'Unknown'}
                              </p>
                            </div>
                            <button
                              onClick={() => removeFile(file.name)}
                              className="ml-2 text-gray-400 hover:text-gray-500"
                            >
                              <XCircleIcon className="h-5 w-5" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </DealsLayout>
  );
} 