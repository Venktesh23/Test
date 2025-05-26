import { ReactNode } from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
  onSubmit?: () => void;
  submitLabel?: string;
  isSubmitting?: boolean;
}

const Modal = ({
  isOpen,
  onClose,
  title,
  children,
  onSubmit,
  submitLabel = 'Save',
  isSubmitting = false,
}: ModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4">
        <div className="fixed inset-0 bg-usf-gray-900 opacity-50" onClick={onClose}></div>
        <div className="relative bg-white rounded-lg max-w-lg w-full shadow-xl border border-usf-gray-200">
          {/* Header */}
          <div className="bg-usf-green-600 px-6 py-4 rounded-t-lg">
            <h3 className="text-lg font-semibold text-white">
              {title}
            </h3>
          </div>
          
          {/* Content */}
          <div className="px-6 py-6">
            {children}
          </div>
          
          {/* Footer */}
          <div className="bg-usf-gray-50 px-6 py-4 rounded-b-lg flex justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-usf-gray-700 bg-white border border-usf-gray-300 rounded-md hover:bg-usf-gray-50 transition-colors duration-150"
            >
              Cancel
            </button>
            {onSubmit && (
              <button
                type="button"
                onClick={onSubmit}
                disabled={isSubmitting}
                className={`px-4 py-2 text-sm font-medium text-white rounded-md transition-colors duration-150 ${
                  isSubmitting
                    ? 'bg-usf-gray-400 cursor-not-allowed'
                    : 'bg-usf-green-600 hover:bg-usf-green-700'
                }`}
              >
                {isSubmitting ? (
                  <div className="flex items-center">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Saving...
                  </div>
                ) : (
                  submitLabel
                )}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal; 