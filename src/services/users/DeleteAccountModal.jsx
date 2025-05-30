import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { userAccountDeleteAPI } from "../../app/features/user";
import Modal from "../../components/modal/Modal";
import { Toast } from "../../components/theme/Toast";
import { useNavigate } from "react-router-dom";
import { logoutUser } from "../../app/features/auth";

const DeleteAccountModal = ({ deleteAccountModal, setDeleteAccountModal }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoading, user } = useSelector((state) => state.user);
  const { token } = useSelector((state) => state.auth);
  const [error, setError] = useState(null);

  const userId = user?.id;

  const handleDelete = async () => {
    if (!userId || !token) {
      setError("User ID or token missing.");
      return;
    }

    try {
      const res = await dispatch(
        userAccountDeleteAPI({ token, userId })
      ).unwrap();

      if (res?.statusCode === 200) {
        Toast("success", "Account deleted successfully.");
        setDeleteAccountModal(false);
        dispatch(logoutUser());
        navigate("/");
      } else {
        setError("Unexpected response.");
      }
    } catch (err) {
      setError(err?.message || "Failed to delete account.");
    }
  };

  return (
    <Modal
      isOpen={deleteAccountModal}
      onClose={() => setDeleteAccountModal(false)}
      title="Delete Confirmation"
    >
      <div className="p-4">
        <p className="text-sm text-gray-700 mb-4">
          Are you sure you want to delete your account? This action is
          irreversible.
        </p>

        {error && <p className="text-red-500 text-sm mb-2">{error}</p>}

        <div className="flex justify-end gap-3">
          <button
            className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
            onClick={() => setDeleteAccountModal(false)}
          >
            Cancel
          </button>
          <button
            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 disabled:opacity-50"
            onClick={handleDelete}
            disabled={isLoading}
          >
            {isLoading ? "Deleting..." : "Delete"}
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default DeleteAccountModal;
