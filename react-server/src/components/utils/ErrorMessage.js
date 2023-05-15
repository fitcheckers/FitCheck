import { XCircleIcon } from "@heroicons/react/solid"
import { useAuth } from "../../contexts/AuthContext"

export default function ErrorMessage() {
    const { error, setError } = useAuth();
  
    return (
      error && (
        <div className="fixed left-[30%] justify-center z-50">
          <div className="fixed rounded-md w-[25%] left-[40%] bg-red-50 h-[6%] min-h-[60px] p-4 z-20 top-[3%] overflow-hidden hover:overflow-y-auto">
            <div className="flex">
              <div className="flex-shrink-0">
                <XCircleIcon
                  role="button"
                  onClick={() => setError("")}
                  className="h-5 w-5 text-red-400"
                  aria-hidden="true"
                />
              </div>
              <div className="ml-2 text-center">
                <h3 className="text-sm font-medium text-red-800 m-auto">
                  Error: {error}
                </h3>
              </div>
            </div>
          </div>
        </div>
      )
    );
  }