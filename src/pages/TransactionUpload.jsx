import { useState } from "react";
import { Navigate } from "react-router-dom";
import axios from "axios";

function TransactionUpload() {
  const [file, setFile] = useState(null);

  const user = JSON.parse(localStorage.getItem("user"));
  const userId = user?.id;

  if (!userId) {
    return <Navigate to="/" replace />;
  }

  const handleUpload = async (e) => {
    e.preventDefault();

    if (!file) {
      alert("Please select a CSV file");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("user_id", userId);

    try {
      await axios.post(
        "http://127.0.0.1:5000/upload-transactions",
        formData
      );

      alert("Transactions uploaded successfully");
      setFile(null);
    } catch (error) {
      console.error(error);
      alert("Upload failed");
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-8">

          <div className="card shadow">
            <div className="card-body">

              <h2 className="mb-4">
                Upload Transactions CSV
              </h2>

              <form onSubmit={handleUpload}>

                <div className="mb-3">
                  <input
                    type="file"
                    accept=".csv"
                    className="form-control"
                    onChange={(e) =>
                      setFile(e.target.files[0])
                    }
                  />
                </div>

                <button
                  type="submit"
                  className="btn btn-primary"
                >
                  Upload CSV
                </button>

              </form>

            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

export default TransactionUpload;
